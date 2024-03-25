"use client"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { CreateOrderState } from "./CreateOrderCard"
import Receipt from "../Receipt"
import { getGuaranteeValue, getRewardValue } from "@/utils/utils"
import TokenSearchSelect from "../TokenSearchSelect"
import { TOKEN_NAME } from "@/constants/tokens"
import { Input, DatePicker, TimePicker } from "antd"
import { Buttons } from "../buttons"
import dayjs, { Dayjs } from "dayjs"

export default function CreateOrderCardAdvanced({
  setInputValues,
  inputValues,
  validationErrors,
  handleSubmit,
}: {
  setInputValues: Dispatch<SetStateAction<{}>>
  inputValues: CreateOrderState
  validationErrors: null | { [key: string]: string }
  handleSubmit: () => void
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [wasGasPriceChanged, setWasGasPriceChanged] = useState(false)
  const [wasRewardValueChanged, setWasRewardValueChanged] = useState(false)
  const [wasGuaranteeValueChanged, setWasGuaranteeValueChanged] = useState(false)
  const [wasRewardTransferChanged, setWasRewardTransferChanged] = useState(false)
  const [wasGasCostTransferChanged, setWasGasCostTransferChanged] = useState(false)

  return (
    <div className="mt-6 flex flex-col w-full">
      <div className="flex flex-col old-lg:flex-row gap-6">
        <div className="flex flex-col flex-1">
          <label htmlFor="input-number-gas" className="base-text mb-1">
            Gas Amount
          </label>
          <Input
            value={inputValues.gasAmount.toString()}
            //onChange={(e) => setInputValues({ ...inputValues, gasAmount: Number(e.target.value) })}
            onChange={(e) => {
              setInputValues({ ...inputValues, gasAmount: Number(e.target.value) })
              const gasAmount = Number(e.target.value)
              if (
                wasGasPriceChanged === false &&
                wasRewardValueChanged === false &&
                wasGuaranteeValueChanged === false &&
                wasGasCostTransferChanged === false &&
                wasRewardTransferChanged === false
              ) {
                setInputValues({
                  ...inputValues,
                  gasAmount,
                  guaranteeValueGasPrice: getGuaranteeValue(gasAmount, inputValues.gasCostValueGasPrice),
                  rewardValueAmount: getRewardValue(gasAmount, inputValues.gasCostValueGasPrice),
                  gasCostTransfer: getGuaranteeValue(gasAmount, inputValues.gasCostValueGasPrice),
                  rewardTransfer: getRewardValue(gasAmount, inputValues.gasCostValueGasPrice),
                })
              }
            }}
            min={0}
            // error={!!validationErrors?.gasAmount}
            // errorMessage={validationErrors?.gasAmount}
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
              // value={dayjs(inputValues.executionPeriodStartDate)}
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
                  // setInputValues({ ...inputValues, executionPeriodStartDate: date })
                }
              }}
            />
            <TimePicker
              className="dark:[&>div>input]:text-white/60 dark:[&>div>.ant-picker-suffix]:text-white/60"
              defaultValue={dayjs("00:00", "HH:mm")}
              format={"HH:mm"}
              // value={inputValues.executionPeriodStartTime}
              // onChange={(value) => setInputValues({ ...inputValues, executionPeriodStartTime: value })}
              // error={!!validationErrors?.executionPeriodStartTime}
              // errorMessage={validationErrors?.executionPeriodStartTime}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="base-text mb-1">Execution period End</label>
          <div className="flex flex-col gap-4">
            <DatePicker
              defaultValue={dayjs().add(0, "d")}
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
      </div>

      {/* Reward Settings */}
      <div className="flex flex-col mt-4 old-lg:flex-row gap-6">
        <div className="flex flex-col flex-1">
          <label className="base-text mb-1">Reward Token</label>
          <TokenSearchSelect
            className=""
            searchSelectValue={inputValues.rewardValueToken}
            changeHandler={(value) =>
              setInputValues({
                ...inputValues,
                rewardValueToken: value,
              })
            }
          />
        </div>

        <div className="flex flex-col flex-1">
          <label htmlFor="input-number-gas" className="base-text mb-1">
            Reward Amount
          </label>
          <Input
            value={inputValues.rewardValueAmount.toString()}
            onChange={(e) => {
              const rewardValueAmount = Number(e.target.value)
              setInputValues({ ...inputValues, rewardValueAmount })
            }}
            min={0}
            // error={!!validationErrors?.rewardValueAmount}
            // errorMessage={validationErrors?.rewardValueAmount}
            spellCheck={false}
            placeholder="123"
            size="middle"
            className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
          />
        </div>
      </div>

      {/* Gas Cost Settings */}
      <div className="flex flex-col mt-4 old-lg:flex-row gap-6">
        <div className="flex flex-col flex-1">
          <label className="base-text mb-1">Gas Cost Token</label>
          <TokenSearchSelect
            className=""
            searchSelectValue={inputValues.gasCostValueToken}
            changeHandler={(value) =>
              setInputValues({
                ...inputValues,
                gasCostValueToken: value,
              })
            }
          />
        </div>

        <div className="flex flex-col flex-1">
          <label htmlFor="input-number-gas" className="base-text mb-1">
            Gas Price
          </label>
          <Input
            value={inputValues.gasCostValueGasPrice.toString()}
            onChange={(e) => {
              const gasCostValueGasPrice = Number(e.target.value)
              setInputValues({
                ...inputValues,
                gasCostValueGasPrice,
              })
            }}
            min={0}
            //  error={!!validationErrors?.gasCostValueGasPrice}
            //  errorMessage={validationErrors?.gasCostValueGasPrice}
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
          <TokenSearchSelect
            className=""
            searchSelectValue={inputValues.guaranteeValueToken}
            changeHandler={(value) =>
              setInputValues({
                ...inputValues,
                guaranteeValueToken: value,
              })
            }
          />
        </div>

        <div className="flex flex-col flex-1">
          <label htmlFor="input-number-gas" className="base-text mb-1">
            Guarantee GasPrice
          </label>
          <Input
            value={inputValues.guaranteeValueGasPrice.toString()}
            onChange={(e) => setInputValues({ ...inputValues, guaranteeValueGasPrice: Number(e.target.value) })}
            min={0}
            // error={!!validationErrors?.guaranteeValueGasPrice}
            // errorMessage={validationErrors?.guaranteeValueGasPrice}
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
            Execution window
          </label>
          <Input
            value={inputValues.executionWindow.toString()}
            onChange={(e) => setInputValues({ ...inputValues, executionWindow: Number(e.target.value) })}
            min={0}
            // error={!!validationErrors?.executionWindow}
            // errorMessage={validationErrors?.executionWindow}
            spellCheck={false}
            placeholder="123"
            size="middle"
            className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
          />
        </div>

        <div className="flex flex-col flex-1">
          <label htmlFor="input-number-gas" className="base-text mb-1">
            Reward transfer
          </label>
          <Input
            value={inputValues.rewardTransfer.toString()}
            onChange={(e) => {
              setInputValues({ ...inputValues, rewardTransfer: Number(e.target.value) })
              setWasRewardTransferChanged(true)
            }}
            min={0}
            // error={!!validationErrors?.rewardTransfer}
            // errorMessage={validationErrors?.rewardTransfer}
            spellCheck={false}
            placeholder="123"
            size="middle"
            className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
          />
        </div>

        <div className="flex flex-col flex-1">
          <label htmlFor="input-number-gas" className="base-text mb-1">
            Gas cost transfer
          </label>
          <Input
            value={inputValues.gasCostTransfer.toString()}
            onChange={(e) => {
              setInputValues({ ...inputValues, gasCostTransfer: Number(e.target.value) })
              setWasGasCostTransferChanged(true)
            }}
            min={0}
            // error={!!validationErrors?.gasCostTransfer}
            // errorMessage={validationErrors?.gasCostTransfer}
            spellCheck={false}
            placeholder="123"
            size="middle"
            className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
          />
        </div>
      </div>
      <div className="flex flex-col old-sm:flex-row old-sm:items-end old-sm:justify-between gap-4 mt-4 old-sm:mt-8">
        <Receipt
          //TODO pass correct token names
          gasAmount={inputValues.gasAmount}
          gasCostValue={inputValues.gasCostValueGasPrice}
          rewardValue={inputValues.rewardValueAmount}
          gasCostTokenName={TOKEN_NAME[inputValues.gasCostValueToken] ?? inputValues.gasCostValueToken}
          rewardTokenName={TOKEN_NAME[inputValues.rewardValueToken] ?? inputValues.rewardValueToken}
        />
        <Buttons
          onClick={handleSubmit}
          className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
        >
          {"Create Gas Order"}
        </Buttons>
      </div>
    </div>
  )
}
