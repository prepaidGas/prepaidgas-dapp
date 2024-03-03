import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  UilApps,
  UilTimes,
  UilListUl,
  UilAlignLeft
} from '@iconscout/react-unicons';
import { Row, Col, Radio } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Buttons } from '@/components/buttons';
import { PageHeaders } from '@/components/page-headers';
import { sorting } from '@/redux/product/actionCreator';
import { AutoCompleted } from '@/components/autoComplete';
import Filters from './overview/Filters';

interface HeaderSearchData {
  title: string;
}

interface RootState {
  headerSearchData: HeaderSearchData[];
}

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Products',
    },
  ];

  const router = useRouter();
  const { pathname } = router;
  const currentPath = pathname.split('/')[4];
  
  const path = '/admin/ecommerce/products';
  const dispatch = useDispatch();
  const searchData = useSelector((state:RootState) => state.headerSearchData);

  const [state, setState] = useState({
    notData: searchData,
    active: 'active',
  });

  const { notData } = state;

  const handleSearch = (searchText:string) => {
    const data = searchData.filter((item:HeaderSearchData) => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const onSorting = (e:any) => {
    //@ts-ignore
    dispatch(sorting(e.target.value));
  };

  const [activeSort, setActiveSort] = useState('top-rated');

  const [isDivVisible, setIsDivVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1200px)');

    function handleMqChange(event:MediaQueryListEvent) {
      setIsDivVisible(event.matches);
    }

    mq.addEventListener('change', handleMqChange);
    setIsDivVisible(mq.matches);

    return () => {
      mq.removeEventListener('change', handleMqChange);
    };
  }, []);

  function handleButtonClick() {
    setIsDivVisible(!isDivVisible);
    const div: HTMLDivElement | null = document.querySelector('.ant-layout-content');

    if (div) {
      div.classList.toggle('overlay');
    }
  }
  function handleClose() {
    setIsDivVisible(false);
    const div: HTMLDivElement | null = document.querySelector('.ant-layout-content');

    if (div) {
       div.classList.toggle('overlay');
    }
  }
  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Shop"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <Row gutter={30}>
          <Col xxl={5} xl={6} md={12} xs={20}>
            <button
              className="mb-[15px] w-[45px] h-[45px] hidden xl:inline-flex items-center justify-center p-0 text-primary bg-white dark:bg-white/10 dark:text-white/[.87] border-1 border-white dark:border-white/10 rounded-6"
              type="button"
              onClick={handleButtonClick}
            >
              <UilAlignLeft />
            </button>
            {isDivVisible || window.innerWidth >= 1200 ? (
              <div className="xl:absolute xl:top-[30px] xl:start-[15px] xl:w-full xl:h-full content-[''] xl:z-[2]">
                <Buttons
                  type="link"
                  className="hidden bg-transparent border-none text-danger sm:px-0 xl:inline-flex ltr:float-right rtl:float-left z-[1] mt-[14px] ltr:sm:mr-[15px] rtl:sm:ml-[15px]"
                  style={{ marginTop: 0 }}
                  onClick={handleClose}
                >
                  <UilTimes />
                </Buttons>
                <Filters />
              </div>
            ) : null}
          </Col>
          <Col xxl={19} xl={17} md={24} xs={24}>
            <div className="items-center flex flex-wrap justify-between 3xl:justify-center mb-[30px] gap-[30px]">
              <div className="flex items-center flex-wrap gap-[25px] min-3xl:[&>div>div>span>span]:w-[360px] [&>div>div>span>.ant-input-affix-wrapper]:h-12 [&>div>div>span>.ant-input-affix-wrapper]:!border-none [&>div>div>span>.ant-input-affix-wrapper>input]:focus:!border-none [&>div>div>.ant-select-selection-search]:bg-white dark:[&>div>div>.ant-select-selection-search]:bg-white/10 [&>div>div>.ant-select-selection-search]:h-12 [&>div>div>.ant-select-selection-search]:rounded-[100px] [&>div]:!w-auto [&>div]:!border-none 3xl:justify-center [&>div>.ant-select-selector]:h-12 [&>div>.ant-select-selector>.ant-select-selection-placeholder]:h-12 [&>div>.ant-select-selector>.ant-select-selection-placeholder]:leading-[46px] [&>div>.ant-select-selector>.ant-select-selection-placeholder]:px-5">
                <AutoCompleted onSearch={handleSearch} dataSource={notData} placeholder="Search" patterns />
                <p className="mb-0 text-body dark:text-white/60">Showing 1–8 of 86 results</p>
              </div>
              <div className="flex items-center flex-wrap gap-[25px] 3xl:justify-center">
                <div className="text-body dark:text-white/60 flex flex-wrap items-center gap-[20px] 3xl:justify-center">
                  <span>Sort by:</span>
                  <Radio.Group
                    onChange={onSorting}
                    defaultValue="rate"
                    className="bg-white dark:bg-[#1b1d2a] px-[10px] 4xl:px-0 border-transparent dark:border-1 dark:border-white/10 rounded-4"
                  >
                    <Radio.Button
                      value="rate"
                      onClick={() => {
                        setActiveSort('top-rated');
                      }}
                      className={`bg-transparent h-10 leading-[42px] px-3 border-none shadow-none before:!bg-section dark:before:bg-white/10 [&.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):before]:bg-section [&.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):before]:bg-white/10 before:h-1/2 before:top-1/2 before:-translate-y-1/2 ${
                        activeSort === 'top-rated'
                          ? 'text-primary dark:text-white/[.87] dark:before:bg-white/[.87]'
                          : 'text-light-extra dark:text-white/60'
                      }`}
                    >
                      Top Rated
                    </Radio.Button>
                    <Radio.Button
                      value="popular"
                      onClick={() => {
                        setActiveSort('popular');
                      }}
                      className={`bg-transparent h-10 leading-[42px] px-3 border-none shadow-none before:!bg-section dark:before:bg-white/10 [&.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):before]:bg-section [&.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):before]:bg-white/10 before:h-1/2 before:top-1/2 before:-translate-y-1/2 ${
                        activeSort === 'popular'
                          ? 'text-primary dark:text-white/[.87]'
                          : 'text-light-extra dark:text-white/60'
                      }`}
                    >
                      Popular
                    </Radio.Button>
                    <Radio.Button
                      value="time"
                      onClick={() => {
                        setActiveSort('newest');
                      }}
                      className={`bg-transparent h-10 leading-[42px] px-3 border-none shadow-none before:bg-section dark:before:bg-white/10 [&.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):before]:bg-section [&.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):before]:bg-white/10 before:h-1/2 before:top-1/2 before:-translate-y-1/2 ${
                        activeSort === 'newest'
                          ? 'text-primary dark:text-white/[.87]'
                          : 'text-light-extra dark:text-white/60'
                      }`}
                    >
                      Newest
                    </Radio.Button>
                    <Radio.Button
                      value="price"
                      onClick={() => {
                        setActiveSort('price');
                      }}
                      className={`bg-transparent h-10 leading-[42px] px-3 border-none shadow-none before:!bg-section dark:before:bg-white/10 [&.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):before]:bg-section [&.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):before]:bg-white/10 before:h-1/2 before:top-1/2 before:-translate-y-1/2 ${
                        activeSort === 'price' ? 'text-primary dark:text-white/[.87]' : 'text-light-extra dark:text-white/60'
                      }`}
                    >
                      Price
                    </Radio.Button>
                  </Radio.Group>
                </div>
                <div className="flex items-center">
                  <Link
                    href={`${path}/grid`}
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${
                      currentPath === 'grid'
                        ? 'bg-white dark:bg-white/10 text-primary dark:text-white/[.87]'
                        : 'bg-transparent text-light dark:text-white/60'
                    }`}
                  >
                    <UilApps className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`${path}/list`}
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${
                      currentPath === 'list'
                        ? 'bg-white dark:bg-white/10 text-primary dark:text-white/[.87]'
                        : 'bg-transparent text-light dark:text-white/60'
                    }`}
                  >
                    <UilListUl className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            { children }
          </Col>
        </Row>
      </main>
    </>
  );
}

export default ProductLayout;
