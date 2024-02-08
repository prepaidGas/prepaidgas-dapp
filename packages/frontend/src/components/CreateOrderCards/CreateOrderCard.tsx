"use client"

import {
  getTomorrowStartDate,
  getTomorrowEndDate,
  combineDateAndTime,
  getUnixTimestampInSeconds,
} from "@/utils/dateAndTime.utils"
import format from "date-fns/format"

import { writeContract, waitForTransaction } from "@wagmi/core"
import { MockTokenABI, GasOrderABI, prepaidGasCoreContractAddress } from "@/helpers"
import { PaymentStruct, GasPaymentStruct } from "typechain-types/GasOrder"
import { useAccount } from "wagmi"

import { Card, Icon, Tab, TabGroup, TabList, TabPanel, TabPanels, Title } from "@tremor/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { z } from "zod"
import CreateOrderCardSimple from "./CreateOrderCardSimple"
import CreateOrderCardAdvanced from "./CreateOrderCardAdvanced"
import DialogWindow from "../DialogWindow"
import { WalletIcon } from "@heroicons/react/24/outline"
import UserAgreement from "../UserAgreement"

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

export type CreateOrderState = z.infer<typeof schema>

export default function CreateOrderCard({
  setShowDialogWindow,
  setTransactionDetails,
}: {
  setShowDialogWindow: Dispatch<SetStateAction<boolean>>
  setTransactionDetails: Dispatch<SetStateAction<{}>>
}) {
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

  //rewardValueToken: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",

  //TODO: this initial state is for tests only, remove in production
  //TODO: execution window and dates?
  const initialState: CreateOrderState = {
    gasAmount: 10,
    executionPeriodStartDate: getTomorrowStartDate(),
    executionPeriodStartTime: format(getTomorrowStartDate(), "HH:mm:ss"),
    executionPeriodEndDate: getTomorrowEndDate(),
    executionPeriodEndTime: format(getTomorrowEndDate(), "HH:mm:ss"),
    rewardValueToken: "",
    rewardValueAmount: 10,
    gasCostValueToken: "",
    gasCostValueGasPrice: 10,
    guaranteeValueToken: "",
    guaranteeValueGasPrice: 10,
    executionWindow: 1000,
    rewardTransfer: 10,
    gasCostTransfer: 100,
  }

  const { address, isConnecting, isDisconnected } = useAccount()
  const [showWalletConnectionWindow, setShowWalletConnectionWindow] = useState(false)
  const [isOrderOnHold, setIsOrderOnHold] = useState(false)

  const [inputValues, setInputValues] = useState({ ...initialState })
  const [validationErrors, setValidationErrors] = useState<null | { [key: string]: string }>(null)
  const [validationTimer, setValidationTimer] = useState<NodeJS.Timeout | undefined>()
  const [isValidating, setIsValidating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

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
            prepaidGasCoreContractAddress(),
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
          args: [prepaidGasCoreContractAddress(), inputValues.rewardValueAmount],
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
          args: [prepaidGasCoreContractAddress(), inputValues.gasCostValueGasPrice * inputValues.gasAmount],
        })
        console.log("CreateOrderData: ", data)
      } catch (e) {
        console.log("CreateOrderError: ", e)
      }
    }

    // Create Order
    try {
      const data = await writeContract({
        address: prepaidGasCoreContractAddress(),
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
      if (address !== undefined) {
        createOrder()
      } else {
        setIsOrderOnHold(true)
        setShowWalletConnectionWindow(true)
      }
    } else {
      console.log("Form has errors. Please fix them before submitting.")
    }
  }

  const setAdvancedInputsToDefault = () => {
    setInputValues({
      //save current gas amount
      gasAmount: inputValues.gasAmount,
      //apply new time
      executionPeriodStartDate: getTomorrowStartDate(),
      executionPeriodStartTime: format(getTomorrowStartDate(), "HH:mm:ss"),
      executionPeriodEndDate: getTomorrowEndDate(),
      executionPeriodEndTime: format(getTomorrowEndDate(), "HH:mm:ss"),
      //set all tokens to be equal to gas value token
      gasCostValueToken: inputValues.gasCostValueToken,
      guaranteeValueToken: inputValues.gasCostValueToken,
      rewardValueToken: inputValues.gasCostValueToken,
      //save current gasCostValueGasPrice
      gasCostValueGasPrice: inputValues.gasCostValueGasPrice,
      //recalculate reward and guarantee
      guaranteeValueGasPrice: inputValues.gasAmount * inputValues.gasCostValueGasPrice,
      rewardValueAmount: (inputValues.gasAmount / 10) * inputValues.gasCostValueGasPrice,
      //set execution window to initial value
      executionWindow: initialState.executionWindow,
      //TODO: recalculate reward transfer and gasCost transfer
      rewardTransfer: (inputValues.gasAmount / 10) * inputValues.gasCostValueGasPrice,
      gasCostTransfer: inputValues.gasAmount * inputValues.gasCostValueGasPrice,
    })
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

  useEffect(() => {
    if (address !== undefined && isOrderOnHold) {
      setShowWalletConnectionWindow(false)
      setIsOrderOnHold(false)
      handleSubmit()
    }
  }, [address])

  return (
    <>
      {showWalletConnectionWindow && (
        <DialogWindow
          isClosable={true}
          withoutDescription={true}
          title={
            <div className="flex flex-row items-center">
              <Icon color="orange" variant="outlined" size="lg" icon={WalletIcon}></Icon>
              <Title className="ml-4">Wallet Connection</Title>
            </div>
          }
          description="Please accept our terms of service and connect your wallet to continue with order creation"
          actionButtons={[<UserAgreement />]}
          onClose={() => setShowWalletConnectionWindow(false)}
        />
      )}
      <Card className="mt-6 flex flex-col w-full">
        <TabGroup>
          <TabList className="mt-8">
            <Tab onClick={setAdvancedInputsToDefault}>Simple</Tab>
            <Tab>Advanced</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CreateOrderCardSimple
                setInputValues={setInputValues}
                inputValues={inputValues}
                validationErrors={validationErrors}
                handleSubmit={handleSubmit}
              />
            </TabPanel>
            <TabPanel>
              <CreateOrderCardAdvanced
                setInputValues={setInputValues}
                inputValues={inputValues}
                validationErrors={validationErrors}
                handleSubmit={handleSubmit}
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </>
  )
}
