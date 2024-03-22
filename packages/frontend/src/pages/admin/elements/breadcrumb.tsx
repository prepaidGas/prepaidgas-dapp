import React from 'react';
import Link from 'next/link';
import { Row, Col, Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { PageHeaders } from '@/components/page-headers';

const menuItems = [
  {
    key: '1',
    label: (
      <a rel="noopener noreferrer" href="#">
        General
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a rel="noopener noreferrer" href="#">
        Layout
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a rel="noopener noreferrer" href="#">
        Navigation
      </a>
    ),
  },
];

function Breadcrumbs() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Avatar',
    },
  ];
  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Breadcrumb"
        routes={PageRoutes}
      />
      <>
        <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
          <Row gutter={25}>
            <Col md={12} sm={24} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Basic
                  </h1>
                </div>
                <>
                  <Breadcrumb className="p-[25px]"
                    items={[
                        {
                          title: <Link href="#">Application Center</Link>,
                        },
                        {
                          title: <Link href="">Application List</Link>,
                        },
                        {
                          title: 'An Application',
                        },
                      ]}
                    />
                </>
              </div>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Bread crumbs with drop down menu
                  </h1>
                </div>
                
                <div className='p-[25px] [&>.ant-breadcrumb>ol>li>.ant-dropdown-trigger>.anticon]:text-[10px] [&>.ant-breadcrumb>ol>li>.ant-dropdown-trigger>.anticon]:align-baseline'>
                  <Breadcrumb
                    items={[
                      {
                        title: <Link href="#">Design</Link>,
                      },
                      {
                        title: <Link href="">Component</Link>,
                      },
                      {
                        title: <Link href="">General</Link>,
                        menu: {
                          items: menuItems,
                        },
                      },
                      {
                        title: 'Button',
                      },
                    ]}
                  />
                </div>
              </div>
            </Col>
            <Col md={12} sm={24} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    With Icon
                  </h1>
                </div>
                <>
                  <Breadcrumb className="p-[25px]"
                    items={[
                      {
                        title: <HomeOutlined className="inline-flex items-center text-light dark:text-white/60" />,
                      },
                      {
                        title: <Link href="">Application Center</Link>,
                      },
                      {
                        title: <Link href="#"><span>Application List</span></Link>,
                      },
                      {
                        title: 'An Application',
                      },
                    ]}
                  />
                </>
              </div>

              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Configuring the Separator
                  </h1>
                </div>
                <>
                  <Breadcrumb className="p-[25px]" separator=">"
                    items={[
                      {
                        title: "Home",
                      },
                      {
                        title: <Link href="">Application Center</Link>,
                      },
                      {
                        title: <Link href="#">Application List</Link>,
                      },
                      {
                        title: 'An Application',
                      },
                    ]}
                  />
                </>
              </div>

              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Configuring the Separator
                  </h1>
                </div>
                <Breadcrumb className="p-[25px]" separator=""
                  items={[
                      {
                        title: 'Location',
                      },
                      {
                        type: 'separator',
                        separator: ':',
                      },
                      {
                        title: <Link href="">Application Center</Link>,
                      },
                      {
                        type: 'separator',
                      },
                      {
                        title: <Link href="#">Application List</Link>,
                      },
                      {
                        type: 'separator',
                      },
                      {
                        title: 'An Application',
                      },
                  ]}
                />
              </div>
            </Col>
          </Row>
        </main>
      </>
    </>
  );
}

export default Breadcrumbs;
