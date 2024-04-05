import { Row, Col, Radio } from 'antd';
import { PageHeaders } from '@/components/page-headers';

function Radios() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Radio',
    },
  ];
  
  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Radio"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
          <Col lg={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Basic
                </h1>
              </div>
              <div className="p-[25px]">
                <Radio>Radio</Radio>
              </div>
            </div>

            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Radio Disabled
                </h1>
              </div>
              <div className="p-[25px]">
                <Radio.Group defaultValue="b">
                  <div className="ant-radio-vertical">
                    <Radio value="a" disabled>
                      Disabled
                    </Radio>
                    <Radio value="b" disabled>
                      Disabled
                    </Radio>
                  </div>
                </Radio.Group>
              </div>
            </div>

            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Vertical Radio
                </h1>
              </div>
              <div className="p-[25px]">
                <Radio.Group>
                  <div className="ant-radio-vertical">
                    <Radio value={1}>A</Radio>
                    <Radio value={2}>B</Radio>
                    <Radio value={3}>C</Radio>
                    <Radio value={4}>D</Radio>
                  </div>
                </Radio.Group>
              </div>
            </div>
          </Col>

          <Col lg={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Radio Style
                </h1>
              </div>
              <div className="radio-size-wrap p-[25px]">
                <Radio.Group defaultValue="a" className="flex overflow-auto">
                  <Radio.Button
                    className="inline-flex items-center justify-center px-[20px] h-[44px] dark:border-white/10  checked:border-primary focus:outline-none shadow-none"
                    value="a"
                  >
                    Hangzhou
                  </Radio.Button>
                  <Radio.Button
                    className=" inline-flex items-center justify-center px-[20px] h-[44px] dark:border-white/10 before:bg-regular dark:before:bg-white/10 text-[14px] checked:border-primary focus:outline-none shadow-none"
                    value="b"
                  >
                    Shanghai
                  </Radio.Button>
                  <Radio.Button
                    className=" inline-flex items-center justify-center px-[20px] h-[44px] dark:border-white/10 before:bg-regular dark:before:bg-white/10 checked:border-primary focus:outline-none shadow-none"
                    value="c"
                  >
                    Beijing
                  </Radio.Button>
                  <Radio.Button
                    className="inline-flex items-center justify-center px-[20px] h-[44px] dark:border-white/10 before:bg-regular dark:before:bg-white/10 checked:border-primary focus:outline-none shadow-none"
                    value="d"
                  >
                    Chengdu
                  </Radio.Button>
                </Radio.Group>
                <div style={{ marginTop: 16 }}>
                  <Radio.Group defaultValue="a" className="flex overflow-auto">
                    <Radio.Button
                      className="inline-flex items-center justify-center px-[20px] h-[44px] dark:border-white/10 checked:border-primary focus:outline-none shadow-none"
                      value="a"
                    >
                      Hangzhou
                    </Radio.Button>
                    <Radio.Button
                      className="inline-flex items-center justify-center px-[20px] h-[44px] dark:border-white/10 text-[14px] before:bg-regular dark:before:bg-white/10 checked:border-primary focus:outline-none shadow-none"
                      value="b"
                      disabled
                    >
                      Shanghai
                    </Radio.Button>
                    <Radio.Button
                      className="inline-flex items-center justify-center px-[20px] h-[44px] dark:border-white/10 before:bg-regular dark:before:bg-white/10 checked:border-primary focus:outline-none shadow-none"
                      value="c"
                    >
                      Beijing
                    </Radio.Button>
                    <Radio.Button
                      className="inline-flex items-center justify-center px-[20px] h-[44px] dark:border-white/10 before:bg-regular dark:before:bg-white/10 checked:border-primary focus:outline-none shadow-none"
                      value="d"
                    >
                      Chengdu
                    </Radio.Button>
                  </Radio.Group>
                </div>
                <div style={{ marginTop: 16 }}>
                  <Radio.Group disabled className="flex overflow-auto">
                    <Radio.Button
                      className="inline-flex items-center justify-center px-[20px] h-[44px] opacity-40"
                      value="a"
                    >
                      Hangzhou
                    </Radio.Button>
                    <Radio.Button
                      className="inline-flex items-center justify-center px-[20px] h-[44px] opacity-40"
                      value="b"
                    >
                      Shanghai
                    </Radio.Button>
                    <Radio.Button
                      className="inline-flex items-center justify-center px-[20px] h-[44px] opacity-40"
                      value="c"
                    >
                      Beijing
                    </Radio.Button>
                    <Radio.Button
                      className="inline-flex items-center justify-center px-[20px] h-[44px] opacity-40"
                      value="d"
                    >
                      Chengdu
                    </Radio.Button>
                  </Radio.Group>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10  border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Radio Style
                </h1>
              </div>
              <div className="p-[25px]">
                <Radio.Group>
                  <Radio value={1}>A</Radio>
                  <Radio value={2}>B</Radio>
                  <Radio value={3}>C</Radio>
                  <Radio value={4}>D</Radio>
                </Radio.Group>
              </div>
            </div>
          </Col>
          <Col md={12} xs={24}>
            <div className="radio-size-wrap">
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10  border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Horizontal Radio
                  </h1>
                </div>
                <div className="p-[25px]">
                  <div>
                    <Radio.Group defaultValue="a" size="large">
                      <Radio.Button
                        className="shadow-none dark:border-white/10 checked:border-primary focus:outline-none"
                        value="a"
                      >
                        Hangzhou
                      </Radio.Button>
                      <Radio.Button
                        className="shadow-none dark:border-white/10 before:bg-regular dark:before:bg-white/10 checked:border-primary focus:outline-none"
                        value="b"
                      >
                        Shanghai
                      </Radio.Button>
                      <Radio.Button
                        className="shadow-none dark:border-white/10 before:bg-regular dark:before:bg-white/10 checked:border-primary focus:outline-none"
                        value="c"
                      >
                        Beijing
                      </Radio.Button>
                      <Radio.Button
                        className="shadow-none dark:border-white/10 before:bg-regular dark:before:bg-white/10 checked:border-primary focus:outline-none"
                        value="d"
                      >
                        Chengdu
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <Radio.Group defaultValue="a">
                      <Radio.Button
                        className="h-[38px] leading-[36px] border-regular dark:border-white/10 text-[14px] checked:border-primary focus:outline-none shadow-none rounded-l-4"
                        value="a"
                      >
                        Hangzhou
                      </Radio.Button>
                      <Radio.Button
                        className="h-[38px] leading-[36px] border-regular dark:border-white/10 text-[14px] before:bg-regular dark:before:bg-white/10 checked:border-primary focus:outline-none shadow-none"
                        value="b"
                      >
                        Shanghai
                      </Radio.Button>
                      <Radio.Button
                        className="h-[38px] leading-[36px] border-regular dark:border-white/10 text-[14px] before:bg-regular dark:before:bg-white/10 checked:border-primary focus:outline-none shadow-none"
                        value="c"
                      >
                        Beijing
                      </Radio.Button>
                      <Radio.Button
                        className="h-[38px] leading-[36px] border-regular dark:border-white/10 text-[14px] before:bg-regular dark:before:bg-white/10 checked:border-primary focus:outline-none shadow-none"
                        value="d"
                      >
                        Chengdu
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <Radio.Group defaultValue="a" size="small">
                      <Radio.Button
                        className="border-regular dark:border-white/10 text-[13px] checked:border-primary focus:outline-none shadow-none rounded-l-4"
                        value="a"
                      >
                        Hangzhou
                      </Radio.Button>
                      <Radio.Button
                        className="border-regular dark:border-white/10 text-[13px] before:bg-regular dark:before:bg-white/10 checked:border-primary focus:outline-none shadow-none"
                        value="b"
                      >
                        Shanghai
                      </Radio.Button>
                      <Radio.Button
                        className="border-regular dark:border-white/10 text-[13px] before:bg-regular dark:before:bg-white/10 checked:border-primary focus:outline-none shadow-none"
                        value="c"
                      >
                        Beijing
                      </Radio.Button>
                      <Radio.Button
                        className="border-regular dark:border-white/10 text-[13px] before:bg-regular dark:before:bg-white/10 checked:border-primary focus:outline-none shadow-none"
                        value="d"
                      >
                        Chengdu
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default Radios;
