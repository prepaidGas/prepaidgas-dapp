import Image from 'next/image';
import { Carousel, Col, Row } from 'antd';
import { Buttons } from '../buttons';
import { Cards } from '../cards/frame/cards-frame';

function Banner1() {
  return (
    <div className="mb-[72px]">
      <div className="relative bg-white dark:bg-white/10 min-h-[270px] pt-10 px-[30px] pb-[70px] rounded-[10px]">
        <h2 className="mb-3 text-dark dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl font-semibold">
          15 Days Free Trail
        </h2>
        <p className="mb-4 font-normal text-body dark:text-white/60 text-15">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
        </p>
        <Buttons size="small" type="primary" className="h-9 bg-transparent px-5 text-primary border-primary">
          Start
        </Buttons>
      </div>
    </div>
  );
}

function Banner2() {
  return (
    <div className="mb-[72px]">
      <div className="relative bg-[#5f63f2] min-h-[270px] pt-11 px-[25px] pb-[55px] rounded-10">
        <div className="mb-0">
          <Image
            className="absolute bottom-2.5 ltr:right-6 rtl:left-6 3xl:max-w-[150px]"
            src='/hexadash-nextjs/img/banner/1.png'
            alt=""
            width="145"
            height="100"
          />
          <figcaption>
            <h2 className="mb-3 text-white dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl font-semibold">
              Upgrade your plan
            </h2>
            <p className="mb-4 font-normal text-white dark:text-white/[.87] opacity-70 text-15">
              Lorem ipsum dolor sit amet
            </p>
            <Buttons
              size="large"
              type="white"
              className="px-5 mt-6 text-sm font-semibold bg-white dark:bg-whiteDark text-primary dark:text-white border-white hover:border-white dark:border-whiteDark hover:dark:border-whiteDark h-11"
            >
              Upgrade
            </Buttons>
          </figcaption>
        </div>
      </div>
    </div>
  );
}

function Banner3() {
  return (
    <div className="mb-[72px]">
      <div className="relative bg-[#5f63f2] min-h-[270px] pt-10 px-[30px] pb-[70px] rounded-[10px]">
        <div>
          <Image
            className="absolute bottom-2.5 ltr:right-6 rtl:left-6 3xl:max-w-[150px]"
            src='/hexadash-nextjs/img/banner/2.png'
            alt=""
            width="195"
            height="175"
          />
          <figcaption>
            <h2 className="mb-3 text-white dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl font-semibold">
              Earn More Money
            </h2>
            <Buttons
              size="large"
              type="white"
              className="px-5 mt-6 text-sm font-semibold dark:bg-dark bg-white dark:bg-whiteDark text-primary dark:text-white border-none h-11"
            >
              Learn More
            </Buttons>
          </figcaption>
        </div>
      </div>
    </div>
  );
}

function Banner4() {
  return (
    <div className="mb-[72px]">
      <div className="relative bg-[#272b41] dark:bg-white/10 min-h-[270px] pt-10 px-[30px] pb-[70px] rounded-[10px]">
        <div>
          <Image
            className="absolute bottom-2.5 ltr:right-0 rtl:left-0 3xl:max-w-[150px]"
            src='/hexadash-nextjs/img/banner/3.png'
            alt=""
            width="150"
            height="160"
          />
          <figcaption>
            <h2 className="mb-3 text-white dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl font-semibold">
              Win Your Bonus
            </h2>
            <p className="mb-4 font-normal text-white dark:text-white/[.87] opacity-70 text-15">Weekly performance bonus</p>
            <Buttons
              size="large"
              type="white"
              className="px-5 mt-6 text-sm font-semibold bg-white dark:bg-whiteDark text-primary dark:text-white border-white hover:border-white dark:border-whiteDark hover:whiteDark:border-dark h-11"
            >
              Learn More
            </Buttons>
          </figcaption>
        </div>
      </div>
    </div>
  );
}

