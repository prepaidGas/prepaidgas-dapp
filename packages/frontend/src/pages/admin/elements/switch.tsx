import { Row, Col, Switch } from 'antd';
import { PageHeaders } from '@/components/page-headers';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

function Switches() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Switch',
    },
  ];
  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Switch"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
          <Col md={12} sm={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Basic
                </h1>
              </div>
              <div className="p-[25px]">
                <Switch 
                  defaultChecked 
                  className="bg-[#c6c6c6] dark:bg-whiteDark [&.ant-switch-checked]:bg-primary"
                />
              </div>
            </div>
          </Col>
          <Col md={12} sm={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Size
                </h1>
              </div>
              <div className="flex items-center gap-5 p-[25px]">
                <Switch 
                  defaultChecked 
                  className="bg-[#c6c6c6] dark:bg-whiteDark [&.ant-switch-checked]:bg-primary"
                />
                <Switch 
                  defaultChecked 
                  size="small" 
                  className="bg-[#c6c6c6] dark:bg-whiteDark [&.ant-switch-checked]:bg-primary"
                />
              </div>
            </div>
          </Col>
          <Col md={12} sm={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Text With Icon
                </h1>
              </div>
              <div className="p-[25px]">
                <Switch 
                  checkedChildren="a" 
                  unCheckedChildren="b" 
                  defaultChecked 
                  className="mb-2 bg-[#c6c6c6] dark:bg-whiteDark [&.ant-switch-checked]:bg-primary"
                />
                <br />
                <Switch 
                  checkedChildren="1" 
                  unCheckedChildren="0" 
                  className="mb-2 bg-[#c6c6c6] dark:bg-whiteDark [&.ant-switch-checked]:bg-primary"
                />
                <br />
                <div className="flex items-center gap-5 [&>button>.ant-switch-inner]:flex [&>button>.ant-switch-inner]:items-center [&>button>.ant-switch-inner>.ant-switch-inner-checked]:flex">
                  <Switch 
                    checkedChildren={<CheckOutlined />} 
                    unCheckedChildren={<CloseOutlined />} 
                    defaultChecked 
                    className="bg-[#c6c6c6] dark:bg-whiteDark [&.ant-switch-checked]:bg-primary  [&>.ant-switch-inner>.ant-switch-inner-unchecked]:mt-0"
                  />
                  <Switch 
                    defaultChecked 
                    className="bg-[#c6c6c6] dark:bg-whiteDark [&.ant-switch-checked]:bg-primary"
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col md={12} sm={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  loading
                </h1>
              </div>
              <div className="p-[25px]">
                <Switch 
                  loading 
                  defaultChecked 
                  className="bg-[#c6c6c6] dark:bg-whiteDark [&.ant-switch-checked]:bg-primary"
                />
                <br />
                <Switch 
                  size="small" 
                  loading 
                  className="bg-[#c6c6c6] dark:bg-whiteDark [&.ant-switch-checked]:bg-primary"
                />
              </div>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default Switches;
