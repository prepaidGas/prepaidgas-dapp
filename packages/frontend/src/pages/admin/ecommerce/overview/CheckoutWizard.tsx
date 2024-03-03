import { useState, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import {
  UilPlus,
  UilMinus,
  UilEdit,
  UilCheck,
  UilTrashAlt
} from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Input, Select, Radio, Table } from 'antd';
import Heading from '@/components/heading';
import { Buttons } from '@/components/buttons';
import { StepsWidget } from '@/components/steps';
import { Cards } from '@/components/cards/frame/cards-frame';
import { cartGetData, cartUpdateQuantity, cartDelete } from '@/redux/cart/actionCreator';

const { Option } = Select;

interface RootState {
  cart: {
    data: any;
    loading: boolean;
  }
  ChangeLayoutMode: {
    rtlData: string;
  }
}

interface Item {
  id: number;
  img: string;
  name: string;
  quantity: string;
  price: string;
  size: string;
  color: string;
}

function CheckOut() {
  const dispatch = useDispatch();
  const { cartData, rtl } = useSelector((state:RootState) => {
    return {
      cartData: state.cart.data,
      isLoading: state.cart.loading,
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });
  const [form] = Form.useForm();

  const [state, setState] = useState({
    status: 'process',
    isFinished: false,
    current: 1,
  });

  const { status, isFinished, current } = state;

  useEffect(() => {
    if (cartGetData) {
      // @ts-ignore
      dispatch(cartGetData());
    }
  }, [dispatch]);

  useLayoutEffect(() => {
    const activeElement = document.querySelectorAll('.ant-steps-item-active');
    const successElement = document.querySelectorAll('.ant-steps-item-finish');

    activeElement.forEach((element:any) => {
      if (element.previousSibling) {
        const bgImage = element.previousSibling;
        if (bgImage.classList.contains('success-step-item')) {
          bgImage.classList.remove('success-step-item');
        } else {
          bgImage.classList.remove('wizard-step-item');
        }
        bgImage.classList.add('wizard-steps-item-active');
      }
    });

    successElement.forEach((element:any) => {
      if (element.previousSibling) {
        const bgImage = element.previousSibling;
        bgImage.classList.remove('wizard-steps-item-active');
        bgImage.classList.add('success-step-item');
        // if(bgImage.classList.has('.ant-steps-item-active'))
      }
    });
  });

  const incrementUpdate = (id:number, quantity:number) => {
    const data = quantity + 1;
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

  const next = () => {
    setState({
      ...state,
      status: 'process',
      current: current + 1,
    });
  };

  const prev = () => {
    setState({
      ...state,
      status: 'process',
      current: current - 1,
    });
  };

  const done = () => {
    const confirm = window.confirm('Are sure to submit order?');
    if (confirm) {
      setState({
        ...state,
        status: 'finish',
        isFinished: true,
        current: 0,
      });
    }
  };

  const month:string[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  const dataSource:any = [];

  let subtotal = 0;

  if (cartData !== null) {
    cartData.map((data:Item) => {
      const { id, img, name, quantity, price, size, color } = data;
      subtotal += parseInt(quantity, 10) * parseInt(price, 10);
      return dataSource.push({
        key: id,
        product: (
          <div className="w-[300px]">
            <div className="flex items-center gap-x-[25px]">
              <img
                className="max-w-20 max-h-20 rounded-[10px]"
                style={{ width: 80 }}
                src={`/hexadash-nextjs/${img}`}
                alt=""
              />
              <figcaption>
                <div>
                  <Heading as="h6" className="mb-2 text-base font-medium text-dark dark:text-white/[.87]">
                    {name}
                  </Heading>
                  <ul className="flex items-center gap-x-5">
                    <li className="inline-flex gap-x-[5px]">
                      <span className="text-dark dark:text-white/[.87] text-[15px] font-medium">Size :</span>
                      <span className="text-body dark:text-white/60 text-[15px]">{size}</span>
                    </li>
                    <li className="inline-flex gap-x-[5px]">
                      <span className="text-dark dark:text-white/[.87] text-[15px] font-medium"> Color :</span>
                      <span className="text-body dark:text-white/60 text-[15px]">{color}</span>
                    </li>
                  </ul>
                </div>
              </figcaption>
            </div>
          </div>
        ),
        price: <span className="text-body dark:text-white/60 text-[15px]">${price}</span>,
        quantity: (
          <div className="flex items-center gap-x-4">
            <Buttons
              onClick={() => decrementUpdate(id, Number(quantity))}
              className="flex items-center justify-center bg-section dark:bg-white/10 w-9 h-9 p-0 text-body dark:text-white/60 border-none rounded-[10px]"
              type="default"
            >
              <UilMinus className="w-3 h-3" />
            </Buttons>
            {quantity}
            <Buttons
              onClick={() => incrementUpdate(id, Number(quantity))}
              className="flex items-center justify-center bg-section dark:bg-white/10 w-9 h-9 p-0 text-body dark:text-white/60 border-none rounded-[10px]"
              type="default"
            >
              <UilPlus className="w-3 h-3" />
            </Buttons>
          </div>
        ),
        total: (
          <span className="text-dark dark:text-white/[.87] text-[15px] font-medium">${(Number(quantity) * Number(price)).toFixed(2)}</span>
        ),
        action: (
          <div className="table-action">
            <Buttons
              onClick={() => cartDeleted(id)}
              className="btn-icon"
              href="#"
              size="default"
              type="danger"
              shape="circle"
              transparented
            >
              <UilTrashAlt />
            </Buttons>
          </div>
        ),
      });
    });
  }

  const columns = [
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
  ];

  return (
    <div className="checkout-widget">
      <StepsWidget
        isswitch
        current={0}
        // status={status}
        steps={[
          {
            title: 'Create Account',
            content: (
              <div className="w-[580px] sm:px-[25px]">
                <Row justify="center">
                  <Col sm={22} xs={24}>
                    <Heading as="h4" className="mb-[38px] text-xl md:text-lg ssm:text-base font-semibold">
                      1. Please Create Your Account
                    </Heading>
                    <Form form={form} name="account">
                      <Form.Item
                        className="mb-6 [&>.ant-row>.ant-col]:flex-1 [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 dark:[&>.ant-form-item-row>div>div>div>input]:bg-[#282b36] [&>.ant-form-item-row>div>div>div>input]:rounded-4 dark:[&>.ant-form-item-row>div>div>div>input]:text-white/60 [&>.ant-form-item-row]:flex-col [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/60"
                        name="username"
                        label="Username"
                      >
                        <Input placeholder="Username" className="h-12 p-3 dark:placeholder-white/60" />
                      </Form.Item>
                      <Form.Item
                        className="mb-6 [&>.ant-row>.ant-col]:flex-1 [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 dark:[&>.ant-form-item-row>div>div>div>input]:bg-[#282b36] [&>.ant-form-item-row>div>div>div>input]:rounded-4 dark:[&>.ant-form-item-row>div>div>div>input]:text-white/60 [&>.ant-form-item-row]:flex-col [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/60"
                        name="email"
                        rules={[{ type: 'email' }]}
                        label="Email Address"
                      >
                        <Input placeholder="name@gmail.com" className="h-12 p-3 dark:placeholder-white/60" />
                      </Form.Item>
                      <Form.Item
                        label="Password"
                        className="[&>.ant-row>.ant-col]:flex-1 [&>div>div>div>div>span>span>svg]:w-[16px] ltr:[&>div>div>div>div>span>.ant-input-prefix]:mr-[10px] rtl:[&>div>div>div>div>span>.ant-input-prefix]:ml-[10px] [&>div>div>div>div>span>span>svg]:h-[16px] [&>div>div>div>div>span>span>svg]:text-light-extra dark:[&>div>div>div>div>span>span>svg]:h-[16px] [&>div>div>div>div>span>span>svg]:text-white/60 [&>div>div>div>div>span>span>span>svg]:text-light-extra dark:[&>div>div>div>div>span>span>span>svg]:text-white/60 [&>div>.ant-form-item-label]:text-start [&>div>.ant-form-item-control>div>div>.ant-input-affix-wrapper]:pr-[20px] [&>div>.ant-form-item-control>div>div>.ant-input-affix-wrapper]:py-0 dark:[&>div>.ant-form-item-control>div>div>.ant-input-affix-wrapper]:bg-[#282b36] dark:[&>div>.ant-form-item-control>div>div>.ant-input-affix-wrapper]:border-white/10 [&>div>.ant-form-item-control>div>div>.ant-input-affix-wrapper>input]:bg-transparent dark:[&>div>.ant-form-item-control>div>div>.ant-input-affix-wrapper>input]:bg-transparent dark:[&>div>.ant-form-item-control>div>div>.ant-input-affix-wrapper>input]:text-white/60 [&>div>.ant-form-item-control>div>div>.ant-input-affix-wrapper>input]:py-3 [&>.ant-form-item-row]:flex-col dark:[&>.ant-form-item-row>div>label]:text-white/60"
                        name="password"
                        initialValue="1234567"
                      >
                        <Input.Password placeholder="Enter Password" className="px-2 hover:border-primary" />
                      </Form.Item>
                      <span className="text-theme-gray dark:text-white/60 input-message">
                        Enter a valid password. Min 6 characters long
                      </span>
                    </Form>
                  </Col>
                </Row>
              </div>
            ),
          },
          {
            title: 'Shipping Address',
            content: (
              <div className="w-[580px] sm:px-[25px]">
                <Row justify="center">
                  <Col sm={22} xs={24}>
                    <Heading as="h4" className="mb-[38px] text-xl md:text-lg ssm:text-base font-semibold">
                      2. Please Fill in Your Shipping Address
                    </Heading>
                    <Form form={form} name="address">
                      <Form.Item
                        className="mb-6 [&>.ant-row>.ant-col]:flex-1 [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 [&>.ant-form-item-row>div>div>div>input]:rounded-md [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/60 [&>.ant-form-item-row]:flex-col"
                        name="name"
                        label="Contact Name"
                      >
                        <Input placeholder="Ibn adam" className="h-12 p-3 dark:placeholder-white/60" />
                      </Form.Item>
                      <Form.Item
                        className="mb-6 [&>.ant-row>.ant-col]:flex-1 [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 [&>.ant-form-item-row>div>div>div>input]:rounded-md [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/60 [&>.ant-form-item-row]:flex-col"
                        name="company"
                        label={
                          <span>
                            Company Name <span>(Optional)</span>
                          </span>
                        }
                      >
                        <Input placeholder="adam" className="h-12 p-3 dark:placeholder-white/60" />
                      </Form.Item>
                      <Form.Item
                        className="mb-6 [&>.ant-row>.ant-col]:flex-1 [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 [&>.ant-form-item-row>div>div>div>input]:rounded-md [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/60 [&>.ant-form-item-row]:flex-col"
                        name="phone"
                        label="Phone Number"
                      >
                        <Input placeholder="+880" className="h-12 p-3 dark:placeholder-white/60" />
                      </Form.Item>
                      <Form.Item
                        className="mb-6 [&>.ant-row>.ant-col]:flex-1 [&>.ant-form-item-row]:flex-col [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/60"
                        name="country"
                        initialValue=""
                        label="Country/Region"
                      >
                        <Select
                          className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:h-[50px] [&>div]:rounded-md [&>.ant-select-arrow]:text-theme-gray [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center [&>div>.ant-select-selection-item]:text-[#bfbfbf] dark:[&>div>.ant-select-selection-item]:text-white/60 [&>.ant-select-arrow]:end-3" 
                          style={{ width: '100%' }}
                        >
                          <Option value="">Please Select</Option>
                          <Option value="bangladesh">Bangladesh</Option>
                          <Option value="india">India</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        className="mb-6 [&>.ant-row>.ant-col]:flex-1 [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 [&>.ant-form-item-row>div>div>div>input]:rounded-md [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/60 [&>.ant-form-item-row]:flex-col"
                        name="street"
                        label="Street Address"
                      >
                        <Input placeholder="House Number and Street Name" className="h-12 p-3 dark:placeholder-white/60" />
                      </Form.Item>
                      <Form.Item
                        className="mb-6 [&>.ant-row>.ant-col]:flex-1 [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 [&>.ant-form-item-row>div>div>div>input]:rounded-md [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/60 [&>.ant-form-item-row]:flex-col"
                        name="street2"
                        label=""
                      >
                        <Input placeholder="Apartment, Suite, Unit etc." className="h-12 p-3 dark:placeholder-white/60" />
                      </Form.Item>
                      <Form.Item
                        className="mb-6 [&>.ant-row>.ant-col]:flex-1 [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 [&>.ant-form-item-row>div>div>div>input]:rounded-md [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/60 [&>.ant-form-item-row]:flex-col"
                        name="city"
                        label="City"
                      >
                        <Input placeholder="Enter City" className="h-12 p-3 dark:placeholder-white/60" />
                      </Form.Item>
                      <Form.Item
                        className="mb-0 [&>.ant-row>.ant-col]:flex-1 [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 [&>.ant-form-item-row>div>div>div>input]:rounded-md [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/60 [&>.ant-form-item-row]:flex-col"
                        name="zip"
                        label="Zip/Postal Code"
                      >
                        <Input placeholder="Enter Zip" className="h-12 p-3 dark:placeholder-white/60" />
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </div>
            ),
          },
          {
            title: 'Payment Method',
            content: (
              <div className="w-[580px] sm:px-[25px] ssm:px-[15px]">
                <Row justify="center">
                  <Col sm={22} xs={24}>
                    <Heading as="h4" className="mb-[38px] text-xl md:text-lg ssm:text-base font-semibold">
                      3. Please Select Your Payment Method
                    </Heading>
                    <Radio.Group style={{ width: '100%' }}>
                      <div className="mb-[25px]">
                        <Radio
                          style={{ width: '100%' }}
                          value="card"
                          className="[&>.ant-radio]:self-start [&>.ant-radio]:top-1 [&>span:not(.ant-radio)]:w-full ltr:[&>span.ant-radio]:mr-[15px] rtl:[&>span.ant-radio]:ml-[15px] [&>span.ant-radio]:mt-[30px] [&>.ant-radio>.ant-radio-inner]:hover:border-primary [&>.ant-radio-checked>.ant-radio-inner]:bg-primary [&>.ant-radio-checked>.ant-radio-inner]:border-primary"
                        >
                          <Cards
                            headless
                            className="[&>.ant-card-body]:p-[25px] sm:[&>.ant-card-body]:p-[15px] bg-[#f7f8fa] dark:bg-[#282b36] border-1 border-solid border-normal dark:border-white/10"
                            bodyStyle={{
                              borderRadius: '20px',
                            }}
                          >
                            <div className="flex items-center justify-between flex-wrap mb-[20px] gap-[10px]">
                              <span className="text-body dark:text-white/60">Credit/Debit Card</span>
                              <div className="flex items-start gap-[15px]">
                                <img
                                  style={{ width: '50px' }}
                                  src='/hexadash-nextjs/img/cards-logo/ms.png'
                                  alt=""
                                />
                                <img
                                  style={{ width: '50px' }}
                                  src='/hexadash-nextjs/img/cards-logo/american-express.png'
                                  alt=""
                                />
                                <img
                                  style={{ width: '50px' }}
                                  src='/hexadash-nextjs/img/cards-logo/visa.png'
                                  alt=""
                                />
                              </div>
                            </div>
                            <Cards
                              className="[&>.ant-card-body]:p-[25px] dark:bg-[#1b1d2a]"
                              headless
                              style={{ marginBottom: 0 }}
                            >
                              <Form form={form} name="info">
                                <Form.Item
                                  className="mb-6 [&>.ant-row>.ant-col]:flex-1 [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 dark:[&>.ant-form-item-row>div>div>div>input]:bg-[#282b35] [&>.ant-form-item-row>div>div>div>input]:rounded-md [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/60 [&>.ant-form-item-row]:flex-col"
                                  name="number"
                                  label="Card Number"
                                >
                                  <Input placeholder="6547-8702-6987-2527" className="h-12 p-3 dark:placeholder-white/60" />
                                </Form.Item>
                                <Form.Item
                                  className="mb-6 [&>.ant-row>.ant-col]:flex-1 [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 dark:[&>.ant-form-item-row>div>div>div>input]:bg-[#282b35] [&>.ant-form-item-row>div>div>div>input]:rounded-md [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/60 [&>.ant-form-item-row]:flex-col"
                                  name="name"
                                  label="Name on Card"
                                >
                                  <Input placeholder="Full name" className="h-12 p-3 dark:placeholder-white/60" />
                                </Form.Item>
                                <Form.Item
                                  className="mb-6 [&>.ant-row>.ant-col]:flex-1 [&>.ant-form-item-row]:flex-col [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/60"
                                  name="month"
                                  initialValue=""
                                  label="Expiration Date"
                                >
                                  <Select
                                    className="[&>.ant-row>.ant-col]:flex-1 [&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:h-[50px] [&>div]:rounded-md [&>.ant-select-arrow]:text-theme-gray dark:[&>div]:rounded-md [&>.ant-select-arrow]:text-white/60 [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center [&>div>.ant-select-selection-item]:text-[#bfbfbf] dark:[&>div>.ant-select-selection-item]:text-white/60 dark:[&>div]:bg-[#282b35] [&>.ant-select-arrow]:end-3"
                                    style={{ width: '100%' }}
                                  >
                                    <Option value="">MM</Option>
                                    {month.map((value:string) => (
                                      <Option key={value} value={value}>
                                        {value}
                                      </Option>
                                    ))}
                                  </Select>
                                </Form.Item>
                                <Form.Item
                                  className="mb-6 [&>.ant-row>.ant-col]:flex-1 [&>.ant-form-item-row]:flex-col [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/60"
                                  name="year"
                                  initialValue=""
                                >
                                  <Select
                                    className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:h-[50px] [&>div]:rounded-md [&>.ant-select-arrow]:text-theme-gray dark:[&>div]:rounded-md dark:[&>.ant-select-arrow]:text-white/60 [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center [&>div>.ant-select-selection-item]:text-[#bfbfbf] dark:[&>div>.ant-select-selection-item]:text-white/60 dark:[&>div]:bg-[#282b35] [&>.ant-select-arrow]:end-3"
                                    style={{ width: '100%' }}
                                  >
                                    <Option value="">YY</Option>
                                    <Option value={new Date().getFullYear()}>{new Date().getFullYear()}</Option>
                                    
                                    {month.map((value:string) => {
                                      const numValue = Number(value);
                                      return (
                                        <Option
                                          key={numValue}
                                          value={new Date().getFullYear() + numValue}
                                        >
                                          {new Date().getFullYear() + numValue}
                                        </Option>
                                      );
                                    })}
                                   
                                  </Select>
                                </Form.Item>
                                <Form.Item
                                  className="mb-0 [&>.ant-row>.ant-col]:flex-1 [&>.ant-form-item-row>div>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>div>input]:border-white/10 dark:[&>.ant-form-item-row>div>div>div>div>input]:bg-[#282b35] [&>.ant-form-item-row>div>div>div>div>input]:rounded-md [&>div>.ant-form-item-label]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/60 [&>.ant-form-item-row]:flex-col"
                                  name="cvv"
                                  label="CVV"
                                >
                                  <div className="flex items-center flex-wrap gap-[10px]">
                                    <Input className="max-w-[120px] h-12 p-3 dark:placeholder-white/60" placeholder="XXX" />
                                    <Link className="text-dark dark:text-white/60" href="#">
                                      What is this?
                                    </Link>
                                  </div>
                                </Form.Item>
                              </Form>
                            </Cards>
                          </Cards>
                        </Radio>
                      </div>
                      <div className="mb-[25px]">
                        <Radio
                          value="payPal"
                          style={{ width: '100%' }}
                          className="ltr:[&>span.ant-radio]:mr-[15px] rtl:[&>span.ant-radio]:ml-[15px] [&>span:not(.ant-radio)]:flex [&>span:not(.ant-radio)]:items-center [&>span:not(.ant-radio)]:justify-between [&>span:not(.ant-radio)]:w-full [&>span:not(.ant-radio)]:h-[60px] [&>span:not(.ant-radio)]:px-[25px] [&>span:not(.ant-radio)]:text-body dark:[&>span:not(.ant-radio)]:text-white/60 [&>span:not(.ant-radio)]:text-[15px] [&>span:not(.ant-radio)]:font-medium [&>span:not(.ant-radio)]:border [&>span:not(.ant-radio)]:border-regular dark:[&>span:not(.ant-radio)]:border-white/10 [&>span:not(.ant-radio)]:rounded-[10px] [&>.ant-radio>.ant-radio-inner]:hover:border-primary [&>.ant-radio-checked>.ant-radio-inner]:bg-primary [&>.ant-radio-checked>.ant-radio-inner]:border-primary"
                        >
                          Pay With PayPal
                          <img className="xs:hidden" src='/hexadash-nextjs/img/PayPalLogo.png' alt="paypal" />
                        </Radio>
                      </div>
                      <div className="">
                        <Radio
                          value="cash"
                          style={{ width: '100%' }}
                          className="ltr:[&>span.ant-radio]:mr-[15px] rtl:[&>span.ant-radio]:ml-[15px] [&>span:not(.ant-radio)]:flex [&>span:not(.ant-radio)]:items-center [&>span:not(.ant-radio)]:justify-between [&>span:not(.ant-radio)]:w-full [&>span:not(.ant-radio)]:h-[60px] [&>span:not(.ant-radio)]:px-[25px] [&>span:not(.ant-radio)]:text-body dark:[&>span:not(.ant-radio)]:text-white/60 [&>span:not(.ant-radio)]:text-[15px] [&>span:not(.ant-radio)]:font-medium [&>span:not(.ant-radio)]:border [&>span:not(.ant-radio)]:border-regular dark:[&>span:not(.ant-radio)]:border-white/10 [&>span:not(.ant-radio)]:rounded-[10px] [&>.ant-radio>.ant-radio-inner]:hover:border-primary [&>.ant-radio-checked>.ant-radio-inner]:bg-primary [&>.ant-radio-checked>.ant-radio-inner]:border-primary"
                        >
                          Cash on delivery
                        </Radio>
                      </div>
                    </Radio.Group>
                  </Col>
                </Row>
              </div>
            ),
          },
          {
            title: 'Review Order',
            content:
              status !== 'finish' ? (
                <div className="w-full 3xl:px-[30px] ssm:px-[15px]">
                  <Heading as="h4" className="mb-[38px] text-xl md:text-lg ssm:text-base font-semibold">
                    4. Review and confirm Order
                  </Heading>
                  <>
                    <div className="p-[25px] ssm:px-[15px] rounded-[10px] border border-normal dark:border-white/10">
                      <div className="bg-regularBG dark:bg-whiteDark mb-[25px] p-[25px] ssm:px-[15px] rounded-[15px]">
                        <div>
                          <Heading
                            as="h5"
                            className="flex items-center justify-between mb-[22px] text-body dark:text-white/60 text-lg ssm:text-base font-normal"
                          >
                            Shipping Information
                            <Link href="#" className="inline-flex items-center gap-x-[5px] text-sm">
                              <UilEdit className="w-[14px] h-[14px]" />
                              Edit
                            </Link>
                          </Heading>
                        </div>
                        <article>
                          <Radio.Group style={{ width: '100%' }}>
                            <Radio value="ms" style={{ width: '100%' }} className="[&>.ant-radio]:self-start [&>.ant-radio]:top-1 [&>.ant-radio>.ant-radio-inner]:hover:border-primary [&>.ant-radio-checked>.ant-radio-inner]:bg-primary [&>.ant-radio-checked>.ant-radio-inner]:border-primary">
                              <div className="mx-3">
                                <Heading as="h6" className="mb-2 text-[15px] font-medium">
                                  Ibn Adam
                                </Heading>
                                <Heading as="h6" className="mb-2 text-[15px] font-medium">
                                  Phone: +61412345678
                                </Heading>
                                <p className="text-[15px] text-body dark:text-white/60">
                                  795 Folsom Ave, Suite 600 <br />
                                  San Francisco, CA 94107 <br />
                                  United States
                                </p>
                              </div>
                            </Radio>
                          </Radio.Group>
                          <Link className="text-info hover:text-primary text-[13px] font-medium" href="#">
                            + Add New Address
                          </Link>
                        </article>
                      </div>
                      <div className="bg-regularBG dark:bg-whiteDark mb-[25px] p-[25px] rounded-[15px]">
                        <div>
                          <Heading
                            as="h5"
                            className="flex items-center justify-between mb-[25px] text-body dark:text-white/60 text-lg font-normal"
                          >
                            Payment Method
                          </Heading>
                        </div>
                        <Radio.Group style={{ width: '100%' }}>
                          <Radio value="ms" style={{ width: '100%' }} className="[&>.ant-radio]:self-start [&>.ant-radio]:top-1 [&>.ant-radio>.ant-radio-inner]:hover:border-primary [&>.ant-radio-checked>.ant-radio-inner]:bg-primary [&>.ant-radio-checked>.ant-radio-inner]:border-primary">
                            <div className="mb-2 text-[15px] font-medium">
                              <img src='/hexadash-nextjs/img/ms.svg' alt="" />
                              **** **** **** 2597
                            </div>
                          </Radio>
                        </Radio.Group>
                        <Link className="text-info hover:text-primary text-[13px] font-medium" href="#">
                          + Add New Card
                        </Link>
                      </div>
                      <div className="bg-regularBG dark:bg-whiteDark mb-[25px] p-[25px] rounded-[15px]">
                        <div className="border-b table-responsive table-bg-transparent table-head-none hover-tr-none table-td-border-none border-regular dark:border-white/10">
                          <Table pagination={false} dataSource={dataSource} columns={columns} />
                        </div>
                        <Row justify="end">
                          <Col xxl={8} xl={5} md={9} sm={14} xs={24} offset={!rtl ? 10 : 0}>
                            <div className="invoice-summary-inner">
                              <ul className="flex flex-col mt-5 mb-[10px]">
                                <li className="inline-flex justify-between">
                                  <span className="text-dark dark:text-white/[.87] text-[15px] font-medium">Subtotal :</span>
                                  <span className="text-dark dark:text-white/[.87] text-[15px] font-medium">{`$${subtotal}`}</span>
                                </li>
                                <li className="inline-flex justify-between">
                                  <span className="text-dark dark:text-white/[.87] text-[15px] font-medium">Discount :</span>
                                  <span className="text-dark dark:text-white/[.87] text-[15px] font-medium">{`$${-20}`}</span>
                                </li>
                                <li className="inline-flex justify-between">
                                  <span className="text-dark dark:text-white/[.87] text-[15px] font-medium">
                                    Shipping Charge :
                                  </span>
                                  <span className="text-dark dark:text-white/[.87] text-[15px] font-medium">{`$${30}`}</span>
                                </li>
                              </ul>
                              <Heading className="flex justify-between" as="h4">
                                <span className="text-base font-medium text-dark dark:text-white/[.87]">Total : </span>
                                <span className="text-lg font-semibold text-primary">{`$${subtotal + 30 - 20}`}</span>
                              </Heading>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </>
                </div>
              ) : (
                <Row justify="center" style={{ width: '100%' }}>
                  <Col xl={22} xs={24}>
                    <div className="checkout-successful 3xl:px-[30px]">
                      <Cards
                        headless
                        bodyStyle={{
                          borderRadius: '20px',
                        }}
                      >
                        <Cards headless>
                          <span className="icon-success">
                            <UilCheck />
                          </span>
                          <Heading as="h3">Payment Successful</Heading>
                          <p>Thank you! We have received your Payment</p>
                        </Cards>
                      </Cards>
                    </div>
                  </Col>
                </Row>
              ),
          },
        ]}
        onNext={next}
        onPrev={prev}
        onDone={done}
        isfinished={isFinished}
      />
    </div>
  );
}

export default CheckOut;
