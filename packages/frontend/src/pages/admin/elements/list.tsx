import { Row, Col, List } from 'antd';
import { PageHeaders } from '@/components/page-headers';

function Lists() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'List',
    },
  ];
  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="List"
        routes={PageRoutes}
      />
      <>
        <div className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
          <Row gutter={25}>
            <Col md={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Simple List
                  </h1>
                </div>
                <div className="p-[25px] ">
                  <List
                    className="&>.ant-list-header]:border-regular dark:[&>.ant-list-header]:border-white/10"
                    header={<div className="dark:text-white/[.87]">Header</div>}
                    footer={<div className="dark:text-white/[.87]">Footer</div>}
                    dataSource={data}
                    bordered={true}
                    renderItem={(item) => (
                      <List.Item.Meta className="dark:[&>div>div]:text-white/60" description={item} />
                    )}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </>
    </>
  );
}

export default Lists;
