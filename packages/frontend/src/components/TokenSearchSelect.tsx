import { TOKEN_ADDRESS, TOKEN_NAME } from "@/constants/tokens"
import { SearchSelect, SearchSelectItem } from "@tremor/react"
import { Input, Select, Switch } from "antd"
import { useState } from "react"
const { Option } = Select

export default function TokenSearchSelectAntd({
  onChange,
  className = "",
  value,
}: {
  onChange?: any
  className?: string
  value?: any
}) {
  const [isUsingPredefinedTokens, setIsUsingPredefinedTokens] = useState(true)
  return (
    // <>
    //   <div className="flex flex-row items-center gap-4">
    //     <Switch
    //       value={isUsingPredefinedTokens}
    //       onChange={() => setIsUsingPredefinedTokens(!isUsingPredefinedTokens)}
    //       checkedChildren="Predefined"
    //       unCheckedChildren="Custom"
    //       className="w-[8rem]"
    //     />
    //     {isUsingPredefinedTokens ? (
    //       <Select
    //         value={value}
    //         onChange={onChange}
    //         className={`!h-[2.5rem] [&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div>div>div>span]:items-center py-0 ${className}`}
    //       >
    //         <Option value={TOKEN_ADDRESS.MockOLD}>{TOKEN_NAME[TOKEN_ADDRESS.MockOLD]}</Option>
    //         <Option value={TOKEN_ADDRESS.MockUSD}>{TOKEN_NAME[TOKEN_ADDRESS.MockUSD]}</Option>
    //         <Option value={TOKEN_ADDRESS.MockEUR}>{TOKEN_NAME[TOKEN_ADDRESS.MockEUR]}</Option>
    //       </Select>
    //     ) : (
    //       <Input value={value} onChange={onChange} className="!h-[2.5rem]" />
    //     )}
    //   </div>
    // </>
    <Select
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
