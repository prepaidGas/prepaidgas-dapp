import { useState, useLayoutEffect } from 'react';
import Link from 'next/link';
import {
  UilTimes,
  UilAlignLeft,
  UilAlignRight 
} from '@iconscout/react-unicons';
import FontAwesome from 'react-fontawesome';
import { Buttons } from '@/components/buttons';
import { PageHeaders } from '@/components/page-headers';
import SideNav from './overview/SingleKnowledge/SideNav';
import GeneralKnowledgeTop from './overview/GeneralKnowledgeTop';
import SingleKnowledgeDetails from './overview/SingleKnowledge/Details';

function SingleKnowledge() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Knowledgebase',
    },
  ];

  const path = '/admin/pages/knowledgeBase';
  
  const [state, setState] = useState({
    responsive: 0,
    collapsed: false,
  });
  const { responsive, collapsed } = state;

  useLayoutEffect(() => {
    function updateSize() {
      const width = window.innerWidth;
      setState((prevState) => ({
        ...prevState, // Preserve other properties in the state
        responsive: width,
      }));
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const toggleCollapsed = () => {
    setState({
      ...state,
      collapsed: !collapsed,
    });
  };

  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Knowledgebase"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <GeneralKnowledgeTop />
        <div className="bg-white dark:bg-white/10 mt-[50px] px-[50px] lg:px-[30px] md:px-[20px] pb-[50px] rounded-10">
          <div className="max-w-[1110px] mx-auto">
            <div className="flex justify-between sm:flex-wrap sm:justify-center gap-[10px] pt-6 pb-10">
              <ul className="flex flex-wrap items-center gap-2 mb-0">
                <li>
                  <Link className="text-sm text-dark dark:text-white/[.87]" href={`${path}/plugins`}>
                    Doc Home
                  </Link>
                </li>
                <li>
                  <FontAwesome className="text-[14px] ltr:mr-2 rtl:ml-2" name="angle-right" size="2x" />
                  <Link className="text-sm text-dark dark:text-white/[.87]" href={`${path}/plugins`}>
                    Switch between accounts
                  </Link>
                </li>
                <li>
                  <FontAwesome className="text-[14px] ltr:mr-2 rtl:ml-2" name="angle-right" size="2x" />
                  <Link className="text-sm text-dark dark:text-white/[.87]" href={`${path}/plugins`}>
                    Introduction to Plugin
                  </Link>
                </li>
                <li>
                  <FontAwesome className="text-[14px] ltr:mr-2 rtl:ml-2" name="angle-right" size="2x" />
                  <span className="text-[#868eae] dark:text-white/60">Plugins</span>
                </li>
              </ul>
              {responsive <= 991 && (
                <Buttons type="primary" className="knowledge-sidebar-trigger" onClick={toggleCollapsed}>
                  {collapsed ? <UilAlignLeft /> : <UilAlignRight />}
                </Buttons>
              )}
            </div>
            <div className="flex lg:flex-wrap">
              {responsive > 991 ? (
                <div className="min-w-[330px] h-fit ltr:mr-5 rtl:ml-5 border border-normal dark:border-white/10 rounded">
                  <h4 className="px-[18px] py-5 text-dark  dark:text-white/[.87] text-base border-b border-normal dark:border-white/10 font-semibold">
                    Plugins
                  </h4>
                  <SideNav />
                </div>
              ) : (
                <div className={`fixed top-[64px] ltr:left-0 rtl:right-0 bg-white dark:bg-dark w-[300px] h-full overflow-y-auto z-20 transition ${
                    collapsed ? 'translate-x-0' : 'ltr:-translate-x-[300px] rtl:translate-x-[300px]'
                  } `}
                >
                  <div className="w-[300px] h-screen overflow-y-auto border border-normal dark:border-white/10 rounded">
                    <h4 className="flex justify-between px-[18px] py-5 text-dark dark:text-white/[.87] text-base border-b border-normal dark:border-white/10 font-semibold">
                      Plugins
                      <Buttons
                        type="link"
                        className="absolute top-[18px] ltr:right-[15px] rtl:left-[15px] bg-info h-8 px-5 text-white rounded-[6px]"
                        onClick={toggleCollapsed}
                      >
                        <UilTimes className="w-[14px] h-[14px]" />
                      </Buttons>
                    </h4>
                    <SideNav />
                  </div>
                </div>
              )}

              <SingleKnowledgeDetails />
            </div>
          </div>
          <span
            role="button"
            // tabIndex="0"
            onKeyPress={() => {}}
            className={collapsed ? 'sidebar-shade show' : 'sidebar-shade'}
            onClick={toggleCollapsed}
          />
        </div>
      </main>
    </>
  );
}

export default SingleKnowledge;
