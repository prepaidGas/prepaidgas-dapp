import { Card, Title, Text, Button } from "@tremor/react"
import { useState, useEffect } from "react"

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("consentedToCookies") === null) {
      setShowBanner(true)
    } else {
      setShowBanner(false)
    }
  })

  const onAccept = () => {
    localStorage.setItem("consentedToCookies", "1")
    setShowBanner(false)
  }

  const onReject = () => {
    localStorage.setItem("consentedToCookies", "0")
    setShowBanner(false)
  }

  return (
    showBanner && (
      <Card decoration="top" className="fixed z-10 p-4 bottom-0 left-0 w-full lg:bottom-6 lg:left-6 lg:w-auto ">
        <Title className="mb-2">We value your privacy</Title>
        <Text className="mb-3">
          PreaidGas.io doesn&#39;t use third party cookies - only a single in-house cookie. No data is sent to a third
          party.
        </Text>
        <Button onClick={onReject} size="xl" variant="secondary" className="mr-2">
          Reject
        </Button>
        <Button onClick={onAccept} size="xl" variant="primary" className="mr-2">
          Accept
        </Button>
      </Card>
    )
  )
}
