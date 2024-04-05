import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Spin, Row, Col, Form, Input, Select } from 'antd';
import { Tags } from '@/components/tags';
import Heading from '@/components/heading';
import { Buttons } from '@/components/buttons';

const SettingsLayout = dynamic(() => import('./Layout'), {
  loading: () => (
    <div className="flex items-center justify-center h-screen">
      <Spin />
    </div>
  ),
});

const { Option } = Select;

interface FormValues {
  username: string;
  password: string;
  tags: string[];
}

function Profile() {
  const [form] = Form.useForm();

  const [state, setState] = useState({
    tags: ['UI/UX', 'Branding', 'Product Design', 'Web Design'],
    values: null as FormValues | null,
  });

  const handleSubmit = (values:FormValues) => {
    setState({ ...state, values: { ...values, tags: state.tags } });
  };

  const handleCancel = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    form.resetFields();
  };

  const checked = (checked:string[]) => {
    // setState({ tags: checked });
  };

  return (
    <>
      <SettingsLayout>
        <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
          <div className="py-[18px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
            <Heading as="h4" className="mb-0 text-lg font-medium">
              Edit Profile
            </Heading>
            <span className="mb-0.5 text-light dark:text-white/60 text-13 font-normal">
              Set Up Your Personal Information
            </span>
          </div>
          <div className="p-[25px]">
            <Row justify="center">
              <Col xxl={12} lg={16} xs={24}>
                <Form className="pt-2.5 pb-[30px]" name="editProfile" onFinish={handleSubmit}>
                  <Form.Item
                    name="name"
                    initialValue="Duran Clayton"
                    label="Name"
                    className="mb-4 form-label-w-full form-label-text-start dark:text-white-60 [&>.ant-row]:flex-col [&>.ant-row>.ant-form-item-control]:flex-1"
                  >
                    <Input className="px-5 py-3" />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    initialValue="0096644553"
                    label="Phone Number"
                    className="mb-4 form-label-w-full form-label-text-start [&>.ant-row]:flex-col [&>.ant-row>.ant-form-item-control]:flex-1"
                  >
                    <Input className="px-5 py-3" />
                  </Form.Item>
                  <Form.Item
                    name="country"
                    initialValue=""
                    label="Country"
                    className="mb-4 form-label-w-full form-label-text-start [&>.ant-row]:flex-col [&>.ant-row>.ant-form-item-control]:flex-1"
                  >
                    <Select className="[&>.ant-select-selector]:flex [&>.ant-select-selector]:items-center [&>.ant-select-selector]:w-full [&>.ant-select-selector]:h-10 [&>.ant-select-selector]:text-white/60 [&>.ant-select-selector]:px-5 h-[40px]">
                      <Option value="">Please Select</Option>
                      <Option value="bangladesh">Bangladesh</Option>
                      <Option value="india">India</Option>
                      <Option value="pakistan">Pakistan</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="city"
                    initialValue=""
                    label="City"
                    className="mb-4 form-label-w-full form-label-text-start [&>.ant-row]:flex-col [&>.ant-row>.ant-form-item-control]:flex-1"
                  >
                    <Select className="[&>.ant-select-selector]:flex [&>.ant-select-selector]:items-center [&>.ant-select-selector]:w-full [&>.ant-select-selector]:h-10 [&>.ant-select-selector]:text-white/60 [&>.ant-select-selector]:px-5 h-[40px]">
                      <Option value="">Please Select</Option>
                      <Option value="dhaka">Dhaka</Option>
                      <Option value="mymensingh">Mymensingh</Option>
                      <Option value="khulna">Khulna</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="company"
                    initialValue="Example"
                    label="Company Name"
                    className="mb-4 form-label-w-full form-label-text-start [&>.ant-row]:flex-col [&>.ant-row>.ant-form-item-control]:flex-1"
                  >
                    <Input className="px-5 py-3" />
                  </Form.Item>
                  <Form.Item
                    name="website"
                    initialValue="www.example.com"
                    label="Website"
                    className="mb-4 form-label-w-full form-label-text-start [&>.ant-row]:flex-col [&>.ant-row>.ant-form-item-control]:flex-1"
                  >
                    <Input className="px-5 py-3" />
                  </Form.Item>
                  <Form.Item
                    name="userBio"
                    initialValue="Nam malesuada dolor tellus pretium amet was hendrerit facilisi id vitae enim sed ornare there suspendisse sed orci neque ac sed aliquet risus faucibus in pretium molestee."
                    label="User Bio"
                    className="mb-4 form-label-w-full form-label-text-start [&>.ant-row]:flex-col [&>.ant-row>.ant-form-item-control]:flex-1"
                  >
                    <Input.TextArea rows={3} className="px-5 py-3" />
                  </Form.Item>
                  <Form.Item name="skills" label="Skills" className="mb-4 form-label-w-full form-label-text-start [&>.ant-row]:flex-col [&>.ant-row>.ant-form-item-control]:flex-1">
                    <div className="p-3 border border-gray-200 dark:border-white/10 rounded-md [&>div>div>span>.ant-tag]:inline-flex [&>div>div>span>.ant-tag]:items-center [&>.ant-row]:flex-col [&>.ant-row>.ant-form-item-control]:flex-1">
                      <Tags className="bg-primary" animate onChange={(checked) => console.log(checked)} data={state.tags} />
                    </div>
                  </Form.Item>
                  <div className="mt-11">
                    <Buttons size="default" htmlType="submit" type="primary" className="bg-primary hover:bg-primary-hbr text-white h-11 px-[20px] font-semibold">
                      Update Profile
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
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </SettingsLayout>
    </>
  );
}

export default Profile;
