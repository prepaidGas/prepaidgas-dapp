import dynamic from 'next/dynamic'
import { Row, Col, Skeleton } from 'antd';
import { PageHeaders } from '@/components/page-headers';

const OrderSummary = dynamic(() => import('../ecommerce/overview/Ordersummary'), {
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

function WidgetsCard() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Widgets Mixed',
    },
  ];
  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Widgets Mixed"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <>
          <Row gutter={25}>
            <Col xxl={8} xl={10} xs={24}>
              <div className="bg-white dark:bg-white/10 xl:mb-[25px] p-[25px] rounded-[4px]">
                <OrderSummary subtotal={1200} />
              </div>
            </Col>
            <Col xxl={16} xl={14} xs={24}>
              <SalesByLocation />
            </Col>
          </Row>
        </>
      </main>
    </>
  );
}

export default WidgetsCard;
