"use client"
import { useEffect, useState } from "react"
import { z } from "zod"
import { readContract, writeContract, waitForTransaction, signTypedData } from "@wagmi/core"

import { ABIEntry, FieldEntry, GasOrderABI } from "helpers/abi"
import { parse, getHours, getMinutes, getSeconds } from "date-fns"

import {
  Button,
  Card,
  DatePicker,
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

import { SPINNER_COLOR } from "../../../../constants/themeConstants"
import { TailSpin } from "react-loader-spinner"
import { CheckIcon, ClockIcon, NoSymbolIcon, WalletIcon, XMarkIcon } from "@heroicons/react/24/outline"
import JsonFormatter from "react-json-formatter"
import { CHAIN_ID, PROJECT_NAME, PROJECT_VERSION } from "constants/executor"
import { ethers } from "ethers"

const formSchema = z.object({
  from: z.string().min(1),
  nonce: z.number(),
  gasOrder: z.number(),
  onBehalf: z.string(),
  deadlineDate: z.date(),
  deadlineTime: z.string().min(1),
  to: z.string().min(1),
  gas: z.number(),
  data: z.string().min(1),
  gasLimit: z.number(),
  smartContractAddress: z.string().min(1),
  userAbi: z.string(),
})

const signedScheme = z.object({
  signedMsg: z.string(),
  data: z.string(),
})

type TransactionFormState = z.infer<typeof formSchema>
type SignedMsgAndDataState = z.infer<typeof signedScheme>

export default function TransactionCreate() {
  const [validationTimer, setValidationTimer] = useState<NodeJS.Timeout | undefined>()
  const [isValidating, setIsValidating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAbiParsed, setIsAbiParsed] = useState(false)
  const [validationErrors, setValidationErrors] = useState<null | { [key: string]: string }>(null)
  const [parsedAbi, setParsedAbi] = useState<ABIEntry[] | undefined>()
  //todo decide on whether to use dialogWindow
  /*
  const [showDialogWindow, setShowDialogWindow] = useState(false)
  const [transactionDetails, setTransactionDetails] = useState<null | any>(null)
  */

  // const initialState: TransactionFormState = {
  //   from: "",
  //   nonce: 0,
  //   gasOrder: 0,
  //   onBehalf: "",
  //   deadlineDate: null,
  //   deadlineTime: null,
  //   to: "",
  //   gas: 0,
  //   data: "",
  //   //orderID: "",
  //   gasLimit: 0,
  //   smartContractAddress: "",
  //   userAbi: testABIstring,
  // }

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

  const initialState: TransactionFormState = {
    from: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    nonce: 0,
    gasOrder: 0,
    onBehalf: "0x00222290dd7278aa3ddd389cc1e1d165cc4bafe5",
    deadlineDate: null,
    deadlineTime: "00:00:00",
    to: "0xfb071837728455c581f370704b225ac9eabdfa4a",
    gas: 0,
    data: "0x",
    gasLimit: 0,
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

  const parseTime = (timeString: string) => {
    const parsedTime = parse(timeString, "HH:mm:ss", new Date())
    const hours = getHours(parsedTime)
    const minutes = getMinutes(parsedTime)
    const seconds = getSeconds(parsedTime)
    return [hours, minutes, seconds]
  }

  const combineDateAndTime = (date: Date, time: string) => {
    const hoursMinutesSeconds = parseTime(time)
    const combinedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hoursMinutesSeconds[0],
      hoursMinutesSeconds[1],
      hoursMinutesSeconds[2],
    )
    return combinedDate
  }

  const getUnixTimestampInSeconds = (date: Date) => {
    return Math.floor(date.getTime() / 1000)
  }

  const resolveComponent = (comp: FieldEntry, index: number, isNested: boolean = false) => {
    console.log("Comp: ", comp)
    console.log("Index: ", index)
    console.log("IsNested: ", isNested)

    if (comp.components) {
      return (
        <div className="flex flex-col mt-4 ml-4">
          <Title>{comp.name}</Title>
          {/* <div className="ml-4">{comp.components.map(resolveComponent)}</div> */}
          <div className="ml-4">{comp.components.map((item) => resolveComponent(item, index, true))}</div>
        </div>
      )
    }

    if (isNested) {
      switch (comp.type) {
        case "uint256":
          return (
            <div className="flex flex-col">
              <Text className="mt-4">{comp.name}</Text>
              <NumberInput
                onChange={(e) => {
                  setArgValues((prevState) => {
                    const nextState = [...prevState]
                    nextState[index] = { ...nextState[index], [comp.name]: Number(e.target.value) }
                    return nextState
                  })
                }}
              ></NumberInput>
            </div>
          )
        case "bool":
          return (
            <div className="flex flex-col">
              <Text className="mt-4">{comp.name}</Text>
              <Select
                className="min-w-[8rem]"
                onValueChange={(value) => {
                  setArgValues((prevState) => {
                    const nextState = [...prevState]
                    nextState[index] = { ...nextState[index], [comp.name]: value }
                    return nextState
                  })
                }}
              >
                <SelectItem icon={NoSymbolIcon} value="false">
                  No
                </SelectItem>
                <SelectItem icon={CheckIcon} value="true">
                  Yes
                </SelectItem>
              </Select>
            </div>
          )
        case "string":
        case "address":
        default:
          return (
            <div className="flex flex-col">
              <Text className="mt-4">{comp.name}</Text>
              <TextInput
                onChange={(e) => {
                  setArgValues((prevState) => {
                    const nextState = [...prevState]
                    nextState[index] = { ...nextState[index], [comp.name]: e.target.value }
                    return nextState
                  })
                }}
              ></TextInput>
            </div>
          )
      }
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

    const result = formSchema.safeParse(inputValues)
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
        address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
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
      verifyingContract: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
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
        from: inputValues.from,
        nonce: inputValues.nonce,
        gasOrder: inputValues.gasOrder,
        onBehalf: inputValues.onBehalf,
        deadline: getUnixTimestampInSeconds(combineDateAndTime(inputValues.deadlineDate, inputValues.deadlineTime)),
        to: inputValues.to,
        gas: inputValues.gas,
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
        address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        abi: GasOrderABI,
        functionName: "messageHash",
        args: [messageTuple],
      })
      console.log("Data: ", messageHash)

      const data = await writeContract({
        address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        abi: GasOrderABI,
        functionName: "addTransaction",
        args: [message, signature],
      })
      console.log("addTransactionData: ", data)
      const txData = await waitForTransaction({ hash: data.hash })
      console.log("waitForTxData: ", txData)
    } catch (e) {
      console.log("ERROR: ", e)
    }

    // try {
    //   const data = await readContract({
    //     address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
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

  return (
    <Card className="mt-6 flex flex-col w-full">
      {/* Gas Amount and Date & Time Settings */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <Text>From</Text>
          <div className="flex flex-col mt-2">
            <TextInput
              icon={WalletIcon}
              value={inputValues.from}
              onChange={(e) => setInputValues({ ...inputValues, from: e.target.value })}
              placeholder={inputValues.from}
              error={!!validationErrors?.from}
              errorMessage={validationErrors?.from}
              spellCheck={false}
            ></TextInput>
          </div>
        </div>
        <div className="flex flex-col">
          <Text>Nonce</Text>
          <div className="flex flex-row mt-2">
            <NumberInput
              value={inputValues.nonce.toString()}
              onChange={(e) =>
                setInputValues({ ...inputValues, nonce: clampNumber(Number(e.target.value), 0, 100000) })
              }
              error={!!validationErrors?.nonce}
              errorMessage={validationErrors?.nonce}
              spellCheck={false}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <Text>Gas Order</Text>
          <div className="flex flex-row">
            <NumberInput
              className="mt-2"
              value={inputValues.gasOrder.toString()}
              onChange={(e) =>
                setInputValues({ ...inputValues, gasOrder: clampNumber(Number(e.target.value), 0, 100000) })
              }
              error={!!validationErrors?.gasOrder}
              errorMessage={validationErrors?.gasOrder}
              spellCheck={false}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <Text>On Behalf</Text>
          <div className="flex flex-col mt-2">
            <TextInput
              icon={WalletIcon}
              value={inputValues.onBehalf}
              onChange={(e) => setInputValues({ ...inputValues, onBehalf: e.target.value })}
              placeholder={inputValues.onBehalf}
              error={!!validationErrors?.onBehalf}
              errorMessage={validationErrors?.onBehalf}
              spellCheck={false}
            ></TextInput>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <Text>Execution period End</Text>
          <div className="flex flex-row mt-2">
            <DatePicker
              value={inputValues.deadlineDate}
              onValueChange={(value) => setInputValues({ ...inputValues, deadlineDate: value })}
            />
          </div>
          <div className="flex flex-col mt-2">
            <TextInput
              icon={ClockIcon}
              value={inputValues.deadlineTime}
              onChange={(e) => setInputValues({ ...inputValues, deadlineTime: e.target.value })}
              placeholder={inputValues.deadlineTime}
              error={!!validationErrors?.deadlineTime}
              errorMessage={validationErrors?.deadlineTime}
              spellCheck={false}
            ></TextInput>
          </div>
        </div>

        <div className="flex flex-col">
          <Text>To</Text>
          <div className="flex flex-col mt-2">
            <TextInput
              icon={WalletIcon}
              value={inputValues.to}
              onChange={(e) => setInputValues({ ...inputValues, to: e.target.value })}
              placeholder={inputValues.to}
              error={!!validationErrors?.to}
              errorMessage={validationErrors?.to}
              spellCheck={false}
            ></TextInput>
          </div>
        </div>

        <div className="flex flex-col">
          <Text>Gas</Text>
          <div className="flex flex-row mt-2">
            <NumberInput
              value={inputValues.gas.toString()}
              onChange={(e) => setInputValues({ ...inputValues, gas: clampNumber(Number(e.target.value), 0, 100000) })}
              error={!!validationErrors?.gas}
              errorMessage={validationErrors?.gas}
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

      <div className="flex flex-col lg:flex-row gap-6">
        {/* todo: remove orderID from page completely */}
        {/* <div className="flex flex-col grow">
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
        </div> */}
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

//TODO Remove
const testABIstring: string =
  '[{"inputs":[{"internalType":"address","name":"executionEndpoint","type":"address"},{"internalType":"string","name":"link","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"received","type":"uint256"},{"internalType":"uint256","name":"expected","type":"uint256"}],"name":"BadIncomeTransfer","type":"error"},{"inputs":[{"internalType":"uint256","name":"requested","type":"uint256"},{"internalType":"uint256","name":"allowed","type":"uint256"}],"name":"BalanceExhausted","type":"error"},{"inputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"DeadlineExpired","type":"error"},{"inputs":[{"internalType":"uint256","name":"limit","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"}],"name":"GasLimitExceedBalance","type":"error"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"NotOperator","type":"error"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"max","type":"uint256"}],"name":"OverhighValue","type":"error"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"min","type":"uint256"}],"name":"OverlowValue","type":"error"},{"inputs":[{"internalType":"bool","name":"revokable","type":"bool"},{"internalType":"enum OrderStatus","name":"status","type":"uint8"}],"name":"RevokeNotAllowed","type":"error"},{"inputs":[{"internalType":"address","name":"received","type":"address"},{"internalType":"address","name":"expected","type":"address"}],"name":"Unauthorized","type":"error"},{"inputs":[{"internalType":"enum OrderStatus","name":"received","type":"uint8"},{"internalType":"enum OrderStatus","name":"expected","type":"uint8"}],"name":"WrongOrderStatus","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Distribute","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"executor","type":"address"}],"name":"OrderAccept","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"executionWindow","type":"uint256"}],"name":"OrderCreate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"}],"name":"URI","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"URI","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"enum Fee","name":"fee","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"old","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"current","type":"uint256"}],"name":"UpdateProtocolFee","type":"event"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"guaranteeTransfer","type":"uint256"}],"name":"acceptOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"token","type":"address"}],"name":"claimable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxGas","type":"uint256"},{"internalType":"uint256","name":"executionPeriodStart","type":"uint256"},{"internalType":"uint256","name":"executionPeriodDeadline","type":"uint256"},{"internalType":"uint256","name":"executionWindow","type":"uint256"},{"internalType":"bool","name":"revokable","type":"bool"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct Payment","name":"rewardValue","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"gasPrice","type":"uint256"}],"internalType":"struct GasPayment","name":"gasCostValue","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"gasPrice","type":"uint256"}],"internalType":"struct GasPayment","name":"guaranteeValue","type":"tuple"},{"internalType":"uint256","name":"rewardTransfer","type":"uint256"},{"internalType":"uint256","name":"gasCostTransfer","type":"uint256"}],"name":"createOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"execution","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"executor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"exists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"enum Fee","name":"id","type":"uint8"}],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"gasCost","outputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"gasPrice","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_creator","type":"address"},{"internalType":"address","name":"_user","type":"address"},{"internalType":"enum OrderStatus","name":"_status","type":"uint8"},{"internalType":"uint256","name":"_limit","type":"uint256"},{"internalType":"uint256","name":"_start","type":"uint256"}],"name":"getFilteredOrders","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"creator","type":"address"},{"internalType":"enum OrderStatus","name":"status","type":"uint8"},{"internalType":"uint256","name":"maxGas","type":"uint256"},{"internalType":"uint256","name":"executionPeriodStart","type":"uint256"},{"internalType":"uint256","name":"executionPeriodDeadline","type":"uint256"},{"internalType":"uint256","name":"executionWindow","type":"uint256"},{"internalType":"bool","name":"isRevokable","type":"bool"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct Payment","name":"reward","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"gasPrice","type":"uint256"}],"internalType":"struct GasPayment","name":"gasCost","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"gasPrice","type":"uint256"}],"internalType":"struct GasPayment","name":"guaranteeLocked","type":"tuple"},{"internalType":"uint256","name":"availableGasHoldings","type":"uint256"}],"internalType":"struct FilteredOrder[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_creator","type":"address"},{"internalType":"enum OrderStatus","name":"_status","type":"uint8"},{"internalType":"uint256","name":"_limit","type":"uint256"},{"internalType":"uint256","name":"_start","type":"uint256"}],"name":"getFilteredOrders","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"creator","type":"address"},{"internalType":"enum OrderStatus","name":"status","type":"uint8"},{"internalType":"uint256","name":"maxGas","type":"uint256"},{"internalType":"uint256","name":"executionPeriodStart","type":"uint256"},{"internalType":"uint256","name":"executionPeriodDeadline","type":"uint256"},{"internalType":"uint256","name":"executionWindow","type":"uint256"},{"internalType":"bool","name":"isRevokable","type":"bool"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct Payment","name":"reward","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"gasPrice","type":"uint256"}],"internalType":"struct GasPayment","name":"gasCost","type":"tuple"},{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"gasPrice","type":"uint256"}],"internalType":"struct GasPayment","name":"guaranteeLocked","type":"tuple"},{"internalType":"uint256","name":"availableGasHoldings","type":"uint256"}],"internalType":"struct FilteredOrder[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"address[]","name":"_holders","type":"address[]"}],"name":"getTotalBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"guarantee","outputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"gasPrice","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"order","outputs":[{"internalType":"address","name":"creator","type":"address"},{"internalType":"uint256","name":"maxGas","type":"uint256"},{"internalType":"uint256","name":"maxGasPrice","type":"uint256"},{"internalType":"uint256","name":"executionPeriodStart","type":"uint256"},{"internalType":"uint256","name":"executionPeriodDeadline","type":"uint256"},{"internalType":"uint256","name":"executionWindow","type":"uint256"},{"internalType":"bool","name":"isRevokable","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ordersCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"onBehalf","type":"address"},{"internalType":"uint256","name":"gasLimit","type":"uint256"},{"internalType":"address","name":"fulfiller","type":"address"},{"internalType":"uint256","name":"gasSpent","type":"uint256"}],"name":"reportExecution","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"retrieveGasCost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"retrieveGuarantee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"revokeOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"reward","outputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"enum Fee","name":"id","type":"uint8"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"link","type":"string"}],"name":"setURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"status","outputs":[{"internalType":"enum OrderStatus","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"receivers","type":"address[]"},{"internalType":"address[]","name":"tokens","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"takeAway","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_creator","type":"address"},{"internalType":"enum OrderStatus","name":"_status","type":"uint8"}],"name":"totalMatchingOrdersCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"spender","type":"address"}],"name":"usable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]'
