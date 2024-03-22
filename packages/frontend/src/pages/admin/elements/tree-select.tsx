import { useState } from 'react';
import { Row, Col, TreeSelect } from 'antd';
import { PageHeaders } from '@/components/page-headers';

const { TreeNode, SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
  },
  {
    title: 'Node3',
    value: '0-0-0', // Added a node with the key '0-0-0'
  },
];

function TreeSelects() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Tree Select',
    },
  ];
  const [state, setState]:any = useState({
    value: undefined,
    async_value: undefined,
    multi_value: undefined,
    generate_value: undefined,
    check_value: ['0-0-0'],
    asyncTreeData: [
      { id: 1, pId: 0, value: '1', title: 'Expand to load' },
      { id: 2, pId: 0, value: '2', title: 'Expand to load' },
      { id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true },
    ],
  });

  const onChange = (value:string) => {
    setState({ ...state, value });
  };

  const onMultiChange = (value:number) => {
    setState({ ...state, multi_value: value });
  };

  const onGenerateChange = (value:boolean) => {
    setState({ ...state, generate_value: value });
  };

  const onCheckChange = (value:string[]) => {
    setState({ ...state, check_value: value });
  };

  const tProps = {
    treeData,
    value: state.check_value,
    onChange: onCheckChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Please select',
    style: {
      width: '100%',
    },
  };

  const genTreeNode = (parentId:string, isLeaf = false) => {
    const random = Math.random().toString(36).substring(2, 6);
    return {
      id: random,
      pId: parentId,
      value: random,
      title: isLeaf ? 'Tree Node' : 'Expand to load',
      isLeaf,
    };
  };

  const onLoadData = (treeNode:any) =>
    new Promise<void>((resolve) => {
      const { id } = treeNode.props;
      setTimeout(() => {
        setState({
          ...state,
          asyncTreeData: state.asyncTreeData.concat([genTreeNode(id, false), genTreeNode(id, true)]),
        });
        resolve();
      }, 300);
    });

  const onAsyncChange = (value:number) => {
    setState({ ...state, async_value: value });
  };
  const { asyncTreeData } = state;

  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Tree Select"
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
              <div className="p-[25px]">
                <TreeSelect
                  className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div>div>div>span]:h-[26px] [&>div>div>div>span]:items-center [&>.ant-select-selector>.ant-select-selection-item]:leading-[36px]"
                  showSearch
                  style={{ width: '100%' }}
                  value={state.value}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="Please select"
                  allowClear
                  treeDefaultExpandAll
                  onChange={onChange}
                >
                  <TreeNode value="parent 1" title="parent 1">
                    <TreeNode value="parent 1-0" title="parent 1-0">
                      <TreeNode value="leaf1" title="my leaf" />
                      <TreeNode value="leaf2" title="your leaf" />
                    </TreeNode>
                    <TreeNode value="parent 1-1" title="parent 1-1">
                      <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} />
                    </TreeNode>
                  </TreeNode>
                </TreeSelect>
              </div>
            </div>
          </Col>
          <Col md={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Multiple Selection
                </h1>
              </div>
              <div className="p-[25px]">
                <TreeSelect
                  className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div>div>div>span]:h-[26px] [&>div>div>div>span]:items-center"
                  showSearch
                  style={{ width: '100%' }}
                  value={state.multi_value}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="Please select"
                  allowClear
                  multiple
                  treeDefaultExpandAll
                  onChange={onMultiChange}
                >
                  <TreeNode value="parent 1" title="parent 1">
                    <TreeNode value="parent 1-0" title="parent 1-0">
                      <TreeNode value="leaf1" title="my leaf" />
                      <TreeNode value="leaf2" title="your leaf" />
                    </TreeNode>
                    <TreeNode value="parent 1-1" title="parent 1-1">
                      <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} />
                    </TreeNode>
                  </TreeNode>
                </TreeSelect>
              </div>
            </div>
          </Col>
          <Col md={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Generate form tree data
                </h1>
              </div>
              <div className="p-[25px]">
                <TreeSelect
                  className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div>div>div>span]:h-[26px] [&>div>div>div>span]:items-center [&>.ant-select-selector>.ant-select-selection-item]:leading-[36px]"
                  style={{ width: '100%' }}
                  value={state.generate_value}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={treeData}
                  placeholder="Please select"
                  treeDefaultExpandAll
                  onChange={onGenerateChange}
                />
              </div>
            </div>
          </Col>
          <Col md={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Checkable
                </h1>
              </div>
              <div className="p-[25px] ">
                <TreeSelect
                  className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div>div>div>span]:h-[26px] [&>div>div>div>span]:items-center"
                  {...tProps}
                />
              </div>
            </div>
          </Col>
          <Col md={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Asynchronous loading
                </h1>
              </div>
              <div className="p-[25px] ">
                <TreeSelect
                  className="[&>div]:border-normal dark:[&>div]:border-white/10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60 [&>div>div>div>span]:bg-transparent [&>div>div>div>span]:h-[26px] [&>div>div>div>span]:items-center [&>.ant-select-selector>.ant-select-selection-item]:leading-[36px]"
                  treeDataSimpleMode
                  style={{ width: '100%' }}
                  value={state.async_value}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="Please select"
                  onChange={onAsyncChange}
                  loadData={onLoadData}
                  treeData={asyncTreeData}
                />
              </div>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default TreeSelects;
