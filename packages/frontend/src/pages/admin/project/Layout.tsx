import React, { useState } from 'react';
import Link from 'next/link';
import {
  UilPlus,
  UilApps,
  UilListUl
} from '@iconscout/react-unicons';
import { useRouter } from 'next/router';
import { Row, Col, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Heading from '@/components/heading';
import { Buttons } from '@/components/buttons';
import { AutoCompleted } from '@/components/autoComplete';
import { filterProjectByStatus, sortingProjectByCategory } from '@/redux/project/actionCreator';
import CreateProject from './overview/CreateProject';

interface HeaderSearchData {
  title: string;
}

interface RootState {
  headerSearchData: HeaderSearchData[];
}

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { pathname } = router;
  const currentPath = pathname.split('/')[3];
  const path = '/admin/project';

  const dispatch = useDispatch();
  const searchData = useSelector((state:RootState) => state.headerSearchData);

  const [state, setState] = useState({
    notData: searchData,
    visible: currentPath === 'create',
    categoryActive: 'all',
  });

  const { notData, visible } = state;
  const handleSearch = (searchText:string) => {
    const data = searchData.filter((item:HeaderSearchData) => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const onSorting = (selectedItems:any) => {
    //@ts-ignore
    dispatch(sortingProjectByCategory(selectedItems));
  };

  const onChangeCategory = (value:string) => {
    setState({
      ...state,
      categoryActive: value,
    });
    //@ts-ignore
    dispatch(filterProjectByStatus(value));
  };

  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
  };

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
    });
  };

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-[20px] ssm:flex-col pt-[42px] pb-[35px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px]">
        <div className="inline-flex items-center">
          <Heading as="h4" className="text-dark dark:text-white/[.87] text-[22px] font-semibold mb-0">
            Projects
          </Heading>
          <span className="relative ltr:ml-3 rtl:mr-3 ltr:pl-[15px] rtl:pr-[15px] text-body dark:text-white/60 text-[15px] font-medium before:absolute before:top-0 ltr:before:left-0 rtl:before:right-0 before:w-[1px] before:h-6 before:bg-normal dark:before:bg-white/10">
            12 Running Projects
          </span>
        </div>
        <Buttons
          onClick={showModal}
          className="px-5 text-sm font-semibold text-white rounded-md bg-primary hover:bg-primary-hbr h-11"
          size="default"
          type="primary"
          key="1"
        >
          <Link href="#" className="flex items-center gap-[6px] hover:text-white">
            <UilPlus className="w-[14px] h-[14px]" /> Create Projects
          </Link>
        </Buttons>
      </div>
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-[30px] ssm:px-[15px]  pb-[20px]">
        <Row gutter={25}>
          <Col xs={24}>
            <div className="flex items-center w-full mb-[25px] flex-wrap justify-between 3xl:justify-center gap-[15px]">
              <div className="flex items-center flex-wrap gap-[20px]  lg:justify-center">
                <nav className="bg-white dark:bg-white/10 px-5 py-[9px] rounded-[5px]">
                  <ul className="flex flex-wrap items-center mb-0 gap-[12px]">
                    <li className="ltr:border-r rtl:border-l ltr:pr-3 rtl:pl-3 dark:border-white/10 last:border-none">
                      <Link
                        onClick={() => onChangeCategory('all')}
                        href="#"
                        className={
                          state.categoryActive === 'all'
                            ? 'text-primary dark:text-white/[.87]'
                            : 'text-light dark:text-white/60'
                        }
                      >
                        All
                      </Link>
                    </li>
                    <li className="ltr:border-r rtl:border-l ltr:pr-3 rtl:pl-3 dark:border-white/10 last:border-none">
                      <Link
                        onClick={() => onChangeCategory('progress')}
                        href="#"
                        className={
                          state.categoryActive === 'progress'
                            ? 'text-primary dark:text-white/[.87]'
                            : 'text-light dark:text-white/60'
                        }
                      >
                        In Progress
                      </Link>
                    </li>
                    <li className="ltr:border-r rtl:border-l ltr:pr-3 rtl:pl-3 dark:border-white/10 last:border-none">
                      <Link
                        onClick={() => onChangeCategory('complete')}
                        href="#"
                        className={
                          state.categoryActive === 'complete'
                            ? 'text-primary dark:text-white/[.87]'
                            : 'text-light dark:text-white/60'
                        }
                      >
                        Complete
                      </Link>
                    </li>
                    <li className="ltr:border-r rtl:border-l ltr:pr-3 rtl:pl-3 dark:border-white/10 last:border-none">
                      <Link
                        onClick={() => onChangeCategory('late')}
                        href="#"
                        className={
                          state.categoryActive === 'late'
                            ? 'text-primary dark:text-white/[.87]'
                            : 'text-light dark:text-white/60'
                        }
                      >
                        Late
                      </Link>
                    </li>
                    <li className="ltr:border-r rtl:border-l ltr:pr-3 rtl:pl-3 dark:border-white/10 last:border-none">
                      <Link
                        onClick={() => onChangeCategory('early')}
                        href="#"
                        className={
                          state.categoryActive === 'early'
                            ? 'text-primary dark:text-white/[.87]'
                            : 'text-light dark:text-white/60'
                        }
                      >
                        Early
                      </Link>
                    </li>
                  </ul>
                </nav>
                <div className="min-3xl:[&>div.ant-select]:w-[350px] ssm:[&>div.ant-select]:w-full [&>div>div.ant-select-selector]:border-0 [&>.ant-select>.ant-select-selector]:bg-white dark:[&>.ant-select>.ant-select-selector]:bg-white/10 sm:[&>.ant-select>.ant-select-selector]:min-w-[100%] [&>.ant-select>.ant-select-selector>.ant-select-selection-search>.ant-input-affix-wrapper]:rounded-md [&>div>div>span>span]:border-none [&>div>.ant-select-selector>.ant-select-selection-placeholder]:h-[38px] [&>div>.ant-select-selector>.ant-select-selection-placeholder]:leading-[36px] [&>div>.ant-select-selector>.ant-select-selection-placeholder]:px-5">
                  <AutoCompleted onSearch={handleSearch} placeholder="Search Projects" width="100%" patterns />
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-center lg:justify-center gap-[20px]">
                  <span className="text-body dark:text-white/60">Sort By:</span>
                  <Select
                    onChange={onSorting}
                    defaultValue="category"
                    className="min-w-[260px] ltr:ml-[5px] rtl:mr-[5px] [&>div.ant-select-selector]:h-10 [&>.ant-select-selector]:border-none [&>div>span.ant-select-selection-item]:leading-[40px] [&>div>span.ant-select-selection-item]:text-body dark:[&>div>span.ant-select-selection-item]:text-white/60 dark:text-white/60 [&>span>span>svg]:text-body dark:[&>span>span>svg]:text-white/60 h-[2.5rem]"
                  >
                    <Select.Option value="category">Project Category</Select.Option>
                    <Select.Option value="rate">Top Rated</Select.Option>
                    <Select.Option value="popular">Popular</Select.Option>
                    <Select.Option value="time">Newest</Select.Option>
                    <Select.Option value="price">Price</Select.Option>
                  </Select>
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
            </div>
            { children }
          </Col>
        </Row>
        <CreateProject onCancel={onCancel} visible={visible} />
      </main>
    </>
  );
}

export default ProjectLayout;
