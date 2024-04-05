import { useState } from 'react';
import { Input } from 'antd';
import {
  UilTimes,
  UilExpandAlt
} from '@iconscout/react-unicons';
import MailComposer from './MailComposer';

interface ComposeProps {
  close?: () => void;
}

function Compose({ close }:ComposeProps) {
  const [state, setState] = useState({
    value: true,
    tags: [],
    size: 'small',
  });

  const onChange = (value:any) => {
    setState({ ...state, value });
  };

  const toggleSize = () => {
    return setState({
      ...state,
      size: state.size === 'small' ? 'big' : 'small',
    });
  };

  const onMailSend = async () => {
    // hit the mail sender api
  };

  return (
    <div
      className={` fixed bg-white dark:bg-white/10 w-full rounded-[10px] shadow-[0_10px_50px_rgba(146,153,184,.19)] z-998 ${
        state.size === 'big'
          ? 'max-w-[calc(100vw-150px)] sm:max-w-[calc(100vw-50px)] start-[100px] sm:start-[25px] bottom-[100px] z-998'
          : 'min-md:max-w-[600px] md:max-w-[400px] min-md:h-[calc(100vh-40%)] ssm:max-w-[275px] bottom-[140px] md:bottom-[20px] ltr:right-[15px] rtl:left-[15px] z-998'
      }`}
    >
      <div className="flex items-center justify-between bg-dark dark:bg-[#323540] p-5 text-white dark:text-white/[.87] rounded-tl-10 rounded-tr-10">
        <p className="m-0">New Message</p>
        <div className="flex items-center">
          <UilExpandAlt
            onClick={toggleSize}
            className="w-[18px] h-[18px] ltr:mr-[20px] rtl:ml-[20px] opacity-70 cursor-pointer"
          />
          <UilTimes onClick={close} className="w-[18px] h-[18px] opacity-70 cursor-pointer" />
        </div>
      </div>

      <div className="bg-white dark:bg-[#1b1d2a] overflow-y-auto">
        <div className="relative bg-white dark:bg-transparent px-[30px] ssm:px-[15px]">
          <Input
            placeholder="Subject"
            type="text"
            className="bg-white dark:bg-transparent px-0 py-[15px] text-body dark:text-white/[.87] placeholder:text-light dark:placeholder:text-white/60 border-t-0 border-r-0 border-l-0 border-b-regular dark:border-b-white/10 rounded-none focus:shadow-none"
          />
        </div>
        <MailComposer onSend={onMailSend} onChange={onChange} />
      </div>
    </div>
  );
}


export default Compose;
