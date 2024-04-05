import { useEffect, useState } from 'react';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

function CheckBox(props: any) {
  const {
    item,
    defaultSelect,
    checked,
    multiple,
    onChange,
    onChangeTriger,
    defaultChecked,
    disabled,
    children,
  } = props;
  const plainOptions = item; // Make sure items is defined somewhere

  const [state, setState] = useState({
    checkedList: defaultSelect,
    indeterminate: true,
    checkAll: false,
  });

  const onMultiChange = (checkedList: any) => {
    setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });
  };

  useEffect(() => {
    if (onChangeTriger) {
      onChangeTriger(state.checkedList);
    }
    // eslint-disable-next-line
  }, [state]);

  const onCheckAllChange = (e: any) => {
    setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  const onChecked = (value: string) => (e: any) => {
    onChange(e.target.checked, value);
  };

  return !multiple ? (
    <Checkbox checked={checked} onChange={onChecked(item)} defaultChecked={defaultChecked} disabled={disabled}>
      {children}
    </Checkbox>
  ) : (
    <>
      <div className="border-b-normal dark:border-b-white/10 border-b-1 pb-[15px]">
        <Checkbox className="[&>.ant-checkbox>.ant-checkbox-inner]:after:bg-primary" indeterminate={state.indeterminate} onChange={onCheckAllChange} checked={state.checkAll}>
          Check all
        </Checkbox>
      </div>
      <br />
      <CheckboxGroup options={plainOptions} value={state.checkedList} onChange={onMultiChange} />
    </>
  );
}

Checkbox.defaultProps = {
  checked: false,
};

export { CheckBox, CheckboxGroup };
