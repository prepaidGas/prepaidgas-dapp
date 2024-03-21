import { Row, Col, Form, Input } from 'antd';

function GridForm() {
  return (
    <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative h-full">
      <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
        <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
          Form group and grid
        </h1>
      </div>
      <div className="p-[25px]">
        <Form name="sDash_grid-form" layout="horizontal">
          <Row gutter={30}>
            <Col md={8} xs={24} className="mb-25">
              <Form.Item name="grid-3-1">
                <Input placeholder="One of Three Columns" className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60" />
              </Form.Item>
            </Col>
            <Col md={8} xs={24} className="mb-25">
              <Form.Item name="grid-3-2">
                <Input placeholder="One of Three Columns" className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60" />
              </Form.Item>
            </Col>
            <Col md={8} xs={24} className="mb-25">
              <Form.Item name="grid-3-3">
                <Input placeholder="One of Three Columns" className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col md={6} xs={24} className="mb-25">
              <Form.Item name="grid-4-1">
                <Input placeholder="One of Four Columns" className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60" />
              </Form.Item>
            </Col>
            <Col md={6} xs={24} className="mb-25">
              <Form.Item name="grid-4-2">
                <Input placeholder="One of Four Columns" className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60" />
              </Form.Item>
            </Col>
            <Col md={6} xs={24} className="mb-25">
              <Form.Item name="grid-4-3">
                <Input placeholder="One of Four Columns" className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60" />
              </Form.Item>
            </Col>
            <Col md={6} xs={24} className="mb-25">
              <Form.Item name="grid-4-4">
                <Input placeholder="One of Four Columns" className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col md={12} xs={24} className="mb-25">
              <Form.Item name="grid-2-1">
                <Input placeholder="One of Two Columns" className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60" />
              </Form.Item>
            </Col>
            <Col md={12} xs={24} className="mb-25">
              <Form.Item name="grid-2-2">
                <Input placeholder="One of Two Columns" className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default GridForm;
