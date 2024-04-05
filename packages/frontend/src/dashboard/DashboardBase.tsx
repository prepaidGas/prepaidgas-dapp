import { Row, Col } from 'antd';
import { PageHeaders } from '@/components/page-headers';
import { Cards } from '@/components/cards/frame/cards-frame';
import { Buttons } from '@/components/buttons';
import Heading from '@/components/heading';

function DashboardBase() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Theme Configuration',
    },
    {
      path: '',
      breadcrumbName: 'Theme Configuration',
    },
  ];
  return (
    <>
      <div>
        <PageHeaders
          routes={PageRoutes}
          title="Dashboard"
          className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        />
        <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
          <Row gutter={15}>
            <Col xs={24}>
              <div>
                <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                  <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                    Theme Colors
                  </Heading>
                  <div className="flex flex-wrap gap-x-[10px] gap-y-[10px]">
                    <div className="text-center">
                      <Buttons className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Primary
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#8231D3</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-secondary hover:bg-secondary-hbr border-solid border-1 border-secondary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Secondary
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#5840FF</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-success hover:bg-success-hbr border-solid border-1 border-success text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Success
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#01B81A</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-info hover:bg-info-hbr border-solid border-1 border-info text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Info
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#00AAFF</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-warning hover:bg-warning-hbr border-solid border-1 border-warning text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Warning
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#FA8B0C</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-danger hover:bg-danger-hbr border-solid border-1 border-danger text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Danger
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#ff4d4f</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-dark hover:bg-dark-hbr border-solid border-1 border-dark text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Dark
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#0A0A0A</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-theme-gray hover:bg-gray-hbr border-solid border-1 border-theme-gray text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Gray
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#404040</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-light hover:bg-light-hbr border-solid border-1 border-light text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Light
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#747474</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-light-extra hover:bg-light-extra-hbr border-solid border-1 border-light-extra text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Extra Light
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#A0A0A0</span>
                    </div>
                  </div>
                </Cards>
              </div>
            </Col>
            <Col xs={24}>
              <div>
                <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                  <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                    Hover Colors
                  </Heading>
                  <div className="flex flex-wrap gap-x-[10px] gap-y-[10px]">
                    <div className="text-center">
                      <Buttons className="hover:bg-primary bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Primary
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#6726A8</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="hover:bg-secondary bg-secondary-hbr border-solid border-1 border-secondary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Secondary
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#3520C8</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="hover:bg-success bg-success-hbr border-solid border-1 border-success text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Success
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#0D811D</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="hover:bg-info bg-info-hbr border-solid border-1 border-info text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Info
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#0787C7</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="hover:bg-warning bg-warning-hbr border-solid border-1 border-warning text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Warning
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#D9790A</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="hover:bg-danger bg-danger-hbr border-solid border-1 border-danger text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Danger
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#CB0000</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="hover:bg-dark bg-dark-hbr border-solid border-1 border-dark text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Dark
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#272525</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="hover:bg-theme-gray bg-gray-hbr border-solid border-1 border-theme-gray text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Gray
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#585858</span>
                    </div>
                  </div>
                </Cards>
              </div>
            </Col>
            <Col xs={24}>
              <div>
                <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                  <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                    Transparent Colors
                  </Heading>
                  <div className="flex flex-wrap gap-x-[10px] gap-y-[10px]">
                    <div className="text-center">
                      <Buttons className="bg-primary-transparent hover:bg-primary-hbr border-none text-primary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Primary
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#8231D3</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-secondary-transparent hover:bg-secondary-hbr border-none text-secondary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Secondary
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#5840FF</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-success-transparent hover:bg-success-hbr border-none text-success hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Success
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#01B81A</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-info-transparent hover:bg-info-hbr border-none text-info hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Info
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#00AAFF</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-warning-transparent hover:bg-warning-hbr border-none text-warning hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Warning
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#FA8B0C</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-danger-transparent hover:bg-danger-hbr border-none text-danger hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Danger
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#ff4d4f</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-dark-transparent hover:bg-dark-hbr border-none text-dark dark:text-white/[.87] hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Dark
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#0A0A0A</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-theme-gray-transparent dark:bg-white/30 hover:bg-gray-hbr dark:hover:bg-white/10 border-none text-theme-gray dark:text-white/60 hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Gray
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#404040</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-active-transparent hover:bg-success-hbr border-none text-active hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Active
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#01B81A</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-deactivated-transparent hover:bg-warning-hbr border-none text-deactivated hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Deactivated
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#fa8b0c</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-blocked-transparent hover:bg-danger-hbr border-none text-blocked hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Blocked
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#ff0f0f</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-early border-none text-white dark:text-white/[.87] hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Early
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#01b81a</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-late border-none text-white dark:text-white/[.87] hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Late
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#fa8b0c</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-warning border-none text-white dark:text-white/[.87] hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Late
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#fa8b0c</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-progress border-none text-white dark:text-white/[.87] hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Progress
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#ff4d4f</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-complete border-none text-white dark:text-white/[.87] hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Complete
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#01b81a</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-done-transparent hover:bg-success-hbr border-none text-done hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Done
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#01B81A</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-pending-transparent hover:bg-warning-hbr border-none text-pending hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Pending
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#fa8b0c</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-violet border-none text-white hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Pending
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#5840ff</span>
                    </div>
                  </div>
                </Cards>
              </div>
            </Col>
            <Col xs={24}>
              <div>
                <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                  <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                    Social Colors
                  </Heading>
                  <div className="flex flex-wrap gap-x-[10px] gap-y-[10px]">
                    <div className="text-center">
                      <Buttons className="bg-google-transparent border-solid border-1 border-google text-google text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Google
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#f14336</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-google-plus-transparent border-solid border-1 border-google-plus text-google-plus text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Google Plus
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#f06548</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-facebook-transparent border-solid border-1 border-facebook text-facebook text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Facebook
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#1976d2</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-twitter-transparent border-solid border-1 border-twitter text-twitter text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Twitter
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#03a9f4</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-twitter-transparent border-solid border-1 border-dribbble text-dribbble text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Dribble
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#c2185b</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-linkedin-transparent border-solid border-1 border-linkedin text-linkedin text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Linkedin
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#007ab9</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-instagram-transparent border-solid border-1 border-instagram text-instagram text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Instagram
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#d1208f</span>
                    </div>
                  </div>
                </Cards>
              </div>
            </Col>
            <Col xs={24}>
              <div>
                <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                  <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                    Border Colors
                  </Heading>
                  <div className="flex flex-wrap gap-x-[10px] gap-y-[10px]">
                    <div className="text-center">
                      <Buttons className="bg-transparent hover:bg-primary-hbr border-1 border-style border-primary text-primary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Primary
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#8231D3</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-transparent hover:bg-secondary-hbr border-1 border-style border-secondary text-secondary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Secondary
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#5840FF</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-transparent hover:bg-success-hbr border-1 border-style border-success text-success hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Success
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#01B81A</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-transparent hover:bg-info-hbr border-1 border-style border-info text-info hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Info
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#00AAFF</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-transparent hover:bg-warning-hbr border-1 border-style border-warning text-warning hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Warning
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#FA8B0C</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-transparent hover:bg-danger-hbr border-1 border-style border-danger text-danger hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Danger
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#ff4d4f</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-transparent hover:bg-dark-hbr border-1 border-style border-dark text-dark dark:text-white/[.87] hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Dark
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#0A0A0A</span>
                    </div>
                    <div className="text-center">
                      <Buttons className="bg-transparent hover:bg-gray-hbr border-1 border-style border-theme-gray text-theme-gray dark:text-white/60 hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn">
                        Gray
                      </Buttons>
                      <span className="block text-dark dark:text-white/[.87] mt-[5px]">#404040</span>
                    </div>
                  </div>
                </Cards>
              </div>
            </Col>
            <Col xs={24}>
              <div>
                <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                  <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                    Gradient Colors
                  </Heading>
                  <Row gutter={15} className="gap-y-[15px]">
                    <Col md={5}>
                      <div className="bg-gradient-to-r from-primary flex items-center justify-between rounded-[10px] py-[35px] px-[20px] text-white dark:text-white/[.87] h-[100px] overflow-auto">
                        <span className="sm:me-5 me-0 fs-15">#8231D3</span>
                      </div>
                    </Col>
                    <Col md={5}>
                      <div className="bg-gradient-to-r from-primary to-secondary flex items-center justify-between gap-[15px] rounded-[10px] py-[35px] px-[20px] text-white dark:text-white/[.87] h-[100px] overflow-auto">
                        <span className="sm:me-5 me-0 fs-15">#8231D3</span>
                        <span className="sm:ms-5 fs-15">#5840FF</span>
                      </div>
                    </Col>
                    <Col md={5}>
                      <div className="bg-gradient-to-r from-primary via-secondary to-primary flex items-center justify-between gap-[15px] rounded-[10px] py-[35px] px-[20px] text-white dark:text-white/[.87] h-[100px]">
                        <span className="sm:me-5 me-0 fs-15">#8231D3</span>
                        <span className="ms-5 fs-15">#5840FF</span>
                        <span className="sm:me-5 me-0 fs-15">#8231D3</span>
                      </div>
                    </Col>
                  </Row>
                </Cards>
              </div>
            </Col>
            <Col xs={24}>
              <div>
                <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                  <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                    Border Colors
                  </Heading>
                  <Row gutter={15} className="gap-y-[15px]">
                    <Col xxl={6} md={8} sm={12} xs={24}>
                      <div className="flex items-center justify-between h-[48px] px-[20px] border-1 border-solid dark:border-white/10 rounded-[4px] gap-[15px]">
                        <span className="text-[15px] text-theme-gray dark:text-white/60">Border color 1</span>
                        <span className="text-[14px] text-dark dark:text-white/[.87] font-medium">#F1F2F6</span>
                      </div>
                    </Col>
                    <Col xxl={6} md={8} sm={12} xs={24}>
                      <div className="flex items-center justify-between h-[48px] px-[20px] border-1 border-solid border-normal dark:border-white/10 rounded-[4px] gap-[15px]">
                        <span className="text-[15px] text-theme-gray dark:text-white/60">Border color 2</span>
                        <span className="text-[14px] text-dark dark:text-white/[.87] font-medium">#E3E6EF</span>
                      </div>
                    </Col>
                    <Col xxl={6} md={8} sm={12} xs={24}>
                      <div className="flex items-center justify-between h-[48px] px-[20px] border-1 border-solid border-deep dark:border-white/10 rounded-[4px] gap-[15px]">
                        <span className="text-[15px] text-theme-gray dark:text-white/60">Border color 2</span>
                        <span className="text-[14px] text-dark dark:text-white/[.87] font-medium">#C6D0DC</span>
                      </div>
                    </Col>
                  </Row>
                </Cards>
              </div>
            </Col>
            <Col xs={24}>
              <div>
                <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                  <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                    Background Gray Colors
                  </Heading>
                  <Row gutter={15} className="gap-y-[15px]">
                    <Col xxl={6} md={8} xs={24}>
                      <div className="flex items-center justify-between h-[48px] px-[20px] bg-regularBG dark:bg-regularBGdark rounded-[4px] gap-[15px]">
                        <span className="text-[15px] text-theme-gray dark:text-white/60">BG color 1</span>
                        <span className="text-[14px] text-dark dark:text-white/[.87] font-medium">#F8F9FB</span>
                      </div>
                    </Col>
                    <Col xxl={6} md={8} xs={24}>
                      <div className="flex items-center justify-between h-[48px] px-[20px] bg-normalBG dark:bg-normalBGdark rounded-[4px]gap-[15px]">
                        <span className="text-[15px] text-theme-gray dark:text-white/60">BG color 2</span>
                        <span className="text-[14px] text-dark dark:text-white/[.87] font-medium">#F4F5F7</span>
                      </div>
                    </Col>
                    <Col xxl={6} md={8} xs={24}>
                      <div className="flex items-center justify-between h-[48px] px-[20px] bg-deepBG dark:bg-deepBGdark rounded-[4px] gap-[15px]">
                        <span className="text-[15px] text-theme-gray dark:text-white/60">BG color 3</span>
                        <span className="text-[14px] text-dark dark:text-white/[.87] font-medium">#EFF0F3</span>
                      </div>
                    </Col>
                  </Row>
                </Cards>
              </div>
            </Col>
            <Col xs={24}>
              <div>
                <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                  <Heading className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]">
                    Buttons
                  </Heading>
                  <Row gutter={15}>
                    <Col>
                      <div className="flex flex-wrap gap-y-[15px]">
                        <div className="flex flex-wrap items-center gap-x-[10px] md:gap-y-[40px] gap-y-[20px] w-full">
                          <Buttons className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[32px] shadow-btn">
                            Extra Small
                          </Buttons>
                          <Buttons
                            className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[38px] shadow-btn"
                            raised
                          >
                            Small
                          </Buttons>
                          <Buttons
                            className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px] shadow-btn"
                            raised
                          >
                            Normal
                          </Buttons>
                          <Buttons
                            className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[50px] shadow-btn"
                            raised
                          >
                            Large Buttons
                          </Buttons>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-[10px] md:gap-y-[40px] gap-y-[20px] w-full">
                          <Buttons className="bg-transparent hover:bg-primary-hbr border-solid border-1 border-primary text-primary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[32px]">
                            Extra Small
                          </Buttons>
                          <Buttons className="bg-transparent hover:bg-primary-hbr border-solid border-1 border-primary text-primary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[38px]">
                            Small
                          </Buttons>
                          <Buttons className="bg-transparent hover:bg-primary-hbr border-solid border-1 border-primary text-primary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                            Normal
                          </Buttons>
                          <Buttons className="bg-transparent hover:bg-primary-hbr border-solid border-1 border-primary text-primary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[50px]">
                            Large Buttons
                          </Buttons>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-[10px] md:gap-y-[40px] gap-y-[20px] w-full">
                          <Buttons className="bg-primary-transparent text-primary border-none text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[32px]">
                            Extra Small
                          </Buttons>
                          <Buttons className="bg-primary-transparent text-primary border-none text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[38px]">
                            Small
                          </Buttons>
                          <Buttons className="bg-primary-transparent text-primary border-none text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
                            Normal
                          </Buttons>
                          <Buttons className="bg-primary-transparent text-primary border-none text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[50px]">
                            Large Buttons
                          </Buttons>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Cards>
              </div>
            </Col>
            <Col xs={24}>
              <div>
                <Cards
                  headless
                  title={
                    <span className='className="text-dark dark:text-white/[.87] font-semibold text-[20px] leading-[24px] mb-[15px]'>
                      Typography <span className="text-primary">Jost</span>
                    </span>
                  }
                  size="large"
                  className="mb-[25px] ant-card-body-p-25"
                >
                  <div className="hexadash-heading-typography">
                    <Row gutter={15} className="gap-y-[15px]">
                      <Col xs={24}>
                        <Row align="middle">
                          <Col lg={9} sm={24} xs={24}>
                            <Heading
                              as="h1"
                              className="text-dark dark:text-white/[.87] text-[30px] font-semibold leading-[38px] mb-[20px]"
                            >
                              h1. Default Heading
                            </Heading>
                          </Col>
                          <Col lg={4} sm={24} xs={24}>
                            <p className="text-primary">Font Size - 30px</p>
                          </Col>
                          <Col lg={4} sm={24} xs={24}>
                            <p className="text-secondary">Font weight - 600</p>
                          </Col>
                          <Col lg={4} sm={24} xs={24}>
                            <p className="text-info">Line Height - 38px</p>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={24}>
                        <Row align="middle">
                          <Col lg={9} sm={24} xs={24}>
                            <Heading
                              as="h2"
                              className="text-dark dark:text-white/[.87] text-[24px] font-semibold leading-[30px] mb-[20px]"
                            >
                              h2. Default Heading
                            </Heading>
                          </Col>
                          <Col lg={4} sm={24} xs={24}>
                            <p className="text-primary">Font Size - 24px</p>
                          </Col>
                          <Col lg={4} sm={24} xs={24}>
                            <p className="text-secondary">Font weight - 600</p>
                          </Col>
                          <Col lg={4} sm={24} xs={24}>
                            <p className="text-info">Line Height - 30px</p>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={24}>
                        <Row align="middle">
                          <Col lg={9} sm={24} xs={24}>
                            <Heading
                              as="h3"
                              className="text-dark dark:text-white/[.87] text-[22px] font-semibold leading-[27px] mb-[20px]"
                            >
                              h3. Default Heading
                            </Heading>
                          </Col>
                          <Col lg={4} sm={24} xs={24}>
                            <p className="text-primary">Font Size - 22px</p>
                          </Col>
                          <Col lg={4} sm={24} xs={24}>
                            <p className="text-secondary">Font weight - 600</p>
                          </Col>
                          <Col lg={4} sm={24} xs={24}>
                            <p className="text-info">Line Height - 27px</p>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={24}>
                        <Row align="middle">
                          <Col lg={9} sm={24} xs={24}>
                            <Heading
                              as="h4"
                              className="text-dark dark:text-white/[.87] text-[20px] font-semibold leading-[24px] mb-[20px]"
                            >
                              h4. Default Heading
                            </Heading>
                          </Col>
                          <Col lg={4} sm={24} xs={24}>
                            <p className="text-primary">Font Size - 20px</p>
                          </Col>
                          <Col lg={4} sm={24} xs={24}>
                            <p className="text-secondary">Font weight - 600</p>
                          </Col>
                          <Col lg={4} sm={24} xs={24}>
                            <p className="text-info">Line Height - 24px</p>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={24}>
                        <Row align="middle">
                          <Col lg={9} sm={24} xs={24}>
                            <Heading
                              as="h5"
                              className="text-dark dark:text-white/[.87] text-[18px] font-semibold leading-[22px] mb-[20px]"
                            >
                              h5. Default Heading
                            </Heading>
                          </Col>
                          <Col lg={4} sm={24} xs={24}>
                            <p className="text-primary">Font Size - 18px</p>
                          </Col>
                          <Col lg={4} sm={24} xs={24}>
                            <p className="text-secondary">Font weight - 600</p>
                          </Col>
                          <Col lg={4} sm={24} xs={24}>
                            <p className="text-info">Line Height - 22px</p>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={24}>
                        <Row align="middle">
                          <Col lg={9} sm={24} xs={24}>
                            <Heading
                              as="h6"
                              className="text-dark dark:text-white/[.87] text-[16px] font-semibold leading-[20px] mb-[20px]"
                            >
                              h6. Default Heading
                            </Heading>
                          </Col>
                          <Col lg={4} sm={24} xs={24}>
                            <p className="text-primary">Font Size - 16px</p>
                          </Col>
                          <Col lg={4} sm={24} xs={24}>
                            <p className="text-secondary">Font weight - 600</p>
                          </Col>
                          <Col lg={4} sm={24} xs={24}>
                            <p className="text-info">Line Height - 20px</p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Cards>
              </div>
            </Col>
            <Col xs={24}>
              <div>
                <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                  <div>
                    <div>
                      <Heading as="h5">Body Text Normal</Heading>
                      <ul className="flex flex-wrap gap-x-[20px] gap-y-[10px]">
                        <li className="text-primary">Font Size - 15px</li>
                        <li className="text-secondary">Font weight - 400</li>
                        <li className="text-success">Line height - 25px</li>
                      </ul>
                      <p className="text-[15px] font-normal dark:text-white/60 leading-[25px] ">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <Heading as="h5">Body Text Small</Heading>
                      <ul className="flex flex-wrap gap-[20px] gap-y-[10px]">
                        <li className="text-primary">Font Size - 14px</li>
                        <li className="text-secondary">Font weight - 400</li>
                        <li className="text-success">Line height - 22px</li>
                      </ul>
                      <p className="text-[14px] font-normal leading-[22px]  text-theme-gray dark:text-white/60">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <Heading as="h5">Body Text Big</Heading>
                      <ul className="flex flex-wrap gap-[20px] gap-y-[10px]">
                        <li className="text-primary">Font Size - 16px</li>
                        <li className="text-secondary">Font weight - 400</li>
                        <li className="text-success">Line height - 27px</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[16px] font-normal leading-[27px] text-theme-gray dark:text-white/60">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                      </p>
                    </div>
                  </div>
                </Cards>
              </div>
            </Col>
          </Row>
        </main>
      </div>
    </>
  );
}

export default DashboardBase;
