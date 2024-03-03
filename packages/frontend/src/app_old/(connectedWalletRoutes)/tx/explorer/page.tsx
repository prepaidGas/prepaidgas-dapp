import { Card, Title, Text } from "@tremor/react";

export default function TransactionExplorer() {
  return (
    <>
      <Title>Transactions</Title>
      <Text>Explore the transactions</Text>
      {/* Main section */}
      <Card className="mt-6">
        <div className="h-96" />
      </Card>
    </>
  );
}
