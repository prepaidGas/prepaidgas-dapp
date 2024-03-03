import {
  Uil500px,
  UilAirplay,
  UilArrowGrowth,
  UilAt,
  UilBagAlt,
  UilBookAlt,
  UilBookOpen,
  UilBookReader,
  UilCalendarAlt,
  UilChartBar,
  UilChat,
  UilCheckSquare,
  UilCircle,
  UilClipboardAlt,
  UilClock,
  UilCompactDisc,
  UilCreateDashboard,
  UilDatabase,
  UilDocumentLayoutLeft,
  UilEdit,
  UilEnvelope,
  UilExchange,
  UilExclamationOctagon,
  UilExpandArrowsAlt,
  UilFile,
  UilFileShieldAlt,
  UilHeadphones,
  UilIcons,
  UilImages,
  UilLayerGroup,
  UilMap,
  UilPresentation,
  UilQuestionCircle,
  UilSearch,
  UilServer,
  UilSetting,
  UilShoppingCart,
  UilSquareFull,
  UilTable,
  UilUsdCircle,
  UilUsersAlt,
  UilWindowSection,
  UilEllipsisV,
} from '@iconscout/react-unicons';
import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import versions from '../demoData/changelog.json';
import { useDispatch, useSelector } from 'react-redux';

import { changeMenuMode, changeDirectionMode, changeLayoutMode } from '../redux/themeLayout/actionCreator';

