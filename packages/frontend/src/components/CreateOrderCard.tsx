"use client"

import format from "date-fns/format"
import { writeContract, waitForTransaction } from "@wagmi/core"
import { MockTokenABI, GasOrderABI } from "helpers/abi"

import { parse, getHours, getMinutes, getSeconds } from "date-fns"
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
  DatePickerValue,
} from "@tremor/react"
import { TailSpin } from "react-loader-spinner"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ETH_ADDRESS_REGEX, TIME_STRING_REGEX } from "../constants/regexConstants"
import { SPINNER_COLOR } from "../constants/themeConstants"
import { z } from "zod"

const schema = z.object({
  gasAmount: z.number().int().gt(0),
  executionPeriodStartDate: z.date(),
  executionPeriodStartTime: z.string(),
  executionPeriodEndDate: z.date(),
  executionPeriodEndTime: z.string(),
  rewardValueToken: z.string(),
  rewardValueAmount: z.number().int().gt(0),
  gasCostValueToken: z.string(),
  gasCostValueGasPrice: z.number().int().gt(0),
  guaranteeValueToken: z.string(),
  guaranteeValueGasPrice: z.number().int().gt(0),
  executionWindow: z.number().int().gt(0),
  rewardTransfer: z.number().int().gt(0),
  gasCostTransfer: z.number().int().gt(0),
})

type CreateOrderState = z.infer<typeof schema>

