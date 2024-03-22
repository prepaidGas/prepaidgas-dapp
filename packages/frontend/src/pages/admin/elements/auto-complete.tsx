import { useState } from 'react';
import { Row, Col, Input } from 'antd';
import { useSelector } from 'react-redux';
import { PageHeaders } from '@/components/page-headers';
import { AutoCompleted } from '@/components/autoComplete';
import { Cards } from '@/components/cards/frame/cards-frame';

const { TextArea } = Input;
function AutoCompletePage() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'AutoComplete',
    },
  ];
  const searchData = useSelector((state:any) => state.headerSearchData);

  const [state, setState]:any = useState({
    dataSource: [],
    notData: searchData,
  });
  const { dataSource, notData } = state;

  const onSearch = (searchText:any) => {
    let arrayData:any = [];
    const data = searchData.filter((item:any) => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    if (data.length) {
      data.map((item:any) => arrayData.push(item.title));
    } else {
      arrayData = ['Data Not Found!'];
    }
    setState({
      dataSource: !searchText ? [] : arrayData,
    });
  };

  const patternSearch = (searchText:any) => {
    const data = searchData.filter((item:any) => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      notData: data,
    });
  };

  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="AutoComplete"
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <>
        <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
          <>
            <Row gutter={25}>
              <Col md={12} sm={24} xs={24}>
                <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                  <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                      Basic Usage
                    </h1>
                  </div>
                  <div className="auto-complete-input gap-y-[15px] inline-flex flex-col p-[25px] [&>.ant-select]:w-[200px] [&>.ant-select>.ant-select-selector]:h-[38px] [&>.ant-select>.ant-select-selector]:rounded-4 [&>.ant-select>.ant-select-selector]:border-regular dark:[&>.ant-select>.ant-select-selector]:border-white/10 [&>.ant-select>.ant-select-selector>.ant-select-selection-placeholder]:leading-[36px]">
                    <AutoCompleted options={dataSource} onSearch={onSearch} placeholder="input here" />
                    <AutoCompleted options={dataSource} onSearch={onSearch} placeholder="input here" />
                  </div>
                </div>
                <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                  <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                      Customize Input Component
                    </h1>
                  </div>
                  <div className="auto-complete-input p-[25px] [&>.ant-select]:w-[200px]">
                    <AutoCompleted
                      customComponent={
                        <TextArea
                          placeholder="input here"
                          className="custom border-regular dark:border-white/10 dark:placeholder-white/60 dark:caret-white/60"
                          style={{ height: 50 }}
                        />
                      }
                      options={dataSource}
                      onSearch={onSearch}
                    />
                  </div>
                </div>
                <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                  <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                      Customize Input Component
                    </h1>
                  </div>
                  <div className="p-[25px] [&>.ant-select>.ant-select-selector>.ant-select-selection-placeholder]:leading-[36px]">
                    <AutoCompleted onSearch={patternSearch} options={notData} placeholder="input here" width="100%" patterns />
                  </div>
                </div>
              </Col>
              <Col md={12} sm={24} xs={24}>
                <div className="auto-complete-input">
                  <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                    <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                      <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                        Customize Input Component
                      </h1>
                    </div>
                    <div className="p-[25px] [&>.ant-select]:w-[200px] [&>.ant-select>.ant-select-selector]:h-[38px] [&>.ant-select>.ant-select-selector]:rounded-4 [&>.ant-select>.ant-select-selector]:border-regular dark:[&>.ant-select>.ant-select-selector]:border-white/10 [&>.ant-select>.ant-select-selector>.ant-select-selection-placeholder]:leading-[36px]">
                      <AutoCompleted options={dataSource} onSearch={onSearch} placeholder="input here" />
                    </div>
                  </div>
                </div>

                <Cards
                  className="mb-[25px] bg-white dark:bg-white/10 card-title-bb ant-card-head-px-25 ant-card-body-p-25 [&>.ant-card-body>div>div>span>span>.ant-input-suffix>button>span>svg]:text-white dark:[&>.ant-card-body>div>div>span>span>.ant-input-suffix>button>span>svg]:text-white/60 [&>.ant-card-body>.ant-select>.ant-select-selector>.ant-select-selection-placeholder]:leading-[36px]"
                  title="Lookup-Patterns - Uncertain Category"
                >
                  <AutoCompleted options={notData} onSearch={patternSearch} placeholder="input here" width="100%" patterns patternButtons />
                </Cards>
              </Col>
            </Row>
          </>
        </main>
      </>
    </>
  );
}

export default AutoCompletePage;
