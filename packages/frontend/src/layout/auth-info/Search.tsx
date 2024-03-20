
import {
  UilSearch,
  UilTimes,
} from '@iconscout/react-unicons';
import { Form, Input } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
// import { useSelector } from 'react-redux';

const SearchBar = React.memo(() => {
  const [form] = Form.useForm();

  const [state, setState] = useState({
    openSearch: false,
  });

  const openSearchbar = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setState({
      ...state,
      openSearch: true,
    });
  };
  const closeSearchbar = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setState({
      ...state,
      openSearch: false,
    });
  };

  const { openSearch } = state;

  return (
    <div className="flex items-center">
      <div
        className={
          openSearch
            ? 'null ssm:fixed ssm:top-[72px] ssm:bg-white ssm:dark:bg-[#1b1d2a] ssm:rounded-[6px] ssm:ltr:ssm:right-[10px] rtl:ssm:left-[10px] ssm:min-w-[280px] ssm:z-[98] '
            : 'opacity-0 invisible w-0'
        }
      >
        <Form form={form} name="">
          <Form.Item name="search-input" className="mb-0">
            <Input
              className="bg-transparent dark:bg-transparent p-1.5 ssm:h-[48px] ssm:px-[20px] ssm:dark:shadow-none ssm:border-1 border-transparent dark:ssm:border-white/10 focus:shadow-[0px_0px_0px_2px_rgba(130,49,211,0.2)] placeholder:dark:text-white/60"
              placeholder="Search Here"
            />
          </Form.Item>
        </Form>
      </div>
      <Link
        href="/"
        onClick={(e) => openSearchbar(e)}
        className={
          openSearch
            ? 'hidden opacity-0'
            : 'hexadash-search-icon text-theme-gray dark:text-white/60 '
        }
      >
        <UilSearch className="w-4 h-4" />
      </Link>
      <Link
        href="/"
        onClick={(e) => closeSearchbar(e)}
        className={openSearch ? 'flex relative -top-1 w-4 h-4 text-theme-gray dark:text-white/60' : 'hidden opacity-0'}
      >
        <UilTimes />
      </Link>
    </div>
  );
});

export default SearchBar;
