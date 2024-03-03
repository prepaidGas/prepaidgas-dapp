import Link from 'next/link';
import { Row, Col } from 'antd';
import { PageHeaders } from '@/components/page-headers';

function TermsConditions() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Terms & Conditions',
    },
  ];
  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Terms & Conditions"
        className="flex justify-between items-center px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <div>
              <div className="bg-pink dark:bg-white/10 flex justify-center items-center min-h-[330px] md:min-h-[240px] sm:min-h-[150px] rounded-10">
                <h2 className="mb-28 md:mb-0 text-dark dark:text-white/[.87] text-5xl lg:text-4xl md:text-3xl sm:text-[26px] font-semibold">
                  Terms & Conditions
                </h2>
              </div>
              <div className="bg-white dark:bg-[#4b4d56] max-w-[770px] md:max-w-[560px] -mt-32 md:mt-[30px] mx-auto pt-px px-12 sm:px-[30px] pb-12 shadow-custom dark:shadow-none rounded-10">
                <h3 className="mt-12 lg:mt-10 mb-9 lg:mb-5 text-dark dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl font-semibold">
                  Privacy Policy
                </h3>
                <p className="text-body dark:text-white/60 text-base leading-7">
                  Your privacy is important to us. Any information submitted by the buyer for completing the
                  transaction, delivering the product, informing about new product releases, and addressing any customer
                  service issues are strictly confidential. We don’t share this information with anyone.
                </p>
                <h3 className="mt-12 lg:mt-10 mb-9 lg:mb-5 text-dark dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl font-semibold">
                  Payment
                </h3>
                <p className="text-body dark:text-white/60 text-base leading-7">
                  To Purchase any of our products, you have the option of paying via PayPal or any major credit and
                  debit cards. Extensions and Themes are licensed for one year at a time. After that you may renew your
                  license to continue updates and support. We do not store your payment or credit card information for
                  your security.
                </p>
                <h3 className="mt-12 lg:mt-10 mb-9 lg:mb-5 text-dark dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl font-semibold">
                  License Usage
                </h3>
                <p className="text-body dark:text-white/60 text-base leading-7">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                  release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                  software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <h3 className="mt-12 lg:mt-10 mb-9 lg:mb-5 text-dark dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl font-semibold">
                  Product Updates
                </h3>
                <p className="text-body dark:text-white/60 text-base leading-7">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been also
                  the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                  with the release of Letraset sheets containing Lorem Ipsum passages
                </p>
                <h3 className="mt-12 lg:mt-10 mb-9 lg:mb-5 text-dark dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl font-semibold">
                  Media
                </h3>
                <p className="text-body dark:text-white/60 text-base leading-7">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been also
                  the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                  with the release of Letraset sheets containing Lorem Ipsum passages
                </p>
                <h3 className="mt-12 lg:mt-10 mb-9 lg:mb-5 text-dark dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl font-semibold">
                  Cookies
                </h3>
                <p className="text-body dark:text-white/60 text-base leading-7">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been also
                  the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                  with the release of Letraset sheets containing Lorem Ipsum passages
                </p>
                <h3 className="mt-12 lg:mt-10 mb-9 lg:mb-5 text-dark dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl font-semibold">
                  Support
                </h3>
                <p className="text-body dark:text-white/60 text-base leading-7">
                  Please, refer <Link href="#">Support Policy</Link> page for details.
                </p>
                <p className="text-body dark:text-white/60 text-base leading-7">Last update: May 05, 2023</p>
              </div>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default TermsConditions;
