import { PageHeaders } from '@/components/page-headers'
import { Form, Input, List, Select, Tabs, TabsProps } from 'antd'
import { UilQuestionCircle } from '@iconscout/react-unicons'
const { Option } = Select

import { Cards } from '@/components/cards/frame/cards-frame'
import { Buttons } from '@/components/buttons'

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Simple',
        children: null,
    },
    {
        key: '2',
        label: 'Advanced',
        children: null,
    },
]

const CreateOrder = () => {
    const PageRoutes = [
        {
            path: 'admin',
            breadcrumbName: 'Dashboard',
        },
        {
            path: 'create',
            breadcrumbName: 'Create Order',
        },
    ]

    const onChange = (key: string) => {}

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
                            <div className="flex flex-col w-full">
                                {/* Gas Amount, Token and Gas Price inputs */}
                                <Tabs
                                    defaultActiveKey="1"
                                    items={items}
                                    onChange={onChange}
                                />
                                <Form className="mt-4">
                                    <div className="flex flex-row gap-6 items-center">
                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="input-number-gas"
                                                className="text-[#404040] dark:text-[#A4A5AA]"
                                            >
                                                Gas Amount
                                            </label>
                                            <Form.Item name="input-number-gas">
                                                <Input
                                                    placeholder="123"
                                                    size="middle"
                                                    defaultValue={'123'}
                                                    className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="flex flex-col grow">
                                            <label
                                                htmlFor="token-select"
                                                className="text-[#404040] dark:text-[#A4A5AA]"
                                            >
                                                Token
                                            </label>
                                            <Form.Item
                                                name="token-select"
                                                initialValue={['1']}
                                            >
                                                <Select
                                                    mode="multiple"
                                                    className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div>div>div>span]:h-[26px] [&>div>div>div>span]:items-center h-[48px] py-0"
                                                >
                                                    <Option value="1">
                                                        Mock USD
                                                    </Option>
                                                    <Option value="2">
                                                        Test Token 1
                                                    </Option>
                                                    <Option value="3">
                                                        Test Token 2
                                                    </Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                        <div className="flex flex-col grow">
                                            <label
                                                htmlFor="input-number-gasCost"
                                                className="text-[#404040] dark:text-[#A4A5AA]"
                                            >
                                                Gas Cost
                                            </label>
                                            <Form.Item name="input-number-gasCost">
                                                <Input
                                                    placeholder="123"
                                                    size="middle"
                                                    defaultValue={'10'}
                                                    className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </Form>
                                <div className="flex flex-row gap-4 justify-between items-end">
                                    <List
                                        className="&>.ant-list-header]:border-regular dark:[&>.ant-list-header]:border-white/10  relative"
                                        header={
                                            <div className="flex flex-row justify-between items-center">
                                                <div className="dark:text-white/[.87]">
                                                    Receipt
                                                </div>
                                                <span className="absolute [&>*]:fill-secondary right-1 top-1">
                                                    <UilQuestionCircle />
                                                </span>
                                            </div>
                                        }
                                        dataSource={[
                                            `${123 + 123 * 10} MockUSD`,
                                        ]}
                                        bordered={true}
                                        renderItem={(item) => (
                                            <List.Item.Meta
                                                className="dark:[&>div>div]:text-white/60"
                                                description={item}
                                            />
                                        )}
                                    />

                                    <Buttons className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                                        {'Create Gas Order'}
                                    </Buttons>
                                </div>
                            </div>
                        </div>
                    </Cards>
                </div>
            </div>
        </>
    )
}

export default CreateOrder
