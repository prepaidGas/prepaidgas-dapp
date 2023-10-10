"use client"

import format from "date-fns/format"
import { readContract } from "@wagmi/core"

import { parse, getHours, getMinutes, getSeconds } from "date-fns"
import { DatePickerValue, Flex } from "@tremor/react"
import { PaymentStruct, GasPaymentStruct } from "typechain-types/GasOrder"

import { CalendarDaysIcon, CheckIcon, ClockIcon, FireIcon, NoSymbolIcon } from "@heroicons/react/24/outline"
import {
  Card,
  Text,
  TextInput,
  NumberInput,
  DatePicker,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Icon,
  Select,
  SelectItem,
  Button,
} from "@tremor/react"
import { useEffect, useState } from "react"
import { GasOrderABI } from "helpers/abi"
import { ETH_ADDRESS_REGEX, TIME_STRING_REGEX } from "../constants/regexConstants"

interface CreateOrderState {
  gasAmount: number
  executionPeriodStartDate: DatePickerValue
  executionPeriodStartTime: string
  executionPeriodEndDate: DatePickerValue
  executionPeriodEndTime: string
  isRevocable: boolean
  rewardValueToken: string
  rewardValueAmount: number
  gasCostValueToken: string
  gasCostValueGasPrice: number
  guaranteeValueToken: string
  guaranteeValueGasPrice: number
  executionWindow: number
  rewardTransfer: number
  gasCostTransfer: number
}

