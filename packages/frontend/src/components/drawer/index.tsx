import { useState } from 'react';
import { Radio, Drawer, RadioChangeEvent } from 'antd';
import { Buttons } from '../buttons';

const RadioGroup = Radio.Group;

interface RootState {
  width?: string;
  title?: string;
  placement?: any;
  children?: any;
  customPlacement?: boolean;
  render?: boolean;
  childDrawer?: any;
  childTitle?: string;
  btnText?: string;
}

function Drawers(props:RootState) {
  const { width, title, placement, children, customPlacement, render, childDrawer, childTitle, btnText } = props;
  const [state, setState] = useState({
    open: false,
    placement: placement || 'right',
    childrenDrawer: false,
  });

  const showDrawer = () => {
    setState({
      ...state,
      open: true,
    });
  };

  const onClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  const onChange = (e:RadioChangeEvent) => {
    setState({
      ...state,
      placement: e.target.value,
    });
  };

  const showChildrenDrawer = () => {
    setState({
      ...state,
      childrenDrawer: true,
    });
  };

  const onChildrenDrawerClose = () => {
    setState({
      ...state,
      childrenDrawer: false,
    });
  };

  return (
    <>
      {customPlacement && (
        <RadioGroup style={{ marginRight: 8 }} defaultValue={placement} onChange={onChange}>
          <Radio value="top">Top</Radio>
          <Radio value="right">Right</Radio>
          <Radio value="bottom">Bottom</Radio>
          <Radio value="left">Left</Radio>
        </RadioGroup>
      )}

      {render && <p>Render in this</p>}
      <Buttons
        className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
        type="primary"
        size="default"
        onClick={showDrawer}
        raised
      >
        {btnText ? btnText : 'Open'}
      </Buttons>
      <Drawer
        title={title}
        placement={state.placement}
        closable={false}
        onClose={onClose}
        open={state.open}
        getContainer={false}
        style={{ position: !render ? 'fixed' : 'absolute' }}
        width={width}
      >
        {!childDrawer ? (
          children
        ) : (
          <>
            <Buttons className="mb-[15px]" type="primary" onClick={showChildrenDrawer}>
              Two-level drawer
            </Buttons>

            <Drawer
              title={childTitle}
              width={width}
              closable={false}
              onClose={onChildrenDrawerClose}
              open={state.childrenDrawer}
            >
              {childDrawer}
            </Drawer>
            {children}

            <div
              className="absolute bottom-0 w-full bg-white border-t dark:bg-white/10 dark:border-white/10 border-[#e8e8e8] py-[10px] px-[16px] start-0 text-end rounded-s-4"
            >
              <Buttons
                className=" dark:bg-transparent dark:border-white/10 dark:text-white/[.87]"
                style={{
                  marginRight: 8,
                }}
                onClick={onClose}
              >
                Cancel
              </Buttons>
              <Buttons onClick={onClose} type="primary">
                Submit
              </Buttons>
            </div>
          </>
        )}
      </Drawer>
    </>
  );
}

export { Drawers };
