import { Row, Col } from 'antd';
import { PageHeaders } from '@/components/page-headers';

import MailComposer from './email/overview/MailComposer';
import Compose from './email/overview/Compose';

function Editors() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Editors',
    },
  ];
  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Editors"
        className="flex justify-between items-center px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <main className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
          <Col sm={24} xs={24} className="mb-[25px]">
            <MailComposer />
          </Col>
          <Col sm={24} xs={24} className="mb-[25px]">
            <MailComposer />
          </Col>
          <Col sm={24} xs={24}>
            <div className="[&>div]:!static [&>div]:!max-w-full">
              <Compose />
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default Editors;
