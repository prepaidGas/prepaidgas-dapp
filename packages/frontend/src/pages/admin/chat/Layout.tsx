import { Row, Col } from 'antd';
import { useRouter } from 'next/router';
import { PageHeaders } from '@/components/page-headers';

import ChatNav from './overview/ChatNav';

import SingleChat from './overview/SingleChat';
import SingleGroupChat from './overview/SingleGroupChat';


const ChatLayout = () =>  {
  
  const router = useRouter();
  const { asPath } = router;
  const currentPath = asPath.split('/')[3];

  // Initialize Default Sales Location
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Chat',
    },
  ];

  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Dashboard"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <Row gutter={30}>
          <Col xxl={7} lg={8} xs={24}>
            <ChatNav />
          </Col>
          <Col xxl={17} lg={16} xs={24}>
            {currentPath === 'group' ? <SingleGroupChat /> : <SingleChat />}
          </Col>
        </Row>
      </main>
    </>
  );
}

export default ChatLayout;