function MenuItems() {

    const path = '/admin';
    const { t } = useTranslation();

    interface RootState {
      ChangeLayoutMode: {
        topMenu: string;
      }
    }

    const { topMenu } = useSelector((state:RootState) => {
      return {
        topMenu: state.ChangeLayoutMode.topMenu,
      };
    });

    const router = useRouter();
    const { pathname } = router;
    const pathArray = pathname && pathname !== '/' ? pathname.split(path) : [];
    const mainPath = pathArray.length > 1 ? pathArray[1] : '';
    const mainPathSplit = mainPath.split('/');

    const [openKeys, setOpenKeys] = React.useState(
      !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
    );
    const [openItems, setOpenItems] = React.useState(
      !topMenu ? [ `${ mainPathSplit.length === 1 ? 'demo-1' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2] }`, ] : []
    );

    useEffect(() => {
      // Check if the current route matches the base path.
      if (pathname === path) {
        setOpenKeys(['dashboard']); // active menu key.
        setOpenItems(['demo-1']); // active menu item.
      }
    }, [pathname]);

    const onOpenChange = (keys:string[]) => {
      setOpenKeys(keys[keys.length - 1] !== 'recharts' && keys.length > 0 ? [keys[keys.length - 1]] : keys);
    };

    const onClick = (item:any) => {
      setOpenItems([item.key])
      if (item.keyPath.length === 1) setOpenKeys([]);
    };

    const dispatch = useDispatch();

    const changeNavbar = (topMode:boolean) => {
        const html:HTMLElement | null = document.querySelector('html');
        if (html) {
          if (topMode) {
            html.classList.add('hexadash-topmenu');
          } else {
            html.classList.remove('hexadash-topmenu');
          }
        }
        //@ts-ignore
        dispatch(changeMenuMode(topMode));
    };

    const changeLayoutDirection = (rtlMode:boolean) => {
        if (rtlMode) {
          const html:HTMLElement | null = document.querySelector('html');
          
          if (html) {
            html.setAttribute('dir', 'rtl');
          }
        } else {
          const html:HTMLElement | null = document.querySelector('html');

          if(html) {
            html.setAttribute('dir', 'ltr');
          }
        }
        //@ts-ignore
        dispatch(changeDirectionMode(rtlMode));
    };
    
    const changeLayout = (mode:string) => {
      //@ts-ignore
        dispatch(changeLayoutMode(mode));
    };

    const darkmodeActivated = () => {
      document.body.classList.add('dark');
    };
  
    const darkmodeDiactivated = () => {
      document.body.classList.remove('dark');
    };

    function getItem( label:React.ReactNode, key:string, icon:any, children:any) {
        return {
            label,
            key,
            icon,
            children,
        };
    }

    const items = [
        getItem(t('dashboard'), 'dashboard', !topMenu && <UilCreateDashboard />, [
          getItem(
            <Link href={`${path}`}>
              {t('demo')} {t('1')}
            </Link>,
            'demo-1',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/demo-2`}>
              {t('demo')} {t('2')}
            </Link>,
            'demo-2',
            null,
            null,
          ),
        ]),
        getItem(t('layouts'), 'layout', !topMenu && <UilWindowSection />, [
          getItem(
            <Link
              onClick={() => {
                darkmodeDiactivated();
                changeLayout('lightMode');
              }}
              href="#"
            >
              {t('light')} {t('mode')}
            </Link>,
            'light',
            null,
            null,
          ),
          getItem(
            <Link
              onClick={() => {
                darkmodeActivated();
                changeLayout('darkMode');
              }}
              href="#"
            >
              {t('dark')} {t('mode')}
            </Link>,
            'dark',
            null,
            null,
          ),
          getItem(
            <Link
              onClick={() => {
                changeNavbar(true);
              }}
              href="#"
            >
              {t('top')} {t('menu')}
            </Link>,
            'topMenu',
            null,
            null,
          ),
          getItem(
            <Link
              onClick={() => {
                changeNavbar(false);
              }}
              href="#"
            >
              {t('side')} {t('menu')}
            </Link>,
            'sideMenu',
            null,
            null,
          ),
          getItem(
            <Link
              onClick={() => {
                changeLayoutDirection(true);
              }}
              href="#"
            >
              RTL
            </Link>,
            'rtl',
            null,
            null,
          ),
          getItem(
            <Link
              onClick={() => {
                changeLayoutDirection(false);
              }}
              href="#"
            >
              LTR
            </Link>,
            'ltr',
            null,
            null,
          ),
        ]),
        getItem(
          <Link href={`${path}/pages/changelog`}>
            {t('changelog')}
            <span className="badge badge-primary menuItem">{versions[0].version}</span>
          </Link>,
          'changelog',
          !topMenu && <UilArrowGrowth />,
          null,
        ),
        getItem(
          !topMenu && (
            <p className="flex text-[12px] font-medium uppercase text-theme-gray mt-[20px] dark:text-white/60 pe-[15px]">
              {t('application')}
            </p>
          ),
          'app-title',
          null,
          null,
        ),
        getItem(t('email'), 'email', !topMenu && <UilEnvelope />, [
          getItem(
            <Link href={`${path}/email/inbox`}>
              {t('inbox')}
            </Link>,
            'inbox',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/email/1585118055048`}>
              {t('read')} {t('email')}
            </Link>,
            'single',
            null,
            null,
          ),
        ]),
        getItem(
          <Link href={`${path}/chat/private/rofiq@gmail.com`}>
            {t('chat')}
          </Link>,
          'chat',
          !topMenu && (
            <Link className="c" href={`${path}/main/chat/private/rofiq@gmail.com`}>
              <UilChat />
            </Link>
          ),
          null,
        ),
        getItem(t('eCommerce'), 'ecommerce', !topMenu && <UilShoppingCart />, [
          getItem(
            <Link href={`${path}/ecommerce/products/grid`}>
              {t('products')}
            </Link>,
            'products',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/ecommerce/products/1`}>
              {t('product')} {t('details')}
            </Link>,
            'productDetails',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/ecommerce/add-product`}>
              {t('product')} {t('add')}
            </Link>,
            'add-product',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/ecommerce/edit-product`}>
              {t('product')} {t('edit')}
            </Link>,
            'edit-product',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/ecommerce/cart`}>
              {t('cart')}
            </Link>,
            'cart',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/ecommerce/orders`}>
              {t('orders')}
            </Link>,
            'orsers',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/ecommerce/sellers`}>
              {t('sellers')}
            </Link>,
            'sellers',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/ecommerce/invoice`}>
              {t('invoices')}
            </Link>,
            'Invoice',
            null,
            null,
          ),
        ]),
        getItem(`${t('social')} ${t('app')}`, 'profile', !topMenu && <Uil500px />, [
          getItem(
            <Link href={`${path}/profile/myProfile/overview`}>
              {t('my')} {t('profile')}
            </Link>,
            'myProfile',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/profile/myProfile/timeline`}>
              {t('timeline')}
            </Link>,
            'profileTimeline',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/profile/myProfile/activity`}>
              {t('activity')}
            </Link>,
            'profileActivity',
            null,
            null,
          ),
        ]),
        getItem(t('project'), 'project', !topMenu && <UilBagAlt />, [
          getItem(
            <Link href={`${path}/project/grid`}>
              {t('project')} {t('grid')}
            </Link>,
            'projectGrid',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/project/list`}>
              {t('project')} {t('list')}
            </Link>,
            'projectList',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/project/create`}>
              {t('create')} {t('project')}
            </Link>,
            'ProjectCreate',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/project/1/tasklist`}>
              {t('project')} {t('details')}
            </Link>,
            'projectDetails',
            null,
            null,
          ),
        ]),
        getItem(t('contact'), 'contact', !topMenu && <UilAt />, [
          getItem(
            <Link href={`${path}/contact/grid`}>
              {t('contact')} {t('grid')}
            </Link>,
            'contact-grid',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/contact/list`}>
              {t('contact')} {t('list')}
            </Link>,
            'contact-list',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/contact/addNew`}>
              {t('contact')} {t('create')}
            </Link>,
            'addNew',
            null,
            null,
          ),
        ]),
        getItem(t('support'), 'supports', !topMenu && <UilHeadphones />, [
          getItem(
            <Link href={`${path}/support/tickets`}>
              {t('support')}
            </Link>,
            'support',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/support/tickets/addSupport`}>
              {t('add')} {t('support')}
            </Link>,
            'add-support',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/support/tickets/01`}>
              {t('View')} {t('Support')}
            </Link>,
            'view-support',
            null,
            null,
          ),
        ]),
        getItem(
          !topMenu && (
            <p className="flex text-[12px] font-medium uppercase text-theme-gray mt-[20px] dark:text-white/60 pe-[15px]">
              {t('Crud')}
            </p>
          ),
          'CRUD-title',
          null,
          null,
        ),
        getItem(t('Axios'), 'axios', !topMenu && <UilDatabase />, [
          getItem(
            <Link href={`${path}/crud/axios`}>
              {t('View')} {t('All')}
            </Link>,
            'axios-view',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/crud/axios/add`}>
              {t('Add')} {t('New')}
            </Link>,
            'axios-add',
            null,
            null,
          ),
        ]),
        getItem(t('Firestore'), 'firestore', !topMenu && <UilDatabase />, [
          getItem(
            <Link href={`${path}/crud/firestore`}>
              {t('View')} {t('All')}
            </Link>,
            'firestore-view',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/crud/firestore/add`}>
              {t('Add')} {t('New')}
            </Link>,
            'firestore-add',
            null,
            null,
          ),
        ]),
        getItem(
          !topMenu && (
            <p className="flex text-[12px] font-medium uppercase text-theme-gray mt-[20px] dark:text-white/60 pe-[15px]">
              {t('Features')}
            </p>
          ),
          'features-title',
          null,
          null,
        ),
        getItem(t('UI Elements'), 'components', !topMenu && <UilLayerGroup />, [
          getItem(
            <Link href={`${path}/elements/alerts`}>
              {t('Alerts')}
            </Link>,
            'alerts',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/auto-complete`}>
              {t('Autocomplete')}
            </Link>,
            'auto-complete',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/avatar`}>
              {t('Avatar')}
            </Link>,
            'avatar',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/badge`}>
              {t('Badge')}
            </Link>,
            'badge',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/breadcrumb`}>
              {t('Breadcrumb')}
            </Link>,
            'breadcrumb',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/button`}>
              {t('Button')}
            </Link>,
            'button',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/calendar`}>
              {t('Calendar')}
            </Link>,
            'calendar',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/cards`}>
              {t('Cards')}
            </Link>,
            'cards',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/carousel`}>
              {t('Carousel')}
            </Link>,
            'carousel',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/cascader`}>
              {t('Casecader')}
            </Link>,
            'cascader',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/checkbox`}>
              {t('Checkbox')}
            </Link>,
            'checkbox',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/collapse`}>
              {t('Collapse')}
            </Link>,
            'callapse',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/comments`}>
              {t('Comments')}
            </Link>,
            'comments',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/base`}>
              {t('Dashboard')} {t('Base')}
            </Link>,
            'base',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/date-picker`}>
              {t('Datepicker')}
            </Link>,
            'date-picker',
            null,
            null,
          ),
          getItem(<Link href="/admin/elements/drag">Drag & Drop</Link>, 'drag', null, null),
          getItem(
            <Link href={`${path}/elements/drawer`}>
              {t('Drawer')}
            </Link>,
            'drawer',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/dropdown`}>
              {t('Dropdown')}
            </Link>,
            'dropdown',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/empty`}>
              {t('Empty')}
            </Link>,
            'empty',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/grid`}>
              {t('Grid')}
            </Link>,
            '-dash-grid',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/input`}>
              {t('Input')}
            </Link>,
            'input',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/list`}>
              {t('List')}
            </Link>,
            'dash-list',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/menu`}>
              {t('Menu')}
            </Link>,
            'menu',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/message`}>
              {t('Message')}
            </Link>,
            'message',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/modals`}>
              {t('Modals')}
            </Link>,
            'modals',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/notification`}>
              {t('Notification')}
            </Link>,
            'notifications',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/page-headers`}>
              {t('Page')} {t('Headers')}
            </Link>,
            'page-headers',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/pagination`}>
              {t('Paginations')}
            </Link>,
            'paginations',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/confirm`}>
              {t('Popconfirm')}
            </Link>,
            'popconfirme',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/popover`}>
              {t('Popover')}
            </Link>,
            'popover',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/progress`}>
              {t('Progress')}
            </Link>,
            'progress',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/radio`}>
              {t('Radio')}
            </Link>,
            'radio',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/rate`}>
              {t('Rate')}
            </Link>,
            'rate',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/result`}>
              {t('Result')}
            </Link>,
            'result',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/select`}>
              {t('Select')}
            </Link>,
            'select',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/skeleton`}>
              {t('Skeleton')}
            </Link>,
            'skeleton',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/slider`}>
              {t('Slider')}
            </Link>,
            'slider',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/spiner`}>
              {t('Spinner')}
            </Link>,
            'spiner',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/statistic`}>
              {t('Statistics')}
            </Link>,
            'statistics',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/steps`}>
              {t('Steps')}
            </Link>,
            'steps',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/switch`}>
              {t('Switch')}
            </Link>,
            'switch',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/tabs`}>
              {t('Tabs')}
            </Link>,
            'tabs',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/tags`}>
              {t('Tags')}
            </Link>,
            'tags',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/timeline`}>
              {t('Timeline')}
            </Link>,
            'timeline',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/timepicker`}>
              {t('Timepicker')}
            </Link>,
            'timepicker',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/tree-select`}>
              {t('Tree')} {t('Select')}
            </Link>,
            'treeselect',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/elements/upload`}>
              {t('Upload')}
            </Link>,
            'upload',
            null,
            null,
          ),
        ]),
        getItem(t('charts'), 'charts', !topMenu && <UilChartBar />, [
          getItem(
            <Link href={`${path}/charts/chartjs`}>
              {t('Chart')} {t('JS')}
            </Link>,
            'chartjs',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/charts/google-chart`}>
              {t('Google')} {t('Chart')}
            </Link>,
            'google-chart',
            null,
            null,
          ),
          getItem(t('Recharts'), 'recharts', !topMenu && <UilChartBar />, [
            getItem(
              <Link href={`${path}/charts/recharts/bar`}>
                {t('Bar')} {t('Chart')}
              </Link>,
              'bar',
              null,
              null,
            ),
            getItem(
              <Link href={`${path}/charts/recharts/area`}>
                {t('Area')} {t('Chart')}
              </Link>,
              'area',
              null,
              null,
            ),
            getItem(
              <Link href={`${path}/charts/recharts/composed`}>
                {t('Composed')} {t('Chart')}
              </Link>,
              'composed',
              null,
              null,
            ),
            getItem(
              <Link href={`${path}/charts/recharts/line`}>
                {t('Line')} {t('Chart')}
              </Link>,
              'line',
              null,
              null,
            ),
            getItem(
              <Link href={`${path}/charts/recharts/pie`}>
                {t('Pie')} {t('Chart')}
              </Link>,
              'pie',
              null,
              null,
            ),
            getItem(
              <Link href={`${path}/charts/recharts/radar`}>
                {t('Radar')} {t('Chart')}
              </Link>,
              'radar',
              null,
              null,
            ),
            getItem(
              <Link href={`${path}/charts/recharts/radial`}>
                {t('Radial')} {t('Charts')}
              </Link>,
              'radial',
              null,
              null,
            ),
          ]),
          getItem(
            <Link href={`${path}/charts/peity`}>
              {t('Peity')} {t('Charts')}
            </Link>,
            'peity',
            null,
            null,
          ),
        ]),
        getItem(t('forms'), 'forms', !topMenu && <UilCompactDisc />, [
          getItem(
            <Link href={`${path}/forms/form-layout`}>
              {t('Form')} {t('Layouts')}
            </Link>,
            'form-layout',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/forms/form-elements`}>
              {t('Form')} {t('Elements')}
            </Link>,
            'form-elements',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/forms/form-components`}>
              {t('Form')} {t('Components')}
            </Link>,
            'form-components',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/forms/form-validation`}>
              {t('Form')} {t('Validation')}
            </Link>,
            'form-validation',
            null,
            null,
          ),
        ]),
        getItem(t('table'), 'table', !topMenu && <UilTable />, [
          getItem(
            <Link href={`${path}/tables/basic`}>
              {t('Basic')} {t('Table')}
            </Link>,
            'basicTable',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/tables/dataTable`}>
              {t('Data')} {t('Table')}
            </Link>,
            'dataTable',
            null,
            null,
          ),
        ]),
        getItem(t('widgets'), 'widgets', !topMenu && <UilServer />, [
          getItem(
            <Link href={`${path}/widgets/chart`}>
              {t('Chart')}
            </Link>,
            'chart',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/widgets/card`}>
              {t('Card')}
            </Link>,
            'card',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/widgets/mixed`}>
              {t('Mixed')}
            </Link>,
            'mixed',
            null,
            null,
          ),
        ]),
        getItem(t('icons'), 'icons', !topMenu && <UilIcons />, [
          getItem(
            <Link href={`${path}/icons/unicon`}>
              {t('Unicon(svg)')}
            </Link>,
            'unicons',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/icons/font-awesome`}>
              {t('Fontawesome')}
            </Link>,
            'font-awesome',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/icons/antd`}>
              {t('Ant')} {t('Design')} {t('Icons')}
            </Link>,
            'antd',
            null,
            null,
          ),
        ]),
        getItem(
          <Link href={`${path}/editor`}>
            {t('Editors')}
          </Link>,
          'editor',
          !topMenu && (
            <Link className="menuItem-icon" href={`${path}/editor`}>
              <UilEdit />
            </Link>
          ),
          null,
        ),
        getItem(t('maps'), 'maps', !topMenu && <UilMap />, [
          getItem(
            <Link href={`${path}/maps/google`}>
              {t('Google')} {t('Maps')}
            </Link>,
            'google',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/maps/leaflet`}>
              {t('Leaflet')} {t('Map')}
            </Link>,
            'leaflet',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/maps/vector`}>
              {t('Simple')} {t('Map')}
            </Link>,
            'vector',
            null,
            null,
          ),
        ]),
        getItem(
          !topMenu && (
            <p className="flex text-[12px] font-medium uppercase text-theme-gray mt-[20px] dark:text-white/60 pe-[15px]">
              {t('Pages')}
            </p>
          ),
          'page-title',
          null,
          null,
        ),
        getItem(
          <Link href={`${path}/pages/settings`}>
            {t('Settings')}
          </Link>,
          'settings',
          !topMenu && (
            <Link className="menuItem-icon" href={`${path}/pages/settings`}>
              <UilSetting />
            </Link>
          ),
          null,
        ),
        getItem(t('gallery'), 'gallery', !topMenu && <UilImages />, [
          getItem(
            <Link href={`${path}/pages/gallery/one`}>
              {t('Gallery')} {t('1')}
            </Link>,
            'gallery-one',
            null,
            null,
          ),
        ]),
        getItem(
          <Link href={`${path}/pages/pricing`}>
            {t('Pricing')}
          </Link>,
          'pricing',
          !topMenu && (
            <Link className="menuItem-icon" href={`${path}/pages/pricing`}>
              <UilCircle />
            </Link>
          ),
          null,
        ),
        getItem(
          <Link href={`${path}/pages/banners`}>
            {t('Banners')}
          </Link>,
          'banners',
          !topMenu && (
            <Link className="menuItem-icon" href={`${path}/pages/banners`}>
              <UilPresentation />
            </Link>
          ),
          null,
        ),
        getItem(
          <Link href={`${path}/pages/testimonials`}>
            {t('Testimonials')}
          </Link>,
          'testimonials',
          !topMenu && (
            <Link className="menuItem-icon" href={`${path}/pages/testimonials`}>
              <UilBookOpen />
            </Link>
          ),
          null,
        ),
        getItem(
          <Link href={`${path}/pages/faq`}>
            {t('Faqs')}
          </Link>,
          'faq',
          !topMenu && (
            <Link className="menuItem-icon" href={`${path}/pages/faq`}>
              <UilCircle />
            </Link>
          ),
          null,
        ),
        getItem(
          <Link href={`${path}/pages/search`}>
            {t('Search')} {t('Results')}
          </Link>,
          'search',
          !topMenu && (
            <Link className="menuItem-icon" href={`${path}/pages/search`}>
              <UilSearch />
            </Link>
          ),
          null,
        ),
        getItem(
          <Link href={`${path}/pages/starter`}>
            {t('Blank')} {t('Page')}
          </Link>,
          'starter',
          !topMenu && (
            <Link className="menuItem-icon" href={`${path}/pages/starter`}>
              <UilCircle />
            </Link>
          ),
          null,
        ),
        getItem(t('Knowledgebase'), 'knowledgebase', !topMenu && <UilBookAlt />, [
          getItem(
            <Link href={`${path}/pages/knowledgeBase`}>
              {t('Knowledge')} {t('Base')}
            </Link>,
            'knowledgeBase',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/pages/knowledgeBase/articles`}>
              {t('All')} {t('Article')}
            </Link>,
            'articles',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/pages/knowledgeBase/single`}>
              {t('Single')} {t('Article')}
            </Link>,
            'knowledgebaseSingle',
            null,
            null,
          ),
        ]),
        getItem(t('blog'), 'blog', !topMenu && <UilDocumentLayoutLeft />, [
          getItem(
            <Link href={`${path}/pages/blog/one`}>
              {t('Blog')} {t('One')}
            </Link>,
            'blog-1',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/pages/blog/two`}>
              {t('Blog')} {t('Two')}
            </Link>,
            'blog-2',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/pages/blog/three`}>
              {t('Blog')} {t('Three')}
            </Link>,
            'blog-3',
            null,
            null,
          ),
          getItem(
            <Link href={`${path}/pages/blog/details`}>
              {t('Blog')} {t('Details')}
            </Link>,
            'blog-details',
            null,
            null,
          ),
        ]),
        getItem(
          <Link href={`${path}/pages/maintenance`}>
            {t('Maintanance')}
          </Link>,
          'maintenance',
          !topMenu && <UilAirplay />,
          null,
        ),
        getItem(
          <Link href={`${path}/pages/404`}>
            {t('404')}
          </Link>,
          '404',
          !topMenu && (
            <Link className="menuItem-icon" href={`${path}/pages/404`}>
              <UilExclamationOctagon />
            </Link>
          ),
          null,
        ),
        getItem(
          <Link href={`${path}/pages/comingSoon`}>
            {t('Coming')} {t('Soon')}
          </Link>,
          'comingsoon',
          !topMenu && (
            <Link className="menuItem-icon" href={`${path}/pages/comingSoon`}>
              <UilClock />
            </Link>
          ),
          null,
        ),
        getItem(
          <Link href={`${path}/pages/termCondition`}>
            {t('Terms')} {t('&')} {t('conditions')}
          </Link>,
          'termcondition',
          !topMenu && (
            <Link className="menuItem-icon" href={`${path}/pages/termCondition`}>
              <UilFile />
            </Link>
          ),
          null,
        ),
    ];

    return (
        <Menu
            onClick={onClick}
            onOpenChange={onOpenChange}
            mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
            defaultSelectedKeys={openKeys}
            defaultOpenKeys={openItems}
            overflowedIndicator={<UilEllipsisV />}
            openKeys={openKeys}
            selectedKeys={openItems}
            items={items}
        />
    );
}

export default MenuItems;
