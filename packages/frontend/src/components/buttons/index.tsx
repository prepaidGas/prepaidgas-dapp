import { useState } from 'react';
import { Button } from 'antd';

function Buttons(props:any) {
  const {
    type,
    shape,
    icon,
    size,
    outlined,
    ghost,
    transparented,
    raised,
    squared,
    color,
    social,
    load,
    children,
    ...rest
  } = props;
  const [state, setState] = useState({
    loading: false,
  });

  const enterLoading = () => {
    setState({ loading: true });
  };

  return (
    <Button
      squared={squared}
      outlined={outlined ? 1 : 0}
      ghost={ghost}
      transparent={transparented ? 1 : 0}
      raised={raised ? 1 : 0}
      data={type}
      size={size}
      shape={shape}
      type={type}
      icon={icon}
      color={color}
      social={social}
      onClick={load && enterLoading}
      loading={state.loading}
      {...rest}
    >
      {children}
    </Button>
  );
}

function BtnGroup({ children }:any) {
  return <Button.Group>{children}</Button.Group>;
}

export { Buttons, BtnGroup };
