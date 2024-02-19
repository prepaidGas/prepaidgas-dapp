import { SearchSelect, SearchSelectItem } from "@tremor/react"

export default function TokenSearchSelect({
  changeHandler,
  className,
  searchSelectValue,
}: {
  changeHandler: any
  className: string
  searchSelectValue: any
}) {
  return (
    <SearchSelect className={className} value={searchSelectValue} onValueChange={changeHandler} spellCheck={false}>
      <SearchSelectItem value="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512">MockUSD</SearchSelectItem>
      <SearchSelectItem value="Test 0">Test 0</SearchSelectItem>
      <SearchSelectItem value="Test 1">Test 1</SearchSelectItem>
    </SearchSelect>
  )
}
