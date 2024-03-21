import React from 'react'
import Link from 'next/link'
import { Progress, Tag } from 'antd'
import { UilEllipsisH } from '@iconscout/react-unicons'
import DropDown from '@/components/dropdown'
import { textRefactor } from '@/components/utilities'

const moreContent = [
    {
        key: '1',
        label: (
            <Link
                className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
                href="#"
            >
                Total Income
            </Link>
        ),
    },
    {
        key: '2',
        label: (
            <Link
                className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
                href="#"
            >
                Total Expense
            </Link>
        ),
    },
    {
        key: '3',
        label: (
            <Link
                className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
                href="#"
            >
                Total Tax
            </Link>
        ),
    },
    {
        key: '4',
        label: (
            <Link
                className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
                href="#"
            >
                Net Profit
            </Link>
        ),
    },
]

interface Project {
    id: number;
    title: string;
    status: string;
    content: string; 
    percentage: number;
  }
  
  interface GridCardProps {
    value: Project;
  }

const GridCard: React.FC<GridCardProps> = ({ value }) => {
    const { id, title, status, content, percentage } = value;

    return (
        <>
            <div className="bg-white dark:bg-white/10 rounded-[10px]">
                <div className="pt-[30px] px-[30px]">
                    <div className="flex items-start justify-between">
                        <h1 className="flex flex-wrap items-center -m-0.5 text-base">
                            <Link
                                href={`/admin/project/${id}`}
                                className="m-0.5 ltr:mr-[11px] rtl:ml-[11px] text-dark dark:text-white/[.87]"
                            >
                                {title}
                            </Link>
                            <Tag
                                className={`text-white border-none ltr:mr-0 rtl:ml-0 uppercase text-[10px] ${
                                    status === 'early'
                                        ? 'bg-primary'
                                        : status === 'progress'
                                        ? 'bg-danger'
                                        : status === 'late'
                                        ? 'bg-warning'
                                        : status === 'complete'
                                        ? 'bg-success'
                                        : 'bg-dark'
                                } `}
                            >
                                {status}
                            </Tag>
                        </h1>
                        <DropDown customContent={moreContent}>
                            <Link
                                href="#"
                                className="text-light-extra dark:text-white/60"
                            >
                                <UilEllipsisH />
                            </Link>
                        </DropDown>
                    </div>
                    <p className="text-body dark:text-white/60 mt-[15px] mb-[25px]">
                        {textRefactor(content, 13)}
                    </p>
                    <div className="flex items-center mb-[15px] gap-x-[30px]">
                        <div className="flex flex-col">
                            <span className="text-xs mb-0.5 text-body dark:text-white/60">
                                Start Date
                            </span>
                            <strong className="font-medium text-body dark:text-white/60">
                                26 Dec 2019
                            </strong>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs mb-0.5 text-body dark:text-white/60">
                                Deadline
                            </span>
                            <strong className="font-medium text-body dark:text-white/60">
                                18 Mar 2020
                            </strong>
                        </div>
                    </div>
                    <Progress
                        percent={status === 'complete' ? 100 : percentage}
                        size="small"
                        className=" ltr:[&>span.ant-progress-text]:ml-2 rtl:[&>span.ant-progress-text]:mr-2 [&>span.ant-progress-text]:text-body dark:[&>span.ant-progress-text]:text-white/60 [&>span.ant-progress-text]:text-xs [&>span.ant-progress-text]:font-medium [&.ant-progress-status-success>.ant-progress-text>span]:text-success"
                    />
                    <p className="mt-0.5 text-body dark:text-white/60 text-xs">
                        12/15 Task Completed
                    </p>
                </div>
                <div className="pt-4 px-[30px] pb-[25px] mt-[17px] border-t border-regular dark:border-white/10">
                    <p className="mb-4 text-sm text-body dark:text-white/60">
                        Assigned To
                    </p>
                    <ul className="flex items-center flex-wrap -m-[3px]">
                        <li className="m-[3px]">
                            <img
                                className="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                                src="/hexadash-nextjs/img/users/1.png"
                                alt=""
                            />
                        </li>
                        <li className="m-[3px]">
                            <img
                                className="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                                src="/hexadash-nextjs/img/users/2.png"
                                alt=""
                            />
                        </li>
                        <li className="m-[3px]">
                            <img
                                className="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                                src="/hexadash-nextjs/img/users/3.png"
                                alt=""
                            />
                        </li>
                        <li className="m-[3px]">
                            <img
                                className="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                                src="/hexadash-nextjs/img/users/4.png"
                                alt=""
                            />
                        </li>
                        <li className="m-[3px]">
                            <img
                                className="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                                src="/hexadash-nextjs/img/users/5.png"
                                alt=""
                            />
                        </li>
                        <li className="m-[3px]">
                            <img
                                className="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                                src="/hexadash-nextjs/img/users/6.png"
                                alt=""
                            />
                        </li>
                        <li className="m-[3px]">
                            <img
                                className="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                                src="/hexadash-nextjs/img/users/7.png"
                                alt=""
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default GridCard
