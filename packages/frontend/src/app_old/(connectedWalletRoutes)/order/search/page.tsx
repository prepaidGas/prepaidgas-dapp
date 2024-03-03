"use client"
// @todo alphabetize order
import { FilteredOrderStructOutput } from "typechain-types/GasOrder"

import { Title, Text, Metric, Color, Icon, Card } from "@tremor/react"

import { readContract } from "@wagmi/core"
import SearchFiltersCard, { FilterOptions } from "@/components/SearchFiltersCard"
import OrderCard from "@/components/OrderCard"
import { useEffect, useState } from "react"
import Pagination from "@/components/Pagination"

// @todo display first 100 items
import { GasOrderABI, prepaidGasCoreContractAddress } from "@/helpers"

import ToasterPopup from "@/components/ToasterPopup"
import { TailSpin } from "react-loader-spinner"
import { SPINNER_COLOR } from "@/constants"

import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { useAccount } from "wagmi"

export default function SearchOrder() {
  const { address, isConnecting, isDisconnected } = useAccount()

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
    const searchArgs = [
      manager === "" ? defaultManager : manager,
      address,
      status,
      numberOfEntries,
      (pageNumber - 1) * numberOfEntries,
    ]
    console.log("SearchArgs: ", searchArgs)
    try {
      const data = await readContract({
        address: prepaidGasCoreContractAddress(),
        abi: GasOrderABI,
        functionName: "getFilteredOrders",
        //@todo replace second argument with users address instead of defaultManager (already done but i'm leaving todo for now)
        args: searchArgs,
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
        address: prepaidGasCoreContractAddress(),
        abi: GasOrderABI,
        functionName: "getMatchingOrdersCount",
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
    console.log("handleFilterSubmit START")
    setFilterState(filterOptions)
    setCurrentPage(1)
    executeSearch(filterOptions, 1)
    console.log("handleFilterSubmit END")
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    executeSearch(filterState, page)
    console.log("handlePageChange")
  }

  useEffect(() => {
    if (data?.length === 0) {
      setShowError(true)
    }
  }, [data])

  return (
    <>
      <Title>Search results: {data?.length}</Title>
      {/*TODO: fix spelling*/}
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
            className={index === 0 ? "mt-4" : "mt-4"}
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
