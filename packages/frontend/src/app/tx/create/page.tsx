"use client"
import { useEffect, useState } from "react"
import { z } from "zod"
import { readContract, writeContract, waitForTransaction } from "@wagmi/core"
import { ABIEntry, FieldEntry } from "helpers/abi"

import {
  Button,
  Card,
  NumberInput,
  SearchSelect,
  SearchSelectItem,
  Select,
  SelectItem,
  Subtitle,
  Text,
  TextInput,
  Title,
} from "@tremor/react"

import { SPINNER_COLOR } from "../../../constants/themeConstants"
import { TailSpin } from "react-loader-spinner"
import { CheckIcon, NoSymbolIcon, XMarkIcon } from "@heroicons/react/24/outline"
import JsonFormatter from "react-json-formatter"

const schema = z.object({
  orderID: z.string(),
  gasLimit: z.number(),
  smartContractAddress: z.string(),
  userAbi: z.string(),
})

type TransactionFormState = z.infer<typeof schema>

export default function TransactionCreate() {
  const [validationTimer, setValidationTimer] = useState<NodeJS.Timeout | undefined>()
  const [isValidating, setIsValidating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAbiParsed, setIsAbiParsed] = useState(false)
  const [validationErrors, setValidationErrors] = useState<null | { [key: string]: string }>(null)
  const [parsedAbi, setParsedAbi] = useState<ABIEntry[] | undefined>()

  const initialState: TransactionFormState = {
    orderID: "",
    gasLimit: 0,
    smartContractAddress: "",
    userAbi: "",
  }

  //Input values
  const [inputValues, setInputValues] = useState<TransactionFormState>({ ...initialState })
  const [selectedFunction, setSelectedFunction] = useState<string>("")
  const [argInputs, setArgInputs] = useState<any>([])
  const [argValues, setArgValues] = useState<any>([])

  const clampNumber = (value, minNum, maxNum) => {
    console.log("Clamped: ", value)
    if (value === 0) {
      return 0
    }

    if (value < minNum) {
      return minNum
    }

    if (value > maxNum) {
      return maxNum
    }

    return value
  }

  const parseAbi = () => {
    setIsAbiParsed(false)
    try {
      let parsed = JSON.parse(inputValues.userAbi)
      console.log("Parsed ABI: ", parsed)
      parsed = parsed.filter((item) => item.type === "function")
      console.log("Filtered ABI: ", parsed)

      setParsedAbi(parsed)
      setIsAbiParsed(true)
    } catch (e) {
      console.log("parseAbi Error: ", e)
    }
  }

  // const resolveComponent = (comp: FieldEntry) => {
  //   console.log("Comp: ", comp)

  //   if (comp.components) {
  //     return (
  //       <div className="flex flex-col mt-4 ml-4">
  //         <Title>{comp.name}</Title>
  //         <div className="ml-4">{comp.components.map(resolveComponent)}</div>
  //       </div>
  //     )
  //   }

  //   switch (comp.type) {
  //     case "string":
  //     case "address":
  //       return (
  //         <div className="flex flex-col">
  //           <Text className="mt-4">{comp.name}</Text>
  //           <TextInput
  //             onChange={(e) => setArgValues((prevState) => ({ ...prevState, [comp.name]: e.target.value }))}
  //           ></TextInput>
  //         </div>
  //       )
  //     case "uint256":
  //       return (
  //         <div className="flex flex-col">
  //           <Text className="mt-4">{comp.name}</Text>
  //           <NumberInput
  //             onChange={(e) => setArgValues((prevState) => ({ ...prevState, [comp.name]: Number(e.target.value) }))}
  //           ></NumberInput>
  //         </div>
  //       )
  //     case "bool":
  //       return (
  //         <div className="flex flex-col">
  //           <Text className="mt-4">{comp.name}</Text>
  //           <Select
  //             className="min-w-[8rem]"
  //             onValueChange={(value) => setArgValues({ ...argValues, [comp.name]: Boolean(value) })}
  //           >
  //             <SelectItem icon={NoSymbolIcon} value="false">
  //               No
  //             </SelectItem>
  //             <SelectItem icon={CheckIcon} value="true">
  //               Yes
  //             </SelectItem>
  //           </Select>
  //         </div>
  //       )
  //     default:
  //       return (
  //         <div className="flex flex-col">
  //           <Text className="mt-4">{comp.name}</Text>
  //           <TextInput onChange={(e) => setArgValues({ ...argValues, [comp.name]: e.target.value })}></TextInput>
  //         </div>
  //       )
  //   }
  // }

  const resolveComponent = (comp: FieldEntry, index: number) => {
    console.log("Comp: ", comp)
    console.log("Index: ", index)

    if (comp.components) {
      return (
        <div className="flex flex-col mt-4 ml-4">
          <Title>{comp.name}</Title>
          <div className="ml-4">{comp.components.map(resolveComponent)}</div>
        </div>
      )
    }

    switch (comp.type) {
      case "string":
      case "address":
        return (
          <div className="flex flex-col">
            <Text className="mt-4">{comp.name}</Text>
            <TextInput onChange={(e) => handleArgInputChange(e.target.value, index)}></TextInput>
          </div>
        )
      case "uint256":
        return (
          <div className="flex flex-col">
            <Text className="mt-4">{comp.name}</Text>
            <NumberInput onChange={(e) => handleArgInputChange(Number(e.target.value), index)}></NumberInput>
          </div>
        )
      case "bool":
        return (
          <div className="flex flex-col">
            <Text className="mt-4">{comp.name}</Text>
            <Select className="min-w-[8rem]" onValueChange={(value) => handleArgInputChange(value, index)}>
              <SelectItem icon={NoSymbolIcon} value="false">
                No
              </SelectItem>
              <SelectItem icon={CheckIcon} value="true">
                Yes
              </SelectItem>
            </Select>
          </div>
        )
      default:
        return (
          <div className="flex flex-col">
            <Text className="mt-4">{comp.name}</Text>
            <TextInput onChange={(e) => handleArgInputChange(e.target.value, index)}></TextInput>
          </div>
        )
    }
  }

  const handleArgInputChange = (value: any, index: number) => {
    // console.log("argValues: ", argValues)
    // console.log("INDEX: ", index)

    // const newArgValues = [...argValues]

    // console.log("newArgValues: ", newArgValues)
    // newArgValues[index] = value

    // console.log("newArgValues: ", newArgValues)
    setArgValues((prevState) => {
      const nextState = [...prevState]
      nextState[index] = value
      return nextState
    })
  }

  console.log(argValues)

  const renderArgInputs = () => {
    const foundEntry = parsedAbi.find((item) => item.name === selectedFunction)
    console.log("Found Entry: ", foundEntry)
    const inputs = []
    foundEntry.inputs.map((item, index) => inputs.push(resolveComponent(item, index)))
    console.log("Inputs: ", inputs)
    setArgInputs(inputs)
    const emptyArr = Array(inputs.length)
    setArgValues(emptyArr)
  }

  useEffect(() => {
    if (selectedFunction === "") {
      setArgInputs([])
      return
    }
    renderArgInputs()
  }, [selectedFunction])

  useEffect(() => {
    console.log("Arg Inputs: ", argInputs)
  }, [argInputs])

  useEffect(() => {
    console.log("Arg Values: ", argValues)
  }, [argValues])

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
      executeFunction()
    } else {
      console.log("Form has errors. Please fix them before submitting.")
    }
  }

  const executeFunction = async () => {
    try {
      const data = await writeContract({
        address: inputValues.smartContractAddress,
        abi: JSON.parse(inputValues.userAbi),
        functionName: selectedFunction,
        args: [],
      })
      console.log("CreateOrderData: ", data)
      const txData = await waitForTransaction({ hash: data.hash })
      console.log("CreateOrderTXData: ", txData)
    } catch (e) {
      console.log("CreateOrderError: ", e)
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

  return (
    <Card className="mt-6 flex flex-col w-full">
      {/* Gas Amount and Date & Time Settings */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col grow">
          <Text>Order ID</Text>
          <div className="flex flex-col mt-2">
            <TextInput
              value={inputValues.orderID}
              onChange={(e) => setInputValues({ ...inputValues, orderID: e.target.value })}
              error={!!validationErrors?.orderID}
              errorMessage={validationErrors?.orderID}
              spellCheck={false}
            />
          </div>
        </div>
        <div className="flex flex-col grow">
          <Text>Gas Limit</Text>
          <div className="flex flex-col mt-2">
            <NumberInput
              value={inputValues.gasLimit.toString()}
              onChange={(e) =>
                setInputValues({ ...inputValues, gasLimit: clampNumber(Number(e.target.value), 0, 100000) })
              }
              error={!!validationErrors?.gasLimit}
              errorMessage={validationErrors?.gasLimit}
              spellCheck={false}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        <div className="flex flex-col grow">
          <Text>Smart Contract Address</Text>
          <div className="flex flex-col mt-2">
            <TextInput
              value={inputValues.smartContractAddress}
              onChange={(e) => setInputValues({ ...inputValues, smartContractAddress: e.target.value })}
              error={!!validationErrors?.smartContractAddress}
              errorMessage={validationErrors?.smartContractAddress}
              spellCheck={false}
            />
          </div>
        </div>
      </div>

      {isAbiParsed ? (
        <div className="flex flex-col lg:flex-row gap-6 mt-4">
          <div className="flex flex-col grow">
            <Text>Functions parsed from provided ABI</Text>
            <div className="max-h-[30rem] overflow-auto mt-2 tremor-TextInput-root flex flex-col relative w-full  min-w-[10rem] outline-none rounded-tremor-default shadow-tremor-input dark:shadow-dark-tremor-input bg-tremor-background dark:bg-dark-tremor-background hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted text-tremor-content dark:text-dark-tremor-content border-tremor-border dark:border-dark-tremor-border border">
              <JsonFormatter
                json={JSON.stringify(parsedAbi)}
                tabWith={4}
                jsonStyle={{
                  propertyStyle: { color: "rgb(59 130 246)" },
                  stringStyle: { color: "rgb(16 185 129)" },
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 mt-4">
          <div className="flex flex-col grow">
            <Text>ABI</Text>
            <div className="tremor-TextInput-root flex flex-col mt-2 relative w-full items-center min-w-[10rem] outline-none rounded-tremor-default shadow-tremor-input dark:shadow-dark-tremor-input bg-tremor-background dark:bg-dark-tremor-background hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted text-tremor-content dark:text-dark-tremor-content border-tremor-border dark:border-dark-tremor-border border">
              <textarea
                value={inputValues.userAbi}
                onChange={(e) => {
                  e.target.style.height = ""
                  e.target.style.height = e.target.scrollHeight + "px"
                  setInputValues({ ...inputValues, userAbi: e.target.value })
                }}
                // error={!!validationErrors?.userAbi}
                // errorMessage={validationErrors?.userAbi}
                placeholder="Copy and paste your ABI here"
                spellCheck={false}
                className="tremor-TextInput-input w-full focus:outline-none focus:ring-0 border-none bg-transparent text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pl-3 pr-4 py-2 placeholder:text-tremor-content dark:placeholder:text-dark-tremor-content resize-none"
              ></textarea>
            </div>
          </div>
        </div>
      )}

      {isAbiParsed ? (
        <div className="flex flex-row md:justify-end mt-4">
          <Button
            className="grow md:grow-0"
            disabled={isLoading}
            color="red"
            icon={XMarkIcon}
            onClick={() => {
              setIsAbiParsed(false)
              setParsedAbi(undefined)
              setInputValues({ ...inputValues, userAbi: "" })
              setArgInputs([])
              setArgValues([])
              setSelectedFunction("")
            }}
            variant="secondary"
          >
            {/* <Button onClick={() => setIsLoading(!isLoading)}> */}
            <TailSpin
              height={20}
              width={20}
              color={SPINNER_COLOR}
              ariaLabel="tail-spin-loading"
              radius="0"
              wrapperStyle={{}}
              wrapperClass=""
              visible={isLoading}
            />
            {isLoading ? "" : "Clear ABI"}
          </Button>
        </div>
      ) : (
        <div className="flex flex-row md:justify-end mt-4">
          <Button className="grow md:grow-0" disabled={isLoading} onClick={parseAbi} variant="secondary">
            {/* <Button onClick={() => setIsLoading(!isLoading)}> */}
            <TailSpin
              height={20}
              width={20}
              color={SPINNER_COLOR}
              ariaLabel="tail-spin-loading"
              radius="0"
              wrapperStyle={{}}
              wrapperClass=""
              visible={isLoading}
            />
            {isLoading ? "" : "Parse ABI"}
          </Button>
        </div>
      )}

      {isAbiParsed && (
        <div className="flex flex-col lg:flex-row gap-6 mt-4">
          <div className="flex flex-col grow">
            <Text>Function</Text>
            <div className="flex flex-col mt-2">
              <SearchSelect value={selectedFunction} onValueChange={setSelectedFunction}>
                {parsedAbi
                  .filter((item) => item.type === "function")
                  .map((item, index) => {
                    return <SearchSelectItem value={item.name}>{item.name}</SearchSelectItem>
                  })}
              </SearchSelect>
            </div>
          </div>
        </div>
      )}

      {isAbiParsed && selectedFunction && argInputs.length !== 0 && (
        <div className="mt-8 flex flex-col">
          <Title>Function Arguments</Title>
          {argInputs}
        </div>
      )}

      {isAbiParsed && (
        <div className="flex flex-row md:justify-end mt-4">
          <Button className="grow md:grow-0" disabled={isLoading} onClick={handleSubmit}>
            {/* <Button onClick={() => setIsLoading(!isLoading)}> */}
            <TailSpin
              height={20}
              width={20}
              color={SPINNER_COLOR}
              ariaLabel="tail-spin-loading"
              radius="0"
              wrapperStyle={{}}
              wrapperClass=""
              visible={isLoading}
            />
            {isLoading ? "" : "Submit"}
          </Button>
        </div>
      )}
    </Card>
  )
}

const GasOrderABI: ABIEntry[] = [
  {
    inputs: [
      {
        internalType: "address",
        name: "executionEndpoint",
        type: "address",
      },
      {
        internalType: "string",
        name: "link",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "received",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expected",
        type: "uint256",
      },
    ],
    name: "BadIncomeTransfer",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "requested",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "allowed",
        type: "uint256",
      },
    ],
    name: "BalanceExhausted",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "DeadlineExpired",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "limit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    name: "GasLimitExceedBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "NotOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "max",
        type: "uint256",
      },
    ],
    name: "OverhighValue",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "min",
        type: "uint256",
      },
    ],
    name: "OverlowValue",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "revokable",
        type: "bool",
      },
      {
        internalType: "enum OrderStatus",
        name: "status",
        type: "uint8",
      },
    ],
    name: "RevokeNotAllowed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "received",
        type: "address",
      },
      {
        internalType: "address",
        name: "expected",
        type: "address",
      },
    ],
    name: "Unauthorized",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "enum OrderStatus",
        name: "received",
        type: "uint8",
      },
      {
        internalType: "enum OrderStatus",
        name: "expected",
        type: "uint8",
      },
    ],
    name: "WrongOrderStatus",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Claim",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Distribute",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "executor",
        type: "address",
      },
    ],
    name: "OrderAccept",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "executionWindow",
        type: "uint256",
      },
    ],
    name: "OrderCreate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "enum Fee",
        name: "fee",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "old",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "current",
        type: "uint256",
      },
    ],
    name: "UpdateProtocolFee",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "guaranteeTransfer",
        type: "uint256",
      },
    ],
    name: "acceptOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "claimable",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "maxGas",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "executionPeriodStart",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "executionPeriodDeadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "executionWindow",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "revokable",
        type: "bool",
      },
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct Payment",
        name: "rewardValue",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "gasPrice",
            type: "uint256",
          },
        ],
        internalType: "struct GasPayment",
        name: "gasCostValue",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "gasPrice",
            type: "uint256",
          },
        ],
        internalType: "struct GasPayment",
        name: "guaranteeValue",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "rewardTransfer",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "gasCostTransfer",
        type: "uint256",
      },
    ],
    name: "createOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "execution",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "executor",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "exists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum Fee",
        name: "id",
        type: "uint8",
      },
    ],
    name: "fee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "gasCost",
    outputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "gasPrice",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_creator",
        type: "address",
      },
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "enum OrderStatus",
        name: "_status",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_limit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_start",
        type: "uint256",
      },
    ],
    name: "getFilteredOrders",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "enum OrderStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "maxGas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "executionPeriodStart",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "executionPeriodDeadline",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "executionWindow",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isRevokable",
            type: "bool",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Payment",
            name: "reward",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "gasPrice",
                type: "uint256",
              },
            ],
            internalType: "struct GasPayment",
            name: "gasCost",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "gasPrice",
                type: "uint256",
              },
            ],
            internalType: "struct GasPayment",
            name: "guaranteeLocked",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "availableGasHoldings",
            type: "uint256",
          },
        ],
        internalType: "struct FilteredOrder[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_creator",
        type: "address",
      },
      {
        internalType: "enum OrderStatus",
        name: "_status",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_limit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_start",
        type: "uint256",
      },
    ],
    name: "getFilteredOrders",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "enum OrderStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "maxGas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "executionPeriodStart",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "executionPeriodDeadline",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "executionWindow",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isRevokable",
            type: "bool",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Payment",
            name: "reward",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "gasPrice",
                type: "uint256",
              },
            ],
            internalType: "struct GasPayment",
            name: "gasCost",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "gasPrice",
                type: "uint256",
              },
            ],
            internalType: "struct GasPayment",
            name: "guaranteeLocked",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "availableGasHoldings",
            type: "uint256",
          },
        ],
        internalType: "struct FilteredOrder[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_holders",
        type: "address[]",
      },
    ],
    name: "getTotalBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "guarantee",
    outputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "gasPrice",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "order",
    outputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "maxGas",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxGasPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "executionPeriodStart",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "executionPeriodDeadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "executionWindow",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isRevokable",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ordersCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "onBehalf",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "gasLimit",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "fulfiller",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "gasSpent",
        type: "uint256",
      },
    ],
    name: "reportExecution",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "retrieveGasCost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "retrieveGuarantee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "revokeOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "reward",
    outputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum Fee",
        name: "id",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "setFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "link",
        type: "string",
      },
    ],
    name: "setURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "status",
    outputs: [
      {
        internalType: "enum OrderStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "receivers",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "tokens",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    name: "takeAway",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_creator",
        type: "address",
      },
      {
        internalType: "enum OrderStatus",
        name: "_status",
        type: "uint8",
      },
    ],
    name: "totalMatchingOrdersCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "usable",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]
