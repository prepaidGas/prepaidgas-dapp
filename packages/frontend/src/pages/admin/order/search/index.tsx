import { PageHeaders } from "@/components/page-headers"
import { Form, Input, List, Select, Tabs, TabsProps } from "antd"
import { UilQuestionCircle, UilClipboardNotes } from "@iconscout/react-unicons"
const { Option } = Select

import { Cards } from "@/components/cards/frame/cards-frame"
import { Buttons } from "@/components/buttons"
import OrderCard, { OrderCardProps } from "@/components/cards/orderCard"

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

const cardData: OrderCardProps[] = [
  {
    id: "0",
    manager: "",
    timeframe: "Mar 3 2024, 18:19:10 - Mar 31 2081, 23:06:35",
    window: "60",
    reward: "200",
    gasCost: "100",
    guarantee: "100",
  },
  {
    id: "1",
    manager: "",
    timeframe: "Mar 3 2024, 18:19:10 - Mar 31 2081, 23:06:35",
    window: "60",
    reward: "200",
    gasCost: "100",
    guarantee: "100",
  },
  {
    id: "2",
    manager: "",
    timeframe: "Mar 3 2024, 18:19:10 - Mar 31 2081, 23:06:35",
    window: "60",
    reward: "200",
    gasCost: "100",
    guarantee: "100",
  },
  {
    id: "3",
    manager: "",
    timeframe: "Mar 3 2024, 18:19:10 - Mar 31 2081, 23:06:35",
    window: "60",
    reward: "200",
    gasCost: "100",
    guarantee: "100",
  },
  {
    id: "4",
    manager: "",
    timeframe: "Mar 3 2024, 18:19:10 - Mar 31 2081, 23:06:35",
    window: "60",
    reward: "200",
    gasCost: "100",
    guarantee: "100",
  },
  {
    id: "5",
    manager: "",
    timeframe: "Mar 3 2024, 18:19:10 - Mar 31 2081, 23:06:35",
    window: "60",
    reward: "200",
    gasCost: "100",
    guarantee: "100",
  },
]

const OrderSearch = () => {
  const PageRoutes = [
    {
      path: "admin",
      breadcrumbName: "Dashboard",
    },
    {
      path: "create",
      breadcrumbName: "Order Search",
    },
  ]

  const onChange = (key: string) => {}

  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Order Search"
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <div className="h-full w-full">
          <Cards headless className="max-w-[1024px] mx-auto">
            <div className="px-[25px] py-0">
              <div className="flex flex-row items-center gap-4 w-full grow">
                {/* Gas Amount, Token and Gas Price inputs */}
                <Form className="mt-4 grow">
                  <div className="flex flex-row gap-6 items-start">
                    <div className="flex flex-col grow">
                      <label htmlFor="input-number-manager" className="text-[#404040] dark:text-[#A4A5AA]">
                        Manager
                      </label>
                      <Form.Item name="input-number-manager">
                        <Input
                          placeholder="0x1dA..."
                          size="middle"
                          className="h-[40px] p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
                        />
                      </Form.Item>
                    </div>
                    <div className="flex flex-col grow">
                      <label htmlFor="status-select" className="text-[#404040] dark:text-[#A4A5AA]">
                        Status
                      </label>
                      <Form.Item name="status-select" initialValue={["1"]}>
                        <Select className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div>div>div>span]:h-[26px] [&>div>div>div>span]:items-center h-[48px] py-0">
                          <Option value="1">Any</Option>
                          <Option value="2">Test Token 1</Option>
                          <Option value="3">Test Token 2</Option>
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="flex flex-col grow">
                      <label htmlFor="ipp-select" className="text-[#404040] dark:text-[#A4A5AA]">
                        Items Per Page
                      </label>
                      <Form.Item name="ipp-select" initialValue={["1"]}>
                        <Select className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div>div>div>span]:h-[26px] [&>div>div>div>span]:items-center h-[48px] py-0">
                          <Option value="1">50</Option>
                          <Option value="2">Test Token 1</Option>
                          <Option value="3">Test Token 2</Option>
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="flex flex-col grow">
                      <label className="text-[#404040] dark:text-[#A4A5AA]">&nbsp;</label>
                      <Form.Item name="ipp-select" className="flex flex-row gap-4">
                        <Buttons className="bg-primary h-[40px] hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px]">
                          {"Apply"}
                        </Buttons>
                        <Buttons className=" ml-4 bg-transparent hover:bg-primary-hbr border-solid border-1 border-primary text-primary hover:text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[40px]">
                          {"Clear"}
                        </Buttons>
                      </Form.Item>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </Cards>

          {cardData.map((item, index) => (
            <OrderCard {...item} />
          ))}
        </div>
      </div>
    </>
  )
}

export default OrderSearch
