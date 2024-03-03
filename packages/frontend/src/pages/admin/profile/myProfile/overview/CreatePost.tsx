import React, { useState } from 'react';
import { Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { UilEllipsisH } from '@iconscout/react-unicons';
import { Buttons } from '@/components/buttons';
import { submitPost } from '@/redux/profile/actionCreator';

interface Post {
  postId: number;
  from: string;
  time: number;
  img: string[];
  author: string;
  content: string;
  like: number;
  comment: any[]; 
}

function Post() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state:any) => {
    return {
      posts: state.Profile.posts,
    };
  });

  const [drawer, setDrawer] = useState(false);
  const [textValue, setTextValue] = useState('');

  const onCreate = () => {
    const arrayData: number[] = posts.map((data: Post) => data.postId);
    const max = Math.max(...arrayData);

    if (textValue === '') {
      alert('Please input minumum content');
    } else {
      dispatch(
        //@ts-ignore
        submitPost([
          ...posts,
          {
            postId: max + 1,
            from: 'David Warner',
            time: new Date().getTime(),
            img: ['/hexadash-nextjs/img/profile/post/postImage.png'],
            author: '/hexadash-nextjs/img/chat-author/t4.jpg',
            content: textValue,
            like: 0,
            comment: [],
          },
        ]),
      );
      setTextValue('');
    }
    setTimeout(() => {
      setDrawer(false);
    }, 500);
  };

  const onTextChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    return setTextValue(e.target.value);
  };

  return (
    <>
      {drawer && (
        <button
          className="after:content-[''] after:w-full after:h-full after:left-0 after:top-0 after:bg-black after:opacity-70 after:fixed after:z-[999]"
          onClick={() => setDrawer(false)}
        />
      )}
      <div className="bg-white dark:bg-[#1b1e2b] rounded-10 mb-[25px] relative z-[999]">
        <div className="h-[60px] px-[25px] border-regular dark:border-white/10 border-b-1 text-dark dark:text-white/[.87] font-medium text-[17px] flex flex-wrap items-center justify-between">
          <div className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
            Post Something
          </div>
        </div>

        <div className="pt-[20px] px-[25px] pb-[15px]">
          <div onClick={() => setDrawer(true)} className="relative flex postBody">
            <img
              className="max-w-[46px] max-h-[46px] min-w-[46px] h-[46px] rounded-full absolute top-[5px] z-[22] ltr:left-0 rtl:right-0 object-cover"
              src={'/hexadash-nextjs/img/chat-author/t4.jpg'}
              alt=""
            />
            <Input.TextArea
              className="border-none ltr:pl-[70px] rtl:pr-[70px] resize-none bg-transparent dark:bg-transparent text-dark dark:text-white/[.87] outline-none shadow-none dark:placeholder:text-white/60"
              value={textValue}
              onChange={onTextChange}
              placeholder="Write something..."
            />
          </div>
          <div
            onClick={() => setDrawer(true)}
            className="flex items-center justify-between mt-[10px] border-t-1 border-regular dark:border-white/10 pt-[15px] postFooter"
          >
            <div className="flex items-center gap-[16px]">
              <Buttons className="flex items-center h-[30px] px-[14.5px] text-[12px] rounded-[16px] font-medium text-theme-gray dark:text-white/60 bg-normalBG dark:bg-normalBGdark border-none outline-none gap-[6px] leading-[18px] focus:border-primary">
                <img className="w-[14] h-[14px]" src={'/hexadash-nextjs/img/icon/image.png'} alt="" />
                Photo/Video
              </Buttons>
              <Buttons
                className="flex items-center h-[30px] px-[14.5px] text-[12px] rounded-[16px] font-medium text-theme-gray dark:text-white/60 bg-normalBG dark:bg-normalBGdark border-none outline-none gap-[6px]"
                shape="circle"
                type="light"
              >
                <UilEllipsisH className="w-[14px] h-[14px]" />
              </Buttons>
            </div>
            <div className="postFooter_right">
              {drawer && (
                <Buttons
                  className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-5 h-[35px]"
                  onClick={onCreate}
                  type="primary"
                >
                  Publish Post
                </Buttons>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
