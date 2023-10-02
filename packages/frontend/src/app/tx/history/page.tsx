import { Card, Title, Text } from "@tremor/react";

export default function TransactionHistory() {
  return (
    <>
      <Title>Private Transactions Histroy</Title>
      <Text>History of transactions realted to the current account</Text>
      {/* Main section */}
      <Card className="mt-6">
        <div className="h-96" />
      </Card>
    </>
  );
}
