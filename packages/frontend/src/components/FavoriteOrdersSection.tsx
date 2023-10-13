"use client"

import { useEffect, useState } from "react"
import { readContract } from "@wagmi/core"

import OrderCard from "./OrderCard"
import { GasOrderABI } from "helpers/abi"
import { FilteredOrderStructOutput } from "typechain-types/GasOrder"

export default function FavoriteOrdersSection() {
  const [favoriteOrderIds, setFavoriteOrdersids] = useState<null | string[]>(
    JSON.parse(localStorage.getItem("FAVORITE_ORDERS")),
  )
  const [favoriteOrders, setFavoriteOrders] = useState<any>()

  const getFavoritedOrders = async () => {
    try {
      const data = await readContract({
        address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        abi: GasOrderABI,
        functionName: "getOrdersById",
        args: [favoriteOrderIds],
      })
      console.log("GetOrdersById DATA", data)
      setFavoriteOrders(data as FilteredOrderStructOutput[])
    } catch (e) {
      console.log("GetOrdersById ERROR: ", e)
    }
  }

  useEffect(() => {
    console.log("OnMount: ", favoriteOrderIds)
    getFavoritedOrders()
  }, [])

  useEffect(() => {
    console.log("OnChange: ", favoriteOrders)
  }, [favoriteOrderIds])

  return favoriteOrders && favoriteOrders
}
