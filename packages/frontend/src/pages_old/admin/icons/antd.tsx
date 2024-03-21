import { Row, Col } from 'antd';
import * as Icons from '@ant-design/icons';
import Heading from '@/components/heading';
import { PageHeaders } from '@/components/page-headers';

function FeatherSvgIcons() {
  return (
    <>
      <PageHeaders title="Antd Icon" className="flex justify-between items-center bg-transparent pt-[15px] px-8 pb-6" />
      <div className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <Row gutter={15}>
          <Col xs={24}>
            <>
              <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
                <div className="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <Heading as="h4" className="mb-0 text-lg font-medium">
                    Simply beautiful open source icons
                  </Heading>
                </div>
                <div className="p-[25px]">
                  <Row gutter={15}>
                    {Object.keys(Icons)
                      .filter(
                        (item, index) =>
                          index !== 0 &&
                          item !== 'default' &&
                          item !== 'setTwoToneColor' &&
                          item !== 'getTwoToneColor' &&
                          item !== 'createFromIconfontCN',
                      )
                      .map((icon) => {
                        //@ts-ignore
                        const CustomTag = Icons[icon];
                        return (
                          <Col xl={6} md={12} xs={24} key={icon}>
                            <div className="flex items-center mb-[15px]">
                              <CustomTag className="w-[18px] h-[18px] ltr:mr-[10px] rtl:ml-[10px] text-body dark:text-white/60" />
                              <span className="text-body dark:text-white/60">antd {icon}</span>
                            </div>
                          </Col>
                        );
                      })}
                  </Row>
                </div>
              </div>
            </>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default FeatherSvgIcons;
