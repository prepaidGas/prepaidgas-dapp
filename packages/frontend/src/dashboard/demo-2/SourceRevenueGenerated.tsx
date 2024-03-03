import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';
import {
  UilBookOpen, 
  UilFile,
  UilFileAlt,
  UilPrint,
  UilTimes,
  UilFacebook ,
  UilTwitter
} from '@iconscout/react-unicons';
import config from '../../config/config';
import { Cards } from '@/components/cards/frame/cards-frame';
import DashboardChart from '@/components/charts/DashboardChart';

interface RootState {
  ChangeLayoutMode: {
    mode: string,
  }
}

interface ToolTipProps {
  label: number;
  dataIndex: number;
  dataset: {
    backgroundColor: string[];
    data: number[];
  };
}

const SourceRevenueGenerated = React.memo(() => {
  const { mainContent } = useSelector((state:RootState) => {
    return {
      mainContent: state.ChangeLayoutMode.mode,
    };
  });
  const { theme } = config;
  const chartHeight = window.innerWidth <= 1699 ? (window.innerWidth <= 991 ? 200 : 200) : 300;
  const chartWidth = window.innerWidth <= 1699 ? (window.innerWidth <= 991 ? 200 : 200) : 300;
  const chartjsPieChart = {
    height: chartHeight,
    width: chartWidth,
    labels: ['Twitter', 'Google', 'Facebook'],
    datasets: [
      {
        data: [1540, 1540, 5346],
        backgroundColor: ['#00AAFF', '#8231D3', '#5840FF'],
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
      maintainAspectRatio: true,
      responsive: false,
    },

    tooltip: {
      mode: 'index',
      callbacks: {
        label(t:ToolTipProps) {
          const { dataset, label, dataIndex } = t;
          return `  ${label} ${dataset.data[dataIndex]}`;
        },
        labelColor({ dataIndex, dataset }:ToolTipProps) {
          return {
            backgroundColor: dataset.backgroundColor[dataIndex],
            borderColor: 'transparent',
            color: '#0a0a0a',
          };
        },
      },
    },
  };

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

  return (
    <div className="h-full">
      <Cards
        title="Source Of Revenue Generated"
        size="large"
        className="mb-[25px] border-none h-full ant-card-body-p-25 ant-card-head-px-25 ant-card-head-b-none ant-card-body-pt-0 ant-card-body-pb-0 ant-card-head-title-base"
        more={moreContent}
      >
        <div className="hexadash-chart-container relative flex items-center justify-between flex-wrap gap-y-[20px] py-[20px] sm:pt-0 px-[25px] 3xl:justify-center lg:justify-start md:justify-center gap-x-[20px] [&>.chartjs-tooltip>table>tbody>tr>td]:text-dark dark:[&>.chartjs-tooltip>table>tbody>tr>td]:text-white/60">
          <DashboardChart {...chartjsPieChart} type="pie" id="pieChart" />
          <div className="flex flex-wrap gap-x-[44px] gap-y-[22px] ssm:gap-x-[15px] ssm:gap-y-[15px] ssm:justify-center">
            <div>
              <div className="flex items-center justify-center bg-info-transparent text-info w-[80px] h-[80px] mb-[10px] rounded-[10px]">
                <UilTwitter />
              </div>
              <div className="text-center">
                <span className="text-[15px] text-dark dark:text-white/[.87] block font-medium">
                  {chartjsPieChart.labels[0]}
                </span>
                <span className="text-[14px] text-light dark:text-white/60 block font-medium">
                  ${chartjsPieChart.datasets[0].data[0]}
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center bg-danger-transparent text-danger w-[80px] h-[80px] mb-[10px] rounded-[10px]">
                <ReactSVG src='/hexadash-nextjs/img/icon/google-customIcon.svg' />
              </div>
              <div className="text-center">
                <span className="text-[15px] text-dark dark:text-white/[.87] block font-medium">
                  {chartjsPieChart.labels[1]}
                </span>
                <span className="text-[14px] text-light dark:text-white/60 block font-medium">
                  ${chartjsPieChart.datasets[0].data[1]}
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center bg-secondary-transparent text-secondary w-[80px] h-[80px] mb-[10px] rounded-[10px]">
                <UilFacebook />
              </div>
              <div className="text-center">
                <span className="text-[15px] text-dark dark:text-white/[.87] block font-medium">
                  {chartjsPieChart.labels[2]}
                </span>
                <span className="text-[14px] text-light dark:text-white/60 block font-medium">
                  ${chartjsPieChart.datasets[0].data[2]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Cards>
    </div>
  );
});

export default SourceRevenueGenerated;
