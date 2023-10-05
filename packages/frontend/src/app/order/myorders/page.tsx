"use client"

import { Card, Title, Text, Grid } from "@tremor/react"
import UserStatsCard from "../../../components/UserStatsCard"

export default function MyOrdersOrder() {
  return (
    <>
      <Title>My Orders</Title>
      <Text>List of the orders managable by you</Text>
      {/* Main section */}

      <UserStatsCard />

      <Card className="mt-6">
        <div className="h-96" />
      </Card>
    </>
  )
}
