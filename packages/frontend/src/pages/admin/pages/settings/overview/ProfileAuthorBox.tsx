import Link from 'next/link';
import { Upload } from 'antd';
import Image from 'next/image';
import {
  UilCamera,
  UilSetting,
  UilBell,
  UilUser,
  UilUsersAlt
} from '@iconscout/react-unicons';
import { useRouter } from 'next/router';
import Heading from '@/components/heading';

function AuthorBox() {
  const router = useRouter();
  const { pathname } = router;
  const currentPath = pathname.split('/')[4];

  const path = '/admin/pages/settings';

  return (
    <>
      <div className="bg-white dark:bg-white/10 rounded-[10px]">
        <div className="-mx-3 px-5 pt-[25px] pb-5 text-center border-b border-regular dark:border-white/10">
          <figure className="relative max-w-[120px] mx-auto mb-6">
            <Image className="mx-auto" src={'/hexadash-nextjs/img/users/1.png'} alt="" width="120" height="120" />
            <Upload className="absolute right-0 -bottom-2 flex items-center justify-center bg-white dark:bg-white/10 w-10 h-10 rounded-full">
              <Link href="#" className="inline-flex items-center justify-center bg-primary w-8 h-8 rounded-full">
                <UilCamera className="w-4 h-4 text-white" />
              </Link>
            </Upload>
          </figure>
          <figcaption>
            <Heading as="h4" className="mb-0 text-dark dark:text-white/[.87] text-lg font-semibold">
              Duran Clayton
            </Heading>
            <p className="mb-0 text-light dark:text-white/60 text-15">UI/UX Designer</p>
          </figcaption>
        </div>
        <nav className="px-[25px] pt-8 pb-5">
          <ul className="mb-0">
            <li>
              <Link
                href={`${path}/profile`}
                className={`flex items-center mb-3 px-5 py-3 rounded-[6px] ${
                  currentPath === 'profile' || currentPath === '' || currentPath === undefined
                    ? 'bg-primary-transparent text-primary font-medium'
                    : 'bg-transparent text-light dark:text-white/60 font-normal'
                }`}
              >
                <UilUser className="w-4 h-4 ltr:mr-3 rtl:ml-3 mb-0.5" />
                Edit Profile
              </Link>
            </li>
            <li>
              <Link
                href={`${path}/account`}
                className={`flex items-center mb-3 px-5 py-3 rounded-[6px] ${
                  currentPath === 'account'
                    ? 'bg-primary-transparent text-primary font-medium'
                    : 'bg-transparent text-light dark:text-white/60 font-normal'
                }`}
              >
                <UilSetting className="w-4 h-4 ltr:mr-3 rtl:ml-3 mb-0.5" />
                Account Settings
              </Link>
            </li>
            <li>
              <Link
                href={`${path}/password`}
                className={`flex items-center mb-3 px-5 py-3 rounded-[6px] ${
                  currentPath === 'password'
                    ? 'bg-primary-transparent text-primary font-medium'
                    : 'bg-transparent text-light dark:text-white/60 font-normal'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ltr:mr-3 rtl:ml-3 -mb-0.5 feather feather-key"
                >
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                </svg>
                Change Password
              </Link>
            </li>
            <li>
              <Link
                href={`${path}/social`}
                className={`flex items-center mb-3 px-5 py-3 rounded-[6px] ${
                  currentPath === 'social'
                    ? 'bg-primary-transparent text-primary font-medium'
                    : 'bg-transparent text-light dark:text-white/60 font-normal'
                }`}
              >
                <UilUsersAlt className="w-4 h-4 ltr:mr-3 rtl:ml-3 mb-0.5" />
                Social Profile
              </Link>
            </li>
            <li>
              <Link
                href={`${path}/notification`}
                className={`flex items-center mb-3 px-5 py-3 rounded-[6px] ${
                  currentPath === 'notification'
                    ? 'bg-primary-transparent text-primary font-medium'
                    : 'bg-transparent text-light dark:text-white/60 font-normal'
                }`}
              >
                <UilBell className="w-4 h-4 ltr:mr-3 rtl:ml-3 mb-0.5" />
                Notification
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default AuthorBox;
