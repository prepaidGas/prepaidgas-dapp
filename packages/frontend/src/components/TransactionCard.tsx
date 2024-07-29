import format from "date-fns/format"

import { FilteredOrderStructOutput } from "typechain-types/PrepaidGas"

import { COLOR_BY_STATUS, STATUS, STATUS_NAMES } from "@/constants"

import { useState } from "react"
import TruncatedTextWithTooltip from "./TruncatedTextWithTooltip"
import { TOKEN_NAME } from "@/constants/tokens"

import { UilFavorite } from "@iconscout/react-unicons"
import { DescriptionsProps, Divider, Descriptions, Statistic, Tooltip, Card } from "antd"
import { Transaction } from "@/pages/admin/tx/list"
const { Countdown } = Statistic

interface TransactionCard extends Transaction {
  className?: string
}

// @todo display order data
export default function TransactionCard({ id, validSign, origSign, message, className = "" }: TransactionCard) {
  const items: DescriptionsProps["items"] = [
    {
      label: "origSign",
      children: `${origSign}`,
    },
    {
      label: "validSign",
      children: `${validSign}`,
    },
    {
      label: "Nonce",
      children: `${parseInt(message.nonce as string, 16)}`,
    },
    {
      label: "Start",
      children: `${format(new Date(parseInt(message.start as string) * 1000), "MMM d y, HH:mm:ss")}`,
    },
    {
      label: "From",
      children: `${message.from}`,
    },
    {
      label: "To",
      children: `${message.to}`,
    },
    {
      label: "Order",
      children: `${parseInt(message.order as string, 16)}`,
    },
    {
      label: "Gas",
      children: `${parseInt(message.gas as string, 16)}`,
    },
    {
      label: "Data",
      children: `${message.data}`,
    },
  ]

  // const getCardColor = () => {
  //   switch (Number(status)) {
  //     case STATUS.Any:
  //       return "border-[#000000]"
  //     case STATUS.Pending:
  //       return "border-[#ffd600]"
  //     case STATUS.Accepted:
  //       return "border-[#4caf50]"
  //     case STATUS.Active:
  //       return "border-[#2196f3]"
  //     case STATUS.Inactive:
  //       return "border-[#80cbc4]"
  //     case STATUS.Untaken:
  //       return "border-[#ff9800]"
  //     case STATUS.Closed:
  //       return "border-[#f44336]"

  //     default:
  //       return "border-[#000000]"
  //   }
  // }

  // const getTextColor = () => {
  //   switch (Number(status)) {
  //     case STATUS.Any:
  //       return "text-[#000000]"
  //     case STATUS.Pending:
  //       return "text-[#ffd600]"
  //     case STATUS.Accepted:
  //       return "text-[#4caf50]"
  //     case STATUS.Active:
  //       return "text-[#2196f3]"
  //     case STATUS.Inactive:
  //       return "text-[#80cbc4]"
  //     case STATUS.Untaken:
  //       return "text-[#ff9800]"
  //     case STATUS.Closed:
  //       return "text-[#f44336]"

  //     default:
  //       return "text-[#404040] dark:text-[#A4A5AA]"
  //   }
  // }

  return (
    <>
      <Card className={`max-w-[1024px] mx-auto relative mt-4 border-t-4`}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-start items-center gap-2">
            <span className="text-[#404040] dark:text-[#A4A5AA] font-bold text-2xl">{`#${id.toString()}`}</span>
            <Divider type="vertical" style={{ borderLeft: "1px solid #404040", height: "30px" }} />
            <span className={`font-bold text-2xl text-[#404040] dark:text-[#A4A5AA]`}>UNDEFINED</span>
          </div>

          {typeof window !== "undefined" && window.innerWidth < 768 ? (
            <Descriptions column={1} layout="vertical" bordered items={items} />
          ) : (
            <Descriptions column={1} layout="horizontal" bordered items={items} />
          )}
        </div>
      </Card>
    </>
  )
}
