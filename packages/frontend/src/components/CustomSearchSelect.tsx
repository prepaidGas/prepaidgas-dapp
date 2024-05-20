import { TOKEN_ADDRESS, TOKEN_NAME } from "@/constants/tokens"
import { Input, Select, Switch } from "antd"
import { ChangeEventHandler, useState } from "react"
const { Option } = Select

export default function CustomSearchSelect({
  onChange,
  className = "",
  value,
}: {
  onChange?: (newValue: string) => void
  className?: string
  value?: any
}) {
  const [selectValue, setSelectValue] = useState(value)
  const [isUsingCustomValue, setIsUsingCustomValue] = useState(false)

  //   const [inputValue, setInputValue] = useState(true)

  const handleSelectChange = (value: string) => {
    setSelectValue(value)
    onChange?.(value)
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (TOKEN_NAME[e.target.value] === undefined) {
      setSelectValue("Custom")
    } else {
      setSelectValue(e.target.value)
    }
    onChange?.(e.target.value)
  }

  const selectAddon = (
    <Select
      value={selectValue}
      onChange={handleSelectChange}
      className={`[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div>div>div>span]:h-[26px] [&>div>div>div>span]:items-center h-[48px] py-0 ${className}`}
    >
      <Option value={TOKEN_ADDRESS.MockGasPrice}>{TOKEN_NAME[TOKEN_ADDRESS.MockGasPrice]}</Option>
      <Option value={TOKEN_ADDRESS.MockGuarantee}>{TOKEN_NAME[TOKEN_ADDRESS.MockGuarantee]}</Option>
    </Select>
  )

  return <Input value={value} onChange={handleInputChange} className={className} addonBefore={selectAddon} />
}
