import React from 'react';
import { Alert } from 'antd';

interface AlertTextProps {
  type?: 'success' | 'info' | 'warning' | 'error';
  icon?: React.ReactNode;
  message?: string;
  description?: string;
  closeText?: string;
  showIcon?: boolean;
  closable?: boolean;
  closeIcon?: React.ReactNode;
}

function AlertText(props:AlertTextProps) {
  const { type, icon, message, description, showIcon, closable, closeIcon } = props;

  return (
    <Alert
      message={message}
      type={type}
      description={description}
      closable={closable}
      showIcon={showIcon && showIcon}
      closeIcon={closeIcon && closeIcon}
      icon={icon && icon}
    />
  );
}

export default AlertText;
