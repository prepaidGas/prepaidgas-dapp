import React, { useState, CSSProperties } from 'react';
import { Row, Col, Collapse, theme, CollapseProps } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { PageHeaders } from '@/components/page-headers';

function Collapses() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Collapse',
    },
  ];
  const [state, setstate] = useState({
    key: 0,
  });
  const onChange = (key: string | string[]) => {
  };

  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: <p>{text}</p>,
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: <p>{text}</p>,
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: <p>{text}</p>,
    },
  ];

  const itemsNest: CollapseProps['items'] = [
    {
      key: '1',
      label: 'This is panel nest panel',
      children: <p>{text}</p>,
    },
  ];
  
  const itemsMain: CollapseProps['items'] = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: <Collapse className="bg-transparent border-regular dark:border-white/10 [&>.ant-collapse-item]:border-regular dark:[&>.ant-collapse-item]:border-white/10 [&>.ant-collapse-item>.ant-collapse-content]:border-regular dark:[&>.ant-collapse-item>.ant-collapse-content]:border-white/10 [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>.anticon>svg]:w-2" defaultActiveKey="1" items={itemsNest} />,
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: <p>{text}</p>,
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: <p>{text}</p>,
    },
  ];

  const noArrow: CollapseProps['items'] = [
    {
      key: '1',
      label: 'This is panel header with arrow icon',
      children: <p>{text}</p>,
    },
    {
      key: '2',
      label: 'This is panel header with no arrow icon',
      children: <p>{text}</p>,
      showArrow: false,
    },
  ];

  const borderLessText = (
    <p style={{ paddingLeft: 24 }}>
      A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
      as a welcome guest in many households across the world.
    </p>
  );
  const borderLessItems: CollapseProps['items'] = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: borderLessText,
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: borderLessText,
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: borderLessText,
    },
  ];

  const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
    {
      key: '1',
      label: 'This is panel header 1',
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: <p>{text}</p>,
      style: panelStyle,
    },
  ];


  return (
    
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Collapse"
        routes={PageRoutes}
      />
      <>
        <div className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
          <>
            <Row gutter={25}>
              <Col md={12}>
                <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                  <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                      Basic
                    </h1>
                  </div>
                  <div className="p-[25px]">
                    <Collapse defaultActiveKey={['1']} onChange={onChange} items={items} className="bg-transparent border-regular dark:border-white/10 [&>.ant-collapse-item]:border-regular dark:[&>.ant-collapse-item]:border-white/10 [&>.ant-collapse-item>.ant-collapse-content]:border-regular dark:[&>.ant-collapse-item>.ant-collapse-content]:border-white/10 [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>.anticon>svg]:w-2">
                    </Collapse>
                  </div>
                </div>
                <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                  <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                      Nested panel
                    </h1>
                  </div>
                  <div className="p-[25px]">
                    <Collapse onChange={onChange} items={itemsMain} className="bg-transparent border-regular dark:border-white/10 [&>.ant-collapse-item]:border-regular dark:[&>.ant-collapse-item]:border-white/10 [&>.ant-collapse-item>.ant-collapse-content]:border-regular dark:[&>.ant-collapse-item>.ant-collapse-content]:border-white/10 [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>.anticon>svg]:w-2">
                    </Collapse>
                  </div>
                </div>
                <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                  <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                      No Arrow
                    </h1>
                  </div>
                  <div className="p-[25px]">
                    <Collapse defaultActiveKey={['1']} onChange={onChange} items={noArrow} className="bg-transparent border-regular dark:border-white/10 [&>.ant-collapse-item]:border-regular dark:[&>.ant-collapse-item]:border-white/10 [&>.ant-collapse-item>.ant-collapse-content]:border-regular dark:[&>.ant-collapse-item>.ant-collapse-content]:border-white/10 [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>.anticon>svg]:w-2">
                    </Collapse>
                  </div>
                </div>
              </Col>
              <Col md={12}>
                <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                  <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                      Accordion
                    </h1>
                  </div>
                  <div className="p-[25px]">
                    <Collapse defaultActiveKey={['1']} accordion items={items} className="bg-transparent border-regular dark:border-white/10 [&>.ant-collapse-item]:border-regular dark:[&>.ant-collapse-item]:border-white/10 [&>.ant-collapse-item>.ant-collapse-content]:border-regular dark:[&>.ant-collapse-item>.ant-collapse-content]:border-white/10 [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>.anticon>svg]:w-2">
                    </Collapse>
                  </div>
                </div>
                <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                  <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                      Borderless
                    </h1>
                  </div>
                  <div className="p-[25px]">
                    <Collapse items={borderLessItems} defaultActiveKey={['1']} bordered={false} className="bg-transparent border-regular dark:border-white/10 [&>.ant-collapse-item]:border-regular dark:[&>.ant-collapse-item]:border-white/10 [&>.ant-collapse-item>.ant-collapse-content]:border-regular dark:[&>.ant-collapse-item>.ant-collapse-content]:border-white/10 [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>.anticon>svg]:w-2">
                    </Collapse>
                  </div>
                </div>
                <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                  <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                      Custom Panel
                    </h1>
                  </div>
                  <div className="p-[25px]">
                    <Collapse
                      bordered={false}
                      defaultActiveKey={['1']}
                      expandIcon={({ isActive }) => <RightOutlined rotate={isActive ? 90 : 0} />}
                      style={{ background: token.colorBgContainer }}
                      items={getItems(panelStyle)}
                      className="bg-transparent border-regular dark:border-white/10 [&>.ant-collapse-item]:border-regular dark:[&>.ant-collapse-item]:border-white/10 [&>.ant-collapse-item>.ant-collapse-content]:border-regular dark:[&>.ant-collapse-item>.ant-collapse-content]:border-white/10 [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>.anticon>svg]:w-2"
                    >

                    </Collapse>
                  </div>
                </div>
              </Col>
            </Row>
          </>
        </div>
      </>
    </>
  );
}

export default Collapses;
