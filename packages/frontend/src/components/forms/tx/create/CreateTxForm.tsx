"use client"

import { combineDateAndTime, getUnixTimestampInSeconds } from "@/utils/dateAndTime.utils"

import { readContract, signTypedData } from "@wagmi/core"
import { PrepaidGasABI, prepaidGasCoreContractAddress } from "@/helpers"
import { useAccount } from "wagmi"

import { useEffect, useState } from "react"

import CreateTxCardSimple, { SimpleTxProps } from "./CreateTxFormSimple"
import { ethers } from "ethers"
import { CHAIN_ID, PROJECT_NAME, PROJECT_VERSION, TEST_ABI_STRING } from "@/constants"
import { Tabs, TabsProps, Form, Modal } from "antd"

import { MessageStruct } from "typechain-types/PrepaidGas"
import CustomConnectBttn from "@/components/CustomConnectBttn"

import commonModalConfigs from "@/constants/commonModalConfigs"

type PendingTxProps = {
  isPending: boolean
  data: SimpleTxProps | undefined
}

interface domainProps {
  name: string
  version: string
  chainId: number
  verifyingContract: `0x${string}`
}

const ValidationMsg = {
  0: "None",
  1: "Start In Future",
  2: "Nonce Exhaustion",
  3: "Balance Compliance",
  4: "Owner Compliance",
  5: "Timeline Compliance",
}

export default function CreateTxForm() {
  const { WalletConnectionConfig, ProcessingConfig, SuccessConfig, ErrorConfig } = commonModalConfigs

  const { address } = useAccount()

  //todo: remove if using only one form
  const [formSimple] = Form.useForm<SimpleTxProps>()
  // const [formAdvanced] = Form.useForm<AdvancedOrderProps>()

  const [pendingData, setPendingData] = useState<PendingTxProps>({ isPending: false, data: undefined })
  const [inputs, setInputs] = useState({})
  const [modal, contextHolder] = Modal.useModal()

  const handleTabChange = (tabKey: string) => {}

  const showError = (error: any) => {
    modal.error({ ...ErrorConfig, content: error.details ? error.details : error })
  }

  const encodeFuncData = (abi: any, selectedFunc: string, argsArray: any) => {
    const contractInterface = new ethers.Interface(abi)
    const encodedData = contractInterface.encodeFunctionData(selectedFunc, argsArray)
    return encodedData
  }

  const handleSubmit = (values: SimpleTxProps) => {
    if (!address) {
      setPendingData({ isPending: true, data: values })
      const instance = modal.confirm({
        ...WalletConnectionConfig,
        onCancel() {
          setPendingData({ isPending: false, data: undefined })
        },
        footer: (_, { OkBtn, CancelBtn }) => (
          <div className="flex flex-row-reverse gap-2">
            <CustomConnectBttn onClick={() => instance.destroy()} />
            <CancelBtn />
          </div>
        ),
      })
      return
    }

    let parsedAbi = JSON.parse(values.userAbi)
    let argsArray: any = []

    modal.info({ ...ProcessingConfig })

    parsedAbi = parsedAbi.filter((item) => item.type === "function" && item.name === values.selectedFunction)
    const parsedItem = parsedAbi[0]
    console.log("Submit Parse: ", parsedAbi)
    console.log("Submit Parse Item: ", parsedItem)
    parsedItem.inputs.forEach((element) => {
      const input = inputs[element.name]
      argsArray.push(input)
    })

    console.log("argsArray: ", argsArray)

    let encodedData = undefined
    try {
      encodedData = encodeFuncData(values.userAbi, values.selectedFunction, argsArray)
    } catch (error) {
      console.log("ERROR encodeFuncData: ", error)
      Modal.destroyAll()
      return showError(error)
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

    signMessage(message)
  }

  const signMessage = async (message: MessageStruct) => {
    console.log("Submit started")

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

    try {
      const validateMessage = await readContract({
        address: prepaidGasCoreContractAddress() as `0x${string}`,
        abi: PrepaidGasABI,
        functionName: "messageValidate",
        args: [message],
      })
      console.log("IsValid: ", validateMessage)
      if (validateMessage != 0) {
        Modal.destroyAll()
        return modal.error({ ...ErrorConfig, content: <span>{ValidationMsg[validateMessage as number]}</span> })
      }
    } catch (e) {
      console.log("ERROR: ", e)
      Modal.destroyAll()
      return showError(e)
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
      Modal.destroyAll()

      return showError(e)
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
      Modal.destroyAll()

      modal.success({ ...SuccessConfig, content: <span>"Transaction was successful"</span> })
    } catch (e) {
      console.error("POST Error:", e)
      Modal.destroyAll()

      return showError(e)
    }
    console.log("Submit ended")
  }

  useEffect(() => {
    if (address !== undefined && pendingData.isPending === true) {
      if (pendingData.data === undefined) {
        console.log("ORDER IS UNDEFINED")
        return
      }
      handleSubmit(pendingData.data)
      console.log("Pending Submit: ", pendingData)

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
          disabled={pendingData.isPending}
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
