import {
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlayIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline"
import { Badge } from "@tremor/react"
import { STATUS_COLORS } from "../constants/themeConstants"

/* @dev Status bage */
/* @todo Add explanation to all the statuses with a `tooltip attr` */
export const renderBadge = (status: number | bigint) => {
  switch (Number(status)) {
    case 1:
      return (
        <Badge icon={ArrowPathIcon} color={STATUS_COLORS[Number(status)]}>
          Pending
        </Badge>
      )
    case 2:
      return (
        <Badge icon={CheckCircleIcon} color={STATUS_COLORS[Number(status)]}>
          Accepted
        </Badge>
      )
    case 3:
      return (
        <Badge icon={PlayIcon} color={STATUS_COLORS[Number(status)]}>
          Active
        </Badge>
      )
    case 4:
      return (
        <Badge icon={ExclamationTriangleIcon} color={STATUS_COLORS[Number(status)]}>
          Inactive
        </Badge>
      )
    case 5:
      return (
        <Badge icon={XCircleIcon} color={STATUS_COLORS[Number(status)]}>
          Closed
        </Badge>
      )
    default:
      return null
  }
}
