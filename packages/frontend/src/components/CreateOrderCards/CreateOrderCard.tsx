"use client"

import { combineDateAndTime, getUnixTimestampInSeconds } from "@/utils/dateAndTime.utils"
import format from "date-fns/format"
import { ethers } from "ethers"

import { writeContract, waitForTransaction } from "@wagmi/core"
import {
  MockTokenABI,
  PrepaidGasABI,
  TreasuryABI,
  prepaidGasCoreContractAddress,
  prepaidGasTreasuryContractAddress,
} from "@/helpers"
import { GasPaymentStruct, OrderStruct } from "typechain-types/PrepaidGas"
import { useAccount } from "wagmi"
import { UilWallet } from "@iconscout/react-unicons"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { z } from "zod"
import CreateOrderCardSimple from "./CreateOrderCardSimple"
import CreateOrderCardAdvanced from "./CreateOrderCardAdvanced"
import DialogWindow from "../DialogWindow"
import UserAgreement from "../UserAgreement"
import { Tabs, TabsProps } from "antd"
import dayjs, { type Dayjs } from "dayjs"

const schema = z.object({
  gasAmount: z.number().int().gt(0),
  expireDate: z.instanceof(dayjs as unknown as typeof Dayjs),
  expireTime: z.instanceof(dayjs as unknown as typeof Dayjs),
  startDate: z.instanceof(dayjs as unknown as typeof Dayjs),
  startTime: z.instanceof(dayjs as unknown as typeof Dayjs),
  endDate: z.instanceof(dayjs as unknown as typeof Dayjs),
  endTime: z.instanceof(dayjs as unknown as typeof Dayjs),
  txWindow: z.number().int().gt(0),
  redeemWindow: z.number().int().gt(0),
  gasPriceToken: z.string(),
  gasPricePerUnit: z.number().int().gt(0),
  guaranteeToken: z.string(),
  guaranteePerUnit: z.number().int().gt(0),
})

export type CreateOrderState = z.infer<typeof schema>

