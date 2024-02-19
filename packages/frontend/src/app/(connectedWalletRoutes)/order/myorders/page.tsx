"use client"

import { Card, Title, Text, Grid, Color } from "@tremor/react"
import UserStatsCard from "@/components/UserStatsCard"
import FavoriteOrdersSection from "@/components/FavoriteOrdersSection"
import { useState } from "react"
import ToasterPopup from "@/components/ToasterPopup"

export default function MyOrdersOrder() {
  const [showPopup, setShowPopup] = useState(false)
  const [popupTimer, setPopupTimer] = useState<NodeJS.Timeout | undefined>()
  const [popupProps, setPopupProps] = useState<{ msgTitle: string; msgBody: string; color: Color }>({
    msgTitle: "",
    msgBody: "",
    color: "blue",
  })

  const onOrderCardAction = (favorited: boolean) => {
    if (favorited) {
      setPopupProps({
        msgTitle: "Order was added to favorites",
        msgBody: "",
        color: "green",
      })
    } else {
      setPopupProps({
        msgTitle: "Order was removed from favorites",
        msgBody: "",
        color: "amber",
      })
    }
    setShowPopup(true)
    if (popupTimer !== undefined) {
      clearTimeout(popupTimer)
    }
    const timer = setTimeout(() => setShowPopup(false), 5000)
    setPopupTimer(timer)
  }
  return (
    <>
      <Title>My Orders</Title>
      <Text>List of the orders managable by you</Text>
      {/* Main section */}

      <UserStatsCard />

      <Text className="mt-6">Favorite Orders</Text>
      <FavoriteOrdersSection onFavorited={onOrderCardAction} />

      {showPopup ? (
        <ToasterPopup
          msgTitle={popupProps.msgTitle}
          msgBody={popupProps.msgBody}
          onClose={() => setShowPopup(false)}
          color={popupProps.color}
        />
      ) : null}
    </>
  )
}
