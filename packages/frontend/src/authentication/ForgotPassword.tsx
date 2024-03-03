import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, Input, Button, Row, Col } from 'antd';

function ForgotPassword() {
  const router = useRouter();
  const [state, setState] = useState({
    values: null,
  });
  const handleSubmit = (values:any) => {
    router.push('/admin')
    setState({ ...state, values });
  };

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <div className="mt-6 p-0 bg-white dark:bg-white/10 rounded-md shadow-regular dark:shadow-none">
          <Form name="forgotPass" onFinish={handleSubmit} layout="vertical">
            <div className="px-5 py-4 text-center border-b border-gray-200 dark:border-white/10">
              <h2 className="mb-0 text-xl font-semibold text-dark dark:text-white/[.87]">Forgot Password?</h2>
            </div>
            <div className="px-10 pt-8 pb-6">
              <p className="mb-4 dark:text-white/60">
                Enter the email address you used when you joined and we’ll send you instructions to reset your password.
              </p>
              <Form.Item
                label="Email Address"
                name="email"
                rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
              >
                <Input placeholder="name@example.com" />
              </Form.Item>
              <Form.Item>
                <Button
                  className="block w-full bg-primary h-12 p-0 text-sm font-medium"
                  htmlType="submit"
                  type="primary"
                  size="large"
                >
                  Send Reset Instructions
                </Button>
              </Form.Item>
            </div>
            <div className="p-6 text-center bg-section dark:bg-white/10 rounded-b-md">
              <p className="mb-0 text-sm font-medium text-body dark:text-white/60">
                Return to
                <Link href="/" className="ltr:ml-1.5 rtl:mr-1.5 text-info hover:text-primary">
                  Sign In
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

export default ForgotPassword;