export default function CreateOrderCard({
  setShowDialogWindow,
  setTransactionDetails,
}: {
  setShowDialogWindow: Dispatch<SetStateAction<boolean>>
  setTransactionDetails: Dispatch<SetStateAction<{}>>
}) {
  //TODO: this initial state is for tests only, replace in production
  //Values for simple order creation: Redeem window is 2h, txWindow is 10m, expire = current time + 15 mins, start = 0, end = current time + 24h,
  const initialState: CreateOrderState = {
    gasAmount: 100000,
    expireDate: dayjs().add(1, "day"),
    expireTime: dayjs("00:00", "HH:mm"),
    startDate: dayjs().add(1, "day"),
    startTime: dayjs("00:00", "HH:mm"),
    endDate: dayjs().add(2, "day"),
    endTime: dayjs("00:00", "HH:mm"),
    txWindow: 600,
    redeemWindow: 7200,
    gasPriceToken: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    gasPricePerUnit: 10,
    guaranteeToken: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    guaranteePerUnit: 10,
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
      address,
      inputValues.gasAmount,
      getUnixTimestampInSeconds(combineDateAndTime(inputValues.expireDate, inputValues.expireTime)),
      getUnixTimestampInSeconds(combineDateAndTime(inputValues.startDate, inputValues.startTime)),
      getUnixTimestampInSeconds(combineDateAndTime(inputValues.endDate, inputValues.endTime)),
      inputValues.txWindow,
      inputValues.redeemWindow,
      { token: inputValues.gasPriceToken, perUnit: inputValues.gasPricePerUnit } as GasPaymentStruct,
      { token: inputValues.guaranteeToken, perUnit: inputValues.guaranteePerUnit } as GasPaymentStruct,
    ]
    console.log("CreateOrderTestArr: ", testArr)

    setShowDialogWindow(true)
    setIsLoading(true)

    //Approve gasCost * gasAmount
    try {
      const data = await writeContract({
        address: inputValues.gasPriceToken as `0x${string}`,
        abi: MockTokenABI,
        functionName: "approve",
        args: [prepaidGasTreasuryContractAddress(), inputValues.gasPricePerUnit * inputValues.gasAmount],
      })
      console.log("CreateOrderData: ", data)
    } catch (e) {
      console.log("CreateOrderError: ", e)
    }

    const order: OrderStruct = {
      manager: address as string,
      gas: inputValues.gasAmount,
      expire: getUnixTimestampInSeconds(combineDateAndTime(inputValues.expireDate, inputValues.expireTime)),
      start: getUnixTimestampInSeconds(combineDateAndTime(inputValues.startDate, inputValues.startTime)),
      end: getUnixTimestampInSeconds(combineDateAndTime(inputValues.endDate, inputValues.endTime)),
      txWindow: inputValues.txWindow,
      redeemWindow: inputValues.redeemWindow,
      gasPrice: { token: inputValues.gasPriceToken, perUnit: inputValues.gasPricePerUnit } as GasPaymentStruct,
      gasGuarantee: { token: inputValues.guaranteeToken, perUnit: inputValues.guaranteePerUnit } as GasPaymentStruct,
    }

    // Create Order
    try {
      const data = await writeContract({
        address: prepaidGasTreasuryContractAddress(),
        abi: TreasuryABI,
        functionName: "orderCreate",
        args: [
          {
            manager: address,
            gas: inputValues.gasAmount,
            expire: getUnixTimestampInSeconds(combineDateAndTime(inputValues.expireDate, inputValues.expireTime)),
            start: getUnixTimestampInSeconds(combineDateAndTime(inputValues.startDate, inputValues.startTime)),
            end: getUnixTimestampInSeconds(combineDateAndTime(inputValues.endDate, inputValues.endTime)),
            txWindow: inputValues.txWindow,
            redeemWindow: inputValues.redeemWindow,
            gasPrice: { token: inputValues.gasPriceToken, perUnit: inputValues.gasPricePerUnit },
            gasGuarantee: {
              token: inputValues.guaranteeToken,
              perUnit: inputValues.guaranteePerUnit,
            },
          },
        ],
      })
      console.log("CreateOrderData: ", data)
      const txData = await waitForTransaction({ hash: data.hash })
      console.log("CreateOrderTXData: ", txData)
      setTransactionDetails(txData)
    } catch (e) {
      console.log("CreateOrderError: ", e)
      setTransactionDetails({ error: e })
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

  const setAdvancedInputsToDefault = (tabKey: string) => {
    if (tabKey === "1") {
      console.log("SETTING INPUTS TO DEFAULT")

      setInputValues({
        //save current gas amount
        gasAmount: inputValues.gasAmount,
        //apply new time
        expireDate: dayjs().add(1, "day"),
        expireTime: dayjs("00:00", "HH:mm"),
        startDate: dayjs().add(1, "day"),
        startTime: dayjs("00:00", "HH:mm"),
        endDate: dayjs().add(2, "day"),
        endTime: dayjs("00:00", "HH:mm"),
        //set execution window to initial value
        txWindow: 600,
        redeemWindow: 7200,
        //set all tokens to be equal to gas value token
        gasPriceToken: inputValues.gasPriceToken,
        guaranteeToken: inputValues.gasPriceToken,
        //save current gasCostValueGasPrice
        gasPricePerUnit: inputValues.gasPricePerUnit,
        //recalculate reward and guarantee
        guaranteePerUnit: inputValues.gasAmount * inputValues.gasPricePerUnit,
      })
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

  useEffect(() => {
    if (address !== undefined && isOrderOnHold) {
      setShowWalletConnectionWindow(false)
      setIsOrderOnHold(false)
      handleSubmit()
    }
  }, [address])

  //todo: make sure this is the best way to store data for tabs. const inside of function may lead to re-renders
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Simple",
      children: (
        <CreateOrderCardSimple
          setInputValues={setInputValues}
          inputValues={inputValues}
          validationErrors={validationErrors}
          handleSubmit={handleSubmit}
        />
      ),
    },

    {
      key: "2",
      label: "Advanced",
      children: (
        <CreateOrderCardAdvanced
          setInputValues={setInputValues}
          inputValues={inputValues}
          validationErrors={validationErrors}
          handleSubmit={handleSubmit}
        />
      ),
    },
  ]

  return (
    <>
      {showWalletConnectionWindow && (
        <DialogWindow
          isClosable={true}
          withoutDescription={true}
          title={
            <div className="flex flex-row items-center [&>*]:fill-[#404040] [&>*]:dark:fill-[#A4A5AA]">
              <UilWallet />
              <span className="ml-4 base-text text-xl">Wallet Connection</span>
            </div>
          }
          description="Please accept our terms of service and connect your wallet to continue with order creation"
          actionButtons={[<UserAgreement />]}
          onClose={() => setShowWalletConnectionWindow(false)}
        />
      )}
      <div className="flex flex-col w-full">
        <Tabs defaultActiveKey="1" items={items} onChange={setAdvancedInputsToDefault} />
      </div>
    </>
  )
}
