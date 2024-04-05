import { useState } from 'react';
import Link from 'next/link';
import { Row, Col, Form, Input, Upload, Select } from 'antd';
import { UilCamera } from '@iconscout/react-unicons';
import { Buttons } from '@/components/buttons';
import Heading from '@/components/heading';

const { Option } = Select;
function Info() {
  const [state, setState] = useState({
    values: '',
  });
  const [form] = Form.useForm();
  const handleSubmit = (values:string) => {
    setState({ ...state, values });
  };

  return (
    <Row justify="center">
      <Col xxl={10} xl={14} md={16} xs={24}>
        <Form style={{ width: '100%' }} form={form} name="info" onFinish={handleSubmit}>
          <Heading className="text-[18px] font-medium mb-[36px] text-dark dark:text-white/[.87]" as="h4">
            Personal Information
          </Heading>

          <figure className="relative max-w-[260px] mb-[30px] flex items-center gap-[20px]">
            <img className="rounded-full" src='/hexadash-nextjs/img/avatar/profileImage.png' alt="" />
            <figcaption>
              <Upload className="[&>.ant-upload-select]:inline-flex [&>.ant-upload-select]:items-center [&>.ant-upload-select]:justify-center [&>.ant-upload-select]:w-[40px] [&>.ant-upload-select]:h-[40px] [&>.ant-upload-select]:rounded-full [&>.ant-upload-select]:absolute ltr:[&>.ant-upload-select]:left-[85px] rtl:[&>.ant-upload-select]:right-[85px] [&>.ant-upload-select]:bottom-[5px] [&>.ant-upload-select]:z-[10] [&>.ant-upload-select]:bg-white dark:[&>.ant-upload-select]:bg-white/10 [&>.ant-upload-select>.ant-upload]:text-white dark:[&>.ant-upload-select>.ant-upload]:text-white/[.87] [&>.ant-upload-select>.ant-upload]:inline-flex [&>.ant-upload-select>.ant-upload]:items-center [&>.ant-upload-select>.ant-upload]:justify-content-center [&>.ant-upload-select>.ant-upload]:w-[32px] [&>.ant-upload-select>.ant-upload]:h-[32px] [&>.ant-upload-select>.ant-upload]:rounded-full [&>.ant-upload-select>.ant-upload]:justify-center [&>.ant-upload-select>.ant-upload]:z-[1] [&>.ant-upload-select>.ant-upload]:bg-primary [&>.ant-upload-select>.ant-upload>a]:flex [&>.ant-upload-select>.ant-upload>a]:items-center [&>.ant-upload-select>.ant-upload>a]:justify-center [&>.ant-upload-select>.ant-upload>a>svg]:text-white dark:[&>.ant-upload-select>.ant-upload>a]:text-white/10">
                <Link href="#">
                  <UilCamera />
                </Link>
              </Upload>
              <div className="">
                <Heading as="h4">Profile Photo</Heading>
              </div>
            </figcaption>
          </figure>

          <Form.Item
            className="mb-4 form-label-w-full form-label-text-start dark:text-white-60 [&>div]:flex-col text-dark dark:text-white/[.87] font-medium [&>div>div>label]:!text-dark dark:[&>div>div>label]:!text-white/[.87]"
            label="Name"
            name="name"
          >
            <Input className="rounded-6" placeholder="Input Name" />
          </Form.Item>

          <Form.Item
            className="mb-4 form-label-w-full form-label-text-start dark:text-white-60 [&>div]:flex-col text-dark dark:text-white/[.87] font-medium [&>div>div>label]:!text-dark dark:[&>div>div>label]:!text-white/[.87]"
            label="Email Address"
            name="email"
            rules={[{ message: 'Please input your email!', type: 'email' }]}
          >
            <Input className="rounded-6" placeholder="name@example.com" />
          </Form.Item>

          <Form.Item
            className="mb-4 form-label-w-full form-label-text-start dark:text-white-60 [&>div]:flex-col text-dark dark:text-white/[.87] font-medium [&>div>div>label]:!text-dark dark:[&>div>div>label]:!text-white/[.87]"
            name="phone"
            label="Phone Number"
          >
            <Input className="rounded-6" placeholder="+440 2546 5236" />
          </Form.Item>

          <Form.Item
            className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>div>.ant-select-selector]:h-[50px] [&>.ant-form-item-row>div>div>div>div>div>.ant-select-selection-item]:leading-[50px] [&>.ant-form-item-row>div>div>div>div>div>.ant-select-selection-item]:text-body dark:[&>.ant-form-item-row>div>div>div>div>div>.ant-select-selection-item]:text-white/60 dark:text-white/60 [&>.ant-form-item-row>div>div>div>div>.ant-select-selector]:border-normal dark:[&>.ant-form-item-row>div>div>div>div>.ant-select-selector]:border-white/10 [&>.ant-form-item-row>div>div>div>div>.ant-select-selector]:rounded-md"
            name="country"
            initialValue=""
            label="Country"
          >
            <Select style={{ width: '100%' }}>
              <Option value="">Please Select</Option>
              <Option value="bangladesh">Bangladesh</Option>
              <Option value="india">India</Option>
              <Option value="pakistan">Pakistan</Option>
            </Select>
          </Form.Item>

          <Form.Item
            className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>div>.ant-select-selector]:h-[50px] [&>.ant-form-item-row>div>div>div>div>div>.ant-select-selection-item]:leading-[50px] [&>.ant-form-item-row>div>div>div>div>div>.ant-select-selection-item]:text-body dark:[&>.ant-form-item-row>div>div>div>div>div>.ant-select-selection-item]:text-white/60 dark:text-white/60 [&>.ant-form-item-row>div>div>div>div>.ant-select-selector]:border-normal dark:[&>.ant-form-item-row>div>div>div>div>.ant-select-selector]:border-white/10 [&>.ant-form-item-row>div>div>div>div>.ant-select-selector]:rounded-md"
            initialValue=""
            name="city"
            label="City"
          >
            <Select style={{ width: '100%' }}>
              <Option value="">Please Select</Option>
              <Option value="dhaka">Dhaka</Option>
              <Option value="khulna">Khulna</Option>
              <Option value="barisal">Barisal</Option>
            </Select>
          </Form.Item>

          <Form.Item
            className="mb-4 form-label-w-full form-label-text-start dark:text-white-60 [&>div]:flex-col text-dark dark:text-white/[.87] font-medium [&>div>div>label]:!text-dark dark:[&>div>div>label]:!text-white/[.87]"
            name="website"
            label="Website"
          >
            <Input className="rounded-6" placeholder="www.example.com" />
          </Form.Item>

          <Form.Item>
            <div className="flex items-center min-md:justify-end justify-center mt-[15px]">
              <Buttons
                className="bg-regularBG dark:bg-regularBGdark h-[38px] ltr:mr-[20px] rtl:ml-[20px] px-[22px] text-[15px] text-body dark:text-white/60 hover:text-light font-normal border-regular dark:border-white/10"
                onClick={() => {
                  return form.resetFields();
                }}
              >
                Reset
              </Buttons>
              <Buttons
                htmlType="submit"
                type="primary"
                className="bg-primary hover:bg-primary-hbr h-[38px] px-[22px] text-[15px] text-white dark:text-white/[.87] font-normal border-primary"
              >
                <Link href="/admin/users/add-user/work">Save & Next</Link>
              </Buttons>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default Info;
