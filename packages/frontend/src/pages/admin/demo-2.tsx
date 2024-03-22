import dynamic from 'next/dynamic'
import { Row, Col, Skeleton } from 'antd';
import { PageHeaders } from '@/components/page-headers';

const OverviewDataList = dynamic(() => import('@/dashboard/demo-2/OverviewDataList'), {
  loading: () => (
    <>
      <Skeleton active />
    </>
  ),
});
const SaleRevenue = dynamic(() => import('@/dashboard/demo-2/SaleRevenue'), {
  loading: () => (
    <>
      <Skeleton active />
    </>
  ),
});
const SourceRevenueGenerated = dynamic(() => import('@/dashboard/demo-2/SourceRevenueGenerated'), {
  loading: () => (
    <>
      <Skeleton active />
    </>
  ),
});
const NewProduct = dynamic(() => import('@/dashboard/demo-2/NewProduct'), {
  loading: () => (
    <>
      <Skeleton active />
    </>
  ),
});
const BestSeller = dynamic(() => import('@/dashboard/demo-2/BestSeller'), {
  loading: () => (
    <>
      <Skeleton active />
    </>
  ),
});

const DemoTwo = () => {

  const PageRoutes = [
    {
      path: 'admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Demo 2',
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
          <Col xs={24}>
            <OverviewDataList />
          </Col>
          <Col xxl={12} xs={24} className="mb-[25px]">
            <SaleRevenue />
          </Col>
          <Col xxl={12} xs={24} className="mb-[25px]">
            <SourceRevenueGenerated />
          </Col>
          <Col xxl={8} xs={24} className="mb-[25px]">
            <NewProduct />
          </Col>
          <Col xl={16} xs={24} className="mb-[25px]">
            <BestSeller />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default DemoTwo

