import { useRef, useEffect } from "react"

function useEventListener(eventName, handler, element, options) {
  const savedHandler = useRef(handler)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const targetElement = element ?? window
    const isSupportedEventListener = targetElement && targetElement.addEventListener
    if (!isSupportedEventListener) return

    const eventListener = (event) => savedHandler.current(event)

    targetElement.addEventListener(eventName, eventListener, options)

    return () => {
      targetElement.removeEventListener(eventName, eventListener, options)
    }
  }, [eventName, element, options])
}

export default useEventListener
