import { useEffect } from 'react';
import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart,
  Decimation,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  LogarithmicScale,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  SubTitle,
  TimeScale,
  TimeSeriesScale,
  Title,
  Tooltip,
} from 'chart.js';
import { customTooltips } from '../utilities';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
);

interface TooltipProps {
  formattedValue: number;
  dataset : {
    label: string;
    backgroundColor: string;
  }
}
function DashboardChart({
  type,
  height,
  width,
  scales,
  labels,
  id,
  datasets,
  tooltip,
  layout,
  legend,
  elements,
  option,
  ...props
}:any) {
  useEffect(() => {
    let chart:any = null;
    let unmounted = false;
    const canvas = document.getElementById(id) as HTMLCanvasElement; // Use optional chaining here

    if (!canvas) {
      // Element with the provided ID not found, handle the error or return early
      return;
    }
    if (!unmounted) {
      chart = new Chart(canvas, {
        type,
        data: {
          labels,
          datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          layout,
          hover: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            legend,
            tooltip: {
              yAlign: 'bottom',
              xAlign: 'right',
              mode: 'index',
              intersect: false,
              backgroundColor: '#ffffff',
              boxShadow: '0 8px 5px #ADB5D915',
              position: 'nearest',
              titleColor: '#ADB5D9',
              color: '#ADB5D9',
              titleFontSize: 12,
              titleSpacing: 10,
              bodyColor: '#525768',
              bodyFontSize: 11,
              bodyFontStyle: 'normal',
              bodyFontFamily: "'Jost', sans-serif",
              borderColor: '#F1F2F6',
              usePointStyle: true,
              borderWidth: 1,
              bodySpacing: 10,
              padding: {
                x: 10,
                y: 8,
              },
              z: 999999,
              enabled: false,
              external: customTooltips,
              ...tooltip,
            },
          },
          elements,
          scales,
          ...option,
        },
      });
    }

    return () => {
      chart.destroy();
      unmounted = true;
    };
  }, [type, datasets, labels, id, layout, legend, elements, scales, tooltip, option]);

  return <canvas width={width} height={height} id={id} {...props} />;
}

DashboardChart.defaultProps = {
  height: 479,
  type: 'line',
  width: null,
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
      borderColor: '#001737',
      borderWidth: 1,
      fill: false,
    },
    {
      data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
      borderColor: '#1ce1ac',
      borderWidth: 1,
      fill: false,
    },
  ],
  layout: {},
  legend: {
    display: false,
    labels: {
      display: false,
      position: 'center',
    },
  },
  id: 'myChart',
  elements: {
    line: {
      tension: 0.6,
      borderCapStyle: 'round',
      borderJoinStyle: 'round',
      capBezierPoints: true,
    },
    point: {
      radius: 0,
      z: 5,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#485e9029',
        borderDash: [3, 3],
        zeroLineColor: '#485e9029',
        zeroLineWidth: 1,
        zeroLineBorderDash: [3, 3],
        drawTicks: false,
        drawBorder: false,
      },
      ticks: {
        beginAtZero: true,
        font: {
          size: 14,
          family: "'Jost', sans-serif",
        },
        color: '#747474',
        max: 80,
        stepStartValue: 5,
        stepSize: 20,
        padding: 10,
        callback(label:number) {
          return `${label}k`;
        },
      },
    },
    x: {
      grid: {
        display: false,
        zeroLineWidth: 2,
        zeroLineColor: 'transparent',
        color: 'transparent',
        z: 1,
        tickMarkLength: 10,
        drawTicks: true,
        drawBorder: false,
      },
      ticks: {
        beginAtZero: true,
        font: {
          size: 13,
          family: "'Jost', sans-serif",
        },
        color: '#747474',
      },
    },
  },
  tooltip: {
    callbacks: {
      label(t:TooltipProps) {
        const dstLabel = t.dataset.label;
        const { formattedValue } = t;
        return `  ${formattedValue} ${dstLabel}`;
      },
      labelColor(t:TooltipProps) {
        return {
          backgroundColor: t.dataset.backgroundColor,
          borderColor: 'transparent',
        };
      },
    },
  },
  option: {},
};

export default DashboardChart;
