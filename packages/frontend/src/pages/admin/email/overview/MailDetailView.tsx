import { useEffect, useState } from 'react'
import moment from 'moment'
import Link from 'next/link'
import {
    UilArrowLeft,
    UilAngleUp,
    UilAngleDown,
    UilRedo,
    UilArchive,
    UilTrash,
    UilPrint,
    UilImport,
    UilPaperclip,
    UilShareAlt,
    UilEllipsisV,
    UilCornerUpLeft,
    UilCornerUpRight,
    UilExclamationOctagon,
    UilBookOpen,
    UilFolder,
} from '@iconscout/react-unicons'
import { useRouter } from 'next/router'
import { Tooltip, Row, Col } from 'antd'
import FontAwesome from 'react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import DropDown from '@/components/dropdown'
import Heading from '@/components/heading'
import { filterSinglePage, onStarUpdate } from '@/redux/email/actionCreator'

import MailComposer from './MailComposer'

function Single() {
    const router = useRouter()
    const { asPath } = router
    const emailID = asPath.split('/')[3]
    const path = '/admin/email'

    const dispatch = useDispatch()

    const [state, setState] = useState({
        replyMessage: 0,
        replyBox: false,
        forwardBox: false,
        replyLoading: false,
        forwardLoading: false,
    })

    const handleReplyBox = () => {
        if (!state.replyLoading) {
            setState({
                ...state,
                replyBox: !state.replyBox,
                forwardBox: false,
                replyLoading: true,
                forwardLoading: false,
            })
        }
    }

    const handleForwardBox = () => {
        if (!state.forwardLoading) {
            setState({
                ...state,
                forwardBox: !state.forwardBox,
                replyBox: false,
                forwardLoading: true,
                replyLoading: false,
            })
        }
    }

    useEffect(() => {
        if (filterSinglePage) {
            const id = parseInt(emailID, 10)
            //@ts-ignore
            dispatch(filterSinglePage(id))
        }
    }, [router])

    const replyMail = async (replyMessage: any) => {
        // hit replyMail api
        setState({ ...state, replyMessage })
    }

    const onStaredChange = (id: any) => {
        //@ts-ignore
        dispatch(onStarUpdate(id))
    }

    const email = useSelector((state: any) => state.emailSingle.data[0])
    const { id, subject, userName, body, stared, to, from, img, type } = email

    function ReplayMessage() {
        return (
            <>
                <div className="flex gap-5 ssm:flex-col">
                    <img
                        className="w-[50px] h-[50px] rounded-full object-cover"
                        src="/hexadash-nextjs/img/email/2.png"
                        alt=""
                    />
                    <MailComposer
                        replay
                        defaultTag="Alice Freeman"
                        onSend={() => replyMail("Your reply message")}
                    />
                </div>
            </>
        )
    }

    function ForwardMessage() {
        return (
            <>
                <div className="flex gap-5 ssm:flex-col">
                    <img
                        className="w-[50px] h-[50px] rounded-full object-cover"
                        src="/hexadash-nextjs/img/email/1.png"
                        alt=""
                    />
                    <MailComposer
                        replay
                        defaultTag="Vincent Porter"
                        onSend={() => replyMail("Your reply message")}
                    />
                </div>
            </>
        )
    }

    const moreContent = [
        {
            key: '1',
            label: (
                <div className="flex gap-x-[50px]">
                    <span className="min-w-[40px] text-[#9299b8] dark:text-white/60">
                        From:
                    </span>{' '}
                    <span className="text-body dark:text-white/60">{from}</span>{' '}
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div className="flex gap-x-[50px]">
                    <span className="min-w-[40px] text-[#9299b8] dark:text-white/60">
                        To:
                    </span>
                    <span className="text-body dark:text-white/60">{to}</span>{' '}
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div className="flex gap-x-[50px]">
                    <span className="min-w-[40px] text-[#9299b8] dark:text-white/60">
                        CC:
                    </span>
                    <span className="text-body dark:text-white/60">
                        example@gamil.com
                    </span>{' '}
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div className="flex gap-x-[50px]">
                    <span className="min-w-[40px] text-[#9299b8] dark:text-white/60">
                        Date:
                    </span>
                    <span className="text-body dark:text-white/60">
                        {moment(id).format('LLL')}
                    </span>
                </div>
            ),
        },
    ]

    return (
        <div className="bg-white dark:bg-white/10 rounded-[10px]">
            <div className="flex items-center ssm:flex-col justify-between ssm:justify-center px-[25px] py-[13px] border-b border-regular dark:border-white/10">
                <div className="flex items-center">
                    <Link
                        href={`${path}/inbox`}
                        className="inline-flex items-center justify-center bg-transparent text-light-extra dark:text-white/60 w-[38px] h-[38px] rounded-full hover:bg-primary-transparent hover:text-primary dark:hover:text-primary"
                    >
                        <UilArrowLeft className="w-4 h-4" />
                    </Link>
                    <Tooltip placement="bottom" title="Refresh">
                        <Link
                            onClick={() => router.reload()}
                            href="#0"
                            className="inline-flex items-center justify-center bg-transparent text-light-extra dark:text-white/60 w-[38px] h-[38px] rounded-full hover:bg-primary-transparent hover:text-primary dark:hover:text-primary"
                        >
                            <UilRedo className="w-4 h-4" />
                        </Link>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Archive">
                        <Link
                            href="#"
                            className="inline-flex items-center justify-center bg-transparent text-light-extra dark:text-white/60 w-[38px] h-[38px] rounded-full hover:bg-primary-transparent hover:text-primary dark:hover:text-primary"
                        >
                            <UilArchive className="w-4 h-4" />
                        </Link>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Info">
                        <Link
                            href="#"
                            className="inline-flex items-center justify-center bg-transparent text-light-extra dark:text-white/60 w-[38px] h-[38px] rounded-full hover:bg-primary-transparent hover:text-primary dark:hover:text-primary"
                        >
                            <UilExclamationOctagon className="w-4 h-4" />
                        </Link>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Delete">
                        <Link
                            href="#"
                            className="inline-flex items-center justify-center bg-transparent text-light-extra dark:text-white/60 w-[38px] h-[38px] rounded-full hover:bg-primary-transparent hover:text-primary dark:hover:text-primary"
                        >
                            <UilTrash className="w-4 h-4" />
                        </Link>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Read">
                        <Link
                            href="#"
                            className="inline-flex items-center justify-center bg-transparent text-light-extra dark:text-white/60 w-[38px] h-[38px] rounded-full hover:bg-primary-transparent hover:text-primary dark:hover:text-primary"
                        >
                            <UilBookOpen className="w-4 h-4" />
                        </Link>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Folder">
                        <Link
                            href="#"
                            className="inline-flex items-center justify-center bg-transparent text-light-extra dark:text-white/60 w-[38px] h-[38px] rounded-full hover:bg-primary-transparent hover:text-primary dark:hover:text-primary"
                        >
                            <UilFolder className="w-4 h-4" />
                        </Link>
                    </Tooltip>
                </div>
                <div className="flex items-center py-3">
                    <span className="text-light dark:text-white/60">
                        1 - 50 of 235
                    </span>
                </div>
            </div>
            <div className="p-[25px]">
                <Row gutter={15}>
                    <Col>
                        <div className="px-[30px] ssm:px-0 border-b border-regular dark:border-white/10">
                            <div className="flex items-center justify-between flex-wrap gap-[15px]">
                                <Heading as="h2">
                                    {subject}
                                    <span className="inline-flex items-center bg-primary-transparent text-primary h-[22px] ltr:ml-2.5 rtl:mr-2.5 px-1.5 text-xs font-normal capitalize rounded-[3px]">
                                        {type}
                                    </span>
                                </Heading>

                                <div className="flex items-center">
                                    <Link
                                        href="#"
                                        className="inline-flex items-center justify-center flex-col bg-transparent text-light-extra dark:text-white/60 w-[38px] h-[38px] rounded-full hover:bg-primary-transparent hover:text-primary"
                                    >
                                        <UilAngleUp className="w-4 h-4" />
                                        <UilAngleDown className="w-4 h-4" />
                                    </Link>

                                    <Link
                                        href="#"
                                        className="inline-flex items-center justify-center bg-transparent text-light-extra dark:text-white/60 w-[38px] h-[38px] rounded-full hover:bg-primary-transparent hover:text-primary dark:hover:text-primary"
                                    >
                                        <UilPrint className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-center justify-between sm:flex-wrap gap-[15px]">
                                <div className="flex items-center gap-5 mt-5">
                                    <img
                                        className="min-2xl:w-[60px] min-2xl:h-[60px] w-[50px] h-[50px] rounded-full object-cover"
                                        src={`/hexadash-nextjs/${img}`}
                                        alt=""
                                    />
                                    <div>
                                        <Heading
                                            as="h4"
                                            className="mb-1 text-base font-medium text-dark dark:text-white/[.87]"
                                        >
                                            {userName}
                                        </Heading>
                                        <DropDown
                                            placement="bottom"
                                            className="bg-white dark:bg-[#010413] py-1 shadow-[0_5px_30px_#9299b820] dark:dark:shadow-[0_0_30px_#9299B810] rounded-[5px] [&>ul]:px-[25px] [&>ul]:py-[10px] [&>ul]:m-0 [&>ul]:gap-y-3 [&>ul]:border-none"
                                            customContent={moreContent}
                                        >
                                            <Link
                                                href="#"
                                                className="flex items-center gap-[5px] text-light dark:text-white/60"
                                            >
                                                To {to}
                                                <UilAngleDown className="w-[18px] h-[18px]" />
                                            </Link>
                                        </DropDown>
                                    </div>
                                </div>

                                <div className="flex items-center xs:flex-wrap xs:gap-[10px]">
                                    <span className="text-light dark:text-white/60 min-xs:ltr:mr-[15px] min-xs:rtl:ml-[15px]">
                                        <UilPaperclip className="w-4 h-4" />
                                    </span>
                                    <span className="text-light dark:text-white/60 min-xs:ltr:mr-[15px] min-xs:rtl:ml-[15px]">
                                        {' '}
                                        {moment(id).format('LLL')}{' '}
                                    </span>
                                    <Link
                                        className={`min-xs:px-[15px] ${
                                            stared
                                                ? 'text-warning'
                                                : 'text-light dark:text-white/60'
                                        }`}
                                        onClick={() => onStaredChange(id)}
                                        href="#"
                                    >
                                        <FontAwesome
                                            name="star-o"
                                            className="w-4 h-4"
                                        />
                                    </Link>
                                    <Link
                                        href="#"
                                        className="min-ssm:px-[15px] text-light dark:text-white/60"
                                    >
                                        <UilCornerUpLeft className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        href="#"
                                        className="min-ssm:px-[15px] text-light dark:text-white/60"
                                    >
                                        <UilEllipsisV className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-[22px] min-sm:ltr:pl-[82px] min-sm:rtl:pr-[82px]">
                                <span className="inline-block mb-10 sm:mb-5 text-body dark:text-white/60">
                                    Hello Adam,
                                </span>
                                <p className="min-sm:mb-[55px] sm:mb-[30px] text-body dark:text-white/60">
                                    {body}
                                </p>

                                <Heading
                                    as="h6"
                                    className="text-dark dark:text-white/[.87] text-[15px] font-normal leading-[30px]"
                                >
                                    Best Regards <br /> {userName}
                                </Heading>
                            </div>

                            <div className="flex flex-wrap mt-11 xs:mt-[15px] -mx-[5px] min-sm:ltr:pl-[82px] min-sm:rtl:pr-[82px]">
                                <figure className="group relative p-2.5 mb-[30px] mx-[5px] border dark:border-white/10 rounded-[10px]">
                                    <div className="relative before:absolute ltr:before:left-0 rtl:before:right-0 before:top-0 before:w-full before:h-0 before:bg-dark-transparent before:rounded-[10px] before:transition-all group-hover:before:h-full">
                                        <img
                                            src="/hexadash-nextjs/img/email/2.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className="gap-x-[10px] absolute top-[80px] left-1/2 -translate-x-1/2 opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible content-['' ]">
                                        <Link
                                            className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#ffffff20]"
                                            href="#"
                                        >
                                            <UilImport className="w-[14px] h-[14px] text-white" />
                                        </Link>
                                        <Link
                                            className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#ffffff20]"
                                            href="#"
                                        >
                                            <UilShareAlt className="w-[14px] h-[14px] text-white" />
                                        </Link>
                                    </div>
                                    <figcaption className="mt-[10px]">
                                        <Heading
                                            as="h4"
                                            className="mb-0 text-dark dark:text-white/[.87] text-[13px] font-semibold"
                                        >
                                            Attached.jpg
                                        </Heading>
                                        <p className="mb-0 text-xs text-body dark:text-white/60">
                                            256.5 KB
                                        </p>
                                    </figcaption>
                                </figure>

                                <figure className="group relative p-2.5 mb-[30px] mx-[5px] border dark:border-white/10 rounded-[10px]">
                                    <div className="relative before:absolute ltr:before:left-0 rtl:before:right-0 before:top-0 before:w-full before:h-0 before:bg-dark-transparent before:rounded-[10px] before:transition-all group-hover:before:h-full">
                                        <img
                                            src="/hexadash-nextjs/img/email/1.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className="gap-x-[10px] absolute top-[80px] left-1/2 -translate-x-1/2 opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible">
                                        <Link
                                            className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#ffffff20]"
                                            href="#"
                                        >
                                            <UilImport className="w-[14px] h-[14px] text-white dark:text-white/[.87]" />
                                        </Link>
                                        <Link
                                            className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#ffffff20]"
                                            href="#"
                                        >
                                            <UilShareAlt className="w-[14px] h-[14px] text-white dark:text-white/[.87]" />
                                        </Link>
                                    </div>
                                    <figcaption className="mt-[10px]">
                                        <Heading
                                            as="h4"
                                            className="mb-0 text-dark dark:text-white/[.87] text-[13px] font-semibold"
                                        >
                                            Attached.jpg
                                        </Heading>
                                        <p className="mb-0 text-xs text-body dark:text-white/60">
                                            256.5 KB
                                        </p>
                                    </figcaption>
                                </figure>

                                <figure className="group relative p-2.5 mb-[30px] mx-[5px] border dark:border-white/10 rounded-[10px]">
                                    <div className="relative before:absolute ltr:before:left-0 rtl:before:right-0 before:top-0 before:w-full before:h-0 before:bg-dark-transparent before:rounded-[10px] before:transition-all group-hover:before:h-full">
                                        <img
                                            src="/hexadash-nextjs/img/email/3.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className="gap-x-[10px] absolute top-[80px] left-1/2 -translate-x-1/2 opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible">
                                        <Link
                                            className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#ffffff20]"
                                            href="#"
                                        >
                                            <UilImport className="w-[14px] h-[14px] text-white dark:text-white/[.87]" />
                                        </Link>
                                        <Link
                                            className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#ffffff20]"
                                            href="#"
                                        >
                                            <UilShareAlt className="w-[14px] h-[14px] text-white dark:text-white/[.87]" />
                                        </Link>
                                    </div>
                                    <figcaption className="mt-[10px]">
                                        <Heading
                                            as="h4"
                                            className="mb-0 text-dark dark:text-white/[.87] text-[13px] font-semibold"
                                        >
                                            Attached.zip
                                        </Heading>
                                        <p className="mb-0 text-xs text-body dark:text-white/60">
                                            256.5 KB
                                        </p>
                                    </figcaption>
                                </figure>

                                <figure className="group relative p-2.5 mb-[30px] mx-[5px] border dark:border-white/10 rounded-[10px]">
                                    <div className="relative before:absolute ltr:before:left-0 rtl:before:right-0 before:top-0 before:w-full before:h-0 before:bg-dark-transparent before:rounded-[10px] before:transition-all group-hover:before:h-full">
                                        <img
                                            src="/hexadash-nextjs/img/email/4.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className="gap-x-[10px] absolute top-[80px] left-1/2 -translate-x-1/2 opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible">
                                        <Link
                                            className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#ffffff20]"
                                            href="#"
                                        >
                                            <UilImport className="w-[14px] h-[14px] text-white dark:text-white/[.87]" />
                                        </Link>
                                        <Link
                                            className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#ffffff20]"
                                            href="#"
                                        >
                                            <UilShareAlt className="w-[14px] h-[14px] text-white dark:text-white/[.87]" />
                                        </Link>
                                    </div>
                                    <figcaption className="mt-[10px]">
                                        <Heading
                                            as="h4"
                                            className="mb-0 text-dark dark:text-white/[.87] text-[13px] font-semibold"
                                        >
                                            Attached.pdf
                                        </Heading>
                                        <p className="mb-0 text-xs text-body dark:text-white/60">
                                            256.5 KB
                                        </p>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

            <Row gutter={15}>
                <Col xs={24}>
                    <div className="flex items-start justify-between flex-wrap gap-5 mb-[50px] p-[30px] xs:pt-0 shadow-[0_15px_40px_rgba(116,116,116,0.06)]">
                        <figure className="flex justify-between flex-wrap gap-[20px]">
                            <img
                                className="w-[50px] h-[50px] rounded-full object-cover"
                                src="/hexadash-nextjs/img/email/2.png"
                                alt=""
                            />
                            <figcaption>
                                <Heading
                                    as="h6"
                                    className="mb-3 font-medium text-dark dark:text-white/[.87]"
                                >
                                    Reynante Labares
                                </Heading>
                                <p className="mb-0 text-body dark:text-white/60">
                                    Lorem ipsum dolor sit amet, consetetur
                                    sadipscing elitr, sed diam nonumy eirmod
                                    tempor dolor...
                                </p>
                            </figcaption>
                        </figure>
                        <div className="flex items-center flex-warp xs:gap-:[10px]">
                            <span className="text-light dark:text-white/60 ltr:mr-[15px] rtl:ml-[15px]">
                                {' '}
                                {moment(id).format('LLL')}{' '}
                            </span>
                            <Link
                                className={`px-[15px] xs:px-[5px] ${
                                    stared
                                        ? 'text-warning'
                                        : 'text-light dark:text-white/60'
                                }`}
                                onClick={() => onStaredChange(id)}
                                href="#"
                            >
                                <FontAwesome
                                    name="star-o"
                                    className="w-4 h-4"
                                />
                            </Link>
                            <Link
                                href="#"
                                className="px-[15px] xs:px-[5px] text-light dark:text-white/60"
                            >
                                <UilEllipsisV className="w-4 h-4" />
                            </Link>
                            <Link
                                href="#"
                                className="px-[15px] xs:px-[5px] text-light dark:text-white/60"
                            >
                                <UilCornerUpLeft className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                    <nav className="min-xs:ltr:pl-[100px] min-xs:rtl:pr-[100px]">
                        <ul className="flex items-center flex-wrap xs:justify-center gap-2.5 mb-0">
                            <li>
                                <Link
                                    href="#"
                                    onClick={handleReplyBox}
                                    className={`inline-flex items-center h-10 px-[20px] gap-x-1 text-body dark:text-white/60 hover-text-primary border dark:border-white/10 rounded ${
                                        state.replyLoading
                                            ? 'pointer-events-none opacity-50'
                                            : ''
                                    }`}
                                >
                                    <UilCornerUpLeft className="w-4 h-4" />{' '}
                                    Reply
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    onClick={handleForwardBox}
                                    className={`inline-flex items-center h-10 px-[20px] gap-x-1 text-body dark:text-white/60 hover-text-primary border dark:border-white/10 rounded ${
                                        state.forwardLoading
                                            ? 'pointer-events-none opacity-50'
                                            : ''
                                    }`}
                                >
                                    <UilCornerUpRight className="w-4 h-4" />{' '}
                                    Forward
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="my-[30px] px-[30px]">
                        {state.replyBox ? <ReplayMessage /> : ''}
                        {state.forwardBox ? <ForwardMessage /> : ''}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Single
