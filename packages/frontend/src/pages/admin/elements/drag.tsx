import { Row, Col } from 'antd';
import { PageHeaders } from '@/components/page-headers';
import DragAndDropTable from '@/components/table/DragTable';

function UserListDataTable() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Drag & Drop',
    },
  ];
  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Drag & Drop"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={15}>
          <Col xs={24}>
            <DragAndDropTable />
          </Col>
        </Row>
      </main>
    </>
  );
}

export default UserListDataTable;
