import { useState } from 'react';
import { Row, Col, Pagination } from 'antd';
import { PageHeaders } from '@/components/page-headers';

function Paginations() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Paginations',
    },
  ];

  interface RootState {
    current: number,
    pageSize: number,
    page: number,
    pageNumber?: number,
  }

  const [state, setState] = useState<RootState>({
    current: 0,
    pageSize: 0,
    page: 0,
  });
  const onShowSizeChange = (current:number, pageSize:number) => {
    setState({ ...state, current, pageSize });
  };

  const onChange = (pageNumber:number) => {
    setState({ ...state, pageNumber });
  };

  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Paginations"
        routes={PageRoutes}
      />
      <div className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
          <Col md={12} sm={24} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Basic
                </h1>
              </div>
              <>
                <div className="p-[25px] [&>.ant-pagination>.ant-pagination-item:not(.ant-pagination-item-active)]:hover:bg-transparent [&>.ant-pagination>li]:margin-0 [&>.ant-pagination>li]:border [&>.ant-pagination>li]:border-regular dark:[&>.ant-pagination>li]:border-white/10 [&>.ant-pagination>li>.ant-pagination-item-link]:flex [&>.ant-pagination>li>.ant-pagination-item-link]:items-center [&>.ant-pagination>li>.ant-pagination-item-link]:justify-center [&>.ant-pagination>li>.ant-pagination-item-link]:border-none [&>.ant-pagination>li>.ant-pagination-item-link>.anticon>svg]:text-light [&>.ant-pagination>li>.ant-pagination-item-link>.anticon>svg]:dark:text-white/30 [&>.ant-pagination>.ant-pagination-item>a]:text-body [&>.ant-pagination>.ant-pagination-item>a]:dark:text-white/60 [&>.ant-pagination>.ant-pagination-item-active]:bg-primary [&>.ant-pagination>.ant-pagination-item.ant-pagination-item-active>a]:text-white [&>.ant-pagination>.ant-pagination-item.ant-pagination-item-active>a]:dark:text-white/60 [&>.ant-pagination>.ant-pagination-options]:border-none [&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-selector]:h-[30px] [&>.ant-pagination>.ant-pagination-options>.ant-select:hover>.ant-select-selector]:border-primary">
                  <Pagination defaultCurrent={1} total={50} />
                </div>
              </>
            </div>
          </Col>
          <Col md={12} sm={24} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  More pages
                </h1>
              </div>
              <>
                <div className="p-[25px] [&>.ant-pagination>.ant-pagination-item:not(.ant-pagination-item-active)]:hover:bg-transparent [&>.ant-pagination>li]:margin-0 [&>.ant-pagination>li]:border [&>.ant-pagination>li]:border-regular dark:[&>.ant-pagination>li]:border-white/10 [&>.ant-pagination>li>.ant-pagination-item-link]:flex [&>.ant-pagination>li>.ant-pagination-item-link]:items-center [&>.ant-pagination>li>.ant-pagination-item-link]:justify-center [&>.ant-pagination>li>.ant-pagination-item-link]:border-none [&>.ant-pagination>li>.ant-pagination-item-link>.anticon>svg]:text-light [&>.ant-pagination>li>.ant-pagination-item-link>.anticon>svg]:dark:text-white/30 [&>.ant-pagination>.ant-pagination-item>a]:text-body [&>.ant-pagination>.ant-pagination-item>a]:dark:text-white/60 [&>.ant-pagination>.ant-pagination-item-active]:bg-primary [&>.ant-pagination>.ant-pagination-item.ant-pagination-item-active>a]:text-white [&>.ant-pagination>.ant-pagination-item.ant-pagination-item-active>a]:dark:text-white/60 [&>.ant-pagination>.ant-pagination-options]:border-none [&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-selector]:h-[30px] [&>.ant-pagination>.ant-pagination-options>.ant-select:hover>.ant-select-selector]:border-primary">
                  <Pagination defaultCurrent={1} total={500} />
                </div>
              </>
            </div>
          </Col>
          <Col md={12} sm={24} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Page size
                </h1>
              </div>
              <>
                <div className="p-[25px] [&>.ant-pagination>.ant-pagination-item:not(.ant-pagination-item-active)]:hover:bg-transparent [&>.ant-pagination>li]:margin-0 [&>.ant-pagination>li]:border [&>.ant-pagination>li]:border-regular dark:[&>.ant-pagination>li]:border-white/10 [&>.ant-pagination>li>.ant-pagination-item-link]:flex [&>.ant-pagination>li>.ant-pagination-item-link]:items-center [&>.ant-pagination>li>.ant-pagination-item-link]:justify-center [&>.ant-pagination>li>.ant-pagination-item-link]:border-none [&>.ant-pagination>li>.ant-pagination-item-link>.anticon>svg]:text-light [&>.ant-pagination>li>.ant-pagination-item-link>.anticon>svg]:dark:text-white/30 [&>.ant-pagination>.ant-pagination-item>a]:text-body [&>.ant-pagination>.ant-pagination-item>a]:dark:text-white/60 [&>.ant-pagination>.ant-pagination-item-active]:bg-primary [&>.ant-pagination>.ant-pagination-item.ant-pagination-item-active>a]:text-white [&>.ant-pagination>.ant-pagination-item.ant-pagination-item-active>a]:dark:text-white/60 [&>.ant-pagination>.ant-pagination-options]:border-none [&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-selector]:h-[30px] [&>.ant-pagination>.ant-pagination-options>.ant-select:hover>.ant-select-selector]:border-primary">
                  <Pagination showSizeChanger onShowSizeChange={onShowSizeChange} defaultCurrent={3} total={500} />
                </div>
              </>
            </div>
          </Col>
          <Col md={12} sm={24} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Quick Jumper
                </h1>
              </div>
              <>
                <div className="p-[25px] [&>.ant-pagination>.ant-pagination-item:not(.ant-pagination-item-active)]:hover:bg-transparent [&>.ant-pagination>li]:margin-0 [&>.ant-pagination>li]:border [&>.ant-pagination>li]:border-regular dark:[&>.ant-pagination>li]:border-white/10 [&>.ant-pagination>li>.ant-pagination-item-link]:flex [&>.ant-pagination>li>.ant-pagination-item-link]:items-center [&>.ant-pagination>li>.ant-pagination-item-link]:justify-center [&>.ant-pagination>li>.ant-pagination-item-link]:border-none [&>.ant-pagination>li>.ant-pagination-item-link>.anticon>svg]:text-light [&>.ant-pagination>li>.ant-pagination-item-link>.anticon>svg]:dark:text-white/30 [&>.ant-pagination>.ant-pagination-item>a]:text-body [&>.ant-pagination>.ant-pagination-item>a]:dark:text-white/60 [&>.ant-pagination>.ant-pagination-item-active]:bg-primary [&>.ant-pagination>.ant-pagination-item.ant-pagination-item-active>a]:text-white [&>.ant-pagination>.ant-pagination-item.ant-pagination-item-active>a]:dark:text-white/60 [&>.ant-pagination>.ant-pagination-options]:border-none [&>.ant-pagination>.ant-pagination-options>.ant-pagination-options-quick-jumper>input:hover]:border-primary [&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-selector]:h-[30px] [&>.ant-pagination>.ant-pagination-options>.ant-select:hover>.ant-select-selector]:border-primary">
                  <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} />
                </div>
              </>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Paginations;
