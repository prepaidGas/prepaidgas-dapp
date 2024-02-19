import {
  autoUpdate,
  ExtendedRefs,
  flip,
  offset,
  ReferenceType,
  shift,
  Strategy,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react"
import { useState } from "react"

export const useTooltip = (delay?: number) => {
  const [open, setOpen] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && delay) {
      const timer = setTimeout(() => {
        setOpen(isOpen)
      }, delay)
      setTimeoutId(timer)
      return
    }
    clearTimeout(timeoutId)
    setOpen(isOpen)
  }

  const { x, y, refs, strategy, context } = useFloating({
    open,
    onOpenChange: handleOpenChange,
    placement: "top",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      shift(),
    ],
  })

  const hover = useHover(context, { move: false })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: "tooltip" })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role])

  return {
    tooltipProps: {
      open,
      x,
      y,
      refs,
      strategy,
      getFloatingProps,
    },
    getReferenceProps,
  }
}
