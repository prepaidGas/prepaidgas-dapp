import { Badge, Color } from "@tremor/react"
import { COLOR_BY_STATUS, ICON_BY_STATUS, STATUS } from "../constants/themeConstants"
import React from "react"

/* @dev Status bage */
/* @todo Add explanation to all the statuses with a `tooltip attr` */
export default function StatusBadge({ status }: { status: number }) {
  return (
    <Badge icon={ICON_BY_STATUS[status]} color={COLOR_BY_STATUS[status] as Color}>
      {Object.keys(STATUS).find((key) => STATUS[key] === status)}
    </Badge>
  )
}
