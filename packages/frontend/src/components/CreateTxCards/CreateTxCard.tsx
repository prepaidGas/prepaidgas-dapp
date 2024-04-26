"use client"

import { combineDateAndTime, getUnixTimestampInSeconds } from "@/utils/dateAndTime.utils"

import { readContract, writeContract, waitForTransaction, signTypedData } from "@wagmi/core"
import { MockTokenABI, PrepaidGasABI, prepaidGasCoreContractAddress, ABIEntry } from "@/helpers"
import { useAccount } from "wagmi"
import { UilWallet } from "@iconscout/react-unicons"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { z } from "zod"
import DialogWindow from "../DialogWindow"
import UserAgreement from "../UserAgreement"
import CreateTxCardSimple from "./CreateTxCardSimple"
import CreateTxCardAdvanced from "./CreateTxCardAdvanced"
import { ethers } from "ethers"
import { CHAIN_ID, PROJECT_NAME, PROJECT_VERSION, TEST_ABI_STRING } from "@/constants"
import { Tabs, TabsProps } from "antd"

import dayjs, { type Dayjs } from "dayjs"
import { MessageStruct } from "typechain-types/PrepaidGas"

const formSchema = z.object({
  nonce: z.number(),
  gasOrder: z.number(),
  onBehalf: z.string(),
  deadlineDate: z.instanceof(dayjs as unknown as typeof Dayjs),
  deadlineTime: z.instanceof(dayjs as unknown as typeof Dayjs),
  to: z.string().min(1),
  gas: z.number(),
  tips: z.number(),
  data: z.string().min(1),
  smartContractAddress: z.string(),
  userAbi: z.string(),
})

const signedScheme = z.object({
  signedMsg: z.string(),
  data: z.string(),
})

export type TransactionFormState = z.infer<typeof formSchema>
export type SignedMsgAndDataState = z.infer<typeof signedScheme>

export default function CreateTxCard({
  setShowDialogWindow,
  setTransactionDetails,
}: {
  setShowDialogWindow: Dispatch<SetStateAction<boolean>>
  setTransactionDetails: Dispatch<SetStateAction<{}>>
}) {
  const [validationTimer, setValidationTimer] = useState<NodeJS.Timeout | undefined>()
  const [isValidating, setIsValidating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAbiParsed, setIsAbiParsed] = useState(false)
  const [validationErrors, setValidationErrors] = useState<null | { [key: string]: string }>(null)
  const [parsedAbi, setParsedAbi] = useState<ABIEntry[] | undefined>()
  const [showWalletConnectionWindow, setShowWalletConnectionWindow] = useState(false)
  const [isOrderOnHold, setIsOrderOnHold] = useState(false)

  const { address } = useAccount()

  console.log(dayjs("00:00", "HH:mm"))

  const initialState: TransactionFormState = {
    nonce: Date.now(),
    gasOrder: 0,
    onBehalf: address as string,
    deadlineDate: dayjs().add(1, "d"),
    deadlineTime: dayjs("00:00", "HH:mm"),
    to: "0x0000000000000000000000000000000000000000",
    gas: 25000,
    tips: 0,
    data: "0x",
    smartContractAddress: "",
    userAbi: TEST_ABI_STRING,
  }

  const signedInitialState: SignedMsgAndDataState = {
    signedMsg: "",
    data: "0x",
  }

  //Input values
  const [inputValues, setInputValues] = useState<TransactionFormState>({ ...initialState })
  const [signedInputValues, setSignedInputValues] = useState<SignedMsgAndDataState>({ ...signedInitialState })
  const [selectedFunction, setSelectedFunction] = useState<string>("")
  const [argInputs, setArgInputs] = useState<any>([])
  const [argValues, setArgValues] = useState<any>([])

  const setAdvancedInputsToDefault = (tabKey: string) => {
    if (tabKey === "1") {
      console.log("SETTING INPUTS TO DEFAULT")
      setInputValues({
        nonce: Date.now(),
        gasOrder: inputValues.gasOrder,
        onBehalf: address as string,
        deadlineDate: inputValues.deadlineDate,
        deadlineTime: inputValues.deadlineTime,
        to: inputValues.to,
        gas: inputValues.gas,
        tips: 0,
        data: "0x",
        smartContractAddress: "",
        userAbi: TEST_ABI_STRING,
      })

      setSelectedFunction(selectedFunction)
      setArgInputs(argInputs)
      setArgValues(argValues)
    }
  }

  const handleSubmit = () => {
    //setShowDialogWindow(true)
    signMessage()
  }

  const executeFunction = async () => {
    // try {
    //   const data = await writeContract({
    //     address: inputValues.smartContractAddress,
    //     abi: JSON.parse(inputValues.userAbi),
    //     functionName: selectedFunction,
    //     args: argValues,
    //   })
    //   console.log("TransactionData: ", data)
    //   const txData = await waitForTransaction({ hash: data.hash })
    //   console.log("TransactionTXData: ", txData)
    // } catch (e) {
    //   console.log("TransactionError: ", e)
    // }
  }

  const signMessage = async () => {
    console.log("Submit started")

    interface domainProps {
      name: string
      version: string
      chainId: number
      verifyingContract: `0x${string}`
    }

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
      let contractInterface = new ethers.Interface(TEST_ABI_STRING)

      const encodedData = contractInterface.encodeFunctionData(selectedFunction, argValues)

      console.log("EncodedData: ", encodedData)

      const message: MessageStruct = {
        from: address as string,
        nonce: `0x${inputValues.nonce.toString(16)}`,
        order: `0x${inputValues.gasOrder.toString(16)}`,
        start: `0x${getUnixTimestampInSeconds(
          combineDateAndTime(inputValues.deadlineDate, inputValues.deadlineTime),
        ).toString(16)}`,
        to: inputValues.to,
        gas: `0x${inputValues.gas.toString(16)}`,
        data: encodedData,
      }

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
        const response = await fetch("http://192.168.1.100:8001/validate", {
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
    if (address !== undefined && isOrderOnHold) {
      setShowWalletConnectionWindow(false)
      setIsOrderOnHold(false)
      handleSubmit()
    }
  }, [address])

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Simple",
      children: (
        <CreateTxCardSimple
          inputValues={inputValues}
          setInputValues={setInputValues}
          validationErrors={validationErrors}
          handleSubmit={handleSubmit}
          selectedFunction={selectedFunction}
          setSelectedFunction={setSelectedFunction}
          argInputs={argInputs}
          setArgInputs={setArgInputs}
          argValues={argValues}
          setArgValues={setArgValues}
          parsedAbi={parsedAbi}
          setParsedAbi={setParsedAbi}
        />
      ),
    },

    {
      key: "2",
      label: "Advanced",
      children: (
        <CreateTxCardAdvanced
          inputValues={inputValues}
          setInputValues={setInputValues}
          validationErrors={validationErrors}
          handleSubmit={handleSubmit}
          selectedFunction={selectedFunction}
          setSelectedFunction={setSelectedFunction}
          argInputs={argInputs}
          setArgInputs={setArgInputs}
          argValues={argValues}
          setArgValues={setArgValues}
          parsedAbi={parsedAbi}
          setParsedAbi={setParsedAbi}
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
