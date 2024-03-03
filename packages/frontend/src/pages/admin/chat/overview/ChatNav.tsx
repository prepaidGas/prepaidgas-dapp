import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Badge, Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import { AutoCompleted } from '@/components/autoComplete';

import PrivateChat from './PrivateChat';
import GroupChat from './GroupChat';
import AllContacts from './AllContacts';

function ChatNav() {
  
  const router = useRouter();
  const { pathname } = router;
  const currentPath = pathname.split('/')[3];

  const path = '/admin/chat'

  interface RootState {
    ChangeLayoutMode: {
      rtlData: boolean;
    }
    headerSearchData: string[];
  }

  const { searchData } = useSelector((state:RootState) => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
      searchData: state.headerSearchData,
    };
  });

  const [state, setState] = useState({
    search: searchData,
    me: 'sovware@gmail.com',
  });

  const { notData }:any = state;

  const patternSearch = (searchText:string) => {
    const data = searchData.filter((item:any) => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      search: data,
    });
  };


  return (
    <div className="bg-white dark:bg-white/10  min-h-[550px] py-[25px] rounded-[10px] shadow-[0_5px_20px_rgba(146,153,184,0.01)] lg:mb-[30px]">
      <div className="px-[25px] ssm:px-[15px] [&>div>div>span>.ant-select-selection-search-input]:bg-normalBG dark:[&>div>div>span>.ant-select-selection-search-input]:bg-white/10 [&>div>div>span>.ant-select-selection-search-input]:h-[46px] [&>div>div>span>.ant-select-selection-search-input]:border-none [&>div>div>span>.ant-select-selection-search-input>input]:bg-transparent dark:[&>div>div>span>.ant-select-selection-search-input>input]:bg-transparent [&>div>div>span>.ant-input-affix-wrapper>.ant-input-suffix>span>svg]:!text-theme-gray dark:[&>div>div>span>.ant-input-affix-wrapper>.ant-input-suffix>span>svg]:!text-white/60 [&>div>.ant-select-selector>.ant-select-selection-placeholder]:h-11 [&>div>.ant-select-selector>.ant-select-selection-placeholder]:leading-[42px] [&>div>.ant-select-selector>.ant-select-selection-placeholder]:px-5">
        <AutoCompleted placeholder="Search Here" onSearch={patternSearch} dataSource={notData} width="100%" patterns />
      </div>
      <nav className="px-[25px] ssm:px-[15px]">
        <ul className="flex items-center justify-between gap-3 lg:gap-2.5 flex-wrap mb-3 pt-[30px] xs:text-[13px] border-b  border-regular dark:border-white/10">
          <li>
            <Link
              href={`${path}/private/rofiq@gmail.com`}
              className={`relative block pb-[18px] -mb-[1px] after:absolute ltr:after:left-0 rtl:after:right-0 after:bottom-0 after:h-[1px] after:w-full ${
                currentPath === 'private'
                  ? 'text-primary font-medium after:bg-primary'
                  : 'text-light dark:text-[#a4a5aa] after:bg-transparent'
              }`}
            >
              Private Chat
            </Link>
          </li>
          <li>
            <Link
              href={`${path}/group/1`}
              className={`relative block pb-[18px] -mb-[1px] after:absolute ltr:after:left-0 rtl:after:right-0 after:bottom-0 after:h-[1px] after:w-full ${
                currentPath === 'group'
                  ? 'text-primary font-medium after:bg-primary'
                  : 'text-light dark:text-[#a4a5aa] after:bg-transparent'
              }`}
            >
              Group Chat
              <Badge className="ltr:ml-1.5 rtl:mr-1.5" count={3} />
            </Link>
          </li>
          <li>
            <Link
              href={`${path}/all/rofiq@gmail.com`}
              className={`relative block pb-[18px] -mb-[1px] after:absolute ltr:after:left-0 rtl:after:right-0 after:bottom-0 after:h-[1px] after:w-full ${
                currentPath === 'all'
                  ? 'text-primary font-medium after:bg-primary'
                  : 'text-light dark:text-[#a4a5aa] after:bg-transparent'
              }`}
            >
              All Contacts
            </Link>
          </li>
        </ul>
      </nav>
      <div className="h-[495px] overflow-y-auto ltr:3xl:[&>div>div]:!mr-0 rtl:3xl:[&>div>div]:!ml-0 scrollbar">
        {currentPath === 'private' ? <PrivateChat /> : currentPath === 'group' ? <GroupChat /> : currentPath === 'all' ? <AllContacts /> : <PrivateChat />}
      </div>
    </div>
  );
}

export default ChatNav;
