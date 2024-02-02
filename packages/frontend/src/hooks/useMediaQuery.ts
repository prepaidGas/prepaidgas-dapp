//example of how to use this hook. Everything below 450px will return isMobile = true
//const isMobile = useMediaQuery("(max-width: 450px)")

import { useState, useLayoutEffect } from "react"
import useEventListener from "./useEventListener"
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect"

function useMediaQuery(query) {
  //use true for a quick fix
  const [isMatch, setIsMatch] = useState(false)
  const [mediaQueryList, setMediaQueryList] = useState(null)

  useIsomorphicLayoutEffect(() => {
    const matchQueryList = window.matchMedia(query)
    console.log("useIsomorphicLayoutEffect", matchQueryList)

    setMediaQueryList(matchQueryList)
    setIsMatch(matchQueryList.matches)
  }, [query])

  useEventListener("change", (e) => setIsMatch(e.matches), mediaQueryList, {})

  return isMatch
}

export default useMediaQuery
