import { Spin } from 'antd'
import dynamic from 'next/dynamic'

const SignUp = dynamic(() => import('../authentication/SignUp'), {
  loading: () => (
    <>
      <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
        <Spin />
      </div>
    </>
  ),
});

const Register = () => {
  return (
    <SignUp />
  );
};

export default Register;
