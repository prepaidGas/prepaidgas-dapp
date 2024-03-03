/* eslint-disable react/jsx-no-bind */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import PopOver from '@/components/popup';
import Heading from '@/components/heading';
import Messages from '@/demoData/message.json';

interface RootState {
  ChangeLayoutMode: {
    rtlData: boolean,
  }
}

const MessageBox = React.memo((props:any) => {
  const { rtl } = useSelector((state:RootState) => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });

  const content = (
    <div className="pt-[5px]">
      <Heading
        as="h5"
        className="flex items-center justify-center text-sm rounded-md bg-section dark:bg-white/10 h-[50px] p-[10px]"
      >
        <span className="title-text ltr:mr-2.5 rtl:ml-2.5 font-semibold">
          Messages
          <span className="inline-flex items-center justify-center w-5 h-5 text-xs text-white rounded-full ltr:ml-3 rtl:mr-3 bg-success dark:text-white/[.87]">
            3
          </span>
        </span>
      </Heading>
      <div className="max-h-[300px] sm:max-h-[400px] overflow-hidden overflow-y-auto scrollbar">
        <ul className="p-0">
        {Messages.map((message, index) => (
          <li key={index} className="w-full">
            <Link
              href="#"
              className="group relative block w-full px-3 py-3.5 text-body dark:text-white/60 transition-[0.3s] hover:text-primary hover:bg-white dark:hover:bg-white/[.06] hover:shadow-custom dark:shadow-none dark:hover:shadow-[0_5px_30px_rgba(1,4,19,.20)] dark:rounded-4"
            >
              <figure className="inline-flex w-full mb-0 align-top sm:gap-[10px]">
                <Image className="h-[40px] min-w-[40px] rounded-full object-cover" src={`/hexadash-nextjs/${message.img ? message.img : 'img/avatar/app-developer.png'} `} alt="" width="40" height="40" />
                <figcaption className="min-sm:-mt-1 min-sm:mx-4 ssm:w-full">
                  <Heading as="h5" className="flex items-center justify-between mb-0.5 text-sm font-semibold text-current">
                  {message.author} <span className="text-xs font-normal text-success">{message.time}</span>
                  </Heading>
                  <div>
                    <span className="ltr:pl-0 rtl:pr-0 ltr:mr-4 rtl:ml-4 min-w-[216px]">
                      {message.text}
                    </span>
                    <span className="inline-flex items-center justify-center w-4 h-4 text-white rounded-full min-sm:ltr:ml-3 min-sm:rtl:mr-3 bg-success dark:text-white/[.87] text-10">
                      {message.count}
                    </span>
                  </div>
                </figcaption>
              </figure>
            </Link>
          </li>
        ))}
        </ul>
      </div>
      <Link
        href="#"
        className="flex items-center justify-center text-sm font-medium bg-[#f4f5f7] dark:bg-[#32333f] h-[50px] text-light hover:text-primary dark:hover:text-white/60 dark:text-white/[.87] mx-[-12px] mb-[-15px] rounded-b-6"
      >
        See all messages
      </Link>
    </div>
  );

  return (
    <div className="flex">
      <PopOver placement="bottomLeft" content={content} action="click">
        <Link
          href="#"
          className="flex relative before:absolute before:bg-success before:w-1.5 before:h-1.5 before:rounded-full before:-top-1 before:right-0 before:shadow-dot"
        >
          <ReactSVG
            className="text-[#a0a0a0] dark:text-white/60"
            src='/hexadash-nextjs/img/icon/envelope.svg'
          />
        </Link>
      </PopOver>
    </div>
  );
});


export default MessageBox;