function Banner5() {
  return (
    <div className="mb-[72px]">
      <div className="relative bg-[#5f63f2] min-h-[270px] pt-10 px-[30px] pb-[70px] rounded-[10px]">
        <div>
          <Image
            className="absolute ltr:right-0 rtl:left-0 bottom-5 3xl:max-w-[150px]"
            src='/hexadash-nextjs/img/banner/4.png'
            alt=""
            width="225"
            height="225"
          />
          <figcaption>
            <h2 className="mb-3 text-2xl font-semibold text-white dark:text-white/[.87]">Congratulations Jhon!</h2>
            <p className="mb-4 font-normal text-white dark:text-white/[.87] opacity-70 text-15">
              Best Seller on the last month.
            </p>
            <Buttons
              size="large"
              type="white"
              className="px-5 mt-6 text-sm font-semibold bg-white dark:bg-whiteDark text-primary dark:text-white border-white hover:border-white dark:border-whiteDark hover:whiteDark:border-dark h-11"
            >
              Learn More
            </Buttons>
          </figcaption>
        </div>
      </div>
    </div>
  );
}

function Banner6() {
  return (
    <div className="mb-[72px]">
      <Cards
        bodyStyle={{
          background: `url(${'/hexadash-nextjs/img/banner/5.png'})`,
          backgroundSize: 'cover',
          borderRadius: '10px',
          minHeight: '270px',
          display: 'flex',
          direction: 'ltr',
          alignItems: 'center',
          backgroundPosition: 'center bottom',
        }}
        headless
      >
        <figcaption className="pb-8 pt-9 px-7">
          <h2 className="mb-3 text-2xl font-semibold text-white dark:text-white/[.87]">Up to 50 OFF</h2>
          <Buttons
            size="small"
            className="px-5 text-sm font-semibold bg-transparent text-danger h-9 border-danger"
          >
            Buy Now
          </Buttons>
        </figcaption>
      </Cards>
    </div>
  );
}

function Banner7() {
  return (
    <div className="mb-[72px]">
      <div className="relative bg-white dark:bg-white/10 min-h-[270px] pt-10 px-[30px] sm:px-[15px] pb-[70px] rounded-[10px]">
        <div className="flex items-center gap-4 sm:flex-col mb-0">
          <Image 
            src='/hexadash-nextjs/img/banner/6.png' 
            alt="" 
            width="145"
            height="160"
          />
          <figcaption className="sm:text-center">
            <h2 className="mb-2.5 text-dark dark:text-white/[.87] text-2xl font-semibold">Subscribe to our newsletter</h2>
            <p className="mb-4 font-normal text-body dark:text-white/60 text-15">
              Lorem ipsum dolor sit amet, consetetur{' '}
            </p>
            <Buttons
              size="small"
              type="secondary"
              className="px-5 text-sm font-semibold bg-transparent text-secondary h-11 border-secondary"
            >
              Subscribe Now
            </Buttons>
          </figcaption>
        </div>
      </div>
    </div>
  );
}

function Banner8() {
  return (
    <div className="relative bg-dark dark:bg-white/10 min-h-[360px] p-[25px] rounded-[10px]">
      <Image
        className="absolute ltr:right-0 rtl:left-0 bottom-0 w-[200px] 3xl:max-w-[150px]"
        src='/hexadash-nextjs/img/banner/10.png'
        alt=""
        width="195"
        height="175"
      />
      <figcaption>
        <h2 className="mb-3 text-3xl font-bold text-white dark:text-white/[.87]">Congratulations Jhon!</h2>
        <p className="mb-4 font-normal text-white dark:text-white/[.87] opacity-70 text-15">
          Best Seller on the last month.
        </p>
        <Buttons
          size="small"
          type="white"
          className="px-5 text-[15px] font-semibold bg-body hover:bg-light text-white h-11 border-none"
        >
          Learn More
        </Buttons>
      </figcaption>
    </div>
  );
}

