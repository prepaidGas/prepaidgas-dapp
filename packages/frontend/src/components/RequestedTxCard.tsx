import format from "date-fns/format"
import { COLOR_BY_STATUS } from "@/constants"

import { Card, Text, Metric, Flex, Badge, Color } from "@tremor/react"
import StatusBadge from "./StatusBadge"

interface RequestedTx {
  nonce: number
  status: number
  className?: string
}

const renderRequestedTxStatusBadge = (txStatus: number) => {
  switch (txStatus) {
    case 0:
      return <Badge color={"red" as Color}>Executed</Badge>
    case 1:
      return <Badge color={"yellow" as Color}>Pending</Badge>
    default:
      "error"
      break
  }
}

// @todo display order data
export default function RequestedTxCard({ nonce, status, className = "" }: RequestedTx) {
  return (
    <Card className={className} decoration="top" decorationColor={status === 0 ? "red" : "yellow"}>
      <div className="flex flex-row gap-6">
        <div className="flex flex-col">
          <Text>Nonce</Text>
          <Metric>{`# ${nonce}`}</Metric>
        </div>
        {renderRequestedTxStatusBadge(status)}
      </div>
    </Card>
  )
}
