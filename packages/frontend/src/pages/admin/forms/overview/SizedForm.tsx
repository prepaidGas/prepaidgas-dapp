import { Row, Col, Form, Input } from 'antd';

function SizedForm() {
  return (
    <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative  h-full">
      <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
        <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
          Sizes
        </h1>
      </div>
      <div className="p-[25px]">
        <Form name="sDash_sized-form" layout="horizontal">
          <Row gutter={30}>
            <Col xs={24}>
              <Form.Item name="size-large" label="Large Input">
                <Input size="large" placeholder="size='large'" className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60" />
              </Form.Item>
              <Form.Item name="size-default" className="small-input" label="Default Input">
                <Input placeholder="size='Default'" className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60" />
              </Form.Item>
              <Form.Item className="mb-25" name="size-small" label="Small Input">
                <Input size="small" placeholder="size='Small'" className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default SizedForm;
