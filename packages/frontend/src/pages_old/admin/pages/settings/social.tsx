import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import FontAwesome from 'react-fontawesome';
import { Spin, Row, Col, Form, Input } from 'antd';
import { Buttons } from '@/components/buttons';
import Heading from '@/components/heading';

const SettingsLayout = dynamic(() => import('./Layout'), {
  loading: () => (
    <div className="flex items-center justify-center h-screen">
      <Spin />
    </div>
  ),
});

interface FormValues {
  username: string;
  password: string;
}

function SocialProfile() {
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
              Social Profiles
            </Heading>
            <span className="mb-0.5 text-light dark:text-white/60 text-13 font-normal">
              Add elsewhere links to your profile
            </span>
          </div>
          <div className="p-[25px] pt-4">
            <>
              <Row justify="center">
                <Col xxl={12} sm={16} xs={24}>
                  <Form name="social" onFinish={handleSubmit}>
                    <Form.Item name="facebook" label="Facebook" className="[&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:flex-1 mb-4 form-label-w-full form-label-text-start">
                      <Input
                        className="ltr:pl-[45px] rtl:pr-[45px] text-body placeholder:text-body dark:text-white/60 font-normal border border-normal dark:border-white/10 shadow-none"
                        prefix={
                          <FontAwesome
                            className="absolute start-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center bg-facebook h-full w-[56px] text-[18px] text-white dark:text-white/[.87] rounded"
                            size="2x"
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                            name="facebook"
                          />
                        }
                        placeholder="URL"
                      />
                    </Form.Item>
                    <Form.Item name="twitter" label="Twitter" className="[&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:flex-1 mb-4 form-label-w-full form-label-text-start">
                      <Input
                        className="ltr:pl-[45px] rtl:pr-[45px] text-body placeholder:text-body dark:text-white/60 font-normal border border-normal shadow-none dark:border-white/10"
                        prefix={
                          <FontAwesome
                            className="absolute start-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center bg-twitter h-full w-[56px] text-[18px] text-white dark:text-white/[.87] rounded"
                            size="2x"
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                            name="twitter"
                          />
                        }
                        placeholder="@username"
                      />
                    </Form.Item>
                    <Form.Item name="dribbble" label="Dribbble" className="[&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:flex-1 mb-4 form-label-w-full form-label-text-start">
                      <Input
                        className="ltr:pl-[45px] rtl:pr-[45px] text-body placeholder:text-body dark:text-white/60 font-normal border border-normal shadow-none dark:border-white/10"
                        prefix={
                          <FontAwesome
                            className="absolute start-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center bg-dribbble h-full w-[56px] text-[18px] text-white dark:text-white/[.87] rounded"
                            size="2x"
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                            name="dribbble"
                          />
                        }
                        placeholder="URL"
                      />
                    </Form.Item>
                    <Form.Item name="instagram" label="Instagram" className="[&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:flex-1 mb-4 form-label-w-full form-label-text-start">
                      <Input
                        className="ltr:pl-[45px] rtl:pr-[45px] text-body placeholder:text-body dark:text-white/60 font-normal border border-normal shadow-none dark:border-white/10"
                        prefix={
                          <FontAwesome
                            className="absolute start-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center bg-instagram h-full w-[56px] text-[18px] text-white dark:text-white/[.87] rounded"
                            size="2x"
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                            name="instagram"
                          />
                        }
                        placeholder="URL"
                      />
                    </Form.Item>
                    <Form.Item name="github" label="GitHub" className="[&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:flex-1 mb-4 form-label-w-full form-label-text-start">
                      <Input
                        className="ltr:pl-[45px] rtl:pr-[45px] text-body placeholder:text-body dark:text-white/60 font-normal border border-normal shadow-none dark:border-white/10"
                        prefix={
                          <FontAwesome
                            className="absolute start-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center bg-github h-full w-[56px] text-[18px] text-white dark:text-white/[.87] rounded"
                            size="2x"
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                            name="github"
                          />
                        }
                        placeholder="Username"
                      />
                    </Form.Item>
                    <Form.Item name="Medium" label="Medium" className="[&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:flex-1 mb-0 form-label-w-full form-label-text-start">
                      <Input
                        className="ltr:pl-[45px] rtl:pr-[45px] text-body placeholder:text-body dark:text-white/60 font-normal border border-normal shadow-none dark:border-white/10"
                        prefix={
                          <FontAwesome
                            className="absolute start-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center bg-medium h-full w-[56px] text-[18px] text-white dark:text-white/[.87] rounded"
                            size="2x"
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                            name="medium"
                          />
                        }
                        placeholder="Url"
                      />
                    </Form.Item>
                    <div className="mt-[48px] mb-[30px] flex items-center flex-wrap gap-[15px]">
                      <Buttons size="default" htmlType="submit" type="primary" className="px-5 text-white bg-primary hover:bg-primary-hbr h-11">
                        Update Social Profile
                      </Buttons>
                      <Buttons
                        size="default"
                        onClick={handleCancel}
                        type="light"
                        className="h-11 px-5 bg-transparent hover:text-primary dark:text-white/[.87] border-[#d9d9d9] hover:border-primary dark:border-white/10 dark:hover:text-primary dark:hover:border-primary"
                      >
                        Cancel
                      </Buttons>
                    </div>
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

export default SocialProfile;
