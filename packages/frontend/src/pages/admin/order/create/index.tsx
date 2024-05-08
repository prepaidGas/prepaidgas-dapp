import { PageHeaders } from "@/components/page-headers"
import { Form, Input, List, Select, Tabs, TabsProps } from "antd"
import { UilQuestionCircle } from "@iconscout/react-unicons"
const { Option } = Select

import { Cards } from "@/components/cards/frame/cards-frame"
import { Buttons } from "@/components/buttons"
import CreateOrderCard from "@/components/CreateOrderCards/CreateOrderCard"
import { useState } from "react"
import DialogWindow from "@/components/DialogWindow"
import { TailSpin } from "react-loader-spinner"
import CreateOrderForm from "@/components/forms/order/create/CreateOrderForm"

const CreateOrder = () => {
  const [showDialogWindow, setShowDialogWindow] = useState(false)
  const [transactionDetails, setTransactionDetails] = useState<null | any>(null)

  const PageRoutes = [
    {
      path: "admin",
      breadcrumbName: "Home",
    },
    {
      path: "create",
      breadcrumbName: "Create Order",
    },
  ]

  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Create Order"
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />

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
                  <span>{transactionDetails.from}</span>
                  To
                  <span>{transactionDetails.to}</span>
                  Transaction Hash
                  <span>{transactionDetails.transactionHash}</span>
                  Status
                  <span>{transactionDetails.status}</span>
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
                  color={"#009688"}
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

      <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <div className="h-full w-full">
          <Cards headless className="max-w-[1024px] mx-auto">
            <div className="p-[25px]">
              <CreateOrderForm
                setShowDialogWindow={setShowDialogWindow}
                setTransactionDetails={setTransactionDetails}
              />
            </div>
          </Cards>
        </div>
      </div>
    </>
  )
}

export default CreateOrder
