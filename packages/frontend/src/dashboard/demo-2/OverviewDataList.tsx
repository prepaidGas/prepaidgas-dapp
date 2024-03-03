import React from 'react';
import { Row, Col } from 'antd';
import OverviewCard from '@/components/cards/OverviewCardTwo';

import OverviewData from '../../demoData/overviewData.json';

const OverviewDataList = React.memo(( column:any ) => {
  const OverviewDataSorted = OverviewData.slice(Math.max(OverviewData.length - 4, 1));

  return (
    <div>
      <Row gutter={25}>
        {OverviewDataSorted.map((item:{}, i:number) => {
          return (
            <Col className="mb-[25px]" xxl={6} md={12} xs={24} key={i}>
              <OverviewCard data={item} contentFirst bottomStatus halfCircleIcon />
            </Col>
          );
        })}
      </Row>
    </div>
  );
});

export default OverviewDataList;