function Banner9() {
  return (
    <div className="relative bg-gradient-to-tr from-[#5840ff] via-[#0082ff] to-[#00caff] min-h-[350px] pt-10 px-[30px] pb-[70px] rounded-[10px]">
      <div>
        <Image
          className="absolute ltr:right-0 rtl:left-0 bottom-0 w-[200px] 3xl:max-w-[150px]"
          src='/hexadash-nextjs/img/trophy-2.png'
          alt=""
          width="195"
          height="175"
        />
        <figcaption>
          <h2 className="mb-3 text-3xl font-bold text-white dark:text-white/[.87]">Congratulations Jhon!</h2>
          <p className="mb-4 font-normal text-white dark:text-white/[.87] opacity-70 text-15">
            Best Seller on the last month.
          </p>
          <Buttons
            size="large"
            type="white"
            className="px-5 text-[15px] font-semibold bg-white hover:bg-white/60 text-primary h-11 border-none"
          >
            Learn More
          </Buttons>
        </figcaption>
      </div>
    </div>
  );
}

function BannerCarousel() {
  return (
    <div className="relative pb-16 mb-8 bg-primary pt-14 rounded-10 max-w-[550px] lg:max-w-[calc(100vw-30px)]">
      <Carousel autoplay className="[&>.slick-dots.slick-dots-bottom]:-bottom-2.5 [&>.slick-dots>li]:w-auto [&>.slick-dots>li>button]:w-[5px] [&>.slick-dots>li>button]:h-[5px] [&>.slick-dots>li>button]:m-0 [&>.slick-dots>li>button]:rounded-full">
        <div className="flex flex-col items-center justify-center px-5">
          <div className="banner-single__img">
            <Image src='/hexadash-nextjs/img/banner/8.png' alt="" width="164" height="10" />
          </div>
          <div className="text-center mt-7 px-3">
            <h3 className="mb-2 text-2xl font-semibold text-white dark:text-white/[.87]">Achievements</h3>
            <p className="mb-10 font-normal text-white dark:text-white/[.87] text-15">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
            </p>
          </div>
        </div>
        {/* End of /.banner-single */}
        <div className="flex flex-col items-center justify-center">
          <div className="banner-single__img">
            <Image src='/hexadash-nextjs/img/banner/8.png' alt="" width="164" height="10" />
          </div>
          <div className="text-center mt-7 px-3">
            <h3 className="mb-2 text-2xl font-semibold text-white dark:text-white/[.87]">Achievements</h3>
            <p className="mb-10 font-normal text-white dark:text-white/[.87] text-15">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
            </p>
          </div>
        </div>
        {/* End of /.banner-single */}
        <div className="flex flex-col items-center justify-center">
          <div className="banner-single__img">
            <Image src='/hexadash-nextjs/img/banner/8.png' alt="" width="164" height="10" />
          </div>
          <div className="text-center mt-7 px-3">
            <h3 className="mb-2 text-2xl font-semibold text-white dark:text-white/[.87]">Achievements</h3>
            <p className="mb-10 font-normal text-white dark:text-white/[.87] text-15">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
            </p>
          </div>
        </div>
        {/* End of /.banner-single */}
      </Carousel>
    </div>
  );
}

function BannerLong() {
  return (
    <div className="mb-8">
      <div className="px-5 py-8 text-center bg-white dark:bg-white/10 rounded-10">
        <h2 className="font-semibold mb-7 text-dark dark:text-white/[.87] text-22">Up To Date </h2>
        <Image 
          className="mx-auto" 
          src='/hexadash-nextjs/img/banner/9.png' 
          alt="" 
          width="175"
          height="340"
        />
      </div>
    </div>
  );
}

function BannerCard() {
  return (
    <div className="mb-8">
      <div
        className="pt-9 px-10 pb-10 rounded-[10px]"
        style={{
          backgroundImage: `url("${'/hexadash-nextjs/img/banner/card-banner-1.png'}")`,
          minHeight: '450px',
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
        }}
      >
        <h2 className="mb-5 text-white dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl font-semibold">
          Need More Space?
        </h2>
        <Buttons
          size="large"
          type="white"
          className="px-5 text-sm font-semibold bg-white dark:bg-dark border border-white hover:border-white dark:border-dark  hover:dark:border-dark rounded text-primary dark:text-white h-11"
        >
          Buy Storage
        </Buttons>
      </div>
    </div>
  );
}

