/* eslint-disable react/jsx-no-bind */
import React from 'react'
import {
    EllipsisOutlined,
    UserOutlined,
    SmileOutlined,
    DownOutlined,
} from '@ant-design/icons'
import { Row, Col, message, Tooltip, Button, Dropdown, Space, theme, MenuProps } from 'antd'
import { PageHeaders } from '@/components/page-headers'
import { Buttons } from '@/components/buttons'

function Dropdowns() {
    const PageRoutes = [
        {
            path: '/admin',
            breadcrumbName: 'Dashboard',
        },
        {
            path: '',
            breadcrumbName: 'Dropdown',
        },
    ]
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        message.info('Click on left button.')
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm ">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm gap-[7px]">
                    <SmileOutlined />
                    2nd menu item (disabled)
                </a>
            ),
            disabled: true,
        },
        {
            key: '3',
            label: (
                <a className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm ">
                    3rd menu item (disabled)
                </a>
            ),
            disabled: true,
        },
        {
            key: '4',
            danger: true,
            label: (
                <a className="flex items-center text-theme-gray dark:text-white/60 hover:bg-danger-transparent hover:text-danger dark:hover:bg-white/10 px-3 py-1.5 text-sm ">
                    Danger item
                </a>
            ),
        },
    ]
    const onClick: MenuProps['onClick'] = ({ key }) => {
        message.info(`Click on item ${key}`)
    }
    const {
        token: { colorBgLayout, colorTextTertiary },
    } = theme.useToken()
    return (
        <>
            <PageHeaders
                className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
                title="Dropdown"
                routes={PageRoutes}
            />
            <>
                <div className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
                    <Row gutter={25}>
                        <Col md={12} xs={24}>
                            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                        Basic Dropdown
                                    </h1>
                                </div>
                                <div className="p-[25px]">
                                    <Dropdown menu={{ items }}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                Hover me
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                        Event Menu
                                    </h1>
                                </div>
                                <div className="p-[25px]">
                                    <Dropdown menu={{ items, onClick }}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                Hover me, Click menu item
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                        Context Menu
                                    </h1>
                                </div>
                                <div className="p-[25px]">
                                    <Dropdown
                                        menu={{ items }}
                                        trigger={['contextMenu']}
                                    >
                                        <div
                                            style={{
                                                color: colorTextTertiary,
                                                background: colorBgLayout,
                                                height: 200,
                                                textAlign: 'center',
                                                lineHeight: '200px',
                                            }}
                                        >
                                            Right Click on here
                                        </div>
                                    </Dropdown>
                                </div>
                            </div>
                        </Col>
                        <Col md={12} xs={24}>
                            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                        Placement
                                    </h1>
                                </div>
                                <div className="p-[25px] gap-x-[10px] gap-y-[10px] flex flex-wrap">
                                    <Space direction="vertical">
                                        <Space wrap>
                                            <Dropdown
                                                className="text-[14px] text-theme-gray hover:text-primary dark:hover:text-primary dark:bg-transparent dark:text-white/60 dark:hover:text-white/60 btn-outlined h-[36px] border-deep dark:border-white/10  px-[19px] rounded-[5px]"
                                                menu={{ items }}
                                                placement="bottomLeft"
                                            >
                                                <Button>bottomLeft</Button>
                                            </Dropdown>
                                            <Dropdown
                                                className="text-[14px] text-theme-gray hover:text-primary dark:hover:text-primary dark:bg-transparent dark:text-white/60 dark:hover:text-white/60 btn-outlined h-[36px] border-deep dark:border-white/10  px-[19px] rounded-[5px]"
                                                menu={{ items }}
                                                placement="bottom"
                                            >
                                                <Button>bottom</Button>
                                            </Dropdown>
                                            <Dropdown
                                                className="text-[14px] text-theme-gray hover:text-primary dark:hover:text-primary dark:bg-transparent dark:text-white/60 dark:hover:text-white/60 btn-outlined h-[36px] border-deep dark:border-white/10  px-[19px] rounded-[5px]"
                                                menu={{ items }}
                                                placement="bottomRight"
                                            >
                                                <Button>bottomRight</Button>
                                            </Dropdown>
                                        </Space>
                                        <Space wrap>
                                            <Dropdown
                                                className="text-[14px] text-theme-gray hover:text-primary dark:hover:text-primary dark:bg-transparent dark:text-white/60 dark:hover:text-white/60 btn-outlined h-[36px] border-deep dark:border-white/10  px-[19px] rounded-[5px]"
                                                menu={{ items }}
                                                placement="topLeft"
                                            >
                                                <Button>topLeft</Button>
                                            </Dropdown>
                                            <Dropdown
                                                className="text-[14px] text-theme-gray hover:text-primary dark:hover:text-primary dark:bg-transparent dark:text-white/60 dark:hover:text-white/60 btn-outlined h-[36px] border-deep dark:border-white/10  px-[19px] rounded-[5px]"
                                                menu={{ items }}
                                                placement="top"
                                            >
                                                <Button>top</Button>
                                            </Dropdown>
                                            <Dropdown
                                                className="text-[14px] text-theme-gray hover:text-primary dark:hover:text-primary dark:bg-transparent dark:text-white/60 dark:hover:text-white/60 btn-outlined h-[36px] border-deep dark:border-white/10  px-[19px] rounded-[5px]"
                                                menu={{ items }}
                                                placement="topRight"
                                            >
                                                <Button>topRight</Button>
                                            </Dropdown>
                                        </Space>
                                    </Space>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87]  font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                        Buttons with dropdown menu
                                    </h1>
                                </div>
                                <div className="flex flex-wrap p-[25px] gap-x-[10px] gap-y-[10px]">
                                    <Buttons
                                        onClick={handleButtonClick}
                                        className="text-[14px] text-theme-gray hover:text-primary dark:hover:text-primary dark:text-white/60 btn-outlined inline-flex items-center border-deep dark:border-white/10 h-[36px] group [&>span>svg]:text-current dark:bg-transparent transition duration-300 [&>.ant-dropdown-trigger]:h-full [&>.ant-dropdown-trigger>.anticon]:h-full [&>.ant-dropdown-trigger>.anticon]:inline-flex [&>.ant-dropdown-trigger>.anticon]:items-center [&>.ant-dropdown-trigger>.anticon]:ps-2 [&>.ant-dropdown-trigger>.anticon]:ms-2 [&>.ant-dropdown-trigger>.anticon]:border-l [&>.ant-dropdown-trigger>.anticon]:border-regular dark:[&>.ant-dropdown-trigger>.anticon]:border-white/10"
                                        size="default"
                                        outlined
                                        type="light"
                                    >
                                        Bottom Left Click
                                        <Dropdown
                                            placement="bottomLeft"
                                            trigger={['hover']}
                                            menu={{ items }}
                                        >
                                            <EllipsisOutlined className="flex group-hover:text-primary" />
                                        </Dropdown>
                                    </Buttons>

                                    <Buttons
                                        className="text-[14px] text-theme-gray hover:text-primary dark:hover:text-primary dark:text-white/60 btn-outlined inline-flex items-center border-deep dark:border-white/10 h-[36px] group [&>span>svg]:text-current dark:bg-transparent transition duration-300 [&>.ant-dropdown-trigger]:h-full [&>.ant-dropdown-trigger>.anticon]:h-full [&>.ant-dropdown-trigger>.anticon]:inline-flex [&>.ant-dropdown-trigger>.anticon]:items-center [&>.ant-dropdown-trigger>.anticon]:ps-2 [&>.ant-dropdown-trigger>.anticon]:ms-2 [&>.ant-dropdown-trigger>.anticon]:border-l [&>.ant-dropdown-trigger>.anticon]:border-regular dark:[&>.ant-dropdown-trigger>.anticon]:border-white/10"
                                        outlined
                                        type="light"
                                    >
                                        Bottom Right hover
                                        <Dropdown
                                            placement="bottomRight"
                                            menu={{ items }}
                                        >
                                            <UserOutlined className="flex group-hover:text-primary" />
                                        </Dropdown>
                                    </Buttons>
                                    <Buttons
                                        className="text-[14px] text-theme-gray hover:text-primary dark:hover:text-primary dark:text-white/60 btn-outlined inline-flex items-center border-deep dark:border-white/10 h-[36px] group [&>span>svg]:text-current dark:bg-transparent transition duration-300 [&>.ant-dropdown-trigger]:h-full [&>.ant-dropdown-trigger>.anticon]:h-full [&>.ant-dropdown-trigger>.anticon]:inline-flex [&>.ant-dropdown-trigger>.anticon]:items-center [&>.ant-dropdown-trigger>.anticon]:ps-2 [&>.ant-dropdown-trigger>.anticon]:ms-2 [&>.ant-dropdown-trigger>.anticon]:border-l [&>.ant-dropdown-trigger>.anticon]:border-regular dark:[&>.ant-dropdown-trigger>.anticon]:border-white/10"
                                        outlined
                                        type="light"
                                    >
                                        Top Left hover
                                        <Dropdown
                                            placement="topLeft"
                                            menu={{ items }}
                                        >
                                            <EllipsisOutlined className="flex group-hover:text-primary" />
                                        </Dropdown>
                                    </Buttons>
                                    <Buttons
                                        className="text-[14px] text-theme-gray hover:text-primary dark:hover:text-primary dark:text-white/60 btn-outlined inline-flex items-center border-deep dark:border-white/10 h-[36px] group [&>span>svg]:text-current dark:bg-transparent transition duration-300 [&>.ant-dropdown-trigger]:h-full [&>.ant-dropdown-trigger>.anticon]:h-full [&>.ant-dropdown-trigger>.anticon]:inline-flex [&>.ant-dropdown-trigger>.anticon]:items-center [&>.ant-dropdown-trigger>.anticon]:ps-2 [&>.ant-dropdown-trigger>.anticon]:ms-2 [&>.ant-dropdown-trigger>.anticon]:border-l [&>.ant-dropdown-trigger>.anticon]:border-regular dark:[&>.ant-dropdown-trigger>.anticon]:border-white/10"
                                        outlined
                                        type="light"
                                    >
                                        Top Right hover
                                        <Dropdown
                                            placement="topRight"
                                            menu={{ items }}
                                        >
                                            <EllipsisOutlined className="flex group-hover:text-primary" />
                                        </Dropdown>
                                    </Buttons>
                                    <Buttons
                                        className="text-[14px] text-danger dark:text-danger dark:hover:text-danger-hbr btn-outlined inline-flex items-center border-deep dark:border-white/10 h-[36px] group [&>span>svg]:text-current dark:bg-transparent transition duration-300 [&>.ant-dropdown-trigger]:h-full [&>.ant-dropdown-trigger>.anticon]:h-full [&>.ant-dropdown-trigger>.anticon]:inline-flex [&>.ant-dropdown-trigger>.anticon]:items-center [&>.ant-dropdown-trigger>.anticon]:ps-2 [&>.ant-dropdown-trigger>.anticon]:ms-2 [&>.ant-dropdown-trigger>.anticon]:border-l [&>.ant-dropdown-trigger>.anticon]:border-regular dark:[&>.ant-dropdown-trigger>.anticon]:border-white/10"
                                        outlined
                                        type="error"
                                    >
                                        <Tooltip
                                            title="tooltip"
                                            key="leftButton"
                                        >
                                            Tooltip
                                        </Tooltip>
                                        <Dropdown
                                            placement="bottomLeft"
                                            menu={{ items }}
                                        >
                                            <EllipsisOutlined className="flex" />
                                        </Dropdown>
                                    </Buttons>
                                    <Buttons
                                        className="text-[14px] text-warning dark:text-warning dark:hover:text-warning-hbr btn-outlined inline-flex items-center border-deep dark:border-white/10 h-[36px] group [&>span>svg]:text-current dark:bg-transparent transition duration-300 [&>.ant-dropdown-trigger]:h-full [&>.ant-dropdown-trigger>.anticon]:h-full [&>.ant-dropdown-trigger>.anticon]:inline-flex [&>.ant-dropdown-trigger>.anticon]:items-center [&>.ant-dropdown-trigger>.anticon]:ps-2 [&>.ant-dropdown-trigger>.anticon]:ms-2 [&>.ant-dropdown-trigger>.anticon]:border-l [&>.ant-dropdown-trigger>.anticon]:border-regular dark:[&>.ant-dropdown-trigger>.anticon]:border-white/10"
                                        outlined
                                        type="warning"
                                    >
                                        Warning
                                        <Dropdown
                                            placement="bottomLeft"
                                            menu={{ items }}
                                        >
                                            <EllipsisOutlined className="flex"  />
                                        </Dropdown>
                                    </Buttons>
                                    <Buttons
                                        className="text-[14px] text-info dark:hover:text-info-hbr btn-outlined inline-flex items-center border-deep dark:border-white/10 h-[36px] group [&>span>svg]:text-current dark:bg-transparent  transition duration-300 [&>.ant-dropdown-trigger]:h-full [&>.ant-dropdown-trigger>.anticon]:h-full [&>.ant-dropdown-trigger>.anticon]:inline-flex [&>.ant-dropdown-trigger>.anticon]:items-center [&>.ant-dropdown-trigger>.anticon]:ps-2 [&>.ant-dropdown-trigger>.anticon]:ms-2 [&>.ant-dropdown-trigger>.anticon]:border-l [&>.ant-dropdown-trigger>.anticon]:border-regular dark:[&>.ant-dropdown-trigger>.anticon]:border-white/10"
                                        outlined
                                        type="light"
                                    >
                                        Info
                                        <Dropdown
                                            placement="bottomLeft"
                                            menu={{ items }}
                                        >
                                            <DownOutlined className="flex"  />
                                        </Dropdown>
                                    </Buttons>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </>
        </>
    )
}

export default Dropdowns
