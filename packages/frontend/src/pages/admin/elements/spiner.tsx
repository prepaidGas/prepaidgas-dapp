import { Row, Col, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { PageHeaders } from '@/components/page-headers';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} />;

function Spiner() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Spin',
    },
  ];
  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Spin"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
          <Col sm={12} xs={24} className=" mb-[25px] ">
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative h-full">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Basic
                </h1>
              </div>
              <div className="p-[25px]">
                <Spin />
              </div>
            </div>
          </Col>
          <Col sm={12} xs={24} className=" mb-[25px] ">
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Size
                </h1>
              </div>
              <div className="p-[25px] inline-flex items-center flex-wrap gap-[15px]">
                <Spin size="small" />
                <Spin />
                <Spin size="large" />
              </div>
            </div>
          </Col>
          <Col sm={12} xs={24} className=" mb-[25px] ">
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative h-full">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Inside a Container
                </h1>
              </div>
              <div className="m-[25px]">
                <Spin className="bg-section dark:bg-[#1b1c29] w-full px-[50px] py-[30px] rounded-4" />
              </div>
            </div>
          </Col>
          <Col sm={12} xs={24} className=" mb-[25px] ">
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative h-full">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Custom Indicator
                </h1>
              </div>
              <div className="m-[25px]">
                <Spin indicator={antIcon} className="bg-section dark:bg-[#1b1c29]  text-primary w-full px-[50px] py-[30px] rounded-4" />
              </div>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default Spiner;
