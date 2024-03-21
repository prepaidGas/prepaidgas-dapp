import { Spin } from 'antd';
import dynamic from 'next/dynamic';
import Single from './overview/MailDetailView';

const EmailLayout = dynamic(() => import('./Layout'), {
  loading: () => (
    <div className="h-screen flex justify-center items-center">
      <Spin />
    </div>
  ),
});

function EmailDetails() {

  return (
    <EmailLayout>
      <Single />
    </EmailLayout>
  );
}

export default EmailDetails;
