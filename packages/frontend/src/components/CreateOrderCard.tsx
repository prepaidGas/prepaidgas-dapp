"use client"

import format from "date-fns/format"
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

interface CreateOrderState {
  gasAmount: number
  executionPeriodStart: Date
  executionPeriodEnd: Date
  isRevocable: boolean
  executionWindow: number
}

const timeStringRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

export default function CreateOrderCard() {
  const [validationTimer, setValidationTimer] = useState<NodeJS.Timeout | undefined>()

  const [startDate, setStartDate] = useState<DatePickerValue>()
  const [startTime, setStartTime] = useState<string>("")
  const [endDate, setEndDate] = useState<DatePickerValue>()
  const [endTime, setEndTime] = useState<string>("")

  const [isRevocable, setIsRevocable] = useState(true)

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

  const initialState: CreateOrderState = {
    gasAmount: 0,
    executionPeriodStart: getTomorrowStartDate(),
    executionPeriodEnd: getTomorrowEndDate(),
    isRevocable: true,
    executionWindow: 1000,
  }

  //Input values
  const [inputValues, setInputValues] = useState({ ...initialState })

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

  const [validationErrors, setValidationErrors] = useState({
    gasAmount: "",
    executionPeriodStart: "",
    executionPeriodEnd: "",
    isRevocable: "",
    executionWindow: "",
  })

  const validateSearchForm = (isSubmitting?: boolean) => {
    // //TODO: Validations here
    // //Setting Errors after validation
    // setValidationErrors(errors)
    // const IsEverythingValid = Object.values(errors).every((x) => x === "")
    // if (isSubmitting && IsEverythingValid) {
    //   //TODO: CreateOrder here
    // }
  }

  useEffect(() => {
    if (validationTimer !== undefined) {
      clearTimeout(validationTimer)
    }
    const timer = setTimeout(validateSearchForm, 500)
    setValidationTimer(timer)
  }, [inputValues, startDate, startTime, endDate, endTime])

  const parseTime = (timeString: string) => {
    const parsedTime = parse(timeString, "HH:mm:ss", new Date())
    const hours = getHours(parsedTime)
    const minutes = getMinutes(parsedTime)
    const seconds = getSeconds(parsedTime)
  }

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
              onValueChange={setStartDate}
              placeholder={format(inputValues.executionPeriodStart, "MMM d, y")}
              minDate={inputValues.executionPeriodStart}
            />
          </div>
          <div className="flex flex-row mt-2">
            <Icon icon={ClockIcon}></Icon>
            <TextInput
              onChange={(e) => setStartTime(e.target.value)}
              pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
              placeholder={format(inputValues.executionPeriodStart, "HH:mm:ss")}
            ></TextInput>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <Text>Execution period End</Text>
          <div className="flex flex-row mt-2">
            <Icon icon={CalendarDaysIcon}></Icon>
            <DatePicker
              onValueChange={setEndDate}
              placeholder={format(inputValues.executionPeriodEnd, "MMM d, y")}
              minDate={startDate}
            />
          </div>
          <div className="flex flex-row mt-2">
            <Icon icon={ClockIcon}></Icon>
            <TextInput
              onChange={(e) => setEndTime(e.target.value)}
              pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
              placeholder={format(inputValues.executionPeriodEnd, "HH:mm:ss")}
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
                  icon={isRevocable ? CheckIcon : NoSymbolIcon}
                  className="min-w-[8rem]"
                  value={isRevocable ? "1" : "0"}
                  onValueChange={(value) => setIsRevocable(value === "0" ? false : true)}
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
        <Button>Create</Button>
      </div>
    </Card>
  )
}
