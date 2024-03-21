import { useState } from 'react'
import {
    UserOutlined,
    SolutionOutlined,
    CreditCardOutlined,
    SmileOutlined,
} from '@ant-design/icons'
import { Row, Col, Divider, Steps } from 'antd'
import PopOver from '@/components/popup'
import { Step, StepsWidget } from '@/components/steps'
import { PageHeaders } from '@/components/page-headers'

const customDot = (dot: any, { status, index }: any) => (
    <PopOver
        placement="bottomLeft"
        content={
            <span className="span">
                step {index} status: {status}
            </span>
        }
    >
        {dot}
    </PopOver>
)

function Steeps() {
    const PageRoutes = [
        {
            path: '/admin',
            breadcrumbName: 'Dashboard',
        },
        {
            path: '',
            breadcrumbName: 'Steps',
        },
    ]
    const [state, setState]: any = useState({
        current: 0,
        next: 0,
        prev: 0,
    })

    const { current } = state

    const onChange = (currentValue: any) => {
        setState({ current: currentValue })
    }

    const next = (currentValue: any) => {
        setState({ ...state, next: currentValue })
    }

    const prev = (currentValue: any) => {
        setState({ ...state, prev: currentValue })
    }

    return (
        <>
            <PageHeaders
                className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
                title="Steps"
                routes={PageRoutes}
            />
            <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
                <Row gutter={25}>
                    <Col md={24} sm={24} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Basic step
                                </h1>
                            </div>
                            <div className="p-[25px] [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:flex [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:items-center [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:w-full [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:h-full [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:justify-center text-theme-gray dark:text-white/60">
                                <Steps
                                    current={1}
                                    items={[
                                        {
                                            title: 'Finished',
                                        },
                                        {
                                            title: 'In Progress',
                                        },
                                        {
                                            title: 'Waiting',
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={24} sm={24} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    With Icon
                                </h1>
                            </div>
                            <div className="p-[25px] [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:flex [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:items-center [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:w-full [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:h-full [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:justify-center text-theme-gray dark:text-white/60 [&>div>div>div]:flex [&>div>div>div]:items-center">
                                <Steps
                                    items={[
                                        {
                                            title: 'Login',
                                            status: 'finish',
                                            icon: <UserOutlined />,
                                        },
                                        {
                                            title: 'Verification',
                                            status: 'finish',
                                            icon: <SolutionOutlined />,
                                        },
                                        {
                                            title: 'Pay',
                                            status: 'process',
                                            icon: <CreditCardOutlined />,
                                        },
                                        {
                                            title: 'Done',
                                            status: 'wait',
                                            icon: <SmileOutlined />,
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={24} sm={24} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Switch Step
                                </h1>
                            </div>
                            <div className="p-[25px]">
                                <StepsWidget
                                    isswitch
                                    current={0}
                                    // status={status}
                                    steps={[
                                        {
                                            title: 'First',
                                            content: 'First-content',
                                        },
                                        {
                                            title: 'Second',
                                            content: 'Second-content',
                                        },

                                        {
                                            title: 'Last',
                                            content: 'Last-content',
                                        },
                                    ]}
                                    onNext={next}
                                    onPrev={prev}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={24} sm={24} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Vertical mini version{' '}
                                </h1>
                            </div>
                            <div className="p-[25px] [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:flex [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:items-center [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:w-full [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:h-full [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:justify-center text-theme-gray dark:text-white/60">
                                <Steps
                                    direction="vertical"
                                    size="small"
                                    current={1}
                                    items={[
                                        {
                                            title: 'Finished',
                                            description:
                                                'This is a description.',
                                        },
                                        {
                                            title: 'In Progress',
                                            description:
                                                'This is a description.',
                                        },
                                        {
                                            title: 'Waiting',
                                            description:
                                                'This is a description.',
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={24} sm={24} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Error status
                                </h1>
                            </div>
                            <div className="p-[25px] [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:flex [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:items-center [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:w-full [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:h-full [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:justify-center text-theme-gray dark:text-white/60">
                                <Steps
                                    status="error"
                                    current={1}
                                    items={[
                                        {
                                            title: 'Finished',
                                            description:
                                                'This is a description.',
                                        },
                                        {
                                            title: 'In Progress',
                                            description:
                                                'This is a description.',
                                        },
                                        {
                                            title: 'Waiting',
                                            description:
                                                'This is a description.',
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={24} sm={24} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Custom Dot Style
                                </h1>
                            </div>
                            <div className="p-[25px] overflow-hidden">
                                <Steps
                                    progressDot={customDot}
                                    current={1}
                                    items={[
                                        {
                                            title: 'Finished',
                                            description:
                                                'You can hover on the dot.',
                                        },
                                        {
                                            title: 'In Progress',
                                            description:
                                                'You can hover on the dot.',
                                        },
                                        {
                                            title: 'Waiting',
                                            description:
                                                'You can hover on the dot.',
                                        },
                                        {
                                            title: 'Waiting',
                                            description:
                                                'You can hover on the dot.',
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={24} sm={24} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Clickable
                                </h1>
                            </div>
                            <div className="p-[25px]">
                                <Steps
                                    current={current}
                                    onChange={onChange}
                                    items={[
                                        {
                                            title: 'Step 1',
                                            description: 'First-content',
                                        },
                                        {
                                            title: 'Step 2',
                                            description: 'Second-content',
                                        },
                                        {
                                            title: 'Step 3',
                                            description: 'Last-content',
                                        },
                                    ]}
                                />

                                <Divider />

                                <Steps
                                    current={current}
                                    onChange={onChange}
                                    direction="vertical"
                                    items={[
                                        {
                                            title: 'Step 1',
                                            description: 'First-content',
                                        },
                                        {
                                            title: 'Step 2',
                                            description: 'Second-content',
                                        },
                                        {
                                            title: 'Step 3',
                                            description: 'Last-content',
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={24} sm={24} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Navigation status
                                </h1>
                            </div>
                            <div className="p-[25px] [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:flex [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:items-center [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:w-full [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:h-full [&>div>div>div>.ant-steps-item-icon>.ant-steps-icon]:justify-center text-theme-gray dark:text-white/60">
                                <Steps
                                    type="navigation"
                                    size="small"
                                    current={current}
                                    onChange={onChange}
                                    className="site-navigation-steps"
                                    items={[
                                        {
                                            title: 'Step 1',
                                            subTitle: '00:00:05',
                                            status: 'finish',
                                            description:
                                                'This is a description.',
                                        },
                                        {
                                            title: 'Step 2',
                                            subTitle: '00:01:02',
                                            status: 'process',
                                            description:
                                                'This is a description.',
                                        },
                                        {
                                            title: 'Step 3',
                                            subTitle:
                                                'waiting for longlong time',
                                            status: 'wait',
                                            description:
                                                'This is a description.',
                                        },
                                    ]}
                                />
                                <Steps
                                    type="navigation"
                                    current={current}
                                    onChange={onChange}
                                    className="site-navigation-steps"
                                    items={[
                                        {
                                            status: 'finish',
                                            title: 'Step 1',
                                        },
                                        {
                                            status: 'process',
                                            title: 'Step 2',
                                        },
                                        {
                                            status: 'wait',
                                            title: 'Step 3',
                                        },
                                        {
                                            status: 'wait',
                                            title: 'Step 4',
                                        },
                                    ]}
                                />
                                <Steps
                                    type="navigation"
                                    size="small"
                                    current={current}
                                    onChange={onChange}
                                    className="site-navigation-steps"
                                    items={[
                                        {
                                            status: 'finish',
                                            title: 'finish 1',
                                        },
                                        {
                                            status: 'finish',
                                            title: 'finish 2',
                                        },
                                        {
                                            status: 'process',
                                            title: 'current process',
                                        },
                                        {
                                            status: 'wait',
                                            title: 'wait',
                                            disabled: true,
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </main>
        </>
    )
}

export default Steeps
