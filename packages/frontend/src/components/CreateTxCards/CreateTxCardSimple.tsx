"use client"

import { CheckIcon, ClockIcon, NoSymbolIcon, WalletIcon, XMarkIcon } from "@heroicons/react/24/outline"
import {
  Text,
  TextInput,
  NumberInput,
  DatePicker,
  Button,
  SearchSelect,
  SearchSelectItem,
  Select,
  SelectItem,
  Title,
} from "@tremor/react"
import { TailSpin } from "react-loader-spinner"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { SPINNER_COLOR } from "@/constants"
import { TransactionFormState } from "./CreateTxCard"
import JsonFormatter from "react-json-formatter"
import { ABIEntry, FieldEntry, prepaidGasCoreContractAddress } from "@/helpers"

export default function CreateTxCardSimple({
  setInputValues,
  inputValues,
  validationErrors,
  handleSubmit,
  selectedFunction,
  setSelectedFunction,
  argInputs,
  setArgInputs,
  argValues,
  setArgValues,
}: {
  inputValues: TransactionFormState
  setInputValues: Dispatch<SetStateAction<{}>>
  validationErrors: null | { [key: string]: string }
  handleSubmit: () => void
  selectedFunction: string
  setSelectedFunction: Dispatch<SetStateAction<string>>
  argInputs: []
  setArgInputs: Dispatch<SetStateAction<any>>
  argValues: []
  setArgValues: Dispatch<SetStateAction<any>>
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [isAbiParsed, setIsAbiParsed] = useState(false)
  const [parsedAbi, setParsedAbi] = useState<ABIEntry[] | undefined>()
  const [numberOfOrders, setNumberOfOrders] = useState(0)

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

  return (
    <div className="mt-6 flex flex-col w-full gap-6">
      <div className="flex flex-col">
        <Text>Gas Order</Text>
        <div className="flex flex-col">
          <NumberInput
            className="mt-2"
            value={inputValues.gasOrder.toString()}
            onChange={(e) => setInputValues({ ...inputValues, gasOrder: Number(e.target.value) })}
            error={!!validationErrors?.gasOrder}
            errorMessage={validationErrors?.gasOrder}
            spellCheck={false}
          />
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <Text>Execution period End</Text>
        <div className="flex flex-row gap-2 mt-2">
          <div className="flex flex-col">
            <DatePicker
              value={inputValues.deadlineDate}
              onValueChange={(value) => setInputValues({ ...inputValues, deadlineDate: value })}
              minDate={new Date()}
            />
          </div>
          <div className="flex flex-col">
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
            onChange={(e) => setInputValues({ ...inputValues, gas: Number(e.target.value) })}
            error={!!validationErrors?.gas}
            errorMessage={validationErrors?.gas}
            spellCheck={false}
          />
        </div>
      </div>

      {isAbiParsed ? null : (
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
        <div className="flex flex-row md:justify-between mt-4">
          <Text>Abi is parsed successfully</Text>
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
            {isLoading ? "" : "Clear ABI"}
          </Button>
        </div>
      ) : (
        <div className="flex flex-row md:justify-end mt-4">
          <Button className="grow md:grow-0" disabled={isLoading} onClick={parseAbi} variant="secondary">
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
    </div>
  )
}
