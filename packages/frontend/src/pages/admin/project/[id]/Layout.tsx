import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  UilPlus,
  UilCheck,
  UilEditAlt,
  UilTrashAlt,
  UilListUl,
  UilChartPie,
  UilWebGridAlt,
  UilClock,
  UilUserPlus
} from '@iconscout/react-unicons';
import { useRouter } from 'next/router';
import { Row, Col, Progress } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Heading from '@/components/heading';
import { Buttons } from '@/components/buttons';
import { filterSinglePage } from '@/redux/project/actionCreator';
import FileListCard from '../overview/FileListCard';

const ProjectDetailsLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { pathname, asPath } = router;
  const id = asPath.split('/')[3];
  const currentPath = pathname.split('/')[4];
  const path = '/admin/project/' + id;

  const dispatch = useDispatch();
  const project = useSelector((state:any) => state.project.data);
  
  useEffect(() => {
    if (!dispatch) {

    //@ts-ignore
      dispatch(filterSinglePage(parseInt(currentPath.id, 10)));
    }
  }, [currentPath, dispatch]);

  const { title, content } = project[0];

  return (
    <>
      <div className="flex items-center justify-between pt-[42px] pb-[35px] px-[25px] flex-wrap gap-[15px] sm:justify-center">
        <div className="inline-flex flex-wrap items-center gap-5 md:justify-center">
          <Heading as="h4" className="text-dark dark:text-white/[.87] text-[20px] font-semibold mb-0">
            {title}
          </Heading>
          <div className="flex items-center gap-x-3">
            <Buttons
              className="h-[35px] px-[14px] text-sm font-semibold rounded-md"
              size="default"
              type="primary"
              key="1"
            >
              <Link href="#" className="flex items-center gap-[6px] text-xs font-medium">
                <UilPlus className="w-[14px] h-[14px]" /> Add Task
              </Link>
            </Buttons>
            <Buttons
              className="h-[35px] px-[14px] text-xs font-semibold rounded-md dark:text-white/[.87] dark:bg-white/10 dark:border-white/10 dark:hover:bg-white/30 transition duration-300"
              size="default"
              type="default"
              key="2"
            >
              <Link href="#" className="flex items-center gap-[6px]">
                <UilCheck className="w-[14px] h-[14px]" /> Mark as Complete
              </Link>
            </Buttons>
          </div>
        </div>
        <div className="inline-flex items-center gap-x-5">
          <Link
            href="#"
            className="flex items-center gap-x-1.5 bg-white dark:bg-white/10 text-primary h-[35px] px-[14px] text-xs font-medium border border-normal dark:border-white/10 rounded-md"
          >
            <UilEditAlt className="w-[14px] h-[14px]" />
            Edit
          </Link>
          <Link
            href="#"
            className="flex items-center gap-x-1.5 bg-white dark:bg-white/10 dark:hover:bg-white/30 text-danger h-[35px] px-[14px] text-xs font-medium border border-normal dark:border-white/10 rounded-md transition duration-300"
          >
            <UilTrashAlt className="w-[14px] h-[14px]" />
            Remove
          </Link>
        </div>
      </div>
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-[30px] ssm:px-[15px]  pb-[20px]">
        <Row gutter={25}>
          <Col xxl={6} xl={8} xs={24}>
            <div className="bg-success mb-[25px] py-4 px-[25px] rounded-[10px]">
              <h3 className="text-lg font-medium text-white dark:text-white/[.87]">Progress</h3>
              <Progress
                percent={65}
                size="small"
                status="active"
                className="gap-x-2 h-[5px] [&>div>.ant-progress-inner]:bg-[#fff3] [&>div>div>.ant-progress-bg]:bg-white dark:[&>div>div>.ant-progress-bg]:bg-white/[.87] [&>.ant-progress-text]:text-white dark:[&>.ant-progress-text]:text-white/60 [&>.ant-progress-text]:font-medium"
              />
            </div>
            <div className="bg-white dark:bg-white/10 mb-[25px] p-[25px] rounded-[10px] gap-[25px] flex flex-wrap min-xl:flex-col xl:justify-between">
              <div className="flex items-center gap-x-5">
                <Link
                  href="#"
                  className="flex items-center justify-center bg-primary-transparent text-primary w-[60px] h-[60px] rounded-xl"
                >
                  <UilListUl className="w-[25px] h-[25px]" />
                </Link>
                <div>
                  <Heading as="h5" className="text-dark dark:text-white/[.87] text-[20px] font-semibold mb-[3px]">
                    47
                  </Heading>
                  <p className="mb-0 text-body dark:text-white/60">Total Task</p>
                </div>
              </div>
              <div className="flex items-center gap-x-5">
                <Link
                  href="#"
                  className="flex items-center justify-center bg-secondary-transparent text-secondary w-[60px] h-[60px] rounded-xl"
                >
                  <UilChartPie className="w-[25px] h-[25px]" />
                </Link>
                <div>
                  <Heading as="h5" className="text-dark dark:text-white/[.87] text-[20px] font-semibold mb-[3px]">
                    34
                  </Heading>
                  <p className="mb-0 text-body dark:text-white/60">Task Completed</p>
                </div>
              </div>
              <div className="flex items-center gap-x-5">
                <Link
                  href="#"
                  className="flex items-center justify-center bg-success-transparent text-success w-[60px] h-[60px] rounded-xl"
                >
                  <UilWebGridAlt className="w-[25px] h-[25px]" />
                </Link>
                <div>
                  <Heading as="h5" className="text-dark dark:text-white/[.87] text-[20px] font-semibold mb-[3px]">
                    $27,500
                  </Heading>
                  <p className="mb-0 text-body dark:text-white/60">Spendings</p>
                </div>
              </div>
              <div className="flex items-center gap-x-5">
                <Link
                  href="#"
                  className="flex items-center justify-center bg-warning-transparent text-warning w-[60px] h-[60px] rounded-xl"
                >
                  <UilClock className="w-[25px] h-[25px]" />
                </Link>
                <div>
                  <Heading as="h5" className="text-dark dark:text-white/[.87] text-[20px] font-semibold mb-[3px]">
                    250
                  </Heading>
                  <p className="mb-0 text-body dark:text-white/60">Hours Spent</p>
                </div>
              </div>
            </div>
          </Col>
          <Col xxl={12} xl={16} xs={24}>
            <div className="bg-white dark:bg-white/10 min-4xl:min-h-[485px] mb-[25px] rounded-[10px]">
              <div className="px-[25px] py-[18px] border-b border-regular dark:border-white/10">
                <Heading as="h3" className="m-0 text-lg font-semibold text-dark dark:text-white/[.87]">
                  About Project
                </Heading>
              </div>
              <div className="p-[25px]">
                <div>
                  <p className="text-body dark:text-white/60">{content}</p>
                  <p className="text-body dark:text-white/60">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3
                    wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                    eiusmod. Brunch 3 wolf moon tempor
                  </p>
                </div>
                <div className="flex items-center mt-[42px] gap-x-20 gap-y-[15px] flex-wrap">
                  <div>
                    <span className="mb-[3px] text-body dark:text-white/60 text-[13px]">Project Owner</span>
                    <p className="font-medium text-body dark:text-white/60">Peter Jackson</p>
                  </div>
                  <div>
                    <span className="mb-[3px] text-body dark:text-white/60 text-[13px]">Budget</span>
                    <p className="font-medium text-body dark:text-white/60">$56,700</p>
                  </div>
                  <div>
                    <span className="mb-[3px] text-body dark:text-white/60 text-[13px]">Start Date</span>
                    <p className="font-medium text-primary">28 Dec 2019</p>
                  </div>
                  <div>
                    <span className="mb-[3px] text-body dark:text-white/60 text-[13px]">Deadline</span>
                    <p className="font-medium text-danger">18 Mar 2020</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xxl={6} lg={9} xs={24}>
            <div className="bg-white dark:bg-white/10 min-h-[485px] mb-[25px] rounded-[10px]">
              <div className="flex items-center justify-between px-[25px] py-3 border-b border-regular dark:border-white/10">
                <Heading as="h3" className="m-0 text-lg font-semibold text-dark dark:text-white/[.87]">
                  Users
                </Heading>
                <Buttons
                  className="flex items-center gap-x-1.5 h-[38px] px-3 text-xs font-medium dark:text-white/[.87] dark:bg-transparent dark:border-white/10"
                  outlined
                  type="white"
                  size="small"
                >
                  <UilUserPlus className="w-[14px] h-[14px]" /> Add Users
                </Buttons>
              </div>
              <div className="flex flex-col gap-y-[25px] p-[25px]">
                <div className="flex items-center gap-x-[15px]">
                  <div>
                    <img
                      className="w-[45px] h-[45px] rounded-full"
                      src='/hexadash-nextjs/img/users/1.png'
                      alt=""
                    />
                  </div>
                  <div>
                    <Heading as="h5" className="text-dark dark:text-white/[.87] text-sm font-semibold mb-0.5">
                      Meyri Carles
                    </Heading>
                    <p className="mb-0 text-body dark:text-white/60">Web Developer</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-[15px]">
                  <div>
                    <img
                      className="w-[45px] h-[45px] rounded-full"
                      src='/hexadash-nextjs/img/users/3.png'
                      alt=""
                    />
                  </div>
                  <div>
                    <Heading as="h5" className="text-dark dark:text-white/[.87] text-sm font-semibold mb-0.5">
                      Tuhin Molla
                    </Heading>
                    <p className="mb-0 text-body dark:text-white/60">Project Manager</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-[15px]">
                  <div>
                    <img
                      className="w-[45px] h-[45px] rounded-full"
                      src='/hexadash-nextjs/img/users/9.jpg'
                      alt=""
                    />
                  </div>
                  <div>
                    <Heading as="h5" className="text-dark dark:text-white/[.87] text-sm font-semibold mb-0.5">
                      Billal Hossain
                    </Heading>
                    <p className="mb-0 text-body dark:text-white/60">App Developer</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-[15px]">
                  <div>
                    <img
                      className="w-[45px] h-[45px] rounded-full"
                      src='/hexadash-nextjs/img/users/4.png'
                      alt=""
                    />
                  </div>
                  <div>
                    <Heading as="h5" className="text-dark dark:text-white/[.87] text-sm font-semibold mb-0.5">
                      Khalid Hasan
                    </Heading>
                    <p className="mb-0 text-body dark:text-white/60">App Developer</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-[15px]">
                  <div>
                    <img
                      className="w-[45px] h-[45px] rounded-full"
                      src='/hexadash-nextjs/img/users/5.png'
                      alt=""
                    />
                  </div>
                  <div>
                    <Heading as="h5" className="text-dark dark:text-white/[.87] text-sm font-semibold mb-0.5">
                      Meyri Carles
                    </Heading>
                    <p className="mb-0 text-body dark:text-white/60">Ui Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xxl={16} lg={15} xs={24}>
            <>
              <div className="bg-white dark:bg-white/10 rounded-[10px] mb-[25px]">
                <nav className="flex items-center gap-x-[30px] px-[25px] py-0 border-b border-regular dark:border-white/10">
                  <Link
                    href={`${path}/tasklist`}
                    className={`relative py-5 text-sm font-medium after:absolute ltr:after:left-0 rtl:after:right-0 after:bottom-0 after:w-full after:h-[1px] ${
                      currentPath === 'tasklist' || currentPath === undefined
                        ? 'text-primary after:block after:bg-primary'
                        : 'text-body dark:text-white/60 after:none'
                    }`}
                  >
                    Task List
                  </Link>
                  <Link
                    href={`${path}/activities`}
                    className={`relative py-5 text-sm font-medium after:absolute ltr:after:left-0 rtl:after:right-0 after:bottom-0 after:w-full after:h-[1px] ${
                      currentPath === 'activities'
                        ? 'text-primary after:block after:bg-primary'
                        : 'text-body dark:text-white/60 after:none'
                    }`}
                  >
                    Activities
                  </Link>
                </nav>
                <div className="min-h-[435px] w-full flex pt-[10px] ltr:pr-[17px] rtl:pl-[17px] pb-0.5">
                  { children }
                </div>
              </div>
            </>
          </Col>
          <Col xxl={8} xs={24}>
            <FileListCard title={''} />
          </Col>
        </Row>
      </main>
    </>
  );
}

export default ProjectDetailsLayout;
