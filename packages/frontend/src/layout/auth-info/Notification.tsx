import {
  UilHdd,
  UilUpload,
  UilFileExport,
  UilHeart
 } from '@iconscout/react-unicons';
import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';

import PopOver from '@/components/popup';
import Heading from '@/components/heading';

interface RootState {
  ChangeLayoutMode: {
    rtlData: boolean,
  }
}

const NotificationBox = React.memo(() => {
  const { rtl } = useSelector((state:RootState) => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });

  const content = (
    <div className="min-sm:min-w-[370px] sm:max-w-full">
      <Heading
        as="h5"
        className="flex items-center justify-center text-sm rounded-md bg-section dark:bg-white/10 h-[50px] p-[10px]"
      >
        <span className="title-text ltr:mr-2.5 rtl:ml-2.5 font-semibold">
          Notifications
          <span className="inline-flex items-center justify-center w-5 h-5 text-xs text-white rounded-full bg-success ltr:ml-3 rtl:mr-3 dark:text-white/[.87]">
            3
          </span>
        </span>
      </Heading>
      <div className=" py-[10px] max-h-[300px] sm:max-h-[400px] overflow-hidden overflow-y-auto scrollbar">
        <ul>
          <li className="w-full">
            <Link
              href="#"
              className="group relative block w-full px-3 py-3.5 text-body dark:text-white/60 hover:bg-white dark:hover:bg-white/10 hover:shadow-custom dark:shadow-none dark:rounded-4"
            >
              <div className="flex items-start">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-danger/10 text-danger me-4">
                  <UilHdd className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between flex-1">
                  <div>
                    <Heading
                      as="h5"
                      className="flex items-center justify-between mb-0.5 text-[#5a5f7d] dark:text-white/[.87] text-sm font-normal flex-wrap"
                    >
                      <span className="text-primary me-1.5 font-medium capitalize">Ibrahim Riaz</span> send you a message
                    </Heading>
                    <p className="mb-0 text-xs text-theme-gray dark:text-white/60">5 hours ago</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center justify-center bg-danger w-1.5 h-1.5 ms-3 rounded-full" />
                  </div>
                </div>
              </div>
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="#"
              className="group relative block w-full px-3 py-3.5 text-body dark:text-white/60 dark:hover:bg-white/10 hover:shadow-custom dark:rounded-4"
            >
              <div className="flex items-start">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary ltr:mr-4 rtl:ml-4">
                  <UilUpload className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between flex-1">
                  <div>
                    <Heading
                      as="h5"
                      className="flex items-center justify-between mb-0.5 text-[#5a5f7d] dark:text-white/[.87] text-sm font-normal flex-wrap"
                    >
                      <span className="text-primary ltr:mr-1.5 rtl:ml-1.5 font-medium capitalize">shamim ahmed</span> sent you a message
                    </Heading>
                    <p className="mb-0 text-xs text-theme-gray dark:text-white/60">3 hours ago</p>
                  </div>
                  <span className="inline-flex items-center justify-center bg-primary w-1.5 h-1.5 ltr:ml-3 rtl:mr-3 rounded-full" />
                </div>
              </div>
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="#"
              className="group relative block w-full px-3 py-3.5 text-body dark:text-white/60 hover:bg-white dark:hover:bg-white/10 hover:shadow-custom dark:shadow-none dark:rounded-4"
            >
              <div className="flex items-start">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10 text-secondary ltr:mr-4 rtl:ml-4">
                  <UilFileExport className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between flex-1">
                  <div>
                    <Heading
                      as="h5"
                      className="flex items-center justify-between mb-0.5 text-[#5a5f7d] dark:text-white/[.87] text-sm font-normal flex-wrap"
                    >
                      <span className="text-primary ltr:mr-1.5 rtl:ml-1.5 font-medium capitalize">tanjim ahmed</span> sent you a message
                    </Heading>
                    <p className="mb-0 text-xs text-theme-gray dark:text-white/60">9 hours ago</p>
                  </div>
                  <span className="inline-flex items-center justify-center bg-secondary w-1.5 h-1.5 ltr:ml-3 rtl:mr-3 rounded-full" />
                </div>
              </div>
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="#"
              className="group relative block w-full px-3 py-3.5 text-body dark:text-white/60 hover:bg-white dark:hover:bg-white/10 hover:shadow-custom dark:shadow-none dark:rounded-4"
            >
              <div className="flex items-start">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-warning/10 text-warning ltr:mr-4 rtl:ml-4">
                  <UilUpload className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between flex-1">
                  <div>
                    <Heading
                      as="h5"
                      className="flex items-center justify-between mb-0.5 text-[#5a5f7d] dark:text-white/[.87] text-sm font-normal flex-wrap"
                    >
                      <span className="text-primary ltr:mr-1.5 rtl:ml-1.5 font-medium capitalize">masud rana</span> sent you a message
                    </Heading>
                    <p className="mb-0 text-xs text-theme-gray dark:text-white/60">8 hours ago</p>
                  </div>
                  <span className="inline-flex items-center justify-center bg-warning w-1.5 h-1.5 ltr:ml-3 rtl:mr-3 rounded-full" />
                </div>
              </div>
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="#"
              className="group relative block w-full px-3 py-3.5 text-body dark:text-white/60 hover:bg-white dark:hover:bg-white/10 hover:shadow-custom dark:shadow-none dark:rounded-4"
            >
              <div className="flex items-start">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-danger/10 text-danger ltr:mr-4 rtl:ml-4">
                  <UilHeart className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between flex-1">
                  <div>
                    <Heading
                      as="h5"
                      className="flex items-center justify-between mb-0.5 text-[#5a5f7d] dark:text-white/[.87] text-sm font-normal flex-wrap"
                    >
                      <span className="text-primary ltr:mr-1.5 rtl:ml-1.5 font-medium capitalize">masud rana</span> sent you a message
                    </Heading>
                    <p className="mb-0 text-xs text-theme-gray dark:text-white/60">8 hours ago</p>
                  </div>
                  <span className="inline-flex items-center justify-center bg-danger w-1.5 h-1.5 ltr:ml-3 rtl:mr-3 rounded-full" />
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <Link
        href="#"
        className="flex items-center justify-center text-sm font-medium bg-[#f4f5f7] dark:bg-[#32333f] h-[50px] text-light hover:text-primary dark:hover:text-white/60 dark:text-white/[.87] mx-[-12px] mb-[-15px] rounded-b-6"
      >
        See all incoming activity
      </Link>
    </div>
  );

  return (
    <div className="flex">
      <PopOver placement="bottomLeft" content={content} action="click">
        <Link
          href="#"
          className="flex relative before:absolute before:bg-[#ff4d4f] before:w-1.5 before:h-1.5 before:rounded-full before:-top-1 before:right-0 before:shadow-dot"
        >
          <ReactSVG
            className="text-[#a0a0a0] dark:text-white/60"
            src='/hexadash-nextjs/img/icon/bell.svg'
          />
        </Link>
      </PopOver>
    </div>
  );
});

export default NotificationBox;
