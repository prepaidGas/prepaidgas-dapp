"use client"

import { FireIcon } from "@heroicons/react/24/outline"
import { Text, NumberInput, Button } from "@tremor/react"
import { TailSpin } from "react-loader-spinner"
import { Dispatch, SetStateAction, useState } from "react"
import { SPINNER_COLOR } from "@/constants"
import { CreateOrderState } from "./CreateOrderCard"
import Receipt from "../Receipt"
import { getGuaranteeValue, getRewardValue } from "@/utils/utils"
import TokenSearchSelect from "../TokenSearchSelect"
import { TOKEN_NAME } from "@/constants/tokens"

import { Form, Input, List, Select, Tabs, TabsProps } from "antd"
const { Option } = Select

import { Buttons } from "@/components/buttons"
import CreateOrderCard from "@/components/CreateOrderCards/CreateOrderCard"

export default function CreateOrderCardSimple({
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

  return (
    <div className="mt-6 flex flex-col w-full">
      {/* Gas Amount, Token and Gas Price inputs */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="input-number-gas" className="text-[#404040] dark:text-[#A4A5AA] mb-1">
            Gas Amount
          </label>
          <Input
            value={inputValues.gasAmount.toString()}
            onChange={(e) => {
              const gasAmount = Number(e.target.value)
              setInputValues({
                ...inputValues,
                gasAmount,
                guaranteeValueGasPrice: getGuaranteeValue(gasAmount, inputValues.gasCostValueGasPrice),
                rewardValueAmount: getRewardValue(gasAmount, inputValues.gasCostValueGasPrice),
                gasCostTransfer: getGuaranteeValue(gasAmount, inputValues.gasCostValueGasPrice),
                rewardTransfer: getRewardValue(gasAmount, inputValues.gasCostValueGasPrice),
              })
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
        <div className="flex flex-col old-md:flex-row gap-4">
          <div className="flex flex-col grow justify-start ">
            <label htmlFor="token-select" className="text-[#404040] dark:text-[#A4A5AA] mb-1">
              Token
            </label>
            <TokenSearchSelect
              searchSelectValue={inputValues.gasCostValueToken}
              changeHandler={(value) =>
                setInputValues({
                  ...inputValues,
                  gasCostValueToken: value,
                  guaranteeValueToken: value,
                  rewardValueToken: value,
                })
              }
            />
          </div>
          <div className="flex flex-col grow justify-start">
            <label htmlFor="input-number-gasCost" className="text-[#404040] dark:text-[#A4A5AA] mb-1">
              Gas Cost
            </label>
            <Input
              value={inputValues.gasCostValueGasPrice.toString()}
              onChange={(e) => {
                const gasCostValueGasPrice = Number(e.target.value)
                setInputValues({
                  ...inputValues,
                  gasCostValueGasPrice,
                  guaranteeValueGasPrice: getGuaranteeValue(inputValues.gasAmount, gasCostValueGasPrice),
                  rewardValueAmount: getRewardValue(inputValues.gasAmount, gasCostValueGasPrice),
                  gasCostTransfer: getGuaranteeValue(inputValues.gasAmount, gasCostValueGasPrice),
                  rewardTransfer: getRewardValue(inputValues.gasAmount, gasCostValueGasPrice),
                })
              }}
              // error={!!validationErrors?.gasCostValueGasPrice}
              // errorMessage={validationErrors?.gasCostValueGasPrice}
              spellCheck={false}
              placeholder="123"
              size="middle"
              className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col old-sm:flex-row old-sm:items-end old-sm:justify-between gap-4 mt-4 old-sm:mt-8">
        <Receipt
          className=""
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
