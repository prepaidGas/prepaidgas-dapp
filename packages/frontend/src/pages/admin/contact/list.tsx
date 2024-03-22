import { useState } from 'react'
import Link from 'next/link'
import { Col, Table, Form, Input } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { UilStar, UilEllipsisV } from '@iconscout/react-unicons'
import Heading from '@/components/heading'
import DropDown from '@/components/dropdown'
import { Buttons } from '@/components/buttons'
import { Modals } from '@/components/modals/antd-modals'
import { onStarUpdate, contactDeleteData } from '@/redux/contact/actionCreator'

import ContactLayout from './Layout'

function ContactTable() {
    const dispatch = useDispatch()
    const { users } = useSelector((state: any) => {
        return {
            users: state.Contact.data,
        }
    })

    const [state, setState] = useState({
        selectedRowKeys: 0,
        selectedRows: 0,
        visible: false,
        editVisible: false,
        modalType: 'primary',
        url: null,
        update: {},
    })
    const { update }: any = state
    const [form] = Form.useForm()
    

    const onHandleDelete = (id: any) => {
        const value = users.filter((item: any) => item.id !== id)
        //@ts-ignore
        dispatch(contactDeleteData(value))
    }

    const showEditModal = (data: any, id: any) => {
        setState({
            ...state,
            editVisible: true,
            update: data,
        })
    }

    const onCancel = () => {
        setState({
            ...state,
            visible: false,
            editVisible: false,
        })
    }

    const handleEditOk = (values: any) => {
        onCancel()
        const updateUsers = users

        updateUsers.map((user: any) => {
            if (user.id === update.id) {
                const updateUser = user
                updateUser.id = update.id
                updateUser.name = values.name
                updateUser.email = values.email
                updateUser.phone = values.phone
                updateUser.designation = values.designation
                updateUser.company = values.company
                updateUser.time = update.time
                updateUser.img = update.img
                updateUser.stared = update.stared
            }
            return true
        })
        //@ts-ignore
        dispatch(contactAddData(updateUsers))
        form.resetFields()
    }

    const usersTableData: any = []

    users
        .sort((a: any, b: any) => {
            return b.time - a.time
        })
        .map((user: any) => {
            const {
                id,
                name,
                designation,
                img,
                stared,
                email,
                phone,
                company,
            } = user

            const moreContent = [
                {
                    key: '1',
                    label: (
                      <Link
                      className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
                      onClick={() => showEditModal(user, id)}
                      href="#0"
                    >
                      <span>Edit</span>
                    </Link>
                    ),
                },
                {
                    key: '2',
                    label: (
                      <Link
                      className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
                      onClick={() => onHandleDelete(id)}
                      href="#0"
                    >
                      <span>Delete</span>
                    </Link>
                    ),
                },
              ]

            return usersTableData.push({
                key: id,
                user: (
                    <div className="flex items-center">
                        <figure className="mx-2 mb-0">
                            <img
                                className="w-[40px] h-[40px] min-w-[40px]"
                                src={`/hexadash-nextjs/${img}`}
                                alt=""
                            />
                        </figure>
                        <figcaption>
                            <Heading
                                className="mb-1 text-sm font-medium text-dark dark:text-white/[.87]"
                                as="h6"
                            >
                                {name}
                            </Heading>
                            <span className="flex text-xs font-normal text-light dark:text-white/60">
                                San Francisco, CA
                            </span>
                        </figcaption>
                    </div>
                ),
                email: (
                    <span className="text-body dark:text-white/60 text-[15px] font-medium">
                        {email}
                    </span>
                ),
                company: (
                    <span className="text-body dark:text-white/60 text-[15px] font-medium">
                        {company}
                    </span>
                ),
                position: (
                    <span className="text-body dark:text-white/60 text-[15px] font-medium">
                        {designation}
                    </span>
                ),
                phone: (
                    <span className="text-body dark:text-white/60 text-[15px] font-medium">
                        {phone}
                    </span>
                ),
                action: (
                    <div className="min-w-[150px] text-end -m-2">
                        <Buttons
                            //@ts-ignore
                            onClick={() => dispatch(onStarUpdate(users, id))}
                            href="#"
                            shape="circle"
                            className="inline-flex items-center w-8 h-8 p-0 bg-transparent border-none shadow-none text-light-extra dark:text-white/60"
                        >
                            <UilStar
                                className={`w-[14px] h-[14px] mx-auto ${
                                    stared ? 'text-warning' : 'text-light-extra'
                                }`}
                            />
                        </Buttons>
                        <DropDown
                            className="bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-4 z-10"
                            customContent={moreContent}
                        >
                            <Buttons
                                className="inline-flex items-center justify-center w-8 h-8 p-0 bg-transparent border-none text-light-extra dark:text-white/60"
                                type="light"
                                href="#"
                                shape="circle"
                            >
                                <UilEllipsisV className="w-[14px] h-[14px] m-0" />
                            </Buttons>
                        </DropDown>
                    </div>
                ),
            })
        })

    const usersTableColumns = [
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            width: '90px',
        },
    ]

    const rowSelection = {
        onChange: (selectedRowKeys: any, selectedRows: any) => {
            setState({ ...state, selectedRowKeys, selectedRows })
        },
        getCheckboxProps: (record: any) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    }

    return (
        <ContactLayout>
            <Col xs={24}>
                <div className="ant-pagination-custom-style table-responsive hover-tr-none table-th-shape-none table-last-th-text-right table-th-border-none table-head-rounded table-selection-col-pl-25 table-tr-selected-background-transparent table-td-border-none bg-white dark:bg-white/10 p-[25px] rounded-[10px] ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-none ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-none">
                    <Table
                        className="[&>div>div>.ant-table]:mb-7 [&>div>div>.ant-table]:pb-5 [&>div>div>.ant-table]:border-b [&>div>div>.ant-table]:border-regular dark:[&>div>div>.ant-table]:border-white/10 [&>div>div>div>div>div>table>thead>tr>th:first-child]:ps-[20px] [&>div>div>div>div>div>table>tbody>tr>td:first-child]:ps-[20px]"
                        rowSelection={rowSelection}
                        dataSource={usersTableData}
                        columns={usersTableColumns}
                        pagination={{
                            defaultPageSize: 7,
                            total: usersTableData.length,
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} of ${total} items`,
                            className:
                                'text-end [&>li]:margin-0 [&>li]:border [&>li]:margin-0 [&>li]:bg-white [&>li]:rounded-6 dark:[&>li]:bg-white/10 dark:[&>li]:margin-0 [&>li]:border-regular dark:[&>li]:border-white/10 [&>li>.ant-pagination-item-link]:flex [&>li>.ant-pagination-item-link]:items-center [&>li>.ant-pagination-item-link]:justify-center [&>li>.ant-pagination-item-link]:border-none [&>li>.ant-pagination-item-link>.anticon>svg]:text-light [&>li>.ant-pagination-item-link>.anticon>svg]:dark:text-white/30 [&>.ant-pagination-item>a]:text-body [&>.ant-pagination-item>a]:dark:text-white/60 [&>.ant-pagination-item-active]:bg-primary [&>.ant-pagination-item.ant-pagination-item-active>a]:text-white [&>.ant-pagination-item.ant-pagination-item-active>a]:dark:text-white/60 [&>.ant-pagination-options>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-pagination-options>.ant-select>.ant-select-selector]:h-[33px] dark:[&>.ant-pagination-options>.ant-select>.ant-select-selector]:text-white/[.60] dark:[&>.ant-pagination-options>.ant-select>.ant-select-arrow]:text-white/[.60] [&>.ant-pagination-options>.ant-select>.ant-select-selector]:border-0 dark:[&>.ant-pagination-options>.ant-select>.ant-select-selector]:border-white/10 [&>.ant-pagination-options>.ant-select>.ant-select-selector]:rounded-6',
                        }}
                    />
                </div>
            </Col>

            <Modals
                type={state.modalType}
                title="Contact Information"
                visible={state.editVisible}
                footer={null}
                onCancel={onCancel}
            >
                <div className="px-1.5">
                    <Form form={form} name="contact" onFinish={handleEditOk}>
                        <Form.Item
                            label="Name"
                            name="name"
                            className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:flex-auto [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>input]:p-3 [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white/60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
                        >
                            <Input
                                placeholder="Input Name"
                                className="dark:placeholder-white/60"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Email Address"
                            name="email"
                            rules={[
                                {
                                    message: 'Please input your email!',
                                    type: 'email',
                                },
                            ]}
                            className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:flex-auto [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>input]:p-3 [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white/60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
                        >
                            <Input
                                placeholder="name@example.com"
                                className="dark:placeholder-white/60"
                            />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:flex-auto [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>input]:p-3 [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white/60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
                        >
                            <Input
                                placeholder="+440 2546 5236"
                                className="dark:placeholder-white/60"
                            />
                        </Form.Item>

                        <Form.Item
                            name="designation"
                            label="Position"
                            className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:flex-auto [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>input]:p-3 [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white/60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
                        >
                            <Input
                                placeholder="Input Position"
                                className="dark:placeholder-white/60"
                            />
                        </Form.Item>

                        <Form.Item
                            name="company"
                            label="Company Name"
                            className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:flex-auto [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>input]:p-3 [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white/60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
                        >
                            <Input
                                placeholder="Company Name"
                                className="dark:placeholder-white/60"
                            />
                        </Form.Item>

                        <Buttons
                            htmlType="submit"
                            size="default"
                            type="primary"
                            key="submit"
                            className="px-5 text-sm font-semibold bg-primary hover:bg-primary-hbr h-11"
                        >
                            Add New Contact
                        </Buttons>
                    </Form>
                </div>
            </Modals>
        </ContactLayout>
    )
}

export default ContactTable
