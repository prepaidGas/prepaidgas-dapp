
import React, { useState } from 'react';
import Link from 'next/link';
import {
  UilBookOpen,
  UilFile,
  UilFileAlt,
  UilPrint,
  UilTimes,
} from '@iconscout/react-unicons';
import { Col, Row, Table } from 'antd';
import { Tooltip } from 'react-tooltip';
import { useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { Cards } from '@/components/cards/frame/cards-frame';
import salesLocations from '../../demoData/table-data.json';
import 'react-tooltip/dist/react-tooltip.css'

interface SalesLocationData {
  today: string[][];
  week: string[][];
  month: string[][];
}

interface Geo {
  rsmKey: string;
  properties: {
    name: string;
  }
}

const { salesLocation } = salesLocations;

// const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

const geoUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';

const moreContent = [  
  {
      key: '1',
      label: (
        <Link
          className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
          href="#"
        >
          <UilPrint className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
          <span>Printer</span>
        </Link>
      ),
  },
  {
      key: '2',
      label: (
        <Link
          className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
          href="#"
        >
          <UilBookOpen className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
          <span>PDF</span>
        </Link>
      ),
  },
  {
      key: '3',
      label: (
        <Link
          className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
          href="#"
        >
          <UilFileAlt className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
          <span>Google Sheets</span>
        </Link>
      ),
  },
  {
      key: '4',
      label: (
        <Link
          className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
          href="#"
        >
          <UilTimes className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
          <span>Excel (XLSX)</span>
        </Link>
      ),
  },
  {
      key: '5',
      label: (
        <Link
          className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
          href="#"
        >
          <UilFile className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
          <span>CSV</span>
        </Link>
      ),
  },
]


const regionColumns = [
  {
    title: 'Top Region',
    dataIndex: 'region',
    key: 'region',
    className: 'px-4 py-2.5 last:text-end text-dark dark:text-white/[.87] text-15 font-medium border-none before:hidden',
  },
  {
    title: 'Order',
    dataIndex: 'order',
    key: 'order',
    className: 'px-4 py-2.5 last:text-end text-body dark:text-white/60 border-none before:hidden',
  },
  {
    title: 'Revenue',
    dataIndex: 'revenue',
    key: 'revenue',
    className: 'px-4 py-2.5 min-3xl:last:text-center text-body dark:text-white/60 border-none before:hidden',
  },
];

interface RootState {
  ChangeLayoutMode: {
    rtlData: string;
  };
}

const SaleByLocation = React.memo(() => {
  const { rtl } = useSelector((state:RootState) => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });
  function renderThumb({ style }:any) {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: '#F1F2F6',
    };
    return <div style={{ ...style, ...thumbStyle }} />;
  }
  const renderTrackVertical = () => {
    const thumbStyle:any = {
      position: 'absolute',
      width: '6px',
      transition: 'opacity 200ms ease 0s',
      opacity: 0,
      [rtl ? 'left' : 'right']: '2px',
      bottom: '2px',
      top: '2px',
      borderRadius: '3px',
    };
    return <div className="[&>div]:bg-regular dark:[&>div]:bg-[#32333f]" style={thumbStyle} />;
  };
  function renderView({ style }:any) {
    const customStyle = {
      marginRight: rtl && 'auto',
      [rtl ? 'marginLeft' : 'marginRight']: '-17px',
    };
    return <div style={{ ...style, ...customStyle }} />;
  }
  
  // Initialize Default Sales Location
  const [state, setState] = useState({
    locationTab: 'today',
  });

  /* State destructuring */
  const { locationTab } = state;
  const handleChangeLocation = (value:string, event:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setState({
      ...state,
      locationTab: value,
    });
  };

  // Make Data Array for Table
  const saleLocationData: Array<{ key: number; region: string; order: string; revenue: string }> = [];

  if (salesLocation !== null && salesLocation[locationTab as keyof SalesLocationData]) {
    salesLocation[locationTab as keyof SalesLocationData].forEach((value: string[], index: number) => {
      const [region, order, revenue] = value;
      saleLocationData.push({
        key: index + 1,
        region,
        order,
        revenue,
      });
    });
  }

  // Map Configuration
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [content, setContent] = useState('');
 
  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  };

  const handleMoveEnd = () => {
    setPosition(position);
  };

  return (
    <div className="h-full">
      <Cards
        isbutton={
          <ul className="flex items-center mb-0">
            <li>
              <Link
                className={
                  locationTab === 'today'
                    ? 'inline-flex items-center bg-primary-transparent dark:bg-white/10 px-3 h-8 text-primary dark:text-white/[.87] text-13 font-medium rounded-md'
                    : 'inline-flex items-center px-3 h-8 text-light dark:text-white/60 hover:text-primary text-13'
                }
                onClick={(e) => handleChangeLocation('today', e)}
                href="#"
              >
                Today
              </Link>
            </li>
            <li>
              <Link
                className={
                  locationTab === 'week'
                    ? 'inline-flex items-center bg-primary-transparent dark:bg-white/10 px-3 h-8 text-primary dark:text-white/[.87] text-13 font-medium rounded-md'
                    : 'inline-flex items-center px-3 h-8 text-light dark:text-white/60 dark:hover:text-white hover:text-primary text-13 font-medium rounded-md'
                }
                onClick={(e) => handleChangeLocation('week', e)}
                href="#"
              >
                Week
              </Link>
            </li>
            <li>
              <Link
                className={
                  locationTab === 'month'
                    ? 'inline-flex items-center bg-primary-transparent dark:bg-white/10 px-3 h-8 text-primary dark:text-white/[.87] text-13 font-medium rounded-md'
                    : 'inline-flex items-center px-3 h-8 text-light dark:text-white/60 dark:hover:text-white hover:text-primary text-13 font-medium rounded-md'
                }
                onClick={(e) => handleChangeLocation('month', e)}
                href="#"
              >
                Month
              </Link>
            </li>
          </ul>
        }
        title="Sales by Location"
        size="large"
        more={moreContent}
        className="h-full [&>.ant-card-body]:pb-[30px] [&>.ant-card-body]:pt-[25px] [&>.ant-card-body]:px-[25px] ant-card-head-px-25 ant-card-head-title-base border-none"
      >
        <Row>
          <Col xxl={12} md={13} xs={24}>
            <div className="border-1 border-solid border-regular dark:border-white/10 dark:border-none rounded-[4px]">
            <Scrollbars
                autoHeight
                autoHeightMin={280}
                autoHide
                renderThumbVertical={renderThumb}
                renderView={renderView}
                renderTrackVertical={renderTrackVertical}
                renderTrackHorizontal={(props) => (
                  <div {...props} style={{ display: 'none' }} className="track-horizontal" />
                )}
              >
                <div className="table-responsive dark:[&>div>div>div>.ant-table]:border-white/10 dark:[&>div>div>div>.ant-table]:border-1  border-none [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-s-4 [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-e-4 [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th]:bg-[#fafafa] dark:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th]:bg-[#323440]">
                  <Table columns={regionColumns} dataSource={saleLocationData} pagination={false} />
                </div>
              </Scrollbars>
            </div>
          </Col>
          <Col xxl={12} md={11} xs={24} className="px-[25px]">
            <div className="min-ssm:h-full h-[250px] overflow-hidden">
              <Tooltip
                anchorSelect="#hexadash-simple-map"
                content={content}
              />
              <ComposableMap
                id="hexadash-simple-map"
                className="w-full h-full"
                data-tip=""
                data-html
                data-tooltip-float="true"
                projectionConfig={{
                  scale: window.innerWidth <= 440 ? 160 : 160,
                }}
                viewBox="110, 50, 800, 350"
              >
                <ZoomableGroup zoom={position.zoom} center={[position.coordinates[0], position.coordinates[1]]} onMoveEnd={handleMoveEnd}>
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo:Geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={() => {
                            const name = geo.properties.name;
                            setContent(`${name}`);
                          }}
                          onMouseLeave={() => {
                            setContent('');
                          }}
                          fill="#DBE1E8"
                          stroke="#FFF"
                          strokeWidth={0.4}
                          style={{
                            default: {
                              fill: '#DBE1E8',
                              outline: 'none',
                            },
                            hover: {
                              fill: '#8231D3',
                              outline: 'none',
                              fillOpacity: 1,
                            },
                            pressed: {
                              fill: '#8231D3',
                              outline: 'none',
                            }
                            
                          }}
                        />
                      ))
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>
              <div className="absolute flex flex-col items-center right-5 bottom-5">
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="flex justify-center bg-white rounded-md rounded-b-none dark:bg-[#1b1d2a] border-regular border-1 dark:border-white/30 w-7 h-7 dark:text-white/[.87]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="24"
                    viewBox="0 0 24 24"
                    className="stroke-body dark:stroke-white/60"
                    strokeWidth="3"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="flex justify-center bg-white rounded-md rounded-t-none dark:bg-[#1b1d2a] border-regular border-1 dark:border-white/30 border-t-none w-7 h-7 dark:text-white/[.87]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="24"
                    viewBox="0 0 24 24"
                    className="stroke-body dark:stroke-white/60"
                    strokeWidth="3"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Cards>
    </div>
  );
});


export default SaleByLocation;
