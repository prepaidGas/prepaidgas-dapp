"use client"

import format from "date-fns/format"
import { readContract } from "@wagmi/core"

import { parse, getHours, getMinutes, getSeconds } from "date-fns"
import { DatePickerValue } from "@tremor/react"
import { PaymentStruct, GasPaymentStruct } from "typechain-types/GasOrder"

import { CalendarDaysIcon, CheckIcon, ClockIcon, FireIcon, NoSymbolIcon, WindowIcon } from "@heroicons/react/24/outline"
import {
  Card,
  Text,
  TextInput,
  NumberInput,
  DateRangePicker,
  DateRangePickerItem,
  DatePicker,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Flex,
  Icon,
  Select,
  SelectItem,
  Button,
} from "@tremor/react"
import { useEffect, useState } from "react"
import { GasOrderABI } from "helpers/abi"

interface CreateOrderState {
  gasAmount: number
  executionPeriodStartDate: Date
  executionPeriodStartTime: string
  executionPeriodEndDate: Date
  executionPeriodEndTime: string
  isRevocable: boolean
  executionWindow: number
}

const timeStringRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

export default function CreateOrderCard() {
  const [validationTimer, setValidationTimer] = useState<NodeJS.Timeout | undefined>()

  const [validationErrors, setValidationErrors] = useState({
    gasAmount: "",
    executionPeriodStartDate: "",
    executionPeriodStartTime: "",
    executionPeriodEndDate: "",
    executionPeriodEndTime: "",
    isRevocable: "",
    executionWindow: "",
  })

  const getTomorrowStartDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 1)
    console.log("ISOString: ", date.toISOString())
    return date
  }

  const getTomorrowEndDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 1)
    return new Date(date.getTime() + 30 * 60000)
  }

  const parseTime = (timeString: string) => {
    const parsedTime = parse(timeString, "HH:mm:ss", new Date())
    const hours = getHours(parsedTime)
    const minutes = getMinutes(parsedTime)
    const seconds = getSeconds(parsedTime)
    return [hours, minutes, seconds]
  }

  const combineDateAndTime = (date: Date, time: string) => {
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

  const getUnixTimestampInSeconds = (date: Date) => {
    return Math.floor(date.getTime() / 1000)
  }

  const initialState: CreateOrderState = {
    gasAmount: 0,
    executionPeriodStartDate: getTomorrowStartDate(),
    executionPeriodStartTime: format(getTomorrowStartDate(), "HH:mm:ss"),
    executionPeriodEndDate: getTomorrowEndDate(),
    executionPeriodEndTime: format(getTomorrowStartDate(), "HH:mm:ss"),
    isRevocable: true,
    executionWindow: 1000,
  }

  //Input values
  const [inputValues, setInputValues] = useState({ ...initialState })

  const createOrder = async () => {
    try {
      const data = await readContract({
        address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        abi: GasOrderABI,
        functionName: "createOrder",
        args: [
          inputValues.gasAmount,
          getUnixTimestampInSeconds(
            combineDateAndTime(inputValues.executionPeriodStartDate, inputValues.executionPeriodStartTime),
          ),
          getUnixTimestampInSeconds(
            combineDateAndTime(inputValues.executionPeriodEndDate, inputValues.executionPeriodEndTime),
          ),
          inputValues.executionWindow,
          inputValues.isRevocable,
        ],
      })
      console.log("DATA", data)
    } catch (e) {
      console.log("ERROR: ", e)
    }
  }

  const clampNumber = (value, minNum, maxNum) => {
    console.log("Clamped: ", value)
    if (value === 0) {
      return 0
    }

    if (value < minNum) {
      return minNum
    } else if (value > maxNum) {
      return maxNum
    } else {
      return value
    }
  }

  const validateSearchForm = (isSubmitting?: boolean) => {
    // //TODO: Validations here
    // //Setting Errors after validation
    // setValidationErrors(errors)
    // const IsEverythingValid = Object.values(errors).every((x) => x === "")
    // if (isSubmitting && IsEverythingValid) {
    //   //TODO: CreateOrder here
    // }

    if (isSubmitting) {
      //TODO: CreateOrder here
      createOrder()
    }
  }

  useEffect(() => {
    if (validationTimer !== undefined) {
      clearTimeout(validationTimer)
    }
    const timer = setTimeout(validateSearchForm, 500)
    setValidationTimer(timer)
  }, [inputValues])

  return (
    <Card className="mt-6 flex flex-col w-full">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col">
          <Text>Gas</Text>
          <div className="flex flex-row mt-2">
            <Icon icon={FireIcon}></Icon>
            <NumberInput
              value={inputValues.gasAmount.toString()}
              onChange={(e) =>
                setInputValues({ ...inputValues, gasAmount: clampNumber(Number(e.target.value), 0, 100000) })
              }
              placeholder="Amount of gas to buy"
            ></NumberInput>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <Text>Execution period Start</Text>
          <div className="flex flex-row mt-2">
            <Icon icon={CalendarDaysIcon}></Icon>
            <DatePicker
              onValueChange={(value) => setInputValues({ ...inputValues, executionPeriodStartDate: value })}
              placeholder={format(inputValues.executionPeriodStartDate, "MMM d, y")}
              minDate={inputValues.executionPeriodStartDate}
            />
          </div>
          <div className="flex flex-row mt-2">
            <Icon icon={ClockIcon}></Icon>
            <TextInput
              onChange={(e) => setInputValues({ ...inputValues, executionPeriodStartTime: e.target.value })}
              pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
              placeholder={inputValues.executionPeriodStartTime}
            ></TextInput>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <Text>Execution period End</Text>
          <div className="flex flex-row mt-2">
            <Icon icon={CalendarDaysIcon}></Icon>
            <DatePicker
              onValueChange={(value) => setInputValues({ ...inputValues, executionPeriodEndDate: value })}
              placeholder={format(inputValues.executionPeriodEndDate, "MMM d, y")}
              minDate={inputValues.executionPeriodStartDate}
            />
          </div>
          <div className="flex flex-row mt-2">
            <Icon icon={ClockIcon}></Icon>
            <TextInput
              onChange={(e) => setInputValues({ ...inputValues, executionPeriodEndTime: e.target.value })}
              pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
              placeholder={inputValues.executionPeriodEndTime}
            ></TextInput>
          </div>
        </div>
      </div>
      <Accordion className="mt-4 overflow-visible">
        <AccordionHeader>Advanced Settings</AccordionHeader>
        <AccordionBody className="flex flex-col gap-2">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col justify-between">
              <Text>Is order revocable?</Text>
              <div className="flex flex-row mt-2">
                <Select
                  icon={inputValues.isRevocable ? CheckIcon : NoSymbolIcon}
                  className="min-w-[8rem]"
                  value={inputValues.isRevocable ? "1" : "0"}
                  onValueChange={(value) =>
                    setInputValues({ ...inputValues, isRevocable: value === "0" ? false : true })
                  }
                >
                  <SelectItem icon={NoSymbolIcon} value="0">
                    No
                  </SelectItem>
                  <SelectItem icon={CheckIcon} value="1">
                    Yes
                  </SelectItem>
                </Select>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <Text>Execution window</Text>
              <div className="flex flex-row mt-2">
                <NumberInput placeholder="1000" />
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <Text>Reward transfer</Text>
              <div className="flex flex-row mt-2">
                <NumberInput />
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <Text>Gas cost transfer</Text>
              <div className="flex flex-row mt-2">
                <NumberInput />
              </div>
            </div>
          </div>
        </AccordionBody>
      </Accordion>
      <div className="flex flex-row justify-end mt-4">
        <Button onClick={() => validateSearchForm(true)}>Create</Button>
      </div>
    </Card>
  )
}
