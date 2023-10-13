"use client"

import { Card, Title, Text, Grid } from "@tremor/react"
import UserStatsCard from "../../../components/UserStatsCard"
import FavoriteOrdersSection from "../../../components/FavoriteOrdersSection"

export default function MyOrdersOrder() {
  return (
    <>
      <Title>My Orders</Title>
      <Text>List of the orders managable by you</Text>
      {/* Main section */}

      <UserStatsCard />

      <Text className="mt-6">Favorite Orders</Text>
      <FavoriteOrdersSection />
    </>
  )
}
