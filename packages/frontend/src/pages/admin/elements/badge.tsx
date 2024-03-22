import { useState } from 'react';
import Link from 'next/link';
import { Row, Col, Badge, Switch } from 'antd';
import { ClockCircleOutlined, BellOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { PageHeaders } from '@/components/page-headers';
import { BtnGroup, Buttons } from '@/components/buttons';

const colors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];

function Badges() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Avatar',
    },
  ];
  const [state, setState] = useState({
    count: 5,
    show: true,
  });

  const increase = () => {
    const count = state.count + 1;
    setState({ ...state, count });
  };

  const decline = () => {
    let count = state.count - 1;
    if (count < 0) {
      count = 0;
    }
    setState({ ...state, count });
  };

  const onChange = (show:boolean) => {
    setState({ ...state, show });
  };

  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Avatar"
        routes={PageRoutes}
      />

      <>
        <div className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
          <Row gutter={25}>
            <Col md={12} sm={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    With Badge
                  </h1>
                </div>
                <div className="gap-y-[15px] gap-x-[20px] inline-flex flex-wrap p-[25px]">
                  <Badge count={5}>
                    <Link href="#" className="head-example" />
                  </Badge>
                  <Badge count={0} showZero>
                    <Link href="#" className="head-example" />
                  </Badge>
                  <Badge count={<ClockCircleOutlined style={{ color: '#f5222d' }} />}>
                    <Link href="#" className="head-example" />
                  </Badge>
                </div>
              </div>

              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Overflow Count
                  </h1>
                </div>
                <div>
                  <div className="gap-y-[15px] gap-x-[30px] inline-flex flex-wrap p-[25px]">
                    <Badge count={99}>
                      <Link href="#" className="head-example" />
                    </Badge>
                    <Badge count={100}>
                      <Link href="#" className="head-example" />
                    </Badge>
                    <Badge count={99} overflowCount={10}>
                      <Link href="#" className="head-example" />
                    </Badge>
                    <Badge count={1000} overflowCount={999}>
                      <Link href="#" className="head-example" />
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Clickable
                  </h1>
                </div>
                <div className="p-[25px]">
                  <div>
                    <Link href="#">
                      <Badge count={5}>
                        <span className="head-example" />
                      </Badge>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Status
                  </h1>
                </div>
                <div className="p-[25px]">
                  <div style={{ marginBottom: 10 }}>
                    {colors.map((color) => (
                      <Badge className="[&>span]:me-2.5" key={color} color={color} />
                    ))}
                  </div>
                  <div>
                    {colors.map((color) => (
                      <div key={color}>
                        <Badge color={color} text={color} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
            <Col md={12} sm={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Standalone
                  </h1>
                </div>
                <div className="p-[25px]">
                  <div className="flex gap-2.5">
                    <Badge className="[&>.ant-badge-count]:text-[12px] [&>.ant-badge-count]:text-px-2" count={25} />
                    <Badge
                      count={4}
                      style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
                    />
                    <Badge className="[&>.ant-badge-count]:text-[12px] [&>.ant-badge-count]:text-px-2" count={109} style={{ backgroundColor: '#01B81A' }} />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Red badge
                  </h1>
                </div>
                <div className="p-[25px]">
                  <div className="flex gap-5">
                    <Badge dot>
                      <BellOutlined className='text-light dark:text-white/60' />
                    </Badge>
                    <Badge count={0} dot>
                      <BellOutlined className='text-light dark:text-white/60' />
                    </Badge>
                    <Badge dot>
                      <Link href="#" className="text-link hover:text-primary">Link something</Link>
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Dynamic
                  </h1>
                </div>
                <div>
                  <div className="gap-y-[15px] gap-x-[30px] inline-flex flex-wrap p-[25px]">
                    <div className="flex items-center w-full gap-3 badge-dynamic">
                      <Badge count={state.count}>
                        <Link href="#" className="head-example" />
                      </Badge>
                      <BtnGroup>
                        <Buttons onClick={decline} className="flex items-center hover:text-primary hover:border-primary dark:border-white/10">
                          <MinusOutlined className='text-light dark:text-white/60' />
                        </Buttons>
                        <Buttons onClick={increase} className="flex items-center hover:text-primary hover:border-primary dark:border-white/10">
                          <PlusOutlined className='text-light dark:text-white/60' />
                        </Buttons>
                      </BtnGroup>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge dot={state.show}>
                        <Link href="#" className="head-example" />
                      </Badge>
                      <Switch className="bg-[#bfbfbf] [&.ant-switch-checked]:bg-primary" onChange={onChange} checked={state.show} />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </>
    </>
  );
}

export default Badges;