export default function CreateOrderCard() {
  const [validationTimer, setValidationTimer] = useState<NodeJS.Timeout | undefined>()
  const [isValidating, setIsValidating] = useState(false)

  const initialValidationErrors = {
    gasAmount: "",
    executionPeriodStartDate: "",
    executionPeriodStartTime: "",
    executionPeriodEndDate: "",
    executionPeriodEndTime: "",
    isRevocable: "",
    rewardValueToken: "",
    rewardValueAmount: "",
    gasCostValueToken: "",
    gasCostValueGasPrice: "",
    guaranteeValueToken: "",
    guaranteeValueGasPrice: "",
    executionWindow: "",
    rewardTransfer: "",
    gasCostTransfer: "",
  }

  const [validationErrors, setValidationErrors] = useState({ ...initialValidationErrors })

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
    executionPeriodEndTime: format(getTomorrowEndDate(), "HH:mm:ss"),
    isRevocable: true,
    rewardValueToken: "",
    rewardValueAmount: 0,
    gasCostValueToken: "",
    gasCostValueGasPrice: 0,
    guaranteeValueToken: "",
    guaranteeValueGasPrice: 0,
    executionWindow: 1000,
    rewardTransfer: 0,
    gasCostTransfer: 0,
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
          { token: inputValues.rewardValueToken, amount: inputValues.rewardValueAmount } as PaymentStruct,
          { token: inputValues.gasCostValueToken, gasPrice: inputValues.gasCostValueGasPrice } as GasPaymentStruct,
          { token: inputValues.guaranteeValueToken, gasPrice: inputValues.guaranteeValueGasPrice } as GasPaymentStruct,
          inputValues.rewardTransfer,
          inputValues.gasCostTransfer,
        ],
      })
      console.log("CreateOrderData: ", data)
    } catch (e) {
      console.log("CreateOrderError: ", e)
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
    const errors = { ...initialValidationErrors }

    console.log(errors)

    // const clearedErrors = Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: "" }), {})

    if (inputValues.gasAmount === 0) {
      errors.gasAmount = "Must be greater than zero"
    }

    if (!TIME_STRING_REGEX.test(inputValues.executionPeriodStartTime)) {
      errors.executionPeriodStartTime = "Invalid time format"
    }

    if (!TIME_STRING_REGEX.test(inputValues.executionPeriodEndTime)) {
      errors.executionPeriodEndTime = "Invalid time format"
    }

    if (!ETH_ADDRESS_REGEX.test(inputValues.rewardValueToken)) {
      errors.rewardValueToken = "Incorrect address"
    }
    if (inputValues.rewardValueToken === "") {
      errors.rewardValueToken = "This field is required"
    }

    if (inputValues.rewardValueAmount === 0) {
      errors.rewardValueAmount = "Must be greater than zero"
    }

    if (inputValues.gasCostValueToken === "") {
      errors.gasCostValueToken = "This field is required"
    }
    if (inputValues.gasCostValueGasPrice === 0) {
      errors.gasCostValueGasPrice = "Must be greater than zero"
    }

    if (inputValues.guaranteeValueToken === "") {
      errors.guaranteeValueToken = "This field is required"
    }
    if (inputValues.guaranteeValueGasPrice === 0) {
      errors.guaranteeValueGasPrice = "Must be greater than zero"
    }

    if (inputValues.executionWindow === 0) {
      errors.executionWindow = "Must be greater than zero"
    }

    if (inputValues.rewardTransfer === 0) {
      errors.rewardTransfer = "Must be greater than zero"
    }

    if (inputValues.gasCostTransfer === 0) {
      errors.gasCostTransfer = "Must be greater than zero"
    }

    // //TODO: Validations here
    // //Setting Errors after validation
    setValidationErrors(errors)
    // const IsEverythingValid = Object.values(errors).every((x) => x === "")
    // if (isSubmitting && IsEverythingValid) {
    //   //TODO: CreateOrder here
    // }

    // if (isSubmitting) {
    //   //TODO: CreateOrder here
    //   createOrder()
    // }
  }

  const OnFormSubmit = () => {
    setIsValidating(true)
    validateSearchForm(true)
  }

  useEffect(() => {
    console.log("INPUT_VALUES: ", inputValues)

    if (isValidating) {
      if (validationTimer !== undefined) {
        clearTimeout(validationTimer)
      }
      const timer = setTimeout(validateSearchForm, 500)
      setValidationTimer(timer)
    }
  }, [inputValues])

  return (
    <Card className="mt-6 flex flex-col w-full">
      {/* Gas Amount and Date & Time Settings */}
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
              error={!!validationErrors.gasAmount}
              errorMessage={validationErrors.gasAmount}
              spellCheck={false}
            />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <Text>Execution period Start</Text>
          <div className="flex flex-row mt-2">
            <Icon icon={CalendarDaysIcon}></Icon>
            <DatePicker
              value={inputValues.executionPeriodStartDate}
              onValueChange={(value) => setInputValues({ ...inputValues, executionPeriodStartDate: value })}
              minDate={inputValues.executionPeriodStartDate}
            />
          </div>
          <div className="flex flex-row mt-2">
            <Icon icon={ClockIcon}></Icon>
            <TextInput
              value={inputValues.executionPeriodStartTime}
              onChange={(e) => setInputValues({ ...inputValues, executionPeriodStartTime: e.target.value })}
              placeholder={inputValues.executionPeriodStartTime}
              error={!!validationErrors.executionPeriodStartTime}
              errorMessage={validationErrors.executionPeriodStartTime}
              spellCheck={false}
            ></TextInput>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <Text>Execution period End</Text>
          <div className="flex flex-row mt-2">
            <Icon icon={CalendarDaysIcon}></Icon>
            <DatePicker
              value={inputValues.executionPeriodEndDate}
              onValueChange={(value) => setInputValues({ ...inputValues, executionPeriodEndDate: value })}
              minDate={inputValues.executionPeriodStartDate}
            />
          </div>
          <div className="flex flex-row mt-2">
            <Icon icon={ClockIcon}></Icon>
            <TextInput
              value={inputValues.executionPeriodEndTime}
              onChange={(e) => setInputValues({ ...inputValues, executionPeriodEndTime: e.target.value })}
              placeholder={inputValues.executionPeriodEndTime}
              error={!!validationErrors.executionPeriodEndTime}
              errorMessage={validationErrors.executionPeriodEndTime}
              spellCheck={false}
            ></TextInput>
          </div>
        </div>
      </div>

      {/* Reward Settings */}
      <div className="flex flex-col mt-4 lg:flex-row gap-6">
        <div className="flex flex-col lg:grow">
          <Text>Reward Token</Text>
          <TextInput
            className="mt-2"
            value={inputValues.rewardValueToken}
            onChange={(e) => setInputValues({ ...inputValues, rewardValueToken: e.target.value })}
            error={!!validationErrors.rewardValueToken}
            errorMessage={validationErrors.rewardValueToken}
            spellCheck={false}
            placeholder="0x1dA..."
          />
        </div>
        <div className="flex flex-col lg:grow">
          <Text>Reward Amount</Text>
          <NumberInput
            className="mt-2"
            value={inputValues.rewardValueAmount.toString()}
            onChange={(e) =>
              setInputValues({ ...inputValues, rewardValueAmount: clampNumber(Number(e.target.value), 0, 100000) })
            }
            error={!!validationErrors.rewardValueAmount}
            errorMessage={validationErrors.rewardValueAmount}
            spellCheck={false}
          />
        </div>
      </div>

      {/* Gas Cost Settings */}
      <div className="flex flex-col mt-4 lg:flex-row gap-6">
        <div className="flex flex-col lg:grow">
          <Text>Gas Cost Token</Text>
          <TextInput
            className="mt-2"
            value={inputValues.gasCostValueToken}
            onChange={(e) => setInputValues({ ...inputValues, gasCostValueToken: e.target.value })}
            error={!!validationErrors.gasCostValueToken}
            errorMessage={validationErrors.gasCostValueToken}
            spellCheck={false}
            placeholder="0x1dA..."
          />
        </div>
        <div className="flex flex-col lg:grow">
          <Text>Gas Cost GasPrice</Text>
          <NumberInput
            className="mt-2"
            value={inputValues.gasCostValueGasPrice.toString()}
            onChange={(e) =>
              setInputValues({ ...inputValues, gasCostValueGasPrice: clampNumber(Number(e.target.value), 0, 100000) })
            }
            error={!!validationErrors.gasCostValueGasPrice}
            errorMessage={validationErrors.gasCostValueGasPrice}
            spellCheck={false}
          />
        </div>
      </div>

      {/* Guarantee Settings */}
      <div className="flex flex-col mt-4 lg:flex-row gap-6">
        <div className="flex flex-col lg:grow">
          <Text>Guarantee Token</Text>
          <TextInput
            className=" mt-2"
            value={inputValues.guaranteeValueToken}
            onChange={(e) => setInputValues({ ...inputValues, guaranteeValueToken: e.target.value })}
            error={!!validationErrors.guaranteeValueToken}
            errorMessage={validationErrors.guaranteeValueToken}
            spellCheck={false}
            placeholder="0x1dA..."
          />
        </div>
        <div className="flex flex-col lg:grow">
          <Text>Guarantee GasPrice</Text>
          <NumberInput
            className="mt-2"
            value={inputValues.guaranteeValueGasPrice.toString()}
            onChange={(e) =>
              setInputValues({ ...inputValues, guaranteeValueGasPrice: clampNumber(Number(e.target.value), 0, 100000) })
            }
            error={!!validationErrors.guaranteeValueGasPrice}
            errorMessage={validationErrors.guaranteeValueGasPrice}
            spellCheck={false}
          />
        </div>
      </div>

      {/* Advanced Settings */}
      <Accordion className="mt-4 overflow-visible">
        <AccordionHeader>Advanced Settings</AccordionHeader>
        <AccordionBody className="flex flex-col gap-2">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col">
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
            <div className="flex flex-col">
              <Text>Execution window</Text>
              <NumberInput
                className="mt-2"
                value={inputValues.executionWindow.toString()}
                onChange={(e) =>
                  setInputValues({ ...inputValues, executionWindow: clampNumber(Number(e.target.value), 0, 100000) })
                }
                error={!!validationErrors.executionWindow}
                errorMessage={validationErrors.executionWindow}
                spellCheck={false}
              />
            </div>
            <div className="flex flex-col ">
              <Text>Reward transfer</Text>
              <NumberInput
                className="mt-2"
                value={inputValues.rewardTransfer.toString()}
                onChange={(e) =>
                  setInputValues({ ...inputValues, rewardTransfer: clampNumber(Number(e.target.value), 0, 100000) })
                }
                error={!!validationErrors.rewardTransfer}
                errorMessage={validationErrors.rewardTransfer}
                spellCheck={false}
              />
            </div>
            <div className="flex flex-col ">
              <Text>Gas cost transfer</Text>
              <NumberInput
                className="mt-2"
                value={inputValues.gasCostTransfer.toString()}
                onChange={(e) =>
                  setInputValues({ ...inputValues, gasCostTransfer: clampNumber(Number(e.target.value), 0, 100000) })
                }
                error={!!validationErrors.gasCostTransfer}
                errorMessage={validationErrors.gasCostTransfer}
                spellCheck={false}
              />
            </div>
          </div>
        </AccordionBody>
      </Accordion>
      <div className="flex flex-row justify-end mt-4">
        <Button onClick={OnFormSubmit}>Create</Button>
      </div>
    </Card>
  )
}
