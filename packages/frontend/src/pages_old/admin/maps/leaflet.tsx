import { Row, Col } from 'antd';
import dynamic from 'next/dynamic';
import Heading from '@/components/heading';
import { PageHeaders } from '@/components/page-headers';


const LeafletMapBasic = dynamic(() => import('@/components/maps/leaflet').then((module) => module.LeafletMapBasic), {
  ssr: false, // Disable server-side rendering for this component
});

const LeafletMapMultipleIcon = dynamic(() => import('@/components/maps/leaflet').then((module) => module.LeafletMapMultipleIcon), {
  ssr: false, // Disable server-side rendering for this component
});


const LeafletMapCustomIcon = dynamic(() => import('@/components/maps/leaflet').then((module) => module.LeafletMapCustomIcon), {
  ssr: false, // Disable server-side rendering for this component
});


const LeafletMarkerCluster = dynamic(() => import('@/components/maps/leaflet').then((module) => module.LeafletMarkerCluster), {
  ssr: false, // Disable server-side rendering for this component
});


const place = [
  {
    id: 1,
    position: [50.797897, -1.077641],
  },
  {
    id: 2,
    position: [50.798897, -1.013641],
  },
  {
    id: 3,
    position: [50.7997799, -1.100641],
  },
];

function OsMap() {
  return (
    <>
      <PageHeaders
        title="Openstreet Maps (Leaflet)"
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <>
        <div className="min-h-[715px] lg:min-h-[580px] flex-1 px-8 pb-[20px] bg-transparent">
          <Row gutter={25}>
            <Col md={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
                <div className="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <Heading as="h4" className="text-lg font-medium mb-0">
                    Leaflet Basic Map
                  </Heading>
                </div>
                <div className="p-[25px] relative z-10">
                  <LeafletMapBasic 
                    latitude={50.797897} 
                    longitude={-1.077641} 
                    zoom={15} 
                    width="100%" 
                    height="400px" 
                  />
                </div>
              </div>
            </Col>

            <Col md={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
                <div className="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <Heading as="h4" className="text-lg font-medium mb-0">
                    Leaflet Multiple Icon
                  </Heading>
                </div>
                <div className="p-[25px] relative z-10">
                  <LeafletMapMultipleIcon
                    data={place}
                    latitude={50.797897}
                    longitude={-1.077641}
                    width="100%"
                    height="400px"
                    zoom={12}
                  />
                </div>
              </div>
            </Col>

            <Col md={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
                <div className="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <Heading as="h4" className="text-lg font-medium mb-0">
                    Leaflet Custom Icon
                  </Heading>
                </div>
                <div className="p-[25px] relative z-10">
                  <LeafletMapCustomIcon
                    faIcon="fa fa-thumb-tack fa-3x"
                    data={place}
                    latitude={50.797897}
                    longitude={-1.077641}
                    width="100%"
                    height="400px"
                    zoom={12}
                  />
                </div>
              </div>
            </Col>

            <Col md={12} xs={24}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
                <div className="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <Heading as="h4" className="text-lg font-medium mb-0">
                    Leaflet Cluster Map
                  </Heading>
                </div>
                <div className="p-[25px] relative z-10">
                  <LeafletMarkerCluster
                    faIcon="fa fa-thumb-tack fa-3x"
                    data={place}
                    latitude={50.797897}
                    longitude={-1.077641}
                    width="100%"
                    height="400px"
                    zoom={12}
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

export default OsMap;
