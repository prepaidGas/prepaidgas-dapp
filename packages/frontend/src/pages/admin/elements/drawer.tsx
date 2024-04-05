import React from 'react'
import { useState } from 'react'
import { Button, Drawer, theme } from 'antd'
import { Form, Col, Row, Input, Select, DatePicker } from 'antd'
import { PageHeaders } from '@/components/page-headers'
import { Drawers } from '@/components/drawer'

const { Option } = Select
function DrawerComponent() {
    const PageRoutes = [
        {
            path: '/admin',
            breadcrumbName: 'Dashboard',
        },
        {
            path: '',
            breadcrumbName: 'Drawer',
        },
    ]
    const { token } = theme.useToken()
    const [open, setOpen] = useState(false)
    const showDrawer = () => {
        setOpen(true)
    }

    const onClose = () => {
        setOpen(false)
    }
    const containerStyle: React.CSSProperties = {
      height: 200,
      overflow: 'hidden',
      position: 'relative',
      padding: 48,
      textAlign: 'center',
    }
    const containerStyle2: React.CSSProperties = {
        width: '100%',
    }
    return (
        <>
            <PageHeaders
                className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
                title="Drawer"
                routes={PageRoutes}
            />
            <div className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
                <Row gutter={25}>
                    <Col lg={12} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Basic
                                </h1>
                            </div>
                            <div className="p-[25px]">
                                <Drawers title="Basic Drawer" placement="right">
                                    <p>Some contents...</p>
                                    <p>Some contents...</p>
                                    <p>Some contents...</p>
                                </Drawers>
                            </div>
                        </div>
                    </Col>
                    <Col lg={12} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Custom Placement
                                </h1>
                            </div>
                            <div className="drawer-placement p-[25px]">
                                <Drawers customPlacement title="Basic Drawer">
                                    <p>Some contents...</p>
                                    <p>Some contents...</p>
                                    <p>Some contents...</p>
                                </Drawers>
                            </div>
                        </div>
                    </Col>
                    <Col lg={12} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Render in current dom
                                </h1>
                            </div>
                            <div style={containerStyle}>
                                Render in this
                                <div style={{ marginTop: 16 }}>
                                    <Button className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]" type="primary" onClick={showDrawer}>
                                        Open
                                    </Button>
                                </div>
                                <div className="p-[25px] [&>.ant-drawer-inline]:absolute">
                                    <Drawer
                                        title="Basic Drawer"
                                        placement="right"
                                        closable={false}
                                        onClose={onClose}
                                        open={open}
                                        getContainer={false}
                                    >
                                        <p>Some contents...</p>
                                    </Drawer>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={12} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Submit form in drawer
                                </h1>
                            </div>
                            <div className="p-[25px]">
                                <Drawers
                                    btnText="+ New account"
                                    width="560"
                                    title="Basic Drawer"
                                >
                                    <Form layout="vertical" hideRequiredMark>
                                        <Row gutter={16}>
                                            <Col lg={12} sm={24} xs={24}>
                                                <Form.Item
                                                    name="name"
                                                    label="Name"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Please enter user name',
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="Please enter user name" />
                                                </Form.Item>
                                            </Col>
                                            <Col lg={12} sm={24} xs={24}>
                                                <Form.Item
                                                    name="url"
                                                    label="Url"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Please enter url',
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        style={containerStyle2}
                                                        addonBefore="http://"
                                                        addonAfter=".com"
                                                        placeholder="Please enter url"
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col lg={12} sm={24} xs={24}>
                                                <Form.Item
                                                    name="owner"
                                                    label="Owner"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Please select an owner',
                                                        },
                                                    ]}
                                                >
                                                    <Select
                                                        className="dark:[&>.ant-select-arrow]:text-white/60"
                                                        placeholder="Please select an owner"
                                                    >
                                                        <Option value="xiao">
                                                            Xiaoxiao Fu
                                                        </Option>
                                                        <Option value="mao">
                                                            Maomao Zhou
                                                        </Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col lg={12} sm={24} xs={24}>
                                                <Form.Item
                                                    name="type"
                                                    label="Type"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Please choose the type',
                                                        },
                                                    ]}
                                                >
                                                    <Select
                                                        className="dark:[&>.ant-select-arrow]:text-white/60"
                                                        placeholder="Please choose the type"
                                                    >
                                                        <Option value="private">
                                                            Private
                                                        </Option>
                                                        <Option value="public">
                                                            Public
                                                        </Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col lg={12} sm={24} xs={24}>
                                                <Form.Item
                                                    name="approver"
                                                    label="Approver"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Please choose the approver',
                                                        },
                                                    ]}
                                                >
                                                    <Select
                                                        className="dark:[&>.ant-select-arrow]:text-white/60"
                                                        placeholder="Please choose the approver"
                                                    >
                                                        <Option value="jack">
                                                            Jack Ma
                                                        </Option>
                                                        <Option value="tom">
                                                            Tom Liu
                                                        </Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col lg={12} sm={24} xs={24}>
                                                <Form.Item
                                                    name="dateTime"
                                                    label="DateTime"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Please choose the dateTime',
                                                        },
                                                    ]}
                                                >
                                                    <DatePicker.RangePicker
                                                        className="w-full dark:[&>.ant-picker-range-separator>span]:text-white/60 dark:[&>.ant-picker-suffix]:text-white/60"
                                                        getPopupContainer={(
                                                            trigger: any
                                                        ) => trigger.parentNode}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col lg={24} sm={24} xs={24}>
                                                <Form.Item
                                                    name="description"
                                                    label="Description"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'please enter url description',
                                                        },
                                                    ]}
                                                >
                                                    <Input.TextArea
                                                        rows={4}
                                                        placeholder="please enter url description"
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Drawers>
                            </div>
                        </div>
                    </Col>
                    <Col lg={12} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Multi Label Drawer
                                </h1>
                            </div>
                            <div className="p-[25px]">
                                <Drawers
                                    title="Basic Drawer"
                                    childTitle="Lavel Two"
                                    childDrawer={
                                        <>
                                            <p>Some contents...</p>
                                            <p>Some contents...</p>
                                            <p>Some contents...</p>
                                        </>
                                    }
                                >
                                    <p>Some contents...</p>
                                    <p>Some contents...</p>
                                    <p>Some contents...</p>
                                </Drawers>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default DrawerComponent
