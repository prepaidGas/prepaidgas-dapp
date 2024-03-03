import React from 'react';
import {
  UilBookOpen,
  UilFile,
  UilFileAlt,
  UilPrint,
  UilTimes,
} from '@iconscout/react-unicons';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Progress } from 'antd';
import { Cards } from '@/components/cards/frame/cards-frame';

import salesData from '../../demoData/salesData.json';

interface RootState {
  ChangeLayoutMode: {
    mode: string;
  };
}

const SalesOverview = React.memo(() => {
  const { mainContent } = useSelector((state:RootState) => {
    return {
      mainContent: state.ChangeLayoutMode.mode,
    };
  });

  const moreContent = (
    <div className="block bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-4">
      <Link
        className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm"
        href="#"
      >
        <UilPrint className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>Printer</span>
      </Link>
      <Link
        className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm"
        href="#"
      >
        <UilBookOpen className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>PDF</span>
      </Link>
      <Link
        className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm"
        href="#"
      >
        <UilFileAlt className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>Google Sheets</span>
      </Link>
      <Link
        className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm"
        href="#"
      >
        <UilTimes className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>Excel (XLSX)</span>
      </Link>
      <Link
        className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm"
        href="#"
      >
        <UilFile className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>CSV</span>
      </Link>
    </div>
  );

  return (
    <div className="h-full">
      <Cards
        className="h-full ant-card-body-p-25 ant-card-head-px-25 ant-card-head-title-base"
        title="Sales Overview"
        more={moreContent}
      >
        <div className="flex items-center justify-center flex-col [%>div>div]:flex [%>div>div]:flex-col [%>div>div]:bg-transparent [&>div>div>.ant-progress-text]:text-primary [&>div>div>.ant-progress-text]:font-semibold">
          <Progress
            type="circle"
            percent={75}
            size={250}
            strokeColor="#8231D3"
            trailColor={mainContent === 'lightMode' ? '#E6D5F6' : '#322035'}
          />
          <div className="flex justify-center text-center mt-[20px]">
            {salesData.map((item, i) => {
              return (
                <div className="min-w-[200px]" key={i}>
                  <span className="inline-block text-[16px] mb-[6px] text-theme-gray dark:text-white/60">
                    {item.status}
                  </span>
                  <h4 className="text-[24px] font-semibold m-0 leading-[1] text-dark dark:text-white/[.87]">
                    {item.salesCount}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      </Cards>
    </div>
  );
});

export default SalesOverview;
