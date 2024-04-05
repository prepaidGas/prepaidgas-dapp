import { useState } from 'react';
import dayjs from 'dayjs';
import { Row, Col, TimePicker, Button } from 'antd';
import { PageHeaders } from '@/components/page-headers';

const format = 'HH:mm';
function TimePickers() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Time Picker',
    },
  ];
  const [state, setState] = useState({ open: false });

  const handleOpenChange = (open:boolean) => {
    setState({ open });
  };

  const handleClose = () => setState({ open: false });

  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Time Picker"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
          <Col sm={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Basics
                </h1>
              </div>
              <div className="p-[25px] [&>div>div>span]:text-theme-gray [&>div]:min-w-[250px] [&>div>div>input]:border-normal">
                <TimePicker
                  className="dark:[&>div>input]:text-white/60 dark:[&>div>.ant-picker-suffix]:text-white/60"
                  defaultValue={dayjs('00:00:00', 'HH:mm:ss')}
                />
              </div>
            </div>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Interval option
                </h1>
              </div>
              <div className="p-[25px] [&>div>div>span]:text-theme-gray [&>div]:min-w-[250px] [&>div>div>input]:border-normal">
                <TimePicker
                  className="dark:[&>div>input]:text-white/60 dark:[&>div>.ant-picker-suffix]:text-white/60"
                  minuteStep={15}
                  secondStep={10}
                />
              </div>
            </div>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Three size
                </h1>
              </div>
              <div className="timepicker-list p-[25px] [&>div>div>span]:text-theme-gray [&>div]:min-w-[250px] [&>div>div>input]:border-normal dark:[&>div>div>input]:border-white/10 flex flex-wrap gap-[15px]">
                <TimePicker
                  className="dark:[&>div>input]:text-white/60 dark:[&>div>.ant-picker-suffix]:text-white/60 me-[10px]"
                  defaultValue={dayjs('12:08:23', 'HH:mm:ss')}
                  size="large"
                />
                <TimePicker
                  className="dark:[&>div>input]:text-white/60 dark:[&>div>.ant-picker-suffix]:text-white/60 me-[10px]"
                  defaultValue={dayjs('12:08:23', 'HH:mm:ss')}
                />
                <TimePicker
                  className="dark:[&>div>input]:text-white/60 dark:[&>div>.ant-picker-suffix]:text-white/60"
                  defaultValue={dayjs('12:08:23', 'HH:mm:ss')}
                  size="small"
                />
              </div>
            </div>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Addon
                </h1>
              </div>
              <div className="p-[25px] [&>div>div>span]:text-theme-gray [&>div]:min-w-[250px] [&>div>div>input]:border-normal">
                <TimePicker
                  className="dark:[&>div>input]:text-white/60 dark:[&>div>.ant-picker-suffix]:text-white/60"
                  open={state.open}
                  onOpenChange={handleOpenChange}
                  renderExtraFooter={() => (
                    <Button size="small" type="primary" onClick={handleClose}>
                      Ok
                    </Button>
                  )}
                />
              </div>
            </div>
          </Col>
          <Col sm={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Disabled
                </h1>
              </div>
              <div className="p-[25px] [&>div>div>span]:text-theme-gray [&>div]:min-w-[250px] [&>div>div>input]:border-normal">
                <TimePicker
                  className="dark:[&>div>input]:text-white/60 dark:[&>div>.ant-picker-suffix]:text-white/60"
                  defaultValue={dayjs('12:08:23', 'HH:mm:ss')}
                  disabled
                />
              </div>
            </div>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  12 Hours
                </h1>
              </div>
              <div className="timepicker-list p-[25px] [&>div>div>span]:text-theme-gray [&>div]:min-w-[250px] [&>div>div>input]:border-normal dark:[&>div>div>input]:border-white/10 flex flex-wrap gap-[15px]">
                <TimePicker
                  className="dark:[&>div>input]:text-white/60 dark:[&>div>.ant-picker-suffix]:text-white/60 me-[10px]"
                  use12Hours
                />
                <TimePicker
                  className="dark:[&>div>input]:text-white/60 dark:[&>div>.ant-picker-suffix]:text-white/60 me-[10px]"
                  use12Hours
                  format="h:mm:ss A"
                />
                <TimePicker
                  className="dark:[&>div>input]:text-white/60 dark:[&>div>.ant-picker-suffix]:text-white/60"
                  use12Hours
                  format="h:mm a"
                />
              </div>
            </div>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Hours And Minute
                </h1>
              </div>
              <div className="p-[25px] [&>div>div>span]:text-theme-gray dark:[&>div>div>span]:text-white/60 [&>div]:min-w-[250px] [&>div>div>input]:border-normal dark:[&>div>div>input]:border-white/10">
                <TimePicker
                  className="dark:[&>div>input]:text-white/60 dark:[&>div>.ant-picker-suffix]:text-white/60"
                  defaultValue={dayjs('12:08', format)}
                  format={format}
                />
              </div>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default TimePickers;
