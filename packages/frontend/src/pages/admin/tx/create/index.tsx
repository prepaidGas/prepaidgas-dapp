import { PageHeaders } from "@/components/page-headers"
import { DatePicker, Form, Input, List, Select, Tabs, TabsProps, TimePicker } from "antd"
import { UilQuestionCircle } from "@iconscout/react-unicons"
const { Option } = Select
const { TextArea } = Input

import { Cards } from "@/components/cards/frame/cards-frame"
import { Buttons } from "@/components/buttons"
import dayjs from "dayjs"
import CreateTxCard from "@/components/CreateTxCards/CreateTxCard"
import { useState } from "react"

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Simple",
    children: null,
  },
  {
    key: "2",
    label: "Advanced",
    children: null,
  },
]

const CreateTx = () => {
  const [showDialogWindow, setShowDialogWindow] = useState(false)
  const [transactionDetails, setTransactionDetails] = useState<null | any>(null)

  const PageRoutes = [
    {
      path: "admin",
      breadcrumbName: "Dashboard",
    },
    {
      path: "create",
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
          <Cards headless className="max-w-[1024px] mx-auto">
            <div className="p-[25px]">
              <CreateTxCard setShowDialogWindow={setShowDialogWindow} setTransactionDetails={setTransactionDetails} />
            </div>
          </Cards>
        </div>
      </div>
    </>
  )
}

export default CreateTx
