"use client"

import Receipt from "@/components/Receipt"
import { TOKEN_ADDRESS, TOKEN_NAME } from "@/constants/tokens"

import { Form, FormInstance, FormProps, Input, InputNumber, List, Select, Tabs, TabsProps } from "antd"

import { Buttons } from "@/components/buttons"
import TokenSearchSelectAntd from "@/components/TokenSearchSelectAntd"

export type SimpleOrderProps = {
  gasAmount: number
  txWindow: number
  redeemWindow: number
  gasPriceToken: string
  gasPricePerUnit: number
}

const initialState: SimpleOrderProps = {
  gasAmount: 100000,
  txWindow: 600,
  redeemWindow: 7200,
  gasPriceToken: TOKEN_ADDRESS.MockUSD,
  gasPricePerUnit: 10,
}

export default function CreateOrderFormSimple({
  form,
  handleSubmit,
  disabled,
}: {
  form: FormInstance<SimpleOrderProps>
  handleSubmit: (values: SimpleOrderProps) => void
  disabled: boolean
}) {
  const onFinish: FormProps<SimpleOrderProps>["onFinish"] = (values) => {
    console.log("Success:", values)
    handleSubmit(values)
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
      disabled={disabled}
      layout="vertical"
    >
      <div className="mt-6 flex flex-col w-full">
        {/* Gas Amount, Token and Gas Price inputs */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <Form.Item name="gasAmount" label="Gas Amount" colon={false} rules={[{ required: true }]}>
              <InputNumber
                min={100000}
                spellCheck={false}
                placeholder="123"
                size="middle"
                className="rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </div>
          <div className="flex flex-col old-md:flex-row gap-4">
            <div className="flex flex-col grow justify-start ">
              <Form.Item name={"gasPriceToken"} label={"Token"} colon={false}>
                <TokenSearchSelectAntd />
              </Form.Item>
            </div>
            <div className="flex flex-col grow justify-start">
              <Form.Item
                name={"gasPricePerUnit"}
                label={"Gas Price Per Unit"}
                colon={false}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber
                  spellCheck={false}
                  placeholder="123"
                  size="middle"
                  className="rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60 grow"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="flex flex-col old-sm:flex-row old-sm:items-end old-sm:justify-between gap-4 mt-4 old-sm:mt-8">
          {/* <Receipt
            className=""
            //TODO pass correct token names
            gasAmount={form.getFieldValue("gasAmount")}
            gasCostValue={form.getFieldValue("gasPricePerUnit")}
            gasCostTokenName={TOKEN_NAME[form.getFieldValue("gasPriceToken")] ?? form.getFieldValue("gasPriceToken")}
          /> */}

          <Form.Item>
            <Buttons type="primary" htmlType="submit" className="primary_btn hidden old-lg:inline-flex">
              {"Create Gas Order"}
            </Buttons>
            <Buttons type="primary" htmlType="submit" className="primary_btn old-lg:hidden" block>
              {"Create Gas Order"}
            </Buttons>
          </Form.Item>
        </div>
      </div>
    </Form>
  )
}
