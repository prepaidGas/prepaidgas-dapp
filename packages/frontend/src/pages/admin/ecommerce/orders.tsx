import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  UilPlus,
  UilEdit,
  UilEye,
  UilTrashAlt
} from '@iconscout/react-unicons';
import { Row, Col, Radio, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Buttons } from '@/components/buttons';
import { PageHeaders } from '@/components/page-headers';
import { AutoCompleted } from '@/components/autoComplete';
import { orderFilter } from '@/redux/orders/actionCreator';

function Orders() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Orders',
    },
  ];

  interface Order {
    orderId: string;
    customerName: string;
    orderDate: Date;
    // Add more properties as needed
  }

  interface RootState {
    headerSearchData: string[];
    orders: {
      data: Item[];
    };
  }
  const dispatch = useDispatch();
  const { searchData, orders } = useSelector((state:RootState) => {
    return {
      searchData: state.headerSearchData,
      orders: state.orders.data,
    };
  });

  const [state, setState]:any = useState({
    notData: searchData,
    item: orders,
    selectedRowKeys: [],
  });

  const { notData, item, selectedRowKeys } = state;
  const filterKey:string[] = ['Shipped', 'Awaiting Shipment', 'Canceled'];

  useEffect(() => {
    if (orders) {
      setState({
        item: orders,
        selectedRowKeys,
      });
    }
  }, [orders, selectedRowKeys]);

  const handleSearch = (searchText:string) => {
    const data = searchData.filter((value:any) => value.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const handleChangeForFilter = (e:any) => {
    // @ts-ignore
    dispatch(orderFilter('status', e.target.value));
  };

  interface Item {
    status: string;
    orderId: string;
    customers: string;
    amount: number;
    date: string;
  }

  const dataSource:any = [];
  if (orders.length) {
    orders.map((value:Item, key:number) => {
      const { status, orderId, customers, amount, date } = value;
      return dataSource.push({
        key: key + 1,
        id: <span className="font-medium text-body dark:text-white/60">{orderId}</span>,
        customer: <span className="font-medium text-body dark:text-white/60">{customers}</span>,
        status: (
          <span
            className={`py-[4.5px] px-3 text-[13px] rounded-[15px] ${
              status === 'Shipped'
                ? 'bg-success-transparent text-success'
                : status === 'Awaiting Shipment'
                ? 'bg-warning-transparent text-warning'
                : 'bg-danger-transparent text-danger'
            }`}
          >
            {status}
          </span>
        ),
        amount: <span className="font-medium text-body dark:text-white/60">{amount}</span>,
        date: <span className="font-medium text-body dark:text-white/60">{date}</span>,
        action: (
          <div className="min-w-[150px] text-end -m-2">
            <Link className="inline-block m-2" href="#">
              <UilEye className="w-4 text-light-extra dark:text-white/60" />
            </Link>
            <Link className="inline-block m-2" href="#">
              <UilEdit className="w-4 text-light-extra dark:text-white/60" />
            </Link>
            <Link className="inline-block m-2" href="#">
              <UilTrashAlt className="w-4 text-light-extra dark:text-white/60" />
            </Link>
          </div>
        ),
      });
    });
  }

  const columns = [
    {
      title: 'Order Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const onSelectChange = (selectedRowKey:any) => {
    setState({ ...state, selectedRowKeys: selectedRowKey });
  };

  const rowSelection = {
    onChange: (selectRowKeys:any) => {
      onSelectChange(selectRowKeys);
    },
  };

  const [activeStatus, setActiveStatus] = useState('');

  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Orders"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <div className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <div className="bg-white dark:bg-white/10 p-[25px] md:px-[15px] rounded-10">
          <Row gutter={15}>
            <Col xs={24}>
              <div className="flex flex-wrap items-center justify-between gap-[20px] mb-[20px] 2xl:flex-col 2xl:justify-center">
                <div className="flex items-center flex-wrap gap-[20px] 2xl:justify-center">
                  <div className="[&>div>div>span>.ant-select-selection-search-input]:bg-regularBG dark:[&>div>div>span>.ant-select-selection-search-input]:bg-regularBGdark [&>div>div>span>.ant-select-selection-search-input]:h-10 [&>div>div>span>.ant-select-selection-search-input]:border-none [&>div>div>span>.ant-select-selection-search-input>input]:bg-regularBG dark:[&>div>div>span>.ant-select-selection-search-input>input]:bg-transparent min-lg:[&>div>div>span>span>input]:min-w-[350px] [&>div>.ant-select-selector>.ant-select-selection-placeholder]:h-10 [&>div>.ant-select-selector>.ant-select-selection-placeholder]:leading-[38px] [&>div>.ant-select-selector>.ant-select-selection-placeholder]:px-5">
                    <AutoCompleted onSearch={handleSearch} dataSource={notData} placeholder="Search Here" width="100%" patterns />
                  </div>
                  <div className="gap-[5px] text-body dark:text-white/60 2xl:text-center flex items-center flex-wrap xs:justify-center">
                    <span> Status:</span>
                    <Radio.Group
                      onChange={handleChangeForFilter}
                      defaultValue=""
                      className="border-none rounded-[5px] overflow-y-auto flex items-center"
                    >
                      <Radio.Button
                        value=""
                        onClick={() => {
                          setActiveStatus('');
                        }}
                        className={` bg-white dark:bg-white/10 hover:text-primary h-10 leading-[40px] px-3 border-none shadow-none ${
                          activeStatus === '' ? 'text-primary' : 'text-light dark:text-white/60'
                        }`}
                      >
                        All
                      </Radio.Button>
                      {item.length &&
                        [...filterKey].map((value:string) => {
                          return (
                            <Radio.Button
                              key={value}
                              value={value}
                              onClick={() => {
                                setActiveStatus(value);
                              }}
                              className={`bg-white dark:bg-white/10 hover:text-primary h-10 leading-[40px] px-3 border-none shadow-none before:bg-section dark:before:bg-white/10 before:h-1/2 ltr:before:left-0 rtl:before:right-0 before:top-1/2 before:-translate-y-1/2 ${
                                activeStatus === value ? 'text-primary' : 'text-light dark:text-white/60'
                              }`}
                            >
                              {value}
                            </Radio.Button>
                          );
                        })}
                    </Radio.Group>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-[6px] lg:justify-center">
                  <Buttons
                    size="small"
                    type="secondary"
                    transparented
                    className="bg-[#5840ff15] h-[38px] px-[13px] text-secondary text-[13px] font-medium rounded-md border-none"
                  >
                    Export
                  </Buttons>
                  <Buttons
                    size="small"
                    type="primary"
                    className="flex items-center bg-primary h-[38px] gap-[6px] px-[13px] text-white dark:text-white/[.87] text-[13px] font-medium rounded-md border-none"
                  >
                    <UilPlus className="w-[14px] h-[14px]" /> Add Seller
                  </Buttons>
                </div>
              </div>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col md={24}>
              <>
                <div className="ant-pagination-custom-style table-responsive table-head-rounded table-th-shape-none table-th-border-none table-last-th-text-right hover-tr-none table-td-border-none ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-none ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-none">
                  <Table
                    className="[&>div>div>.ant-table]:mb-7 [&>div>div>.ant-table]:pb-5 [&>div>div>.ant-table]:border-b [&>div>div>.ant-table]:border-regular dark:[&>div>div>.ant-table]:border-white/10 ltr:[&>div>div>div>div>div>table>thead>tr>th:first-child]:pl-[20px] ltr:[&>div>div>div>div>div>table>tbody>tr>td:first-child]:pl-[20px] rtl:[&>div>div>div>div>div>table>thead>tr>th:first-child]:pr-[20px] rtl:[&>div>div>div>div>div>table>tbody>tr>td:first-child]:pr-[20px] "
                    rowSelection={rowSelection}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{ 
                      pageSize: 7, 
                      showSizeChanger: true, 
                      total: orders.length, 
                      className: 'text-end [&>li]:margin-0 [&>li]:border [&>li]:margin-0 [&>li]:bg-white [&>li]:rounded-6 dark:[&>li]:bg-white/10 dark:[&>li]:margin-0 [&>li]:border-regular dark:[&>li]:border-white/10 [&>li>.ant-pagination-item-link]:flex [&>li>.ant-pagination-item-link]:items-center [&>li>.ant-pagination-item-link]:justify-center [&>li>.ant-pagination-item-link]:border-none [&>li>.ant-pagination-item-link>.anticon>svg]:text-light [&>li>.ant-pagination-item-link>.anticon>svg]:dark:text-white/30 [&>.ant-pagination-item>a]:text-body [&>.ant-pagination-item>a]:dark:text-white/60 [&>.ant-pagination-item-active]:bg-primary [&>.ant-pagination-item.ant-pagination-item-active>a]:text-white [&>.ant-pagination-item.ant-pagination-item-active>a]:dark:text-white/60 [&>.ant-pagination-options>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-pagination-options>.ant-select>.ant-select-selector]:h-[33px] dark:[&>.ant-pagination-options>.ant-select>.ant-select-selector]:text-white/[.60] dark:[&>.ant-pagination-options>.ant-select>.ant-select-arrow]:text-white/[.60] [&>.ant-pagination-options>.ant-select>.ant-select-selector]:border-0 dark:[&>.ant-pagination-options>.ant-select>.ant-select-selector]:border-white/10 [&>.ant-pagination-options>.ant-select>.ant-select-selector]:rounded-6',
                    }}
                  />
                </div>
              </>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Orders;
