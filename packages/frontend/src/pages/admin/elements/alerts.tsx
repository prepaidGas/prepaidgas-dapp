import { Row, Col } from 'antd';
import { 
  UilQuestionCircle, 
  UilCheckCircle, 
  UilFileTimes 
} from '@iconscout/react-unicons';
import AlertText from '@/components/alerts';
import { PageHeaders } from '@/components/page-headers';


function Alerts() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Alerts',
    },
  ];
  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Alerts"
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <>
        <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
          <Row gutter={25}>
            <Col md={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Basic
                  </h1>
                </div>
                <div className="p-[25px]">
                  <div className="alert-empty-message">
                    <AlertText message="" description="Success Text" type="success" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Closable
                  </h1>
                </div>
                <div className="gap-y-[15px] inline-flex flex-col w-full p-[25px]">
                  <div className="alert-empty-message">
                    <AlertText
                      closable
                      message=""
                      description="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
                      type="warning"
                    />
                  </div>
                  <AlertText
                    closable
                    message="Error Text"
                    description="Error Text Error Text Warning TextW Error Text Error Text Error TextError Text"
                    type="error"
                  />
                </div>
              </div>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Icon
                  </h1>
                </div>
                <div className="gap-y-[15px] inline-flex flex-col w-full p-[25px]">
                  <div className="alert-empty-message gap-y-[15px] inline-flex flex-col w-full">
                    <AlertText showIcon icon={<UilQuestionCircle className="w-[16px] he-[16px]" />} message="" description="Success Tips" type="success" />
                    <AlertText showIcon icon={<UilQuestionCircle className="w-[16px] he-[16px]" />} message="" description="Informational Notes" type="info" />
                    <AlertText showIcon icon={<UilQuestionCircle className="w-[16px] he-[16px]" />} message="" description="Warning" type="warning" />
                    <AlertText showIcon icon={<UilQuestionCircle className="w-[16px] he-[16px]" />} message="" description="Error" type="error" />
                  </div>
                  <AlertText
                    showIcon
                    icon={<UilCheckCircle />}
                    message="Success Tips"
                    description="Detailed description and advice about successful copywriting."
                    type="success"
                  />
                  <AlertText
                    showIcon
                    icon={<UilQuestionCircle />}
                    message="Informational Notes"
                    description="Additional description and information about copywriting."
                    type="info"
                  />
                  <AlertText
                    showIcon
                    icon={<UilQuestionCircle />}
                    message="Warning"
                    description="This is a warning notice about copywriting."
                    type="warning"
                  />
                  <AlertText
                    showIcon
                    icon={<UilFileTimes />}
                    message="Error"
                    description="This is an error message about copywriting."
                    type="error"
                  />
                </div>
              </div>
            </Col>
            <Col md={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    More Types
                  </h1>
                </div>
                <div className="p-[25px]">
                  <div className="alert-empty-message gap-y-[15px] inline-flex flex-col w-full">
                    <AlertText message="" description="Success Text" type="success" />
                    <AlertText message="" description="Info Text" type="info" />
                    <AlertText message="" description="Warning Text" type="warning" />
                    <AlertText message="" description="Error Text" type="error" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Description
                  </h1>
                </div>
                <div className="gap-y-[15px] inline-flex flex-col w-full p-[25px]">
                  <AlertText
                    message="Success Text"
                    description="Success Description Success Description Success Description"
                    type="success"
                  />
                  <AlertText
                    message="Info Text"
                    description="Info Description Info Description Info Description Info Description"
                    type="info"
                  />
                  <AlertText
                    message="Warning Text"
                    description="Warning Description Warning Description Warning Description Warning Description"
                    type="warning"
                  />
                  <AlertText
                    message="Error Text"
                    description="Error Description Error Description Error Description Error Description"
                    type="error"
                  />
                </div>
              </div>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Customized Close Text
                  </h1>
                </div>
                <div className="p-[25px]">
                  <div className="alert-empty-message">
                    <AlertText closeText="Close Now" closable message="" description="Info Text" type="info" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Smoothly Unmount
                  </h1>
                </div>
                <div className="p-[25px]">
                  <div className="alert-empty-message">
                    <AlertText closable message="" description="AlertText Message Text" type="success" />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </main>
      </>
    </>
  );
}

export default Alerts;
