import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ZodIssue, z } from "zod"

import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Card, TextInput, SelectItem, Button } from "@tremor/react"
import { Cards } from "@/components/cards/frame/cards-frame"
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
              {
                validator: (_, value) =>
                  !value.includes(" ") ? Promise.resolve() : Promise.reject(new Error("No spaces allowed")),
              },
            ]}
          >
            <Input
              spellCheck={false}
              placeholder="0x1dA..."
              size="middle"
              className="h-[40px] p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
            />
          </Form.Item>
        </div>
        <div className="flex flex-col grow w-full">
          <Form.Item name="status" label="Status" colon={false}>
            <Select className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div>div>div>span]:h-[26px] [&>div>div>div>span]:items-center h-[48px] py-0">
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
            <Select className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div>div>div>span]:h-[26px] [&>div>div>div>span]:items-center h-[48px] py-0">
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
