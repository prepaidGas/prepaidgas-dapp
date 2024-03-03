import React from 'react';
import Link from 'next/link';
import {
  UilArrowDown,
  UilArrowUp,
  UilPrint,
  UilBookOpen,
  UilFileAlt,
  UilFile,
  UilTimes,
} from '@iconscout/react-unicons';
import DashboardChart from '@/components/charts/DashboardChart';
import { Cards } from '@/components/cards/frame/cards-frame';
import { customTooltips } from '@/components/utilities';

const salesRevenue = {
  users: ['72.6K', [0, 25, 20, 5, 60, 18, 20, 45, 35, 50, 48, 45], [20, 40, 55, 26, 40, 55, 38, 35, 25, 70, 20, 80]],
  totalOrder: '8550',
  orderGrowth: '25',
  totalSales: '5550',
  salesDown: '15',
  labels: ['Jan', 'Feb', 'Mar', 'App', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

interface Value {
  formattedValue: number;
  dataset: {
    label: string
  };
}

const SalesReport = React.memo((title:any) => {
  const moreContent = [  
    {
        key: '1',
        label: (
          <Link
            className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
            href="#"
          >
            <UilPrint className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
            <span>Printer</span>
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
            <UilBookOpen className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
            <span>PDF</span>
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
            <UilFileAlt className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
            <span>Google Sheets</span>
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
            <UilTimes className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
            <span>Excel (XLSX)</span>
          </Link>
        ),
    },
    {
        key: '5',
        label: (
          <Link
            className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
            href="#"
          >
            <UilFile className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
            <span>CSV</span>
          </Link>
        ),
    },
  ]

  const salesRevenueDatasets = [
    {
      data: salesRevenue.users[1],
      borderColor: '#8231D3',
      borderWidth: 3,
      fill: true,
      backgroundColor: 'transparent',
      label: 'Total Orders',
      pointBorderColor: 'transparent',
      pointBackgroundColor: '#8231D3',
      hoverBorderWidth: 5,
      amount: '$7,596',
      amountClass: 'current-amount',
      lineTension: 0.45,
      hoverRadius: '6',
      pointRadius: 0,
      pointHoverRadius: 6,
      pointHitRadius: 30,
      pointStyle: 'circle',
      pointHoverBorderWidth: 2,
    },
    {
      data: salesRevenue.users[2],
      borderColor: '#00AAFF',
      borderWidth: 3,
      fill: true,
      backgroundColor: 'transparent',
      label: 'Total Sales',
      pointBorderColor: 'transparent',
      pointBackgroundColor: '#00AAFF',
      hoverBorderWidth: 5,
      amount: '$7,596',
      amountClass: 'current-amount',
      lineTension: 0.45,
      hoverRadius: '6',
      pointRadius: 0,
      pointHoverRadius: 6,
      pointHitRadius: 30,
      pointStyle: 'circle',
      pointHoverBorderWidth: 2,
    },
  ];

  return (
    <div className="h-full">
      {salesRevenue && (
        <Cards
          className="h-full border-none ant-card-body-p-25 ant-card-head-px-25 ant-card-head-b-none ant-card-body-pt-0 ant-card-head-title-lg"
          title="Sales Report"
          more={moreContent}
          size="large"
        >
          <div className="flex items-center justify-center ssm:flex-col ssm:gap-y-[15px]">
            <div className="relative flex items-center me-3 gap-[15px]">
              <span className="flex items-center text-sm ltr:pl-3 rtl:pr-3 text-body dark:text-white/60 before:absolute before:bg-primary before:w-2 before:h-2 before:rounded-full ltr:before:left-0 rtl:before:right-0 before:top-1/2 before:-translate-y-2/4">
                Orders
              </span>
              <span className="inline-block text-dark dark:text-white/[.87] ltr:mr-1 rtl:ml-1 ltr:ml-2.5 rtl:mr-2.5 text-22 font-semibold">
                $8,550
              </span>
              <span className="flex items-center text-sm font-medium text-success">
                <UilArrowUp className="w-5 h-5" />
                25%
              </span>
            </div>
            <div className="relative flex items-center me-3">
              <span className="flex items-center text-sm ltr:pl-3 rtl:pr-3 text-body dark:text-white/60 before:absolute before:bg-info before:w-2 before:h-2 before:rounded-full ltr:before:left-0 rtl:before:right-0 before:top-1/2 before:-translate-y-2/4">
                Sales
              </span>
              <span className="inline-block text-dark dark:text-white/[.87] ltr:mr-1 rtl:ml-1 ltr:ml-2.5 rtl:mr-2.5 text-22 font-semibold">
                $5,550
              </span>
              <span className="flex items-center text-sm font-medium text-danger">
                <UilArrowDown className="w-5 h-5" />
                15%
              </span>
            </div>
          </div>
          <div className="mt-3 hexadash-chart-container relative">
            <DashboardChart
              type="line"
              id="hexadash-sales-revenue"
              labels={salesRevenue.labels}
              datasets={salesRevenueDatasets}
              layout={{
                padding: {
                  left: -10,
                  right: -10,
                },
              }}
              scales={{
                y: {
                  border: { 
                    dash: [4, 4],
                   },
                  grid: {
                    color: '#485e9029',
                    tickLength: 0,
                    drawBorder: false,
                  },
                  ticks: {
                    beginAtZero: true,
                    font: {
                      size: 13,
                      family: "'Jost', sans-serif",
                    },
                    color: '#747474',
                    max: 80,
                    min: 50,
                    stepSize: 20,
                    padding: 10,
                    callback(label:number) {
                      return `${label}k`;
                    },
                  },
                },

                x: {
                  border: {
                    display: false,
                  },
                  grid: {
                    display: false,
                  },
                  ticks: {
                    font: {
                      size: 13,
                      family: "'Jost', sans-serif",
                    },
                    color: '#747474',
                  },
                },
              }}
              tooltip={{
                custom: customTooltips,
                callbacks: {
                  title() {
                    return `Total Revenue`;
                  },
                  label(t:Value) {
                    const { formattedValue, dataset } = t;
                    return `${dataset.label}: ${formattedValue}k`;
                  },
                },
              }}
              height={window.innerWidth < 1399 ? (window.innerWidth < 575 ? 175 : 100) : 100}
            />
          </div>
        </Cards>
      )}
    </div>
  );
});

export default SalesReport;
