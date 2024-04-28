"use client"

import { combineDateAndTime, getUnixTimestampInSeconds } from "@/utils/dateAndTime.utils"

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
import DialogWindow from "@/components/DialogWindow"
import UserAgreement from "@/components/UserAgreement"
import { Tabs, TabsProps, Form, FormProps } from "antd"
import dayjs, { type Dayjs } from "dayjs"
import { TOKEN_ADDRESS } from "@/constants/tokens"
import CreateOrderFormSimple, { SimpleOrderProps } from "./CreateOrderFormSimple"
import CreateOrderFormAdvanced from "./CreateOrderFormAdvanced"

export type OrderProps = {
  gasAmount: number
  expireDate: Dayjs
  expireTime: Dayjs
  startDate: Dayjs
  startTime: Dayjs
  endDate: Dayjs
  endTime: Dayjs
  txWindow: number
  redeemWindow: number
  gasPriceToken: string
  gasPricePerUnit: number
  guaranteeToken: string
  guaranteePerUnit: number
}

type PendingOrderProps = {
  isOrderPending: boolean
  order: OrderStruct | undefined
}

export default function CreateOrderForm({
  setShowDialogWindow,
  setTransactionDetails,
}: {
  setShowDialogWindow: Dispatch<SetStateAction<boolean>>
  setTransactionDetails: Dispatch<SetStateAction<{}>>
}) {
  const initialState = {
    gasAmount: 100000,
    expireDate: dayjs(),
    expireTime: dayjs("00:00", "HH:mm").add(15, "minute"),
    startDate: dayjs(),
    startTime: dayjs(),
    endDate: dayjs().add(1, "day"),
    endTime: dayjs(),
    txWindow: 600,
    redeemWindow: 7200,
    gasPriceToken: TOKEN_ADDRESS.MockUSD,
    gasPricePerUnit: 10,
    guaranteeToken: TOKEN_ADDRESS.MockUSD,
    guaranteePerUnit: 10,
  }

  const { address, isConnecting, isDisconnected } = useAccount()
  const [showWalletConnectionWindow, setShowWalletConnectionWindow] = useState(false)
  const [pendingOrder, setPendingOrder] = useState<PendingOrderProps>({ isOrderPending: false, order: undefined })

  const [inputValues, setInputValues] = useState({ ...initialState })
  const [isLoading, setIsLoading] = useState(true)

  const createOrder = async (order: OrderStruct) => {
    console.log("CreateOrder: START")
    console.log("Order data to submit: ", { order })

    if (!isWalletConnected()) {
      setPendingOrder({ isOrderPending: true, order })
      setShowWalletConnectionWindow(true)
      return
    }

    console.log("Wallet is connected: ", { address })

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
      console.log("Approve Data: ", data)
      console.log("APPROVED")
    } catch (e) {
      console.log("Approve Error: ", e)
      console.log("APPROVE ERROR")
    }

    console.log("prepaidGasTreasuryContractAddress(): ", prepaidGasTreasuryContractAddress())
    console.log("USER ADDRESS: ", address)

    // Create Order
    try {
      const data = await writeContract({
        address: prepaidGasTreasuryContractAddress(),
        abi: TreasuryABI,
        functionName: "orderCreate",
        args: [order],
      })
      console.log("orderCreate: ", data)
      const txData = await waitForTransaction({ hash: data.hash })
      console.log("orderCreate transaction details: ", txData)
      setTransactionDetails(txData)
    } catch (e) {
      console.log("orderCreate Error: ", e)
      setTransactionDetails({ error: e })
    }
    setIsLoading(false)
    console.log("CreateOrder: END")
  }

  //todo: delete if not using 2 different forms
  const [formSimple] = Form.useForm<SimpleOrderProps>()
  const [formAdvanced] = Form.useForm()

  const handleTabChange = (tabKey: string) => {
    if (tabKey === "1") {
      console.log("SETTING INPUTS TO DEFAULT")

      // form.setFields([{name: }])

      setInputValues({
        gasAmount: inputValues.gasAmount,
        expireDate: dayjs().add(1, "day"),
        expireTime: dayjs("00:00", "HH:mm"),
        startDate: dayjs().add(1, "day"),
        startTime: dayjs("00:00", "HH:mm"),
        endDate: dayjs().add(2, "day"),
        endTime: dayjs("00:00", "HH:mm"),
        txWindow: 600,
        redeemWindow: 7200,
        gasPriceToken: inputValues.gasPriceToken,
        guaranteeToken: inputValues.gasPriceToken,
        gasPricePerUnit: inputValues.gasPricePerUnit,
        guaranteePerUnit: inputValues.gasAmount * inputValues.gasPricePerUnit,
      })
    }
  }

  // console.log("Success:", values)
  // if (address !== undefined) {
  //   createOrder()
  // } else {
  //   setIsOrderOnHold(true)
  //   setShowWalletConnectionWindow(true)
  // }

  const handleSimpleSubmit = (values: SimpleOrderProps) => {
    const order: OrderStruct = {
      manager: address as string,
      gas: values.gasAmount,
      expire: getUnixTimestampInSeconds(combineDateAndTime(dayjs(), dayjs().add(15, "minute"))),
      start: 0,
      end: getUnixTimestampInSeconds(combineDateAndTime(dayjs().add(1, "day"), dayjs())),
      txWindow: 600,
      redeemWindow: 7200,
      gasPrice: { token: values.gasPriceToken, perUnit: values.gasPricePerUnit } as GasPaymentStruct,
      gasGuarantee: { token: values.gasPriceToken, perUnit: values.gasPricePerUnit } as GasPaymentStruct,
    }
    console.log("handleSimpleSubmit: ", { order })

    createOrder(order)
  }

  const handleAdvancedSubmit = (values) => {
    const order: OrderStruct = {
      manager: address as string,
      gas: values.gasAmount,
      expire: getUnixTimestampInSeconds(combineDateAndTime(dayjs(), dayjs().add(15, "minute"))),
      start: 0,
      end: getUnixTimestampInSeconds(combineDateAndTime(dayjs().add(1, "day"), dayjs())),
      txWindow: 600,
      redeemWindow: 7200,
      gasPrice: { token: values.gasPriceToken, perUnit: values.gasPricePerUnit } as GasPaymentStruct,
      gasGuarantee: { token: values.gasPriceToken, perUnit: values.gasPricePerUnit } as GasPaymentStruct,
    }

    console.log("handleSimpleSubmit: ", { order })

    createOrder(order)
  }

  const isWalletConnected = () => {
    if (address !== undefined) {
      return true
    }

    return false
  }

  useEffect(() => {
    if (address !== undefined && pendingOrder.isOrderPending === true) {
      setShowWalletConnectionWindow(false)
      if (pendingOrder.order === undefined) {
        console.log("ORDER IS UNDEFINED")
        return
      }
      createOrder({ ...pendingOrder.order, manager: address })
      setPendingOrder({ isOrderPending: false, order: undefined })
    }
  }, [address])

  // const order: OrderStruct = {
  //   manager: address as string,
  //   gas: inputValues.gasAmount,
  //   expire: isOrderSimple
  //     ? getUnixTimestampInSeconds(combineDateAndTime(dayjs(), dayjs().add(15, "minute")))
  //     : getUnixTimestampInSeconds(combineDateAndTime(inputValues.expireDate, inputValues.expireTime)),
  //   start: isOrderSimple
  //     ? 0
  //     : getUnixTimestampInSeconds(combineDateAndTime(inputValues.startDate, inputValues.startTime)),
  //   end: isOrderSimple
  //     ? getUnixTimestampInSeconds(combineDateAndTime(dayjs().add(1, "day"), dayjs()))
  //     : getUnixTimestampInSeconds(combineDateAndTime(inputValues.endDate, inputValues.endTime)),
  //   txWindow: inputValues.txWindow,
  //   redeemWindow: inputValues.redeemWindow,
  //   gasPrice: { token: inputValues.gasPriceToken, perUnit: inputValues.gasPricePerUnit } as GasPaymentStruct,
  //   gasGuarantee: {
  //     token: inputValues.guaranteeToken,
  //     perUnit: inputValues.guaranteePerUnit,
  //   } as GasPaymentStruct,
  // }

  //todo: make sure this is the best way to store data for tabs. const inside of function may lead to re-renders
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Simple",
      children: (
        <CreateOrderFormSimple
          form={formSimple}
          handleSubmit={handleSimpleSubmit}
          disabled={pendingOrder.isOrderPending}
        />
      ),
      disabled: pendingOrder.isOrderPending,
    },

    // {
    //   key: "2",
    //   label: "Advanced",
    //   children: <CreateOrderFormAdvanced form={formAdvanced} handleSubmit={handleAdvancedSubmit} />,
    // },
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
          onClose={() => {
            setShowWalletConnectionWindow(false)
            setPendingOrder({ isOrderPending: false, order: undefined })
          }}
        />
      )}
      <div className="flex flex-col w-full">
        <Tabs defaultActiveKey="1" items={items} onChange={handleTabChange} />
      </div>
    </>
  )
}
