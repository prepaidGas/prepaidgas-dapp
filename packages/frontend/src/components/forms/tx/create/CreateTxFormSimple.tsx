"use client"

import { DatePicker, Form, FormInstance, FormProps, Input, InputNumber, Select, TimePicker } from "antd"

import { useEffect, useState } from "react"
import { ABIEntry, FieldEntry, prepaidGasCoreContractAddress } from "@/helpers"
import dayjs, { Dayjs } from "dayjs"
import { Buttons } from "@/components/buttons"
import { TEST_ABI_STRING } from "@/constants"

export type SimpleTxProps = {
  nonce: number
  gasOrder: number
  startDate: Dayjs
  startTime: Dayjs
  to: string
  gas: number
  userAbi: string
  selectedFunction: string
}

//TODO: Move parsed abi to useState, cuz antd doesn't invokes onChange event if field value was set by setFieldValue()
const initialState: SimpleTxProps = {
  nonce: Date.now(),
  gasOrder: 0,
  startDate: dayjs().add(1, "d"),
  startTime: dayjs("00:00", "HH:mm"),
  to: "0x0000000000000000000000000000000000000000",
  gas: 25000,
  userAbi: TEST_ABI_STRING,
  selectedFunction: "",
}

export default function CreateTxFormSimple({
  form,
  handleSubmit,
  disabled,
}: {
  form: FormInstance<SimpleTxProps>
  handleSubmit: (values: SimpleTxProps, argValues: any) => void
  disabled: boolean
}) {
  const selectedFunction = Form.useWatch("selectedFunction", form)

  // const [numberOfOrders, setNumberOfOrders] = useState(0)
  const [parsedAbi, setParsedAbi] = useState<null | ABIEntry[]>(null)
  const [argInputs, setArgInputs] = useState<any>([])
  const [argValues, setArgValues] = useState<any>([])

  const parseAbi = () => {
    try {
      let parsed = JSON.parse(form.getFieldValue("userAbi"))
      console.log("Parsed ABI: ", parsed)
      parsed = parsed.filter((item) => item.type === "function")
      console.log("Filtered ABI: ", parsed)
      setParsedAbi(parsed)
    } catch (e) {
      console.log("parseAbi Error: ", e)
      setParsedAbi(null)
    }
  }

  const resolveComponent = (comp: FieldEntry, index: number, isNested: boolean = false) => {
    console.log("Comp: ", comp)
    console.log("Index: ", index)
    console.log("IsNested: ", isNested)

    if (comp.components) {
      return (
        <div className="flex flex-col mt-4 ml-4">
          <span className="base-text">{comp.name}</span>
          <div className="ml-4">{comp.components.map((item) => resolveComponent(item, index, true))}</div>
        </div>
      )
    }

    if (isNested) {
      switch (comp.type) {
        case "uint256":
          return (
            <div className="flex flex-col">
              <label className="mt-4 base-text">{comp.name}</label>
              <Input
                onChange={(e) => {
                  setArgValues((prevState) => {
                    const nextState = [...prevState]
                    nextState[index] = { ...nextState[index], [comp.name]: Number(e.target.value) }
                    return nextState
                  })
                }}
                className="rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
              />
            </div>
          )
        case "bool":
          return (
            <div className="flex flex-col">
              <label className="mt-4 base-text">{comp.name}</label>
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
              <label className="mt-4 base-text">{comp.name}</label>
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
                className="rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
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
            <label className="mt-4 base-text">{comp.name}</label>
            {/* <TextInput onChange={(e) => handleArgInputChange(e.target.value, index)}></TextInput> */}
            <Input
              onChange={(e) => handleArgInputChange(e.target.value, index)}
              className="rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
            />
          </div>
        )
      case "uint256":
        return (
          <div className="flex flex-col">
            <label className="mt-4 base-text">{comp.name}</label>
            {/* <NumberInput onChange={(e) => handleArgInputChange(Number(e.target.value), index)}></NumberInput> */}
            <Input
              onChange={(e) => handleArgInputChange(Number(e.target.value), index)}
              className="rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
            />
          </div>
        )
      case "bool":
        return (
          <div className="flex flex-col">
            <label className="mt-4 base-text">{comp.name}</label>
            <Select className="min-w-[8rem]" onChange={(value) => handleArgInputChange(value, index)}>
              <Select.Option value="false">No</Select.Option>
              <Select.Option value="true">Yes</Select.Option>
            </Select>
          </div>
        )
      default:
        return (
          <div className="flex flex-col">
            <label className="mt-4 base-text">{comp.name}</label>
            {/* <TextInput onChange={(e) => handleArgInputChange(e.target.value, index)}></TextInput> */}
            <Input
              onChange={(e) => handleArgInputChange(e.target.value, index)}
              className="rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
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

  const values = Form.useWatch([], form)

  useEffect(() => {
    console.log("Values: ", values)
  }, [values])

  useEffect(() => {
    console.log("parsedAbi: ", parsedAbi)
    console.log("parsedAbiBoolean: ", !!parsedAbi)
  }, [parsedAbi])

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
    console.log("SelectedFunction: ", { selectedFunction })
    if (selectedFunction) {
      renderArgInputs()
    } else {
      setArgInputs([])
      return
    }
  }, [selectedFunction])

  useEffect(() => {
    console.log("Arg Inputs: ", argInputs)
  }, [argInputs])

  useEffect(() => {
    console.log("Arg Values: ", argValues)
  }, [argValues])

  console.log("selectedFunction: ", { selectedFunction })
  console.log("argInputs: ", { argInputs })

  const onFinish: FormProps<SimpleTxProps>["onFinish"] = (values) => {
    console.log("Success:", values)
    handleSubmit(values, argValues)
  }

  const onFinishFailed: FormProps<SimpleTxProps>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <Form
      variant="outlined"
      initialValues={{ ...initialState }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
      disabled={disabled}
      layout="vertical"
    >
      <div className="mt-6 flex flex-col w-full gap-6">
        <div className="flex flex-col">
          <Form.Item name={"gasOrder"} label={"Gas Order"} colon={false}>
            <InputNumber
              spellCheck={false}
              placeholder="123"
              size="middle"
              className="rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col gap-4">
            <Form.Item name={"startDate"} label={"Start Date"} colon={false}>
              <DatePicker
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
              />
            </Form.Item>

            <Form.Item name={"startTime"} label={"Start Time"} colon={false}>
              <TimePicker
                className="dark:[&>div>input]:text-white/60 dark:[&>div>.ant-picker-suffix]:text-white/60"
                format={"HH:mm"}
              />
            </Form.Item>
          </div>
        </div>

        <div className="flex flex-col">
          <Form.Item name={"to"} label={"To"} colon={false}>
            <Input
              placeholder={"0x..."}
              spellCheck={false}
              size="middle"
              className="rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
            />
          </Form.Item>
        </div>

        <div className="flex flex-col">
          <Form.Item name={"gas"} label={"Gas"} colon={false}>
            <InputNumber
              spellCheck={false}
              placeholder="123"
              size="middle"
              className="rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </div>

        {!!parsedAbi ? null : (
          <div className="flex flex-col">
            <Form.Item
              name={"userAbi"}
              label={"ABI"}
              colon={false}
              rules={[
                {
                  validator: (_, value) => {
                    try {
                      let parsed = JSON.parse(form.getFieldValue("userAbi"))
                      return Promise.resolve()
                    } catch (e) {
                      return Promise.reject(new Error("Please enter an ABI in a valid JSON format"))
                    }
                  },
                },
              ]}
            >
              <Input.TextArea
                placeholder="Copy and paste your ABI JSON here"
                spellCheck={false}
                className="border-normal dark:border-whiteDark hover:border-primary focus:border-primary"
              />
            </Form.Item>
          </div>
        )}

        {!!parsedAbi ? (
          <div className="flex flex-row old-md:justify-between mt-4">
            <span className="text-primary">Abi was successfully parsed</span>
            <Buttons
              onClick={() => {
                form.setFieldValue("userAbi", "")
                form.setFieldValue("selectedFunction", "")

                setParsedAbi(null)
                setArgInputs([])
                setArgValues([])
              }}
              className="secondary_btn"
            >
              {"Clear ABI"}
            </Buttons>
          </div>
        ) : (
          <div className="flex flex-row old-md:justify-end mt-4">
            <Buttons onClick={parseAbi} className="secondary_btn">
              {"Parse ABI"}
            </Buttons>
          </div>
        )}

        {!!parsedAbi && (
          <div className="flex flex-col old-lg:flex-row gap-6 mt-4">
            <div className="flex flex-col grow">
              <span className="base-text">Function</span>
              <div className="flex flex-col mt-2">
                <Form.Item name={"selectedFunction"} label={"Function to execute"} colon={false}>
                  <Select>
                    {parsedAbi
                      .filter((item) => item.type === "function")
                      .map((item, index) => {
                        return <Select.Option value={item.name}>{item.name}</Select.Option>
                      })}
                  </Select>
                </Form.Item>
              </div>
            </div>
          </div>
        )}

        {!!parsedAbi && selectedFunction && argInputs.length !== 0 && (
          <div className="mt-8 flex flex-col">
            <span className="base-text">Function Arguments</span>
            {argInputs}
          </div>
        )}

        {!!parsedAbi && (
          <div>
            <Form.Item>
              <Buttons type="primary" htmlType="submit" className="primary_btn hidden old-lg:inline-flex">
                {"Submit"}
              </Buttons>
              <Buttons type="primary" htmlType="submit" className="primary_btn old-lg:hidden" block>
                {"Submit"}
              </Buttons>
            </Form.Item>
          </div>
        )}
      </div>
    </Form>
  )
}
