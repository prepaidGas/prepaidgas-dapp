import { useState } from 'react';
import { Row, Col, Form, Input, Switch, DatePicker, Upload, message } from 'antd';
import {
  UilUser,
  UilEnvelope,
  UilMapMarker,
  UilLock,
  UilCreditCard,
  UilPhone
} from '@iconscout/react-unicons';
import Link from 'next/link';

import { Editor } from "@tinymce/tinymce-react";

import { Sliders } from '@/components/slider';
import { Tags } from '@/components/tags';
import DropDown from '@/components/dropdown';
import { Buttons } from '@/components/buttons';
import { PageHeaders } from '@/components/page-headers';

const { RangePicker } = DatePicker;
const { Dragger } = Upload;
function FormLayout({ onChange }:any) {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Form Components',
    },
  ];
  const [state, setState] = useState({
    onChangeValue: null as number | null,
    value: null as string | null,
  });

  const onSliderChange = (value: number) => {
    setState({ ...state, onChangeValue: value });
  };
  
  const onTextInput = (value: any) => {
    setState({ ...state, value });
    // Assuming onChange is a function that takes a string
    if (onChange) {
      onChange(value);
    }
  };

  const log = () => {};
  
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info:any) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Form Components"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <>
          <Row gutter={25}>
            <Col md={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative mb-[25px]">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Input Groups
                  </h1>
                </div>
                <div className="p-[25px]">
                  <Form name="hexadash_textarea" layout="vertical">
                    <Row gutter={30}>
                      <Col lg={12} xs={24} className="mb-25">
                        <Form.Item name="input-name">
                          <Input
                            className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60 [&>span>svg]:w-[20px] [&>.ant-input-prefix]:ltr:mr-[15px] rtl:ml-[15px] [&>span>svg]:h-[20px] [&>span>svg]:text-light"
                            prefix={<UilUser />}
                            placeholder="Name"
                          />
                        </Form.Item>
                      </Col>
                      <Col lg={12} xs={24} className="mb-25">
                        <Form.Item name="input-email">
                          <Input
                            className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60 [&>span>svg]:w-[20px] [&>.ant-input-prefix]:ltr:mr-[15px] rtl:ml-[15px] [&>span>svg]:h-[20px] [&>span>svg]:text-light"
                            prefix={<UilEnvelope />}
                            placeholder="Email"
                          />
                        </Form.Item>
                      </Col>
                      <Col lg={12} xs={24} className="mb-25">
                        <Form.Item name="input-location">
                          <Input
                            className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60 [&>span>svg]:w-[20px] [&>.ant-input-prefix]:ltr:mr-[15px] rtl:ml-[15px] [&>span>svg]:h-[20px] [&>span>svg]:text-light"
                            prefix={<UilMapMarker />}
                            placeholder="Location"
                          />
                        </Form.Item>
                      </Col>
                      <Col lg={12} xs={24} className="mb-25">
                        <Form.Item
                          className="[&>div>div>div>div>span>span>svg]:w-[20px] [&>div>div>div>div>span>.ant-input-prefix]:ltr:mr-[15px] rtl:ml-[15px] [&>div>div>div>div>span>span>svg]:h-[20px] [&>div>div>div>div>span>span>svg]:text-light [&>div>div>div>div>span>span>span>svg]:text-light-extra"
                          name="input-password"
                        >
                          <Input.Password prefix={<UilLock />} placeholder="Password" className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} xs={24} className="mb-25">
                        <Form.Item name="input-payment">
                          <Input
                            className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60 [&>span>svg]:w-[20px] [&>.ant-input-prefix]:ltr:mr-[15px] rtl:ml-[15px] [&>span>svg]:h-[20px] [&>span>svg]:text-light"
                            prefix={<UilCreditCard />}
                            placeholder="Payment Method"
                          />
                        </Form.Item>
                      </Col>
                      <Col lg={12} xs={24} className="mb-25">
                        <Form.Item name="input-phone">
                          <Input
                            className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60 [&>span>svg]:w-[20px] [&>.ant-input-prefix]:ltr:mr-[15px] rtl:ml-[15px] [&>span>svg]:h-[20px] [&>span>svg]:text-light"
                            prefix={<UilPhone />}
                            placeholder="Phone"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative mb-[25px]">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Dropdowns
                  </h1>
                </div>
                <div className="p-[25px] gap-[10px] flex flex-col">
                  <DropDown 
                    action={['hover']}
                    placement="bottomLeft"
                    content={
                      <div className="block bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.40)] py-1">
                        <Link className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active" href="/admin/features/form-components">
                          <span>Export to CSV</span>
                        </Link>
                        <Link className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active" href="/admin/features/form-components">
                          <span>Export to XML</span>
                        </Link>
                        <Link className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active" href="/admin/features/form-components">
                          <span>Export to Drive</span>
                        </Link>
                      </div>
                    }
                  >
                    <Buttons
                      className="text-start text-[14px] dark:bg-white/10 text-theme-gray dark:text-white/60 btn-outlined h-[50px] w-full border-normal dark:border-white/10 px-[19px] rounded-[5px]"
                      size="large"
                      outlined
                      type="light"
                    >
                      Alerts
                    </Buttons>
                  </DropDown>
                  <DropDown 
                    action={['hover']}
                    placement="bottomLeft"
                    content={
                      <div className="block bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.40)] py-1">
                        <Link className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active" href="/admin/features/form-components">
                          <span>Export to CSV</span>
                        </Link>
                        <Link className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active" href="/admin/features/form-components">
                          <span>Export to XML</span>
                        </Link>
                        <Link className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active" href="/admin/features/form-components">
                          <span>Export to Drive</span>
                        </Link>
                      </div>
                    }
                  >
                    <Buttons
                      className="text-start text-[14px] dark:bg-white/10 text-theme-gray dark:text-white/60 btn-outlined h-[50px] w-full border-normal dark:border-white/10 px-[19px] rounded-[5px]"
                      size="large"
                      outlined
                      type="light"
                    >
                      Select an option...
                    </Buttons>
                  </DropDown>
                </div>
              </div>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative mb-[25px]">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    DatePicker
                  </h1>
                </div>
                <div className="p-[25px]">
                  <Form name="datepicker-form" layout="vertical">
                    <Form.Item name="datePicker" label="Datepicker">
                      <DatePicker className="border-normal dark:border-white/10 h-[50px] min-w-[250px]" />
                    </Form.Item>
                    <Form.Item name="rangePicker" label="Date Range Picker">
                      <RangePicker className="border-normal dark:border-white/10 h-[50px] [&>.ant-picker-active-bar]:bg-primary" />
                    </Form.Item>
                  </Form>
                </div>
              </div>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative mb-[25px]">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Text Editor
                  </h1>
                </div>
                <div className="p-[25px] [&>div]:border-transparent dark:[&>div]:bg-[#323440] dark:[&>div>div:first-child]:border-white10 [&>div>div>div>div>button]:bg-transparent [&>div>div>div>div>button]:border-none  [&>div>div>div>div>button]:bg-gradient-to-r [&>div>div>div>div>button]:from-transparent [&>div>div>div>div>button]:to-transparent [&>div>div>div>span>select]:bg-white dark:[&>div>div>div>span>select]:bg-white/10 [&>.tox-tinymce>.tox-editor-container>.tox-statusbar]:hidden">
                  <Editor
                    initialValue=""
                    init={{
                      branding: false,
                      height: 400,
                      menubar: true,
                      image_advtab: true
                    }}
                    onChange={onTextInput}
                  />
                </div>
              </div>
            </Col>
            <Col md={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative mb-[25px]">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Tags
                  </h1>
                </div>
                <div className="p-[25px] [&>.ant-tag]:inline-flex [&>.ant-tag]:items-center [&>.ant-tag]:text-dark [&>.ant-tag]:dark:text-white/60 [&>.ant-tag]:bg-[#eff0f3] [&>.ant-tag]:dark:bg-whiteDark [&>.ant-tag]:dark:border-white/10 [&>.ant-tag>.anticon]:dark:text-white/60">
                  <Tags>Unremovable</Tags>
                  <Tags closable onClose={log}>
                    Tags 2
                  </Tags>
                  <Tags closable onClose={log}>
                    Tags 3
                  </Tags>
                </div>
              </div>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative mb-[25px]">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Toggle Buttons
                  </h1>
                </div>
                <div className="p-[25px]">
                  <Switch
                    defaultChecked
                    className="min-w-[35px] h-[18px] bg-[#e6e6e6] dark:bg-white/10 [&.ant-switch-checked]:bg-primary [&>.ant-switch-handle]:h-[14px]"
                  />
                </div>
              </div>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative mb-[25px]">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Sliders
                  </h1>
                </div>
                <div className="p-[25px]">
                  <Sliders onChange={onSliderChange} defaultValue={30} />
                  <Sliders onChange={onSliderChange} range defaultValues={[20, 50]} />
                </div>
              </div>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative mb-[25px]">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Dropzone
                  </h1>
                </div>
                <div className="p-[25px]">
                  <Dragger
                    {...props}
                    className="[&>.ant-upload]:min-h-[190px] [&>.ant-upload]:flex [&>.ant-upload]:items-center [&>.ant-upload]:mb-[25px] [&>.ant-upload]:rounded-10 [&>.ant-upload]:text-light-extra [&>.ant-upload]:dark:text-white/60 [&>.ant-upload]:hover:border-primary"
                  >
                    <p className="ant-upload-text">Drop files here to upload</p>
                  </Dragger>
                  <Dragger
                    {...props}
                    className="[&>.ant-upload]:min-h-[110px] [&>.ant-upload]:flex [&>.ant-upload]:items-center [&>.ant-upload]:rounded-10 [&>.ant-upload]:text-light-extra [&>.ant-upload]:dark:text-white/60 [&>.ant-upload]:hover:border-primary"
                  >
                    <p className="ant-upload-text">Drop files here to upload</p>
                  </Dragger>
                </div>
              </div>
            </Col>
          </Row>
        </>
      </main>
    </>
  );
}

export default FormLayout;
