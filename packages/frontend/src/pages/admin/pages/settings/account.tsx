import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Spin, Row, Col, Form, Input } from 'antd';
import Heading from '@/components/heading';
import { Buttons } from '@/components/buttons';

const SettingsLayout = dynamic(() => import('./Layout'), {
  loading: () => (
    <div className="h-screen flex justify-center items-center">
      <Spin />
    </div>
  ),
});

interface FormValues {
  name: string,
  username: string;
  password: string;
}

function Account() {
  const [form] = Form.useForm();

  const [state, setState] = useState({
    name: 'clayton',
    values: null as FormValues | null,
  });

  const handleSubmit = (values:FormValues) => {
    setState({ ...state, values });
  };

  const handleCancel = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    form.resetFields();
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    // setState({ name: e.target.value });
  };

  return (
    <>
      <SettingsLayout>
        <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
          <div className="py-[18px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
            <Heading as="h4" className="mb-0 text-lg font-medium">
              Account Settings
            </Heading>
            <span className="mb-0.5 text-light dark:text-white/60 text-13 font-normal">
              Update your username and manage your account
            </span>
          </div>
          <div className="p-[25px] pb-[55px]">
            <Row>
              <Col xs={24}>
                <Form form={form} name="editAccount" onFinish={handleSubmit}>
                  <div className="mb-[26px] pb-[30px] border-b border-regular dark:border-white/10">
                    <Row justify="center">
                      <Col xxl={10} lg={16} md={18} xs={24}>
                        <div>
                          <Form.Item
                            name="username"
                            initialValue={state.name}
                            label="Username"
                            className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:flex-1 [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold"
                          >
                            <Input onChange={handleChange} className="text-body dark:text-white/60 h-11" />
                          </Form.Item>
                          <p className="mb-[14px] text-light dark:text-white/60">
                            Your Dashboard URL: http://hexadash.com/
                            <span className="text-dark dark:text-white/[.87]">{state.name}</span>
                          </p>
                          <Form.Item
                            name="email"
                            initialValue="contact@example.com"
                            rules={[{ type: 'email' }]}
                            label="Email"
                            className="mb-0 [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:flex-1 [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold"
                          >
                            <Input className="text-body dark:text-white/60 h-11" />
                          </Form.Item>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="account-form-bottom">
                    <Row justify="center">
                      <Col xxl={10} lg={16} md={18} xs={24}>
                        <div className="flex items-center flex-wrap justify-between gap-[15px]">
                          <div>
                            <Heading className="text-base font-semibold text-dark dark:text-white/[.87]" as="h4">
                              Close Account
                            </Heading>
                            <p className="mb-0 text-body dark:text-white/60">Delete Your Account and Account data</p>
                          </div>
                          <div className="">
                            <Buttons size="default" type="danger" className="bg-danger text-white h-[38px] px-4 text-sm font-semibold">
                              Close Account
                            </Buttons>
                          </div>
                        </div>
                        <div className="pt-[48px]">
                          <Buttons
                            size="default"
                            htmlType="submit"
                            type="primary"
                            className="bg-primary hover:bg-primary-hbr text-white h-[44px] px-5 text-sm font-semibold"
                          >
                            Save Change
                          </Buttons>
                          &nbsp; &nbsp;
                          <Buttons
                            size="default"
                            onClick={handleCancel}
                            type="light"
                            className="h-11 px-5 bg-transparent hover:text-primary dark:text-white/[.87] border-[#d9d9d9] hover:border-primary dark:border-white/10 dark:hover:text-primary dark:hover:border-primary"
                          >
                            Cancel
                          </Buttons>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </SettingsLayout>
    </>
  );
}

export default Account;
