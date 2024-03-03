/* eslint-disable react/display-name */
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Cards } from '@/components/cards/frame/cards-frame';

const Table = dynamic(() => import('antd').then((mod) => mod.Table), {
  ssr: false,
});

import browserStates from '@/demoData/table-data.json';

interface sellingData {
  today: string[][];
  week: string[][];
  month: string[][];
}

interface Data {
  key: number; 
  img?: string; 
  name: React.ReactElement; 
  session: React.ReactElement; 
  bounceRate: React.ReactElement; 
  cte: React.ReactElement; 
  goalRate: React.ReactElement
}

interface Value {
  key: string;
  img: string;
  name: string;
  session: string;
  bounceRate: string;
  cte: string;
  goalRate: string;
};

const { browserState } = browserStates;

const BrowserState = React.memo(() => {
  const [state, setState] = useState({
    browserTab: 'today',
  });

  const handleChangePeriod = (value : string , event : React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setState({
      ...state,
      browserTab: value,
    });
  };

  /* State destructuring */
  const { browserTab } = state;

  const browserData:Data[] = [];
  if (browserState !== null && browserState[browserTab as keyof sellingData]) {
    browserState[browserTab as keyof sellingData].map((value:Value, index:number) => {
      const { key, name, img, session, bounceRate, cte, goalRate  } = value;
      return browserData.push({
        key: index + 1,
        name: (
          <div className="flex items-center">
            <div className="ltr:mr-2.5 rtl:ml-2.5 w-8 h-8">
              <Image className="w-8 h-8" src={`/hexadash-nextjs/img/browser/${img}`} width="32" height="32" alt={name} />
            </div>
            <span className="font-medium capitalize text-dark dark:text-white/[.87] text-15">{name}</span>
          </div>
        ),
        session: <span className="font-normal capitalize text-[14px] text-dark dark:text-white/[.87]">{session}</span>,
        bounceRate: (
          <span className="font-normal capitalize text-[14px] text-dark dark:text-white/[.87]">{bounceRate}</span>
        ),
        cte: <span className="font-normal capitalize text-[14px] text-dark dark:text-white/[.87]">{cte}</span>,
        goalRate: <span className="font-normal capitalize text-[14px] text-dark dark:text-white/[.87]">{goalRate}</span>,
      });
    });
  }

  const browserColumns = [
    {
      title: 'Browsers',
      dataIndex: 'name',
      key: 'name',
      className:
        'ltr:pr-4 rtl:pl-4 text-light dark:text-white/60 text-[12px] py-2.5 last:text-end border-none uppercase before:hidden  ltr:rounded-l-4 rtl:rounded-r-4',
    },
    {
      title: 'Session',
      dataIndex: 'session',
      key: 'session',
      className:
        'ltr:pr-4 rtl:pl-4 text-light dark:text-white/60 text-[12px] py-2.5 last:text-end border-none uppercase before:hidden',
    },
    {
      title: 'Bounce rate',
      dataIndex: 'bounceRate',
      key: 'bounceRate',
      className:
        'ltr:pr-4 rtl:pl-4 text-light dark:text-white/60 text-[12px] py-2.5 last:text-end border-none uppercase before:hidden',
    },
    {
      title: 'cte',
      dataIndex: 'cte',
      key: 'cte',
      className:
        'ltr:pr-4 rtl:pl-4 text-light dark:text-white/60 text-[12px] py-2.5 last:text-end border-none uppercase before:hidden',
    },
    {
      title: 'goal conv. rate',
      dataIndex: 'goalRate',
      key: 'goalRate',
      className:
        'ltr:pr-4 rtl:pl-4 text-light dark:text-white/60 text-[12px] py-2.5 last:text-end border-none uppercase before:hidden ltr:rounded-r-4 rtl:rounded-l-4',
    },
  ];

  return (
    <div className="h-full">
      <Cards
        isbutton={
          <ul className="flex items-center mb-0">
            <li>
              <Link
                className={
                  browserTab === 'today'
                    ? 'inline-flex items-center bg-primary-transparent dark:bg-white/10 px-3 h-8 text-primary dark:text-white/[.87] text-13 font-medium rounded-md'
                    : 'inline-flex items-center px-3 h-8 text-light dark:text-white/60 hover:text-primary text-13'
                }
                onClick={(e) => handleChangePeriod('today', e)}
                href="#"
              >
                Today
              </Link>
            </li>
            <li>
              <Link
                className={
                  browserTab === 'week'
                    ? 'inline-flex items-center bg-primary-transparent dark:bg-white/10 px-3 h-8 text-primary dark:text-white/[.87] text-13 font-medium rounded-md'
                    : 'inline-flex items-center px-3 h-8 text-light dark:text-white/60 dark:hover:text-white hover:text-primary text-13 font-medium rounded-md'
                }
                onClick={(e) => handleChangePeriod('week', e)}
                href="#"
              >
                Week
              </Link>
            </li>
            <li>
              <Link
                className={
                  browserTab === 'month'
                    ? 'inline-flex items-center bg-primary-transparent dark:bg-white/10 px-3 h-8 text-primary dark:text-white/[.87] text-13 font-medium rounded-md'
                    : 'inline-flex items-center px-3 h-8 text-light dark:text-white/60 dark:hover:text-white hover:text-primary text-13 font-medium rounded-md'
                }
                onClick={(e) => handleChangePeriod('month', e)}
                href="#"
              >
                Month
              </Link>
            </li>
          </ul>
        }
        title="Browser State"
        size="large"
        className="h-full border-none ant-card-body-p-25 ant-card-body-pt-0 ant-card-head-px-25 ant-card-head-b-none ant-card-head-title-base"
      >
        <div>
            <div className="table-pl-0 hover-tr-none table-pt-15 table-responsive [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-s-4 [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-e-4">
              <Table columns={browserColumns} dataSource={browserData} pagination={false} />
            </div>
        </div>
      </Cards>
    </div>
  );
});

export default BrowserState;
