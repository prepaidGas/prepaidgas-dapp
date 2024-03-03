import { Row, Col } from 'antd';
import { PageHeaders } from '@/components/page-headers';
import CreateProduct from './overview/CreateProduct';

function EditProduct() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Edit Product',
    },
  ];

  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Edit Product"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <div className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <Row gutter={15}>
          <Col xs={24}>
            <div className="bg-white dark:bg-white/10 rounded-10">
              <Row gutter={25} justify="center">
                <Col xxl={12} md={18} xs={24}>
                  <CreateProduct />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default EditProduct;
