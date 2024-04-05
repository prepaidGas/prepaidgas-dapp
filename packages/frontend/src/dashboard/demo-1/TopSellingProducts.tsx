import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Table } from 'antd';
import { Cards } from '@/components/cards/frame/cards-frame';

import topProduct from '../../demoData/table-data.json';
interface sellingData {
  today: string[][];
  week: string[][];
  month: string[][];
}

interface Data {
  key: number; 
  name: React.ReactElement; 
  img?: string; 
  price: React.ReactElement; 
  sold: React.ReactElement; 
  revenue: React.ReactElement 
}

interface Value {
  key: string;
  name: string;
  img: string;
  price: string;
  sold: string;
  revenue: string;
}

const { topSaleProduct } = topProduct;

const sellingColumns = [
  {
    title: 'Product Name',
    dataIndex: 'name',
    key: 'name',
    className:
      'ltr:pr-4 rtl:pl-4 text-light dark:text-white/60 text-[12px] py-2.5 last:text-end border-none uppercase before:hidden  ltr:rounded-l-4 rtl:rounded-r-4',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    className:
      'ltr:pr-4 rtl:pl-4 text-light dark:text-white/60 text-[12px] py-2.5 last:text-end border-none uppercase before:hidden',
  },
  {
    title: 'Sold',
    dataIndex: 'sold',
    key: 'sold',
    className:
      'ltr:pr-4 rtl:pl-4 text-light dark:text-white/60 text-[12px] py-2.5 last:text-end border-none uppercase before:hidden',
  },
  {
    title: 'Revenue',
    dataIndex: 'revenue',
    key: 'revenue',
    className:
      'ltr:pr-4 rtl:pl-4 text-light dark:text-white/60 text-[12px] py-2.5 last:text-end border-none uppercase before:hidden ltr:rounded-r-4 rtl:rounded-l-4',
  },
];

const TopSellingProduct = React.memo(() => {
  const [state, setState] = useState({
    sellingTab: 'today',
  });

  const handleChangePeriod = (value:string, event:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setState({
      ...state,
      sellingTab: value,
    });
  };

  /* State destructuring */
  const { sellingTab } = state;

  const sellingData:Data[] = [];
  if (topSaleProduct !== null && topSaleProduct[sellingTab as keyof sellingData]) {
    topSaleProduct[sellingTab as keyof sellingData].map((value:Value, index:number) => {
      const { name, img, price, sold, revenue } = value;
      return sellingData.push({
        key: index + 1,
        name: (
          <div className="flex items-center">
            <div className="ltr:mr-2.5 rtl:ml-2.5 w-[34px] h-[34px]">
            <Image className="w-[34px] h-[34px] rounded-4" src={`/hexadash-nextjs/img/products/electronics/${img}`} width="32" height="32" alt={name} />
            </div>
            <span className="font-medium capitalize text-dark dark:text-white/[.87] text-15">{name}</span>
          </div>
        ),
        price: <span className="font-normal capitalize text-[14px] text-dark dark:text-white/[.87]">{price}</span>,
        sold: <span className="font-normal capitalize text-[14px] text-dark dark:text-white/[.87]">{sold}</span>,
        revenue: <span className="font-normal capitalize text-[14px] text-dark dark:text-white/[.87]">{revenue}</span>,
      });
    });
  }

  return (
    <div className="h-full">
      <Cards
        isbutton={
          <ul className="flex items-center mb-0">
            <li>
              <Link
                className={
                  sellingTab === 'today'
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
                  sellingTab === 'week'
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
                  sellingTab === 'month'
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
        title="Top Selling Products"
        size="large"
        className="h-full border-none ant-card-body-p-25 ant-card-body-pt-0 ant-card-head-px-25 ant-card-head-b-none ant-card-head-title-base"
      >
        <div className="table-pl-0 hover-tr-none table-pt-15 table-responsive [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-s-4 [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-e-4">
          <Table columns={sellingColumns} dataSource={sellingData} pagination={false} />
        </div>
      </Cards>
    </div>
  );
});

export default TopSellingProduct;
