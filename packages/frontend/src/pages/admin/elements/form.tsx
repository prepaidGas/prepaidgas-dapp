/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { UilPlus } from '@iconscout/react-unicons';
import { Row, Col, Form, Select, Input, InputNumber } from 'antd';
import { Buttons } from '@/components/buttons';
import { CasCader } from '@/components/cascader';
import { PageHeaders } from '@/components/page-headers';
import { Cards } from '@/components/cards/frame/cards-frame';
import { ShareButtonPageHeader } from '@/components/buttons/share-button';
import { ExportButtonPageHeader } from '@/components/buttons/export-button';
import { CalendarButtonPageHeader } from '@/components/buttons/calendar-button';

const { Option } = Select;
const { TextArea } = Input;

function Forms() {
  const [form] = Form.useForm();
  const [state, setstate] = useState({
    values: {},
    cascaderItem: [],
  });
  const handleSubmit = (values:string) => {
    setstate({ ...state, values });
  };

  const onChangeCascader = (value:any) => {
    setstate({ ...state, cascaderItem: value });
  };

  return (
    <>
      <PageHeaders
        ghost
        title="Form"
        buttons={[
          <div key="1" className="flex items-center">
            <CalendarButtonPageHeader />
            <ExportButtonPageHeader />
            <ShareButtonPageHeader />
            <Buttons size="small" type="primary" className="text-[14px] font-medium border-none leading-[22px] dark:bg-white/10 text-theme-gray dark:text-white/60 dark:focus:text-dark dark:hover:text-dark inline-flex items-center justify-center rounded-[4px] px-[20px] h-[34px] gap-[8px]">
              <UilPlus />
              Add New
            </Buttons>
          </div>,
        ]}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
          <Col md={12} sm={24} xs={24}>
            <Cards title="Elements of Form" caption="The simplest use of Form">
              <>
                <Form layout="vertical" form={form} name="basicforms" onFinish={handleSubmit}>
                  <Form.Item label="Username" name="username">
                    <Input placeholder="Username" />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    label="Age"
                    name="age"
                    rules={[{ required: true, message: 'Please input your age!', type: 'number' }]}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Form.Item label="Website" name="website">
                    <Input placeholder="http://website.com" />
                  </Form.Item>
                  <Form.Item label="Textarea" name="textarea">
                    <TextArea />
                  </Form.Item>
                  <div className="form-item">
                    <label className="me-2">Cascades</label>
                    <CasCader onChange={onChangeCascader} defaultValue={['zhejiang', 'hangzhou', 'xihu']} />
                  </div>

                  <Form.Item label="Select" name="Select">
                    <Select
                      showSearch
                      placeholder="Please Slelect"
                      optionFilterProp="children"
                      filterOption={(input:any, option:any) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="">Please Select</Option>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Buttons htmlType="submit" size="default" type="primary">
                      Submit
                    </Buttons>
                  </Form.Item>
                </Form>
              </>
            </Cards>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default Forms;
