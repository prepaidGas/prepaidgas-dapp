"use client"

import { Card, Title, Text, Grid } from "@tremor/react"
import CreateOrderCard from "@/components/CreateOrderCards/CreateOrderCard"
import { useEffect, useState } from "react"
import DialogWindow from "@/components/DialogWindow"
import { SPINNER_COLOR } from "@/constants"
import { TailSpin } from "react-loader-spinner"
import AddTxRequestCard from "@/components/AddTxRequestCard"

export default function AddTxRequest() {
  const [showDialogWindow, setShowDialogWindow] = useState(false)
  const [transactionDetails, setTransactionDetails] = useState<null | any>(null)

  useEffect(() => {
    console.log("transactionDetails: ", transactionDetails)
    console.log("transactionDetails: ", Boolean(transactionDetails))
  }, [transactionDetails])

  return (
    <>
      {showDialogWindow ? (
        Boolean(transactionDetails) ? (
          <DialogWindow
            onClose={() => {
              setShowDialogWindow(false)
              setTransactionDetails(null)
            }}
            isClosable={true}
            title="Creating Order"
            description={
              transactionDetails.error ? (
                "There seems to be an error :("
              ) : (
                <div className="flex flex-col break-words gap-4">
                  From
                  <Text>{transactionDetails.from}</Text>
                  To
                  <Text>{transactionDetails.to}</Text>
                  Transaction Hash
                  <Text>{transactionDetails.transactionHash}</Text>
                  Status
                  <Text>{transactionDetails.status}</Text>
                </div>
              )
            }
          ></DialogWindow>
        ) : (
          <DialogWindow
            isClosable={false}
            title="Creating Order"
            description={
              <div className="flex justify-center">
                <TailSpin
                  height={40}
                  width={40}
                  color={SPINNER_COLOR}
                  ariaLabel="tail-spin-loading"
                  radius="0"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            }
          ></DialogWindow>
        )
      ) : null}
      <Title>Add transaction request</Title>
      <Text>You might add transaction request on this page</Text>
      {/* Main section */}
      <AddTxRequestCard
        setShowDialogWindow={setShowDialogWindow}
        setTransactionDetails={setTransactionDetails}
      ></AddTxRequestCard>

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
