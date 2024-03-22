import React, { useState } from 'react'
import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
} from '@ant-design/icons'
import { Row, Col, MenuProps, Menu } from 'antd'
import { PageHeaders } from '@/components/page-headers'

const { SubMenu } = Menu
function Menus() {
    const PageRoutes = [
        {
            path: '/admin',
            breadcrumbName: 'Dashboard',
        },
        {
            path: '',
            breadcrumbName: 'Menu',
        },
    ]
    const [state, setState] = useState({
        current: 'mail',
    })

    const handleClick = (e: any) => {
        setState({
            current: e.key,
        })
    }

    const onVerticleHandleClick = () => {}

    const items: MenuProps['items'] = [
        {
            label: 'Navigation One',
            key: 'mail',
            icon: <MailOutlined />,
        },
        {
            label: 'Navigation Two',
            key: 'app',
            icon: <AppstoreOutlined />,
            disabled: true,
        },
        {
            label: 'Navigation Three - Submenu',
            key: 'SubMenu',
            icon: <SettingOutlined />,
            children: [
                {
                    type: 'group',
                    label: 'Item 1',
                    children: [
                        {
                            label: 'Option 1',
                            key: 'setting:1',
                        },
                        {
                            label: 'Option 2',
                            key: 'setting:2',
                        },
                    ],
                },
                {
                    type: 'group',
                    label: 'Item 2',
                    children: [
                        {
                            label: 'Option 3',
                            key: 'setting:3',
                        },
                        {
                            label: 'Option 4',
                            key: 'setting:4',
                        },
                    ],
                },
            ],
        },
        {
            label: (
                <a
                    href="https://ant.design"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Navigation Four - Link
                </a>
            ),
            key: 'alipay',
        },
    ]

    const [current, setCurrent] = useState('mail')

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key)
    }

    type MenuItem = Required<MenuProps>['items'][number]
    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group'
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem
    }

    function getItem2(
      label: React.ReactNode,
      key?: React.Key | null,
      icon?: React.ReactNode,
      children?: MenuItem[],
      type?: 'group',
    ): MenuItem {
      return {
        key,
        icon,
        children,
        label,
        type,
      } as MenuItem;
    }

    const items2: MenuProps['items'] = [
        getItem('Navigation One', 'sub1', <MailOutlined />, [
            getItem(
                'Item 1',
                'g1',
                null,
                [getItem('Option 1', '1'), getItem('Option 2', '2')],
                'group'
            ),
            getItem(
                'Item 2',
                'g2',
                null,
                [getItem('Option 3', '3'), getItem('Option 4', '4')],
                'group'
            ),
        ]),

        getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
            getItem('Option 5', '5'),
            getItem('Option 6', '6'),
            getItem('Submenu', 'sub3', null, [
                getItem('Option 7', '7'),
                getItem('Option 8', '8'),
            ]),
        ]),

        { type: 'divider' },

        getItem('Navigation Three', 'sub4', <SettingOutlined />, [
            getItem('Option 9', '9'),
            getItem('Option 10', '10'),
            getItem('Option 11', '11'),
            getItem('Option 12', '12'),
        ]),

        getItem(
            'Group',
            'grp',
            null,
            [getItem('Option 13', '13'), getItem('Option 14', '14')],
            'group'
        ),
    ]

    const items3: MenuItem[] = [
      getItem2('Navigation One', 'sub1', <MailOutlined />, [
        getItem2('Item 1', null, null, [getItem2('Option 1', '1'), getItem2('Option 2', '2')], 'group'),
        getItem2('Item 2', null, null, [getItem2('Option 3', '3'), getItem2('Option 4', '4')], 'group'),
      ]),
    
      getItem2('Navigation Two', 'sub2', <AppstoreOutlined />, [
        getItem2('Option 5', '5'),
        getItem2('Option 6', '6'),
        getItem2('Submenu', 'sub3', null, [getItem2('Option 7', '7'), getItem2('Option 8', '8')]),
      ]),
    
      getItem2('Navigation Three', 'sub4', <SettingOutlined />, [
        getItem2('Option 9', '9'),
        getItem2('Option 10', '10'),
        getItem2('Option 11', '11'),
        getItem2('Option 12', '12'),
      ]),
    ];

    

    return (
        <>
            <PageHeaders
                className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
                title="Menu"
                routes={PageRoutes}
            />
            <>
                <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
                    <Row gutter={25}>
                        <Col md={24} sm={24} xs={24}>
                            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                        Top Navigation
                                    </h1>
                                </div>
                                <div className="p-[25px]">
                                    <Menu
                                        className="scrollbar dark:bg-transparent dark:border-white/10 [&>li]:after"
                                        onClick={onClick}
                                        selectedKeys={[current]}
                                        mode="horizontal"
                                        items={items}
                                    ></Menu>
                                </div>
                            </div>
                        </Col>
                        <Col md={12} sm={24} xs={24}>
                            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                        Vertical Menu
                                    </h1>
                                </div>
                                <div className="p-[25px]">
                                    <Menu
                                        className="dark:bg-transparent dark:border-white/10"
                                        onClick={onClick} style={{ width: 256 }} mode="vertical" items={items3}
                                    ></Menu>
                                </div>
                            </div>
                        </Col>
                        <Col md={12} sm={24} xs={24}>
                            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                        Current Submenu
                                    </h1>
                                </div>
                                <div className="p-[25px]">
                                    <Menu
                                        className="dark:bg-transparent dark:border-white/10"
                                        onClick={onClick}
                                        style={{ width: 256 }}
                                        defaultSelectedKeys={['1']}
                                        defaultOpenKeys={['sub1']}
                                        mode="inline"
                                        items={items2}
                                    ></Menu>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </main>
            </>
        </>
    )
}

export default Menus
