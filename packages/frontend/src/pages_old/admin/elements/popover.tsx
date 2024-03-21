import Link from 'next/link';
import { Row, Col, Button } from 'antd';
import PopOver from '@/components/popup';
import { PageHeaders } from '@/components/page-headers';

function Popovers() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Popovers',
    },
  ];
  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Popovers"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
          <Col md={12} sm={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Basic Popover
                </h1>
              </div>
              <div className="p-[25px]">
                <PopOver placement="bottomLeft">
                  <Link href="#">Hover me </Link>
                </PopOver>
              </div>
            </div>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Event Menu
                </h1>
              </div>
              <div className="p-[25px] inline-flex flex-wrap gap-[10px]">
                <PopOver action="hover" placement="bottomLeft">
                  <Button type="primary">Hover</Button>
                </PopOver>
                <PopOver action="click" placement="bottom">
                  <Button type="primary">Click</Button>
                </PopOver>
                <PopOver action="contextMenu" placement="bottomRight">
                  <Button type="primary">Context</Button>
                </PopOver>
              </div>
            </div>
          </Col>
          <Col md={12} sm={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Placement
                </h1>
              </div>
              <div className="p-[25px] inline-flex flex-wrap gap-[10px]">
                <PopOver placement="bottomLeft">
                  <Button type="primary">BottomLeft</Button>
                </PopOver>
                <PopOver placement="bottom">
                  <Button type="primary">Bottom</Button>
                </PopOver>
                <PopOver placement="bottomRight">
                  <Button type="primary">BottomRight</Button>
                </PopOver>
                <br />
                <PopOver placement="topLeft">
                  <Button type="primary">TopLeft</Button>
                </PopOver>
                <PopOver placement="top">
                  <Button type="primary">TopCenter</Button>
                </PopOver>
                <PopOver placement="topRight">
                  <Button type="primary">TopRight</Button>
                </PopOver>
              </div>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default Popovers;
