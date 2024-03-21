import React from 'react';
import { Row, Col } from 'antd';
import OverviewCard from '@/components/cards/OverviewCard';

import SupportOverview from '@/demoData/supportOverview.json';

const OverviewDataList = React.memo(() => {
  return (
    <div>
      <Row gutter={25}>
        {SupportOverview.map((item, i) => {
          return (
            <Col xxl={6} sm={12} xs={24} key={i} className="mb-[25px]">
              <OverviewCard className="[&>div]:py-[40px]" data={item} bottomStatus={false} contentFirst />
            </Col>
          );
        })}
      </Row>
    </div>
  );
});

export default OverviewDataList;
