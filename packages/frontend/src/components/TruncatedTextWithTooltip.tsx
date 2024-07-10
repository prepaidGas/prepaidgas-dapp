import { MIN_NUM_OF_CHARACTERS_FOR_TRUNCATION } from "@/constants"
import { useTooltip } from "@/hooks/tremor/useTooltip"
import React, { useState } from "react"

import { Tooltip } from "antd"
import { UilClipboardNotes } from "@iconscout/react-unicons"

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
      <>
        <div className={`flex w-auto`}>
          <Tooltip className="!w-auto !max-w-none" title={text} overlayStyle={{ maxWidth: "500px" }}>
            <div
              onClick={() => {
                setIsAnimating(true)
                copyToClipboard()
              }}
              onAnimationEnd={() => setIsAnimating(false)}
              className={`flex flex-row justify-center items-center rounded-md border border-solid gap-2 [&>*]:fill-primary border-primary px-2 py-1 ${
                isCopyable ? "cursor-pointer" : "cursor-default"
              } ${isAnimating && "animate-btnclick"} `}
            >
              {isCopyable && <UilClipboardNotes />}
              <span className="text-primary">{title ? title : truncateString(text)}</span>
            </div>
          </Tooltip>
        </div>
      </>
    )
  },
)

export default TruncatedTextWithTooltip
