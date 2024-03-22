import React, { useState, useEffect } from 'react';
import { Buttons } from '@/components/buttons';
import { CheckboxGroup } from '@/components/checkbox';
import { Modals } from '@/components/modals/antd-modals';
import { Form, Input, Select, Col, Row, DatePicker } from 'antd';

const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';

interface CreateProjectProps {
  visible: boolean;
  onCancel: () => void;
}

const CreateProject: React.FC<CreateProjectProps> = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  const [state, setState] = useState({
    visible,
    modalType: 'primary',
    checked: [] as any[], 
  });

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setState((prevState) => ({
        ...prevState,
        visible,
      }));
    }
    return () => {
      unmounted = true;
    };
  }, [visible]);

  const handleOk = () => {
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  const options = [
    {
      label: 'Private',
      value: 'private',
    },
    {
      label: 'Team',
      value: 'team',
    },
    {
      label: 'Public',
      value: 'public',
    },
  ];

  return (
    <Modals
      className="update"
      type={state.modalType}
      title="Create Project"
      visible={state.visible}
      footer={[
        <div key="1" className="flex items-center flex-wrap gap-[10px] text-start px-[15px] py-[10px]">
          <Buttons
            size="default"
            type="primary"
            key="submit"
            className="px-5 font-medium text-white h-11 bg-primary hover:bg-primary-hbr"
            onClick={handleOk}
          >
            Add New Project
          </Buttons>
          <Buttons
            size="default"
            type="white"
            key="back"
            className="m-0 px-5 font-medium h-11 text-body dark:text-white/[.87] hover:text-primary dark:bg-white/10 border-normal dark:border-white/10 hover:border-primary"
            outlined
            onClick={handleCancel}
          >
            Cancel
          </Buttons>
        </div>,
      ]}
      onCancel={handleCancel}
    >
      <div className="px-1.5">
        <Form form={form} name="createProject" onFinish={handleOk}>
          <Form.Item
            name="project"
            label=""
            className="mb-[26px] [&>.ant-form-item-row>div]:flex-auto [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white/60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
          >
            <Input placeholder="Project Name" className="h-12 p-3 dark:placeholder-white/60" />
          </Form.Item>
          <Form.Item 
            name="category" 
            initialValue="" 
            label=""
            className="[&>.ant-form-item-row>div]:flex-auto"
          >
            <Select
              className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:h-12 [&>div]:rounded-md [&>.ant-select-arrow]:text-theme-gray [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center [&>div>.ant-select-selection-item]:text-[#bfbfbf] dark:[&>div>.ant-select-selection-item]:text-white/60 h-[48px]"
              style={{ width: '100%' }}
            >
              <Option value="">Project Category</Option>
              <Option value="one">Project One</Option>
              <Option value="two">Project Two</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label=""
            className="mb-[26px] [&>.ant-form-item-row>div]:flex-auto [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10  dark:[&>.ant-form-item-row>div>div>div>input]:text-white/[.87] [&>.ant-form-item-row>div>div>div>input]:rounded-md dark:[&>.ant-form-item-row>div>div>div>textarea]:border-white/10"
          >
            <Input.TextArea rows={4} placeholder="Project Description" className="p-3 hover:border-primary dark:placeholder-white/60" />
          </Form.Item>
          <Form.Item
            name="privacy"
            initialValue={['team']}
            label="Project Privacy"
            className="mb-[26px] [&>.ant-form-item-row>div]:flex-auto [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10  dark:[&>.ant-form-item-row>div>div>div>input]:text-white/[.87] [&>.ant-form-item-row>div>div>div>input]:rounded-md"
          >
            <CheckboxGroup options={options} className="[&>.ant-checkbox-wrapper>.ant-checkbox>.ant-checkbox-inner]:hover:border-primary [&>.ant-checkbox-wrapper-checked>.ant-checkbox>.ant-checkbox-inner]:bg-primary [&>.ant-checkbox-wrapper-checked>.ant-checkbox>.ant-checkbox-inner]:border-primary" />
          </Form.Item>
          <Form.Item
            name="members"
            label="Project Members"
            className="mb-[26px] [&>.ant-form-item-row>div]:flex-auto [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white/60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 [&>.ant-form-item-row>div>div>div>input]:rounded-md [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div>label]:text-white/[.87]"
          >
            <Input placeholder="Search Members" className="h-12 p-3 dark:placeholder-white/60" />
          </Form.Item>
          <div className="flex items-center flex-wrap gap-3 mb-[30px]">
            <img
              className="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
              src='/hexadash-nextjs/img/users/1.png'
              alt=""
            />
            <img
              className="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
              src='/hexadash-nextjs/img/users/2.png'
              alt=""
            />
            <img
              className="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
              src='/hexadash-nextjs/img/users/3.png'
              alt=""
            />
            <img
              className="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
              src='/hexadash-nextjs/img/users/4.png'
              alt=""
            />
            <img
              className="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
              src='/hexadash-nextjs/img/users/5.png'
              alt=""
            />
          </div>
          <Row gutter={15}>
            <Col md={12} xs={24}>
              <Form.Item
                name="start"
                label="Start Date"
                className="mb-1.5 [&>.ant-form-item-row>div]:flex-auto [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white/60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 [&>.ant-form-item-row>div>div>div>input]:rounded-md [&>.ant-form-item-row>div>div>div>.ant-picker]:w-full"
              >
                <DatePicker
                  className="h-10 dark:bg-white/10 hover:border-primary dark:border-white/10 dark:[&>div>.ant-picker-suffix]:text-white/60"
                  placeholder="mm/dd/yyyy"
                  format={dateFormat}
                />
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item
                name="end"
                label="End Date"
                className="mb-1.5 [&>.ant-form-item-row>div]:flex-auto [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white/60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 [&>.ant-form-item-row>div>div>div>input]:rounded-md [&>.ant-form-item-row>div>div>div>.ant-picker]:w-full"
              >
                <DatePicker
                  className="h-10 dark:bg-white/10 hover:border-primary dark:border-white/10 dark:[&>div>.ant-picker-suffix]:text-white/60"
                  placeholder="mm/dd/yyyy"
                  format={dateFormat}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modals>
  );
}

export default CreateProject;
