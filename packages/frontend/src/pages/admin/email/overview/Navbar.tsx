import React, { useState } from 'react';
import Link from 'next/link';
import { Input, Form } from 'antd';
import { useRouter } from 'next/router';
import {
  UilInbox,
  UilStar,
  UilMessage,
  UilPlus,
  UilEdit,
  UilExclamationOctagon,
  UilTrashAlt,
  UilListUl
} from '@iconscout/react-unicons';
import Title from '@/components/heading';
import { Buttons } from '@/components/buttons';

const EmailNavbar = React.memo(() => {
  const router = useRouter();
  const { pathname } = router;
  const currentPath = pathname.split('/')[3];

  const path = '/admin/email';

  const [state, setState] = useState({
    labels: ['personal', 'social', 'promotions'],
    newLabel: '',
    addNewDisplay: false,
  });
  const { labels, newLabel, addNewDisplay } = state;

  const addNewLabels = (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setState({
      ...state,
      addNewDisplay: true,
    });
  };

  const cancelAddNewLabels = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setState({
      ...state,
      addNewDisplay: false,
    });
  };

  const handelChange = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (newLabel !== '') {
      setState({
        ...state,
        labels: [...labels, newLabel],
        newLabel: '',
      });
    } else {
      alert('Please Give a label...');
    }
  };

  const onLabelChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      newLabel: e.target.value,
    });
  };

  return (
    <>
      <ul className="mb-0">
        <li className="relative">
          <Link
            href={`${path}/inbox`}
            className={`flex items-center px-[15px] py-[10px] gap-[15px] rounded-md ${
              currentPath === 'inbox' || currentPath === undefined || currentPath === ''
                ? 'bg-primary-transparent text-primary group [&.active>svg]:text-primary'
                : 'bg-transparent  text-body dark:text-white/60 group [&>svg]:text-light-extra dark:[&>svg]:text-white/60'
            }`}
          >
            <UilInbox className="w-4 h-4" />
            <span className="flex items-center justify-between w-full">
              <span>Inbox</span>
              <span className="flex items-center justify-center bg-primary-transparent text-primary h-[20px] px-[6.5px] text-[11px] rounded-[10px] font-medium">
                3
              </span>
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={`${path}/starred`}
            className={`flex items-center px-[15px] py-[10px] gap-[15px] rounded-md ${
              currentPath === 'starred'
                ? 'bg-primary-transparent text-primary [&.active>svg]:text-primary'
                : 'text-body dark:text-white/60 [&>svg]:text-light-extra dark:[&>svg]:text-white/60'
            }`}
          >
            <UilStar className="w-4 h-4" />
            <span className="flex items-center justify-between w-full">
              <span>Starred</span>
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={`${path}/sent`}
            className={`flex items-center px-[15px] py-[10px] gap-[15px] rounded-md ${
              currentPath === 'sent'
                ? 'bg-primary-transparent text-primary [&.active>svg]:text-primary'
                : 'text-body [&>svg]:text-light-extra dark:text-white/60'
            }`}
          >
            <UilMessage className="w-4 h-4" />
            <span className="flex items-center justify-between w-full">
              <span>Sent</span>
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={`${path}/drafts`}
            className={`flex items-center px-[15px] py-[10px] gap-[15px] rounded-md ${
              currentPath === 'drafts'
                ? 'bg-primary-transparent text-primary [&.active>svg]:text-primary'
                : 'text-body dark:text-white/60 [&>svg]:text-light-extra dark:[&>svg]:text-white/60'
            }`}
          >
            <UilEdit className="w-4 h-4" />
            <span className="flex items-center justify-between w-full">
              <span>Drafts</span>
              <span className="flex items-center justify-center bg-primary-transparent text-primary h-[20px] px-[6.5px] text-[11px] rounded-[10px] font-medium">
                12
              </span>
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={`${path}/spam`}
            className={`flex items-center px-[15px] py-[10px] gap-[15px] rounded-md ${
              currentPath === 'spam'
                ? 'bg-primary-transparent text-primary [&.active>svg]:text-primary'
                : 'text-body [&>svg]:text-light-extra dark:text-white/60'
            }`}
          >
            <UilExclamationOctagon className="w-4 h-4" />
            <span className="flex items-center justify-between w-full">
              <span>Spam</span>
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={`${path}/trash`}
            className={`flex items-center px-[15px] py-[10px] gap-[15px] rounded-md ${
              currentPath === 'trash'
                ? 'bg-primary-transparent text-primary [&.active>svg]:text-primary'
                : 'text-body dark:text-white/60 [&>svg]:text-light-extra dark:[&>svg]:text-white/60'
            }`}
          >
            <UilTrashAlt className="w-4 h-4" />
            <span className="flex items-center justify-between w-full">
              <span>Trash</span>
            </span>
          </Link>
        </li>
      </ul>
      <div className="mt-[35px]">
        <p className="m-0 px-[15px] text-[#9299b8] dark:text-white/60 text-xs">Labels</p>
        <ul className="mt-1.5 mb-0">
          {labels.map((label) => {
            return (
              <li key={label} className="relative">
                <Link
                  href="#"
                  className="flex items-center bg-transparent text-body dark:text-white/60 px-[15px] py-[10px] gap-[15px] rounded-md capitalize hover:bg-primary-transparent hover:text-primary"
                >
                  <UilListUl className="w-4 h-4" /> {label}
                </Link>
              </li>
            );
          })}

          <li className="relative" onKeyPress={() => {}} onClick={addNewLabels} role="menuitem">
            <Link
              onClick={addNewLabels}
              href="./newLabels"
              className="flex items-center bg-transparent text-light dark:text-white/60 px-[15px] py-[10px] gap-[15px] text-[15px] rounded-md capitalize hover:bg-primary-transparent hover:text-primary"
            >
              <UilPlus className="w-4 h-4" /> Add New Label
            </Link>
            {addNewDisplay && (
              <div className="shadow-[rgba(146,153,184,0.2)_0px_10px_40px] relative w-[calc(100%_+_60px)] -translate-x-2/4 px-[30px] py-[25px] rounded-lg left-2/4 bg-white dark:bg-[#323440] ">
                <Form onFinish={handelChange}>
                  <Title label={3} className="mb-4 text-base font-medium text-dark dark:text-white/[.87]">
                    Add New Label
                  </Title>
                  <Input
                    onChange={onLabelChange}
                    value={newLabel}
                    name={newLabel}
                    type="text"
                    placeholder="Enter label name"
                    className="bg-white border rounded-sm border-normal dark:bg-white/10 h-11 text-body dark:text-white/60 dark:border-white/10 hover:border-primary dark:placeholder:text-white/60 px-[20px]"
                  />
                  <div className="flex items-center flex-wrap mt-[10px] -mx-[5px] -mb-[5px]">
                    <Buttons
                      size="default"
                      onClick={handelChange}
                      type="primary"
                      className="bg-primary hover:bg-primary-hbr h-[38px] m-[5px] px-5 text-white dark:text-white/[.87] text-sm font-semibold rounded"
                    >
                      Add Label
                    </Buttons>
                    <Buttons
                      onClick={cancelAddNewLabels}
                      type="default"
                      className="h-[38px] m-[5px] px-5 text-light dark:text-white/60 text-sm font-semibold border-none bg-white dark:bg-white/10 shadow-none"
                    >
                      Cancel
                    </Buttons>
                  </div>
                </Form>
              </div>
            )}
          </li>
        </ul>
      </div>
    </>
  );
});

export default EmailNavbar;
