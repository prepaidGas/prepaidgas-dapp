import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import dynamic from 'next/dynamic'
import {
  UilEye,
  UilEdit,
  UilPlus,
  UilTrashAlt
} from '@iconscout/react-unicons';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Input, Select, Table, Popconfirm, Skeleton } from 'antd';
import SupportCreate from '../overview/SupportCreate';
import SupportUpdate from '../overview/SupportUpdate';
import { PageHeaders } from '@/components/page-headers';
import { Buttons } from '@/components/buttons';
import { idGenerator } from '@/utility';
import { ticketReadData, ticketUpdateData, ticketUpdateSearch } from '@/redux/supportTickets/actionCreator';

const OverviewDataList = dynamic(() => import('../overview/OverviewDataList'), {
  loading: () => (
    <>
      <Skeleton active />
    </>
  ),
});

const PageRoutes = [
  {
    path: 'index',
    breadcrumbName: 'Dashboard',
  },
  {
    path: 'app',
    breadcrumbName: 'Apps',
  },
  {
    path: 'first',
    breadcrumbName: 'Tickets',
  },
];

function AddSupportTicket() {
  const { dataState } = useSelector((state:any) => {
    return {
      dataState: state.tickets.data,
    };
  });

  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [editableData, setEditableData] = useState(false);

  const dataSource:any = [];

  useEffect(() => {
    if (dispatch) {
      //@ts-ignore
      dispatch(ticketReadData());
    }
    setVisible(true);
  }, [dispatch]);

  const confirm = (id:number, e:React.MouseEvent<HTMLElement, MouseEvent>) => {
    const deleteData = dataState.filter((ticket:any) => ticket.id !== id);
    //@ts-ignore
    dispatch(ticketUpdateData(deleteData));
  };

  const cancel = () => {};

  const prefix = (
    <SearchOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      className:
        'ltr:rounded-l-[10px] rtl:rounded-r-[10px] ltr:pl-[25px] rtl:pr-[25px] text-dark dark:text-white/[.87] font-medium text-[15px] py-[16px] last:text-end border-none capitalize before:hidden',
    },
    {
      title: 'Requested By',
      dataIndex: 'requested',
      key: 'requested',
      className:
        'ltr:pr-4 rtl:pl-4 text-dark dark:text-white/[.87] font-medium text-[15px] py-[16px] last:text-end border-none capitalize before:hidden',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      className:
        'ltr:pr-4 rtl:pl-4 text-dark dark:text-white/[.87] font-medium text-[15px] py-[16px] last:text-end border-none capitalize before:hidden',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      className:
        'ltr:pr-4 rtl:pl-4 text-dark dark:text-white/[.87] font-medium text-[15px] py-[16px] last:text-end border-none capitalize before:hidden',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      className:
        'ltr:pr-4 rtl:pl-4 text-dark dark:text-white/[.87] font-medium text-[15px] py-[16px] last:text-end border-none capitalize before:hidden',
    },
    {
      title: 'Created Date',
      dataIndex: 'createAt',
      key: 'createAt',
      className:
        'ltr:pr-4 rtl:pl-4 text-dark dark:text-white/[.87] font-medium text-[15px] py-[16px] last:text-end border-none capitalize before:hidden',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
      className:
        'ltr:pr-4 rtl:pl-4 text-dark dark:text-white/[.87] font-medium text-[15px] py-[16px] last:text-end border-none capitalize before:hidden ltr:rounded-r-[10px] rtl:rounded-l-[10px] ltr:pr-[25px] rtl:pl-[25px]',
    },
  ];

  const showModalEdit = (values:any) => {
    setEditableData(values);
    setVisibleEdit(true);
  };

  const onCancelEdit = () => {
    setVisibleEdit(false);
  };

  if (dataState.length) {
    dataState.map((item:any) => {
      const { id, user, status, subject, priority, createAt } = item;
      return dataSource.push({
        key: `${id}`,
        id: `#${id}`,
        requested: (
          <div className="flex items-center gap-x-[20px] gap-y-[15px]">
            <div>
              <img className="max-w-[30px] rounded-full" src={`/hexadash-nextjs/${user.img}`} alt="" />
            </div>
            <div>
              <p className="mb-0 text-[15px] text-theme-gray dark:text-white/60 font-medium">{user.name}</p>
            </div>
          </div>
        ),
        status: (
          <span
            className={`text-xs text-theme-gray dark:text-white/60 font-medium inline-flex items-center justify-center min-h-[24px] px-3 rounded-[15px] status-${status} [&.status-open]:text-active [&.status-open]:bg-active-transparent [&.status-pending]:text-deactivated [&.status-pending]:bg-deactivated-transparent [&.status-close]:text-blocked [&.status-close]:bg-blocked-transparent`}
          >
            {status}
          </span>
        ),
        subject: <span className="text-[15px] text-theme-gray dark:text-white/60 font-medium">{subject}</span>,
        priority: <span className="text-[15px] text-theme-gray dark:text-white/60 font-medium">{priority}</span>,
        createAt: <span className="text-[15px] text-theme-gray dark:text-white/60 font-medium">{createAt}</span>,
        action: (
          <div className="flex items-center gap-[15px]">
            <Link className="view group hover:text-success" href={`/admin/support/tickets/${id}`}>
              <UilEye className="w-4 text-light-extra dark:text-white/60 group-hover:text-currentColor" />
            </Link>
            <Link onClick={() => showModalEdit(item)} className="edit group hover:text-info" href="#">
              <UilEdit className="w-4 text-light-extra dark:text-white/60 group-hover:text-currentColor" />
            </Link>
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={(e) => { if (e) confirm(id, e); }}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Link className="delete group hover:text-danger" href="#">
                <UilTrashAlt className="w-4 text-light-extra dark:text-white/60 group-hover:text-currentColor" />
              </Link>
            </Popconfirm>
          </div>
        ),
      });
    });
  }

  const showModal = () => {
    setVisible(true);
  };

  const onCancel = () => {
    setVisible(false);
  };

  const handleSubmit = (values:any) => {
    const id = idGenerator(dataState, 2);
    dispatch(
      //@ts-ignore
      ticketUpdateData(
        dataState.concat({
          ...values,
          user: {
            name: 'Kellie Marquot',
            img: '/hexadash-nextjs/img/avatar/profileImage.png',
            conversations: [],
          },
          createAt: moment().format('MM-DD-yyyy'),
          id,
        }),
      ),
    );
    setVisible(false);
  };

  const handleUpdate = (values:any) => {
    const newData = dataState.map((item:any) => {
      setVisibleEdit(false);
      if (item.id === values.id) {
        const newItem = { ...item };

        newItem.subject = values.subject;
        newItem.email = values.email;
        newItem.priority = values.priority;
        newItem.status = values.status;
        newItem.description = values.description;
        return newItem;
      }
      return item;
    });
  //@ts-ignore
    dispatch(ticketUpdateData(newData));
  };

  const handleIdSearch = (e:any) => {
    const id = e.currentTarget.value;
    //@ts-ignore
    dispatch(ticketUpdateSearch(id, 'id'));
  };

  const handleStatusSearch = (value:string) => {
    //@ts-ignore
    dispatch(ticketUpdateSearch(value, 'status'));
  };

  const handleSubjectSearch = (e:any) => {
    const { value } = e.currentTarget;
    //@ts-ignore
    dispatch(ticketUpdateSearch(value, 'subject'));
  };

  return (
    <>
      <PageHeaders
        className="flex flex-wrap items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col sm:justify-center"
        title="Support Ticket"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <Row justify="center">
          <Col xs={24}>
            <OverviewDataList />
          </Col>
        </Row>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative p-[25px]">
              <div className=" text-dark dark:text-white/[.87] font-medium text-[17px] flex flex-wrap items-center justify-between gap-[15px]">
                <h1 className="mb-0 inline-block overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  All Support Ticket
                </h1>
                <Buttons
                  onClick={showModal}
                  className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[15px] h-[44px] shadow-btn gap-[8px]"
                >
                  <UilPlus className="w-[16px] h-[16px]" /> Add Ticket
                </Buttons>
              </div>

              <div className="flex items-center justify-between flex-wrap w-full mt-[20px] mb-[25px] gap-[20px] md:justify-center md:flex-col">
                <div className="inline-flex items-center flex-wrap gap-x-[20px] gap-y-[10px] md:justify-center">
                  <div className="flex items-center gap-[8px]">
                    <span className="text-theme-gray dark:text-white/60">Id:</span>
                    <Input
                      className="bg-white dark:bg-white/10 rounded-6 py-[7.22px] px-[20px] text-theme-gray dark:text-white/60 border-normal dark:border-white/10 border-1 text-ellipsis dark:placeholder-white/60"
                      onChange={handleIdSearch}
                      placeholder="Search with Id"
                    />
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <span className="text-theme-gray dark:text-white/60">Status:</span>
                    <Select
                      className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center dark:[&>div>.ant-select-selection-item]:text-white/60 dark:[&>.ant-select-arrow]:text-white/60 h-[40px]"
                      onChange={handleStatusSearch}
                      style={{ width: 200 }}
                      defaultValue=""
                    >
                      <Select.Option value="">All</Select.Option>
                      <Select.Option value="Open">Open</Select.Option>
                      <Select.Option value="Pending">Pending</Select.Option>
                      <Select.Option value="Close">Close</Select.Option>
                    </Select>
                  </div>
                </div>
                <div className="min-sm:min-w-[280px]">
                  <Input
                    className="bg-white dark:bg-white/10 rounded-6 py-[7.22px] px-[20px] text-theme-gray dark:text-white/60  border-normal dark:border-white/10 border-1 text-ellipsis [&>span>span>svg]:text-light dark[&>span>span>svg]:text-white/60 dark:[&>.ant-input]:bg-transparent"
                    onChange={handleSubjectSearch}
                    placeholder="Search"
                    prefix={prefix}
                  />
                </div>
              </div>
              <>
                <div className="table-pl-0 hover-tr-none table-pt-15 table-responsive ant-pagination-custom-style [&>div>div>div>ul]:pt-[30px] [&>div>div>div>ul]:mt-[20px] [&>div>div>div>ul]:border-normal dark:[&>div>div>div>ul]:border-white/10 [&>div>div>div>ul]:border-t-1 [&>div>div>div>ul]:justify-center">
                  <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{ 
                      pageSize: 10, 
                      showSizeChanger: true,
                      className: 'text-end [&>li]:margin-0 [&>li]:border [&>li]:margin-0 [&>li]:bg-white [&>li]:rounded-6 dark:[&>li]:bg-white/10 dark:[&>li]:margin-0 [&>li]:border-regular dark:[&>li]:border-white/10 [&>li>.ant-pagination-item-link]:flex [&>li>.ant-pagination-item-link]:items-center [&>li>.ant-pagination-item-link]:justify-center [&>li>.ant-pagination-item-link]:border-none [&>li>.ant-pagination-item-link>.anticon>svg]:text-light [&>li>.ant-pagination-item-link>.anticon>svg]:dark:text-white/30 [&>.ant-pagination-item>a]:text-body [&>.ant-pagination-item>a]:dark:text-white/60 [&>.ant-pagination-item-active]:bg-primary [&>.ant-pagination-item.ant-pagination-item-active>a]:text-white [&>.ant-pagination-item.ant-pagination-item-active>a]:dark:text-white/60 [&>.ant-pagination-options>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-pagination-options>.ant-select>.ant-select-selector]:h-[33px] dark:[&>.ant-pagination-options>.ant-select>.ant-select-selector]:text-white/[.60] dark:[&>.ant-pagination-options>.ant-select>.ant-select-arrow]:text-white/[.60] [&>.ant-pagination-options>.ant-select>.ant-select-selector]:border-0 dark:[&>.ant-pagination-options>.ant-select>.ant-select-selector]:border-white/10 [&>.ant-pagination-options>.ant-select>.ant-select-selector]:rounded-6', 
                    }}
                  />
                </div>
              </>
            </div>
          </Col>
        </Row>
      </main>
      <SupportCreate onCancel={onCancel} handleSubmit={handleSubmit} visible={visible} />
      <SupportUpdate
        onCancel={onCancelEdit}
        editableData={editableData}
        handleSubmit={handleUpdate}
        visible={visibleEdit}
      />
    </>
  );
}

export default AddSupportTicket;
