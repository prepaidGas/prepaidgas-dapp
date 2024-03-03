import { Row, Col } from 'antd';
import { PageHeaders } from '@/components/page-headers';
import gCharts from '@/demoData/google-charts.json';
import {
  GoogleBasicBarChart,
  GoogleMaterialBarChart,
  GoogleStackedChart,
  GoogleCustomColorChart,
  GoogleOrgChart,
  GoogleComboChart,
  GoogleLineChart,
  GoogleMultiLineChart,
  GoogleBasicPieChart,
  Google3dPieChart,
} from '@/components/charts/google-chart';

const {
  barChartData,
  materialDesignChart,
  comboChartData,
  lineChartData,
  MultilineChartData,
  organizationChartData,
  pieChartData,
} = gCharts;

function GoogleChart() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Google Chart',
    },
  ];
  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Google Chart"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
          <Col md={12} xs={24} className="mb-[25px]">
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative h-full">
              <div className="min-sm:h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] text-[18px] font-semibold">
                  Basic bar chart with multiple series
                </h1>
              </div>
              <GoogleBasicBarChart
                data={barChartData}
                width="100%"
                height="300px"
                title="Population of Largest U.S. Cities"
                chartArea="50%"
                subtitle="Subtitle goes here"
                colors={['#000000', '#111111']}
              />
            </div>
          </Col>
          <Col md={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Material Design
                </h1>
              </div>
              <div className="p-[25px]">
                <GoogleMaterialBarChart
                  data={materialDesignChart}
                  width="100%"
                  height="300px"
                  title="Company Performance"
                  subtitle="Sales, Expenses, and Profit: 2014-2017"
                  chartArea="50%"
                  colors={['#000000', '#111111']}
                />
              </div>
            </div>
          </Col>
          <Col md={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="min-sm:h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] text-[18px] font-semibold">
                  Stacked bar chart with multiple series
                </h1>
              </div>
              <div className="p-[25px]">
                <GoogleStackedChart
                  data={barChartData}
                  width="100%"
                  height="300px"
                  title="Population of Largest U.S. Cities"
                  chartArea="50%"
                  subtitle="Subtitle goes here"
                  colors={['#000000', '#111111']}
                />
              </div>
            </div>
          </Col>
          <Col md={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Custom Colors bar chart
                </h1>
              </div>
              <div className="p-[25px]">
                <GoogleCustomColorChart
                  data={barChartData}
                  width="100%"
                  height="300px"
                  title="Population of Largest U.S. Cities"
                  chartArea="50%"
                  subtitle="Subtitle goes here"
                  colors={['#b0120a', '#ffab91']}
                />
              </div>
            </div>
          </Col>
          <Col md={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Custom Colors bar chart
                </h1>
              </div>
              <div className="p-[25px]">
                <GoogleComboChart
                  data={comboChartData}
                  width="100%"
                  height="300px"
                  title="Monthly Coffee Production by Country"
                  chartArea="50%"
                  subtitle="Subtitle goes here"
                  colors={['#b0120a', '#ffab91', '#e0120a', '#afab91']}
                />
              </div>
            </div>
          </Col>
          <Col md={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Line chart
                </h1>
              </div>
              <div className="p-[25px]">
                <GoogleLineChart
                  data={lineChartData}
                  width="100%"
                  height="300px"
                  title="Monthly Coffee Production by Country"
                  chartArea="50%"
                  subtitle="Subtitle goes here"
                  colors={['#000000']}
                />
              </div>
            </div>
          </Col>
          <Col md={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Multiple Line charts
                </h1>
              </div>
              <div className="p-[25px]">
                <GoogleMultiLineChart
                  data={MultilineChartData}
                  width="100%"
                  height="300px"
                  title="Monthly Coffee Production by Country"
                  chartArea="50%"
                  subtitle="Subtitle goes here"
                  colors={['#000000']}
                />
              </div>
            </div>
          </Col>
          <Col md={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Organization
                </h1>
              </div>
              <div className="p-[25px]">
                <GoogleOrgChart
                  data={organizationChartData}
                  width="100%"
                  height="300px"
                  title="Monthly Coffee Production by Country"
                  chartArea="100%"
                  subtitle="Subtitle goes here"
                  colors={['#000000']}
                />
              </div>
            </div>
          </Col>
          <Col md={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Basic Pie chart
                </h1>
              </div>
              <div className="p-[25px]">
                <GoogleBasicPieChart
                  data={pieChartData}
                  width="100%"
                  height="300px"
                  title="My Daily Activities"
                  chartArea="100%"
                  subtitle="Subtitle goes here"
                  colors={['#000000']}
                />
              </div>
            </div>
          </Col>
          <Col md={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  3d Pie chart
                </h1>
              </div>
              <div className="p-[25px]">
                <Google3dPieChart
                  data={pieChartData}
                  width="100%"
                  height="300px"
                  title="My Daily Activities"
                  chartArea="100%"
                  subtitle="Subtitle goes here"
                  colors={['#000000']}
                />
              </div>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
}
export default GoogleChart;
