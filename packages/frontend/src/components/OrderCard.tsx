import format from "date-fns/format"

import { FilteredOrderStructOutput } from "typechain-types/GasOrder"

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
  gasBalance,
  status,
  gasCost,
  reward,
  guarantee,
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
      {/* <Card className={className + " break-words"} decoration="top" decorationColor={COLOR_BY_STATUS[Number(status)]}>
        <Flex>
          <StatusBadge status={Number(status)} />
          {isFavorite ? (
            <Button
              onClick={() => {
                removeFromFavorites()
                onFavorited(false)
              }}
              color="amber"
              icon={StarIcon}
            ></Button>
          ) : (
            <Button
              onClick={() => {
                addToFavorites()
                onFavorited(true)
              }}
              variant="secondary"
              color="amber"
              icon={StarIcon}
            ></Button>
          )}
        </Flex> */}

      {/* @dev Order Id */}
      {/* <Metric>#{id.toString()}</Metric>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <Text>Manager:</Text>
            <TruncatedTextWithTooltip text={order.manager} isCopyable />
          </div> */}
      {/* @dev Order executionPeriodStart and executionPeriodDeadline */}
      {/*"yyyy.mm.dd hh:ss:mm"*/}
      {/* <Text>
            Execution timeframe: {format(new Date(Number(order.executionPeriodStart) * 1000), "MMM d y, HH:mm:ss")} -{" "}
            {format(new Date(Number(order.executionPeriodDeadline) * 1000), "MMM d y, HH:mm:ss")}
          </Text> */}
      {/* @dev Order executionWindow */}
      {/* <Text>Execution window: {order.executionWindow.toString()}</Text> */}
      {/* @dev Order executionWindow */}
      {/* @dev Order data, the details might be found in `TokenAmountWithDetails` structure */}
      {/* todo: how to get token 'symbol'? ${reward.amount} ${reward.symbol} */}
      {/* <div className="flex flex-row gap-2 items-center">
            <Text>{`Reward:`}</Text>
            <Text color="blue">{`${reward.amount}`}</Text>
            <TruncatedTextWithTooltip title={TOKEN_NAME[reward.token] ?? ""} text={reward.token} isCopyable />
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Text>{`Gas Cost:`}</Text>
            <Text color="blue">{`${gasCost.gasPrice}`}</Text>
            <TruncatedTextWithTooltip title={TOKEN_NAME[gasCost.token] ?? ""} text={gasCost.token} isCopyable />
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Text>{`Guarantee:`}</Text>
            <Text color="blue">{`${guarantee.gasPrice}`}</Text>
            <TruncatedTextWithTooltip title={TOKEN_NAME[guarantee.token] ?? ""} text={guarantee.token} isCopyable />
          </div>
        </div> */}
      {/* @dev Gas left (maxGas) */}
      {/* <Flex className="mt-4">
          <Text>Used: 0 / {order.maxGas.toString()}</Text>
        </Flex>
        <ProgressBar value={32} className="mt-2" />
        <div className="flex flex-col gap-2 mt-4 md:flex-row-reverse">
          <Link href={`/order/${id}`}>
            <Button variant="secondary">Manage Order</Button>
          </Link>
        </div>
      </Card> */}

      <Cards headless className="max-w-[1024px] mx-auto relative mt-4">
        <div className="flex flex-col gap-3">
          <Buttons className="absolute [&>*]:fill-primary right-3 top-3 h-[40px] ml-4 bg-transparent hover:bg-primary-hbr border-solid border-1 border-primary text-primary hover:text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] ">
            <UilFavorite />
          </Buttons>
          <Buttons className="absolute [&>*]:fill-primary right-3 bottom-3 h-[40px] ml-4 bg-transparent hover:bg-primary-hbr border-solid border-1 border-primary text-primary hover:text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] ">
            Manage Order
          </Buttons>
          <span className="text-[#404040] dark:text-[#A4A5AA] font-bold text-2xl">{`#${id.toString()}`}</span>

          <div className="flex flex-row items-center gap-4">
            <span className="text-[#404040] dark:text-[#A4A5AA]">Manager: </span>
            <div className={`flex w-auto`}>
              <div
                className={`flex flex-row justify-center items-center rounded-md border border-solid gap-2 [&>*]:fill-primary border-primary px-2 py-1 ${
                  true ? "cursor-pointer" : "cursor-default"
                } `}
              >
                {true && <UilClipboardNotes />}
                <span className="text-primary">{order.manager}</span>
              </div>
            </div>
          </div>

          <span className="text-[#404040] dark:text-[#A4A5AA]">
            Execution timeframe: {format(new Date(Number(order.executionPeriodStart) * 1000), "MMM d y, HH:mm:ss")} -{" "}
            {format(new Date(Number(order.executionPeriodDeadline) * 1000), "MMM d y, HH:mm:ss")}
          </span>

          <span className="text-[#404040] dark:text-[#A4A5AA]">
            Execution window: {order.executionWindow.toString()}
          </span>

          <div className="flex flex-row items-center gap-4">
            <span className="text-[#404040] dark:text-[#A4A5AA]">Reward:</span>
            <div className={`flex w-auto`}>
              <div
                className={`flex flex-row justify-center items-center rounded-md border border-solid gap-2 [&>*]:fill-primary border-primary px-2 py-1 ${
                  true ? "cursor-pointer" : "cursor-default"
                } `}
              >
                {true && <UilClipboardNotes />}
                <span className="text-primary">{`${reward.amount}`}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4">
            <span className="text-[#404040] dark:text-[#A4A5AA]">Gas Cost:</span>
            <div className={`flex w-auto`}>
              <div
                className={`flex flex-row justify-center items-center rounded-md border border-solid gap-2 [&>*]:fill-primary border-primary px-2 py-1 ${
                  true ? "cursor-pointer" : "cursor-default"
                } `}
              >
                {true && <UilClipboardNotes />}
                <span className="text-primary">{`${gasCost.gasPrice}`}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4">
            <span className="text-[#404040] dark:text-[#A4A5AA]">Guarantee: </span>
            <div className={`flex w-auto`}>
              <div
                className={`flex flex-row justify-center items-center rounded-md border border-solid gap-2 [&>*]:fill-primary border-primary px-2 py-1 ${
                  true ? "cursor-pointer" : "cursor-default"
                } `}
              >
                {true && <UilClipboardNotes />}
                <span className="text-primary">{`${guarantee.gasPrice}`}</span>
              </div>
            </div>
          </div>
        </div>
      </Cards>
    </>
  )
}
