import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Row, Col } from 'antd';
import { useRouter } from 'next/router';
import Heading from '@/components/heading';
import { Buttons } from '@/components/buttons';
import { PageHeaders } from '@/components/page-headers';

const FaqLayout = ({ children }: { children: React.ReactNode }) => {

  const router = useRouter();
  const { pathname } = router;
  const currentPath = pathname.split('/')[4];

  const path = '/admin/pages/faq';
  
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Faqs',
    },
  ];

  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Faqs"
        className="flex justify-between items-center px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <div className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <Row gutter={25}>
          <Col xxl={6} lg={8} md={10} sm={11}>
            <Row>
              <Col xs={24}>
                <div className="mb-6">
                  <div className="bg-white dark:bg-white/10 p-[25px] rounded-[10px]">
                    <Buttons
                      className="bg-regularBG dark:bg-regularBGdark text-light dark:text-white/60 px-5 py-1 text-[13px] rounded-2xl"
                      type="light"
                    >
                      Browse by Topic
                    </Buttons>
                    <ul className="mt-8 mb-0">
                      <li>
                        <Link
                          href={`${path}/applications`}
                          className={`relative inline-block w-full py-3 ltr:pl-7 rtl:pr-7 text-body dark:text-white/60 text-[15px] font-medium before:absolute before:w-0.5 before:h-full before:rounded-10 before:bg-primary before:top-0 after:absolute after:w-2 after:h-2 after:top-1/2 after:-translate-y-2/4 after:rounded-full after:bg-primary ${
                            currentPath === 'applications' || currentPath === '' || currentPath === undefined
                              ? 'before:opacity-1 ltr:before:-left-4 rtl:before:-right-4 after:bg-opacity-1 ltr:after:left-[5px] rtl:after:right-[5px]'
                              : 'before:opacity-0 ltr:before:-left-6 rtl:before:-right-6 after:bg-opacity-[0.314] ltr:after:left-0 rtl:after:right-0'
                          }`}
                        >
                          Using Applications
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${path}/elements`}
                          className={`relative inline-block w-full py-3 ltr:pl-7 rtl:pr-7 text-body dark:text-white/60 text-[15px] font-medium before:absolute before:w-0.5 before:h-full before:rounded-10 before:bg-secondary before:top-0 after:absolute after:w-2 after:h-2 after:top-1/2 after:-translate-y-2/4 after:rounded-full after:bg-secondary ${
                            currentPath === 'elements'
                              ? 'before:opacity-1 ltr:before:-left-4 rtl:before:-right-4 after:bg-opacity-1 ltr:after:left-[5px] rtl:after:right-[5px]'
                              : 'before:opacity-0 ltr:before:-left-6 rtl:before:-right-6 after:bg-opacity-[0.314] ltr:after:left-0 rtl:after:right-0'
                          }`}
                        >
                          UI Elements
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${path}/components`}
                          className={`relative inline-block w-full py-3 ltr:pl-7 rtl:pr-7 text-body dark:text-white/60 text-[15px] font-medium before:absolute before:w-0.5 before:h-full before:rounded-10 before:bg-success before:top-0 after:absolute after:w-2 after:h-2 after:top-1/2 after:-translate-y-2/4 after:rounded-full after:bg-success ${
                            currentPath === 'components'
                              ? 'before:opacity-1 ltr:before:-left-4 rtl:before:-right-4 after:bg-opacity-1 ltr:after:left-[5px] rtl:after:right-[5px]'
                              : 'before:opacity-0 ltr:before:-left-6 rtl:before:-right-6 after:bg-opacity-[0.314] ltr:after:left-0 rtl:after:right-0'
                          }`}
                        >
                          Components
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${path}/process`}
                          className={`relative inline-block w-full py-3 ltr:pl-7 rtl:pr-7 text-body dark:text-white/60 text-[15px] font-medium before:absolute before:w-0.5 before:h-full before:rounded-10 before:bg-warning before:top-0 after:absolute after:w-2 after:h-2 after:top-1/2 after:-translate-y-2/4 after:rounded-full after:bg-warning ${
                            currentPath === 'process'
                              ? 'before:opacity-1 ltr:before:-left-4 rtl:before:-right-4 after:bg-opacity-1 ltr:after:left-[5px] rtl:after:right-[5px]'
                              : 'before:opacity-0 ltr:before:-left-6 rtl:before:-right-6 after:bg-opacity-[0.314] ltr:after:left-0 rtl:after:right-0'
                          }`}
                        >
                          Build Process
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${path}/policy`}
                          className={`relative inline-block w-full py-3 ltr:pl-7 rtl:pr-7 text-body dark:text-white/60 text-[15px] font-medium before:absolute before:w-0.5 before:h-full before:rounded-10 before:bg-info before:top-0 after:absolute after:w-2 after:h-2 after:top-1/2 after:-translate-y-2/4 after:rounded-full after:bg-info ${
                            currentPath === 'policy'
                              ? 'before:opacity-1 ltr:before:-left-4 rtl:before:-right-4 after:bg-opacity-1 ltr:after:left-[5px] rtl:after:right-[5px]'
                              : 'before:opacity-0 ltr:before:-left-6 rtl:before:-right-6 after:bg-opacity-[0.314] ltr:after:left-0 rtl:after:right-0'
                          }`}
                        >
                          Support Policy
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${path}/account`}
                          className={`relative inline-block w-full py-3 ltr:pl-7 rtl:pr-7 text-body dark:text-white/60 text-[15px] font-medium before:absolute before:w-0.5 before:h-full before:rounded-10 before:bg-danger before:top-0 after:absolute after:w-2 after:h-2 after:top-1/2 after:-translate-y-2/4 after:rounded-full after:bg-danger ${
                            currentPath === 'account'
                              ? 'before:opacity-1 ltr:before:-left-4 rtl:before:-right-4 after:bg-opacity-1 ltr:after:left-[5px] rtl:after:right-[5px]'
                              : 'before:opacity-0 ltr:before:-left-6 rtl:before:-right-6 after:bg-opacity-[0.314] ltr:after:left-0 rtl:after:right-0'
                          }`}
                        >
                          Accounts & Billing
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>

              <Col xs={24}>
                <div>
                  <div className="bg-white dark:bg-white/10 p-[25px] sm:mb-[25px] rounded-[10px]">
                    <figure className="mx-auto mb-7">
                      <Image 
                        className="w-full" 
                        src='/hexadash-nextjs/img/pages/support.svg'
                        alt="" 
                        width="320"
                        height="217"
                      />
                    </figure>
                    <figcaption className="text-center">
                      <Heading as="h5" className="mb-4 text-lg font-medium text-dark dark:text-white/[.87]">
                        Not finding the help you need?
                      </Heading>
                      <Buttons size="default" type="primary" className="bg-primary text-white text-sm font-semibold h-11 px-7 rounded-6">
                        Contact Support
                      </Buttons>
                    </figcaption>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>

          <Col xxl={18} lg={16} md={14} sm={13}>
              {children}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default FaqLayout;
