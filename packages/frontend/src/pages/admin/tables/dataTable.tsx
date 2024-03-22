import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  UilEye,
  UilEdit,
  UilTrash
} from '@iconscout/react-unicons';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Table, Radio, Divider } from 'antd';
import { PageHeaders } from '@/components/page-headers';
import Heading from '@/components/heading';
import DataTable from '@/components/table/DataTable';
import UserListTable from '../user/overview/UserTable';
import TaskList from '../project/[id]/overview/Tasklist';
import ProjectList from '../project/overview/ProjectList';

import { tableReadData } from '@/redux/data-filter/actionCreator';

function DataTables() {
  const dispatch = useDispatch();

  // Define types and interfaces
  interface User {
    id: number;
    name: string;
    country: string;
    company: string;
    position: string;
    status: string;
    date: string;
  }

  interface TableDataItem {
    id: React.ReactNode;
    user: React.ReactNode;
    country: React.ReactNode;
    company: React.ReactNode;
    position: React.ReactNode;
    date: React.ReactNode;
    status: React.ReactNode;
    action: React.ReactNode;
  }
  
  interface RootState {
    dataTable: {
      tableData: User[];
    };
  }

  const [state, setState]:any = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
  });

  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Table',
    },
  ];

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys:any, selectedRows:any) => {
      setState({ ...state, selectedRowKeys, selectedRows });
    },
    getCheckboxProps: (record:any) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const columnsSort:any = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
        {
          text: 'Submenu',
          value: 'Submenu',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value:any, record:any) => record.name.indexOf(value) === 0,
      sorter: (a:any, b:any) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Age',
      dataIndex: 'age',
      defaultSortOrder: 'descend',
      sorter: (a:any, b:any) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      filterMultiple: false,
      onFilter: (value:any, record:any) => record.address.indexOf(value) === 0,
      sorter: (a:any, b:any) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
  ];

  const dataSort = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
    {
      key: '5',
      name: 'Jim Blue',
      age: 50,
      address: 'London No. 2 Lake Park',
    },
    {
      key: '6',
      name: 'Jim Silver',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
    {
      key: '7',
      name: 'Jim White',
      age: 25,
      address: 'London No. 2 Lake Park',
    },
    {
      key: '8',
      name: 'Jim Orange',
      age: 25,
      address: 'London No. 2 Lake Park',
    },
  ];

  useEffect(() => {
    if (dispatch) {
      // @ts-ignore
      dispatch(tableReadData());
    }
  }, [dispatch]);

  const { tableData } = useSelector((states: RootState) => {
    return {
      tableData: states.dataTable.tableData,
    };
  });

  const tableDataSource: TableDataItem[] = tableData.map((item: User) => {
    const { id, name, country, company, position, status, date } = item;
    return {
      key: id,
      id: <span className="text-body dark:text-white/60 text-[15px] font-medium">{`#${id}`}</span>,
      user: <span className="text-body dark:text-white/60 text-[15px] font-medium">{name}</span>,
      country: <span className="text-body dark:text-white/60 text-[15px] font-medium">{country}</span>,
      company: <span className="text-body dark:text-white/60 text-[15px] font-medium">{company}</span>,
      position: <span className="text-body dark:text-white/60 text-[15px] font-medium">{position}</span>,
      date: <span className="text-body dark:text-white/60 text-[15px] font-medium">{date}</span>,
      status: (
        <span
          className={`inline-flex items-center justify-center bg-${status}-transparent text-${status} min-h-[24px] px-3 text-xs font-medium rounded-[15px]`}
        >
          {status}
        </span>
      ),
      action: (
        <div className="min-w-[150px] text-end -m-2">
          <Link className="inline-block m-2" href="#">
            <UilEye className="w-4 text-light-extra dark:text-white/60" />
          </Link>
          <Link className="inline-block m-2" href="#">
            <UilEdit className="w-4 text-light-extra dark:text-white/60" />
          </Link>
          <Link className="inline-block m-2" href="#">
            <UilTrash className="w-4 text-light-extra dark:text-white/60" />
          </Link>
        </div>
      ),
    };
  });

  const dataTableColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'coutry',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Join Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  function onChange(pagination:any, filters:any, sorter:any, extra:any) {
    setState({ ...state, values: { pagination, filters, sorter, extra } });
  }

  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Table"
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <>
          <Row gutter={15}>
            <Col xs={24} className="mb-[25px]">
              <>
                <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
                  <div className="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b ">
                    <Heading as="h4" className="text-lg font-medium mb-0">
                      Data Table
                    </Heading>
                  </div>
                  <div className="p-[25px]">
                    <DataTable
                      filterOption
                      filterOnchange
                      tableData={tableDataSource}
                      columns={dataTableColumn}
                      rowSelection={false}
                    />
                  </div>
                </div>
              </>
            </Col>
            <Col xs={24} className="mb-[25px]">
              <>
                <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
                  <div className="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                    <Heading as="h4" className="text-lg font-medium mb-0">
                      Data Table 2
                    </Heading>
                  </div>
                  <div className="p-[25px]">
                    <DataTable
                      filterOption
                      filterOnchange
                      tableData={tableDataSource}
                      columns={dataTableColumn}
                      rowSelection
                    />
                  </div>
                </div>
              </>
            </Col>
            <Col xs={24} className="mb-[25px]">
              <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
                <div className="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <Heading as="h4" className="text-lg font-medium mb-0">
                    Project List
                  </Heading>
                </div>
                <ProjectList />
              </div>
            </Col>
            <Col xs={24} className="mb-[25px]">
              <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
                <div className="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <Heading as="h4" className="text-lg font-medium mb-0">
                    User List
                  </Heading>
                </div> 
                <div className="p-[25px]">
                  <UserListTable />
                </div>
              </div>
            </Col>
            <Col xs={24} className="mb-[25px]">
              <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative dark-border-row dark:text-white/60">
                <div className="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b ">
                  <Heading as="h4" className="text-lg font-medium mb-0">
                    Selection
                  </Heading>
                </div>
                <div className="p-[25px]">
                  <div className="table-responsive table-th-shape-none table-td-text-body dark:text-white/60 table-tr-selected-background-transparent [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-ss-[10px [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-es-[10px] [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th]:dark:border-whiteDark">
                    <Radio.Group
                      onChange={({ target: { value } }) => {
                        setState({ selectionType: value });
                      }}
                      value={state.selectionType}
                      className="custom-radio-group"
                    >
                      <Radio value="checkbox">Checkbox</Radio>
                      <Radio value="radio">radio</Radio>
                    </Radio.Group>

                    <Divider />
                    <Table
                      rowSelection={{
                        type: state.selectionType,
                        ...rowSelection,
                      }}
                      dataSource={dataSource}
                      columns={columns}
                      pagination={false}
                      className="test-column"
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} className="mb-[25px]">
              <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative dark-border-row dark:text-white/60">
                <div className="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <Heading as="h4" className="text-lg font-medium mb-0">
                    Filter and sorter
                  </Heading>
                </div>
                <div className="p-[25px]">
                  <div className="table-responsive table-th-shape-none [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-ss-[10px] [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th]:dark:border-whiteDark [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-es-[10px]">
                    <Table
                      className="table-responsive"
                      pagination={false}
                      columns={columnsSort}
                      dataSource={dataSort}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} className="mb-[25px]">
              <>
                <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative dark-border-row ">
                  <div className="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                    <Heading as="h4" className="text-lg font-medium mb-0">
                      Pagination
                    </Heading>
                  </div>
                  <div className="p-[25px]">
                    <div className="ant-pagination-custom-style table-responsive table-th-shape-none table-td-text-body dark:text-white/60 table-tr-selected-background-transparent [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-ss-[10px [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-es-[10px] [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th]:dark:border-whiteDark">
                      <Table
                        pagination={{
                          defaultPageSize: 3,
                          total: dataSort.length,
                          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                          className: 'text-end [&>li]:margin-0 [&>li]:border [&>li]:margin-0 [&>li]:bg-white [&>li]:rounded-6 dark:[&>li]:bg-white/10 dark:[&>li]:margin-0 [&>li]:border-regular dark:[&>li]:border-white/10 [&>li>.ant-pagination-item-link]:flex [&>li>.ant-pagination-item-link]:items-center [&>li>.ant-pagination-item-link]:justify-center [&>li>.ant-pagination-item-link]:border-none [&>li>.ant-pagination-item-link>.anticon>svg]:text-light [&>li>.ant-pagination-item-link>.anticon>svg]:dark:text-white/30 [&>.ant-pagination-item>a]:text-body [&>.ant-pagination-item>a]:dark:text-white/60 [&>.ant-pagination-item-active]:bg-primary [&>.ant-pagination-item.ant-pagination-item-active>a]:text-white [&>.ant-pagination-item.ant-pagination-item-active>a]:dark:text-white/60 [&>.ant-pagination-options]:border-none [&>.ant-pagination-options>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-pagination-options>.ant-select>.ant-select-selector]:h-[33px] dark:[&>.ant-pagination-options>.ant-select>.ant-select-selector]:text-white/[.60] dark:[&>.ant-pagination-options>.ant-select>.ant-select-arrow]:text-white/[.60] [&>.ant-pagination-options>.ant-select>.ant-select-selector]:border-0 dark:[&>.ant-pagination-options>.ant-select>.ant-select-selector]:border-white/10 [&>.ant-pagination-options>.ant-select>.ant-select-selector]:rounded-6'
                        }}
                        columns={columnsSort}
                        dataSource={dataSort}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </div>
              </>
            </Col>
            <Col xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
                <div className="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <Heading as="h4" className="text-lg font-medium mb-0">
                    Task List
                  </Heading>
                </div>
                <div className="p-[25px]">
                  <TaskList />
                </div>
              </div>
            </Col>
          </Row>
        </>
      </div>
    </>
  );
}

export default DataTables;
