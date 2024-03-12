"use client"

import { CheckIcon, ClockIcon, NoSymbolIcon, WalletIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { DatePicker, Input, Select, TimePicker } from "antd"

import { TailSpin } from "react-loader-spinner"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { SPINNER_COLOR } from "@/constants"
import { TransactionFormState } from "./CreateTxCard"
import JsonFormatter from "react-json-formatter"
import { ABIEntry, FieldEntry, prepaidGasCoreContractAddress } from "@/helpers"
import dayjs from "dayjs"
import { Buttons } from "../buttons"

export default function CreateTxCardAdvanced({
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
  parsedAbi,
  setParsedAbi,
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
  parsedAbi: ABIEntry[] | undefined
  setParsedAbi: Dispatch<SetStateAction<any>>
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [isAbiParsed, setIsAbiParsed] = useState(false)
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
          <span className="text-[#404040] dark:text-[#A4A5AA]">{comp.name}</span>
          <div className="ml-4">{comp.components.map((item) => resolveComponent(item, index, true))}</div>
        </div>
      )
    }

    if (isNested) {
      switch (comp.type) {
        case "uint256":
          return (
            <div className="flex flex-col">
              <label className="mt-4 text-[#404040] dark:text-[#A4A5AA]">{comp.name}</label>
              {/* <NumberInput
                onChange={(e) => {
                  setArgValues((prevState) => {
                    const nextState = [...prevState]
                    nextState[index] = { ...nextState[index], [comp.name]: Number(e.target.value) }
                    return nextState
                  })
                }}
              ></NumberInput> */}
              <Input
                onChange={(e) => {
                  setArgValues((prevState) => {
                    const nextState = [...prevState]
                    nextState[index] = { ...nextState[index], [comp.name]: Number(e.target.value) }
                    return nextState
                  })
                }}
                className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
              />
            </div>
          )
        case "bool":
          return (
            <div className="flex flex-col">
              <label className="mt-4 text-[#404040] dark:text-[#A4A5AA]">{comp.name}</label>
              <Select
                className="min-w-[8rem]"
                onChange={(value) => {
                  setArgValues((prevState) => {
                    const nextState = [...prevState]
                    nextState[index] = { ...nextState[index], [comp.name]: value }
                    return nextState
                  })
                }}
              >
                <Select.Option value="false">No</Select.Option>
                <Select.Option value="true">Yes</Select.Option>
              </Select>
            </div>
          )
        case "string":
        case "address":
        default:
          return (
            <div className="flex flex-col">
              <label className="mt-4 text-[#404040] dark:text-[#A4A5AA]">{comp.name}</label>
              {/* <TextInput
                onChange={(e) => {
                  setArgValues((prevState) => {
                    const nextState = [...prevState]
                    nextState[index] = { ...nextState[index], [comp.name]: e.target.value }
                    return nextState
                  })
                }}
              ></TextInput> */}
              <Input
                onChange={(e) => {
                  setArgValues((prevState) => {
                    const nextState = [...prevState]
                    nextState[index] = { ...nextState[index], [comp.name]: e.target.value }
                    return nextState
                  })
                }}
                className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
              />
            </div>
          )
      }
    }

    switch (comp.type) {
      case "string":
      case "address":
        return (
          <div className="flex flex-col">
            <label className="mt-4 text-[#404040] dark:text-[#A4A5AA]">{comp.name}</label>
            {/* <TextInput onChange={(e) => handleArgInputChange(e.target.value, index)}></TextInput> */}
            <Input
              onChange={(e) => handleArgInputChange(e.target.value, index)}
              className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
            />
          </div>
        )
      case "uint256":
        return (
          <div className="flex flex-col">
            <label className="mt-4 text-[#404040] dark:text-[#A4A5AA]">{comp.name}</label>
            {/* <NumberInput onChange={(e) => handleArgInputChange(Number(e.target.value), index)}></NumberInput> */}
            <Input
              onChange={(e) => handleArgInputChange(Number(e.target.value), index)}
              className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
            />
          </div>
        )
      case "bool":
        return (
          <div className="flex flex-col">
            <label className="mt-4 text-[#404040] dark:text-[#A4A5AA]">{comp.name}</label>
            <Select className="min-w-[8rem]" onChange={(value) => handleArgInputChange(value, index)}>
              <Select.Option value="false">No</Select.Option>
              <Select.Option value="true">Yes</Select.Option>
            </Select>
          </div>
        )
      default:
        return (
          <div className="flex flex-col">
            <label className="mt-4 text-[#404040] dark:text-[#A4A5AA]">{comp.name}</label>
            {/* <TextInput onChange={(e) => handleArgInputChange(e.target.value, index)}></TextInput> */}
            <Input
              onChange={(e) => handleArgInputChange(e.target.value, index)}
              className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
            />
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

  console.log("isAbiParsed: ", { isAbiParsed })
  console.log("selectedFunction: ", { selectedFunction })
  console.log("argInputs: ", { argInputs })

  return (
    <div className="mt-6 flex flex-col w-full gap-6">
      <div className="flex flex-col">
        <label className="text-[#404040] dark:text-[#A4A5AA]">Nonce</label>
        <Input
          value={inputValues.nonce.toString()}
          onChange={(e) => setInputValues({ ...inputValues, nonce: Number(e.target.value) })}
          // error={!!validationErrors?.nonce}
          // errorMessage={validationErrors?.nonce}
          spellCheck={false}
          placeholder="123"
          size="middle"
          className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-[#404040] dark:text-[#A4A5AA]">Gas Order</label>
        <Input
          value={inputValues.gasOrder.toString()}
          onChange={(e) => setInputValues({ ...inputValues, gasOrder: Number(e.target.value) })}
          // error={!!validationErrors?.gasOrder}
          // errorMessage={validationErrors?.gasOrder}
          spellCheck={false}
          placeholder="123"
          size="middle"
          className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-[#404040] dark:text-[#A4A5AA]">On Behalf</label>
        <Input
          value={inputValues.onBehalf}
          onChange={(e) => setInputValues({ ...inputValues, onBehalf: e.target.value })}
          placeholder={inputValues.onBehalf}
          // error={!!validationErrors?.onBehalf}
          // errorMessage={validationErrors?.onBehalf}
          spellCheck={false}
          size="middle"
          className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-[#404040] dark:text-[#A4A5AA] mb-1">Execution period End</label>
        <div className="flex flex-col gap-4">
          <DatePicker
            defaultValue={dayjs().add(1, "d")}
            // value={dayjs(inputValues.executionPeriodEndDate)}
            presets={[
              {
                label: "Tommorrow",
                value: dayjs().add(1, "d"),
              },
              {
                label: "Next Week",
                value: dayjs().add(7, "d"),
              },
              {
                label: "Next Month",
                value: dayjs().add(1, "month"),
              },
            ]}
            onChange={(date) => {
              if (date) {
                // setInputValues({ ...inputValues, executionPeriodEndDate: date })
              }
            }}
          />
          <TimePicker
            className="dark:[&>div>input]:text-white/60 dark:[&>div>.ant-picker-suffix]:text-white/60"
            defaultValue={dayjs("00:00", "HH:mm")}
            format={"HH:mm"}
            // value={inputValues.executionPeriodEndTime}
            // onChange={(value) => setInputValues({ ...inputValues, executionPeriodEndTime: value })}
            // error={!!validationErrors?.executionPeriodEndTime}
            // errorMessage={validationErrors?.executionPeriodEndTime}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-[#404040] dark:text-[#A4A5AA]">To</label>
        <Input
          value={inputValues.to}
          onChange={(e) => setInputValues({ ...inputValues, to: e.target.value })}
          placeholder={inputValues.to}
          // error={!!validationErrors?.to}
          // errorMessage={validationErrors?.to}
          spellCheck={false}
          size="middle"
          className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-[#404040] dark:text-[#A4A5AA]">Gas</label>
        <Input
          value={inputValues.gas.toString()}
          onChange={(e) => setInputValues({ ...inputValues, gas: Number(e.target.value) })}
          // error={!!validationErrors?.gas}
          // errorMessage={validationErrors?.gas}
          spellCheck={false}
          placeholder="123"
          size="middle"
          className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-[#404040] dark:text-[#A4A5AA]">Tips</label>
        <Input
          value={inputValues.tips.toString()}
          onChange={(e) => setInputValues({ ...inputValues, tips: Number(e.target.value) })}
          // error={!!validationErrors?.tips}
          // errorMessage={validationErrors?.tips}
          spellCheck={false}
          placeholder="123"
          size="middle"
          className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
        />
      </div>

      {isAbiParsed ? (
        <div className="flex flex-col old-lg:flex-row gap-6 mt-4">
          <div className="flex flex-col grow">
            <span className="text-[#404040] dark:text-[#A4A5AA]">Functions parsed from provided ABI</span>
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
        <div className="flex flex-col">
          <label className="text-[#404040] dark:text-[#A4A5AA]">ABI</label>
          <Input.TextArea
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
            className="border-normal dark:border-whiteDark hover:border-primary focus:border-primary"
          />
        </div>
      )}

      {isAbiParsed ? (
        <div className="flex flex-row old-md:justify-end mt-4">
          <span className="text-[#404040] dark:text-[#A4A5AA]">Abi was successfully parsed</span>
          <Buttons
            onClick={() => {
              setIsAbiParsed(false)
              setParsedAbi(undefined)
              setInputValues({ ...inputValues, userAbi: "" })
              setArgInputs([])
              setArgValues([])
              setSelectedFunction("")
            }}
            className="grow old-md:grow-0 bg-transparent hover:bg-primary-hbr border-solid border-1 border-primary text-primary hover:text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
          >
            {isLoading ? "" : "Clear ABI"}
          </Buttons>
        </div>
      ) : (
        <div className="flex flex-row old-md:justify-end mt-4">
          <Buttons
            onClick={parseAbi}
            className="grow old-md:grow-0 bg-transparent hover:bg-primary-hbr border-solid border-1 border-primary text-primary hover:text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
          >
            {isLoading ? "" : "Parse ABI"}
          </Buttons>
        </div>
      )}

      {isAbiParsed && (
        <div className="flex flex-col old-lg:flex-row gap-6 mt-4">
          <div className="flex flex-col grow">
            <span className="text-[#404040] dark:text-[#A4A5AA]">Function</span>
            <div className="flex flex-col mt-2">
              <Select value={selectedFunction} onChange={setSelectedFunction}>
                {parsedAbi
                  .filter((item) => item.type === "function")
                  .map((item, index) => {
                    return <Select.Option value={item.name}>{item.name}</Select.Option>
                  })}
              </Select>
            </div>
          </div>
        </div>
      )}

      {isAbiParsed && selectedFunction && argInputs.length !== 0 && (
        <div className="mt-8 flex flex-col">
          <span className="text-[#404040] dark:text-[#A4A5AA]">Function Arguments</span>
          {argInputs}
        </div>
      )}

      {isAbiParsed && (
        <div className="flex flex-row old-md:justify-end mt-4">
          <Buttons
            onClick={handleSubmit}
            className="grow old-md:grow-0 bg-transparent hover:bg-primary-hbr border-solid border-1 border-primary text-primary hover:text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
          >
            {"Submit"}
          </Buttons>
        </div>
      )}
    </div>
  )
}
