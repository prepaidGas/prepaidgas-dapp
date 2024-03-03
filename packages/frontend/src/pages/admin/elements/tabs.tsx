import { Row, Col } from 'antd'
import { PageHeaders } from '@/components/page-headers'
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons'

import { Tabs } from 'antd'
import type { TabsProps } from 'antd'

const onChange = (key: string) => {}

const description =
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor tellus eget condimentum rhoncus. Aenean massa. Cum sociis natoque penatibus et magnis neque dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.'

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Tab one',
        children: (
            <div>
                <h6 className="text-[15px] font-medium text-dark dark:text-white/[.87] capitalize">
                    Tab one
                </h6>
                <p className="text-[15px] text-theme-gray dark:text-white/60 font-normal mt-[6px] capitalize">
                    {description}
                </p>
            </div>
        ),
    },
    {
        key: '2',
        label: 'Tab two',
        children: (
            <div>
                <h6 className="text-[15px] font-medium text-dark dark:text-white/[.87] capitalize">
                    Tab two
                </h6>
                <p className="text-[15px] text-theme-gray dark:text-white/60 font-normal mt-[6px] capitalize">
                    {description}
                </p>
            </div>
        ),
    },
    {
        key: '3',
        label: 'Tab three',
        children: (
            <div>
                <h6 className="text-[15px] font-medium text-dark dark:text-white/[.87] capitalize">
                    Tab three
                </h6>
                <p className="text-[15px] text-theme-gray dark:text-white/60 font-normal mt-[6px] capitalize">
                    {description}
                </p>
            </div>
        ),
    },
    {
        key: '4',
        label: 'Tab four',
        children: (
            <div>
                <h6 className="text-[15px] font-medium text-dark dark:text-white/[.87] capitalize">
                    Tab four
                </h6>
                <p className="text-[15px] text-theme-gray dark:text-white/60 font-normal mt-[6px] capitalize">
                    {description}
                </p>
            </div>
        ),
    },
]

