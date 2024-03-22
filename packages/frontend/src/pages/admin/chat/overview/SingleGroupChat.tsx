import React, { useState, useEffect } from 'react'
import { Upload, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import {
    UilMessage,
    UilPaperclip,
    UilCamera,
    UilSmile,
    UilEllipsisH,
    UilClosedCaptioningSlash,
    UilTrashAlt,
    UilUsersAlt,
    UilPlus,
} from '@iconscout/react-unicons'
import moment from 'moment'
import Picker from 'emoji-picker-react'
import { SmileOutlined, MoreOutlined } from '@ant-design/icons'
import Heading from '@/components/heading'
import { Buttons } from '@/components/buttons'
import { updateGroupChat } from '@/redux/chat/actionCreator'
import { Cards } from '@/components/cards/frame/cards-frame'
import DropDown from '@/components/dropdown'

function SingleGroupChat({ match }: any) {
    const dispatch = useDispatch()
    const { rtl, chat } = useSelector((state: any) => {
        return {
            rtl: state.ChangeLayoutMode.rtlData,
            chat: state.chatSingle.data,
        }
    })

    const [state, setState] = useState({
        chatData: chat,
        me: 'sovware@gmail.com',
        singleContent: chat[0].content,
        name: chat[0].groupName,
        inputValue: '',
        fileList: [],
        fileList2: [],
    })
    const [pickerShow, setPickerShow] = useState(false)
    const { singleContent, name, me, inputValue } = state

    useEffect(() => {
        let unmounted = false
        if (!unmounted) {
            setState({
                chatData: chat,
                singleContent: chat[0].content,
                name: chat[0].groupName,
                inputValue,
                me: 'sovware@gmail.com',
                fileList: [],
                fileList2: [],
            })
        }
        return () => {
            unmounted = true
        }
    }, [match, chat, inputValue])

    const handleChange = (e: any) => {
        setState({
            ...state,
            inputValue: e.target.value,
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()

        const pushcontent = {
            content: inputValue,
            time: new Date().getTime(),
            seen: false,
            reaction: false,
            email: me,
            userName: 'Ibrahim Riaz',
        }
        //@ts-ignore
        dispatch(updateGroupChat(parseInt(match.params.id, 10), pushcontent))
        setState({
            ...state,
            singleContent: [...singleContent, pushcontent],
            inputValue: '',
        })
    }

    const onEmojiClick = (event: any, emojiObject: any) => {
        setState({ ...state, inputValue: inputValue + emojiObject.emoji })
    }

    const onPickerShow = () => {
        setPickerShow(!pickerShow)
    }

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        listType: 'picture-card',
        onChange(info: any) {
            if (info.file.status !== 'uploading') {
                setState({
                    ...state,
                    fileList: info.fileList,
                })
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`)
            }
        },
    }

    const attachment = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info: any) {
            if (info.file.status !== 'uploading') {
                setState({
                    ...state,
                    fileList2: info.fileList,
                })
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`)
            }
        },
    }

    const createInbox = [
        {
            key: '1',
            label: (
                <Link
                    href="#"
                    className="flex items-center px-3 py-1.5 gap-2 text-body dark:text-white/60 text-sm hover:bg-primary-transparent hover:text-primary dark:hover:text-white/[.87]"
                >
                    <UilUsersAlt className="w-[14px] h-[14px]" />
                    <span>Create new group</span>
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link
                    href="#"
                    className="flex items-center px-3 py-1.5 gap-2 text-body dark:text-white/60 text-sm hover:bg-primary-transparent hover:text-primary dark:hover:text-white/[.87]"
                >
                    <UilTrashAlt className="w-[14px] h-[14px]" />
                    <span>Delete conversation</span>
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link
                    href="#"
                    className="flex items-center px-3 py-1.5 gap-2 text-body dark:text-white/60 text-sm hover:bg-primary-transparent hover:text-primary dark:hover:text-white/[.87]"
                >
                    <UilClosedCaptioningSlash className="w-[14px] h-[14px]" />
                    <span>Block & Report</span>
                </Link>
            ),
        },
    ]
    const emojis = [
        {
            key: '1',
            label: (
                <Link href="#" className="block px-[7px] py-1 text-[20px]">
                    <span role="img">&#127773;</span>
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link href="#" className="block px-[7px] py-1 text-[20px]">
                    <span role="img">&#128116;</span>
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link href="#" className="block px-[7px] py-1 text-[20px]">
                    <span role="img">&#128127;</span>
                </Link>
            ),
        },
        {
            key: '4',
            label: (
                <Link href="#" className="block px-[7px] py-1 text-[20px]">
                    <span role="img">&#128151;</span>
                </Link>
            ),
        },
        {
            key: '5',
            label: (
                <Link href="#" className="block px-[7px] py-1 text-[20px]">
                    <span role="img">&#128400;</span>
                </Link>
            ),
        },
    ]
    const settings = [
        {
            key: '1',
            label: (
                <Link
                    href="#"
                    className="block px-6 py-1 text-sm text-body dark:text-white/60 hover:bg-primary-transparent hover:text-primary"
                >
                    Copy
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link
                    href="#"
                    className="block px-6 py-1 text-sm text-body dark:text-white/60 hover:bg-primary-transparent hover:text-primary"
                >
                    Edit
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link
                    href="#"
                    className="block px-6 py-1 text-sm text-body dark:text-white/60 hover:bg-primary-transparent hover:text-primary"
                >
                    Quote
                </Link>
            ),
        },
        {
            key: '4',
            label: (
                <Link
                    href="#"
                    className="block px-6 py-1 text-sm text-body dark:text-white/60 hover:bg-primary-transparent hover:text-primary"
                >
                    Forward
                </Link>
            ),
        },
        {
            key: '5',
            label: (
                <Link
                    href="#"
                    className="block px-6 py-1 text-sm text-body dark:text-white/60 hover:bg-primary-transparent hover:text-primary"
                >
                    Remove
                </Link>
            ),
        },
    ]

    return (
        <>
            <div
                className={`${
                    pickerShow
                        ? 'block fixed start-0 top-0 w-full h-full bg-[#11121760] z-998'
                        : 'none'
                }`}
                onClick={() => setPickerShow(false)}
                aria-hidden="true"
            />
            <>
                <Cards
                    className="ant-card-head-px-25 ant-card-title-py-16 ant-card-body-px-0 ant-card-body-py-25"
                    title={
                        <div className="flex py-2">
                            <Heading as="h5">{name}</Heading>
                            <div className="flex items-center justify-center w-full gap-x-1">
                                <Link href="#">
                                    <img
                                        className="max-w-[30px]"
                                        src="/hexadash-nextjs/img/avatar/chat-auth.png"
                                        alt=""
                                    />
                                </Link>
                                <Link href="#">
                                    <img
                                        className="max-w-[30px]"
                                        src="/hexadash-nextjs/img/avatar/chat-auth.png"
                                        alt=""
                                    />
                                </Link>
                                <Link href="#">
                                    <img
                                        className="max-w-[30px]"
                                        src="/hexadash-nextjs/img/avatar/chat-auth.png"
                                        alt=""
                                    />
                                </Link>
                                <Link href="#">
                                    <img
                                        className="max-w-[30px]"
                                        src="/hexadash-nextjs/img/avatar/chat-auth.png"
                                        alt=""
                                    />
                                </Link>
                                <Link href="#">
                                    <img
                                        className="max-w-[30px]"
                                        src="/hexadash-nextjs/img/avatar/chat-auth.png"
                                        alt=""
                                    />
                                </Link>
                                <Link href="#">
                                    <img
                                        className="max-w-[30px]"
                                        src="/hexadash-nextjs/img/avatar/chat-auth.png"
                                        alt=""
                                    />
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center justify-center bg-primary w-[30px] h-[30px] rounded-full"
                                >
                                    <span className="text-white text-[10px] font-semibold">
                                        20+
                                    </span>
                                </Link>
                                <Link
                                    href="#0"
                                    className="flex items-center justify-center w-[30px] h-[30px] border border-dashed border-deep dark:border-white/10 rounded-full"
                                >
                                    <span className="add-icon">
                                        <UilPlus className="text-light dark:text-white/60" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    }
                    isbutton={[
                        <DropDown customContent={createInbox } key="1">
                            <Link onClick={(e) => e.preventDefault()} href="#">
                                <UilEllipsisH className="text-light dark:text-white/60" />
                            </Link>
                        </DropDown>,
                    ]}
                >
                    <ul className="h-[455px] scrollbar overflow-y-auto ltr:3xl:[&>div>div]:!mr-0 rtl:3xl:[&>div>div]:!ml-0">
                        <div>
                            {singleContent.length ? (
                                singleContent.map((mes: any, index: number) => {
                                    const id = mes.time
                                    const same =
                                        moment(id).format('MM-DD-YYYY') ===
                                        moment().format('MM-DD-YYYY')
                                    return (
                                        <li
                                            key={id}
                                            className="mb-[30px] px-[25px] sm:px-[15px] last:mb-0"
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <div
                                                className={`flex items-start ${
                                                    mes.email !== me
                                                        ? 'ltr:float-left rtl:float-right ltr:[&>div>h5]:text-start'
                                                        : 'ltr:float-right rtl:float-left ltr:[&>div>h5]:text-end rtl:[&>div>h5]:text-end'
                                                }`}
                                            >
                                                {mes.email !== me ? (
                                                    <img
                                                        className="max-w-[46px] xs:max-w-[32px] ltr:mr-[15px] rtl:ml-[15px] rounded-full"
                                                        src="/hexadash-nextjs/img/avatar/chat-auth.png"
                                                        alt=""
                                                    />
                                                ) : null}

                                                <div>
                                                    <Heading
                                                        as="h5"
                                                        className="text-sm font-semibold text-dark dark:text-white/[.87] mb-[10px]"
                                                    >
                                                        {mes.email !== me &&
                                                            name}

                                                        <span className="text-light dark:text-white/60 text-xs font-normal mx-[15px]">
                                                            {same
                                                                ? moment(
                                                                      id
                                                                  ).format(
                                                                      'hh:mm A'
                                                                  )
                                                                : moment(
                                                                      id
                                                                  ).format(
                                                                      'LL'
                                                                  )}
                                                        </span>
                                                    </Heading>
                                                    {mes.email !== me ? (
                                                        <div className="flex items-center gap-[15px]">
                                                            <div>
                                                                <div className="max-w-[670px] bg-body dark:bg-white/10 px-5 py-[18px] text-white dark:text-white/[.87] text-base rounded-[15px] ltr:rounded-tl-none rtl:rounded-tr-none">
                                                                    {
                                                                        mes.content
                                                                    }
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-3">
                                                                <DropDown
                                                                    customContent={
                                                                        emojis
                                                                    }
                                                                    placement="bottom"
                                                                    className="[&>ul]:flex"
                                                                >
                                                                    <Link
                                                                        href="#"
                                                                        className="inline-flex items-center text-theme-gray dark:text-white/60"
                                                                    >
                                                                        <SmileOutlined className="xs:w-[16px] xs:h-[16px]" />
                                                                    </Link>
                                                                </DropDown>
                                                                <DropDown
                                                                    customContent={
                                                                        settings
                                                                    }
                                                                    placement="bottom"
                                                                >
                                                                    <Link
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            e.preventDefault()
                                                                        }
                                                                        href="#"
                                                                        className="inline-flex items-center text-deep dark:text-white/60"
                                                                    >
                                                                        <UilEllipsisH className="xs:w-[16px] xs:h-[16px]" />
                                                                    </Link>
                                                                </DropDown>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center">
                                                            <div className="flex items-center mx-[15px] gap-3 [&>.ant-dropdown-trigger]:flex">
                                                                <DropDown
                                                                    customContent={
                                                                        settings
                                                                    }
                                                                    placement="bottom"
                                                                >
                                                                    <Link
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            e.preventDefault()
                                                                        }
                                                                        href="#"
                                                                        className="inline-flex items-center text-deep dark:text-white/60"
                                                                    >
                                                                        <UilEllipsisH />
                                                                    </Link>
                                                                </DropDown>
                                                                <DropDown
                                                                    customContent={
                                                                        emojis
                                                                    }
                                                                    placement="bottom"
                                                                    className="[&>ul]:flex"
                                                                >
                                                                    <Link
                                                                        href="#"
                                                                        className="inline-flex items-center text-theme-gray dark:text-white/60"
                                                                    >
                                                                        <SmileOutlined />
                                                                    </Link>
                                                                </DropDown>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <div className="max-w-[670px] bg-section dark:bg-white/30 px-5 py-[18px] text-dark dark:text-white/[.87] text-base rounded-[15px] ltr:rounded-br-none rtl:rounded-bl-none">
                                                                    {
                                                                        mes.content
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {singleContent.length ===
                                                    index + 1 ? (
                                                        <div className="group-seen flex items-center justify-end w-full gap-x-1 mt-[10px] gap-[5px] text-end">
                                                            <img
                                                                src="/hexadash-nextjs/img/avatar/chat-auth.png"
                                                                alt=""
                                                                className="flex items-center justify-center w-[18px] h-[18px] border border-dashed border-deep dark:border-white/10 rounded-full"
                                                            />
                                                            <img
                                                                src="/hexadash-nextjs/img/avatar/chat-auth.png"
                                                                alt=""
                                                                className="flex items-center justify-center w-[18px] h-[18px] border border-dashed border-deep dark:border-white/10 rounded-full"
                                                            />
                                                            <img
                                                                src="/hexadash-nextjs/img/avatar/chat-auth.png"
                                                                alt=""
                                                                className="flex items-center justify-center w-[18px] h-[18px] border border-dashed border-deep dark:border-white/10 rounded-full"
                                                            />
                                                            <img
                                                                src="/hexadash-nextjs/img/avatar/chat-auth.png"
                                                                alt=""
                                                                className="flex items-center justify-center w-[18px] h-[18px] border border-dashed border-deep dark:border-white/10 rounded-full"
                                                            />
                                                            <img
                                                                src="/hexadash-nextjs/img/avatar/chat-auth.png"
                                                                alt=""
                                                                className="flex items-center justify-center w-[18px] h-[18px] border border-dashed border-deep dark:border-white/10 rounded-full"
                                                            />
                                                            <img
                                                                src="/hexadash-nextjs/img/avatar/chat-auth.png"
                                                                alt=""
                                                                className="flex items-center justify-center w-[18px] h-[18px] border border-dashed border-deep dark:border-white/10 rounded-full"
                                                            />
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            ) : (
                                <p>No data found</p>
                            )}
                        </div>
                    </ul>

                    <div>
                        <form onSubmit={handleSubmit}>
                            <div
                                className={`relative flex items-center gap-2 sm:gap-[15px] sm:justify-center sm:flex-wrap mt-[20px] mx-[25px] ${
                                    state.fileList.length && 'hasImage'
                                } ${state.fileList2.length && 'hasFile'}`}
                            >
                                <div className="flex items-center w-full gap-2">
                                    <span className="absolute ltr:left-[25px] rtl:right-[25px]  flex items-center z-998 [&>aside.emoji-picker-react]:absolute ltr:[&>aside.emoji-picker-react]:right-[25px] rtl:[&>aside.emoji-picker-react]:left-[25px] [&>aside.emoji-picker-react]:top-auto [&>aside.emoji-picker-react]:bottom-[20%] [&>aside.emoji-picker-react]:flex [&>aside.emoji-picker-react]:items-center [&>aside.emoji-picker-react]:shadow-none [&>aside.emoji-picker-react]:z-998 [&>aside.emoji-picker-react>div]:w-full">
                                        {pickerShow && (
                                            <Picker
                                                onEmojiClick={onEmojiClick}
                                            />
                                        )}
                                        <Link
                                            onClick={onPickerShow}
                                            href="#"
                                            className="text-light-extra dark:text-white/60"
                                        >
                                            <UilSmile className="w-[24px] h-[24px]" />
                                        </Link>
                                    </span>
                                    <input
                                        onChange={handleChange}
                                        placeholder="Type your message..."
                                        name="chat"
                                        id="chat"
                                        style={{ width: '100%' }}
                                        value={inputValue}
                                        className="bg-section dark:bg-[#323540] h-[70px] sm:h-[50px] ltr:pr-[25px] rtl:pl-[25px] ltr:pl-[70px] rtl:pr-[70px] text-body dark:text-white/60 border-none outline-none rounded-[35px]"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link href="#">
                                        <Upload
                                            {...props}
                                            listType="picture-card"
                                            className="[&>div>.ant-upload]:flex [&>div>.ant-upload]:items-center [&>div>.ant-upload]:justify-center [&>div>.ant-upload]:w-[50px] [&>div>.ant-upload]:h-[50px] [&>div>.ant-upload]:bg-section dark:[&>div>.ant-upload]:bg-[#323540] [&>div>.ant-upload]:m-0 [&>div>.ant-upload]:rounded-full [&>div>.ant-upload]:border-none [&>div>div>span.ant-upload]:mx-auto [&>.ant-upload-list]:flex [&>.ant-upload-list]:items-center [&>.ant-upload-list]:gap-[10px] [&>.ant-upload-list>.ant-upload-list-picture-card-container]:w-[60px] [&>.ant-upload-list>.ant-upload-list-picture-card-container]:h-[50px] [&>.ant-upload-list>.ant-upload-list-picture-card-container]:m-0"
                                        >
                                            <UilCamera className="w-[18px] h-[18px] text-light dark:text-white/60" />
                                        </Upload>
                                    </Link>
                                    <Link href="#">
                                        <Upload
                                            {...attachment}
                                            className="[&>.ant-upload]:flex [&>.ant-upload]:items-center [&>.ant-upload]:w-[50px] [&>.ant-upload]:h-[50px] [&>.ant-upload]:bg-section dark:[&>.ant-upload]:bg-[#323540] [&>.ant-upload]:rounded-full [&>.ant-upload]:border-none [&>div>span.ant-upload]:mx-auto"
                                        >
                                            <UilPaperclip className="w-[18px] h-[18px] text-light dark:text-white/60" />
                                        </Upload>
                                    </Link>

                                    <Buttons
                                        onClick={handleSubmit}
                                        type="primary"
                                        className="bg-primary hover:bg-primary-hbr w-[50px] h-[50px] p-0 text-white dark:text-white/[.87] rounded-full"
                                    >
                                        <UilMessage className="w-[18px] h-[18px] mx-auto" />
                                    </Buttons>
                                </div>
                            </div>
                        </form>
                    </div>
                </Cards>
            </>
        </>
    )
}

export default SingleGroupChat
