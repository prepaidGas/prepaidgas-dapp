import { TOKEN_ADDRESS, TOKEN_NAME } from "@/constants/tokens"
import { SearchSelect, SearchSelectItem } from "@tremor/react"
import { Select } from "antd"
const { Option } = Select

export default function TokenSearchSelect({
  onChange,
  className = "",
  value,
}: {
  onChange?: any
  className?: string
  value?: any
}) {
  return (
    <Select
      mode="multiple"
      value={value}
      onChange={onChange}
      className={`[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div>div>div>span]:h-[26px] [&>div>div>div>span]:items-center h-[48px] py-0 ${className}`}
    >
      <Option value={TOKEN_ADDRESS.MockOLD}>{TOKEN_NAME[TOKEN_ADDRESS.MockOLD]}</Option>
      <Option value={TOKEN_ADDRESS.MockUSD}>{TOKEN_NAME[TOKEN_ADDRESS.MockUSD]}</Option>
      <Option value={TOKEN_ADDRESS.MockEUR}>{TOKEN_NAME[TOKEN_ADDRESS.MockEUR]}</Option>
    </Select>
  )
}
