import { useEffect } from 'react';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeaders } from '@/components/page-headers';
import { cartGetData } from '@/redux/cart/actionCreator';

import CartTable from './overview/CartTable';
import OrderSummary from './overview/Ordersummary';


function ShoppingCart() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Shopping Cart',
    },
  ];

  interface RootState {
    ChangeLayoutMode: {
      rtlData: string;
    };
    cart: {
      data: [];
    };
  }

  const dispatch = useDispatch();
  const { cartData } = useSelector((state:RootState) => {
    return {
      cartData: state.cart.data,
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });

  useEffect(() => {
    if (cartGetData) {
      // @ts-ignore
      dispatch(cartGetData());
    }
  }, [dispatch]);

  let subtotal = 0;

  if (cartData !== null) {
    cartData.map((data) => {
      const { quantity, price } = data;
      subtotal += parseInt(quantity, 10) * parseInt(price, 10);
      return subtotal;
    });
  }

  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Shopping Cart"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <div className="">
          <Row gutter={15}>
            <Col md={24}>
              <div className="bg-white dark:bg-white/10 p-[25px] rounded-[10px]">
                <Row gutter={30}>
                  <Col xxl={17} xs={24}>
                    <CartTable />
                  </Col>
                  <Col xxl={7} xs={24}>
                    <OrderSummary subtotal={subtotal} checkout={false} />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </main>
    </>
  );
}

export default ShoppingCart;
