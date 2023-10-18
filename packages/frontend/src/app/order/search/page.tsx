"use client"
// @todo alphabetize order
import { FilteredOrderStructOutput } from "typechain-types/GasOrder"

import { Title, Text, Metric, Color } from "@tremor/react"

import { readContract } from "@wagmi/core"
import SearchFiltersCard, { FilterOptions } from "../../../components/SearchFiltersCard"
import OrderCard from "../../../components/OrderCard"
import { useEffect, useState } from "react"
import Pagination from "../../../components/Pagination"

// @todo display first 100 items
import { GasOrderABI } from "helpers/abi"
import ToasterPopup from "../../../components/ToasterPopup"

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

  const defaultManager = "0x0000000000000000000000000000000000000000"

  const executeSearch = async (pageNumber: number) => {
    console.log("executeSearch", { pageNumber })
    await getTotalEntriesNumber()

    console.log("starting search")
    try {
      const data = await readContract({
        address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        abi: GasOrderABI,
        functionName: "getFilteredOrders",
        args: [
          filterState.manager || defaultManager,
          filterState.status,
          filterState.numberOfEntries,
          (pageNumber - 1) * filterState.numberOfEntries,
        ],
      })
      // console.log("DATA", data)
      setOrdersData(data as FilteredOrderStructOutput[])
    } catch (e) {
      console.log("ERROR: ", e)
    }
  }

  const getTotalEntriesNumber = async () => {
    try {
      const data = await readContract({
        address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        abi: GasOrderABI,
        functionName: "totalMatchingOrdersCount",
        args: [filterState.manager || defaultManager, filterState.status],
      })
      console.log("getMaxEntriesNumber", data)
      console.log("getMaxEntriesNumber2", Number(data))

      setTotalEntries(Number(data))
    } catch (e) {
      console.log("ERROR: ", e)
    }
  }

  // useEffect(() => {
  //   console.log("FilterState: ", filterState)
  //   executeSearch(currentPage)
  // }, [])

  useEffect(() => {
    console.log("Current Page: ", currentPage)
    executeSearch(currentPage)
  }, [currentPage, filterState])

  useEffect(() => {
    console.log("Data", data)
  }, [data])

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

  return (
    <>
      <Title>Search results: {data?.length}</Title>
      <Text>You might find orders</Text>
      <SearchFiltersCard initialValue={initialState} onSubmit={setFilterState} />
      {/* Main section */}
      {data && (
        // <div className="flex justify-center align-middle mt-4">
        <Pagination
          className="flex flex-col"
          onPageChange={setCurrentPage}
          currentPage={currentPage}
          totalCount={totalEntries && totalEntries}
          pageSize={filterState.numberOfEntries}
        >
          {data?.map((item: any, index) => (
            <OrderCard
              {...item}
              className={index === 0 ? "mt-0" : "mt-3"}
              onFavorited={onOrderCardAction}
              key={`order-${item.id}`}
            />
          ))}
        </Pagination>
        // </div>
      )}

      {data?.length === 0 ? <Metric className="self-center">Sorry, we couldn&#39;t find any results</Metric> : null}

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
