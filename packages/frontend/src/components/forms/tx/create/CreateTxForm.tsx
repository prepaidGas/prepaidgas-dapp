"use client"

import { combineDateAndTime, getUnixTimestampInSeconds } from "@/utils/dateAndTime.utils"

import { readContract, writeContract, waitForTransaction, signTypedData } from "@wagmi/core"
import { MockTokenABI, PrepaidGasABI, prepaidGasCoreContractAddress, ABIEntry } from "@/helpers"
import { useAccount } from "wagmi"
import { UilWallet } from "@iconscout/react-unicons"

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import DialogWindow from "@/components/DialogWindow"
import UserAgreement from "@/components/UserAgreement"
import CreateTxCardSimple, { SimpleTxProps } from "./CreateTxFormSimple"
import { ethers } from "ethers"
import { CHAIN_ID, PROJECT_NAME, PROJECT_VERSION, TEST_ABI_STRING } from "@/constants"
import { Tabs, TabsProps, Form, Modal } from "antd"

import dayjs, { type Dayjs } from "dayjs"
import { MessageStruct } from "typechain-types/PrepaidGas"
import CustomConnectBttn from "@/components/CustomConnectBttn"
import { TailSpin } from "react-loader-spinner"
import commonModalConfigs from "@/constants/commonModalConfigs"
import { boolean } from "zod"

type PendingTxProps = {
  isPending: boolean
  data: MessageStruct | undefined
}

interface domainProps {
  name: string
  version: string
  chainId: number
  verifyingContract: `0x${string}`
}

