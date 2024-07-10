import format from "date-fns/format"

import { FilteredOrderStructOutput } from "typechain-types/PrepaidGas"

import { COLOR_BY_STATUS, STATUS, STATUS_NAMES } from "@/constants"

import { useState } from "react"
import TruncatedTextWithTooltip from "./TruncatedTextWithTooltip"
import { TOKEN_NAME } from "@/constants/tokens"

import { Cards } from "@/components/cards/frame/cards-frame"
import { UilFavorite } from "@iconscout/react-unicons"
import { Buttons } from "./buttons"
import { DescriptionsProps, Divider, Descriptions, Statistic, Tooltip, Progress, ProgressProps, Button } from "antd"
const { Countdown } = Statistic

type Undefinable<T> = T | undefined

interface OrderCard extends FilteredOrderStructOutput {
  // onFavorited(favorited: boolean): void
  managementSettings?: Undefinable<{
    canWithdrawOrder: boolean
    onWithdrawOrder: () => {}
    canCloseOrder: boolean
    onCloseOrder: () => {}
  }>
  className?: string
}

// @todo display order data
export default function OrderCard({
  id,
  order,
  status,
  gasLeft,
  executor,
  // onFavorited = () => {},
  managementSettings = undefined,
  className = "",
}: OrderCard) {
  const getProgressBarStatus: () => ProgressProps["status"] = () => {
    if (Number(gasLeft) === 0) {
      return "exception"
    }

    if (Number(status) === STATUS.Active) {
      return "active"
    }

    return "normal"
  }

  const checkIfExpired = () => {
    const expirationDate = new Date(Number(order.expire) * 1000)
    const currentDate = new Date()
    const diff = expirationDate.getTime() - currentDate.getTime()
    if (diff <= 0) {
      return true
    } else {
      return false
    }
  }

  const [isExpired, setIsExpired] = useState(checkIfExpired())

  const items: DescriptionsProps["items"] = [
    {
      label: "Manager",
      children: <TruncatedTextWithTooltip text={order.manager} isCopyable />,
      span: 2,
    },
    {
      label: "Execution timeframe",
      children: `${format(new Date(Number(order.start) * 1000), "MMM d y, HH:mm:ss")} - ${format(
        new Date(Number(order.end) * 1000),
        "MMM d y, HH:mm:ss",
      )}`,
      span: 2,
    },
    {
      label: "Time until expiration",
      children: isExpired ? (
        "Already expired"
      ) : (
        <div className="flex w-auto">
          <Tooltip
            title={format(new Date(Number(order.expire) * 1000), "MMM d y, HH:mm:ss")}
            overlayStyle={{ maxWidth: "500px" }}
          >
            <Countdown value={Number(order.expire) * 1000} onFinish={() => setIsExpired(true)} />
          </Tooltip>
        </div>
      ),
      span: 2,
    },
    {
      label: "Transaction window",
      children: `${order.txWindow.toString()}`,
    },
    {
      label: "Redeem window",
      children: `${order.redeemWindow.toString()}`,
    },
    {
      label: "Gas Price",
      children: (
        <div className="flex flex-row items-center gap-2">
          <span className="text-primary">{` ${order.gasPrice.perUnit}`}</span>
          <TruncatedTextWithTooltip
            title={TOKEN_NAME[order.gasPrice.token] ?? ""}
            text={order.gasPrice.token}
            isCopyable
          />
        </div>
      ),
      span: 2,
    },
    {
      label: "Guarantee",
      children:
        Number(order.gas) === 0 ? (
          "N/A"
        ) : (
          <div className="flex flex-row items-center gap-2">
            <span className="text-primary">{`${order.gasGuarantee.perUnit}`}</span>
            <TruncatedTextWithTooltip
              title={TOKEN_NAME[order.gasGuarantee.token] ?? ""}
              text={order.gasGuarantee.token}
              isCopyable
            />
          </div>
        ),
      span: 2,
    },
    {
      label: "Gas Available",
      children: (
        <div className="flex flex-row items-center gap-2">
          <Tooltip title={`${Number(gasLeft)} / ${Number(order.gas)}`} overlayStyle={{ maxWidth: "500px" }}>
            <Progress
              size={"default"}
              className="w-full"
              format={(percent) => `${Math.round(percent * 10) / 10}%`}
              status={getProgressBarStatus()}
              strokeColor={{ from: "#108ee9", to: "#87d068" }}
              percent={(Number(gasLeft) / Number(order.gas)) * 100}
            />
          </Tooltip>
        </div>
      ),
      span: 2,
    },
  ]

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

  const getCardColor = () => {
    switch (Number(status)) {
      case STATUS.Any:
        return "border-[#000000]"
      case STATUS.Pending:
        return "border-[#ffd600]"
      case STATUS.Accepted:
        return "border-[#4caf50]"
      case STATUS.Active:
        return "border-[#2196f3]"
      case STATUS.Inactive:
        return "border-[#80cbc4]"
      case STATUS.Untaken:
        return "border-[#ff9800]"
      case STATUS.Closed:
        return "border-[#f44336]"

      default:
        return "border-[#000000]"
    }
  }

  const getTextColor = () => {
    switch (Number(status)) {
      case STATUS.Any:
        return "text-[#000000]"
      case STATUS.Pending:
        return "text-[#ffd600]"
      case STATUS.Accepted:
        return "text-[#4caf50]"
      case STATUS.Active:
        return "text-[#2196f3]"
      case STATUS.Inactive:
        return "text-[#80cbc4]"
      case STATUS.Untaken:
        return "text-[#ff9800]"
      case STATUS.Closed:
        return "text-[#f44336]"

      default:
        return "text-[#404040] dark:text-[#A4A5AA]"
    }
  }

  return (
    <>
      <Cards headless className={`max-w-[1024px] mx-auto relative mt-4 border-t-4  ${getCardColor()}`}>
        <div className="flex flex-col gap-3">
          {/* todo: finish order manager page and add to favorites functionality */}
          {/* {process.env.NODE_ENV === "development" && (
            <>
              <Buttons className="absolute [&>*]:fill-primary right-3 top-3 h-[40px] ml-4 bg-transparent hover:bg-primary-hbr border-solid border-1 border-primary text-primary hover:text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] ">
                <UilFavorite />
              </Buttons>
              <Buttons className="absolute [&>*]:fill-primary right-3 bottom-3 h-[40px] ml-4 bg-transparent hover:bg-primary-hbr border-solid border-1 border-primary text-primary hover:text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] ">
                Manage Order
              </Buttons>
            </>
          )} */}
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start items-center gap-2">
              <span className="text-[#404040] dark:text-[#A4A5AA] font-bold text-2xl">{`#${id.toString()}`}</span>
              <Divider type="vertical" style={{ borderLeft: "1px solid #404040", height: "30px" }} />
              <span className={`font-bold text-2xl ${getTextColor()}`}>{STATUS_NAMES[Number(status)]}</span>
            </div>
            <div className="flex flex-row gap-2">
              {!!managementSettings && managementSettings.canWithdrawOrder && (
                <Button onClick={managementSettings.onWithdrawOrder}>Withdraw Order</Button>
              )}
              {!!managementSettings && managementSettings.canCloseOrder && (
                <Button danger onClick={managementSettings.onCloseOrder}>
                  Close Order
                </Button>
              )}
            </div>
          </div>

          {typeof window !== "undefined" && window.innerWidth < 768 ? (
            <Descriptions column={1} layout="vertical" bordered items={items} />
          ) : (
            <div className={!!managementSettings ? "order-card-management" : "order-card"}>
              <Descriptions column={1} layout="horizontal" bordered items={items} />
            </div>
          )}
        </div>
      </Cards>
    </>
  )
}
