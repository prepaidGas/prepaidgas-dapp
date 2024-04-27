"use client"

import { FireIcon } from "@heroicons/react/24/outline"
import { Text, NumberInput, Button } from "@tremor/react"
import { TailSpin } from "react-loader-spinner"
import { Dispatch, SetStateAction, useState } from "react"
import { SPINNER_COLOR } from "@/constants"
import Receipt from "@/components/Receipt"
import { getGuaranteeValue, getRewardValue } from "@/utils/utils"
import TokenSearchSelect from "@/components/TokenSearchSelect"
import { TOKEN_ADDRESS, TOKEN_NAME } from "@/constants/tokens"

import { Form, FormInstance, FormProps, Input, List, Select, Tabs, TabsProps } from "antd"
const { Option } = Select

import { Buttons } from "@/components/buttons"
import CreateOrderCard from "@/components/CreateOrderCards/CreateOrderCard"

export type SimpleOrderProps = {
  gasAmount: number
  txWindow: number
  redeemWindow: number
  gasPriceToken: string
  gasPricePerUnit: number
}

const initialState = {
  gasAmount: 100000,
  txWindow: 600,
  redeemWindow: 7200,
  gasPriceToken: TOKEN_ADDRESS.MockUSD,
  gasPricePerUnit: 10,
}

export default function CreateOrderFormSimple({
  form,
  handleSubmit,
}: {
  form: FormInstance<SimpleOrderProps>
  handleSubmit: (values: SimpleOrderProps) => void
}) {
  const [isLoading, setIsLoading] = useState(false)

  const onFinish: FormProps<SimpleOrderProps>["onFinish"] = (values) => {
    console.log("Success:", values)
    handleSubmit(values)
    // createOrder()
  }

  const onFinishFailed: FormProps<SimpleOrderProps>["onFinishFailed"] = (errorInfo) => {
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
    >
      <div className="mt-6 flex flex-col w-full">
        {/* Gas Amount, Token and Gas Price inputs */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="input-number-gas" className="base-text mb-1">
              Gas Amount
            </label>
            <Form.Item name="gasAmount" label="Gas Amount" rules={[{ required: true }]}>
              <Input
                min={100000}
                spellCheck={false}
                placeholder="123"
                size="middle"
                className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
              />
            </Form.Item>
          </div>
          <div className="flex flex-col old-md:flex-row gap-4">
            <div className="flex flex-col grow justify-start ">
              <label htmlFor="token-select" className="base-text mb-1">
                Token
              </label>
              <Form.Item name={"gasPriceToken"}>
                <TokenSearchSelect />
              </Form.Item>
            </div>
            <div className="flex flex-col grow justify-start">
              <label htmlFor="input-number-gasCost" className="base-text mb-1">
                Gas Cost
              </label>
              <Form.Item name={"gasPricePerUnit"}>
                <Input
                  spellCheck={false}
                  placeholder="123"
                  size="middle"
                  className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="flex flex-col old-sm:flex-row old-sm:items-end old-sm:justify-between gap-4 mt-4 old-sm:mt-8">
          <Receipt
            className=""
            //TODO pass correct token names
            gasAmount={form.getFieldValue("gasAmount")}
            gasCostValue={form.getFieldValue("gasPricePerUnit")}
            gasCostTokenName={TOKEN_NAME[form.getFieldValue("gasPriceToken")] ?? form.getFieldValue("gasPriceToken")}
          />

          <Form.Item>
            <Buttons type="primary" htmlType="submit" className="primary_btn">
              {"Create Gas Order"}
            </Buttons>
            {/* <Buttons onClick={handleSubmit} className="primary_btn">
          {"Create Gas Order"}
        </Buttons> */}
          </Form.Item>
        </div>
      </div>
    </Form>
  )
}
