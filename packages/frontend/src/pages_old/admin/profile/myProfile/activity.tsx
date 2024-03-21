import { Row, Col } from 'antd';
import ProfileLayout from "./Layout";
import RightAside from "./overview/RightAside";
import ActivityContent from "./overview/ActivitySection";

function Activity() {

  return (
    <ProfileLayout>
      <Row gutter={25}>
        <Col xxl={16} xs={24} className="mb-[25px]">
          <ActivityContent />
        </Col>
        <Col xxl={8} xs={24}>
          <RightAside />
        </Col>
      </Row>
    </ProfileLayout>
  )
}

export default Activity;