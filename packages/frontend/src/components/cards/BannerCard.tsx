import Link from 'next/link'
import {
  UilEllipsisH,
  UilEye,
  UilHeart
} from '@iconscout/react-unicons';
import DropDown from '../dropdown';
import { Buttons } from '../buttons';

interface BannerCardProps {
  item: {
    id: number;
    content: string;
    icon: string;
    title: string;
    authorName: string;
    authorImg: string;
    type?: string;
    bgImage?: string;
    titleColor?: string;
    subTitleColor?: string;
  }
}

function BannerCard( { item }:BannerCardProps ) {
  const { content, icon, title, authorName, authorImg, type, bgImage, titleColor, subTitleColor } = item;

  const moreContent = [
    {
        key: '1',
        label: (
            <Link
                className="group flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm gap-[10px] [&>svg]:w-[14px] [&>svg]:h-[14px] [&>svg]:text-light-extra dark:[&>svg]:text-white/60"
                href="#"
            >
                View
            </Link>
        ),
    },
    {
        key: '2',
        label: (
            <Link
                className="group flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm gap-[10px] [&>svg]:w-[14px] [&>svg]:h-[14px] [&>svg]:text-light-extra dark:[&>svg]:text-white/60"
                href="#"
            >
                Edit
            </Link>
        ),
    },
    {
        key: '3',
        label: (
            <Link
                className="group flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm gap-[10px] [&>svg]:w-[14px] [&>svg]:h-[14px] [&>svg]:text-light-extra dark:[&>svg]:text-white/60"
                href="#"
            >
                Delete
            </Link>
        ),
    },
  ]

  return (
    <div
      className={`border-regular dark:border-white/10 border-1 pt-[20px] px-[25px] pb-[25px] bg-${type} [&.bg-primary]:border-none dark:[&.bg-white]:bg-dark rounded-10 bg-cover bg-center`}
      style={{ 
        backgroundImage: bgImage && `url(/hexadash-nextjs/img/sampleCards/${bgImage})`, 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center center' 
      }}
    >
      <div className="flex items-center justify-between">
        <h4
          className={`text-[16px] font-medium items-center mb-[14px] ${titleColor} dark:[&.text-dark]:text-white flex gap-[10px]`}
        >
          <img className="w-[14px] h-[14px]" src={`/hexadash-nextjs/img/icon/${icon}`} alt="HexaDash Banner" />
          <span>{title}</span>
        </h4>
        <DropDown
          customContent={moreContent}
        >
          <Buttons className="text-light-extra dark:text-white/60 -mt-[15px] border-0 shadow-none outline-none" onClick={(e:React.ChangeEvent<HTMLInputElement>) => e.preventDefault()}>
            <UilEllipsisH className="w-[24px] h-[24px] m-0 dark:text-white/60" />
          </Buttons>
        </DropDown>
      </div>
      <div>
        <p className={`${subTitleColor} mb-[20px] leading-[1.786] dark:text-white/60`}>{content}</p>
      </div>
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-[15px]">
          <img className="w-[30px] h-[30px] rounded-full" src={`/hexadash-nextjs/img/users/${authorImg}`} alt="" />
          <span className={`${subTitleColor} text-[15px] font-medium dark:text-white/60`}>{authorName}</span>
        </div>
        <div>
          <ul className="flex items-center flex-wrap gap-[10px] mb-0">
            <li className="flex items-center gap-[6px]">
              <UilEye className="w-[16px] h-[16px] text-light-extra dark:text-white/60" />
              <span className="text-light-extra dark:text-white/60 text-[13px]">70</span>
            </li>
            <li className="flex items-center gap-[6px]">
              <UilHeart className="w-[16px] h-[16px] text-light-extra dark:text-white/60" />
              <span className="text-light-extra dark:text-white/60 text-[13px]">70</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}


export default BannerCard;
