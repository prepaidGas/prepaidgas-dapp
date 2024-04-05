import { Cards } from '@/components/cards/frame/cards-frame'
import {
    UilQuestionCircle,
    UilClipboardNotes,
    UilFavorite,
} from '@iconscout/react-unicons'
import { Buttons } from '../buttons'

export interface OrderCardProps {
    id: string
    manager: string
    timeframe: string
    window: string
    reward: string
    gasCost: string
    guarantee: string
}

export default function OrderCard({
    id,
    manager,
    timeframe,
    window,
    reward,
    gasCost,
    guarantee,
}: OrderCardProps) {
    return (
        <Cards headless className="max-w-[1024px] mx-auto relative mt-4">
            <div className="flex flex-col gap-3">
                <Buttons className="absolute [&>*]:fill-primary right-3 top-3 h-[40px] ml-4 bg-transparent hover:bg-primary-hbr border-solid border-1 border-primary text-primary hover:text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] ">
                    <UilFavorite />
                </Buttons>
                <Buttons className="absolute [&>*]:fill-primary right-3 bottom-3 h-[40px] ml-4 bg-transparent hover:bg-primary-hbr border-solid border-1 border-primary text-primary hover:text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] ">
                    Manage Order
                </Buttons>
                <span className="text-[#404040] dark:text-[#A4A5AA] font-bold text-2xl">{`#${id}`}</span>

                <div className="flex flex-row items-center gap-4">
                    <span className="text-[#404040] dark:text-[#A4A5AA]">
                        Manager:{' '}
                    </span>
                    <div className={`flex w-auto`}>
                        <div
                            className={`flex flex-row justify-center items-center rounded-md border border-solid gap-2 [&>*]:fill-primary border-primary px-2 py-1 ${
                                true ? 'cursor-pointer' : 'cursor-default'
                            } `}
                        >
                            {true && <UilClipboardNotes />}
                            <span className="text-primary">
                                {'0x236...21E8f'}
                            </span>
                        </div>
                    </div>
                </div>

                <span className="text-[#404040] dark:text-[#A4A5AA]">
                    Execution timeframe: {timeframe}
                </span>

                <span className="text-[#404040] dark:text-[#A4A5AA]">
                    Execution window: {window}
                </span>

                <div className="flex flex-row items-center gap-4">
                    <span className="text-[#404040] dark:text-[#A4A5AA]">
                        Reward:
                    </span>
                    <div className={`flex w-auto`}>
                        <div
                            className={`flex flex-row justify-center items-center rounded-md border border-solid gap-2 [&>*]:fill-primary border-primary px-2 py-1 ${
                                true ? 'cursor-pointer' : 'cursor-default'
                            } `}
                        >
                            {true && <UilClipboardNotes />}
                            <span className="text-primary">{reward}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row items-center gap-4">
                    <span className="text-[#404040] dark:text-[#A4A5AA]">
                        Gas Cost:
                    </span>
                    <div className={`flex w-auto`}>
                        <div
                            className={`flex flex-row justify-center items-center rounded-md border border-solid gap-2 [&>*]:fill-primary border-primary px-2 py-1 ${
                                true ? 'cursor-pointer' : 'cursor-default'
                            } `}
                        >
                            {true && <UilClipboardNotes />}
                            <span className="text-primary">{gasCost}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row items-center gap-4">
                    <span className="text-[#404040] dark:text-[#A4A5AA]">
                        Guarantee:{' '}
                    </span>
                    <div className={`flex w-auto`}>
                        <div
                            className={`flex flex-row justify-center items-center rounded-md border border-solid gap-2 [&>*]:fill-primary border-primary px-2 py-1 ${
                                true ? 'cursor-pointer' : 'cursor-default'
                            } `}
                        >
                            {true && <UilClipboardNotes />}
                            <span className="text-primary">{guarantee}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Cards>
    )
}
