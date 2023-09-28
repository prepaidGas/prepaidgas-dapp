"use client"
// @todo alphabetize order
import { Card, Title, Text, TextInput, Grid, Select, SelectItem, Button } from "@tremor/react"

import {
  FunnelIcon,
  XMarkIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  PlayIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline"

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

interface SearchState {
  data: undefined | Order[]
}

// const mockData: Order[] = [
// {
//   id: 1234,
//   creator: "$0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
//   status: 1,
//   maxGas: 6757457645n,
//   executionPeriodStart: bigint,
//   executionPeriodDeadline: bigint,
//   executionWindow: bigint,
//   isRevokable: true,
// },
// ]

//0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
export default function SearchOrder() {
  const initialState = {
    manager: "0x0000000000000000000000000000000000000000",
    status: 0,
    numberOfEntries: 100,
  }
  const [filterState, setFilterState] = useState({ ...initialState })
  const [currentPage, setCurrentPage] = useState(0)
  const [data, setOrdersData] = useState<any>()

  // const { data, isError, isLoading } = useContractRead<unknown[], "getFilteredOrders", Order[]>({
  //   address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  //   abi: testABI,
  //   functionName: "getFilteredOrders",
  //   args: ["0x0000000000000000000000000000000000000000", initialState.status, initialState.numberOfEntries, 0],
  // })

  const executeSearch = async () => {
    console.log("starting search")
    try {
      const data = await readContract({
        address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        abi: testABI,
        functionName: "getFilteredOrders",
        args: ["0x0000000000000000000000000000000000000000", 0, 100, 0],
      })
      console.log("DATA", data)
      setOrdersData(data)
    } catch (e) {
      console.log("ERROR: ", e)
    }
  }

  useEffect(() => {
    executeSearch()
  }, [filterState])

  // useEffect(() => {
  //   console.log("Orders", ordersData)
  // }, [ordersData])

  useEffect(() => {
    console.log("Data", data)
  }, [data])

  return (
    <>
      <Title>Search results: {data?.length}</Title>
      <Text>You might find orders</Text>
      <SearchFiltersCard setFilterState={setFilterState} />
      {/* Main section */}
      {/* <Pagination testABI={testABI}></Pagination> */}
      {data?.map((item: any) => (
        <OrderCard {...item} key={`order-${item.id}`} />
      ))}
    </>
  )
}
