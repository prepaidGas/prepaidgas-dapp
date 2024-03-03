import {
  UilAngleDown,
  UilBell,
  UilDollarSign,
  UilSetting,
  UilSignout,
  UilUser,
  UilUsersAlt,
 } from '@iconscout/react-unicons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Search from './Search';
import Message from './Message';
import Notification from './Notification';
import Settings from './settings';
import { logOutAction } from '@/redux/authentication/actionCreator';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useAuth } from '@/authentication/AuthContext'

import PopOver from '@/components/popup';
import Heading from '@/components/heading';
import DropDown from '@/components/dropdown';

const AuthInfo = React.memo((props:any) => {
  const router = useRouter();
  const [state, setState] = useState({
    flag: 'en',
  });
  const { i18n } = useTranslation();
  const { flag } = state;
  
  const dispatch = useDispatch();

  const { user } = useUser();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    if (!user && !currentUser) {
      // @ts-ignore
      dispatch(logOutAction(() => router.push('/')));
      console.log('Logged Out!');
    }
  }, []);

  const handleLogout = async (e: any) => {
    try {
      await logout()
      // @ts-ignore
      dispatch(logOutAction(() => router.push('/')));
      console.log('Successfully Logged Out!');
    } catch (err) {
      console.log(err);
    }
  }

  const userContent = (
    <div>
      <div className="min-w-[280px] sm:min-w-full">
        <figure className="flex items-center text-sm rounded-[8px] bg-section dark:bg-white/10 py-[20px] px-[25px] mb-[12px]">
          <Image className="rounded-full ltr:mr-4 rtl:ml-4" src={user?.picture ?? '/hexadash-nextjs/img/avatar/chat-auth.png'} alt="" width="50" height="50" />
          <figcaption>
            <Heading className="text-dark dark:text-white/[.87] mb-0.5 text-sm" as="h5">
              {user ? user.name: currentUser ? currentUser.displayName : 'Abdullah Bin Talha' }
            </Heading>
            <p className="mb-0 text-xs text-body dark:text-white/60">UI Expert</p>
          </figcaption>
        </figure>
        <ul className="mb-[10px]">
          <li>
            <Link
              href="#"
              className="inline-flex items-center hover:bg-primary/[.05] rounded-4 text-light dark:text-white/60 dark:hover:text-white hover:text-primary dark:hover:bg-white/10 dark:rounded-4 hover:pl-6 w-full px-2.5 py-3 text-sm transition-all ease-in-out delay-150"
            >
              <UilUser className="w-4 h-4 ltr:mr-3 rtl:ml-3" /> Profile
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="inline-flex items-center hover:bg-primary/[.05] rounded-4 text-light dark:text-white/60 dark:hover:text-white hover:text-primary dark:hover:bg-white/10 dark:rounded-4 hover:pl-6 w-full px-2.5 py-3 text-sm transition-all ease-in-out delay-150"
            >
              <UilSetting className="w-4 h-4 ltr:mr-3 rtl:ml-3" /> Settings
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="inline-flex items-center hover:bg-primary/[.05] rounded-4 text-light dark:text-white/60 dark:hover:text-white hover:text-primary dark:hover:bg-white/10 dark:rounded-4 hover:pl-6 w-full px-2.5 py-3 text-sm transition-all ease-in-out delay-150"
            >
              <UilDollarSign className="w-4 h-4 ltr:mr-3 rtl:ml-3" /> Billing
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="inline-flex items-center hover:bg-primary/[.05] rounded-4 text-light dark:text-white/60 dark:hover:text-white hover:text-primary dark:hover:bg-white/10 dark:rounded-4 hover:pl-6 w-full px-2.5 py-3 text-sm transition-all ease-in-out delay-150"
            >
              <UilUsersAlt className="w-4 h-4 ltr:mr-3 rtl:ml-3" /> Activity
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="inline-flex items-center hover:bg-primary/[.05] rounded-4 text-light dark:text-white/60 dark:hover:text-white hover:text-primary dark:hover:bg-white/10 dark:rounded-4 hover:pl-6 w-full px-2.5 py-3 text-sm transition-all ease-in-out delay-150"
            >
              <UilBell className="w-4 h-4 ltr:mr-3 rtl:ml-3" /> Help
            </Link>
          </li>
        </ul>
        <Link
          onClick={handleLogout}
          href={user ? '/api/auth/logout' : '#'}
          className="flex items-center justify-center text-sm font-medium bg-[#f4f5f7] dark:bg-[#32333f] h-[50px] text-light hover:text-primary dark:hover:text-white/60 dark:text-white/[.87] mx-[-12px] mb-[-15px] rounded-b-6"
        >
          <UilSignout className="w-4 h-4 ltr:mr-3 rtl:ml-3" /> Sign Out
        </Link>
      </div>
    </div>
  );

  const onFlagChangeHandle = (value:string, e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setState({
      ...state,
      flag: value,
    });
    
    i18n.changeLanguage(value);
  };

  const country = [
    {
      key: '1',
      label: (
        <Link
          href="#"
          onClick={(e) => onFlagChangeHandle('en', e)}
          className="flex items-center bg-white dark:bg-white/10 hover:bg-primary/[.05] rounded-4 px-3 py-1.5 text-sm text-dark dark:text-white/60"
        >
          <Image className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" src='/hexadash-nextjs/img/flag/en.png' alt=""  width="20" height="20" />
          <span>English</span>
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link
          href="#"
          onClick={(e) => onFlagChangeHandle('esp', e)}
          className="flex items-center bg-white dark:bg-white/10 hover:bg-primary/[.05] rounded-4 px-3 py-1.5 text-sm text-dark dark:text-white/60"
        >
          <Image className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" src='/hexadash-nextjs/img/flag/esp.png' alt=""  width="20" height="20" />
          <span>Spanish</span>
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link
          href="#"
          onClick={(e) => onFlagChangeHandle('ar', e)}
          className="flex items-center bg-white dark:bg-white/10 hover:bg-primary/[.05] rounded-4 px-3 py-1.5 text-sm text-dark dark:text-white/60"
        >
          <Image className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" src='/hexadash-nextjs/img/flag/ar.png' alt=""  width="20" height="20" />
          <span>Arabic</span>
        </Link>
      ),
    }
  ];

  return (
    <div className="flex items-center justify-end flex-auto gap-6 lg:gap-4">
      <div className="lg:visible md:hidden">
        <Search />
      </div>
      <Message />
      <Notification />
      <Settings />
      <div className="flex">
        <DropDown placement="bottomRight" customContent={country}>
          <Link href="#" className="flex">
            <Image src='/hexadash-nextjs/img/flag/en.png' alt="" width="20" height="20" />
          </Link>
        </DropDown>
      </div>
      <div className="flex">
        <PopOver placement="bottomRight" content={userContent} action="click">
          <Link href="#" className="flex items-center overflow-x-auto text-light whitespace-nowrap">
            <Image src={user?.picture ?? '/hexadash-nextjs/img/avatar/matureman1.png'} alt="Avatar" width="32" height="32" className="rounded-full" />
            <span className="ms-2.5 lg:ms-1.5 me-1.5 text-body dark:text-white/60 text-sm font-medium md:hidden">
              {user ? user.name: currentUser ? currentUser.displayName : 'Abdullah Bin Talha' }
            </span>
            <UilAngleDown className="w-4 h-4 min-w-[16px]" />
          </Link>
        </PopOver>
      </div>
    </div>
  );
});

export default AuthInfo;
