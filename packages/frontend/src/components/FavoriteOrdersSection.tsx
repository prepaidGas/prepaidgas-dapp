"use client"

import { useEffect, useState } from "react"
import { readContract } from "@wagmi/core"

import OrderCard from "./OrderCard"
import { GasOrderABI } from "helpers/abi"
import { FilteredOrderStructOutput } from "typechain-types/GasOrder"
import { useAccount } from "wagmi"

interface FavoriteOrdersSectionProps {
  onFavorited(favorited: boolean): void
}

export default function FavoriteOrdersSection({ onFavorited }: FavoriteOrdersSectionProps) {
  const [favoriteOrderIds, setFavoriteOrdersids] = useState<null | string[]>(
    JSON.parse(localStorage.getItem("FAVORITE_ORDERS")),
  )
  const [favoriteOrders, setFavoriteOrders] = useState<any>()
  const { address, isConnecting, isDisconnected } = useAccount()

  const getFavoritedOrders = async () => {
    try {
      const data = await readContract({
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        abi: GasOrderABI,
        functionName: "getOrdersByIds",
        args: [favoriteOrderIds, address],
      })
      console.log("getOrdersByIds DATA", data)
      setFavoriteOrders(data as FilteredOrderStructOutput[])
    } catch (e) {
      console.log("getOrdersByIds ERROR: ", e)
    }
  }

  useEffect(() => {
    console.log("OnMount: ", address)
    getFavoritedOrders()
  }, [])

  useEffect(() => {
    console.log("OnChange: ", favoriteOrders)
  }, [favoriteOrders])

  return favoriteOrders?.map((item: any) => <OrderCard {...item} onFavorited={onFavorited} key={`order-${item.id}`} />)
}
