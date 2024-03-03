import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Col, Row } from 'antd';
import {
  UilFacebook,
  UilLinkH,
  UilLinkedin,
  UilTwitter
} from '@iconscout/react-unicons';
import { useRouter } from 'next/router';
import { PageHeaders } from '@/components/page-headers';
import cardData from '@/demoData/sampleCards.json';

const { BlogCardData } = cardData;

interface BlogPost {
  id: number,
  slug: string;
  title: string;
  img: string;
  content: string;
  author: string;
  authorImg: string;
  category: string;
  postDate: string; 
  favouriteBy: string; 
  viewedBy: string;
}

function BlogDetails() {
  const router = useRouter();
  var slug = router.query.slug;
  if (slug === undefined) {
      slug = 'blog-one';
  }
  
  // Find the data for the current slug in your JSON data
  const post:BlogPost | undefined = BlogCardData.find(item => item.slug === slug)

  if (!post) {
    // Handle the case where the post is not found
    return <div>Post not found</div>;
  }

  const {title, img, content, author, authorImg, category, postDate}:BlogPost = post;

  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Blog Details',
    },
  ];
  const [state, setState] = useState({
    shareLinks: false,
  });

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 600) {
        setState({ shareLinks: true });
      } else {
        setState({ shareLinks: false });
      }
    });
  }, []);

  const { shareLinks } = state;

  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Blog Details"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-[30px] xl:px-[15px] pb-5 xl:pb-0">
        <Row justify="center">
          <Col lg={15}>
            <>
              <div className="mb-20">
                <img className='rounded-10' src={`/hexadash-nextjs/img/blogs/blog-details/${img}`} alt={title} />
                <div className="px-24 3xl:px-14 2xl:px-[30px] xl:px-0">
                  <div>
                    <h1 className="mt-10 mb-6 text-dark dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl leading-10">
                      {title}
                    </h1>
                    <ul className="flex flex-wrap items-center mb-11 lg:mb-8 md:mb-5">
                      <li className="relative flex items-center gap-x-2.5 m-1 text-light dark:text-white/60 text-15">
                        <img
                          className="max-w-[50px]"
                          src={`/hexadash-nextjs/img/users/${authorImg}`}
                          alt={author}
                        />
                        <span className="inline-block text-base font-semibold text-dark dark:text-white/[.87]">
                          {author}
                        </span>
                      </li>
                      <li className="relative m-1 ltr:pl-2.5 rtl:pr-2.5 text-light dark:text-white/60 text-15 before:absolute before:h-1 before:w-1 ltr:before:left-0 rtl:before:right-0 before:top-1/2 before:-translate-y-1/2 before:bg-light before:rounded-full">
                        {postDate}
                      </li>
                      <li className="relative m-1 ltr:pl-2.5 rtl:pr-2.5 text-light dark:text-white/60 text-15 before:absolute before:h-1 before:w-1 ltr:before:left-0 rtl:before:right-0 ltr:before:right-0 rtl:before:left-0 before:top-1/2 before:-translate-y-1/2 before:bg-light before:rounded-full">
                        <Link href="#" className="text-link">
                          {category}
                        </Link>
                      </li>
                      <li className="relative m-1 ltr:pl-2.5 rtl:pr-2.5 text-light dark:text-white/60 text-15 before:absolute before:h-1 before:w-1 ltr:before:left-0 rtl:before:right-0 before:top-1/2 before:-translate-y-1/2 before:bg-light before:rounded-full">
                        6 mins read
                      </li>
                    </ul>
                    <p className="text-lg text-body dark:text-white/60">
                      ”Time management” is the process of organizing and planning how to divide your time between
                      specific activities. Good time management enables you to work smarter – not harder – so that you
                      get more done in less time, even when time is tight and pressures are high. Failing to manage your
                      time damages your effectiveness and causes stress.
                    </p>
                    <p className="text-lg text-body dark:text-white/60">
                      ”Time management” is the process of organizing and planning how to divide your time between
                      specific activities. Good time management enables you to work smarter – not harder – so that you
                      get more done enables you to work smarter.
                    </p>
                    <h2 className="mt-12 mb-5 text-dark dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl font-semibold">
                      What is Time Management?
                    </h2>
                    <p className="mb-4 text-lg text-body dark:text-white/60">
                      ”Time management” is the process of organizing and planning how to divide your time between
                      specific activities. Good time management enables you to work smarter – not harder – so that you
                      get more done in less time, even when time is tight and pressures are high. Failing to manage your
                      time damages your effectiveness and causes stress.
                    </p>
                    <img src='/hexadash-nextjs/img/blogs/blog-details/details.png' alt={title} />
                    <h3 className="mt-12 mb-5 text-2xl font-semibold text-dark dark:text-white/[.87] md:text-xl sm:text-lg">
                      How Can you Use your Time Properly?
                    </h3>
                    <p className="mb-4 text-lg text-body dark:text-white/60">
                      ”Time management” is the process of organizing and planning how to divide your time between
                      specific activities. Good time management enables you to work smarter – not harder – so that you
                      get more done in less time, even when time is tight and pressures are high
                    </p>
                    <blockquote className="mb-1">
                      <div className="relative max-w-[630px] ltr:pl-10 rtl:pr-10 before:absolute before:h-full before:w-0.5 ltr:before:left-2 rtl:before:right-2 before:top-0  before:bg-primary before:opacity-30">
                        <p className="relative text-xl ltr:pl-5 rtl:pr-5 text-dark dark:text-white/[.87]">
                          <img
                            className="absolute ltr:left-0 rtl:right-0 top-1 max-w-[15px]"
                            src='/hexadash-nextjs/img/icon/quote-left.png'
                            alt="hexadash blockquote"
                          />
                          Usability design is to improve the usability of a product, which is an important part to guide
                          the actual design. It can also be regarded. A month ago, I agreed to
                          <img
                            className="inline-block -mb-1 ltr:ml-1 rtl:mr-1 max-w-[15px]"
                            src='/hexadash-nextjs/img/icon/quote-right.png'
                            alt="hexadash blockquote"
                          />
                        </p>
                        <span className="block relative ltr:pl-8 rtl:pr-8 text-body dark:text-white/60 text-lg before:absolute before:h-0.5 before:w-5 ltr:before:left-0 rtl:before:right-0 before:top-[12px] before:bg-light dark:before:bg-white/60 before:opacity-30">
                          <strong className="inline-block font-extrabold ltr:mr-1 rtl:ml-1 text-dark dark:text-white/[.87]">
                            Daniel Brown,
                          </strong>
                          Founder of Company
                        </span>
                      </div>
                    </blockquote>
                    <h4 className="mt-12 mb-5 font-semibold text-dark dark:text-white/[.87] text-22">
                      Value of Time Management
                    </h4>
                    <p className="text-lg text-body dark:text-white/60">
                      ”Time management” is the process of organizing and planning how to divide your time between
                      specific activities. Good time management enables you to work smarter.
                    </p>
                    <ul className="">
                      <li className="relative mb-3 ltr:pl-4 rtl:pr-4 text-lg before:absolute before:h-1.5 before:w-1.5 ltr:before:left-0 rtl:before:right-0 before:top-2.5 before:bg-dark dark:before:bg-white/60 before:rounded-full">
                        <span className="inline-block font-medium ltr:mr-1 rtl:ml-1 text-dark dark:text-white/[.87]">
                          Trim transparent pixels on exports:
                        </span>
                        <span className="text-body dark:text-white/60">
                          Usability design is to improve the usability of a product, which is an important.
                        </span>
                      </li>
                      <li className="relative mb-3 ltr:pl-4 rtl:pr-4 text-lg before:absolute before:h-1.5 before:w-1.5 ltr:before:left-0 rtl:before:right-0 before:top-2.5 before:bg-dark dark:before:bg-white/60 before:rounded-full">
                        <span className="inline-block font-medium ltr:mr-1 rtl:ml-1 text-dark dark:text-white/[.87]">
                          Crash and bug fixes:
                        </span>
                        <span className="text-body dark:text-white/60">
                          Usability design is to improve the usability of a product, which is an important part to
                          guide.
                        </span>
                      </li>
                    </ul>
                    <h5 className="mt-12 mb-5 text-xl font-semibold text-dark dark:text-white/[.87]">
                      How Can you Benefit from Time Management System?
                    </h5>
                    <p className="text-lg text-body dark:text-white/60">
                      ”Time management” is the process of organizing and planning how to divide your time between
                      specific activities. Good time management enables you to work smarter.
                    </p>
                    <ul className="hexadash-blog-list">
                      <li className="relative mb-3 ltr:pl-4 rtl:pr-4 text-lg before:absolute before:h-1.5 before:w-1.5 ltr:before:left-0 rtl:before:right-0 before:top-2.5 before:bg-dark dark:before:bg-white/60 before:rounded-full">
                        <span className="text-body dark:text-white/60">Only be run by an explicit user action</span>
                      </li>
                      <li className="relative mb-3 ltr:pl-4 rtl:pr-4 text-lg before:absolute before:h-1.5 before:w-1.5 ltr:before:left-0 rtl:before:right-0 before:top-2.5 before:bg-dark dark:before:bg-white/60 before:rounded-full">
                        <span className="text-body dark:text-white/60">Show UI in a single plugin-specific dialog</span>
                      </li>
                      <li className="relative mb-3 ltr:pl-4 rtl:pr-4 text-lg before:absolute before:h-1.5 before:w-1.5 ltr:before:left-0 rtl:before:right-0 before:top-2.5 before:bg-dark dark:before:bg-white/60 before:rounded-full">
                        <span className="text-body dark:text-white/60">
                          Make a technology change (described in the next section) that avoided the privately-disclosed
                          vulnerabilities.
                        </span>
                      </li>
                    </ul>
                    <h5 className="mt-12 mb-5 text-xl font-semibold text-dark dark:text-white/[.87]">
                      Help Users Fill in Forms
                    </h5>
                    <p className="text-lg text-body dark:text-white/60">
                      ”Time management” is the process of organizing and planning how to divide your time between
                      specific activities. Good time management enables you to work smarter..
                    </p>
                    <ul className="hexadash-blog-list">
                      <li className="relative mb-3 ltr:pl-4 rtl:pr-4 text-lg before:absolute before:h-1.5 before:w-1.5 ltr:before:left-0 rtl:before:right-0 before:top-2.5 before:bg-dark dark:before:bg-white/60 before:rounded-full">
                        <span className="text-body dark:text-white/60">Only be run by an explicit user action</span>
                      </li>
                      <li className="relative mb-3 ltr:pl-4 rtl:pr-4 text-lg before:absolute before:h-1.5 before:w-1.5 ltr:before:left-0 rtl:before:right-0 before:top-2.5 before:bg-dark dark:before:bg-white/60 before:rounded-full">
                        <span className="text-body dark:text-white/60">Show UI in a single plugin-specific dialog</span>
                      </li>
                      <li className="relative mb-3 ltr:pl-4 rtl:pr-4 text-lg before:absolute before:h-1.5 before:w-1.5 ltr:before:left-0 rtl:before:right-0 before:top-2.5 before:bg-dark dark:before:bg-white/60 before:rounded-full">
                        <span className="text-body dark:text-white/60">
                          Make a technology change (described in the next section) that avoided the privately-disclosed
                          vulnerabilities.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <ul className="flex flex-wrap items-center -m-1">
                    <li className="m-1">
                      <Link
                        href="#"
                        className="inline-flex items-center justify-center bg-regularBG dark:bg-white/10 min-h-[34px] px-2.5 text-body dark:text-white/60 text-base rounded-md"
                      >
                        Design Process
                      </Link>
                    </li>
                    <li className="m-1">
                      <Link
                        href="#"
                        className="inline-flex items-center justify-center bg-regularBG dark:bg-white/10 min-h-[34px] px-2.5 text-body dark:text-white/60 text-base rounded-md"
                      >
                        Prototype
                      </Link>
                    </li>
                    <li className="m-1">
                      <Link
                        href="#"
                        className="inline-flex items-center justify-center bg-regularBG dark:bg-white/10 min-h-[34px] px-2.5 text-body dark:text-white/60 text-base rounded-md"
                      >
                        Design Process
                      </Link>
                    </li>
                    <li className="m-1">
                      <Link
                        href="#"
                        className="inline-flex items-center justify-center bg-regularBG dark:bg-white/10 min-h-[34px] px-2.5 text-body dark:text-white/60 text-base rounded-md"
                      >
                        Prototype
                      </Link>
                    </li>
                  </ul>
                  <ul className="flex flex-wrap items-center mt-12 -mx-1 -mb-1">
                    <li className="m-1 font-medium ltr:pr-4 rtl:pl-4 text-dark dark:text-white/[.87] text-[16px]">
                      Share this article:
                    </li>
                    <li className="m-1">
                      <Link
                        href="#"
                        className="group inline-flex items-center justify-center gap-x-1 bg-white dark:bg-white/10 dark:hover:bg-facebook hover:bg-facebook min-h-[34px] px-3.5 text-body dark:text-white/60 hover:text-white dark:hover:text-white/[.87] text-15 border border-regular dark:border-white/10 rounded-md transition duration-0 hover:duration-150"
                      >
                        <UilFacebook className="w-4 h-4 transition text-facebook group-hover:text-white/[.87] duration-0 group-hover:duration-150" />
                        <span>Share</span>
                      </Link>
                    </li>
                    <li className="m-1">
                      <Link
                        href="#"
                        className="group inline-flex items-center justify-center gap-x-1 bg-white dark:bg-white/10 dark:hover:bg-twitter hover:bg-twitter min-h-[34px] px-3.5 text-body dark:text-white/60 hover:text-white dark:hover:text-white/[.87] text-15 border border-regular dark:border-white/10 rounded-md transition duration-0 hover:duration-150"
                      >
                        <UilTwitter className="w-4 h-4 transition text-twitter group-hover:text-white duration-0 group-hover:duration-150" />
                        <span>Tweet</span>
                      </Link>
                    </li>
                    <li className="m-1">
                      <Link
                        href="#"
                        className="group inline-flex items-center justify-center gap-x-1 bg-white dark:bg-white/10 dark:hover:bg-linkedin hover:bg-linkedin min-h-[34px] px-3.5 text-body dark:text-white/60 hover:text-white dark:hover:text-white/[.87] text-15 border border-regular dark:border-white/10 rounded-md transition duration-0 hover:duration-150"
                      >
                        <UilLinkedin className="w-4 h-4 transition text-linkedin group-hover:text-white duration-0 group-hover:duration-150" />
                        <span>Share</span>
                      </Link>
                    </li>
                    <li className="m-1">
                      <Link
                        href="#"
                        className="group inline-flex items-center justify-center gap-x-1 bg-white dark:bg-white/10 dark:hover:bg-link hover:bg-link min-h-[34px] px-3.5 text-body dark:text-white/60 hover:text-white dark:hover:text-white/[.87] text-15 border border-regular dark:border-white/10 rounded-md transition duration-0 hover:duration-150"
                      >
                        <UilLinkH className="w-4 h-4 transition text-dark dark:text-white/[.87] group-hover:text-white duration-0 group-hover:duration-150" />
                        <span>Copy</span>
                      </Link>
                    </li>
                  </ul>
                  <div className="flex items-start gap-5 mt-12 bg-white rounded-lg sm:flex-col dark:bg-white/10 p-9 shadow-custom dark:shadow-none">
                    <div>
                      <img
                        className="max-w-[70px]"
                        src='/hexadash-nextjs/img/users/1.png'
                        alt="hexadash Blog"
                      />
                    </div>
                    <div>
                      <span className="text-body dark:text-white/60 text-15">Written By</span>
                      <span className="block text-lg font-semibold text-dark dark:text-white/[.87]">Charli Day</span>
                      <p className="mt-5 mb-0 text-base text-light dark:text-white/60">
                        Charli Day is a British writer and social media manager specializing in dynamic branding,
                        campaign strategy and content engagement.{' '}
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      shareLinks
                        ? 'fixed top-0 ltr:ml-[820px] rtl:mr-[820px] text-center translate-y-40'
                        : 'hidden opacity-0 translate-y-40'
                    }
                  >
                    <span className="text-base font-semibold text-breadcrumbs dark:text-white/[.87]">Share</span>
                    <ul>
                      <li className="my-2.5">
                        <Link
                          href="#"
                          className="flex items-center justify-center bg-white rounded-full dark:bg-[#1b1d2a] w-[50px] h-[50px] shadow-regular dark:shadow-[0_5px_20px_rgba(1,4,19,.60)] transition-[0.3] group dark:hover:bg-facebook dark:hover:text-white"
                        >
                          <UilFacebook className="w-[18px] h-[18px] text-facebook dark:group-hover:text-white" />
                        </Link>
                      </li>
                      <li className="my-2.5">
                        <Link
                          href="#"
                          className="flex items-center justify-center bg-white rounded-full dark:bg-[#1b1d2a] w-[50px] h-[50px] shadow-regular dark:shadow-[0_5px_20px_rgba(1,4,19,.60)] transition-[0.3] group dark:hover:bg-twitter dark:hover:text-white"
                        >
                          <UilTwitter className="w-[18px] h-[18px] text-twitter dark:group-hover:text-white" />
                        </Link>
                      </li>
                      <li className="my-2.5">
                        <Link
                          href="#"
                          className="flex items-center justify-center bg-white rounded-full dark:bg-[#1b1d2a] w-[50px] h-[50px] shadow-regular dark:shadow-[0_5px_20px_rgba(1,4,19,.60)] transition-[0.3] group dark:hover:bg-linkedin dark:hover:text-white"
                        >
                          <UilLinkedin className="w-[18px] h-[18px] text-linkedin dark:group-hover:text-white" />
                        </Link>
                      </li>
                      <li className="my-2.5">
                        <Link
                          href="#"
                          className="flex items-center justify-center bg-white rounded-full dark:bg-[#1b1d2a] w-[50px] h-[50px] shadow-regular dark:shadow-[0_5px_20px_rgba(1,4,19,.60)] transition-[0.3] group dark:hover:bg-info dark:hover:text-white"
                        >
                          <UilLinkH className="w-[18px] h-[18px] text-info dark:group-hover:text-white" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default BlogDetails;
