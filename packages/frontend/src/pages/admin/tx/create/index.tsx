import { PageHeaders } from "@/components/page-headers"
import { Cards } from "@/components/cards/frame/cards-frame"
import { useState } from "react"
import CreateTxForm from "@/components/forms/tx/create/CreateTxForm"

const CreateTx = () => {
  const PageRoutes = [
    {
      path: "/admin",
      breadcrumbName: "Home",
    },
    {
      path: "",
      breadcrumbName: "Create Transaction",
    },
  ]
  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Create Transaction"
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <div className="h-full w-full">
          <Cards headless className="max-w-[1024px] mx-auto mt-4">
            <div className="p-[25px]">
              <CreateTxForm />
            </div>
          </Cards>
        </div>
      </div>
    </>
  )
}

export default CreateTx
