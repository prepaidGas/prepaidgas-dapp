import React from 'react';
import { Row, Col } from 'antd';
import { UilLayers } from '@iconscout/react-unicons';
import { DownOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import Heading from '@/components/heading';
import DropDown from '@/components/dropdown';
import { PageHeaders } from '@/components/page-headers';
import { BtnGroup, Buttons } from '@/components/buttons';
import { Cards } from '@/components/cards/frame/cards-frame';

function ButtonComponent() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Buttons',
    },
  ];
  return (
    <>
      <>
        <PageHeaders
          routes={PageRoutes}
          title="Buttons"
          className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col md:flex-row"
        />
        <div className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
          <Row gutter={25}>
            <Col md={12}>
              <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                  Basic
                </Heading>
                <div className="flex flex-wrap gap-x-[10px] gap-y-[10px]">
                  <Buttons className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Primary
                  </Buttons>
                  <Buttons className="bg-secondary hover:bg-secondary-hbr border-solid border-1 border-secondary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Secondary
                  </Buttons>
                  <Buttons className="bg-success hover:bg-success-hbr border-solid border-1 border-success text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Success
                  </Buttons>
                  <Buttons className="bg-info hover:bg-info-hbr border-solid border-1 border-info text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Info
                  </Buttons>
                  <Buttons className="bg-warning hover:bg-warning-hbr border-solid border-1 border-warning text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Warning
                  </Buttons>
                  <Buttons className="bg-danger hover:bg-danger-hbr border-solid border-1 border-danger text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Danger
                  </Buttons>
                  <Buttons className="bg-dark hover:bg-dark-hbr border-solid border-1 border-dark text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Dark
                  </Buttons>
                  <Buttons className="bg-theme-gray hover:bg-gray-hbr border-solid border-1 border-theme-gray text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Gray
                  </Buttons>
                  <Buttons className="bg-light hover:bg-light-hbr border-solid border-1 border-light text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Light
                  </Buttons>
                  <Buttons className="bg-light-extra hover:bg-light-extra-hbr border-solid border-1 border-light-extra text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Extra Light
                  </Buttons>
                </div>
              </Cards>
              <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                  Light Color
                </Heading>
                <div className="flex flex-wrap gap-x-[10px] gap-y-[10px]">
                  <Buttons className="bg-primary-transparent hover:bg-primary-hbr border-none text-primary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Primary
                  </Buttons>
                  <Buttons className="bg-secondary-transparent hover:bg-secondary-hbr border-none text-secondary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Secondary
                  </Buttons>
                  <Buttons className="bg-success-transparent hover:bg-success-hbr border-none text-success hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Success
                  </Buttons>
                  <Buttons className="bg-info-transparent hover:bg-info-hbr border-none text-info hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Info
                  </Buttons>
                  <Buttons className="bg-warning-transparent hover:bg-warning-hbr border-none text-warning hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Warning
                  </Buttons>
                  <Buttons className="bg-danger-transparent hover:bg-danger-hbr border-none text-danger hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Danger
                  </Buttons>
                  <Buttons className="bg-dark-transparent dark:bg-white/10 hover:bg-dark-hbr border-none text-dark dark:text-white/[.87] hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Dark
                  </Buttons>
                  <Buttons className="bg-theme-gray-transparent dark:bg-white/30 hover:bg-gray-hbr dark:hover:bg-white/10 border-none text-theme-gray dark:text-white/60 hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Gray
                  </Buttons>
                </div>
              </Cards>
              <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                  Rounded
                </Heading>
                <div className="flex flex-wrap gap-x-[10px] gap-y-[10px]">
                  <Buttons className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]">
                    Primary
                  </Buttons>
                  <Buttons className="bg-secondary hover:bg-secondary-hbr border-solid border-1 border-secondary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]">
                    Secondary
                  </Buttons>
                  <Buttons className="bg-success hover:bg-success-hbr border-solid border-1 border-success text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]">
                    Success
                  </Buttons>
                  <Buttons className="bg-info hover:bg-info-hbr border-solid border-1 border-info text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]">
                    Info
                  </Buttons>
                  <Buttons className="bg-warning hover:bg-warning-hbr border-solid border-1 border-warning text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]">
                    Warning
                  </Buttons>
                  <Buttons className="bg-danger hover:bg-danger-hbr border-solid border-1 border-danger text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]">
                    Danger
                  </Buttons>
                  <Buttons className="bg-dark hover:bg-dark-hbr border-solid border-1 border-dark text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]">
                    Dark
                  </Buttons>
                  <Buttons className="bg-theme-gray hover:bg-gray-hbr border-solid border-1 border-theme-gray text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]">
                    Gray
                  </Buttons>
                  <Buttons className="bg-light hover:bg-light-hbr border-solid border-1 border-light text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]">
                    Light
                  </Buttons>
                  <Buttons className="bg-light-extra hover:bg-light-extra-hbr border-solid border-1 border-light-extra text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]">
                    Extra Light
                  </Buttons>
                </div>
              </Cards>

              <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                  Icon
                </Heading>
                <div className=" flex flex-wrap gap-x-[10px] gap-y-[10px]">
                  <div className="flex flex-wrap gap-x-[10px] gap-y-[10px]">
                    <Buttons
                      size="default"
                      className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn gap-[8px] "
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                      Default
                    </Buttons>
                    <Buttons
                      size="default"
                      className="bg-primary-transparent dark:bg-light hover:bg-primary-hbr border-none text-primary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn gap-[8px] dark:text-primary dark:hover:text-white dark:hover:border-white/10"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                      Default
                    </Buttons>
                    <Buttons
                      size="default"
                      className="hover:bg-primary-hbr border-1 border-style border-primary text-primary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn gap-[8px] dark:text-primary dark:bg-transparent"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                      Default
                    </Buttons>
                    <Buttons
                      size="default"
                      className=" text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn gap-[8px] dark:text-white/[.87] dark:hover:text-primary dark:bg-transparent hover:border-primary"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                      Default
                    </Buttons>
                    <Buttons
                      size="default"
                      className="bg-light hover:bg-light-hbr border-solid border-1 border-light text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn gap-[8px]"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                      Default
                    </Buttons>
                    <Buttons
                      size="default"
                      className=" text-[14px] font-semibold border-none leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn gap-[8px] dark:bg-light dark: hover:bg-light-hbr dark:text-dark dark:hover:text-body dark:hover:border-white/10"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                      Default
                    </Buttons>
                  </div>
                  <div className="flex flex-wrap gap-x-[10px] gap-y-[10px]">
                    <Buttons
                      size="default"
                      className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn gap-[8px]"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                    </Buttons>
                    <Buttons
                      size="default"
                      className="bg-primary-transparent dark:bg-light hover:bg-primary-hbr border-none text-primary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn gap-[8px] dark:text-primary dark:hover:text-white"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                    </Buttons>
                    <Buttons
                      size="default"
                      className="bg-transparent hover:bg-primary-hbr border-1 border-style border-primary text-primary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn gap-[8px"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                    </Buttons>
                    <Buttons
                      size="default"
                      className="bg-transparent text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn gap-[8px] dark:text-white/[.87] dark:hover:text-primary hover:border-primary"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                    </Buttons>
                    <Buttons
                      size="default"
                      className="bg-light hover:bg-light-hbr border-solid border-1 border-light text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn gap-[8px]"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                    </Buttons>
                  </div>
                </div>
              </Cards>

              <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                  Size
                </Heading>
                <Row>
                  <div className="flex flex-wrap gap-y-[15px]">
                    <div className="flex flex-wrap items-center gap-x-[10px] md:gap-y-[40px] gap-y-[20px] w-full">
                      <Buttons
                        className="bg-warning hover:bg-warning-hbr border-solid border-1 border-warning text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[50px]"
                        raised
                      >
                        Large Buttons
                      </Buttons>
                      <Buttons
                        className="bg-success hover:bg-success-hbr border-solid border-1 border-success text-white dark:hover:border-white/10 dark:hover:text-dark dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
                        raised
                      >
                        Default
                      </Buttons>
                      <Buttons
                        className="bg-secondary hover:bg-secondary-hbr border-solid border-1 border-secondary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[38px]"
                        raised
                      >
                        Small
                      </Buttons>
                      <Buttons className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[32px]">
                        Extra Small
                      </Buttons>
                    </div>
                  </div>
                </Row>
              </Cards>

              <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                  Multiple Buttons
                </Heading>
                <div className="flex flex-wrap gap-x-[15px] gap-y-[15px]">
                  <Buttons className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Primary
                  </Buttons>

                  <Buttons className="bg-secondary hover:bg-secondary-hbr border-solid border-1 border-secondary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Secondary
                  </Buttons>

                  <DropDown placement="topLeft">
                    <>
                      <Buttons className=" border-solid border-1 text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] dark:text-white/[.87] dark:hover:text-primary dark:bg-white/10 dark:border-white/[.87] dark:hover:border-primary">
                        Actions
                        <DownOutlined className="svg-w-h-10 text-light dark:text-white/30" />
                      </Buttons>
                    </>
                  </DropDown>
                </div>
              </Cards>

              <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                  Group Buttons
                </Heading>
                <>
                  <div className="mb-[15px]">
                    <h4 className="text-dark dark:text-white/[.87] text-[15px] leading-[24px] mb-[10px]">Basic</h4>
                    <Row className="gap-x-[15px] gap-y-[10px]">
                      <BtnGroup>
                        <Buttons className="text-white text-[13px] font-semibold bg-primary border-primary px-[8px]">
                          Today
                        </Buttons>
                        <Buttons className="dark:bg-white hover:text-primary hover:border-primary text-[13px] font-semibold px-[8px]">Week</Buttons>
                        <Buttons className="dark:bg-white hover:text-primary hover:border-primary text-[13px] font-semibold px-[8px]">Month</Buttons>
                        <Buttons className="dark:bg-white hover:text-primary hover:border-primary text-[13px] font-semibold px-[8px]">Year</Buttons>
                      </BtnGroup>
                      <BtnGroup>
                        <Buttons className="dark:bg-white hover:text-primary hover:border-primary text-[13px] font-semibold px-[8px]">Cancel</Buttons>
                        <Buttons className="dark:bg-white hover:text-primary hover:border-primary text-[13px] font-semibold px-[8px]">Ok</Buttons>
                      </BtnGroup>
                      <BtnGroup>
                        <Buttons className="dark:bg-white hover:text-primary hover:border-primary text-[13px] font-semibold px-[8px]">Left</Buttons>
                        <Buttons className="dark:bg-white hover:text-primary hover:border-primary text-[13px] font-semibold px-[8px]">Middle</Buttons>
                        <Buttons className="dark:bg-white hover:text-primary hover:border-primary text-[13px] font-semibold px-[8px]">Right</Buttons>
                      </BtnGroup>
                    </Row>
                  </div>

                  <div className="button-group-single">
                    <h4 className="text-dark dark:text-white/[.87] text-[15px] leading-[24px] mb-[10px]">With Icon</h4>
                    <Row>
                      <>
                        <BtnGroup>
                          <Buttons className="active text-white dark:text-white/[.87] text-[13px] font-semibold bg-primary border-primary px-[8px]  inline-flex items-center">
                            <LeftOutlined className="inline-flex svg-w-h-10" />
                            Go Back
                          </Buttons>
                          <Buttons className="dark:bg-white hover:text-primary hover:border-primary text-[13px] font-semibold px-[8px] inline-flex items-center">
                            Go Forward
                            <RightOutlined className="inline-flex svg-w-h-10 dark:[&>svg]:!text-dark" />
                          </Buttons>
                        </BtnGroup>
                      </>
                    </Row>
                  </div>
                </>
              </Cards>

              <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                  Block
                </Heading>
                <Row className="gap-x-[15px] gap-y-[10px] flex flex-wrap flex-col">
                  <Buttons className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] flex items-center justify-center rounded-[4px] px-[20px] h-[50px]">
                    Large Buttons
                  </Buttons>
                  <Buttons className="bg-secondary hover:bg-secondary-hbr border-solid border-1 border-secondary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Default
                  </Buttons>
                  <Buttons className="bg-success hover:bg-success-hbr border-solid border-1 border-success text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] flex items-center justify-center rounded-[4px] px-[20px] h-[38px]">
                    Small
                  </Buttons>
                  <Buttons className="bg-warning hover:bg-warning-hbr border-solid border-1 border-warning text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] flex items-center justify-center rounded-[4px] px-[20px] h-[32px]">
                    Extra Small
                  </Buttons>
                </Row>
              </Cards>
            </Col>

            <Col md={12}>
              <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                  Outline
                </Heading>
                <div className="flex flex-wrap gap-x-[10px] gap-y-[10px]">
                  <Buttons className=" hover:bg-primary-hbr border-solid border-1 border-primary text-primary bg-transparent hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Primary
                  </Buttons>
                  <Buttons className=" hover:bg-secondary-hbr border-solid border-1 border-secondary text-secondary bg-transparent  hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Secondary
                  </Buttons>
                  <Buttons className=" hover:bg-success-hbr border-solid border-1 border-success text-success bg-transparent  hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Success
                  </Buttons>
                  <Buttons className=" hover:bg-info-hbr border-solid border-1 border-info text-info bg-transparent  hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Info
                  </Buttons>
                  <Buttons className=" hover:bg-warning-hbr border-solid border-1 border-warning text-warning bg-transparent  hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Warning
                  </Buttons>
                  <Buttons className=" hover:bg-danger-hbr border-solid border-1 border-danger text-danger bg-transparent  hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Danger
                  </Buttons>
                  <Buttons className=" hover:bg-dark-hbr border-solid border-1 border-dark dark:border-white/[.87] text-dark dark:text-white/[.87] bg-transparent  hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] dark:hover:bg-white dark:hover:text-dark ">
                    Dark
                  </Buttons>
                  <Buttons className="hover:bg-gray-hbr border-solid border-1 border-theme-gray text-theme-gray bg-transparent  dark:text-white/60 hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Gray
                  </Buttons>
                  <Buttons className=" hover:bg-light-hbr border-solid border-1 border-light text-light bg-transparent  dark:text-white/60 hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Light
                  </Buttons>
                  <Buttons className=" border-dashed border-1 border-light-extra text-[14px] text-dark bg-transparent dark:hover:bg-white  dark:text-white/[.87] dark:hover:text-dark dark:hover:border-white/10 hover:text-dark font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Dashed
                  </Buttons>
                </div>
              </Cards>

              <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                  Raised
                </Heading>
                <div className="flex flex-wrap gap-x-[10px] gap-y-[10px]">
                  <Buttons className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                    Primary
                  </Buttons>
                  <Buttons className="bg-secondary hover:bg-secondary-hbr border-solid border-1 border-secondary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                    Secondary
                  </Buttons>
                  <Buttons className="bg-success hover:bg-success-hbr border-solid border-1 border-success text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                    Success
                  </Buttons>
                  <Buttons className="bg-info hover:bg-info-hbr border-solid border-1 border-info text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                    Info
                  </Buttons>
                  <Buttons className="bg-warning hover:bg-warning-hbr border-solid border-1 border-warning text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                    Warning
                  </Buttons>
                  <Buttons className="bg-danger hover:bg-danger-hbr border-solid border-1 border-danger text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                    Danger
                  </Buttons>
                  <Buttons className="bg-dark hover:bg-dark-hbr border-solid border-1 border-dark text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                    Dark
                  </Buttons>
                  <Buttons className="bg-theme-gray hover:bg-gray-hbr border-solid border-1 border-theme-gray text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                    Gray
                  </Buttons>
                  <Buttons className="border-none bg-white text-dark dark:hover:text-dark dark:hover:border-white/10 dark:text-dark text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-regular dark:shadow-none">
                    White
                  </Buttons>
                </div>
              </Cards>

              <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                  Rounded Outline
                </Heading>
                <div className="flex flex-wrap gap-x-[10px] gap-y-[10px]">
                  <Buttons className=" dark:bg-transparent hover:bg-primary-hbr border-solid border-1 border-primary text-primary text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]">
                    Primary
                  </Buttons>
                  <Buttons className=" dark:bg-transparent hover:bg-secondary-hbr border-solid border-1 border-secondary text-secondary  text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]">
                    Secondary
                  </Buttons>
                  <Buttons className=" dark:bg-transparent hover:bg-success-hbr border-solid border-1 border-success text-success  text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]">
                    Success
                  </Buttons>
                  <Buttons className=" dark:bg-transparent hover:bg-info-hbr border-solid border-1 border-info text-info  text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]">
                    Info
                  </Buttons>
                  <Buttons className=" dark:bg-transparent hover:bg-warning-hbr border-solid border-1 border-warning text-warning text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]">
                    Warning
                  </Buttons>
                  <Buttons className=" dark:bg-transparent hover:bg-danger-hbr border-solid border-1 border-danger text-danger  text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]">
                    Danger
                  </Buttons>
                  <Buttons className=" dark:bg-transparent hover:bg-dark-hbr border-solid border-1 border-dark dark:border-white/[.87] text-dark dark:text-white/[.87]  text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]">
                    Dark
                  </Buttons>
                  <Buttons className=" dark:bg-transparent hover:bg-gray-hbr border-solid border-1 border-theme-gray text-theme-gray dark:text-white/60 hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]">
                    Gray
                  </Buttons>
                  <Buttons className=" dark:bg-transparent hover:bg-light-hbr border-solid border-1 border-light text-light dark:text-white/60 hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]">
                    Light
                  </Buttons>
                  <Buttons className=" dark:bg-transparent dark:hover:bg-white border-dashed border-1 border-light-extra text-[14px] text-dark dark:hover:text-dark dark:hover:border-white/10 dark:text-white/[.87] hover:text-dark font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]">
                    Dashed
                  </Buttons>
                </div>
              </Cards>

              <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                  Rounded With Icon
                </Heading>
                <div className=" flex flex-wrap gap-x-[10px] gap-y-[10px]">
                  <div className="flex flex-wrap gap-x-[10px] gap-y-[10px]">
                    <Buttons
                      size="default"
                      className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px] shadow-btn gap-[8px]"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                      Default
                    </Buttons>
                    <Buttons
                      size="default"
                      className="bg-primary-transparent hover:bg-primary-hbr border-none text-primary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px] shadow-btn gap-[8px]"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                      Default
                    </Buttons>
                    <Buttons
                      size="default"
                      className="hover:bg-primary-hbr border-1 border-style border-primary text-primary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px] shadow-btn gap-[8px] dark:text-primary dark:bg-transparent"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                      Default
                    </Buttons>
                    <Buttons
                      size="default"
                      className=" text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px] shadow-btn gap-[8px] bg-transparent dark:hover:text-primary dark:text-white/[.87]"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                      Default
                    </Buttons>
                    <Buttons
                      size="default"
                      className="bg-light hover:bg-light-hbr dark:bg-transparent border-solid border-1 border-light text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px] shadow-btn gap-[8px]"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                      Default
                    </Buttons>
                    <Buttons
                      size="default"
                      className="dark:bg-light dark:hover:bg-light-hbr text-[14px] font-semibold border-none leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px] shadow-btn gap-[8px] dark:text-dark dark:hover:text-body dark:hover:border-white/10"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                      Default
                    </Buttons>
                  </div>
                  <div className="flex flex-wrap gap-x-[10px] gap-y-[10px]">
                    <Buttons
                      size="default"
                      className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px] shadow-btn gap-[8px]"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                    </Buttons>
                    <Buttons
                      size="default"
                      className="bg-primary-transparent hover:bg-primary-hbr border-none text-primary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px] shadow-btn gap-[8px]"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                    </Buttons>
                    <Buttons
                      size="default"
                      className="hover:bg-primary-hbr dark:bg-transparent border-1 border-style border-primary text-primary hover:text-primary text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px] shadow-btn gap-[8px]"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                    </Buttons>
                    <Buttons
                      size="default"
                      className=" text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px] shadow-btn gap-[8px] dark:text-white dark:hover:text-primary bg-transparent"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                    </Buttons>
                    <Buttons
                      size="default"
                      className="bg-light hover:bg-light-hbr border-solid border-1 border-light text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px] shadow-btn gap-[8px]"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                    </Buttons>
                  </div>
                </div>
              </Cards>

              <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                  Disabled
                </Heading>
                <Row className="flex flex-wrap gap-x-[10px] gap-y-[10px] mb-[15px]">
                  <Buttons className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                    Primary
                  </Buttons>
                  <Buttons
                    className="bg-primary/[.60] border-solid border-1 border-transparent text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
                    disabled
                  >
                    Primary(Disabled)
                  </Buttons>
                </Row>
                <Row className="flex flex-wrap gap-x-[10px] gap-y-[10px]">
                  <Buttons className="text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] bg-white dark:text-dark dark:hover:text-dark dark:hover:border-white/10">
                    Default
                  </Buttons>
                  <Buttons
                    className="bg-light dark:border-light text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
                    disabled
                  >
                    Default(Disabled)
                  </Buttons>
                </Row>
              </Cards>

              <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                  Loading
                </Heading>
                <div className="flex flex-wrap gap-x-[10px] gap-y-[10px]">
                  <Buttons
                    className="w-auto bg-primary border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]  ant-btn-loading-icon [&>span>span>svg]:text-white"
                    loading
                  >
                    Default
                  </Buttons>
                  <Buttons
                    className="w-auto bg-primary-transparent dark:bg-light border-none text-primary  text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]  ant-btn-loading-icon"
                    loading
                  >
                    Default
                  </Buttons>
                  <Buttons
                    className=" w-auto border-solid border-1 border-primary text-primary text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]  ant-btn-loading-icon bg-transparent dark:bg-light"
                    loading
                  >
                    Default
                  </Buttons>
                  <Buttons
                    className="w-auto text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px] dark:text-white/[.87]  ant-btn-loading-icon bg-transparent"
                    loading
                  >
                    Default
                  </Buttons>
                  <Buttons
                    className="w-auto bg-light border-solid border-1 border-light text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]  ant-btn-loading-icon [&>span>span>svg]:text-white"
                    loading
                  >
                    Default
                  </Buttons>
                  <Buttons
                    className="w-auto text-[14px] font-semibold border-none shadow-btn leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px] ant-btn-loading-icon dark:bg-light dark:text-white/[.87]"
                    loading
                  >
                    Default
                  </Buttons>
                  <Buttons
                    className="w-auto bg-primary border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]  ant-btn-loading-icon [&>span>span>svg]:text-white"
                    loading
                  />
                  <Buttons
                    className="w-auto border-solid border-1 border-primary text-primary text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]  ant-btn-loading-icon bg-transparent dark:bg-light"
                    loading
                  />
                  <Buttons
                    className="w-auto text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px]  ant-btn-loading-icon bg-transparent dark:bg-light"
                    loading
                  />
                  <Buttons
                    className="w-auto bg-light border-solid border-1 border-light text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[44px] [&>span>span>svg]:text-white"
                    loading
                  />
                </div>
              </Cards>

              <Cards headless size="large" className="mb-[25px] p-0 ant-card-body-p-0">
                <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px] px-[25px] pt-[25px]">
                  Ghost
                </Heading>
                <div className="flex flex-wrap gap-x-[10px] gap-y-[10px] bg-gradient-to-r from-primary to-secondary p-[25px] rounded-b-[10px]">
                  <Buttons
                    className="hover:bg-white/40 text-white dark:text-white/[.87] hover:border-white/40 text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
                    ghost
                  >
                    Primary
                  </Buttons>
                  <Buttons
                    className="hover:bg-white/40 text-white dark:text-white/[.87] hover:border-white/40 text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
                    ghost
                  >
                    Secondary
                  </Buttons>
                  <Buttons
                    className="hover:bg-white/40 text-white dark:text-white/[.87] hover:border-white/40 text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
                    ghost
                  >
                    Default
                  </Buttons>
                </div>
              </Cards>
            </Col>
          </Row>
        </div>
      </>
    </>
  );
}

export default ButtonComponent;
