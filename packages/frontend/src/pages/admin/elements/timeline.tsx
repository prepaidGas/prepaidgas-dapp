import { Row, Col, Timeline } from 'antd'
import { PageHeaders } from '@/components/page-headers'
import { ClockCircleOutlined, SmileOutlined } from '@ant-design/icons'

import {
    SwRocket,
    SwShieldCheck,
    SwPenTool,
    SwNotification,
} from '@/components/utilities/icons'

function Timelines() {
    const PageRoutes = [
        {
            path: '/admin',
            breadcrumbName: 'Dashboard',
        },
        {
            path: '',
            breadcrumbName: 'Timelines',
        },
    ]
    return (
        <>
            <PageHeaders
                className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
                title="Timelines"
                routes={PageRoutes}
            />
            <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
                <Row gutter={25}>
                    <Col lg={12} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Basics
                                </h1>
                            </div>
                            <div className="p-[25px]">
                                <Timeline
                                    items={[
                                        {
                                            children:
                                                'Create a services site 2015-09-01',
                                        },
                                        {
                                            children:
                                                'Solve initial network problems 2015-09-01',
                                        },
                                        {
                                            children:
                                                'Technical testing 2015-09-01',
                                        },
                                        {
                                            children:
                                                'Network problems being solved 2015-09-01',
                                        },
                                    ]}
                                />
                            </div>
                        </div>

                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Alternate
                                </h1>
                            </div>
                            <div className="p-[25px]">
                                <Timeline
                                    mode="alternate"
                                    items={[
                                        {
                                            children:
                                                'Create a services site 2015-09-01',
                                        },
                                        {
                                            children:
                                                'Solve initial network problems 2015-09-01',
                                            color: 'green',
                                        },
                                        {
                                            dot: (
                                                <ClockCircleOutlined
                                                    style={{ fontSize: '16px' }}
                                                />
                                            ),
                                            children: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
                                        },
                                        {
                                            color: 'red',
                                            children:
                                                'Network problems being solved 2015-09-01',
                                        },
                                        {
                                            children:
                                                'Create a services site 2015-09-01',
                                        },
                                        {
                                            dot: (
                                                <ClockCircleOutlined
                                                    style={{ fontSize: '16px' }}
                                                />
                                            ),
                                            children:
                                                'Technical testing 2015-09-01',
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Custom
                                </h1>
                            </div>
                            <div className="p-[25px]">
                                <Timeline
                                    items={[
                                        {
                                            children:
                                                'Create a services site 2015-09-01',
                                        },
                                        {
                                            children:
                                                'Solve initial network problems 2015-09-01',
                                        },
                                        {
                                            dot: (
                                                <ClockCircleOutlined className="timeline-clock-icon" />
                                            ),
                                            color: 'red',
                                            children:
                                                'Technical testing 2015-09-01',
                                        },
                                        {
                                            children:
                                                'Network problems being solved 2015-09-01',
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Custom Timeline
                                </h1>
                            </div>
                            <div className="px-[40px] py-[10px] pt-[40px]">
                                <Timeline
                                    items={[
                                        {
                                            dot: (
                                                <div className="[&>svg]:text-primary [&>svg>path]:fill-current [&>svg]:w-[18px] [&>svg]:h-[18px] bg-primary/10 rounded-full flex items-center justify-center w-[40px] h-[40px]">
                                                    <SwRocket />
                                                </div>
                                            ),
                                            children: (
                                                <div className="ms-[15px]">
                                                    <h3 className="text-dark dark:text-white/[.87] mb-[30px] text-sm font-medium">
                                                        02:30 PM
                                                    </h3>
                                                    <p className="max-w-[360px] text-body dark:text-white/60">
                                                        Lorem Ipsum is simply
                                                        dummy text of the
                                                        printing and typesetting
                                                        industry.
                                                    </p>
                                                    <span className="tags">
                                                        HTML,CSS,VueJS
                                                    </span>
                                                </div>
                                            ),
                                        },
                                        {
                                            dot: (
                                                <div className="[&>svg]:text-secondary [&>svg>g>path]:fill-current [&>svg]:w-[18px] [&>svg]:h-[18px] bg-secondary/10 rounded-full flex items-center justify-center w-[40px] h-[40px]">
                                                    <SwShieldCheck />
                                                </div>
                                            ),
                                            children: (
                                                <div className="ms-[15px]">
                                                    <h3 className="text-dark dark:text-white/[.87] mb-[30px] text-sm font-medium">
                                                       12:30 PM
                                                    </h3>
                                                    <p className="max-w-[360px] text-body dark:text-white/60">
                                                        Lorem Ipsum is simply
                                                        dummy text of the
                                                        printing and typesetting
                                                        industry.
                                                    </p>
                                                    <span className="tags">
                                                        HTML,CSS,VueJS
                                                    </span>
                                                </div>
                                            ),
                                        },
                                        {
                                            dot: (
                                                <div className="[&>svg]:text-info [&>svg>g>g>path]:fill-current [&>svg]:w-[18px] [&>svg]:h-[18px] bg-info/10 rounded-full flex items-center justify-center w-[40px] h-[40px]">
                                                    <SwPenTool />
                                                </div>
                                            ),
                                            children: (
                                                <div className="ms-[15px]">
                                                    <h3 className="text-dark dark:text-white/[.87] mb-[30px] text-sm font-medium">
                                                    01:00 PM
                                                    </h3>
                                                    <p className="max-w-[360px] text-body dark:text-white/60">
                                                        Lorem Ipsum is simply
                                                        dummy text of the
                                                        printing and typesetting
                                                        industry.
                                                    </p>
                                                    <span className="tags">
                                                        HTML,CSS,VueJS
                                                    </span>
                                                </div>
                                            ),
                                        },
                                        {
                                            dot: (
                                                <div className="[&>svg]:text-danger [&>svg>g>path]:fill-current [&>svg]:w-[18px] [&>svg]:h-[18px] bg-danger/10 rounded-full flex items-center justify-center w-[40px] h-[40px]">
                                                    <SwShieldCheck />
                                                </div>
                                            ),
                                            children: (
                                                <div className="ms-[15px]">
                                                    <h3 className="text-dark dark:text-white/[.87] mb-[30px] text-sm font-medium">
                                                    12:30 PM
                                                    </h3>
                                                    <p className="max-w-[360px] text-body dark:text-white/60">
                                                        Lorem Ipsum is simply
                                                        dummy text of the
                                                        printing and typesetting
                                                        industry.
                                                    </p>
                                                    <span className="tags">
                                                        HTML,CSS,VueJS
                                                    </span>
                                                </div>
                                            ),
                                        },
                                        {
                                            dot: (
                                                <div className="[&>svg]:text-warning [&>svg>g>path]:fill-current [&>svg]:w-[18px] [&>svg]:h-[18px] bg-warning/10 rounded-full flex items-center justify-center w-[40px] h-[40px]">
                                                    <SwNotification />
                                                </div>
                                            ),
                                            children: (
                                                <div className="ms-[15px]">
                                                    <h3 className="text-dark dark:text-white/[.87] mb-[30px] text-sm font-medium">
                                                    01:30 PM
                                                    </h3>
                                                    <p className="max-w-[360px] text-body dark:text-white/60">
                                                        Lorem Ipsum is simply
                                                        dummy text of the
                                                        printing and typesetting
                                                        industry.
                                                    </p>
                                                    <span className="tags">
                                                        HTML,CSS,VueJS
                                                    </span>
                                                </div>
                                            ),
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col lg={12} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Color
                                </h1>
                            </div>
                            <div className="p-[25px]">
                                <Timeline
                                    items={[
                                        {
                                            color: 'green',
                                            children:
                                                'Create a services site 2015-09-01',
                                        },
                                        {
                                            color: 'green',
                                            children:
                                                'Create a services site 2015-09-01',
                                        },
                                        {
                                            color: 'red',
                                            children: (
                                                <>
                                                    <p>
                                                        Solve initial network
                                                        problems 1
                                                    </p>
                                                    <p>
                                                        Solve initial network
                                                        problems 2
                                                    </p>
                                                    <p>
                                                        Solve initial network
                                                        problems 3 2015-09-01
                                                    </p>
                                                </>
                                            ),
                                        },
                                        {
                                            children: (
                                                <>
                                                    <p>Technical testing 1</p>
                                                    <p>Technical testing 2</p>
                                                    <p>
                                                        Technical testing 3
                                                        2015-09-01
                                                    </p>
                                                </>
                                            ),
                                        },
                                        {
                                            color: 'gray',
                                            children: (
                                                <>
                                                    <p>Technical testing 1</p>
                                                    <p>Technical testing 2</p>
                                                    <p>
                                                        Technical testing 3
                                                        2015-09-01
                                                    </p>
                                                </>
                                            ),
                                        },
                                        {
                                            color: 'gray',
                                            children: (
                                                <>
                                                    <p>Technical testing 1</p>
                                                    <p>Technical testing 2</p>
                                                    <p>
                                                        Technical testing 3
                                                        2015-09-01
                                                    </p>
                                                </>
                                            ),
                                        },
                                        {
                                            color: '#00CCFF',
                                            dot: <SmileOutlined />,
                                            children: (
                                                <p>Custom color testing</p>
                                            ),
                                        },
                                    ]}
                                />
                            </div>
                        </div>

                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Timeline Two
                                </h1>
                            </div>
                            <div className="p-[25px]">
                                <Timeline
                                    mode="alternate"
                                    items={[
                                        {
                                            dot: (
                                                <div className="w-[20px] h-[20px] rounded-full flex items-center justify-center bg-[#f8f9fb]">
                                                    <span className="bg-[#adb3d0] w-[10px] h-[10px] rounded-full" />
                                                </div>
                                            ),
                                            children: (
                                                <div className="relative after:absolute after:content-[''] after:w-0 after:h-0 after:-translate-y-2/4 after:border-r-[16px] after:border-r-[rgb(227,230,239)] after:border-y-8 after:border-y-transparent after:border-solid after:-left-4 after:top-[40%]">
                                                    <h4 className="mb-2 text-sm text-light-extra">
                                                        06:00 AM
                                                    </h4>
                                                    <div className="bg-normalBG dark:bg-whiteDark px-5 py-[18px] rounded-[10px]">
                                                        <p className="text-[#666d92] dark:text-white/60 text-start text-[15px] leading-[26px]">
                                                            Lorem Ipsum is
                                                            simply dummy text of
                                                            theprintng and
                                                            typesetting
                                                            industry. Lorem
                                                            Ipsum has been the
                                                            industry`s standard
                                                            dummy text ever
                                                            since the,
                                                        </p>
                                                    </div>
                                                </div>
                                            ),
                                        },
                                        {
                                            dot: (
                                                <div className="w-[20px] h-[20px] rounded-full flex items-center justify-center bg-[#f8f9fb]">
                                                    <span className="bg-primary w-[10px] h-[10px] rounded-full" />
                                                </div>
                                            ),
                                            children: (
                                                <div className="me-[7px] relative after:absolute after:content-[''] after:w-0 after:h-0 after:-translate-y-2/4 after:border-l-[16px] after:border-l-[rgb(227,230,239)] after:border-y-8 after:border-y-transparent after:border-solid after:-right-4 after:top-[40%]">
                                                    <h4 className="mb-2 text-sm text-light-extra">
                                                        10:00 AM
                                                    </h4>
                                                    <div className="bg-normalBG dark:bg-whiteDark px-5 py-[18px] rounded-[10px]">
                                                        <p className="text-[#666d92] dark:text-white/60 text-start text-[15px] leading-[26px]">
                                                            Lorem Ipsum is
                                                            simply dummy text of
                                                            theprintng and
                                                            typesetting
                                                            industry. Lorem
                                                            Ipsum has been the
                                                            industry`s standard
                                                            dummy text ever
                                                            since the,
                                                        </p>
                                                    </div>
                                                </div>
                                            ),
                                        },
                                        {
                                            dot: (
                                                <div className="w-[20px] h-[20px] rounded-full flex items-center justify-center bg-[#f8f9fb]">
                                                    <span className="bg-info w-[10px] h-[10px] rounded-full" />
                                                </div>
                                            ),
                                            children: (
                                                <div className="relative after:absolute after:content-[''] after:w-0 after:h-0 after:-translate-y-2/4 after:border-r-[16px] after:border-r-[rgb(227,230,239)] after:border-y-8 after:border-y-transparent after:border-solid after:-left-4 after:top-[40%]">
                                                    <h4 className="mb-2 text-sm text-light-extra">
                                                        07:00 AM
                                                    </h4>
                                                    <div className="bg-normalBG dark:bg-whiteDark px-5 py-[18px] rounded-[10px]">
                                                        <p className="text-[#666d92] dark:text-white/60 text-start text-[15px] leading-[26px]">
                                                            Lorem Ipsum is
                                                            simply dummy text of
                                                            theprintng and
                                                            typesetting
                                                            industry. Lorem
                                                            Ipsum has been the
                                                            industry`s standard
                                                            dummy text ever
                                                            since the,
                                                        </p>
                                                    </div>
                                                </div>
                                            ),
                                        },
                                        {
                                            dot: (
                                                <div className="w-[20px] h-[20px] rounded-full flex items-center justify-center bg-[#f8f9fb]">
                                                    <span className="bg-danger w-[10px] h-[10px] rounded-full" />
                                                </div>
                                            ),
                                            children: (
                                                <div className="me-[7px] relative after:absolute after:content-[''] after:w-0 after:h-0 after:-translate-y-2/4 after:border-l-[16px] after:border-l-[rgb(227,230,239)] after:border-y-8 after:border-y-transparent after:border-solid after:-right-4 after:top-[40%]">
                                                    <h4 className="mb-2 text-sm text-light-extra">
                                                        02:00 AM
                                                    </h4>
                                                    <div className="bg-normalBG dark:bg-whiteDark px-5 py-[18px] rounded-[10px]">
                                                        <p className="text-[#666d92] dark:text-white/60 text-start text-[15px] leading-[26px]">
                                                            Lorem Ipsum is
                                                            simply dummy text of
                                                            theprintng and
                                                            typesetting
                                                            industry. Lorem
                                                            Ipsum has been the
                                                            industry`s standard
                                                            dummy text ever
                                                            since the,
                                                        </p>
                                                    </div>
                                                </div>
                                            ),
                                        },
                                        {
                                            dot: (
                                                <div className="w-[20px] h-[20px] rounded-full flex items-center justify-center bg-[#f8f9fb]">
                                                    <span className="bg-warning w-[10px] h-[10px] rounded-full" />
                                                </div>
                                            ),
                                            children: (
                                                <div className="relative after:absolute after:content-[''] after:w-0 after:h-0 after:-translate-y-2/4 after:border-r-[16px] after:border-r-[rgb(227,230,239)] after:border-y-8 after:border-y-transparent after:border-solid after:-left-4 after:top-[40%]">
                                                    <h4 className="mb-2 text-sm text-light-extra">
                                                        11:00 PM
                                                    </h4>
                                                    <div className="bg-normalBG dark:bg-whiteDark px-5 py-[18px] rounded-[10px]">
                                                        <p className="text-[#666d92] dark:text-white/60 text-start text-[15px] leading-[26px]">
                                                            Lorem Ipsum is
                                                            simply dummy text of
                                                            theprintng and
                                                            typesetting
                                                            industry. Lorem
                                                            Ipsum has been the
                                                            industry`s standard
                                                            dummy text ever
                                                            since the,
                                                        </p>
                                                    </div>
                                                </div>
                                            ),
                                        },
                                        {
                                            dot: (
                                                <div className="w-[20px] h-[20px] rounded-full flex items-center justify-center bg-[#f8f9fb]">
                                                    <span className="bg-[#adb3d0] w-[10px] h-[10px] rounded-full" />
                                                </div>
                                            ),
                                            children: '',
                                        },
                                    ]}
                                />
                            </div>
                        </div>

                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Right Alternate
                                </h1>
                            </div>
                            <div className="p-[25px]">
                                <Timeline
                                    mode="right"
                                    items={[
                                        {
                                            children:
                                                'Create a services site 2015-09-01',
                                        },
                                        {
                                            children:
                                                'Solve initial network problems 2015-09-01',
                                        },
                                        {
                                            dot: (
                                                <ClockCircleOutlined
                                                    style={{ fontSize: '16px' }}
                                                />
                                            ),
                                            color: 'red',
                                            children:
                                                'Technical testing 2015-09-01',
                                        },
                                        {
                                            children:
                                                'Network problems being solved 2015-09-01',
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

export default Timelines
