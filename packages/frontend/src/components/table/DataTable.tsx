import React from 'react';
import { useDispatch } from 'react-redux';
import { Input, Select, Table } from 'antd';
import { UilSearch } from '@iconscout/react-unicons';
import { dataLiveFilter, filterWithSubmit } from '@/redux/data-filter/actionCreator';
import { Buttons } from '../buttons';

interface RootState {
  filterOption: boolean;
  filterOnchange: boolean;
  rowSelection: any;
  tableData: any;
  columns: any;
}

function DataTable({ filterOption, filterOnchange, rowSelection, tableData, columns }:RootState) {
  const dispatch = useDispatch();
  const handleIdSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    const id = e.currentTarget.value;
    // @ts-ignore
    dispatch(dataLiveFilter(id, 'id'));
  };
  const handleStatusSearch = (value:string) => {
    // @ts-ignore
    dispatch(dataLiveFilter(value, 'status'));
  };

  const handleDataUser = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    // @ts-ignore
    dispatch(dataLiveFilter(value, 'name'));
  };

  const handleSearch = () => {
    const idElement = document.querySelector('.search-input') as HTMLInputElement | null;
    if (idElement) {
      const id = idElement.value;
      const status = idElement.title;
      // @ts-ignore
      dispatch(filterWithSubmit(id, status)); // Assuming your action only requires the ID
    }
  };
  const prefix = <UilSearch className="w-4 h-4 ltr:mr-2 rtl:ml-2 text-light dark:text-white/60" />;
  return (
    <>
      {filterOption ? (
        <div className="flex items-center justify-center w-full mt-5 mb-[25px] md:flex-col md:justify-center gap-[15px]">
          {!filterOnchange ? (
            <div className="inline-flex items-center flex-wrap w-full gap-[20px] md:justify-center">
              <div className="inline-flex items-center">
                <span className="ltr:mr-2 rtl:ml-2 dark:text-white/60">Id:</span>
                <Input
                  className="search-input h-10 text-body dark:text-white/60 bg-white dark:bg-white/10 border-normal dark:border-white/10 rounded-[6px] dark:placeholder-white/60"
                  placeholder="Search with Id"
                />
              </div>
              <div className="inline-flex items-center">
                <span className="ltr:mr-2 rtl:ml-2 dark:text-white/60">Status:</span>
                <Select style={{ width: 200 }} defaultValue="active" className="[&>.ant-select-selector]:h-10 [&>.ant-select-selector]:px-5 [&>.ant-select-selector]:border-normal [&>.ant-select-selector]:dark:border-light [&>.ant-select-selector>.ant-select-selection-item]:leading-[36px] [&>.ant-select-selector>.ant-select-selection-item]:text-light">
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="deactivated">Deactivated</Select.Option>
                  <Select.Option value="blocked">Blocked</Select.Option>
                </Select>
              </div>
              <div className="inline-flex items-center">
                <Buttons type="primary" size="small" onClick={handleSearch} transparented>
                  Submit
                </Buttons>
              </div>
            </div>
          ) : (
            <div className="inline-flex items-center flex-wrap w-full gap-[20px] md:justify-center">
              <div className="inline-flex items-center">
                <span className="ltr:mr-2 rtl:ml-2 dark:text-white/60">Id:</span>
                <Input
                  onChange={handleIdSearch}
                  className="search-input h-10 text-body dark:text-white/60 bg-white dark:bg-white/10 border-normal dark:border-white/10 rounded-[6px] dark:placeholder-white/60"
                  placeholder="Search with Id"
                />
              </div>
              <div className="inline-flex items-center">
                <span className="ltr:mr-2 rtl:ml-2 dark:text-white/60">Status:</span>
                <Select onChange={handleStatusSearch} style={{ width: 200 }} defaultValue="active" className="[&>.ant-select-selector]:h-10 [&>.ant-select-selector]:px-5 [&>.ant-select-selector]:border-normal [&>.ant-select-selector]:dark:border-white/10 [&>.ant-select-selector>.ant-select-selection-item]:leading-[36px] [&>.ant-select-selector>.ant-select-selection-item]:text-light [&>.ant-select-arrow]:dark:text-white/10">
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="deactivated">Deactivated</Select.Option>
                  <Select.Option value="blocked">Blocked</Select.Option>
                </Select>
              </div>
            </div>
          )}
          <div className="min-ssm:min-w-[280px]">
            <Input
              onChange={handleDataUser}
              className="h-10 text-body dark:text-white/60 bg-white dark:bg-white/10 border-normal dark:border-white/10 rounded-[6px]"
              placeholder="Search"
              prefix={prefix}
            />
          </div>
        </div>
      ) : (
        ''
      )}

      <div className="table-responsive hover-tr-none table-th-shape-none table-last-th-text-right table-th-border-none table-head-rounded table-td-border-none ant-pagination-custom-style [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-s-4 [&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-e-4 dark-border-row">
        {rowSelection ? (
          <Table
            rowSelection={{
              // type: state.selectionType,
              ...rowSelection,
            }}
            pagination={{ 
              pageSize: 10, 
              showSizeChanger: true, 
              className: 'text-end [&>li]:margin-0 [&>li]:border [&>li]:margin-0 [&>li]:bg-white [&>li]:rounded-6 dark:[&>li]:bg-white/10 dark:[&>li]:margin-0 [&>li]:border-regular dark:[&>li]:border-white/10 [&>li>.ant-pagination-item-link]:flex [&>li>.ant-pagination-item-link]:items-center [&>li>.ant-pagination-item-link]:justify-center [&>li>.ant-pagination-item-link]:border-none [&>li>.ant-pagination-item-link>.anticon>svg]:text-light [&>li>.ant-pagination-item-link>.anticon>svg]:dark:text-white/30 [&>.ant-pagination-item>a]:text-body [&>.ant-pagination-item>a]:dark:text-white/60 [&>.ant-pagination-item-active]:bg-primary [&>.ant-pagination-item.ant-pagination-item-active>a]:text-white [&>.ant-pagination-item.ant-pagination-item-active>a]:dark:text-white/60 [&>.ant-pagination-options>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-pagination-options>.ant-select>.ant-select-selector]:h-[33px] dark:[&>.ant-pagination-options>.ant-select>.ant-select-selector]:text-white/[.60] dark:[&>.ant-pagination-options>.ant-select>.ant-select-arrow]:text-white/[.60] [&>.ant-pagination-options>.ant-select>.ant-select-selector]:border-0 dark:[&>.ant-pagination-options>.ant-select>.ant-select-selector]:border-white/10 [&>.ant-pagination-options>.ant-select>.ant-select-selector]:rounded-6'
            }}
            dataSource={tableData}
            columns={columns}
          />
        ) : (
          <Table 
            dataSource={tableData} 
            columns={columns} 
            pagination={{ 
              pageSize: 10, 
              showSizeChanger: true, 
              className: 'text-end [&>li]:margin-0 [&>li]:border [&>li]:margin-0 [&>li]:bg-white [&>li]:rounded-6 dark:[&>li]:bg-white/10 dark:[&>li]:margin-0 [&>li]:border-regular dark:[&>li]:border-white/10 [&>li>.ant-pagination-item-link]:flex [&>li>.ant-pagination-item-link]:items-center [&>li>.ant-pagination-item-link]:justify-center [&>li>.ant-pagination-item-link]:border-none [&>li>.ant-pagination-item-link>.anticon>svg]:text-light [&>li>.ant-pagination-item-link>.anticon>svg]:dark:text-white/30 [&>.ant-pagination-item>a]:text-body [&>.ant-pagination-item>a]:dark:text-white/60 [&>.ant-pagination-item-active]:bg-primary [&>.ant-pagination-item.ant-pagination-item-active>a]:text-white [&>.ant-pagination-item.ant-pagination-item-active>a]:dark:text-white/60 [&>.ant-pagination-options>.ant-select:hover>.ant-select-selector]:border-primary [&>.ant-pagination-options>.ant-select>.ant-select-selector]:h-[33px] dark:[&>.ant-pagination-options>.ant-select>.ant-select-selector]:text-white/[.60] dark:[&>.ant-pagination-options>.ant-select>.ant-select-arrow]:text-white/[.60] [&>.ant-pagination-options>.ant-select>.ant-select-selector]:border-0 dark:[&>.ant-pagination-options>.ant-select>.ant-select-selector]:border-white/10 [&>.ant-pagination-options>.ant-select>.ant-select-selector]:rounded-6'
            }} 
          />
        )}
      </div>
    </>
  );
}

export default DataTable;
