import Link from 'next/link';
import FontAwesome from 'react-fontawesome';
import { UilEllipsisH } from '@iconscout/react-unicons';
import DropDown from '@/components/dropdown';
import socialMediaLinks from '@/demoData/socialMediaLinks.json';

interface TeamCardProps {
  user: {
    name: string;
    designation: string;
    img: string;
  };
  actions: {
    key: string;
    label: JSX.Element;
  }[];
}

function TeamCard({ user, actions }:TeamCardProps) {
  const { name, designation, img } = user;

  return (
    <>
      <div className="relative bg-white dark:bg-white/10 p-[25px] rounded-[10px] shadow-[0_5px_20px_rgba(173,181,217,0.01)] text-center">
        <figure className="mb-0">
          <img
            className="mb-[20px] w-full rounded-full max-w-[150px] inline-block"
            src={`/hexadash-nextjs/${img}`}
            alt=""
          />
          <figcaption>
            <div className="absolute py-1 dark:bg-transparent ltr:right-[24px] rtl:left-[24px] top-[20px] leading-[0.5] rounded-10 text-light-extra dark:text-white60">
              <DropDown content={actions} action={['click']}>
                <Link className="text-light-extra dark:text-white60 " href="#">
                  <UilEllipsisH className="w-[20px] h-[20px] " />
                </Link>
              </DropDown>
            </div>
            <h6 className="text-[16px] mb-6px font-medium text-dark dark:text-white/60">
              <Link className="text-current" href="#">
                {name}
              </Link>
            </h6>
            <span className="text-[13px] mb-[25px] text-light dark:text-white/60">{designation}</span>
            <div className="flex flex-wrap items-center justify-center mt-[16px] gap-[10px]">
              {socialMediaLinks.map((link) => (
                <Link
                  key={link.id}
                  className={`w-[38px] h-[38px] rounded-full inline-flex items-center justify-center bg-white dark:bg-white/10 shadow-[0_10px_20px_rgba(116,116,116,0.08)] btn-icon text-${link.icon}`}
                  href={`https://${link.name.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesome className="text-current" name={link.icon} />
                </Link>
              ))}
            </div>
          </figcaption>
        </figure>
      </div>
    </>
  );
}

export default TeamCard;
