import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Spin, Row, Col, Switch } from 'antd';
import Heading from '@/components/heading'
import { Buttons } from '@/components/buttons';

const SettingsLayout = dynamic(() => import('./Layout'), {
  loading: () => (
    <div className="h-screen flex justify-center items-center">
      <Spin />
    </div>
  ),
});

function Notification() {

  const [notificationSwitchStates, setNotificationSwitchStates] = useState([false, false, false]);
  const [activitySwitchStates, setActivitySwitchStates] = useState([false, false, false]);

  const handleNotificationToggleAll = () => {
    const allChecked = notificationSwitchStates.every((state) => state);
    const updatedStates = notificationSwitchStates.map(() => !allChecked);
    setNotificationSwitchStates(updatedStates);
  };

  const handleNotificationSwitchChange = (index:number) => (checked:boolean) => {
    const updatedStates = [...notificationSwitchStates];
    updatedStates[index] = checked;
    setNotificationSwitchStates(updatedStates);
  };

  const handleActivityToggleAll = () => {
    const allChecked = activitySwitchStates.every((state) => state);
    const updatedStates = activitySwitchStates.map(() => !allChecked);
    setActivitySwitchStates(updatedStates);
  };

  const handleActivitySwitchChange = (index:number) => (checked:boolean) => {
    const updatedStates = [...activitySwitchStates];
    updatedStates[index] = checked;
    setActivitySwitchStates(updatedStates);
  };

  return (
    <>
      <SettingsLayout>
        <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
          <div className="py-[18px] px-[25px] sm:px-[15px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
            <Heading as="h4" className="mb-0 text-lg font-medium">
              Notifications
            </Heading>
            <span className="mb-0.5 text-light dark:text-white/60 text-13 font-normal">
              Choose What Notification you will Receive
            </span>
          </div>
          <div className="p-[25px] sm:px-[15px]">
              <Row gutter={15}>
                <Col xs={24} className="mb-[25px]">
                  <div className="notification-box-single">
                    <div className="bg-regularBG dark:bg-regularBGdark p-[25px] sm:px-[15px] border dark:border-white/10 rounded-[10px]">
                      <div className="flex items-center justify-between h-[50px]">
                        <Heading className="text-light dark:text-white/60 text-[15px] font-medium" as="h4">
                          Notifications
                        </Heading>
                        <Link 
                          className="text-info text-[13px]" 
                          href="#0"
                          onClick={handleNotificationToggleAll}
                        >
                          Toggle all
                        </Link>
                      </div>
                      <div className="bg-white dark:bg-[#202531] shadow-[0_5px_20px_rgba(173,181,217,0.05)] rounded-[10px] overflow-hidden">
                        <nav>
                          <ul className="mb-0">
                            <li className="flex items-center justify-between mb-0 px-[25px] py-[20px] border-b border-regular dark:border-white/10 [&>button]:bg-[#c6c6c6] [&>.ant-switch-checked]:bg-primary [&>button]:shadow-none gap-[15px]">
                              <div>
                                <Heading className="mb-0.5 text-body dark:text-white/60 text-sm font-medium" as="h4">
                                  Company News
                                </Heading>
                                <p className="mb-0 text-light dark:text-white/60">
                                  Get Company News, announcements, and product updates
                                </p>
                              </div>
                              <Switch checked={notificationSwitchStates[0]} onChange={handleNotificationSwitchChange(0)} />
                            </li>
                            <li className="flex items-center justify-between mb-0 px-[25px] py-[20px] border-b border-regular dark:border-white/10  [&>button]:bg-[#c6c6c6] [&>.ant-switch-checked]:bg-primary [&>button]:shadow-none gap-[15px]">
                              <div>
                                <Heading className="mb-0.5 text-body dark:text-white/60 text-sm font-medium" as="h4">
                                  Meetups Near you
                                </Heading>
                                <p className="mb-0 text-light dark:text-white/60">
                                  Get Company News, announcements, and product updates
                                </p>
                              </div>
                              <Switch checked={notificationSwitchStates[1]} onChange={handleNotificationSwitchChange(1)} />
                            </li>
                            <li className="flex items-center justify-between mb-0 px-[25px] py-[20px] border-b border-regular dark:border-white/10  [&>button]:bg-[#c6c6c6] [&>.ant-switch-checked]:bg-primary [&>button]:shadow-none gap-[15px]">
                              <div>
                                <Heading className="mb-0.5 text-body dark:text-white/60 text-sm font-medium" as="h4">
                                  Opportunities
                                </Heading>
                                <p className="mb-0 text-light dark:text-white/60">
                                  Get Company News, announcements, and product updates
                                </p>
                              </div>
                              <Switch checked={notificationSwitchStates[3]} onChange={handleNotificationSwitchChange(3)} />
                            </li>
                            <li className="flex items-center justify-between mb-0 px-[25px] py-[20px] border-b border-regular dark:border-white/10  [&>button]:bg-[#c6c6c6] [&>.ant-switch-checked]:bg-primary [&>button]:shadow-none gap-[15px]">
                              <div>
                                <Heading className="mb-0.5 text-body dark:text-white/60 text-sm font-medium" as="h4">
                                  Weekly News Letters
                                </Heading>
                                <p className="mb-0 text-light dark:text-white/60">
                                  Get Company News, announcements, and product updates
                                </p>
                              </div>
                              <Switch checked={notificationSwitchStates[4]} onChange={handleNotificationSwitchChange(4)} />
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={24}>
                  <div className="notification-box-single">
                    <div className="bg-regularBG dark:bg-regularBGdark p-[25px] sm:px-[15px] border dark:border-white/10 rounded-[10px]">
                      <div className="flex items-center justify-between h-[50px]">
                        <Heading className="text-light dark:text-white/60 text-[15px] font-medium" as="h4">
                          Account Activity
                        </Heading>
                        <Link 
                          className="text-info text-[13px]" 
                          href="#0"
                          onClick={handleActivityToggleAll}
                        >
                          Toggle all
                        </Link>
                      </div>
                      <div className="bg-white dark:bg-[#202531] shadow-[0_5px_20px_rgba(173,181,217,0.05)] rounded-[10px] overflow-hidden">
                        <nav>
                          <ul className="mb-0">
                            <li className="flex items-center justify-between mb-0 px-[25px] py-[20px] border-b border-regular dark:border-white/10  [&>button]:bg-[#c6c6c6] [&>.ant-switch-checked]:bg-primary [&>button]:shadow-none gap-[15px]">
                              <div>
                                <Heading className="mb-0.5 text-body dark:text-white/60 text-sm font-medium" as="h4">
                                  Company News
                                </Heading>
                                <p className="mb-0 text-light dark:text-white/60">
                                  Get Company News, announcements, and product updates
                                </p>
                              </div>
                              <Switch checked={activitySwitchStates[1]} onChange={handleActivitySwitchChange(1)} />
                            </li>
                            <li className="flex items-center justify-between mb-0 px-[25px] py-[20px] border-b border-regular dark:border-white/10  [&>button]:bg-[#c6c6c6] [&>.ant-switch-checked]:bg-primary [&>button]:shadow-none gap-[15px]">
                              <div>
                                <Heading className="mb-0.5 text-body dark:text-white/60 text-sm font-medium" as="h4">
                                  Meetups Near you
                                </Heading>
                                <p className="mb-0 text-light dark:text-white/60">
                                  Get Company News, announcements, and product updates
                                </p>
                              </div>
                              <Switch checked={activitySwitchStates[2]} onChange={handleActivitySwitchChange(2)} />
                            </li>
                            <li className="flex items-center justify-between mb-0 px-[25px] py-[20px] border-b border-regular dark:border-white/10  [&>button]:bg-[#c6c6c6] [&>.ant-switch-checked]:bg-primary [&>button]:shadow-none gap-[15px]">
                              <div>
                                <Heading className="mb-0.5 text-body dark:text-white/60 text-sm font-medium" as="h4">
                                  Opportunities
                                </Heading>
                                <p className="mb-0 text-light dark:text-white/60">
                                  Get Company News, announcements, and product updates
                                </p>
                              </div>
                              <Switch checked={activitySwitchStates[3]} onChange={handleActivitySwitchChange(3)} />
                            </li>
                            <li className="flex items-center justify-between mb-0 px-[25px] py-[20px] border-b border-regular dark:border-white/10  [&>button]:bg-[#c6c6c6] [&>.ant-switch-checked]:bg-primary [&>button]:shadow-none gap-[15px]">
                              <div>
                                <Heading className="mb-0.5 text-body dark:text-white/60 text-sm font-medium" as="h4">
                                  Weekly News Letters
                                </Heading>
                                <p className="mb-0 text-light dark:text-white/60">
                                  Get Company News, announcements, and product updates
                                </p>
                              </div>
                              <Switch checked={activitySwitchStates[4]} onChange={handleActivitySwitchChange(4)} />
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="flex items-center flex-wrap gap-[15px] mt-[50px] mb-[25px]">
                <Buttons size="default" type="primary" className="bg-primary hover:bg-primary-hbr text-white h-11 px-[20px]">
                  Update Email Notifications
                </Buttons>
                <Buttons
                  size="default"
                  type="extra-light"
                  className="h-11 px-5 bg-transparent hover:text-primary dark:text-white/[.87] border-[#d9d9d9] hover:border-primary dark:border-white/10 dark:hover:text-primary dark:hover:border-primary"
                >
                  Cancel
                </Buttons>
              </div>
          </div>
        </div>
      </SettingsLayout>
    </>
  );
}

export default Notification;
