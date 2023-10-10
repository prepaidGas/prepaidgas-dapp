"use client"

import { readContract } from "@wagmi/core"
import { GasOrderABI } from "helpers/abi"

import {
  ArrowPathIcon,
  CheckCircleIcon,
  PlayIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  WalletIcon,
  FireIcon,
} from "@heroicons/react/24/outline"
import { Card, Grid, Text, Metric, Badge, Title, Icon, Button } from "@tremor/react"
import { useEffect, useState } from "react"
import { STATUS_COLORS } from "../constants/themeConstants"
import { useAccount } from "wagmi"

export default function UserStatsCard() {
  const [totalGas, setTotalGas] = useState<null | number>(null)
  const [ordersCount, setOrdersCount] = useState({
    pending: null,
    accepted: null,
    active: null,
    inactive: null,
    closed: null,
  })
  const { address, isConnecting, isDisconnected } = useAccount()
  //totalMatchingOrdersCount
  const getTotalGas = async () => {
    try {
      const data = await readContract({
        address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        abi: GasOrderABI,
        functionName: "getTotalBalance",
        args: [address, []],
      })
      console.log("getTotalBalance", data)
      console.log("getTotalBalance", Number(data))

      return Number(data)
    } catch (e) {
      console.log("ERROR: ", e)
    }
  }

  const getOdersCount = async (status: number) => {
    try {
      const data = await readContract({
        address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        abi: GasOrderABI,
        functionName: "totalMatchingOrdersCount",
        args: ["0x0000000000000000000000000000000000000000", status],
      })
      console.log("totalMatchingOrdersCount", data)
      console.log("totalMatchingOrdersCount", Number(data))
      return Number(data)
    } catch (e) {
      console.log("ERROR: ", e)
    }
  }

  const fetchData = async () => {
    setTotalGas(await getTotalGas())

    const pending = await getOdersCount(1)
    console.log("OrdersCount Pending: ", pending)
    const accepted = await getOdersCount(2)
    console.log("OrdersCount Accepted: ", accepted)
    const active = await getOdersCount(3)
    console.log("OrdersCount Active: ", active)
    const inactive = await getOdersCount(4)
    console.log("OrdersCount Inactive: ", inactive)
    const closed = await getOdersCount(5)
    console.log("OrdersCount Closed: ", closed)

    const all = await getOdersCount(0)
    console.log("OrdersCount All: ", all)

    setOrdersCount({ pending, accepted, active, inactive, closed })
  }

  useEffect(() => {
    if (typeof address !== "undefined") {
      fetchData()
    }
  }, [address])

  return (
    <Card className="mt-6 flex flex-col gap-3 lg:gap-4 lg:flex-row ">
      <div className="flex flex-col w-full">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col justify-between">
            <Text>Address</Text>
            <div className="flex flex-row">
              <Icon icon={WalletIcon}></Icon>
              <Title className="truncate">{address}</Title>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <Text>Total GAS</Text>
            <div className="flex flex-row">
              <Icon icon={FireIcon}></Icon>
              <Metric>{totalGas}</Metric>
            </div>
          </div>
        </div>

        <Grid numItems={2} numItemsSm={3} numItemsLg={5} className="mt-4 gap-2 flex flex-wrap">
          <Badge icon={ArrowPathIcon} color={STATUS_COLORS[1]}>
            Pending: {ordersCount.pending}
          </Badge>
          <Badge icon={CheckCircleIcon} color={STATUS_COLORS[2]}>
            Accepted: {ordersCount.accepted}
          </Badge>
          <Badge icon={PlayIcon} color={STATUS_COLORS[3]}>
            Active: {ordersCount.active}
          </Badge>
          <Badge icon={ExclamationTriangleIcon} color={STATUS_COLORS[4]}>
            Inactive: {ordersCount.inactive}
          </Badge>
          <Badge icon={XCircleIcon} color={STATUS_COLORS[5]}>
            Closed: {ordersCount.closed}
          </Badge>
        </Grid>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Button>Execute Transaction</Button>
        <Button>My Transactions</Button>
      </div>
    </Card>
  )
}
