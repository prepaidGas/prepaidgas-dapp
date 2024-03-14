"use client"

import { combineDateAndTime, getUnixTimestampInSeconds } from "@/utils/dateAndTime.utils"
import format from "date-fns/format"

import { readContract, writeContract, waitForTransaction, signTypedData } from "@wagmi/core"
import { MockTokenABI, GasOrderABI, prepaidGasCoreContractAddress, ABIEntry } from "@/helpers"
import { PaymentStruct, GasPaymentStruct } from "typechain-types/GasOrder"
import { useAccount } from "wagmi"
import { UilWallet } from "@iconscout/react-unicons"

import { Card, Icon, Tab, TabGroup, TabList, TabPanel, TabPanels, Title } from "@tremor/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { z } from "zod"
import DialogWindow from "../DialogWindow"
import { WalletIcon } from "@heroicons/react/24/outline"
import UserAgreement from "../UserAgreement"
import CreateTxCardSimple from "./CreateTxCardSimple"
import CreateTxCardAdvanced from "./CreateTxCardAdvanced"
import { CHAIN_ID, PROJECT_NAME, PROJECT_VERSION } from "constants/executor"
import { ethers } from "ethers"
import { TEST_ABI_STRING } from "@/constants"
import { Tabs, TabsProps } from "antd"

