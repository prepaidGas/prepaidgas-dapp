import { Spin } from 'antd'
import dynamic from 'next/dynamic'

const SignIn = dynamic(() => import('../authentication/SignIn'), {
  loading: () => (
    <>
      <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
        <Spin />
      </div>
    </>
  ),
});

const Login = () => {
  return (
    <SignIn />
  );
};

export default Login;
