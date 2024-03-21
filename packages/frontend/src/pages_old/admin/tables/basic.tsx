import { Row, Col, Table } from 'antd';
import Heading from '@/components/heading';
import { PageHeaders } from '@/components/page-headers';
import DragAndDropTable from '@/components/table/DragTable';
import SaleByLocation from '@/dashboard/demo-1/SalesByLocation';
import BestSeller from '@/dashboard/demo-2/BestSeller';
import TopSellingProduct from '@/dashboard/demo-1/TopSellingProducts';
import BrowserState from '@/dashboard/demo-1/BrowserState';

function Tables() {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
      className: 'ltr:pr-4 rtl:pl-4 text-light dark:text-white/60 text-[15px] py-4 before:hidden',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
      className: 'ltr:pr-4 rtl:pl-4 text-light dark:text-white/60 text-[15px] py-4 before:hidden',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      className: 'ltr:pr-4 rtl:pl-4 text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      className: 'ltr:pr-4 rtl:pl-4 text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      className: 'ltr:pr-4 rtl:pl-4 text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none',
    },
  ];

  return (
    <>
      <PageHeaders title="Table" className="flex justify-between items-center bg-transparent pt-[15px] px-8 pb-6" />
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 pb-[20px]">
        <Row gutter={15}>
          <Col xs={24} className="mb-[25px]">
            <>
              <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
                <div className="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <Heading as="h4" className="mb-0 text-lg font-medium">
                    Basic Usage
                  </Heading>
                </div>
                <div className="p-[25px] [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-s-4 [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-e-4">
                  <Table className="table-responsive" pagination={false} dataSource={dataSource} columns={columns} />
                </div>
              </div>
            </>
          </Col>
          <Col xs={24} className="mb-[25px]">
            <SaleByLocation />
          </Col>
          <Col xs={24} className="mb-[25px]">
            <BestSeller />
          </Col>
          <Col xl={12} xs={24} className="mb-[25px]">
            <TopSellingProduct />
          </Col>
          <Col xl={12} xs={24} className="mb-[25px]">
            <BrowserState />
          </Col>
          <Col xs={24}>
            <DragAndDropTable />
          </Col>
        </Row>
      </main>
    </>
  );
}

export default Tables;
