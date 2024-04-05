import { Chart } from 'react-google-charts';

interface ChartProps  {
  width: string;
  height: string;
  data: any;
  title: string;
  subtitle: string;
  chartArea: string;
  colors: string[];
}

function GoogleBasicBarChart(props: ChartProps) {
  const { width, height, data, title, chartArea } = props;
  return (
    <Chart
      width={width}
      height={height}
      chartType="BarChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        title,
        chartArea: { width: chartArea },
        hAxis: {
          title: 'Total',
          minValue: 0,
        },
        vAxis: {
          title: 'City',
        },
      }}
      // For tests
      rootProps={{ 'data-testid': '1' }}
    />
  );
}


function GoogleMaterialBarChart(props:ChartProps) {
  const { width, height, data, title, subtitle } = props;
  return (
    <Chart
      width={width}
      height={height}
      chartType="Bar"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        chart: {
          title,
          subtitle,
        },
      }}
      // For tests
      rootProps={{ 'data-testid': '2' }}
    />
  );
}

function GoogleStackedChart(props:ChartProps) {
  const { width, height, data, title, chartArea } = props;
  return (
    <Chart
      width={width}
      height={height}
      chartType="BarChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        title,
        chartArea: { width: chartArea },
        isStacked: true,
        hAxis: {
          title: 'Total',
          minValue: 0,
        },
        vAxis: {
          title: 'City',
        },
      }}
      // For tests
      rootProps={{ 'data-testid': '3' }}
    />
  );
}


function GoogleCustomColorChart(props:ChartProps) {
  const { width, height, data, title, chartArea, colors } = props;
  return (
    <Chart
      width={width}
      height={height}
      chartType="BarChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        title,
        chartArea: { width: chartArea },
        colors,
        hAxis: {
          title: 'Total',
          minValue: 0,
        },
        vAxis: {
          title: 'City',
        },
      }}
      // For tests
      rootProps={{ 'data-testid': '4' }}
    />
  );
}

function GoogleComboChart(props:ChartProps) {
  const { width, height, data, title, chartArea, colors } = props;
  return (
    <Chart
      width={width}
      height={height}
      chartType="ComboChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        title,
        chartArea: { width: chartArea },
        colors,
        seriesType: 'bars',
        series: { 5: { type: 'line' } },
      }}
      // For tests
      rootProps={{ 'data-testid': '5' }}
    />
  );
}


function GoogleLineChart(props:ChartProps) {
  const { width, height, data } = props;
  return (
    <Chart
      width={width}
      height={height}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        hAxis: {
          title: 'Time',
        },
        vAxis: {
          title: 'Popularity',
        },
      }}
      // For tests
      rootProps={{ 'data-testid': '6' }}
    />
  );
}


function GoogleMultiLineChart(props:ChartProps) {
  const { width, height, data } = props;
  return (
    <Chart
      width={width}
      height={height}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        hAxis: {
          title: 'Time',
        },
        vAxis: {
          title: 'Popularity',
        },
        series: {
          0: { curveType: 'function' },
          1: { curveType: 'function' },
        },
      }}
      // For tests
      rootProps={{ 'data-testid': '7' }}
    />
  );
}

function GoogleOrgChart(props:ChartProps) {
  const { width, height, data, chartArea } = props;
  return (
    <Chart
      width={width}
      height={height}
      chartType="OrgChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        chartArea: { width: chartArea },
        allowHtml: true,
      }}
      // For tests
      rootProps={{ 'data-testid': '8' }}
    />
  );
}


function GoogleBasicPieChart(props:ChartProps) {
  const { width, height, data, chartArea, title } = props;
  return (
    <Chart
      width={width}
      height={height}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        title,
        chartArea: { width: chartArea },
      }}
      // For tests
      rootProps={{ 'data-testid': '9' }}
    />
  );
}


function Google3dPieChart(props:ChartProps) {
  const { width, height, data, chartArea, title } = props;
  return (
    <Chart
      width={width}
      height={height}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        title,
        chartArea: { width: chartArea },
        is3D: true,
      }}
      // For tests
      rootProps={{ 'data-testid': '9' }}
    />
  );
}


export {
  Google3dPieChart,
  GoogleBasicPieChart,
  GoogleOrgChart,
  GoogleMultiLineChart,
  GoogleLineChart,
  GoogleComboChart,
  GoogleCustomColorChart,
  GoogleStackedChart,
  GoogleMaterialBarChart,
  GoogleBasicBarChart,
};
