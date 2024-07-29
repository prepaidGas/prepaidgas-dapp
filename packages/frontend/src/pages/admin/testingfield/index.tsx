import { PageHeaders } from "@/components/page-headers"
import { Card } from "antd"

const TestingField = () => {
  const PageRoutes = [
    {
      path: "admin/order/create",
      breadcrumbName: "Dashboard",
    },
    {
      path: "",
      breadcrumbName: "Testing Field",
    },
  ]

  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Testing Field"
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />

      <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <div className="h-full w-full">
          <Card title={"React Hook Form Variant"} className="max-w-[1024px] mx-auto">
            <div className="p-[25px]"></div>
          </Card>
        </div>
      </div>
    </>
  )
}

export default TestingField
