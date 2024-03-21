import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { UilEllipsisH } from '@iconscout/react-unicons';
import { Row, Col, Table, Progress, Pagination, Tag } from 'antd';
import Heading from '@/components/heading';
import DropDown from '@/components/dropdown';

const moreContent = [
  {
      key: '1',
      label: (
          <Link
              className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
              href="#"
          >
              Total Income
          </Link>
      ),
  },
  {
      key: '2',
      label: (
          <Link
              className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
              href="#"
          >
              Total Expense
          </Link>
      ),
  },
  {
      key: '3',
      label: (
          <Link
              className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
              href="#"
          >
              Total Tax
          </Link>
      ),
  },
  {
      key: '4',
      label: (
          <Link
              className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
              href="#"
          >
              Net Profit
          </Link>
      ),
  },
]

interface Project {
  id: number;
  title: string;
  status: string;
  category: string;
  percentage: number;
}

interface RootState {
  projects: {
    data: Project[];
  };
}

function ProjectList() {
  const project = useSelector((state:RootState) => state.projects.data);
  const [state, setState] = useState({
    projects: project,
    current: 0,
    pageSize: 0,
  });
  const { projects } = state;

  useEffect(() => {
    if (project) {
      setState((prevState) => ({
        ...prevState,
        project: project,
      }));
    }
  }, [project]);

  const onShowSizeChange = (current:number, pageSize:number) => {
    setState({ ...state, current, pageSize });
  };

  const onHandleChange = (current:number, pageSize:number) => {
    // You can create pagination in here
    setState({ ...state, current, pageSize });
  };

  const dataSource: any[] = [];

  if (projects.length)
    projects.map((value:Project) => {
      const { id, title, status, category, percentage } = value;
      return dataSource.push({
        key: id,
        project: (
          <>
            <Heading as="h4" className="mb-[5px] text-dark dark:text-white/[.87] text-[15px] font-medium">
              <Link href={`/admin/project/${id}`} className="text-dark dark:text-white/[.87]">
                {title}
              </Link>
            </Heading>
            <p className="mb-0 text-xs text-body dark:text-white/60">{category}</p>
          </>
        ),
        startDate: <span className="text-body dark:text-white/60 text-[15px] font-medium">26 Dec 2019</span>,
        deadline: <span className="text-body dark:text-white/60 text-[15px] font-medium">18 Mar 2020</span>,
        assigned: (
          <>
            <ul className="flex items-center -m-[3px] p-0 gap-[3px]">
              <li>
                <img
                  className="w-[35px] min-w-[35px] h-[35px] rounded-full"
                  src='/hexadash-nextjs/img/users/1.png'
                  alt=""
                />
              </li>
              <li>
                <img
                  className="w-[35px] min-w-[35px] h-[35px] rounded-full"
                  src='/hexadash-nextjs/img/users/2.png'
                  alt=""
                />
              </li>
              <li>
                <img
                  className="w-[35px] min-w-[35px] h-[35px] rounded-full"
                  src='/hexadash-nextjs/img/users/3.png'
                  alt=""
                />
              </li>
              <li>
                <img
                  className="w-[35px] min-w-[35px] h-[35px] rounded-full"
                  src='/hexadash-nextjs/img/users/4.png'
                  alt=""
                />
              </li>
              <li>
                <img
                  className="w-[35px] min-w-[35px] h-[35px] rounded-full"
                  src='/hexadash-nextjs/img/users/5.png'
                  alt=""
                />
              </li>
              <li>
                <img
                  className="w-[35px] min-w-[35px] h-[35px] rounded-full"
                  src='/hexadash-nextjs/img/users/6.png'
                  alt=""
                />
              </li>
              <li>
                <img
                  className="w-[35px] min-w-[35px] h-[35px] rounded-full"
                  src='/hexadash-nextjs/img/users/7.png'
                  alt=""
                />
              </li>
            </ul>
          </>
        ),
        status: (
          <Tag
            className={`inline-flex items-center justify-center bg-${status} text-white dark:text-white/[.87] min-h-[18px] px-3 text-[10px] uppercase font-semibold border-none rounded-1`}
          >
            {status}
          </Tag>
        ),
        completion: (
          <>
            <Progress
              percent={status === 'complete' ? 100 : percentage}
              size="small"
              className="inline-flex items-center text-sm text-body dark:text-white/60 [&>.ant-progress-outer]:h-auto [&>.ant-progress-text]:text-body dark:[&>.ant-progress-text]:text-white/60  [&>.ant-progress-text>.anticon>svg]:text-success"
            />
            <p className="mt-1 text-body dark:text-white/60 text-[13px]">12/15 Task Completed</p>
          </>
        ),
        action: (
          <DropDown
            className="min-w-[140px]"
            customContent={moreContent}
          >
            <Link href="#">
              <UilEllipsisH className="w-4 h-4 text-light-extra dark:text-white/60" />
            </Link>
          </DropDown>
        ),
      });
    });

  const columns = [
    {
      title: 'Project',
      dataIndex: 'project',
      key: 'project',
      className: 'text-light dark:text-white/60 text-[15px] py-2.5 last:text-end border-b border-regular before:hidden',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      className: 'text-light dark:text-white/60 text-[15px] py-2.5 last:text-end border-b border-regular before:hidden',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      className: 'text-light dark:text-white/60 text-[15px] last:text-end border-b border-regular before:hidden',
    },
    {
      title: 'Assigned To',
      dataIndex: 'assigned',
      key: 'assigned',
      className: 'text-light dark:text-white/60 text-[15px] last:text-end border-b border-regular before:hidden',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      className: 'text-light dark:text-white/60 text-[15px] last:text-end border-b border-regular before:hidden',
    },
    {
      title: 'Completion',
      dataIndex: 'completion',
      key: 'completion',
      className: 'text-light dark:text-white/60 text-[15px] last:text-end border-b border-regular before:hidden',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      className: 'text-light dark:text-white/60 text-[15px] last:text-end last:[&>span>a]:flex last:[&>span>a]:justify-end border-regular before:hidden',
    },
  ];

  return (
    <>
      <Row gutter={25}>
        <Col xs={24}>
          <div className="bg-white dark:bg-[#202531] pt-[25px] px-[25px] rounded-[10px]">
            <div className="table-responsive table-th-shape-none table-head-rounded table-th-text-light hover-tr-none [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-s-10 [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-none [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-e-10 [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-none">
              <Table pagination={false} dataSource={dataSource} columns={columns} />
            </div>
          </div>
        </Col>
        <Col xs={24}>
          <div className="px-[25px]">
            {projects.length ? (
              <div className="text-end mt-[30px] mb-[25px] [&>.ant-pagination>li]:margin-0 [&>.ant-pagination>li]:border [&>.ant-pagination>li]:margin-0 [&>.ant-pagination>li]:bg-white [&>.ant-pagination>li]:rounded-6 dark:[&>.ant-pagination>li]:bg-white/10 dark:[&>.ant-pagination>li]:margin-0 [&>.ant-pagination>li]:border-regular dark:[&>.ant-pagination>li]:border-white/10 [&>.ant-pagination>li>.ant-pagination-item-link]:flex [&>.ant-pagination>li>.ant-pagination-item-link]:items-center [&>.ant-pagination>li>.ant-pagination-item-link]:justify-center [&>.ant-pagination>li>.ant-pagination-item-link]:border-none [&>.ant-pagination>li>.ant-pagination-item-link>.anticon>svg]:text-light [&>.ant-pagination>li>.ant-pagination-item-link>.anticon>svg]:dark:text-white/30 [&>.ant-pagination>.ant-pagination-item>a]:text-body [&>.ant-pagination>.ant-pagination-item>a]:dark:text-white/60 [&>.ant-pagination>.ant-pagination-item-active]:bg-primary [&>.ant-pagination>.ant-pagination-item.ant-pagination-item-active>a]:text-white [&>.ant-pagination>.ant-pagination-item.ant-pagination-item-active>a]:dark:text-white/60 [&>.ant-pagination>.ant-pagination-options>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-selector]:h-[33px] dark:[&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-selector]:text-white/[.60] dark:[&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-arrow]:text-white/[.60] [&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-selector]:border-0 dark:[&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-selector]:border-white/10 [&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-selector]:rounded-6">
                <Pagination
                  onChange={onHandleChange}
                  showSizeChanger
                  onShowSizeChange={onShowSizeChange}
                  pageSize={10}
                  defaultCurrent={1}
                  total={40}
                />
              </div>
            ) : null}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default ProjectList;
