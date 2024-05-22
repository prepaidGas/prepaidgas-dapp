"use client"
import { readContract } from "@wagmi/core"
import { combineDateAndTime, getUnixTimestampInSeconds } from "@/utils/dateAndTime.utils"
import { writeContract, waitForTransaction, WriteContractResult } from "@wagmi/core"
import {
  MockTokenABI,
  PrepaidGasABI,
  TreasuryABI,
  prepaidGasCoreContractAddress,
  prepaidGasTreasuryContractAddress,
} from "@/helpers"
import { GasPaymentStruct, OrderStruct } from "typechain-types/PrepaidGas"
import { useAccount } from "wagmi"
import { UilWallet, UiProcess } from "@iconscout/react-unicons"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import DialogWindow from "@/components/DialogWindow"
import UserAgreement from "@/components/UserAgreement"
import { Tabs, TabsProps, Form, FormProps, Modal } from "antd"
import dayjs, { type Dayjs } from "dayjs"
import { TOKEN_ADDRESS } from "@/constants/tokens"
import CreateOrderFormSimple, { SimpleOrderProps } from "./CreateOrderFormSimple"
import CreateOrderFormAdvanced, { AdvancedOrderProps } from "./CreateOrderFormAdvanced"
import { TailSpin } from "react-loader-spinner"
import CustomConnectBttn from "@/components/CustomConnectBttn"

type PendingOrderProps = {
  isOrderPending: boolean
  order: OrderStruct | undefined
}

export default function CreateOrderForm() {
  const { address } = useAccount()

  const [formSimple] = Form.useForm<SimpleOrderProps>()
  const [formAdvanced] = Form.useForm<AdvancedOrderProps>()

  const [pendingOrder, setPendingOrder] = useState<PendingOrderProps>({ isOrderPending: false, order: undefined })

  const [isLoading, setIsLoading] = useState(true)

  const [modal, contextHolder] = Modal.useModal()

  const showWalletConnectionModal = () => {
    const instance = modal.confirm({
      title: "Wallet Connection",
      // icon: <UilWallet />,
      content: "Please connect your wallet to continue with order creation",
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CustomConnectBttn onClick={() => instance.destroy()} />
        </>
      ),
    })
  }

  const showSuccess = (txData: any) => {
    modal.success({
      title: "Success",
      closable: true,
      content: (
        <div className="flex flex-col break-words gap-4">
          From
          <span>{txData.from}</span>
          To
          <span>{txData.to}</span>
          Transaction Hash
          <span>{txData.transactionHash}</span>
          Status
          <span>{txData.status}</span>
        </div>
      ),
    })
  }

  const showError = (error: any) => {
    modal.error({ title: "Error", closable: true, content: error })
  }

  const showProcessing = () => {
    return modal.info({
      title: "Processing",
      // icon: <UiProcess />,
      closable: false,
      content: (
        <div className="flex justify-center">
          <TailSpin
            height={40}
            width={40}
            color={"#009688"}
            ariaLabel="tail-spin-loading"
            radius="0"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ),
    })
  }

  const createOrder = async (order: OrderStruct) => {
    console.log("CreateOrder: START")
    console.log("Order data to submit: ", { order })
    const processingModal = showProcessing()
    setIsLoading(true)

    if (!isWalletConnected()) {
      setPendingOrder({ isOrderPending: true, order })
      showWalletConnectionModal()
      return
    }

    console.log("Wallet is connected: ", { address })

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
      processingModal.destroy()
      return showError(e)
    }

    const overallPrice = Number(order.gasPrice.perUnit) * Number(order.gas)

    let data = undefined
    if (allowance < overallPrice) {
      try {
        data = await writeContract({
          address: order.gasPrice.token as `0x${string}`,
          abi: MockTokenABI,
          functionName: "approve",
          args: [prepaidGasTreasuryContractAddress(), overallPrice],
        })
        console.log("Approve Data: ", data)
      } catch (e) {
        console.log("Approve Error: ", e)
        return showError(e)
      }

      const txData = await waitForTransaction({ hash: data.hash })
      console.log("Approve transaction details: ", txData)
    }

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
      processingModal.destroy()
      showSuccess(txData)
    } catch (e) {
      console.log("orderCreate Error: ", e)
      processingModal.destroy()
      return showError(e)
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
      if (pendingOrder.order === undefined) {
        console.log("ORDER IS UNDEFINED")
        return
      }
      createOrder({ ...pendingOrder.order, manager: address })
      setPendingOrder({ isOrderPending: false, order: undefined })
    }
  }, [address])

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
      <div className="flex flex-col w-full">
        <Tabs defaultActiveKey="1" items={items} onChange={handleTabChange} />
        {contextHolder}
      </div>
    </>
  )
}
