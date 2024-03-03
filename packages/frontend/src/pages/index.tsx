import { Spin } from 'antd'
import dynamic from 'next/dynamic'

import DemoOne from './admin';
const SignIn = dynamic(() => import('../authentication/SignIn'), {
  loading: () => (
    <>
      <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
        <Spin />
      </div>
    </>
  ),
});

// Function to check if the user is logged in
const isUserLoggedIn = () => {
  const isLoggedIn = false; 

  return isLoggedIn;
}

const Home = () => {

  const isLoggedIn = isUserLoggedIn();

  return (
    isLoggedIn ? <DemoOne /> : <SignIn />
  );
}

export default Home;