function BannerCard2() {
  return (
    <div className="mb-8">
      <div
        className="pt-9 px-10 pb-10 rounded-[10px]"
        style={{
          backgroundImage: `url("${'/hexadash-nextjs/img/banner/card-banner-2.png'}")`,
          minHeight: '450px',
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
        }}
      >
        <h2 className="mb-5 text-white dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl font-semibold">
          Create Sale Report
        </h2>
        <p className="mb-5 font-normal text-white dark:text-white/[.87] text-15 opacity-70">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        </p>
        <Buttons
          size="large"
          type="white"
          className="px-5 text-sm font-semibold bg-white dark:bg-dark border border-white hover:border-white dark:border-dark  hover:dark:border-dark rounded text-primary dark:text-white h-11"
        >
          Learn More
        </Buttons>
      </div>
    </div>
  );
}

function BannerCta() {
  return (
    <div className="mb-8 rounded-10">
      <div
        className="flex justify-end items-center text-center min-h-[270px] bg-cover rounded-[10px]"
        style={{
          backgroundImage: `url("${'/hexadash-nextjs/img/banner/cta-banner-1.png'}")`,
          backgroundPosition: 'center bottom',
        }}
      >
        <div className="py-8 ltr:pr-8 rtl:pl-8">
          <h2 className="mb-3 text-dark dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl font-semibold">
            Dedicated Support
          </h2>
          <Buttons
            size="large"
            type="white"
            className="px-5 mt-6 ssm:mt-3 text-sm font-semibold text-white border rounded bg-primary dark:text-white/[.87] h-11 border-primary"
          >
            Learn More
          </Buttons>
        </div>
      </div>
    </div>
  );
}

function BannerCta2() {
  return (
    <div className="mb-8 rounded-10">
      <div
        className="flex items-center min-h-[270px] bg-cover rounded-[10px]"
        style={{ backgroundImage: `url("${'/hexadash-nextjs/img/banner/cta-banner-2.png'}")` }}
      >
        <div className="p-8">
          <h2 className="mb-3 text-dark dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl font-semibold">
            Welcome Back Garry Sobars!
          </h2>
          <p className="text-white/70 dark:text-white/60">
            Lorem ipsum dolor amet, consetetur sadipscing elitr sed diam{' '}
          </p>
          <Buttons
            size="large"
            type="dark"
            className="px-5 mt-6 text-sm font-semibold bg-white border border-white hover:border-white dark:border-dark hover:dark:border-dark rounded dark:bg-dark text-dark dark:text-white h-11"
          >
            Learn More
          </Buttons>
        </div>
      </div>
    </div>
  );
}

interface PageHeaderBannerProps {
  type?: string;
  title?: string;
  subtitle?: string;
}

function PageHeaderBanner({ type, title, subtitle }:PageHeaderBannerProps) {
  return (
    <div
      className={type === 'corporate' ? 'bg-white dark:bg-white/10 rounded-10' : 'bg-white dark:bg-white/10 rounded-10'}
    >
      <div>
        <Row gutter={25} className="items-center">
          <Col xs={24} sm={24} md={24} lg={24} xl={10}>
            <figcaption className="p-[40px] ssm:px-[25px]">
              <h2 className="text-dark dark:text-white/[.87] text-[30px] sm:text-[26px] font-semibold mb-[12px]">
                {title}
              </h2>
              <p className="text-dark dark:text-white/[.87] text-[16px] mb-[25px]">{subtitle}</p>
              <Buttons
                size="large"
                type="primary"
                className="bg-primary text-white h-[50px] inline-flex items-center justify-center px-[28px] font-normal text-[15px]"
              >
                Learn More
              </Buttons>
            </figcaption>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={14} className="flex justify-center">
            {type === 'corporate' ? (
              <Image 
                src='/hexadash-nextjs/img/corporate.png' 
                alt="HexaDash Admin Template" 
                width="195"
                height="175"
              />
            ) : (
              <Image 
                src='/hexadash-nextjs/img/banner/header-banner.png' 
                alt="HexaDash Admin Template" 
                width="195"
                height="175"
              />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export {
  PageHeaderBanner,
  Banner1,
  Banner2,
  Banner3,
  Banner4,
  Banner5,
  Banner6,
  Banner7,
  Banner8,
  Banner9,
  BannerCarousel,
  BannerLong,
  BannerCard,
  BannerCard2,
  BannerCta,
  BannerCta2,
};
