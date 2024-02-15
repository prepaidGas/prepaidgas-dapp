import { MIN_NUM_OF_CHARACTERS_FOR_TRUNCATION } from "@/constants"
import CustomTooltip from "./CustomTooltip"
import { useTooltip } from "@/hooks/tremor/useTooltip"
import React from "react"
import { mergeRefs } from "react-merge-refs"
import { Text } from "@tremor/react"

const TruncatedTextWithTooltip = React.forwardRef(({ text }: { text: string }, ref) => {
  const { tooltipProps, getReferenceProps } = useTooltip()

  const truncateString = (str: string) => {
    if (str.length >= MIN_NUM_OF_CHARACTERS_FOR_TRUNCATION) {
      return str.slice(0, 4) + "..." + str.substring(str.length - 4)
    }
    return str
  }

  return (
    <div className="flex w-auto" ref={mergeRefs([ref, tooltipProps.refs.setReference])} {...getReferenceProps}>
      <CustomTooltip text={text} {...tooltipProps} />
      <Text>{truncateString(text)}</Text>
    </div>
  )
})

export default TruncatedTextWithTooltip
