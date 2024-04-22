import {
  ArrowPathIcon,
  CheckCircleIcon,
  PlayIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline"
import { Color } from "@tremor/react"

type StatusNameType = {
  Any: 0
  Pending: 1
  Accepted: 2
  Active: 3
  Inactive: 4
  Untaken: 5
  Closed: 6
}

export const STATUS: StatusNameType = {
  Any: 0,
  Pending: 1,
  Accepted: 2,
  Active: 3,
  Inactive: 4,
  Untaken: 5,
  Closed: 6,
}

export const STATUS_NAMES = {
  [STATUS.Any]: "Any",
  [STATUS.Pending]: "Pending",
  [STATUS.Accepted]: "Accepted",
  [STATUS.Active]: "Active",
  [STATUS.Inactive]: "Inactive",
  [STATUS.Untaken]: "Untaken",
  [STATUS.Closed]: "Closed",
}

type ValuesOf<T> = T[keyof T]
type StatusType = ValuesOf<StatusNameType>

//Those are Tremor.JS colors defined in Color type
export const COLOR_BY_STATUS: { [key: number]: Color } = {
  [STATUS.Any]: "blue",
  [STATUS.Pending]: "yellow",
  [STATUS.Accepted]: "cyan",
  [STATUS.Active]: "green",
  [STATUS.Inactive]: "red",
  [STATUS.Untaken]: "amber",
  [STATUS.Closed]: "slate",
}

export const ICON_BY_STATUS = {
  [STATUS.Any]: null,
  [STATUS.Pending]: ArrowPathIcon,
  [STATUS.Accepted]: CheckCircleIcon,
  [STATUS.Active]: PlayIcon,
  [STATUS.Inactive]: ExclamationTriangleIcon,
  [STATUS.Untaken]: null,
  [STATUS.Closed]: XCircleIcon,
}

export const SPINNER_COLOR = "#0877D5"
