"use client"
// @todo alphabetize order
import { FilteredOrderStructOutput } from "typechain-types/GasOrder"

import { Title, Text, Metric, Color, Icon, Card } from "@tremor/react"

import { readContract } from "@wagmi/core"
import SearchFiltersCard, { FilterOptions } from "../../../components/SearchFiltersCard"
import OrderCard from "../../../components/OrderCard"
import { useEffect, useState } from "react"
import Pagination from "../../../components/Pagination"

// @todo display first 100 items
import { GasOrderABI } from "helpers/abi"
import ToasterPopup from "../../../components/ToasterPopup"
import { TailSpin } from "react-loader-spinner"
import { SPINNER_COLOR } from "../../../constants/themeConstants"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"

export default function SearchOrder() {
  const initialState: FilterOptions = {
    manager: "",
    status: 0,
    numberOfEntries: 50,
  }
  const [filterState, setFilterState] = useState({ ...initialState })
  const [data, setOrdersData] = useState<undefined | FilteredOrderStructOutput[]>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalEntries, setTotalEntries] = useState<undefined | number>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showError, setShowError] = useState<boolean>(false)

  const defaultManager = "0x0000000000000000000000000000000000000000"

  const executeSearch = async (filterOptions: FilterOptions, pageNumber: number) => {
    setIsLoading(true)
    setShowError(false)
    console.log("executeSearch", { pageNumber })
    await getTotalEntriesNumber(filterOptions)

    console.log("starting search")
    const { manager, status, numberOfEntries } = filterOptions
    try {
      const data = await readContract({
        address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        abi: GasOrderABI,
        functionName: "getFilteredOrders",
        args: [manager || defaultManager, status, numberOfEntries, (pageNumber - 1) * numberOfEntries],
      })
      // console.log("DATA", data)
      setOrdersData(data as FilteredOrderStructOutput[])
    } catch (e) {
      console.log("ERROR: ", e)
      setShowError(true)
    }
    setIsLoading(false)
  }

  const getTotalEntriesNumber = async (filterOptions) => {
    try {
      const data = await readContract({
        address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        abi: GasOrderABI,
        functionName: "totalMatchingOrdersCount",
        args: [filterOptions.manager || defaultManager, filterOptions.status],
      })
      console.log("getTotalEntriesNumber", { filterOptions })
      console.log("getMaxEntriesNumber", data)
      console.log("getMaxEntriesNumber2", Number(data))

      setTotalEntries(Number(data))
    } catch (e) {
      console.log("ERROR: ", e)
    }
  }

  useEffect(() => {
    executeSearch(filterState, currentPage)
  }, [])

  const [showPopup, setShowPopup] = useState(false)
  const [popupTimer, setPopupTimer] = useState<NodeJS.Timeout | undefined>()
  const [popupProps, setPopupProps] = useState<{ msgTitle: string; msgBody: string; color: Color }>({
    msgTitle: "",
    msgBody: "",
    color: "blue",
  })

  const onOrderCardAction = (favorited: boolean) => {
    if (favorited) {
      setPopupProps({
        msgTitle: "Order was added to favorites",
        msgBody: "",
        color: "green",
      })
    } else {
      setPopupProps({
        msgTitle: "Order was removed from favorites",
        msgBody: "",
        color: "amber",
      })
    }
    setShowPopup(true)
    if (popupTimer !== undefined) {
      clearTimeout(popupTimer)
    }
    const timer = setTimeout(() => setShowPopup(false), 5000)
    setPopupTimer(timer)
  }

  const handleFilterSubmit = (filterOptions: FilterOptions) => {
    setFilterState(filterOptions)
    setCurrentPage(1)
    executeSearch(filterOptions, 1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    executeSearch(filterState, page)
  }

  useEffect(() => {
    if (data?.length === 0) {
      setShowError(true)
    }
  }, [data])

  return (
    <>
      <Title>Search results: {data?.length}</Title>
      <Text>You might find orders</Text>
      <SearchFiltersCard initialValue={initialState} onSubmit={handleFilterSubmit} />
      {/* Main section */}
      {/* {isLoading && (
        <div className="flex h-full items-center justify-center mt-4">
          <TailSpin
            height={40}
            width={40}
            color={SPINNER_COLOR}
            ariaLabel="tail-spin-loading"
            radius="0"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )} */}

      {data && (
        <Pagination
          className="flex flex-col"
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalCount={totalEntries && totalEntries}
          pageSize={filterState.numberOfEntries}
        />
      )}

      {isLoading ? (
        <div className="flex justify-center my-4">
          <TailSpin
            height={40}
            width={40}
            color={SPINNER_COLOR}
            ariaLabel="tail-spin-loading"
            radius="0"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        data?.map((item: any, index) => (
          <OrderCard
            {...item}
            className={index === 0 ? "mt-0" : "mt-4"}
            onFavorited={onOrderCardAction}
            key={`order-${item.id}`}
          />
        ))
      )}

      {data && (
        <Pagination
          className="flex flex-col"
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalCount={totalEntries && totalEntries}
          pageSize={filterState.numberOfEntries}
        />
      )}

      {showError && (
        <Card className="mt-4" decoration="top" decorationColor="red">
          <div className="flex flex-row gap-4 justify-center items-center">
            <Icon icon={ExclamationCircleIcon} size="xl"></Icon>
            <Title>Sorry, we couldn&#39;t find any results</Title>
          </div>
        </Card>
      )}

      {showPopup ? (
        <ToasterPopup
          msgTitle={popupProps.msgTitle}
          msgBody={popupProps.msgBody}
          onClose={() => setShowPopup(false)}
          color={popupProps.color}
        />
      ) : null}
    </>
  )
}
