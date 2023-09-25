import { Badge, BadgeDelta, Card, Text, Metric, Flex, ProgressBar } from "@tremor/react"

import {
  ArrowPathIcon,
  CheckCircleIcon,
  PlayIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline"
import { startTransition, useEffect } from "react"

import format from "date-fns/format"

// @todo move to common intefaces
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

// @todo display order data
export default function OrderCard({
  id,
  creator,
  status,
  maxGas,
  executionPeriodStart,
  executionPeriodDeadline,
  executionWindow,
  isRevokable,
}: Order) {
  useEffect(() => {
    console.log()
  }, [])

  /* @dev Status bage */
  /* @todo Add explanation to all the statuses with a `tooltip attr` */
  const renderBadge = () => {
    switch (status) {
      case 1:
        return (
          <Badge icon={ArrowPathIcon} color="yellow">
            Pending
          </Badge>
        )
      case 2:
        return (
          <Badge icon={CheckCircleIcon} color="cyan">
            Accepted
          </Badge>
        )
      case 3:
        return (
          <Badge icon={PlayIcon} color="green">
            Active
          </Badge>
        )
      case 4:
        return (
          <Badge icon={ExclamationTriangleIcon} color="red">
            Inactive
          </Badge>
        )
      case 5:
        return (
          <Badge icon={XCircleIcon} color="slate">
            Closed
          </Badge>
        )
      default:
        return null
    }
  }

  const renderDate = () => {
    const startDate = new Date(Number(executionPeriodStart))
    const endDate = new Date(Number(executionPeriodStart))
    const result = `$`
  }

  return (
    <Card>
      {renderBadge()}

      {/* @dev Order Id */}
      <Metric>#{id.toString()}</Metric>
      <Text>Manager ${creator}</Text>
      {/* @dev Order executionPeriodStart and executionPeriodDeadline */}
      <Text>
        Execution timeframe: {format(Number(executionPeriodStart), "yyyy.mm.dd hh:ss:mm")} -
        {format(Number(executionPeriodDeadline), "yyyy.mm.dd hh:ss:mm")}
      </Text>
      {/* @dev Order executionWindow */}
      <Text>Execution window: {executionWindow.toString()}</Text>
      {/* @dev Order executionWindow */}
      <Text>Revokable: {isRevokable.toString()}</Text>
      {/* @dev Gas left (maxGas) */}
      <Flex className="mt-4">
        <Text>Used: 0 / {maxGas.toString()}</Text>
      </Flex>
      <ProgressBar value={32} className="mt-2" />
    </Card>
  )
}
/*
    id: i,
    creator: order[i].creator,
    status: status(i),
    maxGas: order[i].maxGas,
    executionPeriodStart: order[i].executionPeriodStart,
    executionPeriodDeadline: order[i].executionPeriodDeadline,
    executionWindow: order[i].executionWindow,
    isRevokable
    enum OrderStatus {

  None, - none
  Pending, - yellow
  Accepted, - white green
  Active, - green
  /// @notice the order might be inactive due to exhausted gas limit or execution time
  Inactive, - gray
  Closed - black
}

 <Badge icon={ArrowPathIcon} color="yellow">
        Pending
      </Badge>
      <Badge icon={CheckCircleIcon} color="cyan">
        Accepted
      </Badge>
      <Badge icon={PlayIcon} color="green">
        Active
      </Badge>
      <Badge icon={ExclamationTriangleIcon} color="red">
        Inactive
      </Badge>
      <Badge icon={XCircleIcon} color="slate">
        Closed
      </Badge> */
