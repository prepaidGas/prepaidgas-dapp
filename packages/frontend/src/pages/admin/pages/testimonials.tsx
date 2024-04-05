import Image from 'next/image';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { PageHeaders } from '@/components/page-headers';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

SwiperCore.use([Navigation, Pagination]);

interface User {
  id: number;
  name: string;
  designation: string;
  content: string;
  img: string;
}

function Testimonials() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Testimonials',
    },
  ];
  const { users } = useSelector((state:any) => {
    return {
      users: state.users,
    };
  });

  const paramsOne = {
    slidesPerView: 3,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      clickable: true,
    },
    breakpoints: {
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
  };


  const paramsTwo = {
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
  };
  const galleryParams = {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    pagination: {
      el: '.swiper-pagination-gallery',
      clickable: true,
      renderBullet(index:number, className:string) {
        return `<span class="inline-block w-auto h-auto my-1 mx-0 opacity-40 cursor-pointer ${className}"><img class="max-w-[70px] lg:max-w-[40px] ssm:max-w-[25px]" src="${`/hexadash-nextjs/${users[index].img}`}" alt="" /></span>`;
      },
    },
  };
  const paramsThree = {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Testimonials"
        className="flex justify-between items-center px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <main className="min-h-[715px] lg:min-h-[580px] max-w-[calc(100vw-344px)] xl:max-w-[calc(100vw-30px)] bg-transparent mx-auto ssm:px-[25px] pb-[50px] ssm:pb-[30px]">
        <div className="testimonial-custom-style">
          <div className="relative bg-white dark:bg-white/10 pt-16 px-24 lg:px-14 md:px-10 sm:px-[30px] ssm:px-[20px] xs:px-[15px] pb-[75px] lg:pb-[50px] rounded-tl-[10px] rounded-tr-[10px]">
            <h2 className="mb-0 text-center text-dark dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl font-semibold">
              Testimonial 1
            </h2>
            <Swiper {...paramsOne} className="px-5 pt-10 pb-[60px]">
              {users.map((user:User, index:number) => {
                return (
                  <SwiperSlide key={index + 1} className="p-10 text-center bg-white rounded-lg sm:px-5 dark:bg-white/10 shadow-[0_10px_20px_rgba(116,116,116,0.06)] dark:shadow-none">
                      <figure className="mb-0">
                        <Image
                          className="mx-auto mb-3 sm:max-w-[100px] ssm:max-w-[70px]"
                          src={`/hexadash-nextjs/${user.img}`}
                          alt=""
                          width="60"
                          height="46"
                        />
                        <figcaption>
                          <h2 className="mb-1 font-medium text-dark dark:text-white/[.87] text-15">{user.name}</h2>
                          <p className="mb-6 font-normal text-body dark:text-white/60 text-13 opacity-70">
                            {user.designation}
                          </p>
                          <p className="mb-0 text-base leading-7 text-body dark:text-white/60">{user.content}</p>
                        </figcaption>
                      </figure>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="swiper-button-prev"><img src='/hexadash-nextjs/img/icon/arrow-left.png' /></div>
            <div className="swiper-button-next"><img src='/hexadash-nextjs/img/icon/arrow-right.png' /></div>
          </div>
          <div className="relative px-24 lg:px-14 md:px-10 sm:px-[15px] xs:px-0 theme-2 pt-16 pb-[75px] lg:pb-[50px]">
            <h2 className="mb-14 text-center text-dark dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl font-semibold">
              Testimonial 2
            </h2>
            <Swiper {...paramsTwo} className="px-5 pt-0 pb-[60px]">
              {users.map((user:User, index:number) => {
                return (
                  <SwiperSlide key={index + 1}>
                    <div className="p-10 text-center bg-white rounded-lg sm:px-5 dark:bg-white/10">
                      <span className="absolute ltr:right-10 rtl:left-10 top-10">
                        <Image
                          className="sm:max-w-[50px] ssm:max-w-[30px]"
                          src='/hexadash-nextjs/img/icon/quote.png'
                          alt=""
                          width="60"
                          height="46"
                        />
                      </span>
                      <div className="flex items-center mb-5 gap-[20px] ssm:gap-[10px] rtl-true">
                        <Image 
                          className="max-w-[70px] sm:max-w-[50px]" 
                          src={`/hexadash-nextjs/${user.img}`} 
                          alt="" 
                          width="60"
                          height="46"
                        />
                        <div className="">
                          <h2 className="mb-1 font-medium text-dark dark:text-white/[.87] text-15">{user.name}</h2>
                          <p className="mb-0 font-normal text-body dark:text-white/60 text-13 opacity-70">
                            {user.designation}
                          </p>
                        </div>
                      </div>
                      <div className="text-start">
                        <p className="mb-0 text-base leading-7 text-body dark:text-white/60">
                          It is a long established fact that a reader will page when looking at its was layout. The
                          point of be distracted by the readable will page when looking at its was layout will page
                          when looking.
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              <div className="swiper-button-prev"><img src='/hexadash-nextjs/img/icon/arrow-left.png' /></div>
              <div className="swiper-button-next"><img src='/hexadash-nextjs/img/icon/arrow-right.png' /></div>
            </Swiper>
          </div>
          <div className="px-24 lg:px-14 md:px-10 sm:px-[15px] xs:px-0 bg-white theme-3 dark:bg-white/10 py-24 lg:py-14 md:py-10">
            <h2 className="mb-0 text-center text-dark dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl font-semibold">
              Testimonial 3
            </h2>
            <div className="relative">
              <Swiper {...galleryParams} className="px-5">
                {users.map((user:User, index:number) => {
                  return (
                    <SwiperSlide key={index + 1}>
                      <div className="px-5 pt-36 lg:pt-32 ssm:pt-28">
                        <div className="mx-auto text-center max-w-[770px]">
                          <div className="testimonial-block__review">
                            <p className="mb-1 text-base leading-7 text-body dark:text-white/60">
                              It is a long established fact that a reader will page when looking at its was layout.
                              The point of be distracted by the readable will page when looking at its was layout will
                              page when looking.
                            </p>
                          </div>
                          <div className="">
                            <div className="mt-2">
                              <h2 className="mb-1 text-base font-medium text-dark dark:text-white/[.87]">{user.name}</h2>
                              <p className="mb-0 text-sm text-body dark:text-white/60 opacity-70">
                                {user.designation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
                <div className="swiper-pagination-gallery absolute top-[45px] start-1/2 -translate-x-1/2 h-fit text-center z-10 [&>.swiper-pagination-bullet-active]:opacity-100 [&>.swiper-pagination-bullet-active]:scale-125"></div>
              </Swiper>
            </div>
          </div>
          <div className="relative spx-24 lg:px-14 md:px-10 sm:px-[15px] xs:px-0 theme-4 pt-16 pb-[75px] lg:pb-[50px]">
            <h2 className="mb-14 text-center text-dark dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl font-semibold">
              Testimonial 4
            </h2>
            <Swiper {...paramsThree} className="px-5 pt-0 pb-[60px]">
              {users.map((user:User, index:number) => {
                return (
                  <SwiperSlide key={index + 1}>
                    <div className="max-w-[1000px] 3xl:max-w-[570px] lg:max-w-[450px] p-12 sm:px-5 mx-auto text-center bg-white rounded-lg shadow-lg dark:bg-white/10">
                      <div>
                        <img className="mx-auto mb-6 max-w-100" src={`/hexadash-nextjs/${user.img}`} alt="" />
                      </div>
                      <div>
                        <p className="mb-0 text-base leading-7 text-body dark:text-white/60">
                          It is a long established fact that a reader will page when looking at its was layout.
                          The point of be distracted by the readable will page when looking at its was layout will
                          page when looking.
                        </p>
                      </div>
                      <div className="mt-4">
                        <h2 className="mb-1 font-medium text-dark dark:text-white/[.87] text-15">{user.name}</h2>
                        <p className="mb-0 font-normal text-body dark:text-white/60 text-13 opacity-70">
                          {user.designation}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              <div className="swiper-button-prev start-[100px]"><img src='/hexadash-nextjs/img/icon/arrow-left.png' /></div>
              <div className="swiper-button-next end-[100px]"><img src='/hexadash-nextjs/img/icon/arrow-right.png' /></div>
            </Swiper>
          </div>
        </div>
      </main>
    </>
  );
}

export default Testimonials;
