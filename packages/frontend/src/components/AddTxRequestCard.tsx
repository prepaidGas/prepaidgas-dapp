"use client"

import format from "date-fns/format"
import { writeContract, waitForTransaction } from "@wagmi/core"
import { MockTokenABI, GasOrderABI, prepaidGasCoreContractAddress } from "@/helpers"
import { parse, getHours, getMinutes, getSeconds } from "date-fns"
import { MessageStruct } from "typechain-types/GasOrder"

import { CalendarDaysIcon, CheckIcon, ClockIcon, FireIcon, NoSymbolIcon, WalletIcon } from "@heroicons/react/24/outline"
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
  DatePickerValue,
} from "@tremor/react"
import { TailSpin } from "react-loader-spinner"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ETH_ADDRESS_REGEX, TIME_STRING_REGEX, SPINNER_COLOR } from "@/constants"

import { z } from "zod"

const schema = z.object({
  from: z.string().min(1),
  nonce: z.number(),
  gasOrder: z.number(),
  onBehalf: z.string().min(1),
  deadlineDate: z.date(),
  deadlineTime: z.string().min(1),
  to: z.string().min(1),
  gas: z.number(),
  data: z.string().min(1),
})

type AddTxRequestState = z.infer<typeof schema>

export default function AddTxRequestCard({
  setShowDialogWindow,
  setTransactionDetails,
}: {
  setShowDialogWindow: Dispatch<SetStateAction<boolean>>
  setTransactionDetails: Dispatch<SetStateAction<{}>>
}) {
  const [validationTimer, setValidationTimer] = useState<NodeJS.Timeout | undefined>()
  const [isValidating, setIsValidating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [validationErrors, setValidationErrors] = useState<null | { [key: string]: string }>(null)

  const getTomorrowStartDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 1)
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

  //TODO: this initial state is for tests only, remove in production
  const initialState: AddTxRequestState = {
    from: "",
    nonce: 0,
    gasOrder: 0,
    onBehalf: "",
    deadlineDate: null,
    deadlineTime: null,
    to: "",
    gas: 0,
    data: "",
  }

  //Input values
  const [inputValues, setInputValues] = useState({ ...initialState })

  const createOrder = async () => {
    // Add Tx Request
    try {
      const data = await writeContract({
        address: prepaidGasCoreContractAddress(),
        abi: GasOrderABI,
        functionName: "addTransaction",
        args: [
          "",
          {
            from: inputValues.from,
            nonce: inputValues.nonce,
            gasOrder: inputValues.gasOrder,
            onBehalf: inputValues.onBehalf,
            deadline: getUnixTimestampInSeconds(combineDateAndTime(inputValues.deadlineDate, inputValues.deadlineTime)),
            to: inputValues.to,
            gas: inputValues.gas,
            tips: 0, // @todo update the value
          } as MessageStruct,
        ],
      })
      console.log("CreateOrderData: ", data)
      const txData = await waitForTransaction({ hash: data.hash })
      console.log("CreateOrderTXData: ", txData)
      setTransactionDetails(txData)
    } catch (e) {
      console.log(e)
      setTransactionDetails({ error: e })
      console.log("AddRequestTestArr: ", e)
    }
    setIsLoading(false)
    console.log("AddRequestTestArr: END")
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

  const validateSearchForm = () => {
    setValidationErrors(null)

    const result = schema.safeParse(inputValues)
    if (result.success === false) {
      const formatedErrors = Object.entries(result.error.flatten().fieldErrors).reduce((acc, curr) => {
        const [error, errorTexts] = curr
        acc[error] = errorTexts[0]
        return acc
      }, {})
      setValidationErrors(formatedErrors)
      return false
    }
    return true
  }

  const handleSubmit = () => {
    setIsValidating(true)

    if (validateSearchForm()) {
      createOrder()
    } else {
      console.log("Form has errors. Please fix them before submitting.")
    }
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
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <Text>From</Text>
          <div className="flex flex-col mt-2">
            <TextInput
              icon={WalletIcon}
              value={inputValues.from}
              onChange={(e) => setInputValues({ ...inputValues, from: e.target.value })}
              placeholder={inputValues.from}
              error={!!validationErrors?.from}
              errorMessage={validationErrors?.from}
              spellCheck={false}
            ></TextInput>
          </div>
        </div>
        <div className="flex flex-col">
          <Text>Nonce</Text>
          <div className="flex flex-row mt-2">
            <NumberInput
              value={inputValues.nonce.toString()}
              onChange={(e) =>
                setInputValues({ ...inputValues, nonce: clampNumber(Number(e.target.value), 0, 100000) })
              }
              error={!!validationErrors?.nonce}
              errorMessage={validationErrors?.nonce}
              spellCheck={false}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <Text>Gas Order</Text>
          <div className="flex flex-row">
            <NumberInput
              className="mt-2"
              value={inputValues.gasOrder.toString()}
              onChange={(e) =>
                setInputValues({ ...inputValues, gasOrder: clampNumber(Number(e.target.value), 0, 100000) })
              }
              error={!!validationErrors?.gasOrder}
              errorMessage={validationErrors?.gasOrder}
              spellCheck={false}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <Text>On Behalf</Text>
          <div className="flex flex-col mt-2">
            <TextInput
              icon={WalletIcon}
              value={inputValues.onBehalf}
              onChange={(e) => setInputValues({ ...inputValues, onBehalf: e.target.value })}
              placeholder={inputValues.onBehalf}
              error={!!validationErrors?.onBehalf}
              errorMessage={validationErrors?.onBehalf}
              spellCheck={false}
            ></TextInput>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <Text>Execution period End</Text>
          <div className="flex flex-row mt-2">
            <DatePicker
              value={inputValues.deadlineDate}
              onValueChange={(value) => setInputValues({ ...inputValues, deadlineDate: value })}
            />
          </div>
          <div className="flex flex-col mt-2">
            <TextInput
              icon={ClockIcon}
              value={inputValues.deadlineTime}
              onChange={(e) => setInputValues({ ...inputValues, deadlineTime: e.target.value })}
              placeholder={inputValues.deadlineTime}
              error={!!validationErrors?.deadlineTime}
              errorMessage={validationErrors?.deadlineTime}
              spellCheck={false}
            ></TextInput>
          </div>
        </div>

        <div className="flex flex-col">
          <Text>To</Text>
          <div className="flex flex-col mt-2">
            <TextInput
              icon={WalletIcon}
              value={inputValues.to}
              onChange={(e) => setInputValues({ ...inputValues, to: e.target.value })}
              placeholder={inputValues.to}
              error={!!validationErrors?.to}
              errorMessage={validationErrors?.to}
              spellCheck={false}
            ></TextInput>
          </div>
        </div>

        <div className="flex flex-col">
          <Text>Gas</Text>
          <div className="flex flex-row mt-2">
            <NumberInput
              value={inputValues.gas.toString()}
              onChange={(e) => setInputValues({ ...inputValues, gas: clampNumber(Number(e.target.value), 0, 100000) })}
              error={!!validationErrors?.gas}
              errorMessage={validationErrors?.gas}
              spellCheck={false}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row md:justify-end mt-4">
        <Button className="grow md:grow-0" disabled={isLoading} onClick={handleSubmit}>
          {/* <Button onClick={() => setIsLoading(!isLoading)}> */}
          <TailSpin
            height={20}
            width={20}
            color={SPINNER_COLOR}
            ariaLabel="tail-spin-loading"
            radius="0"
            wrapperStyle={{}}
            wrapperClass=""
            visible={isLoading}
          />
          {isLoading ? "" : "Add"}
        </Button>
      </div>
    </Card>
  )
}
