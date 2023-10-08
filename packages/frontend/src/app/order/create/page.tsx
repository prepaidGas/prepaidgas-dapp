import { Card, Title, Text, Grid } from "@tremor/react"
import CreateOrderCard from "../../../components/CreateOrderCard"

export default function CreateOrder() {
  return (
    <>
      <Title>Create Order</Title>
      <Text>You might create order on this page</Text>
      {/* Main section */}
      <CreateOrderCard />

      {/* KPI section */}
      <Grid numItemsMd={2} className="mt-6 gap-6">
        <Card>
          {/* Placeholder to set height */}
          <div className="h-28" />
        </Card>
        <Card>
          {/* Placeholder to set height */}
          <div className="h-28" />
        </Card>
      </Grid>
    </>
  )
}
