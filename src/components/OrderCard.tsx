import { Badge, BadgeDelta, Card, Text, Metric, Flex, ProgressBar } from "@tremor/react";

import {
ArrowPathIcon,
  CheckCircleIcon,
  PlayIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

// @todo display order data
export default function OrderCard() {
    return (
        <Card>
            { /* @dev Status bage */}
            { /* @todo Add explanation to all the statuses with a `tooltip attr` */}
            <Badge icon={ArrowPathIcon} color="yellow">Pending</Badge>
            <Badge icon={CheckCircleIcon} color="cyan">Accepted</Badge>
            <Badge icon={PlayIcon} color="green">Active</Badge>
            <Badge icon={ExclamationTriangleIcon} color="red">Inactive</Badge>
            <Badge icon={XCircleIcon} color="slate">Closed</Badge>

            { /* @dev Order Id */}
            <Metric>#1</Metric>
            <Text>Sales: manager address</Text>
            { /* @dev Order executionPeriodStart and executionPeriodDeadline */}
            <Text>Execution timeframe: executionPeriodStart - executionPeriodDeadline</Text>
            { /* @dev Order executionWindow */}
            <Text>Execution window: 3</Text>
            { /* @dev Order executionWindow */}
            <Text>Revokable: isRevokable</Text>
            { /* @dev Gas left (maxGas) */}
            <Flex className="mt-4">
                <Text>Used: 10 / 100</Text>
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
*/
