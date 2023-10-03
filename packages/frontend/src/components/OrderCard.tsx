import { Badge, BadgeDelta, Card, Text, Metric, Flex, ProgressBar } from "@tremor/react"

import { FilteredOrderStructOutput } from "typechain-types/GasOrder"

import {
  ArrowPathIcon,
  CheckCircleIcon,
  PlayIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline"
import { startTransition, useEffect } from "react"

import format from "date-fns/format"

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
}: FilteredOrderStructOutput) {
  const colors: (
    | "yellow"
    | "cyan"
    | "green"
    | "red"
    | "slate"
    | "gray"
    | "zinc"
    | "neutral"
    | "stone"
    | "orange"
    | "amber"
    | "lime"
    | "emerald"
    | "teal"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"
  )[] = ["blue", "yellow", "cyan", "green", "red", "slate"]

  /* @dev Status bage */
  /* @todo Add explanation to all the statuses with a `tooltip attr` */
  const renderBadge = () => {
    switch (status) {
      case 1:
        return (
          <Badge icon={ArrowPathIcon} color={colors[status]}>
            Pending
          </Badge>
        )
      case 2:
        return (
          <Badge icon={CheckCircleIcon} color={colors[status]}>
            Accepted
          </Badge>
        )
      case 3:
        return (
          <Badge icon={PlayIcon} color={colors[status]}>
            Active
          </Badge>
        )
      case 4:
        return (
          <Badge icon={ExclamationTriangleIcon} color={colors[status]}>
            Inactive
          </Badge>
        )
      case 5:
        return (
          <Badge icon={XCircleIcon} color={colors[status]}>
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
    <Card className="mt-3" decoration="top" decorationColor={colors[status]}>
      {renderBadge()}

      {/* @dev Order Id */}
      <Metric>#{id.toString()}</Metric>
      <Text>Manager ${manager}</Text>
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
