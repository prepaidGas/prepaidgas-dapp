import { useLayoutEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { PageHeaders } from '@/components/page-headers';
import { Cards } from '@/components/cards/frame/cards-frame';
import rechartdata from '@/demoData/recharts.json';

const { data, positiveAndNegative } = rechartdata;

function RechartBar() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Bar Chart',
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
      const width = closestElement !== null ? closestElement.clientWidth : cardBody ? cardBody.clientWidth : 1096;

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
        title="Bar Chart"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
          <Col md={12} xs={24} className="mb-[25px]">
            <Cards className="ant-card-extra-none" title="TINY BAR CHART" size="large" more={false}>
              <BarChart
                width={responsive - (5 * responsive) / 100}
                height={responsive / 2}
                data={data}
                margin={{
                  top: 20,
                  right: window.innerWidth <= 375 ? 30 : 40,
                  left: window.innerWidth <= 375 ? -18 : 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="uv" fill="#8e1dce" />
                <Bar dataKey="pv" fill="#82ca9d" />
                <Bar dataKey="amt" fill="#2F63F250" />
              </BarChart>
            </Cards>
          </Col>
          <Col md={12} xs={24} className="mb-[25px]">
            <Cards className="ant-card-extra-none" title="STACKED BAR CHART" size="large" more={false}>
              <BarChart
                width={responsive - (5 * responsive) / 100}
                height={responsive / 2}
                data={data}
                margin={{
                  top: 20,
                  right: window.innerWidth <= 375 ? 30 : 40,
                  left: window.innerWidth <= 375 ? -18 : 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
              </BarChart>
            </Cards>
          </Col>
          <Col md={12} xs={24} className="mb-[25px]">
            <Cards className="ant-card-extra-none" title="MIX BAR CHART" size="large" more={false}>
              <BarChart
                width={responsive - (5 * responsive) / 100}
                height={responsive / 2}
                data={data}
                margin={{
                  top: 20,
                  right: window.innerWidth <= 375 ? 30 : 40,
                  left: window.innerWidth <= 375 ? -18 : 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
                <Bar dataKey="uv" fill="#ffc658" />
              </BarChart>
            </Cards>
          </Col>
          <Col md={12} xs={24} className="mb-[25px]">
            <Cards className="ant-card-extra-none" title="POSITIVE AND NEGATIVE BAR CHART" size="large" more={false}>
              <BarChart
                width={responsive - (5 * responsive) / 100}
                height={responsive / 2}
                data={positiveAndNegative}
                margin={{
                  top: 20,
                  right: window.innerWidth <= 375 ? 30 : 40,
                  left: window.innerWidth <= 375 ? -18 : 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </Cards>
          </Col>
          <Col md={12} xs={24} className="mb-[25px]">
            <Cards className="ant-card-extra-none" title="BAR CHART STACKED BY SIGN" size="large" more={false}>
              <BarChart
                width={responsive - (5 * responsive) / 100}
                height={responsive / 2}
                data={positiveAndNegative}
                margin={{
                  top: 20,
                  right: window.innerWidth <= 375 ? 30 : 40,
                  left: window.innerWidth <= 375 ? -18 : 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="pv" fill="#8884d8" stackId="stack" />
                <Bar dataKey="uv" fill="#82ca9d" stackId="stack" />
              </BarChart>
            </Cards>
          </Col>
          <Col md={12} xs={24}>
            <Cards className="ant-card-extra-none" title="BIAXIAL BAR CHART" size="large" more={false}>
              <BarChart
                width={responsive - (5 * responsive) / 100}
                height={responsive / 2}
                data={data}
                margin={{
                  top: 20,
                  right: window.innerWidth <= 375 ? 30 : 40,
                  left: window.innerWidth <= 375 ? -18 : 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="pv" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </Cards>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default RechartBar;
