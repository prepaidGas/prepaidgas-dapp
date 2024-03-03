import { useSelector } from 'react-redux';
import MenuItems from '../../layout/MenuItems';

import { Layout } from 'antd';

const { Sider } = Layout;

interface RootState {
  ChangeLayoutMode: {
    topMenu: boolean,
    menuCollapse: boolean,
  }
}

const Sidebar = () => {

  const { topMenu, collapsed } = useSelector((state:RootState) => {
    return {
      topMenu: state.ChangeLayoutMode.topMenu,
      collapsed: state.ChangeLayoutMode.menuCollapse,
    };
  });

  return (
    <>
      {!topMenu || typeof window !== 'undefined' && window.innerWidth < 1200 ? (
        <Sider
          width={collapsed ? 80 : 280}
          collapsed={collapsed}
          className={`fixed h-[100vh] scrollbar bg-white dark:bg-[#1b1d2a] py-5 pb-[74px] z-998 overflow-y-auto shadow-[0_0_20px_rgba(160,160,160,0.02)] [&.ant-layout-sider-collapsed]:xl:-ms-20 duration-[300ms]`}
        >
          <MenuItems />
        </Sider>
      ) : null }
    </>
  );
};

export default Sidebar;
