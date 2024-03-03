import { useState } from 'react'
import Link from 'next/link'
import type { CollapseProps } from 'antd'
import { Collapse } from 'antd'
import FontAwesome from 'react-fontawesome'
import { Buttons } from '@/components/buttons'
import { PageHeaders } from '@/components/page-headers'
import GeneralKnowledgeTop from './overview/GeneralKnowledgeTop'

const path = '/admin/pages/knowledgeBase'
const items: CollapseProps['items'] = [
    {
        key: '1',
        label: (<div className="font-normal text-body dark:text-white/60 hover:text-primary text-15">Switch between accounts</div>),
        children: (
            <ul className="bg-transparent ps-[25px]">
                <li className="mb-4">
                    <Link
                        href={`${path}/single`}
                        className="font-normal text-body dark:text-white/60 hover:text-primary text-15"
                    >
                        {' '}
                        Log in and out of Plugins
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        href={`${path}/single`}
                        className="font-normal text-body dark:text-white/60 hover:text-primary text-15"
                    >
                        Change your email
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        href={`${path}/single`}
                        className="font-normal text-body dark:text-white/60 hover:text-primary text-15"
                    >
                        Reactivate your account
                    </Link>
                </li>
                <li className="mb-4">
                    <Link
                        href={`${path}/single`}
                        className="font-normal text-body dark:text-white/60 hover:text-primary text-15"
                    >
                        Change your email
                    </Link>
                </li>
            </ul>
        ),
    },
]

