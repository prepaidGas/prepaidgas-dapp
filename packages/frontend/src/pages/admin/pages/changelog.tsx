import { Row, Col, Collapse } from 'antd';
import { PageHeaders } from '@/components/page-headers';
import versions from '@/demoData/changelog.json';

const { Panel } = Collapse;

function ChangeLog() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Changelog',
    },
  ];
  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Changelog"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <>
          <Row gutter={25}>
            <Col xxl={19} md={16} xs={24}>
              <div>
                <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
                  <div className="h-[60px] ssm:h-auto px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                    <h1 className="mb-0 inline-flex items-center flex-wrap py-[16px] text-[18px] font-semibold gap-[15px]">
                      <span className="text-lg font-medium text-dark dark:text-white/[.87]">
                        Version {versions[0].version}{' '}
                      </span>
                      <span className="mx-2 text-lg font-medium text-dark dark:text-white/[.87]">-</span>
                      <span className="text-[#868eae] dark:text-white/60 text-base font-normal">{versions[0].date}</span>
                    </h1>
                  </div>
                  <div className="p-[25px]">
                    {versions[0].new && (
                      <div className="mb-[30px]">
                        <span className="inline-block bg-success mb-4 px-2 py-[5px] text-white dark:text-white/[.87] text-xs font-medium leading-4 tracking-[1.4px] rounded">
                          New
                        </span>
                        <ul className="mb-0">
                          {versions[0].new.map((item, key) => {
                            return (
                              <li
                                key={key + 1}
                                className="relative ltr:pl-5 rtl:pr-5 text-body dark:text-white/60 text-base after:absolute ltr:after:left-0 rtl:after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-1.5 after:h-1.5 after:bg-success after:rounded-full"
                              >
                                {item}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                    {/* {versions[0].fixed && (
                      <div className="mb-[30px]">
                        <span className="inline-block bg-info mb-4 px-2 py-[5px] text-white dark:text-white/[.87] text-xs font-medium leading-4 tracking-[1.4px] rounded">
                          Fixed
                        </span>
                        <ul className="mb-0">
                          {versions[0].fixed.map((item, key) => {
                            return (
                              <li
                                key={key + 1}
                                className="relative ltr:pl-5 rtl:pr-5 text-body dark:text-white/60 text-base after:absolute ltr:after:left-0 rtl:after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-1.5 after:h-1.5 after:bg-info after:rounded-full"
                              >
                                {item}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )} */}
                    {/* {versions[0].updated && (
                      <div className="mb-[30px]">
                        <span className="inline-block bg-secondary mb-4 px-2 py-[5px] text-white dark:text-white/[.87] text-xs font-medium leading-4 tracking-[1.4px] rounded">
                          Updated
                        </span>
                        <ul className="mb-0">
                          {versions[0].updated.map((item, key) => {
                            return (
                              <li
                                key={key + 1}
                                className="relative ltr:pl-5 rtl:pr-5 text-body dark:text-white/60 text-base after:absolute ltr:after:left-0 rtl:after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-1.5 after:h-1.5 after:bg-primary after:rounded-full"
                              >
                                {item}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )} */}
                    <Collapse accordion className="changelog-accordion bg-transparent mt-[30px] mb-[20px] border-none">
                      {versions.map((version, index) => {
                        return (
                          index >= 1 && (
                            <Panel
                              key={version.id}
                              className="border-regular border-1 dark:border-white/10 rounded-6 dark:bg-white/10 "
                              header={
                                <>
                                  <span className="text-lg font-medium text-dark dark:text-white/[.87]">
                                    {version.version} -{' '}
                                  </span>
                                  <span className="text-base font-normal text-dark dark:text-white/[.87]">
                                    {version.date}
                                  </span>
                                </>
                              }
                            >
                              <div>
                                {version.new && (
                                  <div>
                                    <span className="inline-block bg-success mb-4 px-2 py-[5px] text-white dark:text-white/[.87] text-xs font-medium leading-4 tracking-[1.4px] rounded">
                                      New
                                    </span>
                                    <ul>
                                      {version.new.map((item, key) => {
                                        return (
                                          <li
                                            key={key + 1}
                                            className="relative ltr:pl-5 rtl:pr-5 text-body dark:text-white/60 text-base after:absolute ltr:after:left-0 rtl:after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-1.5 after:h-1.5 after:bg-success after:rounded-full"
                                          >
                                            {item}
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                )}
                                {/* {version.fixed && (
                                  <div>
                                    <span className="inline-block bg-info mb-4 px-2 py-[5px] text-white dark:text-white/[.87] text-xs font-medium leading-4 tracking-[1.4px] rounded">
                                      Fixed
                                    </span>
                                    <ul>
                                      {version.fixed.map((item, key) => {
                                        return (
                                          <li
                                            key={key + 1}
                                            className="relative ltr:pl-5 rtl:pr-5 text-body dark:text-white/60 text-base after:absolute ltr:after:left-0 rtl:after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-1.5 after:h-1.5 after:bg-info after:rounded-full"
                                          >
                                            {item}
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                )}
                                {version.updated && (
                                  <div>
                                    <span className="inline-block bg-secondary mb-4 px-2 py-[5px] text-white dark:text-white/[.87] text-xs font-medium leading-4 tracking-[1.4px] rounded">
                                      Updated
                                    </span>
                                    <ul>
                                      {version.updated.map((item, key) => {
                                        return (
                                          <li
                                            key={key + 1}
                                            className="relative ltr:pl-5 rtl:pr-5 text-body dark:text-white/60 text-base after:absolute ltr:after:left-0 rtl:after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-1.5 after:h-1.5 after:bg-primary after:rounded-full"
                                          >
                                            {item}
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                )} */}
                              </div>
                            </Panel>
                          )
                        );
                      })}
                    </Collapse>
                  </div>
                </div>
              </div>
            </Col>
            <Col xxl={5} md={8} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Changelog
                  </h1>
                </div>
                <div className="p-[25px]">
                  <h4 className="mb-6 text-dark dark:text-white/[.87] text-[11px] font-medium uppercase">
                    VERSION HISTORY
                  </h4>
                  <ul className="mb-0">
                    {versions.map((version) => {
                      return (
                        <li key={version.id} className="flex justify-between mb-6 last:mb-0">
                          <span className="text-sm font-medium text-dark dark:text-white/[.87]">
                            Version {version.version}
                          </span>
                          <span className="text-sm text-body dark:text-white/60">{version.date}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </>
      </main>
    </>
  );
}

export default ChangeLog;
