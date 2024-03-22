import React, { useState } from 'react';
import {
  UilExport,
  UilTrashAlt,
  UilDollarAlt,
  UilPercentage
} from '@iconscout/react-unicons';
import { Row, Col, Form, Input, Select, InputNumber, Radio, Upload, message } from 'antd';
import { Buttons } from '@/components/buttons';
import Heading from '@/components/heading';

const { Option } = Select;
const { Dragger }:any = Upload;

function CreateProduct() {
  const [form] = Form.useForm();
  const [state, setState] = useState({
    file: null,
    list: null,
    submitValues: {},
  });

  const fileList = [
    {
      uid: '1',
      name: '1.png',
      status: 'done',
      url: '/hexadash-nextjs/img/products/1.png',
      thumbUrl: '/hexadash-nextjs/img/products/1.png',
    },
  ];

  const fileUploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info:any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        setState({ ...state, file: info.file, list: info.fileList });
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    listType: 'picture',
    defaultFileList: fileList,
    showUploadList: {
      showRemoveIcon: true,
      removeIcon: <UilTrashAlt />,
    },
  };

  const handleSubmit = (values:any) => {
    setState({ ...state, submitValues: values });
  };

  return (
    <>
      <Form style={{ width: '100%' }} form={form} name="addProduct" onFinish={handleSubmit}>
        <div className="bg-regularBG dark:bg-regularBGdark min-sm:mt-10 min-sm:mb-[30px] min-sm:p-[30px] min-sm:border border-regularBG dark:border-white/10 rounded-[20px] md:mx-[15px] sm:mx-0 mb-[30px]">
          <Row gutter={15}>
            <Col xs={24}>
              <div className="bg-white dark:bg-[#1b1d2a] min-sm:shadow-[0_10px_30px_rgba(116,116,116,0.06)] rounded-[20px]">
                <div className="rounded-ts-[20px] rounded-te-[20px]">
                  <Heading
                    as="h2"
                    className="px-[40px] xs:px-[30px] pt-[26px] pb-[25px] text-dark dark:text-white/[.87] text-[18px] font-semibold border-b border-regular dark:border-white/10"
                  >
                    About Product
                  </Heading>
                  <div className="px-[40px] xs:px-[30px] pt-[26px] pb-[40px]">
                    <Form.Item
                      name="name"
                      label="Product Name"
                      className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>.ant-col]:flex-auto [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10  dark:[&>.ant-form-item-row>div>div>div>input]:text-white/[.87] [&>.ant-form-item-row>div>div>div>input]:rounded-md"
                    >
                      <Input className="h-12 p-3" />
                    </Form.Item>
                    <Form.Item
                      name="subtext"
                      label="Sub Text"
                      className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>.ant-col]:flex-auto [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10  dark:[&>.ant-form-item-row>div>div>div>input]:text-white/[.87] [&>.ant-form-item-row>div>div>div>input]:rounded-md"
                    >
                      <Input className="h-12 p-3" />
                    </Form.Item>
                    <Form.Item
                      name="category"
                      initialValue=""
                      label="Category"
                      className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>.ant-col]:flex-auto [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>div>.ant-select-selector]:h-[50px] [&>.ant-form-item-row>div>div>div>div>div>.ant-select-selection-item]:leading-[50px] [&>.ant-form-item-row>div>div>div>div>div>.ant-select-selection-item]:text-body dark:[&>.ant-form-item-row>div>div>div>div>div>.ant-select-selection-item]:text-white/60 dark:text-white/60 [&>.ant-form-item-row>div>div>div>div>.ant-select-selector]:border-normal dark:[&>.ant-form-item-row>div>div>div>div>.ant-select-selector]:border-white/10 [&>.ant-form-item-row>div>div>div>div>.ant-select-selector]:rounded-md"
                    >
                      <Select style={{ width: '100%' }} className="h-11">
                        <Option value="">Please Select</Option>
                        <Option value="wearingClothes">Wearing Clothes</Option>
                        <Option value="sunglasses">Sunglasses</Option>
                        <Option value="t-shirt">T-Shirt</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="price"
                      label="Price"
                      className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>.ant-col]:flex-auto [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold"
                    >
                      <div className="relative">
                        <span className="absolute ltr:left-[1px] rtl:right-[1px] top-[1px] flex items-center justify-center bg-regularBG dark:bg-regularBGdark h-[48px] px-5 ltr:border-r rtl:border-l border-normal dark:border-white/10 rounded-tl rounded-bl z-10">
                          <UilDollarAlt className="w-4 h-4 text-body dark:text-white/60" />
                        </span>
                        <InputNumber className="w-full h-[50px] ltr:pl-[60px] rtl:pr-[60px] border-normal dark:border-white/10 rounded-6 [&>div>input]:h-[48px] dark:[&>div>input]:text-white/[.87] dark:bg-white/10" />
                      </div>
                    </Form.Item>
                    <Form.Item
                      name="discount"
                      label="Discount"
                      className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>.ant-col]:flex-auto [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold "
                    >
                      <div className="relative">
                        <span className="absolute ltr:left-[1px] rtl:right-[1px] top-[1px] flex items-center justify-center bg-regularBG dark:bg-regularBGdark h-[48px] px-5 ltr:border-r rtl:border-l border-normal dark:border-white/10 rounded-tl rounded-bl z-10">
                          <UilPercentage className="w-4 h-4 text-body dark:text-white/60" />
                        </span>
                        <InputNumber className="w-full h-[50px] ltr:pl-[60px] rtl:pr-[60px] border-normal dark:border-white/10 rounded-6 [&>div>input]:h-[48px] dark:bg-white/10 dark:[&>div>input]:text-white/[.87]" />
                      </div>
                    </Form.Item>
                    <Form.Item
                      name="status"
                      label="Status"
                      className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>.ant-col]:flex-auto [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10  dark:[&>.ant-form-item-row>div>div>div>input]:text-white/[.87] [&>.ant-form-item-row>div>div>div>input]:rounded-md"
                    >
                      <Radio.Group>
                        <Radio value="published">Published</Radio>
                        <Radio value="draft">Draft</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      name="description"
                      label="Product Description"
                      className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>.ant-col]:flex-auto [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10  dark:[&>.ant-form-item-row>div>div>div>input]:text-white/[.87] [&>.ant-form-item-row>div>div>div>input]:rounded-md dark:[&>.ant-form-item-row>div>div>div>textarea]:border-white/10"
                    >
                      <Input.TextArea rows={5} className="p-3" />
                    </Form.Item>
                    <Form.Item
                      name="mTitle"
                      label="Meta Title"
                      className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>.ant-col]:flex-auto [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10  dark:[&>.ant-form-item-row>div>div>div>input]:text-white/[.87] [&>.ant-form-item-row>div>div>div>input]:rounded-md"
                    >
                      <Input className="h-12 p-3" />
                    </Form.Item>
                    <Form.Item
                      name="mKeyword"
                      label="Meta Keyword"
                      className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>.ant-col]:flex-auto [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10  dark:[&>.ant-form-item-row>div>div>div>input]:text-white/[.87] [&>.ant-form-item-row>div>div>div>input]:rounded-md"
                    >
                      <Input className="h-12 p-3" />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="bg-regularBG dark:bg-regularBGdark min-sm:mt-10 min-sm:mb-[30px] min-sm:p-[30px] min-sm:border border-regularBG dark:border-white/10 rounded-[20px] md:mx-[15px] sm:mx-0">
          <Row gutter={15}>
            <Col xs={24}>
              <div className="bg-white dark:bg-[#1b1d2a] min-sm:shadow-[0_10px_30px_rgba(116,116,116,0.06)] rounded-[20px]">
                <div className="rounded-tl-[20px] rounded-tr-[20px]">
                  <Heading
                    as="h2"
                    className="px-[40px] xs:px-[30px] pt-[26px] pb-[25px] text-dark dark:text-white/[.87] text-[18px] font-semibold border-b border-regular dark:border-white/10"
                  >
                    Product Image
                  </Heading>
                  <div className="px-[40px] xs:px-[30px] pt-[26px] pb-[40px] xs:pb-[30px] [&>span>div>div>.ant-upload-list-item]:mt-[35px] [&>span>div>div>.ant-upload-list-item]:h-full [&>span>div>div>.ant-upload-list-item]:p-0 [&>span>div>div>.ant-upload-list-item]:border-none [&>span>div>div>div>div>span>.ant-upload-list-item-thumbnail>img]:w-full [&>span>div>div>div>div>span>.ant-upload-list-item-thumbnail>img]:h-full [&>span>div>div>div>div>span>.ant-upload-list-item-thumbnail>img]:max-w-[100px] [&>span>div>div>div>div>span>.ant-upload-list-item-thumbnail>img]:rounded-[6px] [&>span>div>div>div>.ant-upload-list-item-name]:px-[10px] [&>span>div>div>div>.ant-upload-list-item-name]:text-dark dark:[&>span>div>div>div>.ant-upload-list-item-name]:text-white/[.87] [&>span>div>div>div>.ant-upload-list-item-name]:font-semibold [&>span>div>div>div>span>button>span>svg]:w-[15px] [&>span>div>div>div>span>button>span>svg]:text-danger [&>span>div>div>div>span>button>span>:bg-transparent [&>span>div>div>div>span>button>span>:border-transparent">
                    <Dragger
                      {...fileUploadProps}
                      className="[&>.ant-upload-drag]:flex [&>.ant-upload-drag]:items-center [&>.ant-upload-drag]:justify-center [&>.ant-upload-drag]:min-h-[100px] [&>.ant-upload-drag]:bg-regularBG [&>.ant-upload-drag]:dark:bg-regularBGdark [&>.ant-upload-drag]:p-[100px] [&>.ant-upload-drag]:ssm:px-[50px] [&>.ant-upload-drag]:sm:px-[30px] [&>.ant-upload-drag]:border-[2px] [&>.ant-upload-drag]:border-spacing-[6px] [&>.ant-upload-drag]:rounded-[10px] [&>.ant-upload-drag]:dark:border-white/10 [&>.ant-upload-drag]:hover:border-primary"
                    >
                      <p className="flex justify-center mb-[20px]">
                        <UilExport className="text-light-extra dark:text-white/60" />
                      </p>
                      <Heading
                        as="h4"
                        className="text-[15px] text-[#9299b8] dark:text-white/60 font-medium mb-2"
                      >
                        Drag and drop an image
                      </Heading>
                      <p className="text-[15px] text-body dark:text-white/60 font-medium">
                        or <span className="text-secondary">Browse</span> to choose a file
                      </p>
                    </Dragger>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="mt-[40px] text-end md:mx-[15px]">
          <Form.Item>
            <Buttons
              className="bg-regularBG dark:bg-regularBGdark h-[50px] ltr:mr-[20px] rtl:ml-[20px] px-[22px] text-[15px] text-body dark:text-white/60 hover:text-light font-normal border-regular dark:border-white/10"
              size="large"
              onClick={() => {
                return form.resetFields();
              }}
            >
              Cancel
            </Buttons>
            <Buttons
              className="bg-primary hover:bg-primary-hbr h-[50px] px-[22px] text-[15px] text-white dark:text-white/[.87] font-normal border-primary"
              size="large"
              htmlType="submit"
              type="primary"
              raised
            >
              Save Product
            </Buttons>
          </Form.Item>
        </div>
      </Form>
    </>
  );
}

export default CreateProduct;
