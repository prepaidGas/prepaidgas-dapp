import Link from 'next/link';
import { Dropdown } from 'antd';

interface RootState {
  customContent: any;
  content: any;
  action: any;
  style: any;
  placement: any;
  className: string;
  children: string;
}

function DropDown(props:RootState) {
  const { content, placement, action, children, style, className } = props;

  return (
    <>
      <Dropdown
        overlayClassName={className}
        overlayStyle={style}
        placement={placement}
        overlay={content ? content : contents}
        trigger={action}
      >
        <span>{children}</span>
      </Dropdown>
    </>
  );
}

const contents = (
  <>
    <div className="block bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.40)] py-1">
      <Link
        className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
        href="#"
      >
        <span>Export to CSV</span>
      </Link>
      <Link
        className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
        href="#"
      >
        <span>Export to XML</span>
      </Link>
      <Link
        className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
        href="#"
      >
        <span>Export to Drive</span>
      </Link>
    </div>
  </>
);


const items = [
  {
    key: '1',
    label: (
      <Link
        className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
        href="#"
      >
        <span>Export to CSV</span>
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
        <span>Export to XML</span>
      </Link>
    ),
    disabled: true,
  },
  {
    key: '3',
    label: (
      <Link
        className="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm active"
        href="#"
      >
        <span>Export to Drive</span>
      </Link>
    ),
    disabled: true,
  }
];

export default DropDown;
