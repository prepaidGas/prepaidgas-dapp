import { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Row, Col, Pagination, AutoComplete, Input } from 'antd';
import Heading from '@/components/heading';
import { PageHeaders } from '@/components/page-headers';

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

function SearchResult() {
  const [activeValue, setActiveValue] = useState('all');

  const searchData = useSelector((state:any) => state.headerSearchData);
  const [state, setState] = useState({
    notData: searchData,
    activeClass: 'all',
    current: 0,
    pageSize: 0,
  });

  const onShowSizeChange = (current:number, pageSize:number) => {
    setState({ ...state, current, pageSize });
  };

  const onHandleChange = (current:number, pageSize:number) => {
    // You can create pagination in here
    setState({ ...state, current, pageSize });
  };
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [anotherOptions, setAnotherOptions] = useState<{ value: string }[]>([]);

  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  const onSelect = (data: string) => {
    console.log('onSelect', data);
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  return (
    <>
      <PageHeaders 
        title="Search Result" 
        className="flex justify-between items-center bg-transparent px-8 py-[18px]" 
      />

      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <Row gutter={25}>
          <Col xs={24}>
            <div className="">
            <AutoComplete
              className="w-1/2 search-result-wrapper h-[50px]"
              options={options}
              onSelect={onSelect}
              onSearch={(text) => setOptions(getPanelValue(text))}
            >
              <Input.Search className="text-[15px]" size="large" placeholder="Type and search" />
            </AutoComplete>
            </div>
          </Col>
          <Col xs={24}>
            <div className="mt-[9px] py-[22px]">
              <ul className="flex flex-wrap items-center mb-0">
                <li className="ltr:mr-[10px] rtl:ml-[10px] mb-[10px]">
                  <Link
                    href="#"
                    onClick={() => setActiveValue('all')}
                    className={`px-[15px] py-[5px] text-13 font-medium rounded-[5px] shadow-[0_3px_6px_rgba(116,116,116,0.02)] ${
                      activeValue === 'all'
                        ? 'bg-primary text-white'
                        : 'bg-white dark:bg-white/[.06] text-light dark:text-white/60'
                    }`}
                  >
                    All
                  </Link>
                </li>
                <li className="ltr:mr-[10px] rtl:ml-[10px] mb-[10px]">
                  <Link
                    href="#"
                    onClick={() => setActiveValue('webDesign')}
                    className={`inline-block px-[15px] py-[5px] text-13 font-medium rounded-[5px] shadow-[0_3px_6px_rgba(116,116,116,0.02)] ${
                      activeValue === 'webDesign'
                        ? 'bg-primary text-white'
                        : 'bg-white dark:bg-white/[.06] text-light dark:text-white/60'
                    }`}
                  >
                    Web Design
                  </Link>
                </li>
                <li className="ltr:mr-[10px] rtl:ml-[10px] mb-[10px]">
                  <Link
                    href="#"
                    onClick={() => setActiveValue('uiDesign')}
                    className={`inline-block px-[15px] py-[5px] text-13 font-medium rounded-[5px] shadow-[0_3px_6px_rgba(116,116,116,0.02)] ${
                      activeValue === 'uiDesign'
                        ? 'bg-primary text-white'
                        : 'bg-white dark:bg-white/[.06] text-light dark:text-white/60'
                    }`}
                  >
                    UI Design
                  </Link>
                </li>
                <li className="ltr:mr-[10px] rtl:ml-[10px] mb-[10px]">
                  <Link
                    href="#"
                    onClick={() => setActiveValue('wireframe')}
                    className={`inline-block px-[15px] py-[5px] text-13 font-medium rounded-[5px] shadow-[0_3px_6px_rgba(116,116,116,0.02)] ${
                      activeValue === 'wireframe'
                        ? 'bg-primary text-white'
                        : 'bg-white dark:bg-white/[.06] text-light dark:text-white/60'
                    }`}
                  >
                    Wireframe
                  </Link>
                </li>
                <li className="ltr:mr-[10px] rtl:ml-[10px] mb-[10px]">
                  <Link
                    href="#"
                    onClick={() => setActiveValue('presentation')}
                    className={`inline-block px-[15px] py-[5px] text-13 font-medium rounded-[5px] shadow-[0_3px_6px_rgba(116,116,116,0.02)] ${
                      activeValue === 'presentation'
                        ? 'bg-primary text-white'
                        : 'bg-white dark:bg-white/[.06] text-light dark:text-white/60'
                    }`}
                  >
                    Presentation
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={24}>
            <div className="bg-white dark:bg-white/10 p-[25px] rounded-[10px]">
              <div className="max-w-5xl mb-[18px] pb-6 border-b border-regular dark:border-white/10">
                <Row>
                  <Col md={13} xs={24}>
                    <p className="mb-0 text-body dark:text-white/60 test-base">
                      <span className="fon:t-semibold ltr:mr-1 rtl:ml-1 text-dark dark:text-white/[.87]">207</span>
                      results found for
                      <span className="ml-1 font-semibold text-dark dark:text-white/[.87]">“Keyword”</span>
                    </p>
                  </Col>
                  <Col md={11} xs={24}>
                    <p className="mb-0 text-end md:text-start md:mt-[10px] text-body dark:text-white/60 text-15">
                      Showing 1-10 of 76 results
                    </p>
                  </Col>
                </Row>
              </div>
              <div className="result-list-content">
                <Row>
                  <Col md={24}>
                    <nav>
                      <ul className="mb-[30px] border-b border-regular dark:border-white/10">
                        <li className="mb-8">
                          <Heading className="mb-2 text-base font-medium text-dark dark:text-white/[.87]" as="h6">
                            <span className="font-semibold text-primary">Keyword</span> installing lorem multivendor
                            marketplace
                          </Heading>
                          <p className="mb-0 text-body dark:text-white/60">
                            Lorem ipsum dolor amet consetetur get up and running with a world-class sadipscing elitr,sed
                            diam nonumy eirmod...
                          </p>
                        </li>
                        <li className="mb-8">
                          <Heading className="mb-2 text-base font-medium text-dark dark:text-white/[.87]" as="h6">
                            <span className="font-semibold text-primary">Keyword</span> installing lorem multivendor
                            marketplace
                          </Heading>
                          <p className="mb-0 text-body dark:text-white/60">
                            Lorem ipsum dolor amet consetetur get up and running with a world-class sadipscing elitr,sed
                            diam nonumy eirmod...
                          </p>
                        </li>
                        <li className="mb-8">
                          <Heading className="mb-2 text-base font-medium text-dark dark:text-white/[.87]" as="h6">
                            <span className="font-semibold text-primary">Keyword</span> installing lorem multivendor
                            marketplace
                          </Heading>
                          <p className="mb-0 text-body dark:text-white/60">
                            Lorem ipsum dolor amet consetetur get up and running with a world-class sadipscing elitr,sed
                            diam nonumy eirmod...
                          </p>
                        </li>
                        <li className="mb-8">
                          <Heading className="mb-2 text-base font-medium text-dark dark:text-white/[.87]" as="h6">
                            <span className="font-semibold text-primary">Keyword</span> installing lorem multivendor
                            marketplace
                          </Heading>
                          <p className="mb-0 text-body dark:text-white/60">
                            Lorem ipsum dolor amet consetetur get up and running with a world-class sadipscing elitr,sed
                            diam nonumy eirmod...
                          </p>
                        </li>
                        <li className="mb-8">
                          <Heading className="mb-2 text-base font-medium text-dark dark:text-white/[.87]" as="h6">
                            <span className="font-semibold text-primary">Keyword</span> installing lorem multivendor
                            marketplace
                          </Heading>
                          <p className="mb-0 text-body dark:text-white/60">
                            Lorem ipsum dolor amet consetetur get up and running with a world-class sadipscing elitr,sed
                            diam nonumy eirmod...
                          </p>
                        </li>
                        <li className="mb-8">
                          <Heading className="mb-2 text-base font-medium text-dark dark:text-white/[.87]" as="h6">
                            <span className="font-semibold text-primary">Keyword</span> installing lorem multivendor
                            marketplace
                          </Heading>
                          <p className="mb-0 text-body dark:text-white/60">
                            Lorem ipsum dolor amet consetetur get up and running with a world-class sadipscing elitr,sed
                            diam nonumy eirmod...
                          </p>
                        </li>
                        <li className="mb-8">
                          <Heading className="mb-2 text-base font-medium text-dark dark:text-white/[.87]" as="h6">
                            <span className="font-semibold text-primary">Keyword</span> installing lorem multivendor
                            marketplace
                          </Heading>
                          <p className="mb-0 text-body dark:text-white/60">
                            Lorem ipsum dolor amet consetetur get up and running with a world-class sadipscing elitr,sed
                            diam nonumy eirmod...
                          </p>
                        </li>
                        <li className="mb-7">
                          <Heading className="mb-2 text-base font-medium text-dark dark:text-white/[.87]" as="h6">
                            <span className="font-semibold text-primary">Keyword</span> installing lorem multivendor
                            marketplace
                          </Heading>
                          <p className="mb-0 text-body dark:text-white/60">
                            Lorem ipsum dolor amet consetetur get up and running with a world-class sadipscing elitr,sed
                            diam nonumy eirmod...
                          </p>
                        </li>
                      </ul>
                    </nav>
                  </Col>
                </Row>
              </div>
              <div>
                <div className="[&>.ant-pagination>li]:margin-0 [&>.ant-pagination>li]:border [&>.ant-pagination>li]:border-regular [&>.ant-pagination>li]:dark:border-white/10 [&>.ant-pagination>li>.ant-pagination-item-link]:flex [&>.ant-pagination>li>.ant-pagination-item-link]:items-center [&>.ant-pagination>li>.ant-pagination-item-link]:justify-center [&>.ant-pagination>li>.ant-pagination-item-link]:border-none [&>.ant-pagination>li>.ant-pagination-item-link>.anticon>svg]:text-light [&>.ant-pagination>li>.ant-pagination-item-link>.anticon>svg]:dark:text-white/30 [&>.ant-pagination>.ant-pagination-item>a]:text-body [&>.ant-pagination>.ant-pagination-item>a]:dark:text-white/60 [&>.ant-pagination>.ant-pagination-item-active]:bg-primary [&>.ant-pagination>.ant-pagination-item.ant-pagination-item-active>a]:text-white [&>.ant-pagination>.ant-pagination-item.ant-pagination-item-active>a]:dark:text-white/60 [&>.ant-pagination>.ant-pagination-options]:border-none [&>.ant-pagination>.ant-pagination-options>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-selector]:h-8 [&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-selector>.ant-select-selection-item]:dark:text-white/30 [&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-arrow>.anticon]:dark:text-white/30">
                  <Pagination
                    onChange={onHandleChange}
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}
                    pageSize={10}
                    defaultCurrent={1}
                    total={40}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default SearchResult;
