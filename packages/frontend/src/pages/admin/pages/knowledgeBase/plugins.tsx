import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Spin, Row, Col } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const KnowledgeBaseLayout = dynamic(() => import('./Layout'), {
  loading: () => (
    <div className="h-screen flex justify-center items-center">
      <Spin />
    </div>
  ),
});

function ArticlePlugin() {

  const path = '/admin/pages/knowledgeBase';

  return (
    <>
      <KnowledgeBaseLayout>
        <Row>
          <Col md={8} sm={12} xs={24}>
            <div className="mb-[70px]  sm:mb-[30px]">
              <h2 className="mb-3 text-dark dark:text-white/[.87] text-[22px] font-semibold">Introduction to Plugin</h2>
              <ul className="mb-0">
                <li>
                  <Link
                    href={`${path}/single`}
                    className="block mb-3 text-body dark:text-white/60 text-[15px] font-normal"
                  >
                    Log in and out of Plugins
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block mb-3 text-body dark:text-white/60 text-[15px] font-normal">
                    Switch between accounts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block mb-3 text-body dark:text-white/60 text-[15px] font-normal">
                    Change your email
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block text-body dark:text-white/60 text-[15px] font-normal">
                    Reactivate your account
                  </Link>
                </li>
              </ul>
              <Link
                href={`${path}/single`}
                className="relative inline-flex items-center mt-5 text-primary before:absolute ltr:before:left-0 rtl:before:right-0 before:bottom-0 before:w-0 before:h-px before:bg-primary before:transition-all before:ease-in-out hover:before:w-full hover:before:duration-500"
              >
                See more <ArrowRightOutlined className="w-[14px] h-[14px] ltr:ml-[10px] rtl:mr-[10px]" />
              </Link>
            </div>
          </Col>
          <Col md={8} sm={12} xs={24}>
            <div className="mb-[70px]  sm:mb-[30px]">
              <h2 className="mb-3 text-dark dark:text-white/[.87] text-[22px] font-semibold">Introduction to Plugin</h2>
              <ul className="mb-0">
                <li>
                  <Link
                    href={`${path}/single`}
                    className="block mb-3 text-body dark:text-white/60 text-[15px] font-normal"
                  >
                    Log in and out of Plugins
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block mb-3 text-body dark:text-white/60 text-[15px] font-normal">
                    Switch between accounts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block mb-3 text-body dark:text-white/60 text-[15px] font-normal">
                    Change your email
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block text-body dark:text-white/60 text-[15px] font-normal">
                    Reactivate your account
                  </Link>
                </li>
              </ul>
              <Link
                href={`${path}/single`}
                className="relative inline-flex items-center mt-5 text-primary before:absolute ltr:before:left-0 rtl:before:right-0 before:bottom-0 before:w-0 before:h-px before:bg-primary before:transition-all before:ease-in-out hover:before:w-full hover:before:duration-500"
              >
                See more <ArrowRightOutlined className="w-[14px] h-[14px] ltr:ml-[10px] rtl:mr-[10px]" />
              </Link>
            </div>
          </Col>
          <Col md={8} sm={12} xs={24}>
            <div className="mb-[70px]  sm:mb-[30px]">
              <h2 className="mb-3 text-dark dark:text-white/[.87] text-[22px] font-semibold">Introduction to Plugin</h2>
              <ul className="mb-0">
                <li>
                  <Link
                    href={`${path}/single`}
                    className="block mb-3 text-body dark:text-white/60 text-[15px] font-normal"
                  >
                    Log in and out of Plugins
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block mb-3 text-body dark:text-white/60 text-[15px] font-normal">
                    Switch between accounts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block mb-3 text-body dark:text-white/60 text-[15px] font-normal">
                    Change your email
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block text-body dark:text-white/60 text-[15px] font-normal">
                    Reactivate your account
                  </Link>
                </li>
              </ul>
              <Link
                href={`${path}/single`}
                className="relative inline-flex items-center mt-5 text-primary before:absolute ltr:before:left-0 rtl:before:right-0 before:bottom-0 before:w-0 before:h-px before:bg-primary before:transition-all before:ease-in-out hover:before:w-full hover:before:duration-500"
              >
                See more <ArrowRightOutlined className="w-[14px] h-[14px] ltr:ml-[10px] rtl:mr-[10px]" />
              </Link>
            </div>
          </Col>
          <Col md={8} sm={12} xs={24}>
            <div className="mb-[70px]  sm:mb-[30px]">
              <h2 className="mb-3 text-dark dark:text-white/[.87] text-[22px] font-semibold">Introduction to Plugin</h2>
              <ul className="mb-0">
                <li>
                  <Link
                    href={`${path}/single`}
                    className="block mb-3 text-body dark:text-white/60 text-[15px] font-normal"
                  >
                    Log in and out of Plugins
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block mb-3 text-body dark:text-white/60 text-[15px] font-normal">
                    Switch between accounts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block mb-3 text-body dark:text-white/60 text-[15px] font-normal">
                    Change your email
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block text-body dark:text-white/60 text-[15px] font-normal">
                    Reactivate your account
                  </Link>
                </li>
              </ul>
              <Link
                href={`${path}/single`}
                className="relative inline-flex items-center mt-5 text-primary before:absolute ltr:before:left-0 rtl:before:right-0 before:bottom-0 before:w-0 before:h-px before:bg-primary before:transition-all before:ease-in-out hover:before:w-full hover:before:duration-500"
              >
                See more <ArrowRightOutlined className="w-[14px] h-[14px] ltr:ml-[10px] rtl:mr-[10px]" />
              </Link>
            </div>
          </Col>
          <Col md={8} sm={12} xs={24}>
            <div className="mb-[70px]  sm:mb-[30px]">
              <h2 className="mb-3 text-dark dark:text-white/[.87] text-[22px] font-semibold">Introduction to Plugin</h2>
              <ul className="mb-0">
                <li>
                  <Link
                    href={`${path}/single`}
                    className="block mb-3 text-body dark:text-white/60 text-[15px] font-normal"
                  >
                    Log in and out of Plugins
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block mb-3 text-body dark:text-white/60 text-[15px] font-normal">
                    Switch between accounts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block mb-3 text-body dark:text-white/60 text-[15px] font-normal">
                    Change your email
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block text-body dark:text-white/60 text-[15px] font-normal">
                    Reactivate your account
                  </Link>
                </li>
              </ul>
              <Link
                href={`${path}/single`}
                className="relative inline-flex items-center mt-5 text-primary before:absolute ltr:before:left-0 rtl:before:right-0 before:bottom-0 before:w-0 before:h-px before:bg-primary before:transition-all before:ease-in-out hover:before:w-full hover:before:duration-500"
              >
                See more <ArrowRightOutlined className="w-[14px] h-[14px] ltr:ml-[10px] rtl:mr-[10px]" />
              </Link>
            </div>
          </Col>
          <Col md={8} sm={12} xs={24}>
            <div className="mb-[70px]  sm:mb-[30px]">
              <h2 className="mb-3 text-dark dark:text-white/[.87] text-[22px] font-semibold">Introduction to Plugin</h2>
              <ul className="mb-0">
                <li>
                  <Link
                    href={`${path}/single`}
                    className="block mb-3 text-body dark:text-white/60 text-[15px] font-normal"
                  >
                    Log in and out of Plugins
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block mb-3 text-body dark:text-white/60 text-[15px] font-normal">
                    Switch between accounts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block mb-3 text-body dark:text-white/60 text-[15px] font-normal">
                    Change your email
                  </Link>
                </li>
                <li>
                  <Link href="#" className="block text-body dark:text-white/60 text-[15px] font-normal">
                    Reactivate your account
                  </Link>
                </li>
              </ul>
              <Link
                href={`${path}/single`}
                className="relative inline-flex items-center mt-5 text-primary before:absolute ltr:before:left-0 rtl:before:right-0 before:bottom-0 before:w-0 before:h-px before:bg-primary before:transition-all before:ease-in-out hover:before:w-full hover:before:duration-500"
              >
                See more <ArrowRightOutlined className="w-[14px] h-[14px] ltr:ml-[10px] rtl:mr-[10px]" />
              </Link>
            </div>
          </Col>
        </Row>
      </KnowledgeBaseLayout>
    </>
  );
}

export default ArticlePlugin;
