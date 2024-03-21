import { useLayoutEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts';
import { PageHeaders } from '@/components/page-headers';
import { Cards } from '@/components/cards/frame/cards-frame';

import reChartData from '@/demoData/recharts.json';

const { radar } = reChartData;

function ReChartRadar() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Radar Chart',
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
        title="Radar Chart"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
          <Col md={12} xs={24} className="mb-[25px]">
            <Cards className="ant-card-extra-none" title="SIMPLE RADAR CHART" size="large">
              <RadarChart
                cx={window.innerWidth <= 480 ? responsive / 2.2 : responsive / 2.5}
                cy={window.innerWidth <= 480 ? responsive / 2.8 : responsive / 3}
                outerRadius={window.innerWidth <= 480 ? 85 : 150}
                width={responsive - (5 * responsive) / 100}
                height={responsive / 1.4}
                data={radar}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" />
              </RadarChart>
            </Cards>
          </Col>
          <Col md={12} xs={24}>
            <Cards className="ant-card-extra-none" title="SPECIFIED DOMAIN RADAR CHART" size="large">
              <RadarChart
                cx={window.innerWidth <= 480 ? responsive / 2.2 : responsive / 2.5}
                cy={window.innerWidth <= 480 ? responsive / 2.8 : responsive / 3}
                outerRadius={window.innerWidth <= 480 ? 85 : 150}
                width={responsive - (5 * responsive) / 100}
                height={responsive / 1.4}
                data={radar}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" />
                <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" />
                <Legend />
              </RadarChart>
            </Cards>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default ReChartRadar;
