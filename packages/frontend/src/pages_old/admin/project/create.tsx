import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux';
import { Row, Col, Pagination, Skeleton } from 'antd';
import Heading from '@/components/heading';

const GridCard = dynamic(() => import('./overview/GridCard'), {
  loading: () => (
    <div className="bg-white dark:bg-white/10 p-[25px] rounded-[10px]">
      <Skeleton active />
    </div>
  ),
});


import ProjectLayout from './Layout';

interface Project {
  id: number;
  title: string;
  status: string;
  category: string;
  content: string; 
  percentage: number;
}

interface RootState {
  projects: {
    data: Project[];
  };
}

function AddNewProject() {
  const project = useSelector((state:RootState) => state.projects.data);
  const [state, setState] = useState({
    projects: project,
    current: 0,
    pageSize: 0,
  });

  const projects = state.projects;

  useEffect(() => {
    if (project) {
      setState({
        ...state,
        projects: project,
      });
    }
  }, [project]);

  const onShowSizeChange = (current:number, pageSize:number) => {
    setState({ ...state, current, pageSize });
  };

  const onHandleChange = (current:number, pageSize:number) => {
    // You can create pagination in here
    setState({ ...state, current, pageSize });
  };

  return (
    <ProjectLayout>
      <Row gutter={25}>
        {projects.length ? (
          projects.map((value:Project) => {
            return (
              <Col key={value.id} xl={8} md={12} xs={24} className="mb-[25px]">
                <GridCard value={value} />
              </Col>
            );
          })
        ) : (
          <Col md={24}>
            <div className="bg-white dark:bg-white/10 p-[25px] rounded-[10px]">
              <Heading>Data Not Found!</Heading>
            </div>
          </Col>
        )}
        <Col xs={24} className="pb-30">
          <>
            <div className="mb-[34px] text-end [&>.ant-pagination>li]:margin-0 [&>.ant-pagination>li]:border [&>.ant-pagination>li]:margin-0 [&>.ant-pagination>li]:bg-white [&>.ant-pagination>li]:rounded-6 dark:[&>.ant-pagination>li]:bg-white/10 dark:[&>.ant-pagination>li]:margin-0 [&>.ant-pagination>li]:border-regular dark:[&>.ant-pagination>li]:border-white/10 [&>.ant-pagination>li>.ant-pagination-item-link]:flex [&>.ant-pagination>li>.ant-pagination-item-link]:items-center [&>.ant-pagination>li>.ant-pagination-item-link]:justify-center [&>.ant-pagination>li>.ant-pagination-item-link]:border-none [&>.ant-pagination>li>.ant-pagination-item-link>.anticon>svg]:text-light [&>.ant-pagination>li>.ant-pagination-item-link>.anticon>svg]:dark:text-white/30 [&>.ant-pagination>.ant-pagination-item>a]:text-body [&>.ant-pagination>.ant-pagination-item>a]:dark:text-white/60 [&>.ant-pagination>.ant-pagination-item-active]:bg-primary [&>.ant-pagination>.ant-pagination-item.ant-pagination-item-active>a]:text-white [&>.ant-pagination>.ant-pagination-item.ant-pagination-item-active>a]:dark:text-white/60 [&>.ant-pagination>.ant-pagination-options]:border-none [&>.ant-pagination>.ant-pagination-options>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-selector]:h-[33px] dark:[&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-selector]:text-white/[.60] dark:[&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-arrow]:text-white/[.60] [&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-selector]:border-0 dark:[&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-selector]:border-white/10 [&>.ant-pagination>.ant-pagination-options>.ant-select>.ant-select-selector]:rounded-6">
              {projects.length ? (
                <Pagination
                  onChange={onHandleChange}
                  showSizeChanger
                  onShowSizeChange={onShowSizeChange}
                  pageSize={10}
                  defaultCurrent={1}
                  total={40}
                />
              ) : null}
            </div>
          </>
        </Col>
      </Row>
    </ProjectLayout>
  );
}

export default AddNewProject;
