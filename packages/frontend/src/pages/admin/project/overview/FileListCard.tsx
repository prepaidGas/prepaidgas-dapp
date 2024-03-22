import React from 'react'
import Link from 'next/link'
import {
    UilEye,
    UilEdit,
    UilTrashAlt,
    UilEllipsisH,
} from '@iconscout/react-unicons'
import DropDown from '@/components/dropdown'
import filesData from '@/demoData/filesData.json'
const moreContent = [
    {
        key: '1',
        label: (
            <Link
                className="group flex items-center text-theme-gray dark:text-white/60 bg-white hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm gap-[10px] [&>svg]:w-[14px] [&>svg]:h-[14px] [&>svg]:text-light-extra dark:[&>svg]:text-white/60"
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
                className="group flex items-center text-theme-gray dark:text-white/60 bg-white hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm gap-[10px] [&>svg]:w-[14px] [&>svg]:h-[14px] [&>svg]:text-light-extra dark:[&>svg]:text-white/60"
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
                className="group flex items-center text-theme-gray dark:text-white/60 bg-white hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm gap-[10px] [&>svg]:w-[14px] [&>svg]:h-[14px] [&>svg]:text-light-extra dark:[&>svg]:text-white/60"
                href="#"
            >
                <UilTrashAlt className="group-hover:text-primary" />
                Delete
            </Link>
        ),
    },
]

interface FileListCardProps {
    title?: string;
}

const FileListCard: React.FC<FileListCardProps> = ({ title }) => {
    return (
        <div className="bg-white dark:bg-white/10 shadow-[0_5px_20px_rgba(173,181,217,0.01)] rounded-10 relative mb-[25px]">
            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b-1  flex items-center justify-between">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    {title}
                </h1>
            </div>
            <div className="min-h-[380px] flex flex-col gap-y-[18px] p-[25px]">
                {filesData.map((file, index) => (
                    <div
                        className="flex items-center justify-between file-list__single"
                        key={index}
                    >
                        <div className="flex items-center w-[50%] gap-x-[16px]">
                            <img
                                className="max-w-[42px]"
                                src={`/hexadash-nextjs/img/files/${file.logo}`}
                                alt="File Logo"
                            />
                            <div>
                                <span className="text-[14px] font-medium text-dark dark:text-white/[.87] block leading-[1.42]">
                                    {file.title}
                                </span>
                                <span className="my-[2px] text-theme-gray dark:text-white/60 block text-[12px] leading-[1.42]">
                                    {file.size}
                                </span>
                                <span className="inline-flex text-[12px] leading-[1.42] gap-[10px]">
                                    {file.actions.map((action, ind) => (
                                        <Link
                                            className="font-medium text-primary"
                                            href={action.url}
                                            key={ind}
                                        >
                                            {action.label}
                                        </Link>
                                    ))}
                                </span>
                            </div>
                        </div>
                        <DropDown customContent={moreContent}>
                            <button className="text-light-extra dark:text-white/60">
                                <UilEllipsisH className="w-[20px] h-[20px] m-0 dark:text-white/60" />
                            </button>
                        </DropDown>
                    </div>
                ))}
            </div>
        </div>
    )
}

FileListCard.defaultProps = {
    title: 'File',
}

export default FileListCard
