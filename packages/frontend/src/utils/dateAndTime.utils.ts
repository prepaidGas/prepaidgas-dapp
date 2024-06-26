import { parse, getHours, getMinutes, getSeconds } from "date-fns"
import dayjs, { Dayjs } from "dayjs"

export const combineDateAndTime = (date: Dayjs, time: Dayjs) => {
  const combinedDate = date.clone()
  return combinedDate.set("hour", time.hour()).set("minute", time.minute()).set("second", 0).set("millisecond", 0)
}

export const getUnixTimestampInSeconds = (date: Dayjs) => {
  return date.unix()
}