function TabWrapper() {
    const PageRoutes = [
        {
            path: '/admin',
            breadcrumbName: 'Dashboard',
        },
        {
            path: '',
            breadcrumbName: 'Tabs',
        },
    ]
    return (
        <>
            <PageHeaders
                className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
                title="Tabs"
                routes={PageRoutes}
            />
            <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
                <Row gutter={25}>
                    <Col md={12} xs={24} className="mb-[30px]">
                        <Tabs
                            defaultActiveKey="1"
                            items={items}
                            onChange={onChange}
                        />
                    </Col>
                    <Col md={12} xs={24} className="mb-[30px]">
                        <Tabs
                            defaultActiveKey="1"
                            items={[
                                {
                                    key: '1',
                                    label: 'Tab one',
                                    children: (
                                        <div>
                                            <h6 className="text-[15px] font-medium text-dark dark:text-white/[.87] capitalize">
                                                Tab one
                                            </h6>
                                            <p className="text-[15px] text-theme-gray dark:text-white/60 font-normal mt-[6px] capitalize">
                                                {description}
                                            </p>
                                        </div>
                                    ),
                                },
                                {
                                    key: '2',
                                    label: 'Tab two',
                                    children: (
                                        <div>
                                            <h6 className="text-[15px] font-medium text-dark dark:text-white/[.87] capitalize">
                                                Tab two
                                            </h6>
                                            <p className="text-[15px] text-theme-gray dark:text-white/60 font-normal mt-[6px] capitalize">
                                                {description}
                                            </p>
                                        </div>
                                    ),
                                    disabled: true,
                                },
                                {
                                    key: '3',
                                    label: 'Tab three',
                                    children: (
                                        <div>
                                            <h6 className="text-[15px] font-medium text-dark dark:text-white/[.87] capitalize">
                                                Tab three
                                            </h6>
                                            <p className="text-[15px] text-theme-gray dark:text-white/60 font-normal mt-[6px] capitalize">
                                                {description}
                                            </p>
                                        </div>
                                    ),
                                },
                            ]}
                        />
                    </Col>
                </Row>
                <Row gutter={15}>
                    <Col md={12} xs={24} className="mb-[30px]">
                        <div className="[&>div>div>div>div>*.ant-tabs-tab>div>span]:flex [&>div>div>div>div>*.ant-tabs-tab>div>span]:gap-[10px] [&>div>div>div>div>*.ant-tabs-tab>div>span]:items-center [&>div>div>div>div>*.ant-tabs-tab>div>span>svg]:w-[20px] [&>div>div>div>div>*.ant-tabs-tab>div>span>svg]:h-[20px]">
                            <Tabs
                                className="tabs-bg-primary"
                                defaultActiveKey="1"
                                items={[AppleOutlined, AndroidOutlined].map(
                                    (Icon, i) => {
                                        const id = String(i + 1)

                                        return {
                                            label: (
                                                <span>
                                                    <Icon />
                                                    Tab {id}
                                                </span>
                                            ),
                                            key: id,
                                            children: (
                                                <div>
                                                    <h6 className="text-[15px] font-medium text-white  capitalize">
                                                        Tab {id}
                                                    </h6>
                                                    <p className="text-[15px] text-white font-normal mt-[6px] capitalize">
                                                        {description}
                                                    </p>
                                                </div>
                                            ),
                                        }
                                    }
                                )}
                            />
                        </div>
                    </Col>
                    <Col md={12} xs={24} className="mb-[30px]">
                        <div className="[&>div>div>div>div>*.ant-tabs-tab>div>span]:flex [&>div>div>div>div>*.ant-tabs-tab>div>span]:gap-[10px] [&>div>div>div>div>*.ant-tabs-tab>div>span]:items-center [&>div>div>div>div>*.ant-tabs-tab>div>span>svg]:w-[20px] [&>div>div>div>div>*.ant-tabs-tab>div>span>svg]:h-[20px]">
                            <Tabs
                                className="tabs-bg-primary"
                                defaultActiveKey="1"
                                items={[AppleOutlined, AndroidOutlined].map(
                                    (Icon, i) => {
                                        const id = String(i + 1)

                                        return {
                                            label: (
                                                <span>
                                                    <Icon />
                                                </span>
                                            ),
                                            key: id,
                                            children: (
                                                <div>
                                                    <h6 className="text-[15px] font-medium text-white capitalize">
                                                        Tab {id}
                                                    </h6>
                                                    <p className="text-[15px] text-white font-normal mt-[6px] capitalize">
                                                        {description}
                                                    </p>
                                                </div>
                                            ),
                                        }
                                    }
                                )}
                            />
                        </div>
                    </Col>
                </Row>
                <Row gutter={15}>
                    <Col md={12} xs={24}>
                        <div className="[&>div>div>div>div>*.ant-tabs-tab>div>span]:flex [&>div>div>div>div>*.ant-tabs-tab>div>span]:gap-[10px] [&>div>div>div>div>*.ant-tabs-tab>div>span]:items-center [&>div>div>div>div>*.ant-tabs-tab>div>span>svg]:w-[20px] [&>div>div>div>div>*.ant-tabs-tab>div>span>svg]:h-[20px]">
                            <Tabs
                                className="tabs-bg-white"
                                defaultActiveKey="1"
                                items={[AppleOutlined, AndroidOutlined].map(
                                    (Icon, i) => {
                                        const id = String(i + 1)

                                        return {
                                            label: (
                                                <span>
                                                    <Icon />
                                                    Tab {id}
                                                </span>
                                            ),
                                            key: id,
                                            children: (
                                                <div>
                                                    <h6 className="text-[15px] font-medium text-dark dark:text-white/[.87] capitalize">
                                                        Tab {id}
                                                    </h6>
                                                    <p className="text-[15px] text-theme-gray dark:text-white/60 font-normal mt-[6px] capitalize">
                                                        {description}
                                                    </p>
                                                </div>
                                            ),
                                        }
                                    }
                                )}
                            />
                        </div>
                    </Col>
                </Row>
            </main>
        </>
    )
}

export default TabWrapper
