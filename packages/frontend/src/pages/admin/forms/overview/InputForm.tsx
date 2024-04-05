import { Row, Col, Form, Input, DatePicker, TimePicker } from 'antd';
import moment from 'moment';

function InputForm() {
  return (
    <>
      <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative">
        <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-normal dark:border-white/10 border-b">
          <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
            Basic Cards
          </h1>
        </div>
        <div className="p-[25px]">
          <Form name="input-form" layout="horizontal">
            <Row align="middle">
              <Col md={6} xs={24}>
                <label className="font-medium mb-[24px] block dark:text-white/60" htmlFor="input-text">
                  Text
                </label>
              </Col>
              <Col md={18} xs={24}>
                <Form.Item name="input-text">
                  <Input placeholder="Duran Clayton" className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60" />
                </Form.Item>
              </Col>
            </Row>
            <Row align="middle">
              <Col md={6} xs={24}>
                <label className="font-medium mb-[24px] block dark:text-white/60" htmlFor="email">
                  Email Address
                </label>
              </Col>
              <Col md={18} xs={24}>
                <Form.Item name="input-email">
                  <Input placeholder="username@email.com" className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60" />
                </Form.Item>
              </Col>
            </Row>
            <Row align="middle">
              <Col md={6} xs={24}>
                <label className="font-medium mb-[24px] block dark:text-white/60" htmlFor="input-url">
                  URL
                </label>
              </Col>
              <Col md={18} xs={24}>
                <Form.Item name="input-url">
                  <Input placeholder="https://hexadash-react-admin-dashboard-template" className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60" />
                </Form.Item>
              </Col>
            </Row>
            <Row align="middle">
              <Col md={6} xs={24}>
                <label className="font-medium mb-[24px] block dark:text-white/60" htmlFor="input-phone">
                  Phone
                </label>
              </Col>
              <Col md={18} xs={24}>
                <Form.Item name="input-phone">
                  <Input placeholder="0123456789" className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60" />
                </Form.Item>
              </Col>
            </Row>
            <Row align="middle">
              <Col md={6} xs={24}>
                <label className="font-medium mb-[24px] block dark:text-white/60" htmlFor="pass">
                  Password
                </label>
              </Col>
              <Col md={18} xs={24}>
                <Form.Item name="input-pass">
                  <Input.Password placeholder="Enter Password" className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60" />
                </Form.Item>
              </Col>
            </Row>
            <Row align="middle">
              <Col md={6} xs={24}>
                <label className="font-medium mb-[24px] block dark:text-white/60" htmlFor="input-number">
                  Number
                </label>
              </Col>
              <Col md={18} xs={24}>
                <Form.Item name="input-number">
                  <Input placeholder="123" className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60" />
                </Form.Item>
              </Col>
            </Row>
            <Row align="middle">
              <Col md={6} xs={24}>
                <label className="font-medium mb-[24px] block dark:text-white/60" htmlFor="input-date">
                  Date
                </label>
              </Col>
              <Col md={18} xs={24}>
                <Form.Item name="input-date">
                  <DatePicker className="w-full h-[48px] border-normal dark:border-whiteDark hover:border-primary focus:border-primary" />
                </Form.Item>
              </Col>
            </Row>
            <Row align="middle">
              <Col md={6} xs={24}>
                <label className="font-medium mb-[24px] block dark:text-white/60" htmlFor="input-month">
                  Month
                </label>
              </Col>
              <Col md={18} xs={24}>
                <Form.Item name="input-month">
                  <DatePicker className="w-full h-[48px] border-normal dark:border-whiteDark hover:border-primary focus:border-primary" picker="month" />
                </Form.Item>
              </Col>
            </Row>
            <Row align="middle">
              <Col md={6} xs={24}>
                <label className="font-medium mb-[24px] block dark:text-white/60" htmlFor="input-time">
                  Time
                </label>
              </Col>
              <Col md={18} xs={24}>
                <Form.Item name="input-time" initialValue={moment('00:00:00', 'HH:mm:ss')}>
                  <TimePicker className="w-full h-[48px] border-normal dark:border-whiteDark hover:border-primary focus:border-primary" />
                </Form.Item>
              </Col>
            </Row>
            <Row align="middle">
              <Col md={6} xs={24}>
                <label className="font-medium mb-[24px] block dark:text-white/60" htmlFor="input-color">
                  Color
                </label>
              </Col>
              <Col md={18} xs={24}>
                <Form.Item name="input-color">
                  <div className="sDash_color-picker">
                    <Input className="h-[48px] border-normal dark:border-whiteDark hover:border-primary focus:border-primary" type="color" value="#8231D3" />
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
}

export default InputForm;
