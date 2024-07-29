"use client"

import {
  DatePicker,
  Form,
  FormInstance,
  FormProps,
  Input,
  InputNumber,
  Select,
  TimePicker,
  Switch,
  Modal,
  Button,
  Card,
} from "antd"

import { useEffect, useState } from "react"
import { ABIEntry } from "@/helpers"
import dayjs, { Dayjs } from "dayjs"
import { ETH_ADDRESS_OR_EMPTY_STRING_REGEX, TEST_ABI_STRING } from "@/constants"
import ContractForm from "../../../ContractForm"
import commonModalConfigs from "@/constants/commonModalConfigs"

export type SimpleTxProps = {
  gasOrder: number
  startDate: Dayjs
  startTime: Dayjs
  to: string
  gas: number
  userAbi: string
  etherscanContractAddress: string
  selectedFunction: string
}

const initialState: SimpleTxProps = {
  gasOrder: 0,
  startDate: dayjs().add(1, "d"),
  startTime: dayjs("00:00", "HH:mm"),
  to: "0x0000000000000000000000000000000000000000",
  gas: 25000,
  userAbi: TEST_ABI_STRING,
  etherscanContractAddress: "0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413",
  selectedFunction: "",
}

const testFunc = {
  inputs: [
    {
      components: [
        {
          internalType: "address",
          name: "address",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "number",
          type: "uint256",
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
              name: "perUnit",
              type: "uint256",
            },
          ],
          internalType: "struct GasPayment",
          name: "gasPrice",
          type: "tuple",
        },
      ],
      internalType: "struct Order",
      name: "order",
      type: "tuple",
    },
  ],
  name: "testFunc",
  outputs: [
    {
      internalType: "uint256",
      name: "id",
      type: "uint256",
    },
  ],
  stateMutability: "nonpayable",
  type: "function",
}

const testFunc2 = {
  inputs: [
    {
      internalType: "address",
      name: "address",
      type: "address",
    },
    {
      internalType: "uint256",
      name: "number",
      type: "uint256",
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
          name: "perUnit",
          type: "uint256",
        },
      ],
      internalType: "struct GasPayment",
      name: "gasPrice",
      type: "tuple",
    },
  ],
  name: "testFunc2",
  outputs: [
    {
      internalType: "uint256",
      name: "id",
      type: "uint256",
    },
  ],
  stateMutability: "nonpayable",
  type: "function",
}

