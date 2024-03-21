import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { UilEdit } from '@iconscout/react-unicons';
import { Badge } from 'antd';
import { textRefactor } from '@/components/utilities';
import { filterSinglepageGroup } from '@/redux/chat/actionCreator';
import { Buttons } from '@/components/buttons';

interface RootState {
  groupChat: {
    data: any;
  }
}

function GroupChat() {
  const chatData = useSelector((state:RootState) => state.groupChat.data);

  const path =' /admin/chat/group';

  const dispatch = useDispatch();
  const dataFiltering = (id:number) => {
    //@ts-ignore
    dispatch(filterSinglepageGroup(id));
  };

  interface User {
    id: number;
    groupName: string;
    content: any;
    img: string;
  }

  return (
    <>
      <div className="mb-[18px] px-[25px] pt-[25px]">
        <Buttons
          className="flex items-center justify-center bg-regularBG dark:bg-regularBGdark w-full h-11 text-body dark:text-white/60 text-sm font-semibold text-center border dark:border-white/10 hover:border-primary rounded-[40px] border-regular"
          size="default"
          type="default"
          block
        >
          <UilEdit className="w-[14px] h-[14px] ltr:mr-[10px] rtl:ml-[10px]" />
          Create New Group
        </Buttons>
      </div>

      <ul>
        {chatData &&
          chatData
          .sort((a:any, b:any) => {
            return b.time - a.time;
          })
          .map((user:User, key:number) => {
            const { groupName, content, img } = user;
            const id = content[content.length - 1].time;

            const same = moment(id).format('MM-DD-YYYY') === moment().format('MM-DD-YYYY');
            return (
              <li
                key={user.id}
                className="relative w-full m-0 rounded hover:shadow-[0_15px_50px_rgba(116,116,116,0.13)]"
              >
                <Link
                  onClick={() => dataFiltering(id)}
                  href={`${path}/${id}`}
                  className="relative z-10 flex justify-between px-[25px] py-5"
                >
                  <div className="flex items-center">
                    <div className="ltr:mr-[15px] rtl:ml-[15px]">
                      <img
                        className="max-w-[46px] min-h-[46px] rounded-full"
                        src={`/hexadash-nextjs/img/chat-author/${img}`}
                        alt=""
                      />
                    </div>
                    <div className="ltr:mr-[6px] rtl:ml-[6px]">
                      <span className="block font-semibold text-dark dark:text-white/[.87]">{groupName}</span>
                      <span className="block text-body dark:text-white/60">
                        {textRefactor(content[content.length - 1].content, 5)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="float-right text-xs text-light dark:text-white/60">
                      {same ? moment(id).format('hh:mm A') : moment(id).format('dddd')}
                    </span>
                    {key <= 1 && (
                      <Badge
                        className="float-right mt-2 text-xs text-light dark:text-white/60 [&>sup]:bg-success"
                        count={3}
                      />
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default GroupChat;
