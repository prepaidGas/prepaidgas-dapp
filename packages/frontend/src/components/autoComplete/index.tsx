import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, AutoComplete } from 'antd';

const mockVal = (str:string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const renderItem = (title:string, count:number) => {
  return {
    value: title,
    label: (
      <div
        className="text-dark dark:text-white dark:text-white/60"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {title}
        {count}
      </div>
    ),
  };
};

const AutoCompleted = React.memo((props:any) => {
  const { rtl } = useSelector((state:any) => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });

  const { customComponent, patterns, patternButtons, width, placeholder } = props;

  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [anotherOptions, setAnotherOptions] = useState([]);

  const getPanelValue = (searchText:string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  const onSearching = (searchText:string) => {
    //@ts-ignore
    setOptions(getPanelValue(searchText));
  };
  
  const onChange = (data:any) => {
    setValue(data);
  };
  const onSelect = (data:any) => {
    console.log('onSelect', data);
  };

  return customComponent ? (
    <AutoComplete options={options} onChange={onChange} style={{ width }} onSelect={onSelect} onSearch={onSearching}>
      {customComponent}
    </AutoComplete>
  ) : patterns ? (
    <AutoComplete
      className="sm:w-full [&>.ant-select-selector]:rounded-[100px] [&>.ant-select-selector>.ant-select-selection-placeholder]:px-5"
      popupMatchSelectWidth={false}
      dropdownStyle={{ width: 300 }}
      style={{ width }}
      options={options}
      value={value}
      placeholder={placeholder}
      onSearch={onSearching}
      onChange={onChange}
    >
      <Input
        className="bg-transparent px-5 border border-regular dark:border-white/10 shadow-none rounded-[100px] [&>input]:!bg-transparent dark:[&>input]:!bg-transparent h-[38px] text-dark dark:text-white/[.87]"
        suffix={
          patternButtons ? (
            <Button
              className="h-[38px] rounded-tl-none rounded-bl-none"
              style={{ [rtl ? 'marginLeft' : 'marginRight']: -20 }}
              type="primary"
            >
              <SearchOutlined className="flex text-light dark:text-white/[.87] [&>svg]:text-light dark:[&>svg]:text-white/[.87]" />
            </Button>
          ) : (
            <SearchOutlined className="flex text-light dark:text-white/[.87] [&>svg]:text-light dark:[&>svg]:text-white/[.87]" />
          )
        }
      />
    </AutoComplete>
  ) : (
    <AutoComplete
      options={options}
      value={value}
      style={{ width }}
      onSelect={onSelect}
      onSearch={onSearching}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
});

export { AutoCompleted };