export default function CreateTxFormSimple({
  form,
  handleSubmit,
  disabled,
  inputs,
  setInputs,
}: {
  form: FormInstance<SimpleTxProps>
  handleSubmit: (values: SimpleTxProps) => void
  disabled: boolean
  inputs: any
  setInputs: any
}) {
  const selectedFunction = Form.useWatch("selectedFunction", form)

  const [parsedAbi, setParsedAbi] = useState<null | ABIEntry[]>(null)

  const [isUsingEtherscanAbi, setIsUsingEtherscanAbi] = useState(true)
  const [isLoadingAbi, setIsLoadingAbi] = useState(false)
  const [modal, contextHolder] = Modal.useModal()

  const parseAbi = () => {
    try {
      let parsed = JSON.parse(form.getFieldValue("userAbi"))
      console.log("Parsed ABI: ", parsed)
      parsed = parsed.filter((item) => item.type === "function")
      console.log("Filtered ABI: ", parsed)
      //todo: remove this in prod
      parsed.push(testFunc)
      parsed.push(testFunc2)
      setParsedAbi(parsed)
    } catch (e) {
      console.log("parseAbi Error: ", e)
      setParsedAbi(null)
    }
  }

  const fetchAbiFromEtherscan = async () => {
    setIsLoadingAbi(true)
    try {
      const fetchUrl = `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${form.getFieldValue(
        "etherscanContractAddress",
      )}&apikey=RV9VA5BZT1TP42JYWV45KWU7G26UASVWZ1`
      console.log("fetchAbiFromEtherscan: ", fetchUrl)
      const response = await fetch(fetchUrl, { method: "GET" })
      const result = await response.json()
      console.log("fetchAbiFromEtherscan: ", result)
      if (result.message === "OK") {
        console.log("Result is OK")
        setParsedAbi(JSON.parse(result.result))
      } else {
        console.log("Result is NOT OK")
        modal.error({ ...commonModalConfigs.ErrorConfig, content: result.result })
      }
    } catch (error) {
      console.log("ERROR fetchAbiFromEtherscan: ", { error })
    }
    setIsLoadingAbi(false)
  }

  const values = Form.useWatch([], form)

  useEffect(() => {
    console.log("Values: ", values)
  }, [values])

  useEffect(() => {
    console.log("parsedAbi: ", parsedAbi)
    console.log("parsedAbiBoolean: ", !!parsedAbi)
  }, [parsedAbi])

  useEffect(() => {
    console.log("SelectedFunction: ", { selectedFunction })
    setInputs({})
  }, [selectedFunction])

  const onFinish: FormProps<SimpleTxProps>["onFinish"] = (values) => {
    console.log("Success:", values)
    handleSubmit(values)
  }

  const onFinishFailed: FormProps<SimpleTxProps>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <>
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

          <div className="flex flex-row items-center justify-center">
            <Switch
              style={{ backgroundColor: isUsingEtherscanAbi ? "#009688" : "#ff6977" }}
              disabled={isLoadingAbi || !!parsedAbi}
              checkedChildren={"Etherscan ABI"}
              unCheckedChildren={"Custom ABI"}
              value={isUsingEtherscanAbi}
              onChange={(checked: boolean) => {
                setIsUsingEtherscanAbi(checked)
              }}
            />
          </div>

          {isUsingEtherscanAbi ? (
            <div className="flex flex-col">
              <Form.Item
                name="etherscanContractAddress"
                label="Etherscan smart contract address"
                colon={false}
                rules={[
                  {
                    validator: (_, value) => {
                      if (ETH_ADDRESS_OR_EMPTY_STRING_REGEX.test(value)) {
                        return Promise.resolve()
                      } else {
                        return Promise.reject(new Error("Please enter a valid address"))
                      }
                    },
                  },
                ]}
              >
                <Input
                  spellCheck={false}
                  placeholder="0x1dA..."
                  className="!border-normal dark:border-whiteDark hover:!border-primary focus:!border-primary dark:placeholder-white/60"
                />
              </Form.Item>
            </div>
          ) : (
            <div className="flex flex-col">
              <Form.Item
                name={"userAbi"}
                label={"ABI"}
                colon={false}
                rules={[
                  {
                    validator: (_, value) => {
                      try {
                        let parsed = JSON.parse(value)
                        console.log("VALIDATOR Parsed ABI: ", parsed)
                        return Promise.resolve()
                      } catch (e) {
                        return Promise.reject(new Error("Please enter an ABI in a valid JSON format"))
                      }
                    },
                  },
                ]}
                className={`${!!parsedAbi ? "hidden" : ""}`}
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
              <Button
                onClick={() => {
                  form.setFieldValue("userAbi", "")
                  form.setFieldValue("selectedFunction", "")

                  setParsedAbi(null)
                  // setArgInputs([])
                  // setArgValues([])
                }}
                className="secondary_btn"
              >
                {"Clear ABI"}
              </Button>
            </div>
          ) : (
            <div className="flex flex-row old-md:justify-end mt-4">
              {isUsingEtherscanAbi ? (
                <Button loading={isLoadingAbi} onClick={fetchAbiFromEtherscan} className="secondary_btn">
                  {"Get ABI"}
                </Button>
              ) : (
                <Button onClick={parseAbi} className="secondary_btn">
                  {"Parse ABI"}
                </Button>
              )}
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

          {!!parsedAbi && !!selectedFunction && (
            <Card
              title={`Fill out a form for the "${selectedFunction}" function`}
              className="mt-8 border-2 border-primary"
            >
              <ContractForm abi={parsedAbi} selectedFunction={selectedFunction} inputs={inputs} setInputs={setInputs} />
            </Card>
          )}

          {!!parsedAbi && (
            <div>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="primary_btn hidden old-lg:inline-flex">
                  {"Submit"}
                </Button>
                <Button type="primary" htmlType="submit" className="primary_btn old-lg:hidden" block>
                  {"Submit"}
                </Button>
              </Form.Item>
            </div>
          )}
        </div>
      </Form>
      {contextHolder}
    </>
  )
}
