import { parse, getHours, getMinutes, getSeconds } from "date-fns"

export const getTomorrowStartDate = () => {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  return date
}

export const getTomorrowEndDate = () => {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  return new Date(date.getTime() + 30 * 60000)
}

export const parseTime = (timeString: string) => {
  const parsedTime = parse(timeString, "HH:mm:ss", new Date())
  const hours = getHours(parsedTime)
  const minutes = getMinutes(parsedTime)
  const seconds = getSeconds(parsedTime)
  return [hours, minutes, seconds]
}

export const combineDateAndTime = (date: Date, time: string) => {
  const hoursMinutesSeconds = parseTime(time)
  const combinedDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hoursMinutesSeconds[0],
    hoursMinutesSeconds[1],
    hoursMinutesSeconds[2],
  )
  return combinedDate
}

export const getUnixTimestampInSeconds = (date: Date) => {
  return Math.floor(date.getTime() / 1000)
}
