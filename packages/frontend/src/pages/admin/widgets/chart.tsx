import { Row, Col } from 'antd';
import { PageHeaders } from '@/components/page-headers';

import SalesGrowth from '@/dashboard/demo-1/SalesGrowth';
import SaleRevenue from '@/dashboard/demo-2/SaleRevenue';
import SalesOverview from '@/dashboard/demo-1/SalesOverview';
import TotalLineChart from '@/dashboard/demo-1/TotalLineChart';

function Widgets() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Widgets Charts',
    },
  ];
  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Widgets Charts"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
          <Col xs={24}>
            <TotalLineChart />
          </Col>
          <Col xxl={9} xs={24} className="mb-[25px]">
            <SalesOverview />
          </Col>
          <Col xxl={15} xs={24} className="mb-[25px]">
            <SaleRevenue />
          </Col>
          <Col xxl={9} xs={24}>
            <SalesGrowth />
          </Col>
          <Col xxl={15} xs={24}>
            {/* <MonthlyEarning /> */}
          </Col>
        </Row>
      </main>
    </>
  );
}

export default Widgets;
