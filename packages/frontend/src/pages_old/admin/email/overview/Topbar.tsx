import React from 'react';
import Link from 'next/link';
import { Tooltip } from 'antd';
import {
  UilRedo,
  UilArchive,
  UilExclamationOctagon ,
  UilTrash,
  UilFolder,
  UilBookOpen 
} from '@iconscout/react-unicons';

const Topbar = React.memo(({ refreshState }:any) => {
  return (
    <div className="flex items-center">
      <Tooltip placement="bottom" title="Refresh">
        <Link
          onClick={refreshState}
          href="#"
          className="inline-flex items-center justify-center bg-transparent text-light-extra dark:text-white/60 w-[38px] h-[38px] rounded-full hover:bg-primary-transparent hover:text-primary dark:hover:text-primary"
        >
          <UilRedo className="w-4 h-4" />
        </Link>
      </Tooltip>
      <Tooltip placement="bottom" title="Archive">
        <Link
          href="#"
          className="inline-flex items-center justify-center bg-transparent text-light-extra dark:text-white/60 w-[38px] h-[38px] rounded-full hover:bg-primary-transparent hover:text-primary dark:hover:text-primary"
        >
          <UilArchive className="w-4 h-4" />
        </Link>
      </Tooltip>
      <Tooltip placement="bottom" title="Info">
        <Link
          href="#"
          className="inline-flex items-center justify-center bg-transparent text-light-extra dark:text-white/60 w-[38px] h-[38px] rounded-full hover:bg-primary-transparent hover:text-primary dark:hover:text-primary"
        >
          <UilExclamationOctagon className="w-4 h-4" />
        </Link>
      </Tooltip>
      <Tooltip placement="bottom" title="Delete">
        <Link
          href="#"
          className="inline-flex items-center justify-center bg-transparent text-light-extra dark:text-white/60 w-[38px] h-[38px] rounded-full hover:bg-primary-transparent hover:text-primary dark:hover:text-primary"
        >
          <UilTrash className="w-4 h-4" />
        </Link>
      </Tooltip>
      <Tooltip placement="bottom" title="Read">
        <Link
          href="#"
          className="inline-flex items-center justify-center bg-transparent text-light-extra dark:text-white/60 w-[38px] h-[38px] rounded-full hover:bg-primary-transparent hover:text-primary dark:hover:text-primary"
        >
          <UilBookOpen className="w-4 h-4" />
        </Link>
      </Tooltip>
      <Tooltip placement="bottom" title="Folder">
        <Link
          href="#"
          className="inline-flex items-center justify-center bg-transparent text-light-extra dark:text-white/60 w-[38px] h-[38px] rounded-full hover:bg-primary-transparent hover:text-primary dark:hover:text-primary"
        >
          <UilFolder className="w-4 h-4" />
        </Link>
      </Tooltip>
    </div>
  );
});

export default Topbar;