import dayjs, { type Dayjs } from "dayjs"

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
  const [numberOfOrders, setNumberOfOrders] = useState(0)
  const [showWalletConnectionWindow, setShowWalletConnectionWindow] = useState(false)
  const [isOrderOnHold, setIsOrderOnHold] = useState(false)

  const { address } = useAccount()

  console.log(dayjs("00:00", "HH:mm"))

  const initialState: TransactionFormState = {
    nonce: Date.now(),
    gasOrder: 0,
    onBehalf: address,
    deadlineDate: dayjs().add(1, "d"),
    deadlineTime: dayjs("00:00", "HH:mm"),
    to: "",
    gas: 0,
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
        onBehalf: address,
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

  const validateSearchForm = () => {
    setValidationErrors(null)
    let formatedErrors: any = {}
    let isValid = true
    const deadline = getUnixTimestampInSeconds(combineDateAndTime(inputValues.deadlineDate, inputValues.deadlineTime))

    const result = formSchema.safeParse(inputValues)
    if (result.success === false) {
      formatedErrors = Object.entries(result.error.flatten().fieldErrors).reduce((acc, curr) => {
        const [error, errorTexts] = curr
        acc[error] = errorTexts[0]
        console.log(error)
        return acc
      }, {})
      isValid = false
      console.log("not safe parsed")
    }
    // if (inputValues.gasOrder >= numberOfOrders) {
    //   formatedErrors.gasOrder
    //     ? (formatedErrors.gasOrder += " \n No such order")
    //     : (formatedErrors.gasOrder = "No such order")
    //   isValid = false
    // }
    // if (deadline + ADDITIONAL_TIME_SECONDS <= getUnixTimestampInSeconds(new Date())) {
    //   formatedErrors.gasOrder
    //     ? (formatedErrors.deadlineTime += " \n Must be in the future")
    //     : (formatedErrors.deadlineTime = "Must be in the future")
    //   isValid = false
    // }
    if (!isValid) {
      setValidationErrors(formatedErrors)
      return false
    }
    return true
  }

  const handleSubmit = () => {
    setIsValidating(true)

    if (validateSearchForm()) {
      if (address !== undefined) {
        signMessage()
        //executeFunction()
      } else {
        setIsOrderOnHold(true)
        setShowWalletConnectionWindow(true)
      }
    } else {
      console.log("Form has errors. Please fix them before submitting.")
    }
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
    try {
      const balance = await readContract({
        address: prepaidGasCoreContractAddress(),
        abi: GasOrderABI,
        functionName: "balanceOf",
        args: ["0x15d34aaf54267db7d7c367839aaf71a00a2c6a65", inputValues.gasOrder],
      })
      console.log("balance: ", balance)
    } catch (e) {
      console.log("ERROR: ", e)
    }

    const domain = {
      name: PROJECT_NAME,
      version: PROJECT_VERSION,
      chainId: CHAIN_ID,
      verifyingContract: prepaidGasCoreContractAddress(),
    }

    const types = {
      Message: [
        { name: "from", type: "address" },
        { name: "nonce", type: "uint256" },
        { name: "gasOrder", type: "uint256" },
        { name: "onBehalf", type: "address" },
        { name: "deadline", type: "uint256" },
        { name: "to", type: "address" },
        { name: "gas", type: "uint256" },
        { name: "tips", type: "uint256" },
        { name: "data", type: "bytes" },
      ],
    }

    /*
    const message = {
      //@todo get address automatically
      from: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
      nonce: 0,
      gasOrder: 0,
      onBehalf: "0x00222290dd7278aa3ddd389cc1e1d165cc4bafe5",
      deadline: 0,
      to: "0xfb071837728455c581f370704b225ac9eabdfa4a",
      gas: 0,
      data: "0x",
    }
    */

    try {
      //todo: Why is it using TEST ABI STRING????
      let contractInterface = new ethers.Interface(TEST_ABI_STRING)

      const encodedData = contractInterface.encodeFunctionData(selectedFunction, argValues)

      console.log("EncodedData: ", encodedData)

      const message = {
        from: address,
        nonce: inputValues.nonce,
        gasOrder: inputValues.gasOrder,
        onBehalf: inputValues.onBehalf,
        deadline: getUnixTimestampInSeconds(combineDateAndTime(inputValues.deadlineDate, inputValues.deadlineTime)),
        to: inputValues.to,
        gas: inputValues.gas,
        tips: inputValues.tips,
        data: encodedData,
      }

      const messageTuple = [
        message.from,
        message.nonce,
        message.gasOrder,
        message.onBehalf,
        message.deadline,
        message.to,
        message.gas,
        message.tips,
        message.data,
      ]

      //todo check typescript
      // @ts-ignore
      const signature = await signTypedData({
        domain,
        message,
        primaryType: "Message",
        types,
      })
      console.log("signature: ", signature)

      const messageHash = await readContract({
        address: prepaidGasCoreContractAddress(),
        abi: GasOrderABI,
        functionName: "messageHash",
        args: [messageTuple],
      })
      console.log("Data: ", messageHash)

      const data = await writeContract({
        address: prepaidGasCoreContractAddress(),
        abi: GasOrderABI,
        functionName: "addTransaction",
        args: [message, signature],
      })
      console.log("addTransactionData: ", data)
      const txData = await waitForTransaction({ hash: data.hash })
      console.log("waitForTxData: ", txData)
      setTransactionDetails({ ...txData })
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
    const fetchNumberOfOrders = async () => {
      try {
        const numberOfOrders = await readContract({
          address: prepaidGasCoreContractAddress(),
          abi: GasOrderABI,
          functionName: "ordersCount",
          args: [],
        })
        console.log("numberOfOrders: ", numberOfOrders)
        setNumberOfOrders(Number(numberOfOrders))
      } catch (e) {
        console.log("numberOfOrders ERROR: ", e)
      }
    }

    fetchNumberOfOrders()
  }, [])

  // useEffect(() => {
  //   if (selectedFunction === "") {
  //     setArgInputs([])
  //     return
  //   }
  //   renderArgInputs()
  // }, [selectedFunction])

  // useEffect(() => {
  //   console.log("Arg Inputs: ", argInputs)
  // }, [argInputs])

  // useEffect(() => {
  //   console.log("Arg Values: ", argValues)
  // }, [argValues])

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
              <span className="ml-4 text-[#404040] dark:text-[#A4A5AA] text-xl">Wallet Connection</span>
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
