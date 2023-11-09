import { Card, Title, Text, Grid } from "@tremor/react";

export default function SavedOrder() {
  return (
    <>
      <Title>Saved</Title>
      <Text>List of the orders which you saved</Text>
      {/* Main section */}
      <Card className="mt-6">
        <div className="h-96" />
      </Card>
    </>
  );
}

