import React, { useState } from 'react';
import { Table } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { Cards } from '@/components/cards/frame/cards-frame';

import tableData from '../../demoData/table-data.json';

const { newProduct } = tableData;

const productColumns = [
  {
    title: 'Product Name',
    dataIndex: 'pName',
    key: 'pName',
    className:
      'ltr:pr-4 rtl:pl-4 text-light dark:text-white/60 text-[12px] py-2.5 last:text-end border-none uppercase before:hidden  ltr:rounded-l-4 rtl:rounded-r-4',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    className:
      'ltr:pr-4 rtl:pl-4 text-light dark:text-white/60 text-[12px] py-2.5 last:text-end border-none uppercase before:hidden ltr:rounded-r-4 rtl:rounded-l-4',
  },
];

interface productData {
  today: string[][];
  week: string[][];
  month: string[][];
}

const NewProduct = React.memo(() => {
  const [state, setState] = useState({
    productTab: 'today',
  });

  /* State destructuring */
  const { productTab } = state;

  const newProductData:any = [];

  interface Product {
    key: string;
    name: string;
    img: string;
    price: string;
  }
  if (newProduct !== null) {
    newProduct[productTab as keyof productData].map((value:Product) => {
      const { key, name, img, price } = value;
      return newProductData.push({
        key,
        pName: (
          <div className="flex items-center">
            <div className="ltr:mr-2.5 rtl:ml-2.5 w-[34px] h-[34px]">
              <Image
                className="w-[34px] h-[34px]"
                src={`/hexadash-nextjs/img/products/electronics/${img}`}
                alt="Product"
                width="34"
                height="34"
              />
            </div>
            <span className="font-medium capitalize text-dark dark:text-white/[.87] text-15">{name}</span>
          </div>
        ),
        price: <span className="font-medium text-[14px] text-dark dark:text-white/[.87]">{price}</span>,
      });
    });
  }

  const handleTabActivation = (value:string, e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setState({
      ...state,
      productTab: value,
    });
  };

  return (
    <div className="h-full">
      <Cards
        isbutton={
          <div className="flex items-center">
            <ul className="flex items-center mb-0">
              <li>
                <Link
                  className={
                    productTab === 'today'
                      ? 'inline-flex items-center bg-primary-transparent dark:bg-white/10 px-3 h-8 text-primary dark:text-white/[.87] text-13 font-medium rounded-md'
                      : 'inline-flex items-center px-3 h-8 text-light dark:text-white/60 dark:hover:text-white hover:text-primary font-medium text-13'
                  }
                  onClick={(e) => handleTabActivation('today', e)}
                  href="#"
                >
                  Today
                </Link>
              </li>
              <li>
                <Link
                  className={
                    productTab === 'week'
                      ? 'inline-flex items-center bg-primary-transparent dark:bg-white/10 px-3 h-8 text-primary dark:text-white/[.87] text-13 font-medium rounded-md'
                      : 'inline-flex items-center px-3 h-8 text-light dark:text-white/60 dark:hover:text-white hover:text-primary font-medium text-13'
                  }
                  onClick={(e) => handleTabActivation('week', e)}
                  href="#"
                >
                  Week
                </Link>
              </li>
              <li>
                <Link
                  className={
                    productTab === 'month'
                      ? 'inline-flex items-center bg-primary-transparent dark:bg-white/10 px-3 h-8 text-primary dark:text-white/[.87] text-13 font-medium rounded-md'
                      : 'inline-flex items-center px-3 h-8 text-light dark:text-white/60 dark:hover:text-white hover:text-primary font-medium text-13'
                  }
                  onClick={(e) => handleTabActivation('month', e)}
                  href="#"
                >
                  Month
                </Link>
              </li>
            </ul>
          </div>
        }
        title="New Product"
        size="large"
        className="h-full border-none ant-card-body-p-25 ant-card-body-pt-0 ant-card-head-px-25 ant-card-head-b-none ant-card-head-title-base"
      >
        <div className="table-pl-0 hover-tr-none table-pt-15 table-responsive">
          <Table columns={productColumns} dataSource={newProductData} pagination={false} />
        </div>
      </Cards>
    </div>
  );
});

export default NewProduct;
