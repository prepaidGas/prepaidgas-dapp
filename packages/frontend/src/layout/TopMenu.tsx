import { useLayoutEffect } from 'react';
import Link from 'next/link';
import {
  UilEnvelope,
  UilChat,
  UilShoppingCart,
  Uil500px,
  UilBagAlt,
  UilCalendarAlt,
  UilUsersAlt,
  UilAt,
  UilClipboardAlt,
  UilExpandArrowsAlt,
  UilCheckSquare,
  UilExchange,
  UilFile,
  UilHeadphones,
  UilChartBar,
  UilCompactDisc,
  UilTable,
  UilSquareFull,
  UilApps,
  UilEdit,
  UilMap,
} from '@iconscout/react-unicons';
import { TopMenuStyle } from './Style';

function TopMenu() {
  const path = '/admin';

  useLayoutEffect(() => {
    const active:any = document.querySelector('.hexadash-top-menu a.active');
    const activeDefault = () => {
      const megaMenu = active.closest('.megaMenu-wrapper');
      const hasSubMenuLeft = active.closest('.has-subMenu-left');
      if (!megaMenu) {
        active.closest('ul').previousSibling.classList.add('active');
        if (hasSubMenuLeft) hasSubMenuLeft.closest('ul').previousSibling.classList.add('active');
      } else {
        active.closest('.megaMenu-wrapper').previousSibling.classList.add('active');
      }
    };
    window.addEventListener('load', active && activeDefault);
    return () => window.removeEventListener('load', activeDefault);
  }, []);

  const addParentActive = (event:any) => {
    document.querySelectorAll('.parent').forEach((element) => {
      element.classList.remove('active');
    });

    const hasSubMenuLeft = event.currentTarget.closest('.has-subMenu-left');
    const megaMenu = event.currentTarget.closest('.megaMenu-wrapper');
    if (!megaMenu) {
      event.currentTarget.closest('ul').previousSibling.classList.add('active');
      if (hasSubMenuLeft) hasSubMenuLeft.closest('ul').previousSibling.classList.add('active');
    } else {
      event.currentTarget.closest('.megaMenu-wrapper').previousSibling.classList.add('active');
    }
  };
  return (
    <TopMenuStyle>
      <div className="hexadash-top-menu ps-[20px] xl:ps-[10px]">
        <ul className="flex items-center [&>li]:pr-[14px] [&>li>a.active]:text-primary">
          <li className="has-subMenu">
            <Link href="#" className="parent">
              Dashboard
            </Link>
            <ul className="subMenu">
              <li>
                <Link href={`${path}`} onClick={addParentActive}>
                  Demo 1
                </Link>
              </li>
              <li>
                <Link href={`${path}/demo-2`} onClick={addParentActive}>
                  Demo 2
                </Link>
              </li>
            </ul>
          </li>

          <li className="has-subMenu">
            <Link href="#" className="parent">
              Apps
            </Link>
            <ul className="subMenu">
              <li className="has-subMenu-left">
                <Link href="#" className="parent">
                  <UilEnvelope />
                  Email
                </Link>
                <ul className="subMenu">
                  <li>
                    <Link onClick={addParentActive} href={`${path}/email/inbox`}>
                      Inbox
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/email/single/1585118055048`}>
                      Read Email
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link onClick={addParentActive} href={`${path}/main/chat/private/rofiq@gmail.com`}>
                  <UilChat />
                  Chat
                </Link>
              </li>
              <li className="has-subMenu-left">
                <Link href="#" className="parent">
                  <UilShoppingCart />
                  eComerce
                </Link>
                <ul className="subMenu">
                  <li>
                    <Link onClick={addParentActive} href={`${path}/ecommerce/products/grid`}>
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/ecommerce/productDetails/1`}>
                      Products Details
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/ecommerce/add-product`}>
                      Product Add
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/ecommerce/edit-product`}>
                      Product Edit
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/ecommerce/cart`}>
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/ecommerce/orders`}>
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/ecommerce/sellers`}>
                      Sellers
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/ecommerce/Invoice`}>
                      Invoices
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="has-subMenu-left">
                <Link href="#" className="parent">
                  <Uil500px />
                  Social App
                </Link>
                <ul className="subMenu">
                  <li>
                    <Link onClick={addParentActive} href={`${path}/profile/myProfile/overview`}>
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/profile/myProfile/timeline`}>
                      Timeline
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/profile/myProfile/activity`}>
                      Activity
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="has-subMenu-left">
                <Link href="#" className="parent">
                  <UilBagAlt />
                  Project
                </Link>
                <ul className="subMenu">
                  <li>
                    <Link onClick={addParentActive} href={`${path}/project/view/grid`}>
                      Project Grid
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/project/view/list`}>
                      Project List
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/project/create`}>
                      Create Project
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/project/projectDetails/1`}>
                      Project Details
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link onClick={addParentActive} href={`${path}/app/calendar/month`}>
                  <UilCalendarAlt />
                  Calendar
                </Link>
              </li>
              <li className="has-subMenu-left">
                <Link href="#" className="parent">
                  <UilUsersAlt />
                  Users
                </Link>
                <ul className="subMenu">
                  <li>
                    <Link onClick={addParentActive} href={`${path}/users/team`}>
                      Team
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/users/grid`}>
                      Users Grid
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/users/list`}>
                      Users List
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/users/grid-style`}>
                      Users Grid Style
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/users/grid-group`}>
                      Users Group
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/users/add-user/info`}>
                      Add User
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/users/dataTable`}>
                      User Table
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="has-subMenu-left">
                <Link href="#" className="parent">
                  <UilAt />
                  Contact
                </Link>
                <ul className="subMenu">
                  <li>
                    <Link onClick={addParentActive} href={`${path}/contact/addNew`}>
                      Contact Create
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/contact/grid`}>
                      Contact Grid
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/contact/list`}>
                      Contact List
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link onClick={addParentActive} href={`${path}/app/note/all`}>
                  <UilClipboardAlt />
                  Note
                </Link>
              </li>
              <li>
                <Link onClick={addParentActive} href={`${path}/app/to-do/`}>
                  <UilCheckSquare />
                  To Do
                </Link>
              </li>
              <li>
                <Link onClick={addParentActive} href={`${path}/app/kanban`}>
                  <UilExpandArrowsAlt />
                  Kanban Board
                </Link>
              </li>
              <li className="has-subMenu-left">
                <Link href="#" className="parent">
                  <UilExchange />
                  Import Export
                </Link>
                <ul className="subMenu">
                  <li>
                    <Link onClick={addParentActive} href={`${path}/importExport/import`}>
                      Import
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/importExport/export`}>
                      Export
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link onClick={addParentActive} href={`${path}/app/task/all`}>
                  <UilFile />
                  Task
                </Link>
              </li>
              <li>
                <Link onClick={addParentActive} href={`${path}/app/support/tickets`}>
                  <UilHeadphones />
                  Support
                </Link>
              </li>
              <li className="has-subMenu-left">
                <Link href="#" className="parent">
                  <UilAt />
                  Learning App
                </Link>
                <ul className="subMenu">
                  <li>
                    <Link onClick={addParentActive} href={`${path}/importExport/import`}>
                      Course
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/importExport/export`}>
                      Course Single
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li className="mega-item has-subMenu">
            <Link href="#" className="parent">
              Pages
            </Link>
            <ul className="megaMenu-wrapper megaMenu-small">
              <li>
                <ul>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/settings`}>
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/gallery`}>
                      Gallery
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/pricing`}>
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/banners`}>
                      Banners
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/testimonials`}>
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/faq`}>
                      Faq`s
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/pages/search`}>
                      Search Results
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <Link onClick={addParentActive} href={`${path}pages/starter`}>
                      Blank Page
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/pages/maintenance`}>
                      Maintenance
                    </Link>
                  </li>

                  <li>
                    <Link onClick={addParentActive} href={`${path}/pages/404`}>
                      404
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/pages/comingSoon`}>
                      Coming Soon
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/pages/termCondition`}>
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/pages/changelog`}>
                      Changelog
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/knowledgebase/plugins`}>
                      Knowledgebase
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/all-articles`}>
                      All Article
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/knowledgebaseSingle/1`}>
                      Single Article
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/pages/blog/blogone`}>
                      Blog One
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/pages/blog/blogtwo`}>
                      Blog Two
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/pages/blog/blogthree`}>
                      Blog Three
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/pages/blog/details`}>
                      Blog Details
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="mega-item has-subMenu">
            <Link href="#" className="parent">
              Components
            </Link>
            <ul className="megaMenu-wrapper megaMenu-wide">
              <li>
                <span className="mega-title">Components</span>
                <ul>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/alerts`}>
                      Alert
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/auto-complete`}>
                      AutoComplete
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/avatar`}>
                      Avatar
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/badge`}>
                      Badge
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/breadcrumb`}>
                      Breadcrumb
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/button`}>
                      Buttons
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/calendar`}>
                      Calendar
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/cards`}>
                      Card
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/carousel`}>
                      Carousel
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/cascader`}>
                      Cascader
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/checkbox`}>
                      Checkbox
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/collapse`}>
                      Collapse
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <span className="mega-title">Components</span>
                <ul>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/comments`}>
                      Comments
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/base`}>
                      Dashboard Base
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/date-picker`}>
                      DataPicker
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/drag`}>
                      Drag & Drop
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/drawer`}>
                      Drawer
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/dropdown`}>
                      Dropdown
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/empty`}>
                      Empty
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/grid`}>
                      Grid
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/input`}>
                      Input
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/list`}>
                      List
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/menu`}>
                      Menu
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <span className="mega-title">Components</span>
                <ul>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/message`}>
                      Message
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/modals`}>
                      Modals
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/notification`}>
                      Notifications
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/page-headers`}>
                      Page Headers
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/pagination`}>
                      Pagination
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/confirm`}>
                      PopConfirm
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/popover`}>
                      PopOver
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/progress`}>
                      Progress
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/radio`}>
                      Radio
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/rate`}>
                      Rate
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/result`}>
                      Result
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/select`}>
                      Select
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <span className="mega-title">Components</span>
                <ul>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/skeleton`}>
                      Skeleton
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/slider`}>
                      Slider
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/spiner`}>
                      Spiner
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/statistic`}>
                      Statistics
                    </Link>
                  </li>

                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/steps`}>
                      Steps
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/switch`}>
                      Switch
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/tabs`}>
                      Tabs
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/tags`}>
                      Tags
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/timeline`}>
                      Timeline
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/timepicker`}>
                      TimePicker
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/tree-select`}>
                      Tree Select
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/components/upload`}>
                      Upload
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="has-subMenu">
            <Link href="#" className="parent">
              Features
            </Link>
            <ul className="subMenu">
              <li className="has-subMenu-left">
                <Link href="#" className="parent">
                  <UilChartBar />
                  Charts
                </Link>
                <ul className="subMenu">
                  <li>
                    <Link onClick={addParentActive} href={`${path}/charts/chartjs`}>
                      Chart Js
                    </Link>
                  </li>
                  <li>
                    <Link href={`${path}/charts/google-chart`}>Google Chart</Link>
                  </li>
                  <li className="has-subMenu-left">
                    <Link href="#">Rechart</Link>
                    <ul className="subMenu">
                      <li>
                        <Link onClick={addParentActive} href={`${path}/charts/recharts/bar`}>
                          Bar Chart
                        </Link>
                      </li>
                      <li>
                        <Link onClick={addParentActive} href={`${path}/charts/recharts/area`}>
                          Area Charts
                        </Link>
                      </li>
                      <li>
                        <Link onClick={addParentActive} href={`${path}/charts/recharts/composed`}>
                          Composed Charts
                        </Link>
                      </li>
                      <li>
                        <Link onClick={addParentActive} href={`${path}/charts/recharts/line`}>
                          Line Charts
                        </Link>
                      </li>
                      <li>
                        <Link onClick={addParentActive} href={`${path}/charts/recharts/pie`}>
                          Pie Charts
                        </Link>
                      </li>
                      <li>
                        <Link onClick={addParentActive} href={`${path}/charts/recharts/radar`}>
                          Radar Charts
                        </Link>
                      </li>
                      <li>
                        <Link onClick={addParentActive} href={`${path}/charts/recharts/radial`}>
                          Radial Charts
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/charts/peity`}>
                      Peity Chart
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="has-subMenu-left">
                <Link href="#" className="parent">
                  <UilCompactDisc />
                  Form
                </Link>
                <ul className="subMenu">
                  <li>
                    <Link onClick={addParentActive} href={`${path}/form-layout`}>
                      Form Layouts
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/form-elements`}>
                      Form Elements
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/form-components`}>
                      Form Components
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/form-validation`}>
                      Form Validation
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="has-subMenu-left">
                <Link href="#" className="parent">
                  <UilTable />
                  Tables
                </Link>
                <ul className="subMenu">
                  <li>
                    <Link onClick={addParentActive} href={`${path}/tables/basic`}>
                      Basic Table
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/tables/dataTable`}>
                      Data Table
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="has-subMenu-left">
                <Link href="#" className="parent">
                  <UilSquareFull />
                  Widgets
                </Link>
                <ul className="subMenu">
                  <li>
                    <Link onClick={addParentActive} href={`${path}/widgets/chart`}>
                      Chart
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/widgets/card`}>
                      Card
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/widgets/mixed`}>
                      Mixed
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link onClick={addParentActive} href={`${path}/wizards`}>
                  <UilSquareFull />
                  Wizards
                </Link>
              </li>
              <li className="has-subMenu-left">
                <Link href="#" className="parent">
                  <UilApps />
                  Icons
                </Link>
                <ul className="subMenu">
                  <li>
                    <Link onClick={addParentActive} href={`${path}/icons/feathers`}>
                      Feather Icons(svg)
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/icons/font-awesome`}>
                      Font Awesome
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/icons/antd`}>
                      Ant Design Icons
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link onClick={addParentActive} href={`${path}/editor`}>
                  <UilEdit />
                  Editor
                </Link>
              </li>

              <li className="has-subMenu-left">
                <Link href="#" className="parent">
                  <UilMap />
                  Maps
                </Link>
                <ul className="subMenu">
                  <li>
                    <Link onClick={addParentActive} href={`${path}/maps/google`}>
                      Google Maps
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/maps/leaflet`}>
                      Leaflet Maps
                    </Link>
                  </li>
                  <li>
                    <Link onClick={addParentActive} href={`${path}/maps/Vector`}>
                      Vector Maps
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </TopMenuStyle>
  );
}

export default TopMenu;
