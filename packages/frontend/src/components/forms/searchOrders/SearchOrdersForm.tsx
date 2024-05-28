import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Buttons } from "@/components/buttons"
import { Form, FormProps, Input, List, Select, Tabs, TabsProps } from "antd"
const { Option } = Select

import { ETH_ADDRESS_OR_EMPTY_STRING_REGEX, ICON_BY_STATUS } from "@/constants"

export type FilterOptions = {
  manager: string
  status: number
  numberOfEntries: number
}

export default function SearchOrdersForm({
  initialValues,
  handleSubmit,
}: {
  initialValues: FilterOptions
  handleSubmit: (x: FilterOptions) => void
}) {
  const onFinish: FormProps<FilterOptions>["onFinish"] = (values) => {
    console.log("Success:", values)
    handleSubmit({ ...values })
  }

  const onFinishFailed: FormProps<FilterOptions>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  const [form] = Form.useForm()

  return (
    <Form
      variant="outlined"
      initialValues={{ ...initialValues }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      className="mt-4 grow"
      form={form}
    >
      <div className="flex flex-col old-lg:flex-row old-lg:items-start old-lg:gap-6">
        <div className="flex flex-col grow w-full">
          <Form.Item
            name="manager"
            label="Manager"
            colon={false}
            rules={[
              // {
              //   validator: (_, value) =>
              //     !value.includes(" ") ? Promise.resolve() : Promise.reject(new Error("No spaces allowed")),
              // },
              {
                validator: (_, value) => {
                  if (ETH_ADDRESS_OR_EMPTY_STRING_REGEX.test(value)) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject(new Error("Please enter a valid address or leave the field empty"))
                  }
                },
              },
            ]}
          >
            <Input
              spellCheck={false}
              placeholder="0x1dA..."
              className="h-[40px] !border-normal dark:border-whiteDark hover:!border-primary focus:!border-primary dark:placeholder-white/60"
            />
          </Form.Item>
        </div>
        <div className="flex flex-col grow w-full">
          <Form.Item name="status" label="Status" colon={false}>
            <Select className="h-[40px]">
              <Option value={0}>Any</Option>
              <Option value={1}>Pending</Option>
              <Option value={2}>Accepted</Option>
              <Option value={3}>Active</Option>
              <Option value={4}>Inactive</Option>
              <Option value={5}>Untaken</Option>
              <Option value={6}>Closed</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="flex flex-col grow w-full">
          <Form.Item name="numberOfEntries" label="Items Per Page">
            <Select className="h-[40px]">
              <Option value={10}>10</Option>
              <Option value={20}>20</Option>
              <Option value={30}>30</Option>
              <Option value={50}>50</Option>
              <Option value={100}>100</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="flex flex-col grow w-full">
          {/* <label className="base-text">&nbsp;</label> */}
          <div className="flex flex-col gap-4 old-lg:flex-row [&_label]:hidden old-lg:[&_label]:flex">
            <Form.Item colon={false} label=" " className="hidden old-lg:inline-flex">
              <Buttons type="primary" htmlType="submit" className="primary_btn">
                {"Apply"}
              </Buttons>
            </Form.Item>

            <Form.Item colon={false} label=" " className="hidden old-lg:inline-flex">
              <Buttons onClick={() => form.resetFields()} className="secondary_btn">
                {"Clear"}
              </Buttons>
            </Form.Item>

            <Form.Item colon={false} label=" " className="old-lg:hidden">
              <Buttons type="primary" htmlType="submit" className="primary_btn" block>
                {"Apply"}
              </Buttons>
            </Form.Item>

            <Form.Item colon={false} label=" " className="old-lg:hidden">
              <Buttons onClick={() => form.resetFields()} className="secondary_btn" block>
                {"Clear"}
              </Buttons>
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  )
}
