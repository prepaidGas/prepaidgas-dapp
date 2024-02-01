//example of how to use this hook. Everything below 450px will return isMobile = true
//const isMobile = useMediaQuery("(max-width: 450px)")

import { useState, useLayoutEffect } from "react"
import useEventListener from "./useEventListener"

function useMediaQuery(query) {
  const [isMatch, setIsMatch] = useState(false)
  const [mediaQueryList, setMediaQueryList] = useState(null)

  useLayoutEffect(() => {
    const matchQueryList = window.matchMedia(query)
    console.log("Match : ", matchQueryList)

    setMediaQueryList(matchQueryList)
    setIsMatch(matchQueryList.matches)
  }, [query])

  useEventListener("change", (e) => setIsMatch(e.matches), mediaQueryList, {})

  return isMatch
}

export default useMediaQuery
