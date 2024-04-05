import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Pagination, Spin } from 'antd';
import Heading from '@/components/heading';
import ProductLayout from './Layout';
import ProductCards from './overview/ProductCards';

interface RootState {
  products: {
    data: any;
    loading: boolean;
  }
}

interface Item {
  id: string;
  name: string;
  rate: number;
  price: number;
  oldPrice: number;
  popular: boolean;
  img: string;
}

function Grid() {
  const { productsAll, isLoader } = useSelector((state:RootState) => {
    return {
      productsAll: state.products.data,
      isLoader: state.products.loading,
    };
  });

  const [state, setState]:any = useState({
    products: productsAll,
    current: 0,
    pageSize: 0,
  });

  const { products } = state;

  useEffect(() => {
    if (productsAll) {
      setState({
        products: productsAll,
      });
    }
  }, [productsAll]);

  const onShowSizeChange = (current:number, pageSize:number) => {
    setState({ ...state, current, pageSize });
  };

  const onHandleChange = (current:number, pageSize:number) => {
    // You can create pagination in here
    setState({ ...state, current, pageSize });
  };

  return (
    <ProductLayout>
      <Row gutter={30}>
        {isLoader ? (
          <Col xs={24}>
            <div className="spin flex items-center justify-center mx-auto h-[calc(100vh-132px)]">
              <Spin />
            </div>
          </Col>
        ) : products.length ? (
          products.map(({ id, name, rate, price, oldPrice, popular, img }:Item) => {
            return (
              <Col xxl={6} lg={12} xs={24} key={id}>
                <ProductCards product={{ id, name, rate, price, oldPrice, popular, img }} />
              </Col>
            );
          })
        ) : (
          <Col md={24}>
            <>
              <Heading as="h1">Data Not Found</Heading>
            </>
          </Col>
        )}
        <Col xs={24} className="pb-30">
          <div style={{ marginTop: 10 }}>
            {products.length ? (
              <div className="text-end [&>.ant-pagination>li]:margin-0 [&>.ant-pagination>li]:border [&>.ant-pagination>li]:margin-0 [&>.ant-pagination>li]:bg-white [&>.ant-pagination>li]:rounded-6 dark:[&>.ant-pagination>li]:bg-white/10 dark:[&>.ant-pagination>li]:margin-0 [&>.ant-pagination>li]:border-regular dark:[&>.ant-pagination>li]:border-white/10 [&>.ant-pagination>li>.ant-pagination-item-link]:flex [&>.ant-pagination>li>.ant-pagination-item-link]:items-center [&>.ant-pagination>li>.ant-pagination-item-link]:justify-center [&>.ant-pagination>li>.ant-pagination-item-link]:border-none [&>.ant-pagination>li>.ant-pagination-item-link>.anticon>svg]:text-light [&>.ant-pagination>li>.ant-pagination-item-link>.anticon>svg]:dark:text-white/30 [&>.ant-pagination>.ant-pagination-item>a]:text-body [&>.ant-pagination>.ant-pagination-item>a]:dark:text-white/60 [&>.ant-pagination>.ant-pagination-item-active]:bg-primary [&>.ant-pagination>.ant-pagination-item.ant-pagination-item-active>a]:text-white [&>.ant-pagination>.ant-pagination-item.ant-pagination-item-active>a]:dark:text-white/60 [&>.ant-pagination>.ant-pagination-options]:border-none [&>.ant-pagination>.ant-pagination-options>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-selector]:h-[33px] dark:[&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-selector]:text-white/[.60] dark:[&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-arrow]:text-white/[.60] [&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-selector]:border-0 dark:[&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-selector]:border-white/10 [&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-selector]:rounded-6">
                <Pagination
                  onChange={onHandleChange}
                  showSizeChanger
                  onShowSizeChange={onShowSizeChange}
                  pageSize={10}
                  defaultCurrent={1}
                  total={40}
                />
              </div>
            ) : null}
          </div>
        </Col>
      </Row>
    </ProductLayout>
  );
}

export default Grid;