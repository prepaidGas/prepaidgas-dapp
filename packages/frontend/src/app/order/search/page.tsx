"use client"
// @todo alphabetize order
import { Card, Title, Text, TextInput, Grid, Select, SelectItem, Button, Metric } from "@tremor/react"

import { useContractRead } from "wagmi"
import { readContract } from "@wagmi/core"
import SearchFiltersCard, { FilterOptions } from "../../../components/SearchFiltersCard"
import OrderCard from "../../../components/OrderCard"
import { useEffect, useState } from "react"
import { isReadable } from "stream"
import Pagination from "../../../components/Pagination"

// @todo display first 100 items
// @todo write script to update ABI automaticaly
import { GasOrderABI } from "helpers/abi"

//@todo move interfaces
export interface Order {
  id: bigint
  creator: string
  status: number
  maxGas: bigint
  executionPeriodStart: bigint
  executionPeriodDeadline: bigint
  executionWindow: bigint
  isRevokable: boolean
}

export default function SearchOrder() {
  const initialState = {
    manager: "0x0000000000000000000000000000000000000000",
    status: 0,
    numberOfEntries: 50,
  }
  const [filterState, setFilterState] = useState({ ...initialState })
  const [data, setOrdersData] = useState<any>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalEntries, setTotalEntries] = useState<undefined | number>(undefined)

  const executeSearch = async (pageNumber: number) => {
    await getTotalEntriesNumber()
    console.log("starting search")
    try {
      const data = await readContract({
        address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        abi: GasOrderABI,
        functionName: "getFilteredOrders",
        args: [
          filterState.manager,
          filterState.status,
          filterState.numberOfEntries,
          (pageNumber - 1) * filterState.numberOfEntries,
        ],
      })
      console.log("DATA", data)
      setOrdersData(data)
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
        args: [filterState.manager, filterState.status],
      })
      console.log("getMaxEntriesNumber", data)
      console.log("getMaxEntriesNumber2", Number(data))

      setTotalEntries(Number(data))
    } catch (e) {
      console.log("ERROR: ", e)
    }
  }

  useEffect(() => {
    console.log("FilterState: ", filterState)
    executeSearch(1)
    setCurrentPage(1)
  }, [filterState])

  useEffect(() => {
    console.log("Current Page: ", currentPage)
    executeSearch(currentPage)
  }, [currentPage])

  useEffect(() => {
    console.log("Data", data)
  }, [data])

  return (
    <>
      <Title>Search results: {data?.length}</Title>
      <Text>You might find orders</Text>
      <SearchFiltersCard setFilterState={setFilterState} />
      {/* Main section */}
      {data && (
        <div className="flex justify-center align-middle mt-4">
          <Pagination
            onPageChange={setCurrentPage}
            currentPage={currentPage}
            totalCount={totalEntries && totalEntries}
            pageSize={filterState.numberOfEntries}
          />
        </div>
      )}
      {data?.map((item: any) => (
        <OrderCard {...item} key={`order-${item.id}`} />
      ))}
      {data?.length === 0 ? <Metric className="self-center">Sorry, we couldn't find any results</Metric> : null}
    </>
  )
}
