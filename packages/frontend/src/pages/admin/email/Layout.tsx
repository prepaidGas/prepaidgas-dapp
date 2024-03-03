import React, { useState, useLayoutEffect } from 'react';
import { Row, Col } from 'antd';
import {
  UilPlus,
  UilTimes,
  UilAlignLeft,
  UilAlignRight
} from '@iconscout/react-unicons';
import { Buttons } from '@/components/buttons';
import { PageHeaders } from '@/components/page-headers';

import EmailNavbar from './overview/Navbar';
import ComposeMail from './overview/Compose';

const EmailLayout = ({ children }: { children: React.ReactNode }) => {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Email',
    },
    {
      path: '',
      breadcrumbName: 'Email',
    },
  ];

  const [isMailEditorOpen, setMailEditorStatus] = useState(false);
  const [state, setState] = useState({
    responsive: 0,
    collapsed: false,
  });

  const { responsive, collapsed } = state;

  useLayoutEffect(() => {
    function updateSize() {
      const width = window.innerWidth;
      setState((prevState) => ({
        ...prevState, // Preserve other properties in the state
        responsive: width,
      }));

    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const toggleCollapsed = () => {
    setState({
      ...state,
      collapsed: !collapsed,
    });
  };

  const toggleMailComposer = () => {
    setMailEditorStatus(!isMailEditorOpen);
  };

  const closeMailComposer = () => {
    setMailEditorStatus(false);
  };

  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Dashboard"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />

      {isMailEditorOpen && <ComposeMail close={closeMailComposer} />}

      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <Row gutter={25}>
          <Col xxl={5} xl={7} lg={8} xs={24}>
            {responsive <= 991 && (
              <Buttons
                type="link"
                className="mb-[15px] w-[45px] h-[45px] inline-flex items-center justify-center p-0 text-primary bg-white dark:bg-white/10 dark:text-white/[.87] border-1 border-white dark:border-white/10"
                style={{ marginTop: 0 }}
                onClick={toggleCollapsed}
              >
                {collapsed ? <UilAlignLeft /> : <UilAlignRight />}
              </Buttons>
            )}

            {responsive > 991 ? (
              <div className="bg-white dark:bg-white/10 rounded-[10px]">
                <div className="pt-[30px] px-[30px] lg:px-[15px] sm:px-0 pb-[20px]">
                  <Buttons
                    onClick={toggleMailComposer}
                    shape="round"
                    type="primary"
                    size="default"
                    block
                    className="bg-primary hover:bg-primary-hbr flex items-center justify-center text-white dark:text-white/[.87] h-11 px-[20px] gap-1.5 text-sm font-semibold"
                  >
                    <UilPlus className="w-[18px] h-[18px]" /> Compose
                  </Buttons>
                </div>

                <div className="px-[15px] pb-[25px]">
                  <EmailNavbar />
                </div>
              </div>
            ) : (
              <div className={collapsed ? 'visible' : 'hidden'}>
                <div className="bg-white dark:bg-white/10 p-[25px] rounded-[10px] lg:mb-[30px]">
                  <Buttons
                    type="link"
                    className="bg-transparent border-none text-danger sm:px-0"
                    style={{ marginTop: 0 }}
                    onClick={toggleCollapsed}
                  >
                    <UilTimes />
                  </Buttons>
                  <div className="pt-[30px] px-[30px] lg:px-[15px] sm:px-0 pb-[20px]">
                    <Buttons
                      onClick={toggleMailComposer}
                      shape="round"
                      type="primary"
                      size="default"
                      block
                      className="flex items-center justify-center dark:text-white/[.87] h-11 px-[20px] gap-1.5 text-sm font-semibold"
                    >
                      <UilPlus className="w-[18px] h-[18px]" /> Compose
                    </Buttons>
                  </div>

                  <div className="px-[15px] sm:px-0 pb-[25px]">
                    <EmailNavbar />
                  </div>
                </div>
              </div>
            )}
          </Col>

          <Col xxl={19} xl={17} lg={16}>
            { children }
          </Col>
        </Row>
      </main>
    </>
  );
}

export default EmailLayout;
