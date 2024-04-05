import Link from 'next/link';
import {
  UilBook,
  UilDownloadAlt,
  UilFile,
  UilFileAlt,
  UilPrint,
  UilTimes
} from '@iconscout/react-unicons';
import PopOver from '@/components/popup';
import { Buttons } from '@/components/buttons';

function ExportButtonPageHeader() {
  const content = (
    <div className="block bg-white dark:bg-[#1b1d2a]">
      <Link className="flex items-center hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm" href="#">
        <UilPrint className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>Printer</span>
      </Link>
      <Link className="flex items-center hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm" href="#">
        <UilBook className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>PDF</span>
      </Link>
      <Link className="flex items-center hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm" href="#">
        <UilFileAlt className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>Google Sheets</span>
      </Link>
      <Link className="flex items-center hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm" href="#">
        <UilTimes className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>Excel (XLSX)</span>
      </Link>
      <Link className="flex items-center hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm" href="#">
        <UilFile className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>CSV</span>
      </Link>
    </div>
  );
  return (
    <PopOver placement="bottomLeft" content={content} trigger="click">
      <Buttons
        className="text-[14px] font-medium border-none leading-[22px] dark:bg-white/10 text-theme-gray dark:text-white/60 dark:focus:text-dark dark:hover:text-dark inline-flex items-center justify-center rounded-[4px] px-[20px] h-[34px] gap-[8px]"
        size="small"
        type="white"
      >
        <UilDownloadAlt className="w-[14px] h-[14px] text-primary" />
        Export
      </Buttons>
    </PopOver>
  );
}

export { ExportButtonPageHeader };
