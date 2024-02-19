"use client"

import { FireIcon } from "@heroicons/react/24/outline"
import { Text, NumberInput, Button, SearchSelect, SearchSelectItem } from "@tremor/react"
import { TailSpin } from "react-loader-spinner"
import { Dispatch, SetStateAction, useState } from "react"
import { SPINNER_COLOR } from "@/constants"
import { CreateOrderState } from "./CreateOrderCard"
import Receipt from "../Receipt"
import { getGuaranteeValue, getRewardValue } from "@/utils/utils"

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
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col">
          <Text>Gas</Text>
          <div className="flex flex-col mt-2">
            <NumberInput
              icon={FireIcon}
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
              error={!!validationErrors?.gasAmount}
              errorMessage={validationErrors?.gasAmount}
              spellCheck={false}
            ></NumberInput>
          </div>
        </div>
        <div className="flex flex-col lg:grow">
          <Text>Gas Cost Token</Text>
          <SearchSelect
            className="mt-2"
            value={inputValues.gasCostValueToken}
            onValueChange={(value) =>
              setInputValues({
                ...inputValues,
                gasCostValueToken: value,
                guaranteeValueToken: value,
                rewardValueToken: value,
              })
            }
            spellCheck={false}
            placeholder="0x1dA..."
          >
            <SearchSelectItem value="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512">MockUSD</SearchSelectItem>
            <SearchSelectItem value="Test1">Test1</SearchSelectItem>
            <SearchSelectItem value="Test2">Test2</SearchSelectItem>
            <SearchSelectItem value="Test3">Test3</SearchSelectItem>
          </SearchSelect>
        </div>
        <div className="flex flex-col lg:grow">
          <Text>Gas Cost GasPrice</Text>
          <NumberInput
            className="mt-2"
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
            error={!!validationErrors?.gasCostValueGasPrice}
            errorMessage={validationErrors?.gasCostValueGasPrice}
            spellCheck={false}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 md:gap-0 md:items-end md:flex-row md:justify-between mt-4">
        <Receipt
          //TODO pass correct token names
          gasAmount={inputValues.gasAmount}
          gasCostValue={inputValues.gasCostValueGasPrice}
          rewardValue={inputValues.rewardValueAmount}
        />
        <Button className="grow md:grow-0" disabled={isLoading} onClick={handleSubmit}>
          {/* <Button onClick={() => setIsLoading(!isLoading)}> */}
          <TailSpin
            height={20}
            width={20}
            color={SPINNER_COLOR}
            ariaLabel="tail-spin-loading"
            radius="0"
            wrapperStyle={{}}
            wrapperClass=""
            visible={isLoading}
          />
          {isLoading ? "" : "Create Gas Order"}
        </Button>
      </div>
    </div>
  )
}
