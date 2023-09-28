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
import SearchFiltersCard from "../../../components/SearchFiltersCard"
import OrderCard from "../../../components/OrderCard"
import { useEffect, useState } from "react"
import { isReadable } from "stream"

// @todo display first 100 items
// @todo write script to update ABI automaticaly
import { GasOrderABI } from "helpers/abi"

//@todo move interfaces
interface Order {
  id: bigint
  creator: string
  status: number
  maxGas: bigint
  executionPeriodStart: bigint
  executionPeriodDeadline: bigint
  executionWindow: bigint
  isRevokable: boolean
}

interface ValidationError {
  isValid: boolean
  errMsg: string
  value?: number | string
}

interface FilterOptions {
  manager: string
  status: "0" | "1" | "2" | "3" | "4" | "5"
  numberOfEntries: "10" | "20" | "30" | "50"
}

//0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
export default function SearchOrder() {
  const { data, isError, isLoading } = useContractRead<unknown[], "getFilteredOrders", Order[]>({
    address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    abi: GasOrderABI,
    functionName: "getFilteredOrders",
    args: ["0x0000000000000000000000000000000000000000", 0, 100, 0],
  })

  const executeSearch = (filterOptions: FilterOptions) => {
    console.log(filterOptions)
  }

  return (
    <>
      <Title>Search results: {data?.length}</Title>
      <Text>You might find orders</Text>
      <SearchFiltersCard executeSearch={executeSearch} />
      {/* Main section */}
      {/* <Card  className="mt-6"> */}
      {data?.map((item: any) => (
        <OrderCard {...item} key={`order-${item.id}`} />
      ))}
      {/* </Card> */}
    </>
  )
}
