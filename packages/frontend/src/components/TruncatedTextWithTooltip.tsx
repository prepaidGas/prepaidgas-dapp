import { MIN_NUM_OF_CHARACTERS_FOR_TRUNCATION } from "@/constants"
import CustomTooltip from "./CustomTooltip"
import { useTooltip } from "@/hooks/tremor/useTooltip"
import React, { useState } from "react"
import { mergeRefs } from "react-merge-refs"
import { Icon, Text } from "@tremor/react"
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline"

const TruncatedTextWithTooltip = React.forwardRef(
  ({ text, isCopyable = false, title = "" }: { text: string; isCopyable?: boolean; title?: string }, ref) => {
    const { tooltipProps, getReferenceProps } = useTooltip()
    const [isAnimating, setIsAnimating] = useState(false)

    const truncateString = (str: string) => {
      if (str.length >= MIN_NUM_OF_CHARACTERS_FOR_TRUNCATION) {
        return str.slice(0, 5) + "..." + str.substring(str.length - 5)
      }
      return str
    }

    const copyToClipboard = () => {
      navigator.clipboard.writeText(text)
    }

    return (
      <div className={`flex w-auto`} ref={mergeRefs([ref, tooltipProps.refs.setReference])} {...getReferenceProps}>
        <CustomTooltip text={text} {...tooltipProps} />
        <div
          onClick={() => {
            setIsAnimating(true)
            copyToClipboard()
          }}
          className={`flex flex-row justify-center items-center rounded-md border border-solid gap-2 border-blue-500 px-2 py-1 ${
            isCopyable ? "cursor-pointer" : "cursor-default"
          } ${isAnimating && "animate-wiggle"}`}
          onAnimationEnd={() => setIsAnimating(false)}
        >
          {isCopyable && (
            <Icon className="!p-0 !m-0" size="sm" variant="simple" icon={ClipboardDocumentIcon} color="blue" />
          )}
          <Text color="blue">{title ? title : truncateString(text)}</Text>
        </div>
      </div>
    )
  },
)

export default TruncatedTextWithTooltip
