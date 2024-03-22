import { Row, Col } from 'antd';
import Heading from '@/components/heading';
import mapData from '@/config/map/google-maps-styles';
import { PageHeaders } from '@/components/page-headers';
import { GoogleMaps } from '@/components/maps/google-maps';

const { mapOneStyles, mapStyleDark, mapTwoStyles, mapThreeStyles } = mapData;

function GoogleMap() {
  return (
    <>
      <PageHeaders
        title="Google Maps"
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <>
        <div className="min-h-[715px] lg:min-h-[580px] flex-1 px-8 pb-[20px] bg-transparent">
          <Row gutter={25}>
            <Col md={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
                <div className="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <Heading as="h4" className="text-lg font-medium mb-0">
                    Google Map Basic
                  </Heading>
                </div>
                <div className="p-[25px]">
                  <GoogleMaps latitude={55.797897} longitude={-1.077641} />
                </div>
              </div>
            </Col>

            <Col md={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
                <div className="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <Heading as="h4" className="text-lg font-medium mb-0">
                    Google Map Style Light
                  </Heading>
                </div>
                <div className="p-[25px]">
                  <GoogleMaps latitude={25.797897} longitude={-17.077641} mapStyles={mapOneStyles} />
                </div>
              </div>
            </Col>

            <Col md={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
                <div className="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <Heading as="h4" className="text-lg font-medium mb-0">
                    Google Map Style Dark
                  </Heading>
                </div>
                <div className="p-[25px]">
                  <GoogleMaps latitude={5.797897} longitude={-12.077641} mapStyles={mapStyleDark} />
                </div>
              </div>
            </Col>

            <Col md={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
                <div className="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <Heading as="h4" className="text-lg font-medium mb-0">
                    Google Map Style Theme Color
                  </Heading>
                </div>
                <div className="p-[25px]">
                  <GoogleMaps latitude={52.797897} longitude={-21.077641} zoom={2} mapStyles={mapThreeStyles} />
                </div>
              </div>
            </Col>

            <Col md={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
                <div className="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <Heading as="h4" className="text-lg font-medium mb-0">
                    Google Map Style Color
                  </Heading>
                </div>
                <div className="p-[25px]">
                  <GoogleMaps latitude={75.797897} longitude={-40.077641} mapStyles={mapTwoStyles} />
                </div>
              </div>
            </Col>

            <Col md={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
                <div className="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <Heading as="h4" className="text-lg font-medium mb-0">
                    Google Map Style Color
                  </Heading>
                </div>
                <div className="p-[25px]">
                  <GoogleMaps 
                    latitude={42.797897} 
                    longitude={-33.077641}
                    mapStyles={mapTwoStyles}
                    zoom={4}
                    place={[
                      {
                        id: 1,
                        latitude: 50.797897,
                        longitude: -1.077641,
                      },
                      {
                        id: 2,
                        latitude: 49.797897,
                        longitude: -25.9389312,
                      },
                      {
                        id: 3,
                        latitude: 50.2577799,
                        longitude: -5.077641,
                      },
                    ]}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </>
    </>
  );
}

export default GoogleMap;
