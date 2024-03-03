import React from 'react';
import Link from 'next/link';
import { Skeleton } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'; 
import KnowledgeBaseTop from './overview/KnowledgeBaseTop';
import { PageHeaders } from '@/components/page-headers';

const PopularArticle = dynamic(() => import('./overview/PopularArticle'), {
  loading: () => (
    <>
      <Skeleton active />
    </>
  ),
});

const KnowledgeBaseLayout = ({ children }: { children: React.ReactNode }) => {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Knowledgebase',
    },
  ];

  const router = useRouter();
  const { pathname } = router;
  const currentPath = pathname.split('/')[4];

  const path = '/admin/pages/knowledgeBase';

  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Knowledgebase"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <KnowledgeBaseTop />
        <div className="bg-white dark:bg-white/10 mt-[50px] px-[50px] sm:px-[30px] ssm:px-5 pb-[50px] rounded-10">
          <div className="max-w-[1110px] mx-auto">
            <div className="mb-9">
              <nav>
                <ul className="flex items-center border-b gap-x-9 sm:gap-x-6 border-normal dark:border-white/10">
                  <li>
                    <Link
                      href={`${path}/plugins`}
                      className={`block relative pt-6 pb-4 text-base sm:text-sm font-medium after:absolute ltr:after:left-0 rtl:after:right-0 after:bottom-0 after:w-full after:h-px cursor-pointer ${
                        currentPath === 'plugins' || currentPath === '' || currentPath === undefined
                          ? 'text-dark dark:text-white after:bg-dark dark:after:bg-white'
                          : 'text-body dark:text-white/60 after:bg-transparent'
                      }`}
                    >
                      Plugins
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${path}/themes`}
                      className={`block relative pt-6 pb-4 text-base sm:text-sm font-medium after:absolute ltr:after:left-0 rtl:after:right-0 after:bottom-0 after:w-full after:h-px cursor-pointer ${
                        currentPath === 'themes'
                          ? 'text-dark dark:text-white after:bg-dark dark:after:bg-white'
                          : 'text-body dark:text-white/60 after:bg-transparent'
                      }`}
                    >
                      Themes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${path}/extensions`}
                      className={`block relative pt-6 pb-4 text-base sm:text-sm font-medium after:absolute ltr:after:left-0 rtl:after:right-0 after:bottom-0 after:w-full after:h-px cursor-pointer ${
                        currentPath === 'extensions'
                          ? 'text-dark dark:text-white after:bg-dark dark:after:bg-white'
                          : 'text-body dark:text-white/60 after:bg-transparent'
                      }`}
                    >
                      Extensions
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <>
              {children}
            </>

            <PopularArticle />
          </div>
        </div>
      </main>
    </>
  );
}

export default KnowledgeBaseLayout;
