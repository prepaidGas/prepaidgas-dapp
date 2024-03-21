import { Table } from 'antd';
import Link from 'next/link';
import {
  UilEye, 
  UilEdit,
  UilTrashAlt
} from '@iconscout/react-unicons';
 import { useSelector } from 'react-redux';
import Heading from '@/components/heading';

function UserListTable() {
  interface User {
    id: number;
    name: string;
    designation: string;
    img: string;
    status: string;
  }
  
  interface RootState {
    users: User[];
  }

  interface UserData {
    key: number,
    user: any,
    email: any,
    company: any,
    position: any,
    joinDate: any,
    status: any,
    action: any,
  }

  const { users } = useSelector((state:RootState) => {
    return {
      users: state.users,
    };
  });

  const usersTableData:UserData[] = [];

  users.map((user:User) => {
    const { id, name, designation, img, status } = user;

    return usersTableData.push({
      key: id,
      user: (
        <div className="flex items-center">
          <figure className="mx-2 mb-0">
            <img style={{ width: '40px' }} src={`/hexadash-nextjs/${img}`} alt="" />
          </figure>
          <figcaption>
            <Heading className="mb-1 text-sm font-medium text-dark dark:text-white/[.87]" as="h6">
              {name}
            </Heading>
            <span className="flex text-xs font-normal text-light dark:text-white/60">San Francisco, CA</span>
          </figcaption>
        </div>
      ),
      email: <span className="text-body dark:text-white/60 text-[15px] font-medium">john@gmail.com</span>,
      company: <span className="text-body dark:text-white/60 text-[15px] font-medium">Business Development</span>,
      position: <span className="text-body dark:text-white/60 text-[15px] font-medium">{designation}</span>,
      joinDate: <span className="text-body dark:text-white/60 text-[15px] font-medium">January 20, 2020</span>,
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
            <UilTrashAlt className="w-4 text-light-extra dark:text-white/60" />
          </Link>
        </div>
      ),
    });
  });

  const usersTableColumns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
      dataIndex: 'joinDate',
      key: 'joinDate',
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

  const rowSelection = {
    getCheckboxProps: (record:any) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div className="ant-pagination-custom-style table-responsive hover-tr-none table-th-shape-none table-last-th-text-right table-th-border-none table-head-rounded table-selection-col-pl-25 table-tr-selected-background-transparent table-td-border-none bg-white dark:bg-transparent rounded-[10px] ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-none ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-none">
      <Table
        className="[&>div>div>.ant-table]:mb-7 [&>div>div>.ant-table]:pb-5 [&>div>div>.ant-table]:border-b [&>div>div>.ant-table]:border-regular dark:[&>div>div>.ant-table]:border-white/10 ltr:[&>div>div>div>div>div>table>thead>tr>th:first-child]:pl-[20px] ltr:[&>div>div>div>div>div>table>tbody>tr>td:first-child]:pl-[20px] rtl:[&>div>div>div>div>div>table>thead>tr>th:first-child]:pr-[20px] rtl:[&>div>div>div>div>div>table>tbody>tr>td:first-child]:pr-[20px]"
        rowSelection={rowSelection}
        dataSource={usersTableData}
        columns={usersTableColumns}
        pagination={{
          defaultPageSize: 5,
          total: usersTableData.length,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`, 
          className: 'text-end [&>li]:margin-0 [&>li]:border [&>li]:margin-0 [&>li]:bg-white [&>li]:rounded-6 dark:[&>li]:bg-white/10 dark:[&>li]:margin-0 [&>li]:border-regular dark:[&>li]:border-white/10 [&>li>.ant-pagination-item-link]:flex [&>li>.ant-pagination-item-link]:items-center [&>li>.ant-pagination-item-link]:justify-center [&>li>.ant-pagination-item-link]:border-none [&>li>.ant-pagination-item-link>.anticon>svg]:text-light [&>li>.ant-pagination-item-link>.anticon>svg]:dark:text-white/30 [&>.ant-pagination-item>a]:text-body [&>.ant-pagination-item>a]:dark:text-white/60 [&>.ant-pagination-item-active]:bg-primary [&>.ant-pagination-item.ant-pagination-item-active>a]:text-white [&>.ant-pagination-item.ant-pagination-item-active>a]:dark:text-white/60 [&>.ant-pagination-options]:border-none [&>.ant-pagination-options>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-pagination-options>.ant-select>.ant-select-selector]:h-[33px] dark:[&>.ant-pagination-options>.ant-select>.ant-select-selector]:text-white/[.60] dark:[&>.ant-pagination-options>.ant-select>.ant-select-arrow]:text-white/[.60] [&>.ant-pagination-options>.ant-select>.ant-select-selector]:border-0 dark:[&>.ant-pagination-options>.ant-select>.ant-select-selector]:border-white/10 [&>.ant-pagination-options>.ant-select>.ant-select-selector]:rounded-6',
        }}
      />
    </div>
  );
}

export default UserListTable;
