import { Row, Col, Card } from 'antd';
import Link from 'next/link';
import {
  UilTimes,
  UilPrint,
  UilBookOpen,
  UilFileAlt,
  UilFile
} from '@iconscout/react-unicons';
import { PageHeaders } from '@/components/page-headers';
import { Cards } from '@/components/cards/frame/cards-frame';

const content = (
  <>
    <div className="block bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-4">
      <Link
        className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
        href="#"
      >
        <UilPrint className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>Printer</span>
      </Link>
      <Link
        className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
        href="#"
      >
        <UilBookOpen className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>PDF</span>
      </Link>
      <Link
        className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
        href="#"
      >
        <UilFileAlt className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>Google Sheets</span>
      </Link>
      <Link
        className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
        href="#"
      >
        <UilTimes className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>Excel (XLSX)</span>
      </Link>
      <Link
        className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
        href="#"
      >
        <UilFile className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>CSV</span>
      </Link>
    </div>
  </>
);

function CardContainer() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Cards',
    },
  ];
  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Cards"
        routes={PageRoutes}
      />
      <>
        <div className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
          <Row gutter={25}>
            <Col xs={24}>
              <Cards
                className="mb-[25px] bg-white dark:bg-white/10 card-title-bb ant-card-head-px-25 ant-card-body-p-25"
                title="Basic card"
                size="large"
              >
                <Row>
                  <Col lg={8} md={10} xs={24}>
                    <>
                      <Cards
                        title="Default Size Card"
                        border
                        size="default"
                        moreText
                        className="mb-[25px] bg-white dark:bg-transparent card-title-bb ant-card-head-px-25 ant-card-body-p-25 border border-regular dark:border-white/10"
                        more={content}
                        style={{ width: 400 }}
                      >
                        <p className="dark:text-white/60">Card content</p>
                        <p className="dark:text-white/60">Card content</p>
                        <p className="dark:text-white/60">Card content</p>
                        <p className="dark:text-white/60">Card content</p>
                        <p className="dark:text-white/60">Card content</p>
                      </Cards>
                      <Cards
                        title="Small size card"
                        border
                        size="small"
                        moreText
                        className="mb-[25px] bg-white dark:bg-transparent card-title-bb ant-card-head-px-25 ant-card-body-p-25 border-regular dark:border-white/10"
                        more={content}
                        style={{ width: 400 }}
                      >
                        <p className="dark:text-white/60">Card content</p>
                        <p className="dark:text-white/60">Card content</p>
                        <p className="dark:text-white/60">Card content</p>
                        <p className="dark:text-white/60">Card content</p>
                        <p className="dark:text-white/60">Card content</p>
                      </Cards>
                    </>
                  </Col>
                </Row>
              </Cards>
              <Cards
                className="mb-[25px] bg-white dark:bg-white/10 card-title-bb ant-card-head-px-25 ant-card-body-p-25"
                title="No border"
              >
                <Row>
                  <Col lg={8} md={10} xs={24}>
                    <>
                      <Cards
                        title="Default Size Card"
                        border={false}
                        size="default"
                        className="mb-[25px] bg-regularBG dark:bg-white/10 border-none card-title-bb ant-card-head-px-25 ant-card-body-p-25 [&>.ant-card-head]:bg-transparent"
                        moreText
                        more={content}
                        style={{ width: 400 }}
                      >
                        <p className="dark:text-white/60">Card content</p>
                        <p className="dark:text-white/60">Card content</p>
                        <p className="dark:text-white/60">Card content</p>
                        <p className="dark:text-white/60">Card content</p>
                        <p className="dark:text-white/60">Card content</p>
                      </Cards>
                    </>
                  </Col>
                </Row>
              </Cards>
              <Cards
                className="mb-[25px] bg-white dark:bg-white/10 card-title-bb ant-card-head-px-25 ant-card-body-p-25"
                title="Simple card"
                size="large"
              >
                <Row>
                  <Col lg={8} md={10} xs={24}>
                    <>
                      <Cards
                        className="mb-[25px] bg-white dark:bg-white/10 card-title-bb ant-card-head-px-25 ant-card-body-p-25"
                        headless
                        border
                        size="default"
                      >
                        <p className="dark:text-white/60">Card content</p>
                        <p className="dark:text-white/60">Card content</p>
                        <p className="dark:text-white/60">Card content</p>
                      </Cards>
                    </>
                  </Col>
                </Row>
              </Cards>
            </Col>
          </Row>
          <Cards
            className="mb-[25px] card-title-bb ant-card-head-px-25 ant-card-body-p-25"
            title="Card In Column"
            size="large"
          >
            <div className="columnCardsWrapper bg-deepBG dark:bg-white/10 px-[25px] pt-[50px] rounded-[10px]">
              <Row gutter={16}>
                <Col sm={8} xs={24}>
                  <>
                    <Cards
                      className="mb-[25px] bg-white dark:bg-white/10 card-title-bb ant-card-head-px-25 ant-card-body-p-25 rounded-[10px]"
                      title="Card title"
                      border={false}
                      size="default"
                    >
                      <p className="dark:text-white/60">Card content</p>
                    </Cards>
                  </>
                </Col>
                <Col sm={8} xs={24}>
                  <>
                    <Cards
                      className="mb-[25px] bg-white dark:bg-white/10 card-title-bb ant-card-head-px-25 ant-card-body-p-25 rounded-[10px]"
                      title="Card title"
                      border={false}
                      size="default"
                    >
                      <p className="dark:text-white/60">Card content</p>
                    </Cards>
                  </>
                </Col>
                <Col sm={8} xs={24}>
                  <>
                    <Cards
                      className="mb-[25px] bg-white dark:bg-white/10 card-title-bb ant-card-head-px-25 ant-card-body-p-25 rounded-[10px]"
                      title="Card title"
                      border={false}
                      size="default"
                    >
                      <p className="dark:text-white/60">Card content</p>
                    </Cards>
                  </>
                </Col>
              </Row>
            </div>
          </Cards>

          <Row gutter={15}>
            <Col xs={24}>
              <div className="card-grid-wrap">
                <Cards
                  className="mb-[25px] bg-white dark:bg-white/10 card-title-bb ant-card-head-px-25 ant-card-body-p-25 [&>.ant-card-body]:flex [&>.ant-card-body]:flex-wrap"
                  title="Grid Card"
                  size="large"
                >
                  <Card.Grid className="hover:shadow-[0_5px_20px_rgba(146,153,184,0.03)] dark:text-white/60 dark:shadow-[0_0_1px_rgba(146,153,184,0.60)] dark:border-white/10" style={{ width: '25%', textAlign: 'center', padding: 24 }}>Content</Card.Grid>
                  <Card.Grid className="hover:shadow-[0_5px_20px_rgba(146,153,184,0.03)] dark:text-white/60 dark:shadow-[0_0_1px_rgba(146,153,184,0.60)] dark:border-white/10" style={{ width: '25%', textAlign: 'center', padding: 24 }}>Content</Card.Grid>
                  <Card.Grid className="hover:shadow-[0_5px_20px_rgba(146,153,184,0.03)] dark:text-white/60 dark:shadow-[0_0_1px_rgba(146,153,184,0.60)] dark:border-white/10" style={{ width: '25%', textAlign: 'center', padding: 24 }}>Content</Card.Grid>
                  <Card.Grid className="hover:shadow-[0_5px_20px_rgba(146,153,184,0.03)] dark:text-white/60 dark:shadow-[0_0_1px_rgba(146,153,184,0.60)] dark:border-white/10" style={{ width: '25%', textAlign: 'center', padding: 24 }}>Content</Card.Grid>
                  <Card.Grid className="hover:shadow-[0_5px_20px_rgba(146,153,184,0.03)] dark:text-white/60 dark:shadow-[0_0_1px_rgba(146,153,184,0.60)] dark:border-white/10" style={{ width: '25%', textAlign: 'center', padding: 24 }}>Content</Card.Grid>
                  <Card.Grid className="hover:shadow-[0_5px_20px_rgba(146,153,184,0.03)] dark:text-white/60 dark:shadow-[0_0_1px_rgba(146,153,184,0.60)] dark:border-white/10" style={{ width: '25%', textAlign: 'center', padding: 24 }}>Content</Card.Grid>
                  <Card.Grid className="hover:shadow-[0_5px_20px_rgba(146,153,184,0.03)] dark:text-white/60 dark:shadow-[0_0_1px_rgba(146,153,184,0.60)] dark:border-white/10" style={{ width: '25%', textAlign: 'center', padding: 24 }}>Content</Card.Grid>
                  <Card.Grid className="hover:shadow-[0_5px_20px_rgba(146,153,184,0.03)] dark:text-white/60 dark:shadow-[0_0_1px_rgba(146,153,184,0.60)] dark:border-white/10" style={{ width: '25%', textAlign: 'center', padding: 24 }}>Content</Card.Grid>
                </Cards>
              </div>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col xs={24}>
              <div className="card-grid-wrap">
                <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                  <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                      Tailwind Cards
                    </h1>
                  </div>
                  <div className="p-[25px]">
                    <Row gutter={16}>
                      <Col sm={8} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] dark:border-white/10 border-1 rounded-6 relative">
                          <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                            <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                              Default Size Card
                            </h1>
                          </div>
                          <div className="p-[25px]">
                            <p className="dark:text-white/60">Card content</p>
                            <p className="dark:text-white/60">Card content</p>
                            <p className="dark:text-white/60">Card content</p>
                          </div>
                        </div>
                      </Col>
                      <Col sm={8} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] dark:border-white/10 border-1 rounded-6 relative">
                          <div className="h-[60px] flex items-center px-[15px] text-dark dark:text-white/[.87] font-medium text-[15px] border-regular dark:border-white/10 border-b">
                            <h3 className="inline-block mb-0 overflow-hidden capitalize whitespace-nowrap text-ellipsis">
                              Small size card
                            </h3>
                          </div>
                          <div className="p-[15px]">
                            <p className="dark:text-white/60">Card content</p>
                            <p className="dark:text-white/60">Card content</p>
                            <p className="dark:text-white/60">Card content</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
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

export default CardContainer;
