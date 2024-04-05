import { useState } from 'react'
import {
    UilPhone,
    UilEnvelope,
    UilMapMarker,
    UilEllipsisH,
} from '@iconscout/react-unicons'

import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { Row, Form, Input } from 'antd'
import DropDown from '@/components/dropdown'
import { contactDeleteData } from '@/redux/contact/actionCreator'
import { Buttons } from '@/components/buttons'
import { Modals } from '@/components/modals/antd-modals'

function ContactCard({ user }: any) {
    const dispatch = useDispatch()
    const { users } = useSelector((state: any) => {
        return {
            users: state.Contact.data,
        }
    })
    const { id, name, designation, img, email, phone, company } = user

    const onHandleDelete = (id: any) => {
        const value = users.filter((item: any) => item.id !== id)
        //@ts-ignore
        dispatch(contactDeleteData(value))
    }

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
    const moreContent = [
        {
            key: '1',
            label: (
                <Link
                    className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
                    onClick={() => showEditModal(user)}
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

    const showEditModal = (data: any) => {
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

    return (
        <>
            <div className="bg-white dark:bg-white/10 shadow-[0_5px_20px_rgba(173,181,217,0.01)] p-[25px] rounded-10 relative [&>.ant-dropdown-trigger]:absolute [&>.ant-dropdown-trigger]:top-[16px] [&>.ant-dropdown-trigger]:bg-transparent [&>.ant-dropdown-trigger]:border-none [&>.ant-dropdown-trigger]:text-light-extra [&>.ant-dropdown-trigger]:dark:text-white/60 [&>.ant-dropdown-trigger]:ltr:right-[26px] [&>.ant-dropdown-trigger]:rtl:left-[26px] [&>.ant-dropdown-trigger]:min-w-[30px] [&>.ant-dropdown-trigger]:min-h-[30px] [&>.ant-dropdown-trigger]:inline-flex [&>.ant-dropdown-trigger]:items-center [&>.ant-dropdown-trigger]:justify-center [&>.ant-dropdown-trigger>a]:hover:text-primary">
                <DropDown
                    className="bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-4 z-10"
                    customContent={moreContent}
                    placement="bottomRight"
                >
                    <Buttons
                        className="me-[-18px]"
                        type="light"
                        shape="circle"
                        onClick={(e: any) => e.preventDefault()}
                    >
                        <UilEllipsisH className="w-[24px] h-[24px] text-light dark:text-white/60" />
                    </Buttons>
                </DropDown>
                <figure className="m-0 text-center">
                    <img
                        className="inline-block rounded-full w-[120px] h-[120px]"
                        src={`/hexadash-nextjs/${img}`}
                        alt=""
                    />
                    <figcaption className="mt-[20px]">
                        <h3 className="text-[18px] font-semibold mb-0 text-dark dark:text-white/[.87]">
                            {name}
                        </h3>
                        <span className="text-theme-gray dark:text-white/60">
                            {designation}
                        </span>
                    </figcaption>
                </figure>
                <div className="mt-[20px] dark:border-white/10 border-t-1 pt-[25px]">
                    <ul className="flex flex-col flex-wrap gap-[14px]">
                        <li className="flex items-center text-light dark:text-white/60 gap-[12px]">
                            <UilPhone className="w-[16px] h-[16px]" />
                            {phone}
                        </li>
                        <li className="flex items-center text-light dark:text-white/60 gap-[12px]">
                            <UilEnvelope className="w-[16px] h-[16px]" />
                            {email}
                        </li>
                        <li className="flex items-center text-light dark:text-white/60 gap-[12px]">
                            <UilMapMarker className="w-[16px] h-[16px]" />
                            {company}
                        </li>
                    </ul>
                </div>
            </div>

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
        </>
    )
}

export default ContactCard
