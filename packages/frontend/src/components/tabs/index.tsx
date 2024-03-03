import * as Unicons from '@iconscout/react-unicons';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

interface RootState {
  data: any;
  tabPosition: TabPosition;
  type: string;
  color: string;
  className: string;
}

interface Item {
  title: string;
  content: string;
  icon?: string;
  tabTitle?: string;
}

enum TabPosition {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
}

function Tab(props:RootState) {
  const { data, tabPosition, type, color, className } = props;
  let counter = 0;

  return (
    <Tabs
      className={` hexadash-tab-${type} ${className && className} mb-[30px] [&>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-ink-bar]:bg-primary [&>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-tab:not(.ant-tabs-tab-active)>.ant-tabs-tab-btn]:dark:text-white/60 [&>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-tab:not(.ant-tabs-tab-active):hover>.ant-tabs-tab-btn]:text-primary [&>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-tab-active>.ant-tabs-tab-btn]:text-primary [&.hexadash-tab-primary>.ant-tabs-content-holder>.ant-tabs-content]:bg-primary [&.hexadash-tab-primary>.ant-tabs-content-holder>.ant-tabs-content]:p-4 [&.hexadash-tab-primary>.ant-tabs-content-holder>.ant-tabs-content>.ant-tabs-tabpane>h2]:text-white [&.hexadash-tab-primary>.ant-tabs-content-holder>.ant-tabs-content>.ant-tabs-tabpane>p]:text-white [&.hexadash-tab-primary>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-tab-active]:bg-primary [&.hexadash-tab-primary>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-tab-active]:px-4 [&.hexadash-tab-primary>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-tab-active]:py-3 [&.hexadash-tab-primary>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-tab-active]:rounded-[3px] [&.hexadash-tab-primary>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-tab-active>.ant-tabs-tab-btn]:text-white  [&.hexadash-tab-white>.ant-tabs-content-holder>.ant-tabs-content]:bg-white dark:[&.hexadash-tab-white>.ant-tabs-content-holder>.ant-tabs-content]:bg-white/10 [&.hexadash-tab-white>.ant-tabs-content-holder>.ant-tabs-content]:p-4 [&.hexadash-tab-white>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-tab-active]:bg-white dark:[&.hexadash-tab-white>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-tab-active]:bg-white/10 [&.hexadash-tab-white>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-tab-active]:px-4 [&.hexadash-tab-white>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-tab-active]:py-3 [&.hexadash-tab-white>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-tab-active]:rounded-[3px] }`}
      color={color && color}
      defaultActiveKey="1"
      tabPosition={tabPosition !== undefined ? tabPosition : TabPosition.Top}
    >
      {data.map((item:Item) => {
        const { title, content, icon, tabTitle } = item;
        const IconTag = icon !== undefined ? Unicons[icon] : null;
        counter += 1;
        return (
          <TabPane
            // color={color && color}
            tab={
              icon === undefined ? (
                tabTitle
              ) : (
                <span>
                  <IconTag />
                  {tabTitle}
                </span>
              )
            }
            key={counter}
          >
            <h2 className="text-dark dark:text-white/[.87] text-[15px] font-medium">{title}</h2>
            <p className="mb-2 text-body dark:text-white/60">{content}</p>
          </TabPane>
        );
      })}
    </Tabs>
  );
}

export { Tab };
