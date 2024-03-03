import { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { Table } from 'antd';
import {
  UilAngleLeft,
  UilAngleRight,
  UilPaperclip,
  UilSlidersV,
  UilEllipsisV
} from '@iconscout/react-unicons';
import FontAwesome from 'react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import Topbar from './Topbar';
import Heading from '@/components/heading';
import DropDown from '@/components/dropdown';
import { textRefactor } from '@/components/utilities';
import { AutoCompleted } from '@/components/autoComplete';
import { onStarUpdate, onSortingAscending, onSortingDescending } from '@/redux/email/actionCreator';


interface RootState {
  ChangeLayoutMode: {
    rtlData: string;
  };
}

function Content({ searchData, email }: any) {
  const dispatch = useDispatch();
  const { rtl } = useSelector((state: RootState) => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });

  const [state, setState] = useState({
    selectedRowKeys: [],
    notData: searchData,
    emails: email,
    sort: true,
  });

  const { selectedRowKeys, notData, emails, sort } = state;

  useEffect(() => {
    setState((prevState) => ({
      ...prevState, 
      emails: email,
      selectedRowKeys,
      sort,
    }));
  }, [email, selectedRowKeys, sort]);

  const handleSearch = (searchText:string) => {
    const data =
      searchData !== undefined &&
      searchData.filter((item:any) => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const refreshState = (e:any) => {
    e.preventDefault();
    setState({
      ...state,
      emails: email,
    });
  };

  const onStaredChange = (id:string) => {
    //@ts-ignore
    dispatch(onStarUpdate(id));
  };

  const data:any = [];
  if (emails !== undefined)
    emails.map((inbox:any, key:number) => {
      // eslint-disable-next-line no-shadow

      const { id, type, userName, status, img, subject, body, attach, stared } = inbox;

      const same = moment(id).format('MM-DD-YYYY') === moment().format('MM-DD-YYYY');
      return data.push({
        key: id,
        name: (
          <div className="flex items-start">
            <Link
              onClick={() => {
                onStaredChange(id);
              }}
              href="#"
            >
              {stared ? (
                  <FontAwesome name=" fa-solid fa-star" className="text-base text-warning" />
                ) : (
                  <FontAwesome name="star-o" className="text-base text-light-extra dark:text-white/60" />
                )}
            </Link>
            <img
              className="inline-block w-8 h-8 rounded-full ltr:ml-5 rtl:mr-5 ltr:mr-4 rtl:ml-4"
              src={`/hexadash-nextjs/${img}`}
              alt=""
            />
            <Heading as="h5" className="text-[15px] font-medium">
              <Link href="#" className="text-body dark:text-white/60">
                {userName}
              </Link>
            </Heading>
          </div>
        ),
        email: inbox.email,
        status,
        content: (
          <div className="min-w-[540px] 3xl:min-w-[350px]">
            <Heading as="h5" className="text-[15px] font-medium">
              <Link href={`/admin/email/${id}`} className="text-body dark:text-white/60">
                {subject}
              </Link>
              <span
                className={`inline-flex items-center h-[22px] ltr:ml-2.5 rtl:mr-2.5 px-1.5 text-xs font-normal capitalize rounded-[3px] ${
                  key <= 1
                    ? 'bg-primary-transparent text-primary'
                    : 'bg-deepBG dark:bg-white/10 text-body dark:text-white/60'
                }`}
              >
                {type}
              </span>
            </Heading>
            <p className="m-0 text-body dark:text-white/60">{textRefactor(body, 10)}</p>
            <div className="flex items-center gap-[15px]">
              {attach.length
                ? attach.map((item:any) => (
                    <a
                      key={item}
                      className="inline-flex items-center bg-deepBG dark:bg-white/10 h-[30px] mt-[15px] px-5 text-light dark:text-white/60 text-[13px] rounded-[15px]"
                      download
                      href={`/hexadash-nextjs/img/email/${item}`}
                    >
                      <UilPaperclip className="w-4 ltr:mr-1.5 rtl:ml-1.5" />
                      {item}
                    </a>
                  ))
                : null}
            </div>
          </div>
        ),
        time: (
          <span className="email-time text-body dark:text-white/60 text-[13px] font-normal">
            {same ? moment(id).format('hh:mm A') : moment(id).format('LL')}
          </span>
        ),
      });
    });

  const handleChange = (pagination:any, filters:any, sorter:any) => {
    setState({
      ...state,
      // sortedInfo: sorter,
    });
  };

  const onRowSelection = (filterObj:any) => {
    const { filter, byValue } = filterObj;

    const newSelectedRowKeys = emails
      .filter((value:any) => {
        return value[filter] === byValue;
      })
      .map((item:any) => item.id);

    setState({ ...state, selectedRowKeys: newSelectedRowKeys });
  };

  const onSelectChange = (selectedRowKey:any) => {
    setState({ ...state, selectedRowKeys: selectedRowKey });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    hideDefaultSelections: true,
    selections: [
      {
        key: 'all',
        text: (<div
          className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active">
          <span>All</span>
        </div>),
        onSelect: () => {
          const newSelectedRowKeys = email.map((item:any) => item.id);
          setState({ ...state, selectedRowKeys: newSelectedRowKeys });
        },
      },
      {
        key: 'read',
        text: (<div
          className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm capitalize">
          <span>read</span>
        </div>),
        onSelect: onRowSelection.bind(null, { filter: 'status', byValue: 'read' }),
      },
      {
        key: 'unread',
        text: (<div
          className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm capitalize">
          <span>unread</span>
        </div>),
        onSelect: onRowSelection.bind(null, { filter: 'status', byValue: 'unread' }),
      },
      {
        key: 'starred',
        text: (<div
          className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm capitalize">
          <span>Favorited</span>
        </div>),
        onSelect: onRowSelection.bind(null, { filter: 'stared', byValue: true }),
      },
      {
        key: 'unstarred',
        text: (<div
          className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm capitalize">
          <span>unfavorited</span>
        </div>),
        onSelect: onRowSelection.bind(null, { filter: 'status', byValue: false }),
      },
    ],
  };

  const columns = [
    {
      title: <Topbar refreshState={refreshState} />,
      dataIndex: 'name',
    },
    {
      title: (
        <div className="flex items-center justify-end [&>div]:max-w-[350px] [&>div>div>span>span:first-child]:h-[38px] [&>div>div>span>span:first-child>input]:h-[38px] [&>div>div>span>span:first-child>input]:bg-transparent [&>div>div>span>span:first-child]:rounded-[23px] [&>div>div>span>span:first-child]:border-none [&>div>div>span>span:first-child]:bg-normalBG dark:[&>div>div>span>span:first-child]:bg-white/10 [&>div>div>span>span:last-child>span>span>svg]:text-dark dark:[&>div>div>span>span:last-child>span>span>svg]:text-white/[.87] [&>div>.ant-select-selector]:bg-transparent [&>div>.ant-select-selector>.ant-select-selection-placeholder]:h-11 [&>div>.ant-select-selector>.ant-select-selection-placeholder]:leading-[42px] [&>div>.ant-select-selector>.ant-select-selection-placeholder]:px-5">
          <AutoCompleted placeholder="Search mail" onSearch={handleSearch} dataSource={notData} width="80%" patterns />
        </div>
      ),
      dataIndex: 'content',
    },
    {
      title: (
        <>
          <div className="flex items-center">
            <span className="inline-block text-sm font-normal text-light dark:text-white/60">1 - 50 of 235</span>
            <div className="flex items-center mx-5">
              <Link
                className="inline-flex items-center justify-center bg-transparent text-light dark:text-primary w-[30px] h-[30px] rounded-full hover:bg-primary-transparent hover:text-primary dark:hover:text-primary"
                href="#"
              >
                {!rtl ? <UilAngleLeft /> : <UilAngleRight />}
              </Link>
              <Link
                className="inline-flex items-center justify-center bg-transparent text-light dark:text-white/60 w-[30px] h-[30px] rounded-full hover:bg-primary-transparent hover:text-primary dark:hover:text-primary"
                href="#"
              >
                {rtl ? <UilAngleLeft /> : <UilAngleRight />}
              </Link>
            </div>
            <div className="flex items-center gap-[25px]">
              <Link
                onClick={() => {
                  setState({
                    ...state,
                    sort: !sort,
                  });
                  if (sort) {
                    //@ts-ignore
                    dispatch(onSortingAscending());
                  } else {
                    //@ts-ignore
                    dispatch(onSortingDescending());
                  }
                }}
                href="#"
              >
                <UilSlidersV className="w-4 h-4 text-light dark:text-white/60" />
              </Link>
              <DropDown
                content={
                  <div className="bg-white dark:bg-[#1b1d2a] py-[10px] w-[120px] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.60)]  rounded-6">
                    <Link
                      href="#"
                      className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
                    >
                      <span>Newest</span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
                    >
                      <span>Oldest</span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
                    >
                      <span>Unread</span>
                    </Link>
                  </div>
                }
              >
                <Link href="#">
                  <UilEllipsisV className="w-4 h-4 text-light dark:text-white/60" />
                </Link>
              </DropDown>
            </div>
          </div>
        </>
      ),
      dataIndex: 'time',
      key: 'time',
    },
  ];

  return (
    <>
      <div className="table-responsive hover-tr-none table-th-shape-none table-tr-selected-background-transparent table-tr-px-30 table-last-td-text-right rounded-10 dark:bg-white/10">
        <Table
          className="inbox-checkbox-all [&>div>div>div>div>div>table>tbody>tr>.ant-table-cell]:align-top [&>div>div>div>div>div>table>tbody>tr>td]:text-start [&>div>div>div>div>div>table>tbody>tr>td:last-child]:text-end [&>div>div>div>div>div>table>tbody>tr>td:last-child]:pe-[30px] [&>div>div>div>div>div>table>tbody>tr>td]:border-regular dark:[&>div>div>div>div>div>table>tbody>tr>td]:border-white/10 [&>div>div>div>div>div>table>tbody>tr:last-child>td]:border-none [&>div>div>div>div>div>table>thead>tr>th]:bg-transparent ltr:[&>div>div>div>div>div>table>thead>tr>th]:pr-[30px] rtl:[&>div>div>div>div>div>table>thead>tr>th]:pl-[30px] dark:[&>div>div>div>div>div>table>thead>tr>th]:border-none [&>div>div>.ant-table]:rounded-10 ltr:[&>div>div>div>div>div>table>thead>tr>th>div>.ant-table-selection-extra]:right-[-20px] rtl:[&>div>div>div>div>div>table>thead>tr>th>div>.ant-table-selection-extra]:left-[-20px] [&>div>div>div>div>div>table>thead>tr>th>div>.ant-table-selection-extra]:top-[-3px]"
          pagination={false}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default Content;
