import React from 'react'
import Link from 'next/link'
import {
    UilEllipsisH,
} from '@iconscout/react-unicons'

import DropDown from '@/components/dropdown'

interface SampleCardProps {
    item: {
        id: number
        content: string
        title: string
        img: string
        className: string
    }
    actions?: React.ReactNode; 
}

function SampleCardSix({ item }: SampleCardProps) {
    const { content, title, img, className } = item

    const moreContent = [
        {
            key: '1',
            label: (
                <Link
                    className="group flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm gap-[10px] [&>svg]:w-[14px] [&>svg]:h-[14px] [&>svg]:text-light-extra dark:[&>svg]:text-white/60"
                    href="#"
                >
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
                    Delete
                </Link>
            ),
        },
    ]
    return (
        <figure className="mb-0 p-[25px] bg-white dark:bg-white/10 shadow-[0_5px_20px_rgba(173,181,217,0.01)] flex m-0 relative gap-[20px] rounded-10">
            <div
                className={`w-[60px] h-[60px] rounded-[12px] flex items-center justify-center bg-${className}`}
            >
                <img src={`/hexadash-nextjs/${img}`} alt="" />
            </div>
            <figcaption>
                <h2 className="text-dark dark:text-white/[.87] text-[20px] font-semibold mb-0">
                    {title}
                </h2>
                <p className="text-[14px] text-dark dark:text-white/[.87] mb-0">
                    {content}
                </p>
            </figcaption>
            <div className="flex-1 text-end">
                <DropDown customContent={moreContent}>
                    <Link
                        className="absolute top-[10px] bg-transparent border-none text-light-extra dark:text-white/60 end-[15px] min-w-[30px] min-h-[30px] inline-flex items-center justify-center"
                        href="#"
                    >
                        <UilEllipsisH className="w-[24px] h-[24px] m-0 dark:text-white/60" />
                    </Link>
                </DropDown>
            </div>
        </figure>
    )
}

export default SampleCardSix
