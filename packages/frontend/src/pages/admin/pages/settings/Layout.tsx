import React from 'react';
import dynamic from 'next/dynamic'
import { Row, Col, Skeleton } from 'antd';
import { PageHeaders } from '@/components/page-headers';

const AuthorBox = dynamic(() => import('./overview/ProfileAuthorBox'), {
    loading: () => (
      <>
        <Skeleton active />
      </>
    ),
});

const CoverSection = dynamic(() => import('./overview/CoverSection'), {
    loading: () => (
      <>
        <Skeleton active />
      </>
    ),
});

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const PageRoutes = [
    {
      path: 'admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'My Profile',
    },
  ];

  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="My Profile"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />

      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <Row gutter={25}>
          <Col xxl={6} lg={8} md={10} xs={24}>
            <AuthorBox />
          </Col>
          <Col xxl={18} lg={16} md={14} xs={24}>
            <div className="mb-[35px] md:mt-[25px]">
              <CoverSection />
            </div>
            
            {children}
          </Col>
        </Row>
      </main>
    </>
  );
};

export default SettingsLayout;
