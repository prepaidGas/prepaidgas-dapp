"use client"
import { readContract } from "@wagmi/core"
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
import CreateOrderFormAdvanced, { AdvancedOrderProps } from "./CreateOrderFormAdvanced"

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
  const { address } = useAccount()

  const [formSimple] = Form.useForm<SimpleOrderProps>()
  const [formAdvanced] = Form.useForm<AdvancedOrderProps>()

  const [showWalletConnectionWindow, setShowWalletConnectionWindow] = useState(false)
  const [pendingOrder, setPendingOrder] = useState<PendingOrderProps>({ isOrderPending: false, order: undefined })

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

    let allowance = 0
    try {
      const data = await readContract({
        address: order.gasPrice.token as `0x${string}`,
        abi: MockTokenABI,
        functionName: "allowance",
        args: [address, prepaidGasTreasuryContractAddress()],
      })
      console.log("Allowance Data: ", { data })
      allowance = Number(data)
    } catch (e) {
      console.log("Allowance ERROR: ", e)
    }

    const overallPrice = Number(order.gasPrice.perUnit) * Number(order.gas)

    if (allowance < overallPrice) {
      try {
        const data = await writeContract({
          address: order.gasPrice.token as `0x${string}`,
          abi: MockTokenABI,
          functionName: "approve",
          args: [prepaidGasTreasuryContractAddress(), overallPrice],
        })
        console.log("Approve Data: ", data)
        console.log("APPROVED")
        const txData = await waitForTransaction({ hash: data.hash })
        console.log("Approve transaction details: ", txData)
      } catch (e) {
        console.log("Approve Error: ", e)
        console.log("APPROVE ERROR")
      }
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

  const handleTabChange = (tabKey: string) => {
    console.log("TabKey: ", tabKey)
    if (tabKey === "1") {
      formSimple.resetFields()
      formAdvanced.resetFields()
    } else {
      formAdvanced.setFieldsValue({
        gasAmount: formSimple.getFieldValue("gasAmount"),
        expireDate: dayjs(),
        expireTime: dayjs().add(15, "m"),
        startDate: dayjs(),
        startTime: dayjs(),
        endDate: dayjs().add(1, "d"),
        endTime: dayjs(),
        txWindow: 600,
        redeemWindow: 7200,
        gasPriceToken: TOKEN_ADDRESS.MockGasPrice,
        gasPricePerUnit: formSimple.getFieldValue("gasPricePerUnit"),
        guaranteeToken: TOKEN_ADDRESS.MockGuarantee,
        guaranteePerUnit: 0,
      })
    }
  }

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
      // use values.gasPricePerUnit as guarantee perUnit value in prod
      gasGuarantee: { token: TOKEN_ADDRESS.MockGuarantee, perUnit: 0 } as GasPaymentStruct,
    }
    console.log("handleSimpleSubmit: ", { order })

    createOrder(order)
  }

  const handleAdvancedSubmit = (values: AdvancedOrderProps) => {
    const order: OrderStruct = {
      manager: address as string,
      gas: values.gasAmount,
      expire: getUnixTimestampInSeconds(combineDateAndTime(values.expireDate, values.expireTime)),
      start: getUnixTimestampInSeconds(combineDateAndTime(values.startDate, values.startTime)),
      end: getUnixTimestampInSeconds(combineDateAndTime(values.endDate, values.endTime)),
      txWindow: values.txWindow,
      redeemWindow: values.redeemWindow,
      gasPrice: { token: values.gasPriceToken, perUnit: values.gasPricePerUnit } as GasPaymentStruct,
      gasGuarantee: { token: values.guaranteeToken, perUnit: values.guaranteePerUnit } as GasPaymentStruct,
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

    {
      key: "2",
      label: "Advanced",
      children: (
        <CreateOrderFormAdvanced
          form={formAdvanced}
          handleSubmit={handleAdvancedSubmit}
          disabled={pendingOrder.isOrderPending}
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
