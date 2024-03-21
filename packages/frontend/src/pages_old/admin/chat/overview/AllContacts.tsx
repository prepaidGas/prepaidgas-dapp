import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import moment from 'moment';
import { UilUserPlus } from '@iconscout/react-unicons';
import { Badge } from 'antd';
import { textRefactor } from '@/components/utilities';
import { filterSinglePage } from '@/redux/chat/actionCreator';
import { Buttons } from '@/components/buttons';

interface RootState {
  chat: {
    data: any;
  }
}

const AllContacts = React.memo(() => {
  const chat = useSelector((state:RootState) => state.chat.data);

  const path =' /admin/chat/all';

  const [state] = useState({
    chatData: chat,
  });

  const { chatData } = state;

  const dispatch = useDispatch();
  const dataFiltering = (email:string) => {
    //@ts-ignore
    dispatch(filterSinglePage(email));
  };

  interface User {
    userName: string;
    content: any;
    email: string;
    img: string;
    active: boolean;
  }

  return (
    <>
      <div className="mb-[18px] px-[25px] pt-[25px]">
        <Buttons
          className="flex items-center justify-center bg-regularBG border-regular dark:bg-regularBGdark  w-full h-11 text-body dark:text-white/60 text-sm font-semibold text-center border-1 dark:border-white/10 hover:border-primary rounded-[40px]"
          size="default"
          type="default"
          block
        >
          <UilUserPlus className="w-[14px] h-[14px] ltr:mr-[10px] rtl:ml-[10px]" />
          Add New Contact
        </Buttons>
      </div>
      <ul>
        {chatData &&
          chatData
            .sort((a:any, b:any) => {
              return b.time - a.time;
            })
            .map((user:User, key:number) => {
              const { userName, content, email, active, img } = user;
              const id = content[content.length - 1].time;
              const same = moment(id).format('MM-DD-YYYY') === moment().format('MM-DD-YYYY');
              return (
                <li key={id} className="relative w-full m-0 rounded hover:shadow-[0_15px_50px_rgba(116,116,116,0.13)]">
                  <Link
                    onClick={() => dataFiltering(email)}
                    href={`${path}/${email}`}
                    className="relative z-10 flex justify-between py-5 px-[25px] ssm:px-[15px]"
                  >
                    <div className="flex items-center">
                      <div className="ltr:mr-[15px] rtl:ml-[15px]">
                        <img
                          className="max-w-[46px] min-h-[46px] rounded-full"
                          src={`/hexadash-nextjs/img/chat-author/${img}`}
                          alt=""
                        />
                        <span className={active ? 'active' : 'inactive'} />
                      </div>
                      <div className="ltr:mr-[6px] rtl:ml-[6px]">
                        <span className="block font-semibold text-dark dark:text-white/[.87]">{userName}</span>
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
});

export default AllContacts;
