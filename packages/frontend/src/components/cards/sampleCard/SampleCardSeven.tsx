import { useState } from 'react'
import Link from 'next/link'
import { UilEllipsisH } from '@iconscout/react-unicons'
import DropDown from '@/components/dropdown'
import { Buttons } from '@/components/buttons'
import { CheckBox } from '@/components/checkbox'

interface SampleCardProps {
    item: {
        installed: boolean
        content: string
        title: string
        img: string
    }
}

function SampleCardSeven({ item }: SampleCardProps) {
    const { installed, content, title, img } = item

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
    const [state, setState] = useState({
        checked: false,
    })
    const onChange = (checked: any) => {
        setState({ ...state, checked })
    }
    return (
        <div className="relative mb-0 overflow-hidden bg-white dark:bg-white/10 rounded-10">
            <h4 className="text-[18px] font-medium mb-[18px] text-dark dark:text-white/[.87] pt-[25px] px-[25px] flex items-center gap-[20px]">
                <img
                    className="max-w-[50px]"
                    src={`/hexadash-nextjs/${img}`}
                    alt=""
                />
                <span className="text-dark dark:text-white/[.87]">{title}</span>
            </h4>
            <div className="px-[25px]">
                <p className="text-theme-gray dark:text-white/60 text-[15px]">
                    {content}
                </p>
            </div>
            <div
                className={
                    installed
                        ? 'flex justify-between items-center installed dark:border-white/10 border-top-1 p-[25px] [&.installed>.card-short-checkbox]:block [&>.card-short-actions>.content-not-installed]:hidden'
                        : 'border-regular border-top-1 p-[25px] [&>.card-short-actions>.content-installed]:hidden flex justify-end'
                }
            >
                <div className="hidden card-short-checkbox [&>label>span+span]:text-success [&>label>.ant-checkbox-checked>.ant-checkbox-inner]:bg-success [&>label>.ant-checkbox-checked>.ant-checkbox-inner]:border-success">
                    <CheckBox checked={state.checked} onChange={onChange}>
                        Installed
                    </CheckBox>
                </div>
                <div className="flex card-short-actions">
                    <div className="flex items-center content-installed content-action gap-[10px]">
                        <Buttons className="hover:bg-primary-hbr border-solid border-1 border-primary text-primary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[38px]">
                            Open
                        </Buttons>
                        <div className="more">
                            <DropDown customContent={moreContent}>
                                <Link
                                    className="text-light-extra"
                                    href="#"
                                    onClick={(e: any) => e.preventDefault()}
                                >
                                    <UilEllipsisH className="w-[24px] h-[24px] m-0 dark:text-white/60" />
                                </Link>
                            </DropDown>
                        </div>
                    </div>
                    <div className="flex items-center content-not-installed content-action gap-[10px]">
                        <Buttons
                            className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[38px]"
                            raised
                        >
                            Install
                        </Buttons>
                        <div className="more">
                            <DropDown
                                action={['click']}
                                className="block bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-4"
                                customContent={moreContent}
                            >
                                <Link className="text-light-extra" href="#">
                                    <UilEllipsisH className="w-[24px] h-[24px] m-0 dark:text-white/60" />
                                </Link>
                            </DropDown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SampleCardSeven
