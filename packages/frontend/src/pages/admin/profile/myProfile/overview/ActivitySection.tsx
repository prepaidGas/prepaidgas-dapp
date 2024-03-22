import Link from 'next/link';
import { Button } from 'antd';
import {
  UilAt,
  UilHeart,
  UilInbox,
  UilUpload,
  UilSignout,
  UilEllipsisH,
  UilCommentAlt
} from '@iconscout/react-unicons';
import DropDown from '@/components/dropdown';

const items = [
  {
    key: '1',
    label: (
      <Link
        className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
        href="#"
      >
        <span>Hide</span>
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link
        className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
        href="#"
      >
        <span>Delete</span>
      </Link>
    ),
  }
];

function ActivityContent() {
  return (
    <div className="p-0 bg-white dark:bg-white/10 rounded-10 py-[15px] ">
      <ul className="m-0">
        <li className="py-[12px] px-[25px] flex items-center gap-[15px] hover:shadow-regular dark:shadow-none transition-[0.3s]">
          <span className="text-primary bg-primary/[.08] w-[31px] h-[31px] rounded-full flex items-center justify-center">
            <UilInbox className="w-[14px] h-[14px]" />
          </span>
          <div className="flex items-center justify-between flex-1">
            <div className="flex items-center gap-[20px]">
              <img
                className="rounded-full max-w-[40px]"
                src='/hexadash-nextjs/img/chat-author/t1.jpg'
                alt=""
              />
              <p className="mb-0 text-[14px] text-theme-gray dark:text-white/60">
                <span className="inline-block font-medium text-primary">James</span> Send you a message{' '}
                <span className="block mt-[3px] text-light-extra dark:text-white/60">5 hours ago</span>
              </p>
            </div>
            <Button className="p-0 m-0 border-none text-light-extra dark:text-white/60">
              <DropDown
                customContent={items}
              >
                <UilEllipsisH className="w-[24px] h-[24px] m-0" />
              </DropDown>
            </Button>
          </div>
        </li>
        <li className="py-[12px] px-[25px] flex items-center gap-[15px] hover:shadow-regular dark:shadow-none transition-[0.3s]">
          <span className="text-secondary bg-secondary/[.08] w-[31px] h-[31px] rounded-full flex items-center justify-center secondary">
            <UilUpload className="w-[14px] h-[14px]" />
          </span>
          <div className="flex items-center justify-between flex-1">
            <div className="flex items-center gap-[20px]">
              <img
                className="rounded-full max-w-[40px]"
                src='/hexadash-nextjs/img/chat-author/t2.jpg'
                alt=""
              />
              <p className="mb-0 text-[14px] text-theme-gray dark:text-white/60">
                <span className="inline-block font-medium text-primary">Adam</span> upload website template for sale{' '}
                <span className="block mt-[3px] text-light-extra dark:text-white/60">5 hours ago</span>
              </p>
            </div>
            <Button className="p-0 m-0 border-none text-light-extra dark:text-white/60">
              <DropDown
                customContent={items}
              >
                <UilEllipsisH className="w-[24px] h-[24px] m-0" />
              </DropDown>
            </Button>
          </div>
        </li>
        <li className="py-[12px] px-[25px] flex items-center gap-[15px] hover:shadow-regular dark:shadow-none transition-[0.3s]">
          <span className="text-success bg-success/[.08] w-[31px] h-[31px] rounded-full flex items-center justify-center success">
            <UilSignout className="w-[14px] h-[14px]" />
          </span>
          <div className="flex items-center justify-between flex-1">
            <div className="flex items-center gap-[20px]">
              <img
                className="rounded-full max-w-[40px]"
                src='/hexadash-nextjs/img/chat-author/t3.jpg'
                alt=""
              />
              <p className="mb-0 text-[14px] text-theme-gray dark:text-white/60">
                <span className="inline-block font-medium text-primary">Mumtahin</span> has registered{' '}
                <span className="block mt-[3px] text-light-extra dark:text-white/60">5 hours ago</span>
              </p>
            </div>
            <Button className="p-0 m-0 border-none text-light-extra dark:text-white/60">
              <DropDown
                customContent={items}
              >
                <UilEllipsisH className="w-[24px] h-[24px] m-0" />
              </DropDown>
            </Button>
          </div>
        </li>
        <li className="py-[12px] px-[25px] flex items-center gap-[15px] hover:shadow-regular dark:shadow-none transition-[0.3s]">
          <span className="text-info bg-info/[.08] w-[31px] h-[31px] rounded-full flex items-center justify-center info">
            <UilAt className="w-[14px] h-[14px]" />
          </span>
          <div className="flex items-center justify-between flex-1">
            <div className="flex items-center gap-[20px]">
              <img
                className="rounded-full max-w-[40px]"
                src='/hexadash-nextjs/img/chat-author/t4.jpg'
                alt=""
              />
              <p className="mb-0 text-[14px] text-theme-gray dark:text-white/60">
                <span className="inline-block font-medium text-primary">James</span> Send you a message{' '}
                <span className="block mt-[3px] text-light-extra dark:text-white/60">5 hours ago</span>
              </p>
            </div>
            <Button className="p-0 m-0 border-none text-light-extra dark:text-white/60">
              <DropDown
                customContent={items}
              >
                <UilEllipsisH className="w-[24px] h-[24px] m-0" />
              </DropDown>
            </Button>
          </div>
        </li>
        <li className="py-[12px] px-[25px] flex items-center gap-[15px] hover:shadow-regular dark:shadow-none transition-[0.3s]">
          <span className="text-danger bg-danger/[.08] w-[31px] h-[31px] rounded-full flex items-center justify-center danger">
            <UilHeart className="w-[14px] h-[14px]" />
          </span>
          <div className="flex items-center justify-between flex-1">
            <div className="flex items-center gap-[20px]">
              <img
                className="rounded-full max-w-[40px]"
                src='/hexadash-nextjs/img/chat-author/t5.png'
                alt=""
              />
              <p className="mb-0 text-[14px] text-theme-gray dark:text-white/60">
                <span className="inline-block font-medium text-primary">Adam</span> upload website template for sale{' '}
                <span className="block mt-[3px] text-light-extra dark:text-white/60">5 hours ago</span>
              </p>
            </div>
            <Button className="p-0 m-0 border-none text-light-extra dark:text-white/60">
              <DropDown
                customContent={items}
              >
                <UilEllipsisH className="w-[24px] h-[24px] m-0" />
              </DropDown>
            </Button>
          </div>
        </li>
        <li className="py-[12px] px-[25px] flex items-center gap-[15px] hover:shadow-regular dark:shadow-none transition-[0.3s]">
          <span className="text-warning bg-warning/[.08] w-[31px] h-[31px] rounded-full flex items-center justify-center warning">
            <UilCommentAlt className="w-[14px] h-[14px]" />
          </span>
          <div className="flex items-center justify-between flex-1">
            <div className="flex items-center gap-[20px]">
              <img
                className="rounded-full max-w-[40px]"
                src='/hexadash-nextjs/img/chat-author/t1.jpg'
                alt=""
              />
              <p className="mb-0 text-[14px] text-theme-gray dark:text-white/60">
                <span className="inline-block font-medium text-primary">Mumtahin</span> has registered{' '}
                <span className="block mt-[3px] text-light-extra dark:text-white/60">5 hours ago</span>
              </p>
            </div>
            <Button className="p-0 m-0 border-none text-light-extra dark:text-white/60">
              <DropDown
                customContent={items}
              >
                <UilEllipsisH className="w-[24px] h-[24px] m-0" />
              </DropDown>
            </Button>
          </div>
        </li>
        <li className="py-[12px] px-[25px] flex items-center gap-[15px] hover:shadow-regular dark:shadow-none transition-[0.3s]">
          <span className="text-info bg-info/[.08] w-[31px] h-[31px] rounded-full flex items-center justify-center info">
            <UilAt className="w-[14px] h-[14px]" />
          </span>
          <div className="flex items-center justify-between flex-1">
            <div className="flex items-center gap-[20px]">
              <img
                className="rounded-full max-w-[40px]"
                src='/hexadash-nextjs/img/chat-author/t6.png'
                alt=""
              />
              <p className="mb-0 text-[14px] text-theme-gray dark:text-white/60">
                <span className="inline-block font-medium text-primary">James</span> Send you a message{' '}
                <span className="block mt-[3px] text-light-extra dark:text-white/60">5 hours ago</span>
              </p>
            </div>
            <Button className="p-0 m-0 border-none text-light-extra dark:text-white/60">
              <DropDown
                customContent={items}
              >
                <UilEllipsisH className="w-[24px] h-[24px] m-0" />
              </DropDown>
            </Button>
          </div>
        </li>
        <li className="py-[12px] px-[25px] flex items-center gap-[15px] hover:shadow-regular dark:shadow-none transition-[0.3s]">
          <span className="text-danger bg-danger/[.08] w-[31px] h-[31px] rounded-full flex items-center justify-center warning">
            <UilHeart className="w-[14px] h-[14px]" />
          </span>
          <div className="flex items-center justify-between flex-1">
            <div className="flex items-center gap-[20px]">
              <img
                className="rounded-full max-w-[40px]"
                src='/hexadash-nextjs/img/chat-author/t7.png'
                alt=""
              />
              <p className="mb-0 text-[14px] text-theme-gray dark:text-white/60">
                <span className="inline-block font-medium text-primary">Mumtahin</span> has registered{' '}
                <span className="block mt-[3px] text-light-extra dark:text-white/60">5 hours ago</span>
              </p>
            </div>
            <Button className="p-0 m-0 border-none text-light-extra dark:text-white/60">
              <DropDown
                customContent={items}
              >
                <UilEllipsisH className="w-[24px] h-[24px] m-0" />
              </DropDown>
            </Button>
          </div>
        </li>
        <li className="py-[12px] px-[25px] flex items-center gap-[15px] hover:shadow-regular dark:shadow-none transition-[0.3s]">
          <span className="text-warning bg-warning/[.08] w-[31px] h-[31px] rounded-full flex items-center justify-center danger">
            <UilCommentAlt className="w-[14px] h-[14px]" />
          </span>
          <div className="flex items-center justify-between flex-1">
            <div className="flex items-center gap-[20px]">
              <img
                className="rounded-full max-w-[40px]"
                src='/hexadash-nextjs/img/chat-author/t8.png'
                alt=""
              />
              <p className="mb-0 text-[14px] text-theme-gray dark:text-white/60">
                <span className="inline-block font-medium text-primary">Adam</span> upload website template for sale{' '}
                <span className="block mt-[3px] text-light-extra dark:text-white/60">5 hours ago</span>
              </p>
            </div>
            <Button className="p-0 m-0 border-none text-light-extra dark:text-white/60">
              <DropDown
                customContent={items}
              >
                <UilEllipsisH className="w-[24px] h-[24px] m-0" />
              </DropDown>
            </Button>
          </div>
        </li>
        <li className="py-[12px] px-[25px] flex items-center gap-[15px] hover:shadow-regular dark:shadow-none transition-[0.3s]">
          <span className="text-danger bg-danger/[.08] w-[31px] h-[31px] rounded-full flex items-center justify-center danger">
            <UilHeart className="w-[14px] h-[14px]" />
          </span>
          <div className="flex items-center justify-between flex-1">
            <div className="flex items-center gap-[20px]">
              <img
                className="rounded-full max-w-[40px]"
                src='/hexadash-nextjs/img/chat-author/t1.jpg'
                alt=""
              />
              <p className="mb-0 text-[14px] text-theme-gray dark:text-white/60">
                <span className="inline-block font-medium text-primary">James</span> Send you a message{' '}
                <span className="block mt-[3px] text-light-extra dark:text-white/60">5 hours ago</span>
              </p>
            </div>
            <Button className="p-0 m-0 border-none text-light-extra dark:text-white/60">
              <DropDown
                customContent={items}
              >
                <UilEllipsisH className="w-[24px] h-[24px] m-0" />
              </DropDown>
            </Button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ActivityContent;
