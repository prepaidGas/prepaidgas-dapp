import { useState } from 'react';
import { Row, Col } from 'antd';
import { CasCader } from '@/components/cascader';
import { PageHeaders } from '@/components/page-headers';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    isLeaf: false,
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    isLeaf: false,
  },
];

function CasCaders() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'CasCader',
    },
  ];
  
  const [state, setState]:any = useState({
    value: null,
    loading: [],
  });
  const onChange = (value:string) => {
    setState({ ...state, value });
  };

  interface SelectedOptionType {
    label: string;
    value: string;
  }

  const onChangeLoading = (value:string, selectedOptions:SelectedOptionType[]) => {
    setState({ ...state, loading: [value, selectedOptions] });
  };

  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Cascader"
        routes={PageRoutes}
      />
      <>
        <div className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
          <Row gutter={25}>
            <Col md={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Basic
                  </h1>
                </div>
                <div className="p-[25px] [&>.ant-select>.ant-select-selector]:h-10 [&>.ant-select>.ant-select-selector]:px-3 [&>.ant-select>.ant-select-selector>.ant-select-selection-placeholder]:leading-[38px] [&>.ant-select>.ant-select-selector>.ant-select-selection-item]:leading-[38px] [&>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-select-focused>.ant-select-selector]:border-primary [&>.ant-select-single]:h-[40px]">
                  <CasCader onChange={onChange} data={options} />
                </div>
              </div>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Disabled option
                  </h1>
                </div>
                <div className="p-[25px] [&>.ant-select>.ant-select-selector]:h-10 [&>.ant-select>.ant-select-selector]:px-3 [&>.ant-select>.ant-select-selector>.ant-select-selection-placeholder]:leading-[38px] [&>.ant-select>.ant-select-selector>.ant-select-selection-item]:leading-[38px] [&>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-select-focused>.ant-select-selector]:border-primary [&>.ant-select-single]:h-[40px]">
                  <CasCader onChange={onChange} data={options} />
                </div>
              </div>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Size
                  </h1>
                </div>
                <div className="p-[25px]">
                  <div className="mb-[25px] [&>.ant-select>.ant-select-selector]:h-10 [&>.ant-select>.ant-select-selector]:px-3 [&>.ant-select>.ant-select-selector>.ant-select-selection-placeholder]:leading-[38px] [&>.ant-select>.ant-select-selector>.ant-select-selection-item]:leading-[38px] [&>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-select-focused>.ant-select-selector]:border-primary [&>.ant-select-single]:h-[40px]">
                    <CasCader size="large" onChange={onChange} data={options} />
                  </div>
                  <div className="mb-[25px] [&>.ant-select>.ant-select-selector]:h-10 [&>.ant-select>.ant-select-selector]:px-3 [&>.ant-select>.ant-select-selector>.ant-select-selection-placeholder]:leading-[38px] [&>.ant-select>.ant-select-selector>.ant-select-selection-item]:leading-[38px] [&>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-select-focused>.ant-select-selector]:border-primary [&>.ant-select-single]:h-[40px]">
                    <CasCader onChange={onChange} data={options} />
                  </div>
                  <div className="mb-[25px] [&>.ant-select>.ant-select-selector]:h-10 [&>.ant-select>.ant-select-selector]:px-3 [&>.ant-select>.ant-select-selector>.ant-select-selection-placeholder]:leading-[38px] [&>.ant-select>.ant-select-selector>.ant-select-selection-item]:leading-[38px] [&>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-select-focused>.ant-select-selector]:border-primary [&>.ant-select-single]:h-[40px]">
                    <CasCader size="small" onChange={onChange} data={options} />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Search
                  </h1>
                </div>
                <div className="p-[25px] [&>.ant-select>.ant-select-selector]:h-10 [&>.ant-select>.ant-select-selector]:px-3 [&>.ant-select>.ant-select-selector>.ant-select-selection-placeholder]:leading-[38px] [&>.ant-select>.ant-select-selector>.ant-select-selection-item]:leading-[38px] [&>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-select-focused>.ant-select-selector]:border-primary [&>.ant-select-single]:h-[40px]">
                  <CasCader onChange={onChange} data={options} isShowSearch />
                </div>
              </div>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Custom Field Names
                  </h1>
                </div>
                <div className="p-[25px] [&>.ant-select>.ant-select-selector]:h-10 [&>.ant-select>.ant-select-selector]:px-3 [&>.ant-select>.ant-select-selector>.ant-select-selection-placeholder]:leading-[38px] [&>.ant-select>.ant-select-selector>.ant-select-selection-item]:leading-[38px] [&>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-select-focused>.ant-select-selector]:border-primary [&>.ant-select-single]:h-[40px]">
                  <CasCader fieldNames={{ label: 'name', value: 'code', children: 'items' }} onChange={onChange} data={options} />
                </div>
              </div>
            </Col>

            <Col md={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Default Value
                  </h1>
                </div>
                <div className="p-[25px] [&>.ant-select>.ant-select-selector]:h-10 [&>.ant-select>.ant-select-selector]:px-3 [&>.ant-select>.ant-select-selector>.ant-select-selection-placeholder]:leading-[38px] [&>.ant-select>.ant-select-selector>.ant-select-selection-item]:leading-[38px] [&>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-select-focused>.ant-select-selector]:border-primary [&>.ant-select-single]:h-[40px]">
                  <CasCader onChange={onChange} data={options} defaultValue={['zhejiang', 'hangzhou', 'xihu']} />
                </div>
              </div>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Hover
                  </h1>
                </div>
                <div className="p-[25px] [&>.ant-select>.ant-select-selector]:h-10 [&>.ant-select>.ant-select-selector]:px-3 [&>.ant-select>.ant-select-selector>.ant-select-selection-placeholder]:leading-[38px] [&>.ant-select>.ant-select-selector>.ant-select-selection-item]:leading-[38px] [&>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-select-focused>.ant-select-selector]:border-primary [&>.ant-select-single]:h-[40px]">
                  <CasCader onChange={onChange} data={options} trigger="hover" />
                </div>
              </div>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Change on select
                  </h1>
                </div>
                <div className="p-[25px] [&>.ant-select>.ant-select-selector]:h-10 [&>.ant-select>.ant-select-selector]:px-3 [&>.ant-select>.ant-select-selector>.ant-select-selection-placeholder]:leading-[38px] [&>.ant-select>.ant-select-selector>.ant-select-selection-item]:leading-[38px] [&>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-select-focused>.ant-select-selector]:border-primary [&>.ant-select-single]:h-[40px]">
                  <CasCader onChange={onChange} data={options} changeOnSelect />
                </div>
              </div>
              <div className="custom-cascade-render">
                <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                  <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                      Custom render
                    </h1>
                  </div>
                  <div className="p-[25px] [&>.ant-select>.ant-select-selector]:h-10 [&>.ant-select>.ant-select-selector]:px-3 [&>.ant-select>.ant-select-selectorR>.ant-select-selection-placeholder]:leading-[38px] [&>.ant-select>.ant-select-selector>.ant-select-selection-item]:leading-[38px] [&>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-select-focused>.ant-select-selector]:border-primary [&>.ant-select-single]:h-[40px]">
                    <CasCader onChange={onChange} data={options} />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Lazy Load
                  </h1>
                </div>
                <div className="p-[25px] [&>.ant-select>.ant-select-selector]:h-10 [&>.ant-select>.ant-select-selector]:px-3 [&>.ant-select>.ant-select-selector>.ant-select-selection-placeholder]:leading-[38px] [&>.ant-select>.ant-select-selector>.ant-select-selection-item]:leading-[38px] [&>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-select-focused>.ant-select-selector]:border-primary [&>.ant-select-single]:h-[40px]">
                  <CasCader onChange={onChangeLoading} loading data={options} />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </>
    </>
  );
}

export default CasCaders;
