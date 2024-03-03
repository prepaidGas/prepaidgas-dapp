import { Row, Col, message, Space } from 'antd';
import { Buttons } from '@/components/buttons';
import { PageHeaders } from '@/components/page-headers';

function Messages() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Message',
    },
  ];
  const info = () => {
    message.info('This is a normal message');
  };

  const success = () => {
    message.success('This is a success message');
  };

  const error = () => {
    message.error('This is an error message');
  };

  const warning = () => {
    message.warning('This is a warning message');
  };

  const customSuccess = () => {
    message.success('This is a prompt message for success, and it will disappear in 10 seconds', 10);
  };

  const loadingSuccess = () => {
    const hide = message.loading('Action in progress..', 0);
    // Dismiss manually and asynchronously
    setTimeout(hide, 2500);
  };

  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Message"
        routes={PageRoutes}
      />
      <>
        <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
          <Row gutter={25}>
            <Col md={12} sm={24} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Basic
                  </h1>
                </div>
                <div className="p-[25px]">
                  <div className="flex flex-wrap gap-x-[10px] gap-y-[10px]">
                    <Buttons
                      className=" bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
                      type="primary"
                      size="large"
                      raised
                      onClick={info}
                    >
                      Display normal message
                    </Buttons>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={12} sm={24} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Customize
                  </h1>
                </div>
                <div className="p-[25px]">
                  <Buttons
                    className="btn-outlined  hover:bg-gray-hbr border-solid border-1 dark:bg-transparent border-theme-gray text-theme-gray dark:text-white/60 dark:focus:text-white/60 hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] "
                    type="light"
                    outlined
                    size="large"
                    onClick={customSuccess}
                  >
                    Customized display duration
                  </Buttons>
                </div>
              </div>
            </Col>
            <Col md={12} sm={24} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Other types of message
                  </h1>
                </div>
                <div className="p-[25px]">
                  <Space>
                    <div className="message-button-list flex flex-wrap gap-x-[10px] gap-y-[10px]">
                      <Buttons
                        className="btn-outlined  bg-success hover:bg-success-hbr border-solid border-1 border-success text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] dark:focus:text-dark inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
                        type="light"
                        outlined
                        size="large"
                        onClick={success}
                      >
                        Success
                      </Buttons>
                      <Buttons
                        className="btn-outlined  bg-danger hover:bg-danger-hbr border-solid border-1 border-danger text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
                        type="light"
                        outlined
                        size="large"
                        onClick={error}
                      >
                        Error
                      </Buttons>
                      <Buttons
                        className="btn-outlined  bg-warning hover:bg-warning-hbr border-solid border-1 border-warning text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
                        type="light"
                        outlined
                        size="large"
                        onClick={warning}
                      >
                        Warning
                      </Buttons>
                    </div>
                  </Space>
                </div>
              </div>
            </Col>
            <Col md={12} sm={24} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Loading
                  </h1>
                </div>
                <div className="p-[25px]">
                  <Buttons
                    className="btn-outlined  hover:bg-gray-hbr border-solid border-1 dark:bg-transparent border-theme-gray text-theme-gray dark:text-white/60 hover:text-white text-[14px] font-semibold dark:focus:text-white/60 leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
                    type="light"
                    outlined
                    size="large"
                    onClick={loadingSuccess}
                  >
                    Display a loading indicator
                  </Buttons>
                </div>
              </div>
            </Col>
          </Row>
        </main>
      </>
    </>
  );
}

export default Messages;
