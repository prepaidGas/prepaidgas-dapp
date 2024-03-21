import { Row, Col } from 'antd';
import VerticalForm from './overview/VerticalForm';
import HorizontalForm from './overview/HorizontalForm';
import MultiColumnForm from './overview/MultiColumnForm';
import VerticalIconForm from './overview/VerticalIconForm';
import HorizontalIconForm from './overview/HorizontalIconForm';

import { PageHeaders } from '@/components/page-headers';

function FormLayout() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Form Layouts',
    },
  ];
  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Form Layouts"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
          <Col lg={12} xs={24} className="mb-[25px]">
            <HorizontalForm />
          </Col>
          <Col lg={12} xs={24} className="mb-[25px]">
            <HorizontalIconForm />
          </Col>
          <Col lg={12} xs={24} className="mb-[25px]">
            <VerticalForm />
          </Col>
          <Col lg={12} xs={24} className="mb-[25px]">
            <VerticalIconForm />
          </Col>
          <Col xs={24}>
            <MultiColumnForm />
          </Col>
        </Row>
      </main>
    </>
  );
}

export default FormLayout;
