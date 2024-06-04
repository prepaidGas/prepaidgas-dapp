import { PageHeaders } from "@/components/page-headers"
import { Form, Input, List, Select, Tabs, TabsProps } from "antd"

import { Cards } from "@/components/cards/frame/cards-frame"
import { Buttons } from "@/components/buttons"
import { useState } from "react"
import DialogWindow from "@/components/DialogWindow"
import { TailSpin } from "react-loader-spinner"
import CreateOrderForm from "@/components/forms/order/create/CreateOrderForm"

const SingleOrderPage = () => {
  const [showDialogWindow, setShowDialogWindow] = useState(false)
  const [transactionDetails, setTransactionDetails] = (useState < null) | (any > null)

  const PageRoutes = [
    {
      path: "/admin/order/create",
      breadcrumbName: "Home",
    },
    {
      path: "",
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

      <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <div className="h-full w-full">
          <Cards headless className="max-w-[1024px] mx-auto">
            <div className="p-[25px]">
              <CreateOrderForm />
            </div>
          </Cards>
        </div>
      </div>
    </>
  )
}

export default CreateOrder
