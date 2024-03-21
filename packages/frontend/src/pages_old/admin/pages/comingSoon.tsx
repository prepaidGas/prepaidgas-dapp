import Link from 'next/link';
import Image from 'next/image';
import Countdown from 'react-countdown';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { Col, Form, Input, Row } from 'antd';
import { Buttons } from '@/components/buttons';
import { PageHeaders } from '@/components/page-headers';

function ComingSoon() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Coming Soon',
    },
  ];

  const { mainContent } = useSelector((state:any) => {
    return {
      mainContent: state.ChangeLayoutMode.mode,
    };
  });

  function Completionist() {
    return <span>You are good to go!</span>;
  }

  function renderer({ days, hours, minutes, seconds, completed }:any) {
    if (completed) {
      return <Completionist />;
    }
    return (
      <div className="flex justify-center gap-x-[50px] sm:gap-x-5">
        <span>
          <span className="text-dark dark:text-white/[.87] text-42 xl:text-3xl sm:text-2xl xs:text-xl font-semibold">
            {days}
          </span>
          <span className="block text-body dark:text-white/60 text-base sm:text-[15px]">Days</span>
        </span>
        <span>
          <span className="text-dark dark:text-white/[.87] text-42 xl:text-3xl sm:text-2xl xs:text-xl font-semibold">
            {hours}
          </span>
          <span className="block text-body dark:text-white/60 text-base sm:text-[15px]">Hours</span>
        </span>
        <span>
          <span className="text-dark dark:text-white/[.87] text-42 xl:text-3xl sm:text-2xl xs:text-xl font-semibold">
            {minutes}
          </span>
          <span className="block text-body dark:text-white/60 text-base sm:text-[15px]">Minutes</span>
        </span>
        <span>
          <span className="text-dark dark:text-white/[.87] text-42 xl:text-3xl sm:text-2xl xs:text-xl font-semibold">
            {seconds}
          </span>
          <span className="block text-body dark:text-white/60 text-base sm:text-[15px]">Seconds</span>
        </span>
      </div>
    );
  }

  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Coming Soon"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <div className="bg-white dark:bg-white/10 pt-[90px] pb-20 px-[15px] sm:py-10 text-center rounded-10">
              <div className="mb-[50px] xl:mb-[30px] md:mb-[25px]">
                {mainContent === 'lightMode' ? (
                  <Image className="mx-auto" src={'/hexadash-nextjs/img/logo_dark.svg'} alt="" width="140" height="32" />
                ) : (
                  <Image className="mx-auto" src={'/hexadash-nextjs/img/logo_white.svg'} alt="" width="140" height="32" />
                )}
              </div>
              <h1 className="text-dark dark:text-white/[.87] mb-10 2xl:mb-5 sm:mb-4 text-[58px] 2xl:text-5xl lg:text-4xl sm:text-3xl ssm:text-2xl xs:text-xl font-semibold">
                We are coming soon
              </h1>
              <p className="max-w-[58px]0 mx-auto text-body dark:text-white/60 mb-6 text-[17px] md:text-base sm:text-[15px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry`s standard dummy text ever since the 1500s,
              </p>
              <Countdown date={Date.now() + 1606546460} renderer={renderer} />
              <div className="mt-10 xl:mt-8 lg:mt-6 mb-16 xl:mb-10 lg:mb-5">
                <Form name="basic">
                  <div className="flex justify-center xs:flex-col gap-x-5">
                    <Form.Item
                      className="mb-2"
                      name="email"
                      rules={[{ type: 'email', message: 'Please input your username!' }]}
                    >
                      <Input className="h-12 min-w-[320px] md:min-w-full px-5 py-3 placeholder:dark:text-white/60" placeholder="name@example.com" />
                    </Form.Item>
                    <Buttons size="large" type="primary" htmlType="submit" className="bg-primary text-white h-12">
                      Subscribe
                    </Buttons>
                  </div>
                </Form>
              </div>
              <ul className="flex justify-center mb-7">
                <li className="ltr:mr-4 rtl:ml-4">
                  <Link href="#" className="flex justify-center items-center bg-facebook w-11 h-11 rounded-full">
                    <FontAwesome name="facebook" className="text-white" />
                  </Link>
                </li>
                <li className="ltr:mr-4 rtl:ml-4">
                  <Link href="#" className="flex justify-center items-center bg-twitter w-11 h-11 rounded-full">
                    <FontAwesome name="twitter" className="text-white" />
                  </Link>
                </li>
                <li className="ltr:mr-4 rtl:ml-4">
                  <Link href="#" className="flex justify-center items-center bg-red-500 w-11 h-11 rounded-full">
                    <FontAwesome name="globe" className="text-white" />
                  </Link>
                </li>
                <li className="ltr:mr-4 rtl:ml-4">
                  <Link href="#" className="flex justify-center items-center bg-github w-11 h-11 rounded-full">
                    <FontAwesome name="github" className="text-white" />
                  </Link>
                </li>
              </ul>
              <p className="text-body dark:text-white/60 mb-0">2024 © Sovware</p>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default ComingSoon;
