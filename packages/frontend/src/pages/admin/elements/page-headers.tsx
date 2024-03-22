import { Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Buttons } from '@/components/buttons';
import { PageHeaders } from '@/components/page-headers';

import { ShareButtonPageHeader } from '@/components/buttons/share-button';
import { ExportButtonPageHeader } from '@/components/buttons/export-button';
import { CalendarButtonPageHeader } from '@/components/buttons/calendar-button';

const routes = [
  {
    path: 'index',
    breadcrumbName: 'First-level Menu',
  },
  {
    path: 'first',
    breadcrumbName: 'Second-level Menu',
  },
  {
    path: 'second',
    breadcrumbName: 'Third-level Menu',
  },
];

function PageHeaderElement() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Notifications',
    },
  ];
  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Page headers"
        routes={PageRoutes}
      />
      <div className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
          <Col md={24} sm={24} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Basic Header
                </h1>
              </div>
              <div className="p-[25px]">
                <PageHeaders
                  className="flex items-center px-5 py-4 bg-regularBG dark:bg-regularBGdark border-normal dark:border-white/10 border-1 rounded-4 md:flex-col md:justify-center"
                  title="Title"
                  subTitle="This is a subtitle"
                />
              </div>
            </div>
          </Col>
          <Col md={24} sm={24} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Custom Header
                </h1>
              </div>
              <div className="p-[25px]">
                <PageHeaders
                  className="flex items-center px-5 py-4 bg-regularBG dark:bg-regularBGdark md:flex-col md:justify-center"
                  ghost
                  title="Title"
                  subTitle="This is a subtitle"
                />
              </div>
            </div>
          </Col>
          <Col md={24} sm={24} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Custom Header options
                </h1>
              </div>
              <div className="p-[25px]">
                <PageHeaders
                  className="px-5 py-4 bg-regularBG dark:bg-regularBGdark md:flex-col md:justify-center"
                  ghost
                  title="Title"
                  subTitle="This is a subtitle"
                  buttons={[
                    <div
                      key="1"
                      className="page-header-actions flex items-center flex-wrap gap-[10px] md:justify-center"
                    >
                      <CalendarButtonPageHeader />
                      <ExportButtonPageHeader />
                      <ShareButtonPageHeader />
                      <Buttons
                        className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[15px] h-[32px]"
                        size="small"
                        type="primary"
                      >
                        <PlusOutlined />
                        Add New
                      </Buttons>
                    </div>,
                  ]}
                />
              </div>
            </div>
          </Col>
          <Col md={24} sm={24} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Breadcrumb Title
                </h1>
              </div>
              <div className="p-[25px]">
                <PageHeaders
                  className="px-5 py-4 bg-regularBG dark:bg-regularBGdark border-normal dark:border-white/10 border-1 rounded-4 md:flex-col md:justify-center"
                  title="Title"
                  subTitle="This is a subtitle"
                  routes={routes}
                />
              </div>
            </div>
          </Col>
          <Col md={24} sm={24} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Extra Content header
                </h1>
              </div>
              <div className="p-[25px]">
                <PageHeaders
                  className="px-5 py-4 bg-regularBG dark:bg-regularBGdark border-normal dark:border-white/10 border-1 rounded-4 has-breadcrumb md:flex-col md:justify-center"
                  ghost
                  buttons={[
                    <Buttons
                      className="text-[14px] font-medium border-none leading-[22px] bg-white dark:bg-white/10 text-theme-gray dark:text-white/60 dark:focus:text-white/60 dark:hover:text-white/60 inline-flex items-center justify-center rounded-[4px] px-[20px] h-[34px] gap-[8px]"
                      size="small"
                      type="default"
                      key="3"
                    >
                      Operation
                    </Buttons>,
                    <Buttons
                      className="text-[14px] font-medium border-none leading-[22px] bg-white dark:bg-white/10 text-theme-gray dark:text-white/60 dark:focus:text-white/60 dark:hover:text-white/60 inline-flex items-center justify-center rounded-[4px] px-[20px] h-[34px] gap-[8px]"
                      size="small"
                      type="default"
                      key="2"
                    >
                      Operation
                    </Buttons>,
                    <Buttons
                      className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[15px] h-[32px]"
                      size="small"
                      type="primary"
                      key="1"
                    >
                      Primary
                    </Buttons>,
                  ]}
                  title="Title"
                  subTitle="This is a subtitle"
                  routes={routes}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default PageHeaderElement;
