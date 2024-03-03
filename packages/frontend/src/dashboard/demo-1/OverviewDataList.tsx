import React from 'react';
import { Row, Col } from 'antd';
import OverviewCard from '@/components/cards/OverviewCard';

import OverviewData from '../../demoData/overviewData.json';

const OverviewDataList = React.memo(( column:any ) => {
  const OverviewDataSorted = OverviewData.slice(0, 4);

  return (
    <Row gutter={25}>
      {OverviewDataSorted.map((item:{}, i:number) => {
        return (
          <Col className="mb-[25px]" md={12} xs={24} key={i}>
            <OverviewCard data={item} contentFirst bottomStatus  />
          </Col>
        );
      })}
    </Row>
  );
});

export default OverviewDataList;
