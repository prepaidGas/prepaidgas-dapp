import { useState } from 'react'
import { Table } from 'antd'
import Link from 'next/link'
import {
    UilEye,
    UilEdit,
    UilPlus,
    UilTrashAlt,
    UilEllipsisH,
    UilExpandArrows,
} from '@iconscout/react-unicons'
import { Buttons } from '@/components/buttons'
import DropDown from '@/components/dropdown'
const moreContent = [
    {
        key: '1',
        label: (
            <Link
                className="group flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm gap-[10px] [&>svg]:w-[14px] [&>svg]:h-[14px] [&>svg]:text-light-extra dark:[&>svg]:text-white/60"
                href="#"
            >
                <UilEye className="group-hover:text-primary" />
                View
            </Link>
        ),
    },
    {
        key: '2',
        label: (
            <Link
                className="group flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm gap-[10px] [&>svg]:w-[14px] [&>svg]:h-[14px] [&>svg]:text-light-extra dark:[&>svg]:text-white/60"
                href="#"
            >
                <UilEdit className="group-hover:text-primary" />
                Edit
            </Link>
        ),
    },
    {
        key: '3',
        label: (
            <Link
                className="group flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm gap-[10px] [&>svg]:w-[14px] [&>svg]:h-[14px] [&>svg]:text-light-extra dark:[&>svg]:text-white/60"
                href="#"
            >
                <UilTrashAlt className="group-hover:text-primary" />
                Delete
            </Link>
        ),
    },
]
function ProjectTaskList() {
    const [state, setState] = useState({
        selectedRowKeys: [],
        selectedRows: [],
    })
    const dataSource = [
        {
            key: '1',
            title: (
                <span className="text-body dark:text-white/60 text-[15px]">
                    Add Images To the gallery
                </span>
            ),
            component: (
                <div className="flex items-center justify-end -mx-[10px]">
                    <span className="block mx-[10px] text-xs text-[#9299b8] dark:text-white/60 leading-none">
                        09:20 AM{' '}
                    </span>
                    <img
                        className="block mx-[10px] leading-none"
                        style={{ width: '30px' }}
                        src="/hexadash-nextjs/img/users/1.png"
                        alt=""
                    />
                    <span className="block mx-[10px] leading-none">
                        <UilExpandArrows className="w-4 h-4 text-light-extra dark:text-white/60" />
                    </span>
                    <div className="task-action">
                        <DropDown customContent={moreContent}>
                            <button>
                                <UilEllipsisH className="w-4 h-4 mx-[10px] text-body dark:text-white/60" />
                            </button>
                        </DropDown>
                    </div>
                </div>
            ),
        },
        {
            key: '2',
            title: (
                <span className="text-body dark:text-white/60">
                    Add Images To the gallery
                </span>
            ),
            component: (
                <div className="flex items-center justify-end -mx-[10px]">
                    <span className="block mx-[10px] text-xs text-[#9299b8] dark:text-white/60 leading-none">
                        09:20 AM{' '}
                    </span>
                    <img
                        className="block mx-[10px] leading-none"
                        style={{ width: '30px' }}
                        src="/hexadash-nextjs/img/users/1.png"
                        alt=""
                    />
                    <span className="block mx-[10px] leading-none">
                        <UilExpandArrows className="w-4 h-4 text-light-extra dark:text-white/60" />
                    </span>
                    <div className="task-action">
                        <DropDown
                            customContent={moreContent}
                        >
                            <button>
                                <UilEllipsisH className="w-4 h-4 mx-[10px] text-body dark:text-white/60" />
                            </button>
                        </DropDown>
                    </div>
                </div>
            ),
        },
        {
            key: '3',
            title: (
                <span className="text-body dark:text-white/60">
                    Add Images To the gallery
                </span>
            ),
            component: (
                <div className="flex items-center justify-end -mx-[10px]">
                    <span className="block mx-[10px] text-xs text-[#9299b8] dark:text-white/60 leading-none">
                        09:20 AM{' '}
                    </span>
                    <img
                        className="block mx-[10px] leading-none"
                        style={{ width: '30px' }}
                        src="/hexadash-nextjs/img/users/1.png"
                        alt=""
                    />
                    <span className="block mx-[10px] leading-none">
                        <UilExpandArrows className="w-4 h-4 text-light-extra dark:text-white/60" />
                    </span>
                    <div className="task-action">
                        <DropDown customContent={moreContent}>
                            <button>
                                <UilEllipsisH className="w-4 h-4 mx-[10px] text-body dark:text-white/60" />
                            </button>
                        </DropDown>
                    </div>
                </div>
            ),
        },
        {
            key: '4',
            title: (
                <span className="text-body dark:text-white/60">
                    Add Images To the gallery
                </span>
            ),
            component: (
                <div className="flex items-center justify-end -mx-[10px]">
                    <span className="block mx-[10px] text-xs text-[#9299b8] dark:text-white/60 leading-none">
                        09:20 AM{' '}
                    </span>
                    <img
                        className="block mx-[10px] leading-none"
                        style={{ width: '30px' }}
                        src="/hexadash-nextjs/img/users/1.png"
                        alt=""
                    />
                    <span className="block mx-[10px] leading-none">
                        <UilExpandArrows className="w-4 h-4 text-light-extra dark:text-white/60" />
                    </span>
                    <div className="task-action">
                        <DropDown customContent={moreContent}>
                            <button>
                                <UilEllipsisH className="w-4 h-4 mx-[10px] text-body dark:text-white/60" />
                            </button>
                        </DropDown>
                    </div>
                </div>
            ),
        },
        {
            key: '5',
            title: (
                <span className="text-body dark:text-white/60">
                    Add Images To the gallery
                </span>
            ),
            component: (
                <div className="flex items-center justify-end -mx-[10px]">
                    <span className="block mx-[10px] text-xs text-[#9299b8] dark:text-white/60 leading-none">
                        09:20 AM{' '}
                    </span>
                    <img
                        className="block mx-[10px] leading-none"
                        style={{ width: '30px' }}
                        src="/hexadash-nextjs/img/users/1.png"
                        alt=""
                    />
                    <span className="block mx-[10px] leading-none">
                        <UilExpandArrows className="w-4 h-4 text-light-extra dark:text-white/60" />
                    </span>
                    <div className="task-action">
                        <DropDown customContent={moreContent}>
                            <button>
                                <UilEllipsisH className="w-4 h-4 mx-[10px] text-body dark:text-white/60" />
                            </button>
                        </DropDown>
                    </div>
                </div>
            ),
        },
        {
            key: '6',
            title: (
                <span className="text-body dark:text-white/60">
                    Add Images To the gallery
                </span>
            ),
            component: (
                <div className="flex items-center justify-end -mx-[10px]">
                    <span className="block mx-[10px] text-xs text-[#9299b8] dark:text-white/60 leading-none">
                        09:20 AM{' '}
                    </span>
                    <img
                        className="block mx-[10px] leading-none"
                        style={{ width: '30px' }}
                        src="/hexadash-nextjs/img/users/1.png"
                        alt=""
                    />
                    <span className="block mx-[10px] leading-none">
                        <UilExpandArrows className="w-4 h-4 text-light-extra dark:text-white/60" />
                    </span>
                    <div className="task-action">
                        <DropDown customContent={moreContent}>
                            <button>
                                <UilEllipsisH className="w-4 h-4 mx-[10px] text-body dark:text-white/60" />
                            </button>
                        </DropDown>
                    </div>
                </div>
            ),
        },
    ]

    const columns = [
        {
            dataIndex: 'title',
            key: 'title',
        },
        {
            dataIndex: 'component',
            key: 'component',
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
        <>
            <div className="table-responsive table-head-none hover-tr-none table-td-border-none table-td-text-body dark:text-white/60 table-tr-selected-background-transparent w-full ltr:pl-[17px] rtl:pr-[17pxd] [&>div>div>div>div>div>div>table>tbody>tr>td]:py-[10px]">
                <Table
                    pagination={false}
                    rowSelection={rowSelection}
                    dataSource={dataSource}
                    columns={columns}
                />
                <div className="mt-[18px] mx-2 mb-[25px]">
                    <Buttons
                        className="inline-flex items-center bg-primary/10 text-primary w-full h-[50px] text-xs font-semibold border-none rounded-[6px]"
                        size="large"
                        transparented
                    >
                        <UilPlus className="w-4 h-4 ltr:mr-1.5 rtl:ml-1.5" />{' '}
                        Add New Task
                    </Buttons>
                </div>
            </div>
        </>
    )
}

export default ProjectTaskList
