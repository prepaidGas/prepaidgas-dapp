
import React from 'react';
import Link from 'next/link';
import { Popover } from 'antd';
import { UilCheckCircle } from '@iconscout/react-unicons';

function PopOver(props:any) {
  const { content, placement, title, action, children } = props;
  const contents = <div>{content ? content : defaultContent}</div>;

  return (
    <Popover placement={placement} title={title && <p>{title}</p>} content={contents} trigger={action}>
      {children}
    </Popover>
  );
}

const defaultContent:React.ReactNode = (
  <>
    <Link className="text-start py-[6px] flex align-center gap-[6px] hover:text-primary " href="#">
      <UilCheckCircle />
      <span>Btn Dropdown one</span>
    </Link>
    <Link className="text-start py-[6px] flex align-center gap-[6px] hover:text-primary hover:bg-primary/.50" href="#">
      <UilCheckCircle />
      <span>Btn Dropdown two</span>
    </Link>
    <Link className="text-start py-[6px] flex align-center gap-[6px] hover:text-primary hover:bg-primary/.50" href="#">
      <UilCheckCircle />
      <span>Btn Dropdown three</span>
    </Link>
  </>
);

export default PopOver;
