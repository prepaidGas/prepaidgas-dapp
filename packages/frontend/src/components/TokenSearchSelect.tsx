import { SearchSelect, SearchSelectItem } from "@tremor/react"
import { Select } from "antd"
const { Option } = Select

export default function TokenSearchSelect({
  changeHandler,
  className,
  searchSelectValue,
}: {
  changeHandler: any
  className: string
  searchSelectValue: any
}) {
  //old searchSelect that uses TremorJS
  {
    /* <SearchSelect className={className} value={searchSelectValue} onValueChange={changeHandler} spellCheck={false}>
        <SearchSelectItem value="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512">MockUSD</SearchSelectItem>
        <SearchSelectItem value="Test 0">Test 0</SearchSelectItem>
        <SearchSelectItem value="Test 1">Test 1</SearchSelectItem>
      </SearchSelect> */
  }
  return (
    <Select
      mode="multiple"
      value={searchSelectValue}
      onChange={changeHandler}
      className={`[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div>div>div>span]:h-[26px] [&>div>div>div>span]:items-center h-[48px] py-0 ${className}`}
    >
      <Option value="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512">Mock USD</Option>
      <Option value="2">Test Token 1</Option>
      <Option value="3">Test Token 2</Option>
    </Select>
  )
}
