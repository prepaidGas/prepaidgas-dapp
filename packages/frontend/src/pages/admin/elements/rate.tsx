import { useState } from 'react';
import { Col, Rate, Row } from 'antd';
import { PageHeaders } from '@/components/page-headers';

function Rating() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Rating',
    },
  ];
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  const [state, setState] = useState({
    value: 3,
  });

  const handleChange = (value:number) => {
    setState({ value });
  };

  const { value } = state;
  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Rating"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
          <Col sm={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Basic
                </h1>
              </div>
              <div className="p-[25px]">
                <Rate className=" [&>li.ant-rate-star-zero>div>div>span>svg]:text-[#c6d0dc]" />
              </div>
            </div>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Half start
                </h1>
              </div>
              <div className="p-[25px]">
                <Rate
                  allowHalf
                  defaultValue={2.5}
                  className=" [&>li.ant-rate-star-zero>div>div>span>svg]:text-[#c6d0dc]"
                />
              </div>
            </div>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Rater
                </h1>
              </div>
              <div className="p-[25px]">
                <span className="ant-rate-content">
                  <Rate
                    tooltips={desc}
                    onChange={handleChange}
                    value={value}
                    className=" [&>li.ant-rate-star-zero>div>div>span>svg]:text-[#c6d0dc]"
                  />
                  &nbsp;&nbsp;
                  {`${value} Star`}
                </span>
              </div>
            </div>
          </Col>
          <Col sm={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Clear Star
                </h1>
              </div>
              <div className="p-[25px]">
                <Rate
                  disabled
                  defaultValue={2}
                  className=" [&>li.ant-rate-star-zero>div>div>span>svg]:text-[#c6d0dc]"
                />
              </div>
            </div>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Clear Star
                </h1>
              </div>
              <div className="p-[25px]">
                <Rate defaultValue={3} className=" [&>li.ant-rate-star-zero>div>div>span>svg]:text-[#c6d0dc]" />
                <span className="ant-rate-text">allowClear: true</span>
                <br />
                <Rate
                  allowClear={false}
                  defaultValue={3}
                  style={{ marginTop: 10 }}
                  className=" [&>li.ant-rate-star-zero>div>div>span>svg]:text-[#c6d0dc]"
                />
                <span className="ant-rate-text">allowClear: false</span>
              </div>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default Rating;
