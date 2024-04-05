import Link from 'next/link';
import { UilCommentAlt } from '@iconscout/react-unicons';
import Heading from '@/components/heading';
import { Buttons } from '@/components/buttons';

interface UserCardStyleProps {
  user: {
    name: string;
    designation: string;
    img: string;
    cover: {};
  };
}

function UserCardStyle({ user }:UserCardStyleProps) {
  const { name, designation, img, cover } = user;
  return (
    <div {...cover}>
      <div className="card user-card theme-grid-2">
        <div className="bg-white dark:bg-[#1b1d2a] rounded-[10px]">
          <figure className="relative mb-0">
            <div className="mb-0 absolute top-[80px] ltr:left-[50%] rtl:right-[50%] translate-x-[-50%] w-[132px] h-[132px] rounded-full bg-white z-[22] dark:bg-dark p-[5px]">
              <img className="rounded-full" src={`/hexadash-nextjs/${img}`} alt="" />
            </div>

            <figcaption>
              <div
                className="rounded-t-[10px] w-full bg-cover bg-center bg-no-repeat static h-[150px]"
                style={{
                  background: `url(${`/hexadash-nextj/${cover}`})`,
                }}
              />
              <div className="relative bg-white dark:bg-[#1b1d2a] top-[-26px] pt-[102px] rounded-t-[30px] rounded-b-[10px] text-center">
                <div className="static">
                  <Heading
                    className="text-[16px] mb-[6px] font-medium text-dark dark:text-white/[.87] leading-[20px]"
                    as="h6"
                  >
                    <Link className="text-current" href="#">
                      {name}
                    </Link>
                  </Heading>
                  <p className="text-[13px] mb-[25px] text-light dark:text-white/60">{designation}</p>
                </div>

                <div className="static flex justify-center items-center gap-[10px] text-center">
                  <Buttons
                    size="default"
                    type="white"
                    className="bg-transparent text-theme-gray dark:text-white/60 border-1 border-regular dark:border-white/10 text-[13px] h-[38px] rounded-6 shadow_0px_3px_5px_rgba(116,116,116, 0.02) px-[22.7px] font-semibold hover:bg-primary hover:text-white hover:border-primary dark:hover:text-white flex items-center gap-[5px] justify-center"
                  >
                    <UilCommentAlt className="w-[14px] h-[14px]" />
                    Chat
                  </Buttons>
                  <Buttons
                    size="default"
                    type="white"
                    className="bg-transparent text-theme-gray dark:text-white/60 border-1 border-regular dark:border-white/10 text-[13px] h-[38px] rounded-6 shadow_0px_3px_5px_rgba(116,116,116, 0.02) px-[22.7px] font-semibold hover:bg-primary hover:text-white hover:border-primary dark:hover:text-white"
                  >
                    View Profile
                  </Buttons>
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

export default UserCardStyle;
