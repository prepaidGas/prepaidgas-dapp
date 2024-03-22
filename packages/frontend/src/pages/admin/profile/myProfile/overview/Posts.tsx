import React, { ChangeEvent, useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import {
  UilThumbsUp,
  UilCommentAlt,
  UilShareAlt,
  UilSmile,
  UilImage,
  UilPaperclip,
  UilMessage
} from '@iconscout/react-unicons';
import Masonry from 'react-masonry-css';
import Picker from 'emoji-picker-react';
import { Comment } from '@ant-design/compatible';
import { Input, Upload, message, Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
//@ts-ignore
import { LightBox } from 'react-lightbox-pack';
import 'react-lightbox-pack/dist/index.css';
import { Buttons } from '@/components/buttons';
import { Cards } from '@/components/cards/frame/cards-frame';
import { likeUpdate, commentUpdate, postDelete } from '@/redux/profile/actionCreator';

function ExampleComment({ children, replay }:any) {
  return (
    <Comment
      actions={[
        <span
          className="relative block com-like ltr:pr-[8px] rtl:pl-8 ltr:mr-[8px] rtl:ml-[8px] text-light-extra dark:text-white/60 hover:text-primary after:absolute after:right-0  after:top-[50%] after:translate-y-[-50%] after:w-[1px] after:h-[12px] after:bg-deep dark:after:bg-white/10 after:content-['']"
          key="comment-nested-reply-to"
        >
          Like{' '}
        </span>,
        <span
          className="relative block com-like ltr:pr-[8px] rtl:pl-8 ltr:mr-[8px] rtl:ml-[8px] text-light-extra dark:text-white/60 hover:text-primary after:absolute after:right-0  after:top-[50%] after:translate-y-[-50%] after:w-[1px] after:h-[12px] after:bg-deep dark:after:bg-white/10 after:content-['']"
          key="comment-nested-reply-to"
        >
          Reply{' '}
        </span>,
        <span
          className="block ltr:mr-0 rtl:ml-0 com-time text-light-extra dark:text-white/60 hover:text-primary"
          key="comment-nested-reply-to"
        >
          {moment(parseInt(replay.time, 10)).fromNow()}
        </span>,
      ]}
      author={<span className="text-dark dark:text-white/[.87] text-[14px] font-semibold">{replay.name}</span>}
      avatar={
        <Avatar
          className="rounded-full w-[32px] h-[32px]"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
      }
      content={<p className="text-light dark:text-white/60">{replay.text}</p>}
    >
      {children}
    </Comment>
  );
}

interface PostsProps {
  id?: string;
  key?: number;
  time?: number;
  postId?: string;
  from?: string;
  img?: string[];
  like?: number;
  comment?: { name: string; time: string; from: string; text: string }[];
  content?: string;
  author?: string;
}

function Posts({ postId, from, time, img, like, comment, content, author }:PostsProps) {
  const dispatch = useDispatch();
  const { posts } = useSelector((state:any) => {
    return {
      posts: state.Profile.posts,
    };
  });

  const [state, setState] = useState({
    inputValue: '',
    fileList: [],
    fileList2: [],
  });

  const [pickerShow, setPickerShow] = useState(false);
  const [textValue, setTextValue] = useState('');

  const onEmojiClick = (event:any, emojiObject:any) => {
    setTextValue(textValue + emojiObject.emoji);
  };

  const onPickerShow = () => {
    setPickerShow(!pickerShow);
  };

  const onTextChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    listType: 'picture-card',
    onChange(info:any) {
      if (info.file.status !== 'uploading') {
        setState({
          ...state,
          fileList: info.fileList,
        });
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const attachment = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info:any) {
      if (info.file.status !== 'uploading') {
        setState({
          ...state,
          fileList2: info.fileList,
        });
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onLikeUpdate = (id:string) => {
    //@ts-ignore
    return dispatch(likeUpdate(posts, id));
  };

  const onCommentUpdate = (id:string) => {
    //@ts-ignore
    dispatch(commentUpdate(posts, id, textValue));
    setTextValue('');
  };

  const onPostDelete = (id:string) => {
    //@ts-ignore
    dispatch(postDelete(posts, id));
  };

  // State
  const [toggle, setToggle] = React.useState(false);
  const [sIndex, setSIndex] = React.useState(0);

  // Handler
  const lightBoxHandler = (status:any, value:number) => {
    setToggle(status);
    setSIndex(value);
  };

  const removeOption = [
    {
        key: '1',
        label: (
            <Link
                className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
                href="#"
            >
                <span>Delete</span>
            </Link>
        ),
    }
  ]

  const dataImages = [
    {
      id: 1,
      image: '/hexadash-nextjs/img/profile/post/506.png',
    },
    {
      id: 2,
      image: '/hexadash-nextjs/img/profile/post/907.png',
    },
    {
      id: 3,
      image: '/hexadash-nextjs/img/profile/post/brightland_3744.png',
    },
    {
      id: 4,
      image: '/hexadash-nextjs/img/profile/post/70.png',
    },
    {
      id: 5,
      image: '/hexadash-nextjs/img/profile/post/165.png',
    },
  ];

  return (
    <>
      <Cards
        className="rounded-10 [&>.ant-card-head]:px-[25px] [&>.ant-card-body]:py-[20px] [&>.ant-card-body]:px-0 mb-[25px] [&>div>.ant-card-head-wrapper]:flex-row"
        title={
          <h3 className="flex items-center gap-[15px] py-[15px]">
            <img className="w-[46px] h-[46px] rounded-full" src={`/hexadash-nextjs/${author}`} alt="" />
            <p className="text-[14px] font-medium text-dark dark:text-white/[.87] m-0">
              {from}{' '}
              <span className="text-[13px] font-normal block m-0 text-light dark:text-white/60 text-start">
                {moment(parseInt(time?.toString() ?? '', 10)).fromNow()}
              </span>
            </p>
          </h3>
        }
        more={removeOption}
      >
        <div>
          <div className="gallery px-[25px]">
            {img?.length ? (
              <>
                <Masonry
                  breakpointCols={img?.length ?? 0 <= 2 ? img?.length ?? 0 : 2}
                  className="my-masonry-grid flex w-auto gap-[10px]"
                  columnClassName="my-masonry-grid_column bg-clip-padding"
                >
                  {img?.map((src:string, key:number) => {
                    return (
                      key <= 1 && (
                        <a
                          key={key + 1}
                          href="#"
                          onClick={() => {
                            lightBoxHandler(true, key);
                          }}
                        >
                          <img
                            className="mb-[10px] rounded-[8px] w-full"
                            key={key + 1}
                            src={`/hexadash-nextjs/${src}`}
                            alt=""
                          />
                        </a>
                      )
                    );
                  })}
                </Masonry>
                {img && img.length > 2 && (
                  <Masonry
                    breakpointCols={img?.length ?? 0 <= 2 ? img?.length ?? 0 : 3}
                    className="my-masonry-grid flex w-auto gap-[10px]"
                    columnClassName="my-masonry-grid_column bg-clip-padding"
                  >
                    {img?.map((src:string, key:number) => {
                      return (
                        key > 1 && (
                          <a
                            key={key + 1}
                            href="#"
                            onClick={() => {
                              lightBoxHandler(true, key);
                            }}
                          >
                            <img
                              className="mb-[10px] rounded-[8px] w-full"
                              key={key + 1}
                              src={`/hexadash-nextjs/${src}`}
                              alt=""
                            />
                          </a>
                        )
                      );
                    })}
                  </Masonry>
                )}
              </>
            ) : null}
            <LightBox
              state={toggle}
              event={lightBoxHandler}
              data={dataImages}
              imageWidth="600px"
              imageHeight="500px"
              thumbnailHeight={50}
              thumbnailWidth={50}
              setImageIndex={setSIndex}
              imageIndex={sIndex}
            />
          </div>
          <div className="border-b-1 border-regular dark:border-white/10 px-[25px] pb-[20px] mb-[20px]">
            <p className="text-[15px] mb-0 text-theme-gray dark:text-white/60">{content}</p>
          </div>

          <div className="px-[25px] pb-[20px] border-b-1 border-regular dark:border-white/10 mb-[20px] flex flex-wrap items-center gap-[20px]">
            <span className="inline-flex items-center text-light-extra dark:text-white/60 gap-[6px]">
              <Link
                className="inline-flex items-center text-[13px] text-light-extra dark:text-white/60 hover:text-primary"
                onClick={() => onLikeUpdate(postId ?? '')}
                href="#"
              >
                <UilThumbsUp className="w-[14px] h-[14px]" />
              </Link>
              {like}
            </span>
            <span className="inline-flex items-center text-light-extra dark:text-white/60 gap-[6px]">
              <Link
                className="inline-flex items-center text-[13px] text-light-extra dark:text-white/60 hover:text-primary"
                href="#"
              >
                <UilCommentAlt className="w-[14px] h-[14px]" />
              </Link>
              {comment?.length}
            </span>
            <span className="inline-flex items-center text-light-extra dark:text-white/60 gap-[6px]">
              <Link
                className="inline-flex items-center text-[13px] text-light-extra dark:text-white/60 hover:text-primary gap-[6px]"
                href="#"
              >
                <UilShareAlt className="w-[14px] h-[14px]" />
                Share
              </Link>
            </span>
          </div>

          <div>
            <div className="flex items-center sm:flex-wrap px-[25px] pb-[20px] border-b-1 border-regular dark:border-white/10 gap-[10px]">
              <div className="relative flex items-center sm:flex-wrap flex-1 sm:flex-[0_0_100%] gap-[10px]">
                <img
                  className="max-w-[36px] rounded-full"
                  src={'/hexadash-nextjs/img/chat-author/t2.jpg'}
                  alt=""
                />
                <Input.TextArea
                  className="py-[14px] ltr:pr-[82px] rtl:pl-[82px] ltr:pl-[22px] rtl:pr-[22px] h-[52px] rounded-[25px] border-transparent hover:border-primary-transparent focus:border-primary-transparent resize-none bg-normalBG dark:bg-normalBGdark text-dark dark:text-white/[.87] focus:shadow-[0_0_0_2px_rgb(130,49,211,0.2)] dark:placeholder:text-white/60"
                  onChange={onTextChange}
                  value={textValue}
                  placeholder="Write comment...."
                />
                <div className="social-post flex items-center ltr:right-[22px] rtl:left-[22px] top-[50%] sm:top-[70%] -translate-y-1/2 absolute gap-[10px]">
                  <span className="relative gap-[18px]">
                    {pickerShow && (
                      <>
                        <button onClick={() => setPickerShow(false)} />
                        <Picker onEmojiClick={onEmojiClick} />
                      </>
                    )}
                    <Link className="leading-[1]" onClick={onPickerShow} href="#">
                      <UilSmile className="w-[18px] h-[18px] text-[#adb4d2] dark:text-white/60" />
                    </Link>
                  </span>

                  <Link
                    className="leading-[1] flex items-center [&>span>div>.ant-upload]:w-auto [&>span>div>.ant-upload]:h-auto [&>span>div>.ant-upload]:border-none [&>span>div>.ant-upload]:m-0 [&>span>div]:flex"
                    href="#"
                  >
                    <Upload {...attachment}>
                      <UilImage className="w-[18px] h-[18px] text-[#adb4d2] dark:text-white/60  dark:bg-[#323440]" />
                    </Upload>
                  </Link>
                  <Link className="leading-[1] flex items-center [&>span>div]:flex" href="#">
                    <Upload {...attachment}>
                      <UilPaperclip className="w-[18px] h-[18px] text-[#adb4d2] dark:text-white/60" />
                    </Upload>
                  </Link>
                </div>
              </div>
              <Buttons
                className="p-0 w-[50px] h-[50px] rounded-full object-cover flex items-center justify-center shadow-btn bg-primary text-white dark:text-white/[.87] "
                onClick={() => (textValue === '' ? alert('Please input your comment...') : onCommentUpdate(postId ?? ''))}
                type="primary"
              >
                <UilMessage className="w-[16px] h-[16px] text-white dark:text-white/[.87] " />
              </Buttons>
            </div>
          </div>

          {comment?.length ? (
            <div className=" pt-[20px] px-[25px] [&>div>div]:p-0">
              <ExampleComment
                replay={{
                  time: comment[0].time,
                  name: comment[0].from,
                  text: comment[0].text,
                }}
              >
                {comment.length > 1
                  ? comment.map((item, key) => {
                      return (
                        key >= 1 && (
                          <ExampleComment
                            replay={{
                              time: item.time,
                              name: item.name,
                              text: item.text,
                            }}
                          />
                        )
                      );
                    })
                  : null}
              </ExampleComment>
            </div>
          ) : null}
        </div>
      </Cards>
    </>
  );
}

export default Posts;