export default function CreateTxForm({
  setShowDialogWindow,
  setTransactionDetails,
}: {
  setShowDialogWindow: Dispatch<SetStateAction<boolean>>
  setTransactionDetails: Dispatch<SetStateAction<{}>>
}) {
  const { WalletConnectionConfig, ProcessingConfig, SuccessConfig, ErrorConfig } = commonModalConfigs

  const { address } = useAccount()

  //todo: remove if using only one form
  const [formSimple] = Form.useForm<SimpleTxProps>()
  // const [formAdvanced] = Form.useForm<AdvancedOrderProps>()

  const [pendingData, setPendingData] = useState<PendingTxProps>({ isPending: false, data: undefined })
  const [inputs, setInputs] = useState({})
  const [modal, contextHolder] = Modal.useModal()

  const handleTabChange = (tabKey: string) => {}

  const handleSubmit = (values: SimpleTxProps) => {
    if (!address) {
      // setPendingData({ isPending: true, data: message })
      const instance = modal.confirm({
        ...WalletConnectionConfig,
        footer: (_, { OkBtn, CancelBtn }) => (
          <>
            <CustomConnectBttn onClick={() => instance.destroy()} />
          </>
        ),
      })
      return
    }

    const processingInstance = modal.info({ ...ProcessingConfig, open: false })

    if (Object.keys(inputs).length === 0) {
      return
    }

    let contractInterface
    let encodedData
    let parsedAbi = JSON.parse(values.userAbi)
    let argsArray: any = []

    showProcessingModal(processingInstance, true)

    parsedAbi = parsedAbi.filter((item) => item.type === "function" && item.name === values.selectedFunction)
    const parsedItem = parsedAbi[0]

    console.log("Submit Parse: ", parsedAbi)
    console.log("Submit Parse Item: ", parsedItem)
    parsedItem.inputs.forEach((element) => {
      const input = inputs[element.name]
      argsArray.push(input)
    })

    console.log("argsArray: ", argsArray)

    try {
      contractInterface = new ethers.Interface(values.userAbi)
    } catch (e) {
      console.log("ERROR contractInterface: ", { error: e })
      // showProcessingModal(false)
      // return modal.error({ ...ErrorConfig, content: e.toString() })
    }

    try {
      encodedData = contractInterface.encodeFunctionData(values.selectedFunction, argsArray)
    } catch (e) {
      console.log("ERROR encodeFunctionData: ", { error: e })
      // showProcessingModal(false)
      // return modal.error({ ...ErrorConfig, content: e.toString() })
    }

    console.log("EncodedData: ", encodedData)

    const message: MessageStruct = {
      from: address as string,
      nonce: `0x${Date.now().toString(16)}`,
      order: `0x${values.gasOrder.toString(16)}`,
      start: `0x${getUnixTimestampInSeconds(combineDateAndTime(values.startDate, values.startTime)).toString(16)}`,
      to: values.to,
      gas: `0x${values.gas.toString(16)}`,
      data: encodedData,
    }

    signMessage(message, processingInstance)
  }

  const signMessage = async (message: MessageStruct, processingInstance) => {
    console.log("Submit started")
    showProcessingModal(processingInstance, true)

    // await switchNetwork({ chainId: 1 });

    const domain: domainProps = {
      name: PROJECT_NAME,
      version: PROJECT_VERSION,
      chainId: CHAIN_ID,
      verifyingContract: prepaidGasCoreContractAddress() as `0x${string}`,
    }

    const types = {
      Message: [
        { name: "from", type: "address" },
        { name: "nonce", type: "uint256" },
        { name: "order", type: "uint256" },
        { name: "start", type: "uint256" },
        { name: "to", type: "address" },
        { name: "gas", type: "uint256" },
        { name: "data", type: "bytes" },
      ],
    }

    console.log("Try bloock reached")
    try {
      //todo: Why is it using TEST ABI STRING????

      try {
        const validateMessage = await readContract({
          address: prepaidGasCoreContractAddress() as `0x${string}`,
          abi: PrepaidGasABI,
          functionName: "messageValidate",
          args: [message],
        })
        console.log("IsValid: ", validateMessage)
      } catch (e) {
        console.log("ERROR: ", e)
        showProcessingModal(processingInstance, false)

        return modal.error({ ...ErrorConfig, content: e.toString() })
      }

      let signature = undefined
      try {
        //todo check typescript
        // @ts-ignore
        signature = await signTypedData({
          domain,
          message,
          primaryType: "Message",
          types,
        })
      } catch (e) {
        console.log("ERROR: ", e)
        showProcessingModal(processingInstance, false)

        return modal.error({ ...ErrorConfig, content: e.toString() })
      }

      console.log("signature: ", signature)

      const payload = {
        origSign: signature,
        message: message,
      }

      console.log("payload: ", payload)

      try {
        const response = await fetch("https://api.prepaidgas.io:443/validate", {
          method: "POST",
          body: JSON.stringify(payload),
        })
        const result = await response
        console.log("POST Success:", result)
      } catch (e) {
        console.error("POST Error:", e)
        showProcessingModal(processingInstance, false)

        return modal.error({ ...ErrorConfig, content: e.toString() })
      }
      modal.success({ ...SuccessConfig, content: <span>"Transaction was successful"</span> })
    } catch (e) {
      console.log("ERROR: ", e)
      showProcessingModal(processingInstance, false)
      return modal.error({ ...ErrorConfig, content: e.toString() })
    }

    console.log("Submit ended")
  }

  function showProcessingModal(instance, isOpen: boolean) {
    console.log("isopen: ", isOpen)
    instance.update((prevState) => ({ ...prevState, open: isOpen }))
  }

  useEffect(() => {
    if (address !== undefined && pendingData.isPending === true) {
      if (pendingData.data === undefined) {
        console.log("ORDER IS UNDEFINED")
        return
      }
      const processingInstance = modal.info({ ...ProcessingConfig, open: false })
      signMessage({ ...pendingData.data, from: address } as MessageStruct, processingInstance)
      setPendingData({ isPending: false, data: undefined })
    }
  }, [address])

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Simple",
      children: (
        <CreateTxCardSimple
          form={formSimple}
          handleSubmit={handleSubmit}
          disabled={false}
          inputs={inputs}
          setInputs={setInputs}
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
