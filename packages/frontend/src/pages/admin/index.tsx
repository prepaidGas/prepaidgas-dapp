import dynamic from 'next/dynamic'
import { Row, Col, Skeleton } from 'antd';
import { PageHeaders } from '@/components/page-headers';

const OverviewDataList = dynamic(() => import('@/dashboard/demo-1/OverviewDataList'), {
  loading: () => (
    <>
      <Skeleton active />
    </>
  ),
});
const SalesReport = dynamic(() => import('@/dashboard/demo-1/SalesReport'), {
  loading: () => (
    <>
      <Skeleton active />
    </>
  ),
});
const SalesGrowth = dynamic(() => import('@/dashboard/demo-1/SalesGrowth'), {
  loading: () => (
    <>
      <Skeleton active />
    </>
  ),
});
const SalesByLocation = dynamic(() => import('@/dashboard/demo-1/SalesByLocation'), {
  loading: () => (
    <>
      <Skeleton active />
    </>
  ),
});
const TopSellingProduct = dynamic(() => import('@/dashboard/demo-1/TopSellingProducts'), {
  loading: () => (
    <>
      <Skeleton active />
    </>
  ),
});
const BrowserState = dynamic(() => import('@/dashboard/demo-1/BrowserState'), {
  loading: () => (
    <>
      <Skeleton active />
    </>
  ),
});

const DemoOne = () => {

  const PageRoutes = [
    {
      path: 'admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Demo 1',
    },
  ];
  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Dashboard"
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
          <Col xxl={12} xs={24}>
            <OverviewDataList />
          </Col>
          <Col xxl={12} xs={24} className="mb-[25px]">
            <SalesReport />
          </Col>
          <Col xxl={8} xs={24} className="mb-[25px]">
            <SalesGrowth />
          </Col>
          <Col xxl={16} xs={24} className="mb-[25px]">
            <SalesByLocation />
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xl={12} xs={24} className="mb-[25px]">
            <TopSellingProduct />
          </Col>
          <Col xl={12} xs={24} className="mb-[25px]">
            <BrowserState />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default DemoOne

