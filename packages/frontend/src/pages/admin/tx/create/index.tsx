import { PageHeaders } from '@/components/page-headers'
import {
    DatePicker,
    Form,
    Input,
    List,
    Select,
    Tabs,
    TabsProps,
    TimePicker,
} from 'antd'
import { UilQuestionCircle } from '@iconscout/react-unicons'
const { Option } = Select
const { TextArea } = Input

import { Cards } from '@/components/cards/frame/cards-frame'
import { Buttons } from '@/components/buttons'
import dayjs from 'dayjs'

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

const CreateTx = () => {
    const PageRoutes = [
        {
            path: 'admin',
            breadcrumbName: 'Dashboard',
        },
        {
            path: 'create',
            breadcrumbName: 'Create Transaction',
        },
    ]

    const onChange = (key: string) => {}

    function onChangePreset(date: dayjs.Dayjs) {
        throw new Error('Function not implemented.')
    }

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
                            <div className="flex flex-col w-full">
                                {/* Gas Amount, Token and Gas Price inputs */}
                                <Tabs
                                    defaultActiveKey="1"
                                    items={items}
                                    onChange={onChange}
                                />
                                <Form className="mt-4">
                                    <div className="flex flex-col">
                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="input-number-gas-order"
                                                className="text-[#404040] dark:text-[#A4A5AA]"
                                            >
                                                Gas Order
                                            </label>
                                            <Form.Item name="input-number-gas-order">
                                                <Input
                                                    placeholder="123"
                                                    size="middle"
                                                    defaultValue={'0'}
                                                    className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="input-number-gas-order"
                                                className="text-[#404040] dark:text-[#A4A5AA]"
                                            >
                                                Execution Period End
                                            </label>
                                            <div className="flex flex-row items-center gap-4">
                                                <Form.Item name="input-number-gas-order">
                                                    <DatePicker
                                                        defaultValue={dayjs().add(
                                                            1,
                                                            'd'
                                                        )}
                                                        presets={[
                                                            {
                                                                label: 'Tommorrow',
                                                                value: dayjs().add(
                                                                    1,
                                                                    'd'
                                                                ),
                                                            },
                                                            {
                                                                label: 'Next Week',
                                                                value: dayjs().add(
                                                                    7,
                                                                    'd'
                                                                ),
                                                            },
                                                            {
                                                                label: 'Next Month',
                                                                value: dayjs().add(
                                                                    1,
                                                                    'month'
                                                                ),
                                                            },
                                                        ]}
                                                        onChange={(date) => {
                                                            if (date) {
                                                                onChangePreset(
                                                                    date
                                                                )
                                                            }
                                                        }}
                                                    />
                                                </Form.Item>
                                                <Form.Item name="input-number-gas-order">
                                                    <TimePicker
                                                        className="dark:[&>div>input]:text-white/60 dark:[&>div>.ant-picker-suffix]:text-white/60"
                                                        defaultValue={dayjs(
                                                            '12:08',
                                                            'HH:mm'
                                                        )}
                                                        format={'HH:mm'}
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="input-number-to"
                                                className="text-[#404040] dark:text-[#A4A5AA]"
                                            >
                                                To
                                            </label>
                                            <Form.Item name="input-number-to">
                                                <Input
                                                    placeholder="123"
                                                    size="middle"
                                                    defaultValue={
                                                        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
                                                    }
                                                    className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="input-number-gas"
                                                className="text-[#404040] dark:text-[#A4A5AA]"
                                            >
                                                Gas
                                            </label>
                                            <Form.Item name="input-number-gas">
                                                <Input
                                                    placeholder="123"
                                                    size="middle"
                                                    defaultValue={'1000'}
                                                    className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60"
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="basic-textarea"
                                                className="text-[#404040] dark:text-[#A4A5AA]"
                                            >
                                                ABI
                                            </label>
                                            <Form.Item name="basic-textarea">
                                                <TextArea
                                                    defaultValue={
                                                        '[{"inputs":[{"internalType":"address","name":"executionEndpoint","type":"address"},{"internalType":"string","name":"link","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"received","type":"uint256"},{"internalType":"uint256","name":"expected","type":"uint256"}],"name":"BadIncomeTransfer","type":"error"},{"inputs":[{"internalType":"uint256","name":"requested","type":"uint256"},{"internalType":"uint256","name":"allowed","type":"uint256"}],"name":"BalanceExhausted","type":"error"},{"inputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"DeadlineExpired","type":"error"},{"inputs":[{"internalType":"uint256","name":"limit","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"}],"name":"GasLimitExceedBalance","type":"error"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"NotOperator","type":"error"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"max","type":"uint256"}],"name":"OverhighValue","type":"error"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"min","type":"uint256"}],"name":"OverlowValue","type":"error"},{"inputs":[{"internalType":"bool","name":"revokable","type":"bool"},{"internalType":"enum OrderStatus","name":"status","type":"uint8"}],"name":"RevokeNotAllowed","type":"error"},{"inputs":[{"internalType":"address","name":"received","type":"address"},{"internalType":"address","name":"expected","type":"address"}],"name":"Unauthorized","type":"error"},{"inputs":[{"internalType":"enum OrderStatus","name":"received","type":"uint8"},{"internalType":"enum OrderStatus","name":"expected","type":"uint8"}],"name":"WrongOrderStatus","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":true,"internalType":"address","name":"token"'
                                                    }
                                                    className="border-normal dark:border-whiteDark hover:border-primary focus:border-primary"
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </Form>
                                <div className="flex flex-row gap-4 justify-end items-end">
                                    {/* <List
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
                                    /> */}

                                    <Buttons className="bg-transparent hover:bg-primary-hbr border-solid border-1 border-primary text-primary hover:text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                                        {'Parse Abi'}
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

export default CreateTx
