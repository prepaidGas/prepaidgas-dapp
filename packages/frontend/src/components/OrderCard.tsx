import format from "date-fns/format"

import { FilteredOrderStructOutput } from "typechain-types/GasOrder"

import { STATUS_COLORS } from "../themeConstants"

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

// @todo display order data
export default function OrderCard({
  id,
  manager,
  status,
  maxGas,
  executionPeriodStart,
  executionPeriodDeadline,
  executionWindow,
  isRevokable,
  gasCost,
  reward,
  guarantee
}: FilteredOrderStructOutput) {
  const colors = STATUS_COLORS

  const checkIfIsFavorite = () => {
    let favOrders = localStorage.getItem("FAVORITE_ORDERS")
    if (favOrders === null) {
      return false
    }

    favOrders = JSON.parse(favOrders)
    const index = favOrders.indexOf(id.toString())
    if (index > -1) {
      return true
    } else {
      return false
    }
  }

  const [isFavorite, setIsFavorite] = useState<boolean>(checkIfIsFavorite())

  /* @dev Status bage */
  /* @todo Add explanation to all the statuses with a `tooltip attr` */
  const renderBadge = () => {
    console.log("KEKLOL", localStorage.getItem("KekLol"))
    switch (Number(status)) {
      case 1:
        return (
          <Badge icon={ArrowPathIcon} color={colors[Number(status)]}>
            Pending
          </Badge>
        )
      case 2:
        return (
          <Badge icon={CheckCircleIcon} color={colors[Number(status)]}>
            Accepted
          </Badge>
        )
      case 3:
        return (
          <Badge icon={PlayIcon} color={colors[Number(status)]}>
            Active
          </Badge>
        )
      case 4:
        return (
          <Badge icon={ExclamationTriangleIcon} color={colors[Number(status)]}>
            Inactive
          </Badge>
        )
      case 5:
        return (
          <Badge icon={XCircleIcon} color={colors[Number(status)]}>
            Closed
          </Badge>
        )
      default:
        return null
    }
  }

  const addToFavorites = () => {
    let favOrders: any = localStorage.getItem("FAVORITE_ORDERS")
    if (favOrders !== null) {
      favOrders = JSON.parse(favOrders)
      favOrders.push(id.toString())
      localStorage.setItem("FAVORITE_ORDERS", JSON.stringify(favOrders))
    } else {
      const newArr = []
      newArr.push(id.toString())
      localStorage.setItem("FAVORITE_ORDERS", JSON.stringify(newArr))
    }

    setIsFavorite(true)
  }

  const removeFromFavorites = () => {
    let favOrders: any = localStorage.getItem("FAVORITE_ORDERS")
    console.log("KEKLOL: ", typeof favOrders)
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
    <Card className="mt-3" decoration="top" decorationColor={colors[Number(status)]}>
      <Flex>
        {renderBadge()}
        {isFavorite ? (
          <Button onClick={removeFromFavorites} color="amber" icon={StarIcon}></Button>
        ) : (
          <Button onClick={addToFavorites} variant="secondary" color="amber" icon={StarIcon}></Button>
        )}
      </Flex>

      {/* @dev Order Id */}
      <Metric>#{id.toString()}</Metric>

      <Text>Manager: {manager}</Text>
      {/* @dev Order executionPeriodStart and executionPeriodDeadline */}
      <Text>
        Execution timeframe: {format(Number(executionPeriodStart), "yyyy.mm.dd hh:ss:mm")} -
        {format(Number(executionPeriodDeadline), "yyyy.mm.dd hh:ss:mm")}
      </Text>
      {/* @dev Order executionWindow */}
      <Text>Execution window: {executionWindow.toString()}</Text>
      {/* @dev Order executionWindow */}
      <Text>Revokable: {isRevokable.toString()}</Text>
      {/* @dev Order data, the details might be found in `TokenAmountWithDetails` structure */}
      <Text>{`Reward: ${reward.value} ${reward.symbol}`}</Text>
      <Text>{`Gas Cost: ${gasCost.value} ${gasCost.symbol}`}</Text>
      <Text>{`Guarantee: ${guarantee.value} ${guarantee.symbol}`}</Text>
      {/* @dev Gas left (maxGas) */}
      <Flex className="mt-4">
        <Text>Used: 0 / {maxGas.toString()}</Text>
      </Flex>
      <ProgressBar value={32} className="mt-2" />
    </Card>
  )
}
