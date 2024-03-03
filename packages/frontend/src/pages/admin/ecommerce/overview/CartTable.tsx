import { useState, useEffect } from 'react';
import {
  UilPlus,
  UilMinus,
  UilTrashAlt
} from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Form, Input, Spin } from 'antd';
import Heading from '@/components/heading';
import { Buttons } from '@/components/buttons';
import { cartGetData, cartUpdateQuantity, cartDelete } from '@/redux/cart/actionCreator';

function CartTable() {
  const dispatch = useDispatch();
  const { cartData, isLoading } = useSelector((state:any) => {
    return {
      cartData: state.cart.data,
      isLoading: state.cart.loading,
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });

  const [form] = Form.useForm();
  const [state, setState] = useState({
    coupon: 0,
    promo: 0,
    current: 0,
  });

  useEffect(() => {
    if (cartGetData) {
      // @ts-ignore
      dispatch(cartGetData());
    }
  }, [dispatch]);

  const incrementUpdate = (id:any, quantity:any) => {
    const data = parseInt(quantity, 10) + 1;
    // @ts-ignore
    dispatch(cartUpdateQuantity(id, data, cartData));
  };

  const decrementUpdate = (id:number, quantity:number) => {
    const data = quantity >= 2 ? quantity - 1 : 1;
    // @ts-ignore
    dispatch(cartUpdateQuantity(id, data, cartData));
  };

  const cartDeleted = (id:number) => {
    const confirm = window.confirm('Are you sure to delete this product?');
    // @ts-ignore
    if (confirm) dispatch(cartDelete(id, cartData));
  };

  const productTableData:any= [];

  if (cartData !== null) {
    cartData.map((data:any) => {
      const { id, img, name, quantity, price, size, color } = data;
      return productTableData.push({
        key: id,
        product: (
          <div className="cart-single">
            <figure className="flex items-center mb-0">
              <img
                className="max-w-[80px] min-h-[80px] ltr:mr-[25px] rtl:ml-[25px] rounded-[10px]"
                style={{ width: 80 }}
                src={`/hexadash-nextjs/${img}`}
                alt=""
              />
              <figcaption>
                <div className="cart-single__info">
                  <Heading as="h6" className="text-base font-medium text-dark dark:text-white/[.87]">
                    {name}
                  </Heading>
                  <ul className="flex items-center mb-0">
                    <li className="ltr:mr-5 rtl:ml-5">
                      <span className="text-dark dark:text-white/[.87] ltr:mr-[5px] rtl:ml-[5px] text-[15px] font-medium">
                        Size :
                      </span>
                      <span className="text-body dark:text-white/60 text-[15px]">{size}</span>
                    </li>
                    <li>
                      <span className="text-dark dark:text-white/[.87] ltr:mr-[5px] rtl:ml-[5px] text-[15px] font-medium">
                        {' '}
                        Color :
                      </span>
                      <span className="text-body dark:text-white/60 text-[15px]">{color}</span>
                    </li>
                  </ul>
                </div>
              </figcaption>
            </figure>
          </div>
        ),
        price: <span className="text-body dark:text-white/60 text-[15px]">${price}</span>,
        quantity: (
          <div className="cart-single-quantity">
            <Buttons
              onClick={() => decrementUpdate(id, quantity)}
              className=" bg-normalBG dark:bg-normalBGdark w-9 h-9 ltr:mr-4 rtl:ml-4 px-3 text-body dark:text-white/60 border-none rounded-[10px]"
              type="default"
            >
              <UilMinus className="w-[12px] h-[12px]" />
            </Buttons>
            {quantity}
            <Buttons
              onClick={() => incrementUpdate(id, quantity)}
              className=" bg-normalBG dark:bg-normalBGdark w-9 h-9 ltr:ml-4 rtl:mr-4 px-3 text-body dark:text-white/60 border-none rounded-[10px]"
              type="default"
            >
              <UilPlus className="w-[12px] h-[12px]" />
            </Buttons>
          </div>
        ),
        total: (
          <span className="inline-block min-w-[80px] text-primary text-[15px] font-semibold">
            ${(quantity * price).toFixed(2)}
          </span>
        ),
        action: (
          <div className="text-end">
            <Buttons
              onClick={() => cartDeleted(id)}
              className="bg-white dark:bg-white/10 h-[38px] px-[11px] text-body dark:text-white/60 border-none shadow-none hover:bg-danger-transparent hover:text-danger"
              to="#"
              size="default"
              type="danger"
              shape="circle"
              transparented
            >
              <UilTrashAlt className="w-[14px] h-[14px]" />
            </Buttons>
          </div>
        ),
      });
    });
  }

  const productTableColumns = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const submitCoupon = (values:any) => {
    setState({ ...state, coupon: values });
  };

  return (
    <>
      {isLoading ? (
        <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
          <Spin />
        </div>
      ) : (
        <div className="table-responsive table-th-shape-none table-th-border-none hover-tr-none table-tr-hover-shadow table-td-border-none [&>div>div>div>div>div>.ant-table-content]:pb-5 ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-none ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-none">
          <Table pagination={false} dataSource={productTableData} columns={productTableColumns} />
        </div>
      )}

      <div className="mt-[10px] mb-[20px]">
        <Form form={form} name="submitCoupon" onFinish={submitCoupon}>
          <Row gutter={15}>
            <Col lg={4} sm={8} xs={24}>
              <Form.Item name="coupon" label="">
                <Input
                  placeholder="Coupon Code"
                  className="max-w-[180px] bg-white dark:bg-white/10 h-11 ltr:pl-5 rtl:pr-5 text-body dark:text-white/60 border border-normal dark:border-white/10 hover:border-primary focus:shadow-[0_0_0_2px_rgba(130,49,211,0.1)] rounded-md dark:placeholder:text-white/[87]"
                />
              </Form.Item>
            </Col>
            <Col lg={4} sm={8} xs={24}>
              <Buttons
                htmlType="submit"
                size="default"
                type="primary"
                className="px-5 text-sm font-semibold text-white dark:placeholder:text-white/[.87] border-none rounded-md bg-primary hover:bg-primary-hbr h-11 dark:text-white/[.87]"
              >
                Apply Coupon
              </Buttons>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default CartTable;
