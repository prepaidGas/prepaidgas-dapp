"use client"
import { getGuaranteeValue, getRewardValue } from "@/utils/utils"
import { TOKEN_ADDRESS, TOKEN_NAME } from "@/constants/tokens"
import { Input, DatePicker, TimePicker, Form, FormInstance, FormProps, InputNumber } from "antd"
import { Buttons } from "@/components/buttons"
import dayjs, { Dayjs } from "dayjs"
import CreateOrderReceipt from "@/components/CreateOrderReceipt"
import CustomSearchSelect from "@/components/CustomSearchSelect"

export type AdvancedOrderProps = {
  gasAmount: number
  expireDate: Dayjs
  expireTime: Dayjs
  startDate: Dayjs
  startTime: Dayjs
  endDate: Dayjs
  endTime: Dayjs
  txWindow: number
  redeemWindow: number
  gasPriceToken: string
  gasPricePerUnit: number
  guaranteeToken: string
  guaranteePerUnit: number
}

const initialState: AdvancedOrderProps = {
  gasAmount: 100000,
  expireDate: dayjs(),
  expireTime: dayjs().add(15, "m"),
  startDate: dayjs(),
  startTime: dayjs(),
  endDate: dayjs().add(1, "d"),
  endTime: dayjs(),
  txWindow: 600,
  redeemWindow: 7200,
  gasPriceToken: TOKEN_ADDRESS.MockGasPrice,
  gasPricePerUnit: 10,
  guaranteeToken: TOKEN_ADDRESS.MockGuarantee,
  guaranteePerUnit: 0,
}

export default function CreateOrderFormAdvanced({
  form,
  handleSubmit,
  disabled,
}: {
  form: FormInstance<AdvancedOrderProps>
  handleSubmit: (values: AdvancedOrderProps) => void
  disabled: boolean
}) {
  const gasAmount = Form.useWatch("gasAmount", form)
  const gasPriceToken = Form.useWatch("gasPriceToken", form)
  const gasPricePerUnit = Form.useWatch("gasPricePerUnit", form)

  const onFinish: FormProps<AdvancedOrderProps>["onFinish"] = (values) => {
    console.log("Success:", values)
    handleSubmit(values)
  }

  const onFinishFailed: FormProps<AdvancedOrderProps>["onFinishFailed"] = (errorInfo) => {
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
        <div className="flex flex-col old-lg:flex-row gap-6">
          <div className="flex flex-col flex-1">
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

          <div className="flex flex-col">
            <div className="flex flex-col gap-4">
              <Form.Item name="startDate" label="Execution period Start Date" colon={false}>
                <DatePicker
                  defaultValue={dayjs().add(0, "d")}
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

              <Form.Item name="startTime" label="Execution period Start Time" colon={false}>
                <TimePicker
                  className="dark:[&>div>input]:text-white/60 dark:[&>div>.ant-picker-suffix]:text-white/60"
                  defaultValue={dayjs("00:00", "HH:mm")}
                  format={"HH:mm"}
                />
              </Form.Item>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col gap-4">
              <Form.Item name="endDate" label="Execution period End Date" colon={false}>
                <DatePicker
                  defaultValue={dayjs().add(0, "d")}
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

              <Form.Item name="endTime" label="Execution period End Time" colon={false}>
                <TimePicker
                  className="dark:[&>div>input]:text-white/60 dark:[&>div>.ant-picker-suffix]:text-white/60"
                  defaultValue={dayjs("00:00", "HH:mm")}
                  format={"HH:mm"}
                />
              </Form.Item>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col gap-4">
              <Form.Item name="expireDate" label="Execution period Expire Date" colon={false}>
                <DatePicker
                  defaultValue={dayjs().add(0, "d")}
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

              <Form.Item name="expireTime" label="Execution period Expire Time" colon={false}>
                <TimePicker
                  className="dark:[&>div>input]:text-white/60 dark:[&>div>.ant-picker-suffix]:text-white/60"
                  defaultValue={dayjs("00:00", "HH:mm")}
                  format={"HH:mm"}
                />
              </Form.Item>
            </div>
          </div>
        </div>

        {/* Gas Cost Settings */}
        <div className="flex flex-col mt-4 old-lg:flex-row gap-6">
          <div className="flex flex-col flex-1">
            <Form.Item name={"gasPriceToken"} label={"Gas Price Token"} colon={false}>
              <CustomSearchSelect />
            </Form.Item>
          </div>

          <div className="flex flex-col flex-1">
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

        {/* Guarantee Settings */}
        <div className="flex flex-col mt-4 old-lg:flex-row gap-6">
          <div className="flex flex-col flex-1">
            <Form.Item name={"guaranteeToken"} label={"Guarantee Token"} colon={false}>
              <CustomSearchSelect />
            </Form.Item>
          </div>

          <div className="flex flex-col flex-1">
            <Form.Item
              name={"guaranteePerUnit"}
              label={"Guarantee Per Unit"}
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

        {/* Advanced Settings */}
        <div className="flex flex-col old-lg:flex-row gap-6 mt-4">
          <div className="flex flex-col flex-1">
            <Form.Item
              name={"txWindow"}
              label={"Transaction window"}
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

          <div className="flex flex-col flex-1">
            <Form.Item
              name={"redeemWindow"}
              label={"Redeem window"}
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

        <div className="flex flex-col old-sm:flex-row old-sm:items-end old-sm:justify-between gap-4 mt-4 old-sm:mt-8">
          <CreateOrderReceipt gasAmount={gasAmount} gasPricePerUnit={gasPricePerUnit} gasPriceToken={gasPriceToken} />
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