function AllArticle() {
    const PageRoutes = [
        {
            path: 'index',
            breadcrumbName: 'Dashboard',
        },
        {
            path: '',
            breadcrumbName: 'All Article',
        },
    ]

    const path = '/admin/pages/knowledgeBase'

    const [state, setState] = useState({
        key: 0,
    })

    const callback = (key: any) => {
        setState({ ...state, key })
    }

    return (
        <>
            <PageHeaders
                routes={PageRoutes}
                title="All Article"
                className="flex  justify-between items-center px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
            />
            <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
                <GeneralKnowledgeTop />
                <div className="bg-white dark:bg-white/10 mt-[50px] px-[50px] sm:px-[30px] pb-[50px] rounded-10">
                    <div className="max-w-[930px] mx-auto">
                        <div className="pt-6 pb-10">
                            <ul className="flex items-center mb-0">
                                <li className="ltr:mr-2 rtl:ml-2">
                                    <Link
                                        className="text-sm text-dark dark:text-white/[.87]"
                                        href="/admin/knowledgebase/plugins"
                                    >
                                        Doc Home
                                    </Link>
                                </li>
                                <li>
                                    <FontAwesome
                                        className="text-[14px] ltr:mr-2 rtl:ml-2"
                                        name="angle-right"
                                        size="2x"
                                    />
                                    <span className="text-[#868eae] dark:text-white/60">
                                        Plugins
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <>
                            <div className="pb-16 border-b mb-11 border-normal dark:border-white/10">
                                <div className="flex justify-between flex-start lg:flex-col gap-x-[100px] lg:gap-y-3 mb-14">
                                    <div className="min-w-[260px] sm:min-w-full">
                                        <h2 className="text-dark dark:text-white/[.87] text-[23px] font-medium">
                                            Introduction to Plugin
                                        </h2>
                                    </div>
                                    <ul className="flex flex-wrap mb-0">
                                        <li className="max-w-[250px] flex-[0_0_50%] 3xl:flex-[0_0_40%] md:flex-[0_0_100%] mb-4">
                                            <Link
                                                href={`${path}/single`}
                                                className="font-normal text-body dark:text-white/60 hover:text-primary text-15"
                                            >
                                                Log in and out of plugins view
                                                your success and other stats
                                            </Link>
                                        </li>
                                        <li className="max-w-[250px] flex-[0_0_50%] 3xl:flex-[0_0_40%] md:flex-[0_0_100%] mb-4 ltr:ml-[68px] rtl:mr-[68px] md:ltr:mx-0 md:rtl:mx-0 [&>.ant-collapse>.ant-collapse-item]:border-none">
                                            <Link
                                                href={`${path}/single`}
                                                className="font-normal text-body dark:text-white/60 hover:text-primary text-15"
                                            >
                                                Log in and out of Plugins
                                            </Link>
                                        </li>
                                        <li className="max-w-[250px] flex-[0_0_50%] 3xl:flex-[0_0_40%] md:flex-[0_0_100%] mb-4">
                                            <Link
                                                href={`${path}/single`}
                                                className="font-normal text-body dark:text-white/60 hover:text-primary text-15"
                                            >
                                                Switch between accounts
                                            </Link>
                                        </li>
                                        <li className="max-w-[250px] flex-[0_0_50%] 3xl:flex-[0_0_40%] md:flex-[0_0_100%] mb-4 ltr:ml-[68px] rtl:mr-[68px] md:ltr:mx-0 md:rtl:mx-0 [&>.ant-collapse>.ant-collapse-item]:border-none">
                                            <Collapse
                                                className="bg-transparent border-none custom-collapse-style"
                                                onChange={callback}
                                                ghost
                                                defaultActiveKey={['1']}
                                                items={items}
                                            ></Collapse>
                                        </li>
                                        <li className="max-w-[250px] flex-[0_0_50%] 3xl:flex-[0_0_40%] md:flex-[0_0_100%]">
                                            <Link
                                                href={`${path}/single`}
                                                className="font-normal text-body dark:text-white/60 hover:text-primary text-15"
                                            >
                                                Switch between accounts
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex justify-between flex-start lg:flex-col gap-x-[100px] lg:gap-y-3 mb-14">
                                    <div className="min-w-[260px] sm:min-w-full">
                                        <h2 className="text-dark dark:text-white/[.87] text-[23px] font-medium">
                                            Productivity tools for your Plugin
                                            admin
                                        </h2>
                                    </div>
                                    <ul className="flex flex-wrap mb-0">
                                        <li className="max-w-[250px] flex-[0_0_50%] 3xl:flex-[0_0_40%] md:flex-[0_0_100%] mb-4">
                                            <Link
                                                href={`${path}/single`}
                                                className="font-normal text-body dark:text-white/60 hover:text-primary text-15"
                                            >
                                                Log in and out of plugins view
                                                your success and other stats
                                            </Link>
                                        </li>
                                        <li className="max-w-[250px] flex-[0_0_50%] 3xl:flex-[0_0_40%] md:flex-[0_0_100%] mb-4 ltr:ml-[68px] rtl:mr-[68px] md:ltr:mx-0 md:rtl:mx-0 [&>.ant-collapse>.ant-collapse-item]:border-none">
                                            <Link
                                                href={`${path}/single`}
                                                className="font-normal text-body dark:text-white/60 hover:text-primary text-15"
                                            >
                                                Log in and out of Plugins
                                            </Link>
                                        </li>
                                        <li className="max-w-[250px] flex-[0_0_50%] 3xl:flex-[0_0_40%] md:flex-[0_0_100%] mb-4">
                                            <Link
                                                href={`${path}/single`}
                                                className="font-normal text-body dark:text-white/60 hover:text-primary text-15"
                                            >
                                                Switch between accounts
                                            </Link>
                                        </li>
                                        <li className="max-w-[250px] flex-[0_0_50%] 3xl:flex-[0_0_40%] md:flex-[0_0_100%] mb-4 ltr:ml-[68px] rtl:mr-[68px] md:ltr:mx-0 md:rtl:mx-0 [&>.ant-collapse>.ant-collapse-item]:border-none">
                                        <Collapse
                                                className="bg-transparent border-none custom-collapse-style"
                                                onChange={callback}
                                                ghost
                                                items={items}
                                            ></Collapse>
                                        </li>
                                        <li className="max-w-[250px] flex-[0_0_50%] 3xl:flex-[0_0_40%] md:flex-[0_0_100%]">
                                            <Link
                                                href={`${path}/single`}
                                                className="font-normal text-body dark:text-white/60 hover:text-primary text-15"
                                            >
                                                Switch between accounts
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex justify-between flex-start lg:flex-col gap-x-[100px] lg:gap-y-3 mb-14">
                                    <div className="min-w-[260px] sm:min-w-full">
                                        <h2 className="text-dark dark:text-white/[.87] text-[23px] font-medium">
                                            Manage your account
                                        </h2>
                                    </div>
                                    <ul className="flex flex-wrap mb-0">
                                        <li className="max-w-[250px] flex-[0_0_50%] 3xl:flex-[0_0_40%] md:flex-[0_0_100%] mb-4">
                                            <Link
                                                href={`${path}/single`}
                                                className="font-normal text-body dark:text-white/60 hover:text-primary text-15"
                                            >
                                                Log in and out of plugins view
                                                your success and other stats
                                            </Link>
                                        </li>
                                        <li className="max-w-[250px] flex-[0_0_50%] 3xl:flex-[0_0_40%] md:flex-[0_0_100%] mb-4 ltr:ml-[68px] rtl:mr-[68px] md:ltr:mx-0 md:rtl:mx-0 [&>.ant-collapse>.ant-collapse-item]:border-none">
                                            <Link
                                                href={`${path}/single`}
                                                className="font-normal text-body dark:text-white/60 hover:text-primary text-15"
                                            >
                                                Log in and out of Plugins
                                            </Link>
                                        </li>
                                        <li className="max-w-[250px] flex-[0_0_50%] 3xl:flex-[0_0_40%] md:flex-[0_0_100%] mb-4">
                                            <Link
                                                href={`${path}/single`}
                                                className="font-normal text-body dark:text-white/60 hover:text-primary text-15"
                                            >
                                                Switch between accounts
                                            </Link>
                                        </li>
                                        <li className="max-w-[250px] flex-[0_0_50%] 3xl:flex-[0_0_40%] md:flex-[0_0_100%] mb-4 ltr:ml-[68px] rtl:mr-[68px] md:ltr:mx-0 md:rtl:mx-0 [&>.ant-collapse>.ant-collapse-item]:border-none">
                                        <Collapse
                                                className="bg-transparent border-none custom-collapse-style"
                                                onChange={callback}
                                                ghost
                                                items={items}
                                            ></Collapse>
                                        </li>
                                        <li className="max-w-[250px] flex-[0_0_50%] 3xl:flex-[0_0_40%] md:flex-[0_0_100%]">
                                            <Link
                                                href={`${path}/single`}
                                                className="font-normal text-body dark:text-white/60 hover:text-primary text-15"
                                            >
                                                Switch between accounts
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex justify-between flex-start lg:flex-col gap-x-[100px] lg:gap-y-3 mb-0">
                                    <div className="min-w-[260px] sm:min-w-full">
                                        <h2 className="text-dark dark:text-white/[.87] text-[23px] font-medium">
                                            Manage your account
                                        </h2>
                                    </div>
                                    <ul className="flex flex-wrap mb-0">
                                        <li className="max-w-[250px] flex-[0_0_50%] 3xl:flex-[0_0_40%] md:flex-[0_0_100%] mb-4">
                                            <Link
                                                href={`${path}/single`}
                                                className="font-normal text-body dark:text-white/60 hover:text-primary text-15"
                                            >
                                                Log in and out of plugins view
                                                your success and other stats
                                            </Link>
                                        </li>
                                        <li className="max-w-[250px] flex-[0_0_50%] 3xl:flex-[0_0_40%] md:flex-[0_0_100%] mb-4 ltr:ml-[68px] rtl:mr-[68px] md:ltr:mx-0 md:rtl:mx-0 [&>.ant-collapse>.ant-collapse-item]:border-none">
                                            <Link
                                                href={`${path}/single`}
                                                className="font-normal text-body dark:text-white/60 hover:text-primary text-15"
                                            >
                                                Log in and out of Plugins
                                            </Link>
                                        </li>
                                        <li className="max-w-[250px] flex-[0_0_50%] 3xl:flex-[0_0_40%] md:flex-[0_0_100%] mb-4">
                                            <Link
                                                href={`${path}/single`}
                                                className="font-normal text-body dark:text-white/60 hover:text-primary text-15"
                                            >
                                                Switch between accounts
                                            </Link>
                                        </li>
                                        <li className="max-w-[250px] flex-[0_0_50%] 3xl:flex-[0_0_40%] md:flex-[0_0_100%] mb-4 ltr:ml-[68px] rtl:mr-[68px] md:ltr:mx-0 md:rtl:mx-0 [&>.ant-collapse>.ant-collapse-item]:border-none">
                                        <Collapse
                                                className="bg-transparent border-none custom-collapse-style"
                                                onChange={callback}
                                                ghost
                                                items={items}
                                            ></Collapse>
                                        </li>
                                        <li className="max-w-[250px] flex-[0_0_50%] 3xl:flex-[0_0_40%] md:flex-[0_0_100%]">
                                            <Link
                                                href={`${path}/single`}
                                                className="font-normal text-body dark:text-white/60 hover:text-primary text-15"
                                            >
                                                Switch between accounts
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="text-center">
                                <h2 className="mb-3 font-semibold text-dark dark:text-white/[.87] text-22">
                                    Still no luck? We can help!
                                </h2>
                                <p className="mb-[30px] text-body dark:text-white/60 text-15 font-normal">
                                    Contact us and we’ll get back to you as soon
                                    as possible.
                                </p>
                                <Buttons
                                    className="bg-primary text-white mx-auto px-8 h-[50px] text-sm font-medium"
                                    type="primary"
                                    size="large"
                                >
                                    Submit a Request
                                </Buttons>
                            </div>
                        </>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AllArticle
