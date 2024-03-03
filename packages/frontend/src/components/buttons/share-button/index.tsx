import Link from 'next/link';
import {
  UilFacebook,
  UilInstagram,
  UilLinkedin,
  UilRss,
  UilShareAlt,
  UilTwitter
} from '@iconscout/react-unicons';
import PopOver from '@/components/popup';
import { Buttons } from '@/components/buttons';

function ShareButtonPageHeader() {
  const content = (
    <>
      <div className="block bg-white dark:bg-[#1b1d2a]">
        <Link
          className="flex items-center hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm"
          href="#"
        >
          <UilFacebook className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
          <span>Facebook</span>
        </Link>
        <Link
          className="flex items-center hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm"
          href="#"
        >
          <UilTwitter className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
          <span>Twitter</span>
        </Link>
        <Link
          className="flex items-center hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm"
          href="#"
        >
          <UilRss className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
          <span>Feed</span>
        </Link>
        <Link
          className="flex items-center hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm"
          href="#"
        >
          <UilLinkedin className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
          <span>Linkedin</span>
        </Link>
        <Link
          className="flex items-center hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm"
          href="#"
        >
          <UilInstagram className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
          <span>Instagram</span>
        </Link>
      </div>
    </>
  );
  return (
    <PopOver placement="bottomLeft" content={content} trigger="click">
      <Buttons
        className="text-[14px] font-medium border-none leading-[22px] dark:bg-white/10 text-theme-gray dark:text-white/60 dark:focus:text-dark dark:hover:text-dark inline-flex items-center justify-center rounded-[4px] px-[20px] h-[34px] gap-[8px]"
        size="small"
        type="white"
        key="3"
      >
        <UilShareAlt className="w-[14px] h-[14px] text-primary" />
        Share
      </Buttons>
    </PopOver>
  );
}

export { ShareButtonPageHeader };
