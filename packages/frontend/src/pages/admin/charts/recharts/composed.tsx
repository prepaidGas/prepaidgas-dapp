import { useLayoutEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PageHeaders } from '@/components/page-headers';
import { Cards } from '@/components/cards/frame/cards-frame';
import rechartdata from '@/demoData/recharts.json';

const { data } = rechartdata;

function ReChartComposed() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Compossed Chart',
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
        title="Compossed Chart"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
          <Col md={12} xs={24} className="mb-[25px]">
            <Cards className="ant-card-extra-none" title="LINE BAR AREA COMPOSED CHART" size="large">
              <ComposedChart
                width={responsive - (5 * responsive) / 100}
                height={responsive / 2}
                data={data}
                margin={{
                  top: 20,
                  right: window.innerWidth <= 375 ? 34 : 40,
                  left: window.innerWidth <= 375 ? -16 : 0,
                  bottom: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="uv" stroke="#ff7300" />
              </ComposedChart>
            </Cards>
          </Col>
          <Col md={12} xs={24} className="mb-[25px]">
            <Cards className="ant-card-extra-none" title="VERTICAL COMPOSED CHART" size="large">
              <ComposedChart
                layout="vertical"
                width={responsive - (5 * responsive) / 100}
                height={responsive / 2}
                data={data}
                margin={{
                  top: 20,
                  right: window.innerWidth <= 375 ? 34 : 40,
                  left: window.innerWidth <= 375 ? -16 : 0,
                  bottom: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                <Line dataKey="uv" stroke="#ff7300" />
              </ComposedChart>
            </Cards>
          </Col>
          <Col md={12} xs={24} className="mb-[25px]">
            <Cards className="ant-card-extra-none" title="SAME DATA COMPOSED CHART" size="large">
              <ComposedChart
                width={responsive - (5 * responsive) / 100}
                height={responsive / 2}
                data={data}
                margin={{
                  top: 20,
                  right: window.innerWidth <= 375 ? 34 : 40,
                  left: window.innerWidth <= 375 ? -16 : 0,
                  bottom: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="uv" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="uv" stroke="#ff7300" />
              </ComposedChart>
            </Cards>
          </Col>
          <Col md={12} xs={24}>
            <Cards className="ant-card-extra-none" title="COMPOSED CHART WITH AXIS LABELS" size="large">
              <ComposedChart
                width={responsive - (5 * responsive) / 100}
                height={responsive / 2}
                data={data}
                margin={{
                  top: 20,
                  right: window.innerWidth <= 375 ? 34 : 40,
                  left: window.innerWidth <= 375 ? -16 : 0,
                  bottom: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" label={{ value: 'Pages', position: 'insideBottomRight', offset: 0 }} />
                <YAxis label={{ value: 'Index', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="uv" stroke="#ff7300" />
              </ComposedChart>
            </Cards>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default ReChartComposed;
