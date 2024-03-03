import { Spin } from 'antd'
import dynamic from 'next/dynamic'

const ForgotPassword = dynamic(() => import('../authentication/ForgotPassword'), {
  loading: () => (
    <>
      <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
        <Spin />
      </div>
    </>
  ),
});

const Forgot = () => {
  return (
    <ForgotPassword />
  );
};

export default Forgot;
