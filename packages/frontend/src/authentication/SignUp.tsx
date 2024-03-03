import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactSVG } from 'react-svg';
import { Row, Col, Form, Input, Button } from 'antd';
import {
  UilFacebook,
  UilTwitter,
  UilGithub,
 } from '@iconscout/react-unicons';

import { useDispatch } from 'react-redux';
import { CheckBox } from '@/components/checkbox';
import { registerAction } from '@/redux/authentication/actionCreator';


import { useAuth } from './AuthContext'

function SignUp() {

  const [error, setError] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const { signup } = useAuth()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleSignup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if(data.password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }
    try {
      await signup(data.email, data.password, data.name)
      // @ts-ignore
      dispatch(registerAction(() => router.push('/admin')));
    } catch (err) {
      console.log(err)
      setError("Failed to SignUp!");
    }
  }

  const [state, setState] = useState({
    checked: false,
  });

  const onChange = (checked:boolean) => {
    setState({ ...state, checked });
  };

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <div className="mt-6 bg-white rounded-md dark:bg-white/10 shadow-regular dark:shadow-none">
          <div className="px-5 py-4 text-center border-b border-gray-200 dark:border-white/10">
            <h2 className="mb-0 text-xl font-semibold text-dark dark:text-white/[.87]">Sign Up HexaDash</h2>
          </div>
          <div className="px-10 pt-8 pb-6">
            <Form name="register" onFinish={handleSignup} layout="vertical">
              <Form.Item
                label="Name"
                name="name"
                className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white/60 [&>div>div>label]:font-medium"
                rules={[{ required: true, message: 'Please input your Full name!' }]}
              >
                <Input 
                  placeholder="Full name" 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setData({
                      ...data,
                      name: e.target.value,
                    })
                  }
                  value={data.name}
                  className="h-12 p-3 hover:border-primary focus:border-primary rounded-4"
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email Address"
                className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white/60 [&>div>div>label]:font-medium"
                rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
              >
                <Input 
                  placeholder="name@example.com"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setData({
                      ...data,
                      email: e.target.value,
                    })
                  }
                  value={data.email}
                  className="h-12 p-3 hover:border-primary focus:border-primary rounded-4"
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white/60 [&>div>div>label]:font-medium"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password 
                  placeholder="Password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setData({
                      ...data,
                      password: e.target.value,
                    })
                  }
                  value={data.password} 
                  className="h-12 p-3 hover:border-primary focus:border-primary rounded-4"
                />
              </Form.Item>
              <div className="flex items-center justify-between">
                <CheckBox onChange={onChange} checked={state.checked}>
                  Creating an account means you’re okay with our Terms of Service and Privacy Policy
                </CheckBox>
              </div>
              <Form.Item>
                <Button
                  className="w-full bg-primary text-white h-12 p-0 my-6 text-sm font-medium"
                  htmlType="submit"
                  type="primary"
                  size="large"
                  disabled={!state.checked}
                >
                  Create Account
                </Button>
              </Form.Item>
              {error && <p className="text-danger mb-10 text-center text-base">{error}</p>}
              <p className="relative text-body dark:text-white/60 -mt-2.5 mb-6 text-center text-13 font-medium before:absolute before:w-full before:h-px ltr:before:left-0 rtl:before:right-0 before:top-1/2 before:-translate-y-1/2 before:z-10 before:bg-gray-200 dark:before:bg-white/10">
                <span className="relative z-20 px-4 bg-white dark:bg-[#1b1d2a]">Or</span>
              </p>
              <ul className="flex items-center justify-center mb-0">
                <li className="px-1.5 pt-3 pb-2.5">
                  <Link
                    href="#"
                    className="flex items-center justify-center h-12 px-4 rounded-md google-social bg-google-plus-transparent hover:bg-google-plus text-google-plus hover:text-white"
                  >
                    <ReactSVG
                      className="[&>div>svg>path]:fill-google-plus group-hover:[&>div>svg>path]:fill-white"
                      src='/hexadash-nextjs/img/icon/google-plus.svg'
                    />
                  </Link>
                </li>
                <li className="px-1.5 pt-3 pb-2.5">
                  <Link
                    href="#"
                    className="flex items-center justify-center h-12 px-4 rounded-md facebook-social bg-facebook-transparent hover:bg-facebook text-facebook hover:text-white"
                  >
                    <UilFacebook />
                  </Link>
                </li>
                <li className="px-1.5 pt-3 pb-2.5">
                  <Link
                    href="#"
                    className="flex items-center justify-center h-12 px-4 rounded-md twitter-social bg-twitter-transparent hover:bg-twitter text-twitter hover:text-white"
                  >
                    <UilTwitter />
                  </Link>
                </li>
                <li className="px-1.5 pt-3 pb-2.5">
                  <Link
                    href="#"
                    className="flex items-center justify-center h-12 px-4 rounded-md github-social bg-github-transparent hover:bg-github text-github hover:text-white"
                  >
                    <UilGithub />
                  </Link>
                </li>
              </ul>
            </Form>
          </div>
          <div className="p-6 text-center bg-gray-100 dark:bg-white/10 rounded-b-md">
            <p className="mb-0 text-sm font-medium text-body dark:text-white/60">
              Already have an account?
              <Link href="/" className="ltr:ml-1.5 rtl:mr-1.5 text-info hover:text-primary">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default SignUp;
