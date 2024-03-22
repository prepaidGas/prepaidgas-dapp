import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Avatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { PageHeaders } from '@/components/page-headers';
import { Buttons } from '@/components/buttons';

const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

function Avatars() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Avatar',
    },
  ];
  const rtl = useSelector((state:any) => state.ChangeLayoutMode.rtlData);
  const [user, setUser]:any = useState(UserList[0]);
  const [color, setColor] = useState(ColorList[0]);
  const changeUser = () => {
    const index = UserList.indexOf(user);
    setUser(index < UserList.length - 1 ? UserList[index + 1] : UserList[0]);
    setColor(index < ColorList.length - 1 ? ColorList[index + 1] : ColorList[0]);
  };

  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Avatar"
        routes={PageRoutes}
      />
      <>
        <div className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
          <Row gutter={25}>
            <Col md={12} sm={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Basic
                  </h1>
                </div>
                <div className="p-[25px]">
                  <div className="flex items-center gap-[10px] mb-[30px]" style={{ marginBottom: 10 }}>
                    <Avatar className="inline-flex items-center justify-center" size={64} icon={<UserOutlined />} />
                    <Avatar className="inline-flex items-center justify-center" size="large" icon={<UserOutlined />} />
                    <Avatar className="inline-flex items-center justify-center" icon={<UserOutlined />} />
                    <Avatar className="inline-flex items-center justify-center" size="small" icon={<UserOutlined />} />
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <Avatar
                      className="inline-flex items-center justify-center"
                      shape="square"
                      size={64}
                      icon={<UserOutlined />}
                    />
                    <Avatar
                      className="inline-flex items-center justify-center"
                      shape="square"
                      size="large"
                      icon={<UserOutlined />}
                    />
                    <Avatar
                      className="inline-flex items-center justify-center"
                      shape="square"
                      icon={<UserOutlined />}
                    />
                    <Avatar
                      className="inline-flex items-center justify-center"
                      shape="square"
                      size="small"
                      icon={<UserOutlined />}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Autoset Font Size
                  </h1>
                </div>
                <div>
                  <div className="p-[25px]">
                    <Avatar style={{ backgroundColor: color, verticalAlign: 'middle' }} size="large">
                      {user}
                    </Avatar>
                    <Buttons
                      size="extra-small"
                      className="btn-outlined font-semibold dark:bg-transparent border border-[#e3e6e9] dark:border-white/10 px-2"
                      type="light"
                      outlined
                      style={{ margin: '0 10px', verticalAlign: 'middle', color: '#ADB4D2' }}
                      onClick={changeUser}
                    >
                      Change
                    </Buttons>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={12} sm={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Type
                  </h1>
                </div>
                <div className="flex items-center gap-[10px] p-[25px]">
                  <Avatar className="inline-flex items-center justify-center" icon={<UserOutlined />} />
                  <Avatar className="inline-flex items-center justify-center" icon={<UserOutlined />} />
                  <Avatar className="inline-flex items-center justify-center">U</Avatar>
                  <Avatar className="inline-flex items-center justify-center">USER</Avatar>
                  <Avatar
                    className="inline-flex items-center justify-center"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                  <Avatar
                    className="inline-flex items-center justify-center"
                    style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                  >
                    U
                  </Avatar>
                  <Avatar
                    className="inline-flex items-center justify-center"
                    style={{ backgroundColor: '#01B81A' }}
                    icon={<UserOutlined />}
                  />
                </div>
              </div>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    With Badge
                  </h1>
                </div>
                <div className="flex items-center gap-[10px] p-[25px]">
                  <span style={{ [!rtl ? 'marginRight' : 'marginLeft']: 10 }}>
                    <Badge count={1} className="[&>sup]:text-white [&>sup]:border-white">
                      <Avatar
                        className="inline-flex items-center justify-center"
                        shape="square"
                        icon={<UserOutlined />}
                      />
                    </Badge>
                  </span>
                  <span>
                    <Badge dot className="[&>sup]:border-white">
                      <Avatar
                        className="inline-flex items-center justify-center"
                        shape="square"
                        icon={<UserOutlined />}
                      />
                    </Badge>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </>
    </>
  );
}

export default Avatars;
