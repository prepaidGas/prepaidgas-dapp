import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Spin, Row, Col, Form, Input, Button } from 'antd';
import Heading from '@/components/heading';

const SettingsLayout = dynamic(() => import('./Layout'), {
  loading: () => (
    <div className="h-screen flex justify-center items-center">
      <Spin />
    </div>
  ),
});

interface FormValues {
  username: string;
  password: string;
}

function Password() {
  const [form] = Form.useForm();
  const [state, setState] = useState({
    values: null as FormValues | null,
  });

  const handleSubmit = (values:FormValues) => {
    setState({ ...state, values });
  };
  const handleCancel = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    form.resetFields();
  };

  return (
    <>
      <SettingsLayout>
        <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
          <div className="py-[18px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
            <Heading as="h4" className="mb-0 text-lg font-medium">
              Password Settings
            </Heading>
            <span className="mb-0.5 text-light dark:text-white/60 text-13 font-normal">
              Change or reset your account password
            </span>
          </div>
          <div className="p-[25px]">
            <>
              <Row justify="center">
                <Col xxl={12} sm={16} xs={24}>
                  <Form form={form} name="changePassword" onFinish={handleSubmit}>
                    <Form.Item name="old" label="Old Password" className="[&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:flex-1 mb-4 form-label-w-full form-label-text-start">
                      <Input className="text-body dark:text-white/60 h-11" />
                    </Form.Item>
                    <Form.Item name="new" label="New Password" className="[&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:flex-1 mb-0 form-label-w-full form-label-text-start">
                      <Input.Password className="text-body dark:text-white/60 h-11" />
                    </Form.Item>
                    <p className="mb-0 text-light dark:text-white/60 text-[13px]">Minimum 6 characters</p>
                    <Form.Item className="mb-7">
                      <div className="flex items-center flex-wrap gap-[15px] mt-11">
                        <Button htmlType="submit" type="primary" className="bg-primary hover:bg-primary-hbr text-white h-11 px-[20px]">
                          Change Password
                        </Button>
                        <Button
                          onClick={handleCancel}
                          className="h-11 px-5 bg-transparent hover:text-primary dark:text-white/[.87] border-[#d9d9d9] hover:border-primary dark:border-white/10 dark:hover:text-primary dark:hover:border-primary"
                        >
                          Cancel
                        </Button>
                      </div>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </>
          </div>
        </div>
      </SettingsLayout>
    </>
  );
}

export default Password;
