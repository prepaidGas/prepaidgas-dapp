import { useLayoutEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { PageHeaders } from '@/components/page-headers';
import { Cards } from '@/components/cards/frame/cards-frame';
import reChartData from '@/demoData/recharts.json';

const { data, nullChart } = reChartData;

function RechartArea() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Area Chart',
    },
  ];
  const [state, setState] = useState({
    responsive: 0,
  });
  const { responsive } = state;

  useLayoutEffect(() => {
    function updateSize() {
      const element:HTMLElement | null = document.querySelector('.recharts-wrapper');
      const cardBody:HTMLElement | null = document.querySelector('.ant-card-body');
      const closestElement = element !== null ? element.closest('.ant-card-body') : null;
      const width = closestElement !== null ? closestElement.clientWidth : cardBody ? cardBody.clientWidth : 500;

      setState({ responsive: width });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Area Chart"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
          <Col md={12} xs={24} className="mb-[25px]">
            <Cards className="ant-card-extra-none" title="SIMPLE AREA CHART" size="large" more={false}>
              <AreaChart
                width={responsive - (5 * responsive) / 100}
                height={responsive / 2}
                data={data}
                margin={{
                  top: 10,
                  right: window.innerWidth <= 375 ? 34 : 40,
                  left: window.innerWidth <= 375 ? -18 : 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </Cards>
          </Col>

          <Col md={12} xs={24} className="mb-[25px]">
            <Cards className="ant-card-extra-none" title="STACKED AREA CHART" size="large" more={false}>
              <AreaChart
                width={responsive - (5 * responsive) / 100}
                height={responsive / 2}
                data={data}
                margin={{
                  top: 10,
                  right: window.innerWidth <= 375 ? 34 : 40,
                  left: window.innerWidth <= 375 ? -18 : 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
              </AreaChart>
            </Cards>
          </Col>
          <Col md={12} xs={24} className="mb-[25px]">
            <Cards className="ant-card-extra-none" title="AreaChart Connect Nulls" size="large" more={false}>
              <div>
                <AreaChart
                  width={responsive - (5 * responsive) / 100}
                  height={responsive / 2}
                  data={nullChart}
                  margin={{
                    top: 10,
                    right: window.innerWidth <= 375 ? 34 : 40,
                    left: window.innerWidth <= 375 ? -18 : 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </div>
            </Cards>
          </Col>
          <Col md={12} xs={24}>
            <Cards className="ant-card-extra-none" title="synchronized AreaCharts" size="large" more={false}>
              <div>
                <AreaChart
                  width={responsive - (5 * responsive) / 100}
                  height={responsive / 2}
                  data={data}
                  syncId="anyId"
                  margin={{
                    top: 10,
                    right: window.innerWidth <= 375 ? 34 : 40,
                    left: window.innerWidth <= 375 ? -18 : 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </div>
            </Cards>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default RechartArea;
