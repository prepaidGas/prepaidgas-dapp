"use client"
import Receipt from "@/components/Receipt"
import { getGuaranteeValue, getRewardValue } from "@/utils/utils"
import { TOKEN_ADDRESS, TOKEN_NAME } from "@/constants/tokens"
import { Input, DatePicker, TimePicker, Form, FormInstance, FormProps } from "antd"
import { Buttons } from "@/components/buttons"
import dayjs, { Dayjs } from "dayjs"
import TokenSearchSelectAntd from "@/components/TokenSearchSelectAntd"

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

export default function CreateOrderFormAdvanced({
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
        <div className="flex flex-col old-lg:flex-row gap-6">
          <div className="flex flex-col flex-1">
            <label htmlFor="input-number-gas" className="base-text mb-1">
              Gas Amount
            </label>
            <Input
              min={0}
              spellCheck={false}
              placeholder="123"
              size="middle"
              className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
            />
          </div>

          <div className="flex flex-col">
            <label className="base-text mb-1">Execution period Start</label>
            <div className="flex flex-col gap-4">
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
              <TimePicker
                className="dark:[&>div>input]:text-white/60 dark:[&>div>.ant-picker-suffix]:text-white/60"
                defaultValue={dayjs("00:00", "HH:mm")}
                format={"HH:mm"}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="base-text mb-1">Execution period End</label>
            <div className="flex flex-col gap-4">
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
              <TimePicker
                className="dark:[&>div>input]:text-white/60 dark:[&>div>.ant-picker-suffix]:text-white/60"
                defaultValue={dayjs("00:00", "HH:mm")}
                format={"HH:mm"}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="base-text mb-1">Execution period Expire</label>
            <div className="flex flex-col gap-4">
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
              <TimePicker
                className="dark:[&>div>input]:text-white/60 dark:[&>div>.ant-picker-suffix]:text-white/60"
                defaultValue={dayjs("00:00", "HH:mm")}
                format={"HH:mm"}
              />
            </div>
          </div>
        </div>

        {/* Gas Cost Settings */}
        <div className="flex flex-col mt-4 old-lg:flex-row gap-6">
          <div className="flex flex-col flex-1">
            <label className="base-text mb-1">Gas Cost Token</label>
            <TokenSearchSelectAntd />
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="input-number-gas" className="base-text mb-1">
              Gas Price
            </label>
            <Input
              min={0}
              spellCheck={false}
              placeholder="123"
              size="middle"
              className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
            />
          </div>
        </div>

        {/* Guarantee Settings */}
        <div className="flex flex-col mt-4 old-lg:flex-row gap-6">
          <div className="flex flex-col flex-1">
            <label className="base-text mb-1">Guarantee Token</label>
            <TokenSearchSelectAntd />
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="input-number-gas" className="base-text mb-1">
              Guarantee GasPrice
            </label>
            <Input
              min={0}
              spellCheck={false}
              placeholder="123"
              size="middle"
              className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
            />
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="flex flex-col old-lg:flex-row gap-6 mt-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="input-number-gas" className="base-text mb-1">
              Transaction window
            </label>
            <Input
              min={0}
              spellCheck={false}
              placeholder="123"
              size="middle"
              className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="input-number-gas" className="base-text mb-1">
              Redeem window
            </label>
            <Input
              min={0}
              spellCheck={false}
              placeholder="123"
              size="middle"
              className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
            />
          </div>
        </div>

        <div className="flex flex-col old-sm:flex-row old-sm:items-end old-sm:justify-between gap-4 mt-4 old-sm:mt-8">
          {/* <Receipt
            //TODO pass correct token names
            gasAmount={inputValues.gasAmount}
            gasCostValue={inputValues.gasPricePerUnit}
            gasCostTokenName={TOKEN_NAME[inputValues.gasPriceToken] ?? inputValues.gasPriceToken}
          /> */}
          <Buttons onClick={handleSubmit} className="primary_btn">
            {"Create Gas Order"}
          </Buttons>
        </div>
      </div>
    </Form>
  )
}
