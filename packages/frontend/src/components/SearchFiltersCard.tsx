import {
  ArrowPathIcon,
  CheckCircleIcon,
  PlayIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { Card, TextInput, Select, SelectItem, Button } from "@tremor/react"
import { useEffect, useState } from "react"

//@todo move interfaces
export interface FilterOptions {
  manager: string
  status: "0" | "1" | "2" | "3" | "4" | "5"
  numberOfEntries: string
}

export default function SearchFiltersCard({ setFilterState }: any) {
  const [validationTimer, setValidationTimer] = useState<NodeJS.Timeout | undefined>()
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/g

  const initialState: FilterOptions = {
    manager: "",
    status: "0",
    numberOfEntries: "50",
  }

  //Input values
  const [inputValues, setInputValues] = useState({ ...initialState })

  //Validation state
  const [validationErrors, setValidationErrors] = useState({
    manager: "",
    status: "",
    numberOfEntries: "",
  })

  const validateSearchForm = (isSubmitting?: boolean) => {
    const errors = { ...validationErrors }
    const noSpacesManager = inputValues.manager.replace(/\s/g, "")
    if (ethAddressRegex.test(noSpacesManager) || noSpacesManager === "") {
      errors.manager = ""
    } else {
      errors.manager = "Incorrect address"
    }

    setValidationErrors(errors)
    const IsEverythingValid = Object.values(errors).every((x) => x === "")

    if (isSubmitting && IsEverythingValid) {
      if (inputValues.manager === "") {
        setFilterState({ ...inputValues, manager: "0x0000000000000000000000000000000000000000" })
      } else {
        setFilterState({ ...inputValues })
      }
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
    validateSearchForm(true)
  }, [])

  return (
    <Card className="mt-6 flex flex-col gap-3 lg:gap-4 lg:flex-row align-middle justify-center ">
      <div className="flex flex-col grow align-middle">
        Manager:
        {/* @todo Replace with a more sophisticated component, with error handling and input validation, or ens */}
        <TextInput
          onChange={(e) => setInputValues({ ...inputValues, manager: e.target.value })}
          value={inputValues.manager}
          error={!!validationErrors.manager}
          errorMessage={validationErrors.manager}
          placeholder="0x1dA..."
          spellCheck={false}
        />
      </div>
      <div className="">
        Status
        <Select
          className="min-w-[8rem]"
          value={inputValues.status}
          onValueChange={(value) =>
            setInputValues({ ...inputValues, status: value as "0" | "1" | "2" | "3" | "4" | "5" })
          }
        >
          <SelectItem value="0">Any</SelectItem>
          <SelectItem icon={ArrowPathIcon} value="1">
            Pending
          </SelectItem>
          <SelectItem icon={CheckCircleIcon} value="2">
            Accepted
          </SelectItem>
          <SelectItem icon={PlayIcon} value="3">
            Active
          </SelectItem>
          <SelectItem icon={ExclamationTriangleIcon} value="4">
            Inactive
          </SelectItem>
          <SelectItem icon={XCircleIcon} value="5">
            Closed
          </SelectItem>
        </Select>
      </div>
      <div className="">
        Items per page
        <Select
          className="min-w-[8rem]"
          value={inputValues.numberOfEntries}
          onValueChange={(value) => setInputValues({ ...inputValues, numberOfEntries: value })}
        >
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="30">30</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </Select>
      </div>
      <div>
        &nbsp;
        <div className="flex flex-col lg:flex-row lg:my-auto gap-2">
          <Button className="h-[38px] m-0" onClick={() => validateSearchForm(true)} icon={FunnelIcon}>
            Apply
          </Button>
          <Button
            className="h-[38px] m-0"
            variant="secondary"
            onClick={() => setInputValues({ ...initialState })}
            icon={XMarkIcon}
          >
            Clear
          </Button>
        </div>
      </div>
    </Card>
  )
}
