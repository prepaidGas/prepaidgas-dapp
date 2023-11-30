import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ZodIssue, z } from "zod"

import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Card, TextInput, Select, SelectItem, Button } from "@tremor/react"

import { ETH_ADDRESS_OR_EMPTY_STRING_REGEX } from "../constants/regexConstants"
import { ICON_BY_STATUS } from "../constants/themeConstants"

const schema = z.object({
  manager: z.string().regex(ETH_ADDRESS_OR_EMPTY_STRING_REGEX, { message: "Incorrect address" }),
  status: z.number().lte(5).gte(0),
  numberOfEntries: z.number(),
})
export type FilterOptions = z.infer<typeof schema>

export default function SearchFiltersCard({
  initialValue,
  onSubmit,
}: {
  initialValue: FilterOptions
  onSubmit: (x: FilterOptions) => void
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

  const handleSubmit = () => {
    const isValidForm = validateSearchForm()
    if (!isValidForm) return

    onSubmit({ ...inputValues })
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
      <div className="flex flex-col grow align-middle">
        Manager
        {/* @todo Replace with a more sophisticated component, with error handling and input validation, or ens */}
        <TextInput
          onChange={(e) => setInputValues({ ...inputValues, manager: e.target.value })}
          value={inputValues.manager}
          error={!!validationErrors?.manager}
          errorMessage={validationErrors?.manager[0]}
          placeholder="0x1dA..."
          spellCheck={false}
        />
      </div>
      <div className="">
        Status
        <Select
          value={inputValues.status.toString()}
          onValueChange={(value) => setInputValues({ ...inputValues, status: Number(value) })}
          icon={ICON_BY_STATUS[inputValues.status]}
        >
          <SelectItem icon={ICON_BY_STATUS[0]} value="0">
            Any
          </SelectItem>
          <SelectItem icon={ICON_BY_STATUS[1]} value="1">
            Pending
          </SelectItem>
          <SelectItem icon={ICON_BY_STATUS[2]} value="2">
            Accepted
          </SelectItem>
          <SelectItem icon={ICON_BY_STATUS[3]} value="3">
            Active
          </SelectItem>
          <SelectItem icon={ICON_BY_STATUS[4]} value="4">
            Inactive
          </SelectItem>
          <SelectItem icon={ICON_BY_STATUS[5]} value="5">
            Untaken
          </SelectItem>
          <SelectItem icon={ICON_BY_STATUS[6]} value="6">
            Closed
          </SelectItem>
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
          <Button className="h-[38px] m-0" onClick={handleSubmit} icon={FunnelIcon}>
            Apply
          </Button>
          <Button
            className="h-[38px] m-0"
            variant="secondary"
            onClick={() => setInputValues({ ...initialValue })}
            icon={XMarkIcon}
          >
            Clear
          </Button>
        </div>
      </div>
    </Card>
  )
}
