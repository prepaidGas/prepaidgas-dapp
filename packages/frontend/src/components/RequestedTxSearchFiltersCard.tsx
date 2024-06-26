import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ZodIssue, z } from "zod"

import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Card, TextInput, Select, SelectItem, Button, NumberInput } from "@tremor/react"

import { ICON_BY_STATUS, ETH_ADDRESS_OR_EMPTY_STRING_REGEX } from "@/constants"

const schema = z.object({
  status: z.number(),
  from: z.string(),
  to: z.string(),
  numberOfEntries: z.number(),
})
export type FilterOptionsRequestedTx = z.infer<typeof schema>

export default function RequestedTxSearchFiltersCard({
  initialValue,
  onSubmit,
}: {
  initialValue: FilterOptionsRequestedTx
  onSubmit: (x: FilterOptionsRequestedTx) => void
}) {
  const [validationTimer, setValidationTimer] = useState<NodeJS.Timeout | undefined>()

  //Input values
  const [inputValues, setInputValues] = useState({ ...initialValue })
  const [validationErrors, setValidationErrors] = useState<null | { [key: string]: string[] }>(null)

  const validateSearchForm = () => {
    setValidationErrors(null)

    const result = schema.safeParse(inputValues)
    if (result.success === false) {
      setValidationErrors(result.error.flatten().fieldErrors)
      return false
    }
    return true
  }

  const handleSubmit = (doDefaultSearch: boolean = false) => {
    const isValidForm = validateSearchForm()
    if (!isValidForm) return

    if (doDefaultSearch) {
      setInputValues({ ...initialValue })
      onSubmit({ ...initialValue })
    } else {
      onSubmit({ ...inputValues })
    }
  }

  useEffect(() => {
    if (validationTimer !== undefined) {
      clearTimeout(validationTimer)
    }
    const timer = setTimeout(validateSearchForm, 500)
    setValidationTimer(timer)
  }, [inputValues])

  useEffect(() => {
    validateSearchForm()
  }, [])

  return (
    <Card className="mt-6 flex flex-col gap-3 lg:gap-4 lg:flex-row align-middle justify-center ">
      {/* @todo Replace with a more sophisticated component, with error handling and input validation, or ens */}
      <div className="flex flex-col grow align-middle">
        From
        <NumberInput
          onChange={(e) => setInputValues({ ...inputValues, from: e.target.value })}
          value={inputValues.from}
          error={!!validationErrors?.from}
          errorMessage={validationErrors?.from[0]}
          placeholder=""
          spellCheck={false}
        />
      </div>
      <div className="flex flex-col grow align-middle">
        To
        <NumberInput
          onChange={(e) => setInputValues({ ...inputValues, to: e.target.value })}
          value={inputValues.to}
          error={!!validationErrors?.to}
          errorMessage={validationErrors?.to[0]}
          placeholder=""
          spellCheck={false}
        />
      </div>
      <div className="">
        Status
        <Select
          value={inputValues.status.toString()}
          onValueChange={(value) => setInputValues({ ...inputValues, status: Number(value) })}
        >
          <SelectItem value="0">Executed</SelectItem>
          <SelectItem value="1">Pending</SelectItem>
          <SelectItem value="2">Any</SelectItem>
        </Select>
      </div>
      <div className="">
        Items per page
        <Select
          className="min-w-[8rem]"
          value={inputValues.numberOfEntries.toString()}
          onValueChange={(value) =>
            setInputValues({ ...inputValues, numberOfEntries: Number(value) as 10 | 20 | 30 | 50 | 100 })
          }
        >
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="30">30</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </Select>
      </div>
      <div>
        &nbsp;
        <div className="flex flex-col lg:flex-row lg:my-auto gap-2">
          <Button className="h-[38px] m-0" onClick={() => handleSubmit()} icon={FunnelIcon}>
            Apply
          </Button>
          <Button className="h-[38px] m-0" variant="secondary" onClick={() => handleSubmit(true)} icon={XMarkIcon}>
            Clear
          </Button>
        </div>
      </div>
    </Card>
  )
}
