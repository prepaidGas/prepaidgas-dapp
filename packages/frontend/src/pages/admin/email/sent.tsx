import React from 'react';
import { Spin } from 'antd';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import Content from './overview/Content';

const EmailLayout = dynamic(() => import('./Layout'), {
  loading: () => (
    <div className="h-screen flex justify-center items-center">
      <Spin />
    </div>
  ),
});

interface RootState {
  headerSearchData: string;
  email: {
    type: string;
    allMessage: string[];
  };
}

function Sent() {
  const { searchData, email } = useSelector((state:RootState) => {
    return {
      searchData: state.headerSearchData,
      email: state.email.allMessage,
    };
  });

  return (
    <EmailLayout>
      <Content
        email={email.filter((value:any) => {
          return value.type === 'sent';
        })}
        searchData={searchData}
      />
    </EmailLayout>
  );
}

export default Sent;
