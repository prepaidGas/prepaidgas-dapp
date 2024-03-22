import { Row, Col, Empty } from 'antd';
import { Buttons } from '@/components/buttons';
import { PageHeaders } from '@/components/page-headers';

function EmptyData() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Empty',
    },
  ];
  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Empty"
        routes={PageRoutes}
      />
      <>
        <div className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
          <Row gutter={25}>
            <Col md={12} sm={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Basic
                  </h1>
                </div>
                <div className="p-[25px]">
                  <Empty />
                </div>
              </div>
            </Col>
            <Col md={12} sm={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Customize
                  </h1>
                </div>
                <div className="p-[25px]">
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
              </div>
            </Col>
            <Col md={12} sm={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Button with dropdown menu
                  </h1>
                </div>
                <div className="p-[25px]">
                  <Empty
                    className="[&>div>img]:inline-block"
                    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                    imageStyle={{
                      height: 60,
                    }}
                    description={
                      <span>
                        Customize <a href="#API">Description</a>
                      </span>
                    }
                  >
                    <Buttons
                      className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
                      size="small"
                      type="primary"
                    >
                      Create Now
                    </Buttons>
                  </Empty>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </>
    </>
  );
}

export default EmptyData;
