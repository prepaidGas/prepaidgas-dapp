import React, { useState } from 'react';
import { Spin } from 'antd';
import Link from 'next/link';
import {
  UilArrowDown,
  UilArrowUp,
} from '@iconscout/react-unicons';
import { Cards } from '@/components/cards/frame/cards-frame';
import DashboardChart from '@/components/charts/DashboardChart';

import chartData from '../../demoData/dashboardChartContent.json';

const SalesGrowth = React.memo(() => {
  const salesGrowthData:any = chartData.salesGrowth;

  const [state, setState] = useState({
    sellingTab: 'today',
  });

  /* State destructuring */
  const {sellingTab}: {sellingTab: string} = state;

  const handleChangePeriod = (value:string, event:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setState({
      ...state,
      sellingTab: value,
    });
  };

  const salesGrowthDataset = [
    {
      data: salesGrowthData[sellingTab].orders,
      backgroundColor: '#C097E9',
      hoverBackgroundColor: '#8231D3',
      label: 'Orders',
      average: '50.8',
      maxBarThickness: 10,
      barThickness: 12,
      percent: 49,
    },
    {
      data: salesGrowthData[sellingTab].sales,
      backgroundColor: '#7FD4FF',
      hoverBackgroundColor: '#00AAFF',
      label: 'Sales',
      average: '$28k',
      maxBarThickness: 10,
      barThickness: 12,
      percent: 60,
    },
  ];

  interface Tooltip {
    formattedValue: number;
    dataset: {
      label: string;
      hoverBackgroundColor: string;
    }
  }

  return (
    <div className="h-full">
      <Cards
        isbutton={
          <ul className="flex items-center mb-0">
            <li>
              <Link
                className={
                  sellingTab === 'today'
                    ? 'inline-flex items-center bg-primary-transparent dark:bg-white/10 px-3 h-8 text-primary dark:text-white/[.87] text-13 font-medium rounded-md'
                    : 'inline-flex items-center px-3 h-8 text-light dark:text-white/60 hover:text-primary text-13'
                }
                onClick={(e) => handleChangePeriod('today', e)}
                href="#"
              >
                Today
              </Link>
            </li>
            <li>
              <Link
                className={
                  sellingTab === 'week'
                    ? 'inline-flex items-center bg-primary-transparent dark:bg-white/10 px-3 h-8 text-primary dark:text-white/[.87] text-13 font-medium rounded-md'
                    : 'inline-flex items-center px-3 h-8 text-light dark:text-white/60 dark:hover:text-white hover:text-primary text-13 font-medium rounded-md'
                }
                onClick={(e) => handleChangePeriod('week', e)}
                href="#"
              >
                Week
              </Link>
            </li>
            <li>
              <Link
                className={
                  sellingTab === 'month'
                    ? 'inline-flex items-center bg-primary-transparent dark:bg-white/10 px-3 h-8 text-primary dark:text-white/[.87] text-13 font-medium rounded-md'
                    : 'inline-flex items-center px-3 h-8 text-light dark:text-white/60 dark:hover:text-white hover:text-primary text-13 font-medium rounded-md'
                }
                onClick={(e) => handleChangePeriod('month', e)}
                href="#"
              >
                Month
              </Link>
            </li>
          </ul>
        }
        title="Sales Growth"
        size="large"
        className="h-full border-none ant-card-body-p-25 ant-card-body-pt-0 ant-card-head-px-25 ant-card-head-b-none ant-card-head-title-base"
      >
        {!salesGrowthData[sellingTab] ? (
          <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
            <Spin />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center ssm:flex-col ssm:gap-y-[15px]">
              <div className="relative flex items-center me-3">
                <span className="inline-block text-dark dark:text-white/[.87] ltr:mr-1 rtl:ml-1 ltr:ml-2.5 rtl:mr-2.5 text-[18px] font-semibold">
                  $8,550
                </span>
                <span className="flex items-center text-sm font-medium text-success">
                  <UilArrowUp className="w-5 h-5" />
                  25%
                </span>
              </div>
              <div className="relative flex items-center me-3">
                <span className="inline-block text-dark dark:text-white/[.87] ltr:mr-1 rtl:ml-1 ltr:ml-2.5 rtl:mr-2.5 text-[18px] font-semibold">
                  $5,550
                </span>
                <span className="flex items-center text-sm font-medium text-danger">
                  <UilArrowDown className="w-5 h-5" />
                  15%
                </span>
              </div>
            </div>
            <div className="hexadash-chart-container relative">
              <DashboardChart
                id="hexadash-profit-growth"
                labels={salesGrowthData[sellingTab].labels}
                datasets={salesGrowthDataset}
                type="bar"
                layout={{
                  padding: {
                    left: -10,
                    right: -10,
                  },
                }}
                tooltip={{
                  callbacks: {
                    label(t:Tooltip) {
                      const dstLabel = t.dataset.label;
                      const { formattedValue } = t;
                      return `  ${formattedValue} ${dstLabel}`;
                    },
                    labelColor(t:Tooltip) {
                      return {
                        backgroundColor: t.dataset.hoverBackgroundColor,
                        borderColor: 'transparent',
                      };
                    },
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
                      max: Math.max(...salesGrowthData[sellingTab].orders),
                      stepSize: Math.max(...salesGrowthData[sellingTab].orders) / 5,
                      font: {
                        size: 13,
                        family: "'Jost', sans-serif",
                      },
                      padding: 10,
                      color: '#747474',
                    },
                  },

                  x: {
                    border:{
                      display: false,
                    },
                    grid: {
                      display: false,
                    },
                    ticks: {
                      beginAtZero: true,
                      font: {
                        size: 12,
                        family: "'Jost', sans-serif",
                      },
                      color: '#747474',
                      min: 0,
                    },
                  },
                }}
                height={window.innerWidth < 1399 ? (window.innerWidth < 575 ? 300 : 100) : 188}
              />
            </div>
          </>
        )}
      </Cards>
    </div>
  );
});

export default SalesGrowth;
