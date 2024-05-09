"use client"

import { combineDateAndTime, getUnixTimestampInSeconds } from "@/utils/dateAndTime.utils"

import { readContract, writeContract, waitForTransaction, signTypedData } from "@wagmi/core"
import { MockTokenABI, PrepaidGasABI, prepaidGasCoreContractAddress, ABIEntry } from "@/helpers"
import { useAccount } from "wagmi"
import { UilWallet } from "@iconscout/react-unicons"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { z } from "zod"
import DialogWindow from "@/components/DialogWindow"
import UserAgreement from "@/components/UserAgreement"
import CreateTxCardSimple, { SimpleTxProps } from "./CreateTxFormSimple"
import CreateTxCardAdvanced from "./CreateTxFormAdvanced"
import { ethers } from "ethers"
import { CHAIN_ID, PROJECT_NAME, PROJECT_VERSION, TEST_ABI_STRING } from "@/constants"
import { Tabs, TabsProps, Form } from "antd"

import dayjs, { type Dayjs } from "dayjs"
import { MessageStruct } from "typechain-types/PrepaidGas"

// const formSchema = z.object({
//   nonce: z.number(),
//   gasOrder: z.number(),
//   onBehalf: z.string(),
//   deadlineDate: z.instanceof(dayjs as unknown as typeof Dayjs),
//   deadlineTime: z.instanceof(dayjs as unknown as typeof Dayjs),
//   to: z.string().min(1),
//   gas: z.number(),
//   tips: z.number(),
//   data: z.string().min(1),
//   smartContractAddress: z.string(),
//   userAbi: z.string(),
// })

// const signedScheme = z.object({
//   signedMsg: z.string(),
//   data: z.string(),
// })

// export type TransactionFormState = z.infer<typeof formSchema>
// export type SignedMsgAndDataState = z.infer<typeof signedScheme>

// const initialState: TransactionFormState = {
//   nonce: Date.now(),
//   gasOrder: 0,
//   onBehalf: address as string,
//   deadlineDate: dayjs().add(1, "d"),
//   deadlineTime: dayjs("00:00", "HH:mm"),
//   to: "0x0000000000000000000000000000000000000000",
//   gas: 25000,
//   tips: 0,
//   data: "0x",
//   smartContractAddress: "",
//   userAbi: TEST_ABI_STRING,
// }

// const signedInitialState: SignedMsgAndDataState = {
//   signedMsg: "",
//   data: "0x",
// }

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
  const { address } = useAccount()

  //todo: remove if using only one form
  const [formSimple] = Form.useForm<SimpleTxProps>()
  // const [formAdvanced] = Form.useForm<AdvancedOrderProps>()

  const [isAbiParsed, setIsAbiParsed] = useState(false)
  const [parsedAbi, setParsedAbi] = useState<ABIEntry[] | undefined>()
  const [showWalletConnectionWindow, setShowWalletConnectionWindow] = useState(false)
  const [pendingData, setPendingData] = useState<PendingTxProps>({ isPending: false, data: undefined })

  const handleTabChange = (tabKey: string) => {}

  const handleSubmit = (values: SimpleTxProps, argValues: any) => {
    let contractInterface = new ethers.Interface(TEST_ABI_STRING)

    const encodedData = contractInterface.encodeFunctionData(values.selectedFunction, argValues)

    console.log("EncodedData: ", encodedData)

    const message: MessageStruct = {
      from: address as string,
      nonce: `0x${values.nonce.toString(16)}`,
      order: `0x${values.gasOrder.toString(16)}`,
      start: `0x${getUnixTimestampInSeconds(combineDateAndTime(values.startDate, values.startTime)).toString(16)}`,
      to: values.to,
      gas: `0x${values.gas.toString(16)}`,
      data: encodedData,
    }
    //setShowDialogWindow(true)
    signMessage(message)
  }

  const signMessage = async (message: MessageStruct) => {
    console.log("Submit started")

    const domain: domainProps = {
      name: PROJECT_NAME,
      version: PROJECT_VERSION,
      chainId: CHAIN_ID,
      verifyingContract: prepaidGasCoreContractAddress(),
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
          address: prepaidGasCoreContractAddress(),
          abi: PrepaidGasABI,
          functionName: "messageValidate",
          args: [message],
        })
        console.log("IsValid: ", validateMessage)
      } catch (e) {
        console.log("ERROR: ", e)
      }

      //todo check typescript
      // @ts-ignore
      const signature = await signTypedData({
        domain,
        message,
        primaryType: "Message",
        types,
      })
      console.log("signature: ", signature)

      const payload = {
        origSign: signature,
        message: message,
      }

      try {
        const response = await fetch("http://api.prepaidgas.io:8001/validate", {
          method: "POST",
          body: JSON.stringify(payload),
        })
        const result = await response
        console.log("POST Success:", result)
      } catch (error) {
        console.error("POST Error:", error)
      }

      // const data = await writeContract({
      //   address: prepaidGasCoreContractAddress(),
      //   abi: PrepaidGasABI,
      //   functionName: "addTransaction",
      //   args: [message, signature],
      // })
      // console.log("addTransactionData: ", data)
      // const txData = await waitForTransaction({ hash: data.hash })
      // console.log("waitForTxData: ", txData)
      // setTransactionDetails({ ...txData })
    } catch (e) {
      console.log("ERROR: ", e)
      setTransactionDetails({ error: e })
    }

    setShowDialogWindow(true)

    // try {
    //   const data = await readContract({
    //     address: prepaidGasCoreContractAddress(),
    //     abi: GasOrderABI,
    //     functionName: "messageHash",
    //     args: [messageTuple],
    //   })
    //   console.log("Data: ", data)
    //   const result = ethers.recoverAddress(data as BytesLike, signature as SignatureLike)
    //   console.log("RecoverAddres: ", result)
    // } catch (e) {
    //   console.log("ERROR: ", e)
    // }

    console.log("Submit ended")
  }

  useEffect(() => {
    if (address !== undefined && pendingData.isPending === true) {
      setShowWalletConnectionWindow(false)
      if (pendingData.data === undefined) {
        console.log("ORDER IS UNDEFINED")
        return
      }
      signMessage({ ...pendingData.data, from: address })
      setPendingData({ isPending: false, data: undefined })
    }
  }, [address])

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Simple",
      children: <CreateTxCardSimple form={formSimple} handleSubmit={handleSubmit} disabled={false} />,
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
        <Tabs defaultActiveKey="1" items={items} onChange={handleTabChange} />
      </div>
    </>
  )
}