export default function CreateOrderCard({
  setShowDialogWindow,
  setTransactionDetails,
}: {
  setShowDialogWindow: Dispatch<SetStateAction<boolean>>
  setTransactionDetails: Dispatch<SetStateAction<{}>>
}) {
  const [validationTimer, setValidationTimer] = useState<NodeJS.Timeout | undefined>()
  const [isValidating, setIsValidating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [wasRewardTransferChanged, setWasRewardTransferChanged] = useState(false)
  const [wasGasCostTransferChanged, setWasGasCostTransferChanged] = useState(false)

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

  // const initialState: CreateOrderState = {
  //   gasAmount: 0,
  //   executionPeriodStartDate: getTomorrowStartDate(),
  //   executionPeriodStartTime: format(getTomorrowStartDate(), "HH:mm:ss"),
  //   executionPeriodEndDate: getTomorrowEndDate(),
  //   executionPeriodEndTime: format(getTomorrowEndDate(), "HH:mm:ss"),
  //   isRevocable: true,
  //   rewardValueToken: "",
  //   rewardValueAmount: 0,
  //   gasCostValueToken: "",
  //   gasCostValueGasPrice: 0,
  //   guaranteeValueToken: "",
  //   guaranteeValueGasPrice: 0,
  //   executionWindow: 1000,
  //   rewardTransfer: 0,
  //   gasCostTransfer: 0,
  // }

  //TODO: this initial state is for tests only, remove in production
  const initialState: CreateOrderState = {
    gasAmount: 10,
    executionPeriodStartDate: getTomorrowStartDate(),
    executionPeriodStartTime: format(getTomorrowStartDate(), "HH:mm:ss"),
    executionPeriodEndDate: getTomorrowEndDate(),
    executionPeriodEndTime: format(getTomorrowEndDate(), "HH:mm:ss"),
    rewardValueToken: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    rewardValueAmount: 10,
    gasCostValueToken: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    gasCostValueGasPrice: 10,
    guaranteeValueToken: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    guaranteeValueGasPrice: 10,
    executionWindow: 1000,
    rewardTransfer: 10,
    gasCostTransfer: 100,
  }

  //Input values
  const [inputValues, setInputValues] = useState({ ...initialState })

  const createOrder = async () => {
    console.log("CreateOrderTestArr: START")
    const testArr = [
      inputValues.gasAmount,
      getUnixTimestampInSeconds(
        combineDateAndTime(inputValues.executionPeriodStartDate, inputValues.executionPeriodStartTime),
      ),
      getUnixTimestampInSeconds(
        combineDateAndTime(inputValues.executionPeriodEndDate, inputValues.executionPeriodEndTime),
      ),
      inputValues.executionWindow,
      { token: inputValues.rewardValueToken, amount: inputValues.rewardValueAmount } as PaymentStruct,
      { token: inputValues.gasCostValueToken, gasPrice: inputValues.gasCostValueGasPrice } as GasPaymentStruct,
      { token: inputValues.guaranteeValueToken, gasPrice: inputValues.guaranteeValueGasPrice } as GasPaymentStruct,
      inputValues.rewardTransfer,
      inputValues.gasCostTransfer,
    ]
    console.log("CreateOrderTestArr: ", testArr)

    setShowDialogWindow(true)
    setIsLoading(true)

    //Approve both reward and GasCost * GasAmount
    if (inputValues.rewardValueToken === inputValues.gasCostValueToken) {
      try {
        const data = await writeContract({
          address: inputValues.rewardValueToken as `0x${string}`,
          abi: MockTokenABI,
          functionName: "approve",
          args: [
            "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
            inputValues.gasCostValueGasPrice * inputValues.gasAmount + inputValues.rewardValueAmount,
          ],
        })
        console.log("CreateOrderData: ", data)
        const txData = await waitForTransaction({ hash: data.hash })
        console.log("CreateOrderTXData: ", txData)
      } catch (e) {
        console.log("CreateOrderError: ", e)
      }
    } else {
      //Approve reward
      try {
        const data = await writeContract({
          address: inputValues.rewardValueToken as `0x${string}`,
          abi: MockTokenABI,
          functionName: "approve",
          args: ["0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", inputValues.rewardValueAmount],
        })
        console.log("CreateOrderData: ", data)
      } catch (e) {
        console.log("CreateOrderError: ", e)
      }
      //Approve gasCost * gasAmount
      try {
        const data = await writeContract({
          address: inputValues.gasCostValueToken as `0x${string}`,
          abi: MockTokenABI,
          functionName: "approve",
          args: [
            "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
            inputValues.gasCostValueGasPrice * inputValues.gasAmount,
          ],
        })
        console.log("CreateOrderData: ", data)
      } catch (e) {
        console.log("CreateOrderError: ", e)
      }
    }

    // Create Order
    try {
      const data = await writeContract({
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
          { token: inputValues.rewardValueToken, amount: inputValues.rewardValueAmount } as PaymentStruct,
          { token: inputValues.gasCostValueToken, gasPrice: inputValues.gasCostValueGasPrice } as GasPaymentStruct,
          { token: inputValues.guaranteeValueToken, gasPrice: inputValues.guaranteeValueGasPrice } as GasPaymentStruct,
          inputValues.rewardTransfer,
          inputValues.gasCostTransfer,
        ],
      })
      console.log("CreateOrderData: ", data)
      const txData = await waitForTransaction({ hash: data.hash })
      console.log("CreateOrderTXData: ", txData)
      setTransactionDetails(txData)
    } catch (e) {
      console.log(e)
      setTransactionDetails({ error: e })
      console.log("CreateOrderError: ", e)
    }
    setIsLoading(false)
    console.log("CreateOrderTestArr: END")
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
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col">
          <Text>Gas</Text>
          <div className="flex flex-col mt-2">
            <NumberInput
              icon={FireIcon}
              value={inputValues.gasAmount.toString()}
              onChange={(e) =>
                setInputValues({ ...inputValues, gasAmount: clampNumber(Number(e.target.value), 0, 100000) })
              }
              error={!!validationErrors?.gasAmount}
              errorMessage={validationErrors?.gasAmount}
              spellCheck={false}
            />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <Text>Execution period Start</Text>
          <div className="flex flex-row mt-2">
            <DatePicker
              color="red"
              value={inputValues.executionPeriodStartDate}
              onValueChange={(value) => setInputValues({ ...inputValues, executionPeriodStartDate: value })}
              minDate={inputValues.executionPeriodStartDate}
            />
          </div>
          <div className="flex flex-row mt-2">
            <TextInput
              icon={ClockIcon}
              value={inputValues.executionPeriodStartTime}
              onChange={(e) => setInputValues({ ...inputValues, executionPeriodStartTime: e.target.value })}
              placeholder={inputValues.executionPeriodStartTime}
              error={!!validationErrors?.executionPeriodStartTime}
              errorMessage={validationErrors?.executionPeriodStartTime}
              spellCheck={false}
            ></TextInput>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <Text>Execution period End</Text>
          <div className="flex flex-row mt-2">
            <DatePicker
              value={inputValues.executionPeriodEndDate}
              onValueChange={(value) => setInputValues({ ...inputValues, executionPeriodEndDate: value })}
              minDate={inputValues.executionPeriodStartDate}
            />
          </div>
          <div className="flex flex-row mt-2">
            <TextInput
              icon={ClockIcon}
              value={inputValues.executionPeriodEndTime}
              onChange={(e) => setInputValues({ ...inputValues, executionPeriodEndTime: e.target.value })}
              placeholder={inputValues.executionPeriodEndTime}
              error={!!validationErrors?.executionPeriodEndTime}
              errorMessage={validationErrors?.executionPeriodEndTime}
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
            error={!!validationErrors?.rewardValueToken}
            errorMessage={validationErrors?.rewardValueToken}
            spellCheck={false}
            placeholder="0x1dA..."
          />
        </div>
        <div className="flex flex-col lg:grow">
          <Text>Reward Amount</Text>
          <NumberInput
            className="mt-2"
            value={inputValues.rewardValueAmount.toString()}
            onChange={(e) => {
              const rewardValueAmount = clampNumber(Number(e.target.value), 0, 100000)
              wasRewardTransferChanged
                ? setInputValues({ ...inputValues, rewardValueAmount })
                : setInputValues({ ...inputValues, rewardValueAmount, rewardTransfer: rewardValueAmount })
            }}
            error={!!validationErrors?.rewardValueAmount}
            errorMessage={validationErrors?.rewardValueAmount}
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
            error={!!validationErrors?.gasCostValueToken}
            errorMessage={validationErrors?.gasCostValueToken}
            spellCheck={false}
            placeholder="0x1dA..."
          />
        </div>
        <div className="flex flex-col lg:grow">
          <Text>Gas Cost GasPrice</Text>
          <NumberInput
            className="mt-2"
            value={inputValues.gasCostValueGasPrice.toString()}
            onChange={(e) => {
              const gasCostValueGasPrice = clampNumber(Number(e.target.value), 0, 100000)
              wasGasCostTransferChanged
                ? setInputValues({
                    ...inputValues,
                    gasCostValueGasPrice,
                  })
                : setInputValues({
                    ...inputValues,
                    gasCostValueGasPrice,
                    gasCostTransfer: inputValues.gasAmount * gasCostValueGasPrice,
                  })
            }}
            error={!!validationErrors?.gasCostValueGasPrice}
            errorMessage={validationErrors?.gasCostValueGasPrice}
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
            error={!!validationErrors?.guaranteeValueToken}
            errorMessage={validationErrors?.guaranteeValueToken}
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
            error={!!validationErrors?.guaranteeValueGasPrice}
            errorMessage={validationErrors?.guaranteeValueGasPrice}
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
              <Text>Execution window</Text>
              <NumberInput
                className="mt-2"
                value={inputValues.executionWindow.toString()}
                onChange={(e) =>
                  setInputValues({ ...inputValues, executionWindow: clampNumber(Number(e.target.value), 0, 100000) })
                }
                error={!!validationErrors?.executionWindow}
                errorMessage={validationErrors?.executionWindow}
                spellCheck={false}
              />
            </div>
            <div className="flex flex-col ">
              <Text>Reward transfer</Text>
              <NumberInput
                className="mt-2"
                value={inputValues.rewardTransfer.toString()}
                onChange={(e) => {
                  setInputValues({ ...inputValues, rewardTransfer: clampNumber(Number(e.target.value), 0, 100000) })
                  setWasRewardTransferChanged(true)
                }}
                error={!!validationErrors?.rewardTransfer}
                errorMessage={validationErrors?.rewardTransfer}
                spellCheck={false}
              />
            </div>
            <div className="flex flex-col ">
              <Text>Gas cost transfer</Text>
              <NumberInput
                className="mt-2"
                value={inputValues.gasCostTransfer.toString()}
                onChange={(e) => {
                  setInputValues({ ...inputValues, gasCostTransfer: clampNumber(Number(e.target.value), 0, 100000) })
                  setWasGasCostTransferChanged(true)
                }}
                error={!!validationErrors?.gasCostTransfer}
                errorMessage={validationErrors?.gasCostTransfer}
                spellCheck={false}
              />
            </div>
          </div>
        </AccordionBody>
      </Accordion>
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
          {isLoading ? "" : "Create"}
        </Button>
      </div>
    </Card>
  )
}
