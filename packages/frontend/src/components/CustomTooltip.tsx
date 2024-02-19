import { tremorTwMerge } from "@/utils/tremor/tremorTwMerge"
import { ExtendedRefs, ReferenceType, Strategy } from "@floating-ui/react"

export interface TooltipProps {
  text?: string
  open: boolean
  x: number | null
  y: number | null
  refs: ExtendedRefs<ReferenceType>
  strategy: Strategy
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>
}

const CustomTooltip = ({ text, open, x, y, refs, strategy, getFloatingProps }: TooltipProps) => {
  return open && text ? (
    <div
      className={tremorTwMerge(
        // common
        "max-w-sm text-sm z-20 rounded-tremor-default opacity-100 px-2.5 py-1 whitespace-nowrap",
        // light
        "text-white bg-tremor-background-emphasis",
        // dark
        "text-white dark:bg-dark-tremor-background-subtle",
      )}
      ref={refs.setFloating}
      style={{
        position: strategy,
        top: y ?? 0,
        left: x ?? 0,
      }}
      {...getFloatingProps()}
    >
      {text}
    </div>
  ) : null
}

export default CustomTooltip
