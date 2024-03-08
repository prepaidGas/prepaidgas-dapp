import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ZodIssue, z } from "zod"

import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Card, TextInput, SelectItem, Button } from "@tremor/react"
import { Cards } from "@/components/cards/frame/cards-frame"
import { Buttons } from "@/components/buttons"
import { Form, Input, List, Select, Tabs, TabsProps } from "antd"
const { Option } = Select

import { ETH_ADDRESS_OR_EMPTY_STRING_REGEX, ICON_BY_STATUS } from "@/constants"

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

  const handleSubmit = (doDefaultSearch: boolean = false) => {
    const isValidForm = validateSearchForm()
    if (!isValidForm) return

    if (doDefaultSearch) {
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
    <Form className="mt-4 grow">
      <div className="flex flex-row gap-6 items-start">
        <div className="flex flex-col grow">
          <label htmlFor="input-number-manager" className="text-[#404040] dark:text-[#A4A5AA]">
            Manager
          </label>
          <Form.Item name="input-number-manager">
            <Input
              onChange={(e) => setInputValues({ ...inputValues, manager: e.target.value })}
              value={inputValues.manager}
              // error={!!validationErrors?.manager}
              // errorMessage={validationErrors?.manager[0]}
              spellCheck={false}
              placeholder="0x1dA..."
              size="middle"
              className="h-[40px] p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
            />
          </Form.Item>
        </div>
        <div className="flex flex-col grow">
          <label htmlFor="status-select" className="text-[#404040] dark:text-[#A4A5AA]">
            Status
          </label>
          <Form.Item name="status-select" initialValue={["0"]}>
            <Select
              value={inputValues.status.toString()}
              onChange={(value) => setInputValues({ ...inputValues, status: Number(value) })}
              className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div>div>div>span]:h-[26px] [&>div>div>div>span]:items-center h-[48px] py-0"
            >
              <Option value="0">Any</Option>
              <Option value="1">Pending</Option>
              <Option value="2">Accepted</Option>
              <Option value="3">Active</Option>
              <Option value="4">Inactive</Option>
              <Option value="5">Untaken</Option>
              <Option value="5">Closed</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="flex flex-col grow">
          <label htmlFor="ipp-select" className="text-[#404040] dark:text-[#A4A5AA]">
            Items Per Page
          </label>
          <Form.Item name="ipp-select" initialValue={["50"]}>
            <Select
              value={inputValues.numberOfEntries.toString()}
              onChange={(value) =>
                setInputValues({ ...inputValues, numberOfEntries: Number(value) as 10 | 20 | 30 | 50 | 100 })
              }
              className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div>div>div>span]:h-[26px] [&>div>div>div>span]:items-center h-[48px] py-0"
            >
              <Option value="10">10</Option>
              <Option value="20">20</Option>
              <Option value="30">30</Option>
              <Option value="50">50</Option>
              <Option value="100">100</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="flex flex-col grow">
          <label className="text-[#404040] dark:text-[#A4A5AA]">&nbsp;</label>
          <Form.Item name="ipp-select" className="flex flex-row gap-4">
            <Buttons
              onClick={() => handleSubmit()}
              className="bg-primary h-[40px] hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px]"
            >
              {"Apply"}
            </Buttons>
            <Buttons
              onClick={() => handleSubmit(true)}
              className=" ml-4 bg-transparent hover:bg-primary-hbr border-solid border-1 border-primary text-primary hover:text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[40px]"
            >
              {"Clear"}
            </Buttons>
          </Form.Item>
        </div>
      </div>
    </Form>
  )
}
