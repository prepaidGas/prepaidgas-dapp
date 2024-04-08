import format from "date-fns/format"

import { FilteredOrderStructOutput } from "typechain-types/PrepaidGas"

import { COLOR_BY_STATUS } from "@/constants"

import { Badge, Card, Text, Metric, Flex, ProgressBar, Icon, Button } from "@tremor/react"

import {
  ArrowPathIcon,
  CheckCircleIcon,
  PlayIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  StarIcon,
} from "@heroicons/react/24/outline"
import { useState } from "react"
import StatusBadge from "./StatusBadge"
import { redirect } from "next/navigation"
import Link from "next/link"
import TruncatedTextWithTooltip from "./TruncatedTextWithTooltip"
import { TOKEN_NAME } from "@/constants/tokens"
import { string } from "zod"

import { Cards } from "@/components/cards/frame/cards-frame"
import { UilQuestionCircle, UilClipboardNotes, UilFavorite } from "@iconscout/react-unicons"
import { Buttons } from "./buttons"

interface OrderCard extends FilteredOrderStructOutput {
  onFavorited(favorited: boolean): void
  className?: string
}

// @todo display order data
export default function OrderCard({
  id,
  order,
  status,
  gasLeft,
  executor,
  onFavorited = () => {},
  className = "",
}: OrderCard) {
  const checkIfIsFavorite = () => {
    let favOrders = localStorage.getItem("FAVORITE_ORDERS")
    if (favOrders === null) {
      return false
    }

    favOrders = JSON.parse(favOrders)
    const index = favOrders?.indexOf(id.toString())
    if (index !== undefined) {
      if (index > -1) {
        return true
      } else {
        return false
      }
    }
  }

  //todo fix typescript stuff
  // const [isFavorite, setIsFavorite] = useState<boolean>(checkIfIsFavorite())
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  const addToFavorites = () => {
    let favOrders: any = localStorage.getItem("FAVORITE_ORDERS")
    if (favOrders !== null) {
      favOrders = JSON.parse(favOrders)
      favOrders.push(id.toString())
      localStorage.setItem("FAVORITE_ORDERS", JSON.stringify(favOrders))
    } else {
      const newArr: string[] = []
      newArr.push(id.toString())
      localStorage.setItem("FAVORITE_ORDERS", JSON.stringify(newArr))
    }

    setIsFavorite(true)
  }

  const removeFromFavorites = () => {
    let favOrders: any = localStorage.getItem("FAVORITE_ORDERS")
    if (favOrders !== null) {
      favOrders = JSON.parse(favOrders)
      const index = favOrders.indexOf(id.toString())
      if (index > -1) {
        favOrders.splice(index, 1)
        localStorage.setItem("FAVORITE_ORDERS", JSON.stringify(favOrders))
        setIsFavorite(false)
      }
    }
  }

  return (
    <>
      <Cards headless className="max-w-[1024px] mx-auto relative mt-4">
        <div className="flex flex-col gap-3">
          <Buttons className="absolute [&>*]:fill-primary right-3 top-3 h-[40px] ml-4 bg-transparent hover:bg-primary-hbr border-solid border-1 border-primary text-primary hover:text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] ">
            <UilFavorite />
          </Buttons>
          <Buttons className="absolute [&>*]:fill-primary right-3 bottom-3 h-[40px] ml-4 bg-transparent hover:bg-primary-hbr border-solid border-1 border-primary text-primary hover:text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] ">
            Manage Order
          </Buttons>
          <span className="text-[#404040] dark:text-[#A4A5AA] font-bold text-2xl">{`#${id.toString()}`}</span>

          <div className="flex flex-row items-center gap-2">
            <span className="text-[#404040] dark:text-[#A4A5AA]">Manager: </span>
            <TruncatedTextWithTooltip text={order.manager} />
          </div>

          <span className="text-[#404040] dark:text-[#A4A5AA]">
            Execution timeframe: {format(new Date(Number(order.start) * 1000), "MMM d y, HH:mm:ss")} -{" "}
            {format(new Date(Number(order.end) * 1000), "MMM d y, HH:mm:ss")}
          </span>

          <span className="text-[#404040] dark:text-[#A4A5AA]">
            Expire date: {format(new Date(Number(order.expire) * 1000), "MMM d y, HH:mm:ss")}
          </span>

          <span className="text-[#404040] dark:text-[#A4A5AA]">Transaction window: {order.txWindow.toString()}</span>

          <span className="text-[#404040] dark:text-[#A4A5AA]">Redeem window: {order.redeemWindow.toString()}</span>

          <div className="flex flex-row items-center gap-2">
            <span className="text-[#404040] dark:text-[#A4A5AA]">Gas Price:</span>
            <span className="text-primary">{` ${order.gasPrice.perUnit}`}</span>
            <TruncatedTextWithTooltip
              title={TOKEN_NAME[order.gasPrice.token] ?? ""}
              text={order.gasPrice.token}
              isCopyable
            />
          </div>

          <div className="flex flex-row items-center gap-2">
            <span className="text-[#404040] dark:text-[#A4A5AA]">Guarantee:</span>
            <span className="text-primary">{`${order.gasGuarantee.perUnit}`}</span>
            <TruncatedTextWithTooltip
              title={TOKEN_NAME[order.gasGuarantee.token] ?? ""}
              text={order.gasGuarantee.token}
              isCopyable
            />
          </div>
        </div>
      </Cards>
    </>
  )
}
