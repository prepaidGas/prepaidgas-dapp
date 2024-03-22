import React from 'react';
import Link from 'next/link';
import Heading from '@/components/heading';
import { Buttons } from '@/components/buttons';

interface UserCardListProps {
  user: {
    name: string;
    designation: string;
    img: string;
    content: React.ReactNode;
  };
}

function UserCardList({ user }:UserCardListProps) {
  const { name, designation, img, content } = user;
  return (
    <>
      <div className="card user-card theme-list">
        <div className="bg-white dark:bg-white/10 p-[30px] rounded-[10px]">
          <figure className="flex items-start justify-between sm:flex-wrap min-sm:gap-[20px] mb-0">
            <img className="w-[80px] h-[80px] mb-[18px] rounded-full" src={`/hexadash-nextjs/${img}`} alt="" />

            <figcaption className="flex items-start justify-between sm:flex-wrap text-start w-full gap-[10px] gap-y-[15px]">
              <div className="static">
                <Heading
                  className="text-[16px] mb-[6px] font-medium text-dark dark:text-white/[.87] leading-[20px]"
                  as="h6"
                >
                  <Link className="text-current" href="#">
                    {name}
                  </Link>
                </Heading>
                <p className="text-[13px] mb-[15px] text-light dark:text-white/60 max-w-[400px]">{designation}</p>
                <p className="mb-[12px] max-w-[400px] text-[15px] text-theme-gray dark:text-white/60">{content}</p>
                <p className="mb-0 max-w-[400px] text-[15px] text-theme-gray dark:text-white/60 inline-flex gap-[20px]">
                  <span className="text-[14px]">
                    <strong className="text-dark dark:text-white/[.87] font-semibold">$25/</strong>hr
                  </span>
                  <span className="text-[14px]">
                    <strong> $88K</strong> earned
                  </span>
                </p>
              </div>
              <div className="static text-end flex min-xs:justify-center xs:justify-start min-2xl:justify-end gap-[10px] flex-wrap">
                <Buttons
                  size="default"
                  type="white"
                  className="bg-transparent text-theme-gray dark:text-white/60 border-1 border-regular dark:border-white/10 text-[13px] h-[38px] rounded-6 shadow_0px_3px_5px_rgba(116,116,116, 0.02) px-[19.05px] min-w-[114px] font-semibold hover:bg-primary hover:text-white hover:border-primary dark:hover:text-white"
                >
                  View Profile
                </Buttons>
                <Buttons
                  size="default"
                  type="white"
                  className="bg-transparent text-theme-gray dark:text-white/60 border-1 border-regular dark:border-white/10 text-[13px] h-[38px] rounded-6 shadow_0px_3px_5px_rgba(116,116,116, 0.02) px-[19.05px] min-w-[114px] font-semibold hover:bg-primary hover:text-white hover:border-primary dark:hover:text-white"
                >
                  Message
                </Buttons>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </>
  );
}

export default UserCardList;
