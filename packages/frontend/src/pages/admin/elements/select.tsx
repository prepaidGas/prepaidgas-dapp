import { useState } from 'react';
import { Row, Col, Select, Radio } from 'antd';
import { PageHeaders } from '@/components/page-headers';

const { Option, OptGroup } = Select;
const provinceData = ['Zhejiang', 'Jiangsu'];

interface CityData {
  [province: string]: string[];
}

const cityData: CityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

function Selects() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Select',
    },
  ];
  const [state, setState]:any = useState({
    selectedItems: [],
    size: 'default',
    cities: cityData[provinceData[0]],
    secondCity: cityData[provinceData[0]][0],
  });

  const handleChange = (selectedItems:any) => {
    setState({ ...state, selectedItems });
  };

  const children = [];
  for (let i = 10; i < 36; i += 1) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  }

  const handleSizeChange = (e:any) => {
    setState({ ...state, size: e.target.value });
  };
  const { size, cities }:any = state;

  const { selectedItems } = state;
  const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
  const filteredOptions = OPTIONS.filter((o:string) => !selectedItems.includes(o));

  const handleProvinceChange = (value:string) => {
    setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
  };

  const onSecondCityChange = (value:string) => {
    setState({
      secondCity: value,
    });
  };

  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Select"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={25}>
          <Col md={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Basic
                </h1>
              </div>
              <div className="flex items-center gap-x-[15px] gap-y-[10px] p-[25px]">
                <Select
                  className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div]:h-[38px] [&>div>div>div>span]:items-center [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center dark:[&>div>.ant-select-selection-item]:text-white/60 h-[38px]"
                  defaultValue="lucy"
                  style={{ width: 120 }}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <Select
                  className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div]:h-[38px] [&>div>div>div>span]:items-center [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center dark:[&>div>.ant-select-selection-item]:text-white/60 h-[38px]"
                  defaultValue="lucy"
                  style={{ width: 120 }}
                  disabled
                >
                  <Option value="lucy">Lucy</Option>
                </Select>
                <Select
                  className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div]:h-[38px] [&>div>div>div>span]:items-center [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center dark:[&>div>.ant-select-selection-item]:text-white/60 h-[38px]"
                  defaultValue="lucy"
                  style={{ width: 120 }}
                  loading
                >
                  <Option value="lucy">Lucy</Option>
                </Select>
              </div>
            </div>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Search & Select
                </h1>
              </div>
              <div className="p-[25px]">
                <Select
                  className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div]:h-[38px] [&>div>div>div>span]:items-center [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center dark:[&>div>.ant-select-selection-item]:text-white/60 h-[38px]"
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  filterOption={(input:any, option:any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </div>
            </div>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Select size
                </h1>
              </div>
              <div className="flex flex-col gap-x-[15px] gap-y-{10px} p-[25px]">
                <div className="mb-[30px]">
                  <Radio.Group value={size} onChange={handleSizeChange}>
                    <Radio.Button className="shadow-none outline-none " value="large">
                      Large
                    </Radio.Button>
                    <Radio.Button className="shadow-none outline-none " value="default">
                      Default
                    </Radio.Button>
                    <Radio.Button className="shadow-none outline-none " value="small">
                      Small
                    </Radio.Button>
                  </Radio.Group>
                </div>
                <div className="tag-select-list flex flex-col gap-x-[15px] gap-y-[10px]">
                  <Select
                    className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div]:h-[38px] [&>div>div>div>span]:items-center [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center dark:[&>div>.ant-select-selection-item]:text-white/60 h-[38px]"
                    size={size}
                    defaultValue="a1"
                    onChange={handleChange}
                    style={{ width: 200 }}
                  >
                    {children}
                  </Select>
                  <Select
                    className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&.ant-select-sm>div>div>div>span]:h-[16px] [&.ant-select-sm>div>div>div>span]:text-[11px] [&.ant-select-sm>div>div>div>span]:leading-[14px]"
                    mode="multiple"
                    size={size}
                    placeholder="Please select"
                    defaultValue={['a10', 'c12']}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                  >
                    {children}
                  </Select>
                  <Select
                    className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&.ant-select-sm>div>div>div>span]:h-[16px] [&.ant-select-sm>div>div>div>span]:text-[11px] [&.ant-select-sm>div>div>div>span]:leading-[14px]"
                    mode="tags"
                    size={size}
                    placeholder="Please select"
                    defaultValue={['a10', 'c12']}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                  >
                    {children}
                  </Select>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Custom
                </h1>
              </div>
              <div className="p-[25px]">
                <Select
                  className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div>div>div>span]:h-[26px] [&>div>div>div>span]:items-center"
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="select one country"
                  defaultValue={['china']}
                  optionLabelProp="label"
                >
                  <Option value="china" label="China">
                    <span role="img" aria-label="China">
                      🇨🇳
                    </span>
                    China
                  </Option>
                  <Option value="usa" label="USA">
                    <span role="img" aria-label="USA">
                      🇺🇸
                    </span>
                    USA
                  </Option>
                  <Option value="japan" label="Japan">
                    <span role="img" aria-label="Japan">
                      🇯🇵
                    </span>
                    Japan
                  </Option>
                  <Option value="korea" label="Korea">
                    <span role="img" aria-label="Korea">
                      🇰🇷
                    </span>
                    Korea
                  </Option>
                </Select>
              </div>
            </div>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Hide Already Selected
                </h1>
              </div>
              <div className="p-[25px]">
                <Select
                  className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div>div>div>span]:h-[26px] [&>div>div>div>span]:items-center"
                  mode="multiple"
                  placeholder="Inserted are removed"
                  value={selectedItems}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  {filteredOptions.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>
          </Col>
          <Col md={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Select coordinate
                </h1>
              </div>
              <div className="flex items-center gap-x-[15px] gap-y-[10px] p-[25px]">
                <Select
                  className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div]:h-[38px] [&>div>div>div>span]:items-center [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center dark:[&>div>.ant-select-selection-item]:text-white/60 h-[38px]"
                  defaultValue={provinceData[0]}
                  style={{ width: 120 }}
                  onChange={handleProvinceChange}
                >
                  {provinceData.map((province) => (
                    <Option key={province}>{province}</Option>
                  ))}
                </Select>
                <Select
                  className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div]:h-[38px] [&>div>div>div>span]:items-center [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center dark:[&>div>.ant-select-selection-item]:text-white/60 h-[38px]"
                  style={{ width: 120 }}
                  value={state.secondCity}
                  onChange={onSecondCityChange}
                >
                  {cities.map((city:string) => (
                    <Option key={city}>{city}</Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Multiple Select
                </h1>
              </div>
              <div className="p-[25px]">
                <Select
                  className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div>div>div>span]:h-[26px] [&>div>div>div>span]:items-center"
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  defaultValue={['jack', 'tom']}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </div>
            </div>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Tag Select
                </h1>
              </div>
              <div className="p-[25px]">
                <Select
                  className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div>div>div>span]:h-[26px] [&>div>div>div>span]:items-center"
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="Please select"
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </div>
            </div>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Custom
                </h1>
              </div>
              <div className="p-[25px]">
                <Select
                  className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div]:h-[38px] [&>div>div>div>span]:items-center [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center dark:[&>div>.ant-select-selection-item]:text-white/60 h-[38px]"
                  defaultValue="lucy"
                  style={{ width: 200 }}
                >
                  <OptGroup label="Manager" className="text-primary">
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                  </OptGroup>
                  <OptGroup label="Engineer" className="text-primary">
                    <Option value="Yiminghe">yiminghe</Option>
                  </OptGroup>
                </Select>
              </div>
            </div>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Automatic Completion
                </h1>
              </div>
              <div className="p-[25px]">
                <Select
                  className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div>div>div>span]:h-[26px] [&>div>div>div>span]:items-center"
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="Tags Mode"
                  onChange={handleChange}
                >
                  {children}
                </Select>
              </div>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default Selects;
