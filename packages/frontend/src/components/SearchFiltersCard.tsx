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
interface FilterOptions {
  manager: string
  status: "0" | "1" | "2" | "3" | "4" | "5"
  numberOfEntries: string
}

export default function SearchFiltersCard({
  executeSearch,
}: {
  executeSearch: (filterOptions: FilterOptions) => void
}) {
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
      executeSearch({ ...inputValues })
    }
  }

  useEffect(() => {
    if (validationTimer !== undefined) {
      clearTimeout(validationTimer)
    }
    const timer = setTimeout(validateSearchForm, 500)
    setValidationTimer(timer)
  }, [inputValues])

  return (
    <Card className="mt-6">
      <div className="mb-4">
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
      <div className="mb-4">
        Status
        <Select
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
      <div className="mb-4">
        Items per page
        <Select
          value={inputValues.numberOfEntries}
          onValueChange={(value) => setInputValues({ ...inputValues, numberOfEntries: value })}
        >
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="30">30</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </Select>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-end">
        <Button
          className="w-full mb-2 lg:w-auto lg:mr-2 lg:mb-0"
          onClick={() => validateSearchForm(true)}
          icon={FunnelIcon}
        >
          Apply Filters
        </Button>
        <Button
          className="w-full lg:w-auto lg:mr-2 lg:mb-0"
          variant="secondary"
          onClick={() => setInputValues({ ...initialState })}
          icon={XMarkIcon}
        >
          Clear Filters
        </Button>
      </div>
    </Card>
  )
}
