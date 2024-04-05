import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { PageHeaders } from '@/components/page-headers';
import config from '@/config/config';

import DashboardChart from '@/components/charts/DashboardChart';
import DoughnutChart from '@/components/charts/DoughnutChart';

interface RootState {
  ChangeLayoutMode: {
    mode: string;
  }
}

interface Tooltip {
  dataset: {
    label: string;
    borderColor: string;
  };
  formattedValue: string;
}

function ChartJs() {
  const { mainContent } = useSelector((state:RootState) => {
    return {
      mainContent: state.ChangeLayoutMode.mode,
    };
  });
  const { theme } = config;
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Chart',
    },
  ];
  const barChart = {
    height: 200,
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    datasets: [
      {
        data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
        backgroundColor: '#001737',
        barPercentage: 0.6,
        label: 'Runs',
      },
      {
        data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
        backgroundColor: '#1ce1ac',
        barPercentage: 0.6,
        label: 'Dots',
      },
    ],
    legend: {
      display: true,
      labels: {
        display: true,
      },
    },
    scales: {
      y: {
        grid: {
          color: '#485e9029',
          borderDash: [3, 3],
          zeroLineColor: '#485e9029',
          zeroLineWidth: 1,
        },
        ticks: {
          beginAtZero: true,
          fontSize: 14,
          fontFamily: 'Jost',
          color: '#8C90A4',
          max: 80,
          stepSize: 20,
          padding: 10,
          callback(label:string) {
            return `${label}`;
          },
        },
      },

      x: {
        grid: {
          display: false,
          zeroLineWidth: 0,
          color: 'transparent',
          z: 1,
        },
        ticks: {
          fontSize: 14,
          fontFamily: 'Jost',
          fontColor: '#8C90A4',
        },
      },
    },
  };

  const chartjsAreaChart = {
    height: 250,
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
        borderColor: '#001737',
        borderWidth: 1,
        fill: true,
        backgroundColor: '#00173750',
        pointHoverBorderColor: 'transparent',
        label: 'Runs',
      },
      {
        data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
        borderColor: '#1ce1ac',
        borderWidth: 1,
        fill: true,
        backgroundColor: '#1ce1ac50',
        pointHoverBorderColor: 'transparent',
        label: 'Dots',
      },
    ],

    elements: {
      point: {
        radius: 0,
      },
    },
    options: {
      maintainAspectRatio: true,
      hover: {
        mode: 'nearest',
        intersect: false,
      },

      plugins: {
        legend: {
          display: false,
          labels: {
            display: false,
          },
        },
      },
    },
    scales: {
      y: {
        stacked: true,
        display: false,
      },

      x: {
        stacked: true,
        display: false,
      },
    },
  };

  const chartjsDonutChart = {
    height: 150,
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        data: [20, 20, 30, 5, 25],
        backgroundColor: ['#560bd0', '#007bff', '#00cccc', '#cbe0e3', '#74de00'],
      },
    ],

    option: {
      cutoutPercentage: 70,
      borderColor: '#fff',
      maintainAspectRatio: true,
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: 'bottom',
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
    },
  };

  const chartjsLineChart = {
    height: 210,
    width: null,
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
        borderColor: '#001737',
        borderWidth: 1,
        fill: false,
        label: 'Increment',
      },
      {
        data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
        borderColor: '#1ce1ac',
        borderWidth: 1,
        fill: false,
        label: 'Decrement',
      },
    ],
    tooltip: {
      callbacks: {
        label(t:Tooltip) {
          const dstLabel = t.dataset.label;
          const { formattedValue } = t;
          return `  ${formattedValue} ${dstLabel}`;
        },
        labelColor(t:Tooltip) {
          return {
            backgroundColor: t.dataset.borderColor,
            borderColor: 'transparent',
          };
        },
      },
    },
  };

  const chartjsBarChartTransparent = {
    height: 176,
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
        backgroundColor: 'rgba(0,23,55, .5)',
        label: 'Profit',
        barPercentage: 0.6,
      },
      {
        data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
        backgroundColor: 'rgba(28,225,172, .5)',
        label: 'Lose',
        barPercentage: 0.6,
      },
    ],
    legend: {
      display: true,
      position: 'bottom',
      align: 'center',
      labels: {
        boxWidth: 6,
        display: true,
        usePointStyle: true,
      },
    },
  };

  const chartjsPieChart = {
    height: 300,
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        data: [20, 20, 30, 5, 25],
        backgroundColor: ['#ff0000', '#007bff', '#00cccc', '#cbe0e3', '#74de00'],
      },
    ],
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },

    option: {
      borderColor: '#fff',
      maintainAspectRatio: false,
      responsive: true,
    },
    tooltip: {
      mode: 'index',
      callbacks: {
        label(t:any) {
          const { dataset, label, dataIndex } = t;
          return `  ${label} ${dataset.data[dataIndex]}`;
        },
        labelColor({ dataIndex, dataset }:any) {
          return {
            backgroundColor: dataset.backgroundColor[dataIndex],
            borderColor: 'transparent',
          };
        },
      },
    },
  };

  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Chart"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
          <Col md={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Bar Chart
                </h1>
              </div>
              <div className="hexadash-chart-container p-[25px] ltr:pl-[20px] rtl:pr-[20px] relative">
                <DashboardChart
                  {...barChart}
                  type="bar"
                  id="barChart"
                  className="foo"
                  style={{ marginBottom: '20px' }}
                />
              </div>
            </div>

            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Stacked Chart
                </h1>
              </div>
              <div className="hexadash-chart-container p-[25px] relative">
                <DashboardChart
                  {...barChart}
                  type="bar"
                  id="Stacked"
                  scales={{
                    y: {
                      stacked: true,
                      grid: {
                        color: '#485e9029',
                        borderDash: [3, 3],
                        zeroLineColor: '#485e9029',
                        zeroLineWidth: 1,
                      },
                      ticks: {
                        beginAtZero: true,
                        fontSize: 14,
                        fontFamily: 'Jost',
                        color: '#8C90A4',
                        max: 80,
                        stepSize: 20,
                        padding: 10,
                        callback(label:string) {
                          return `${label}k`;
                        },
                      },
                    },

                    x: {
                      stacked: true,
                      grid: {
                        display: false,
                        zeroLineWidth: 0,
                        color: 'transparent',
                        z: 1,
                      },
                      ticks: {
                        fontSize: 14,
                        fontFamily: 'Jost',
                        fontColor: '#8C90A4',
                      },
                    },
                  }}
                />
              </div>
            </div>

            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Area Chart
                </h1>
              </div>
              <div className="hexadash-chart-container p-[25px] relative">
                <DashboardChart {...chartjsAreaChart} type="line" id="area" />
              </div>
            </div>

            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Donut Chart
                </h1>
              </div>
              <div className="hexadash-chart-container p-[25px] relative">
                <DoughnutChart
                  {...chartjsDonutChart}
                  datasets={chartjsDonutChart.datasets.map((dataset) => ({
                    ...dataset,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    fill: false,
                  }))}
                />
              </div>
            </div>
          </Col>
          <Col md={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Horizontal Chart
                </h1>
              </div>
              <div className="hexadash-chart-container p-[25px] ltr:pl-[15px] rtl:pr-[15px] relative">
                <DashboardChart
                  {...barChart}
                  type="bar"
                  id="hChart"
                  option={{
                    indexAxis: 'y',
                  }}
                />
              </div>
            </div>

            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Line Chart
                </h1>
              </div>
              <div className="hexadash-chart-container p-[25px] ltr:pl-[20px] rtl:pr-[20px] relative">
                <DashboardChart {...chartjsLineChart} id="lineChart" />
              </div>
            </div>

            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Transparent Chart
                </h1>
              </div>
              <div className="hexadash-chart-container p-[25px] ltr:pl-[20px] rtl:pr-[20px] relative">
                <DashboardChart
                  {...chartjsBarChartTransparent}
                  type="bar"
                  id="transparentChart"
                  className="foo"
                  style={{ marginBottom: '20px' }}
                />
              </div>
            </div>

            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Pie Chart
                </h1>
              </div>
              <div className="hexadash-chart-container p-[25px] relative">
                <DashboardChart {...chartjsPieChart} type="pie" id="pieChart" />
              </div>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default ChartJs;
