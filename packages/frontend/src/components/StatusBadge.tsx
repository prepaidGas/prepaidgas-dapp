import { Badge, Color } from "@tremor/react"
import { COLOR_BY_STATUS, ICON_BY_STATUS, STATUS } from "../constants/themeConstants"
import React, { ReactNode } from "react"

/* @dev Status bage */
/* @todo Add explanation to all the statuses with a `tooltip attr` */
export default function StatusBadge({ children = null, status }: { children?: ReactNode; status: number }) {
  return (
    <Badge icon={ICON_BY_STATUS[status]} color={COLOR_BY_STATUS[status] as Color}>
      {Object.keys(STATUS).find((key) => STATUS[key] === status)} {children}
    </Badge>
  )
}
