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
  handleSubmit: (isOrderSimple: boolean) => void
}) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="mt-6 flex flex-col w-full">
      {/* Gas Amount, Token and Gas Price inputs */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="input-number-gas" className="base-text mb-1">
            Gas Amount
          </label>
          <Input
            value={inputValues.gasAmount.toString()}
            onChange={(e) => {
              const gasAmount = Number(e.target.value)
              setInputValues({
                ...inputValues,
                gasAmount,
                guaranteePerUnit: getGuaranteeValue(gasAmount, inputValues.gasPricePerUnit),
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
            <label htmlFor="token-select" className="base-text mb-1">
              Token
            </label>
            <TokenSearchSelect
              searchSelectValue={inputValues.gasPriceToken}
              changeHandler={(value) =>
                setInputValues({
                  ...inputValues,
                  gasPriceToken: value[0],
                  guaranteeToken: value[0],
                })
              }
            />
          </div>
          <div className="flex flex-col grow justify-start">
            <label htmlFor="input-number-gasCost" className="base-text mb-1">
              Gas Cost
            </label>
            <Input
              value={inputValues.gasPricePerUnit.toString()}
              onChange={(e) => {
                const gasPricePerUnit = Number(e.target.value)
                setInputValues({
                  ...inputValues,
                  gasPricePerUnit,
                  guaranteePerUnit: getGuaranteeValue(inputValues.gasAmount, gasPricePerUnit),
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
          gasCostValue={inputValues.gasPricePerUnit}
          gasCostTokenName={TOKEN_NAME[inputValues.gasPriceToken] ?? inputValues.gasPriceToken}
        />
        <Buttons onClick={() => handleSubmit(true)} className="primary_btn">
          {"Create Gas Order"}
        </Buttons>
      </div>
    </div>
  )
}
