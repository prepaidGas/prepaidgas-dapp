import { useState } from 'react';
import { Row, Col, Carousel, Radio } from 'antd';
import { PageHeaders } from '@/components/page-headers';

function Carousels() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Cards',
    },
  ];

  interface ComponentState {
    dotPosition: string | null; 
    changeValues: {
      
    }; 
  }
  const [state, setState]:any = useState<ComponentState>({
    dotPosition: 'top',
    changeValues: [],
  });

  const onChange = (currentSlide: number) => {
    setState((prevState: { changeValues: any; }) => ({ ...prevState, changeValues: [...prevState.changeValues, currentSlide] }));
  };

  const handlePositionChange = ( dotPosition:any ) => setState({ dotPosition: dotPosition.target.value });
  const { dotPosition } = state;

  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Cards"
        routes={PageRoutes}
      />
      <>
        <div className="min-h-[715px] lg:min-h-[580px] max-w-[calc(100vw-344px)] xl:max-w-[calc(100vw-30px)] px-8 xl:px-[15px] pb-[30px] bg-transparent">
          <Row gutter={25}>
            <Col md={12}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Basic
                  </h1>
                </div>
                <div className="relative p-[25px]">
                  <Carousel afterChange={onChange}>
                    <div className="bg-light h-[150px] text-center overflow-hidden">
                      <h3 className="text-white dark:text-white/[.87] text-[15px] font-medium leading-[160px]">1</h3>
                    </div>
                    <div className="bg-light h-[150px] text-center overflow-hidden">
                      <h3 className="text-white dark:text-white/[.87] text-[15px] font-medium leading-[160px]">2</h3>
                    </div>
                    <div className="bg-light h-[150px] text-center overflow-hidden">
                      <h3 className="text-white dark:text-white/[.87] text-[15px] font-medium leading-[160px]">3</h3>
                    </div>
                    <div className="bg-light h-[150px] text-center overflow-hidden">
                      <h3 className="text-white dark:text-white/[.87] text-[15px] font-medium leading-[160px]">4</h3>
                    </div>
                  </Carousel>
                </div>
              </div>

              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Scroll automatically
                  </h1>
                </div>
                <div className="relative p-[25px]">
                  <Carousel autoplay>
                    <div className="bg-light h-[150px] text-center overflow-hidden">
                      <h3 className="text-white dark:text-white/[.87] text-[15px] font-medium leading-[160px]">1</h3>
                    </div>
                    <div className="bg-light h-[150px] text-center overflow-hidden">
                      <h3 className="text-white dark:text-white/[.87] text-[15px] font-medium leading-[160px]">2</h3>
                    </div>
                    <div className="bg-light h-[150px] text-center overflow-hidden">
                      <h3 className="text-white dark:text-white/[.87] text-[15px] font-medium leading-[160px]">3</h3>
                    </div>
                    <div className="bg-light h-[150px] text-center overflow-hidden">
                      <h3 className="text-white dark:text-white/[.87] text-[15px] font-medium leading-[160px]">4</h3>
                    </div>
                  </Carousel>
                </div>
              </div>
            </Col>
            <Col md={12}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Position
                  </h1>
                </div>
                <div className="relative p-[25px]">
                  <Radio.Group onChange={handlePositionChange} value={dotPosition} style={{ marginBottom: 8 }}>
                    <Radio.Button className="h-[38px] text-light dark:text-white/60 [&.ant-radio-button-wrapper-checked]:bg-primary [&.ant-radio-button-wrapper-checked]:border-primary [&.ant-radio-button-wrapper-checked]:text-white [&>span]:font-semibold [&>span]:leading-[36px]" value="top">Top</Radio.Button>
                    <Radio.Button className="h-[38px] text-light dark:text-white/60 [&.ant-radio-button-wrapper-checked]:bg-primary [&.ant-radio-button-wrapper-checked]:border-primary [&.ant-radio-button-wrapper-checked]:text-white [&>span]:font-semibold [&>span]:leading-[36px]" value="bottom">Bottom</Radio.Button>
                    <Radio.Button className="h-[38px] text-light dark:text-white/60 [&.ant-radio-button-wrapper-checked]:bg-primary [&.ant-radio-button-wrapper-checked]:border-primary [&.ant-radio-button-wrapper-checked]:text-white [&>span]:font-semibold [&>span]:leading-[36px]" value="left">Left</Radio.Button>
                    <Radio.Button className="h-[38px] text-light dark:text-white/60 [&.ant-radio-button-wrapper-checked]:bg-primary [&.ant-radio-button-wrapper-checked]:border-primary [&.ant-radio-button-wrapper-checked]:text-white [&>span]:font-semibold [&>span]:leading-[36px]" value="right">Right</Radio.Button>
                  </Radio.Group>
                  <Carousel dotPosition={dotPosition}>
                    <div className="bg-light h-[150px] text-center overflow-hidden">
                      <h3 className="text-white dark:text-white/[.87] text-[15px] font-medium leading-[160px]">1</h3>
                    </div>
                    <div className="bg-light h-[150px] text-center overflow-hidden">
                      <h3 className="text-white dark:text-white/[.87] text-[15px] font-medium leading-[160px]">2</h3>
                    </div>
                    <div className="bg-light h-[150px] text-center overflow-hidden">
                      <h3 className="text-white dark:text-white/[.87] text-[15px] font-medium leading-[160px]">3</h3>
                    </div>
                    <div className="bg-light h-[150px] text-center overflow-hidden">
                      <h3 className="text-white dark:text-white/[.87] text-[15px] font-medium leading-[160px]">4</h3>
                    </div>
                  </Carousel>
                </div>
              </div>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Fade in
                  </h1>
                </div>
                <div className="relative p-[25px]">
                  <Carousel effect="fade">
                    <div className="bg-light h-[150px] text-center overflow-hidden">
                      <h3 className="text-white dark:text-white/[.87] text-[15px] font-medium leading-[160px]">1</h3>
                    </div>
                    <div className="bg-light h-[150px] text-center overflow-hidden">
                      <h3 className="text-white dark:text-white/[.87] text-[15px] font-medium leading-[160px]">2</h3>
                    </div>
                    <div className="bg-light h-[150px] text-center overflow-hidden">
                      <h3 className="text-white dark:text-white/[.87] text-[15px] font-medium leading-[160px]">3</h3>
                    </div>
                    <div className="bg-light h-[150px] text-center overflow-hidden">
                      <h3 className="text-white dark:text-white/[.87] text-[15px] font-medium leading-[160px]">4</h3>
                    </div>
                  </Carousel>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </>
    </>
  );
}

export default Carousels;
