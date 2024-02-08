"use client"

import {
  getTomorrowStartDate,
  getTomorrowEndDate,
  combineDateAndTime,
  getUnixTimestampInSeconds,
} from "@/utils/dateAndTime.utils"
import format from "date-fns/format"

import { readContract, writeContract, waitForTransaction, signTypedData } from "@wagmi/core"
import { MockTokenABI, GasOrderABI, prepaidGasCoreContractAddress, ABIEntry } from "@/helpers"
import { PaymentStruct, GasPaymentStruct } from "typechain-types/GasOrder"
import { useAccount } from "wagmi"

import { Card, Icon, Tab, TabGroup, TabList, TabPanel, TabPanels, Title } from "@tremor/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { z } from "zod"
import DialogWindow from "../DialogWindow"
import { WalletIcon } from "@heroicons/react/24/outline"
import UserAgreement from "../UserAgreement"
import CreateTxCardSimple from "./CreateTxCardSimple"
import CreateTxCardAdvanced from "./CreateTxCardAdvanced"

const formSchema = z.object({
  nonce: z.number(),
  gasOrder: z.number(),
  onBehalf: z.string(),
  deadlineDate: z.date(),
  deadlineTime: z.string().min(1),
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

  const { address } = useAccount()

  const initialState: TransactionFormState = {
    nonce: Date.now(),
    gasOrder: 0,
    onBehalf: address,
    deadlineDate: null,
    deadlineTime: "00:00:00",
    to: "",
    gas: 0,
    tips: 0,
    data: "0x",
    smartContractAddress: "",
    userAbi: testABIstring,
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

  const setAdvancedInputsToDefault = () => {
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
      userAbi: testABIstring,
    })

    setSelectedFunction(selectedFunction)
    setArgInputs(argInputs)
    setArgValues(argValues)
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

    console.log(validateSearchForm())

    if (validateSearchForm()) {
      //executeFunction()
      signMessage()
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
      let contractInterface = new ethers.Interface(testABIstring)

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
      createOrder()
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
              />
            </TabPanel>
            <TabPanel>
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
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </>
  )
}

// @todo Remove
const testABIstring: string =
  '[{"inputs":[{"internalType":"address","name":"executionEndpoint","type":"address"},{"internalType":"string","name":"link","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"received","type":"uint256"},{"internalType":"uint256","name":"expected","type":"uint256"}],"name":"BadIncomeTransfer","type":"error"},{"inputs":[{"internalType":"uint256","name":"requested","type":"uint256"},{"internalType":"uint256","name":"allowed","type":"uint256"}],"name":"BalanceExhausted","type":"error"},{"inputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"DeadlineExpired","type":"error"},{"inputs":[{"internalType":"uint256","name":"limit","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"}],"name":"GasLimitExceedBalance","type":"error"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"NotOperator","type":"error"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"max","type":"uint256"}],"name":"OverhighValue","type":"error"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"min","type":"uint256"}],"name":"OverlowValue","type":"error"},{"inputs":[{"internalType":"bool","name":"revokable","type":"bool"},{"internalType":"enum OrderStatus","name":"status","type":"uint8"}],"name":"RevokeNotAllowed","type":"error"},{"inputs":[{"internalType":"address","name":"received","type":"address"},{"internalType":"address","name":"expected","type":"address"}],"name":"Unauthorized","type":"error"},{"inputs":[{"internalType":"enum OrderStatus","name":"received","type":"uint8"},{"internalType":"enum OrderStatus","name":"expected","type":"uint8"}],"name":"WrongOrderStatus","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Distribute","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"executor","type":"address"}],"name":"OrderAccept","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"executionWindow","type":"uint256"}],"name":"OrderCreate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"}],"name":"URI","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"URI","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"enum Fee","name":"fee","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"old","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"current","type":"uint256"}],"name":"UpdateProtocolFee","type":"event"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"guaranteeTransfer","type":"uint256"}],"name":"acceptOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"token","type":"address"}],"name":"claimable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxGas","type":"uint256"},{"internalType":"uint256","name":"executionPeriodStart","type":"uint256"},{"internalType":"uint256","name":"executionPeriodDeadline","type":"uint256"},{"internalType":"uint256","name":"executionWindow","type":"uint256"},{"internalType":"bool","name":"revokable","type":"bool"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct Payment","name":"rewardValue","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"gasPrice","type":"uint256"}],"internalType":"struct GasPayment","name":"gasCostValue","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"gasPrice","type":"uint256"}],"internalType":"struct GasPayment","name":"guaranteeValue","type":"tuple"},{"internalType":"uint256","name":"rewardTransfer","type":"uint256"},{"internalType":"uint256","name":"gasCostTransfer","type":"uint256"}],"name":"createOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"execution","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"executor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"exists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"enum Fee","name":"id","type":"uint8"}],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"gasCost","outputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"gasPrice","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_creator","type":"address"},{"internalType":"address","name":"_user","type":"address"},{"internalType":"enum OrderStatus","name":"_status","type":"uint8"},{"internalType":"uint256","name":"_limit","type":"uint256"},{"internalType":"uint256","name":"_start","type":"uint256"}],"name":"getFilteredOrders","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"creator","type":"address"},{"internalType":"enum OrderStatus","name":"status","type":"uint8"},{"internalType":"uint256","name":"maxGas","type":"uint256"},{"internalType":"uint256","name":"executionPeriodStart","type":"uint256"},{"internalType":"uint256","name":"executionPeriodDeadline","type":"uint256"},{"internalType":"uint256","name":"executionWindow","type":"uint256"},{"internalType":"bool","name":"isRevokable","type":"bool"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct Payment","name":"reward","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"gasPrice","type":"uint256"}],"internalType":"struct GasPayment","name":"gasCost","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"gasPrice","type":"uint256"}],"internalType":"struct GasPayment","name":"guaranteeLocked","type":"tuple"},{"internalType":"uint256","name":"availableGasHoldings","type":"uint256"}],"internalType":"struct FilteredOrder[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_creator","type":"address"},{"internalType":"enum OrderStatus","name":"_status","type":"uint8"},{"internalType":"uint256","name":"_limit","type":"uint256"},{"internalType":"uint256","name":"_start","type":"uint256"}],"name":"getFilteredOrders","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"creator","type":"address"},{"internalType":"enum OrderStatus","name":"status","type":"uint8"},{"internalType":"uint256","name":"maxGas","type":"uint256"},{"internalType":"uint256","name":"executionPeriodStart","type":"uint256"},{"internalType":"uint256","name":"executionPeriodDeadline","type":"uint256"},{"internalType":"uint256","name":"executionWindow","type":"uint256"},{"internalType":"bool","name":"isRevokable","type":"bool"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct Payment","name":"reward","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"gasPrice","type":"uint256"}],"internalType":"struct GasPayment","name":"gasCost","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"gasPrice","type":"uint256"}],"internalType":"struct GasPayment","name":"guaranteeLocked","type":"tuple"},{"internalType":"uint256","name":"availableGasHoldings","type":"uint256"}],"internalType":"struct FilteredOrder[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"address[]","name":"_holders","type":"address[]"}],"name":"getTotalBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"guarantee","outputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"gasPrice","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"order","outputs":[{"internalType":"address","name":"creator","type":"address"},{"internalType":"uint256","name":"maxGas","type":"uint256"},{"internalType":"uint256","name":"maxGasPrice","type":"uint256"},{"internalType":"uint256","name":"executionPeriodStart","type":"uint256"},{"internalType":"uint256","name":"executionPeriodDeadline","type":"uint256"},{"internalType":"uint256","name":"executionWindow","type":"uint256"},{"internalType":"bool","name":"isRevokable","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ordersCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"onBehalf","type":"address"},{"internalType":"uint256","name":"gasLimit","type":"uint256"},{"internalType":"address","name":"fulfiller","type":"address"},{"internalType":"uint256","name":"gasSpent","type":"uint256"}],"name":"reportExecution","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"retrieveGasCost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"retrieveGuarantee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"revokeOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"reward","outputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"enum Fee","name":"id","type":"uint8"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"link","type":"string"}],"name":"setURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"status","outputs":[{"internalType":"enum OrderStatus","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"receivers","type":"address[]"},{"internalType":"address[]","name":"tokens","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"takeAway","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_creator","type":"address"},{"internalType":"enum OrderStatus","name":"_status","type":"uint8"}],"name":"totalMatchingOrdersCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"spender","type":"address"}],"name":"usable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]'
