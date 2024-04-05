import dynamic from 'next/dynamic';
import {
  UilPlus,
  UilMinus,
  UilSmile,
  UilFrown
} from '@iconscout/react-unicons';
import { Spin, Collapse } from 'antd';
import Heading from '@/components/heading';
import { Buttons } from '@/components/buttons';

const { Panel } = Collapse;

const FaqLayout = dynamic(() => import('./Layout'), {
  loading: () => (
    <div className="flex items-center justify-center h-screen">
      <Spin />
    </div>
  ),
});

const text = (
  <div className="-mx-4 -mb-4 px-6 pt-3 pb-[30px]">
    <p className="font-normal mb-9 text-body dark:text-white/60 text-15">
      Many support queries and technical questions will already be answered in supporting
      documentation such as FAQ&rsquo;s and comments from previous buyers. Anim pariatur cliche
      reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia
      aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.Brunch
      3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
      shoreditch et.
    </p>
    <Heading as="h4" className="mb-3 text-sm font-medium">
      Was this article helpful?
    </Heading>
    <div>
      <Buttons
        outlined
        type="success"
        className="inline-flex items-center justify-center h-9 px-4 ltr:mr-2.5 rtl:ml-2.5 text-success border border-success bg-transparent"
      >
        <UilSmile className="w-[14px] h-[14px] ltr:mr-1.5 rtl:ml-1.5" />
        Yes
      </Buttons>
      <Buttons
        outlined
        type="warning"
        className="inline-flex items-center justify-center h-9 px-4 ltr:mr-2.5 rtl:ml-2.5 text-warning border border-warning bg-transparent"
      >
        <UilFrown className="w-[14px] h-[14px] ltr:mr-1.5 rtl:ml-1.5" />
        No
      </Buttons>
    </div>
  </div>
);

const items = [
  {
    key: '1',
    label: (
      <div>
        <div className="font-medium ant-card-custom-style text-dark dark:text-white/[.87] text-15 border-regular dark:border-white/10 rounded-6 [&>.ant-collapse-content]:border-none">
          How long does it take to download updates?
        </div>
      </div>
    ),
    children: text,
  },
  {
    key: '2',
    label: (
      <div>
        <div className="font-medium ant-card-custom-style text-dark dark:text-white/[.87] text-15 border-regular dark:border-white/10 rounded-6 [&>.ant-collapse-content]:border-none">
        How to use SCSS variables to build custom color?
        </div>
      </div>
    ),
    children: text,
  },
  {
    key: '3',
    label: (
      <div>
        <div className="font-medium ant-card-custom-style text-dark dark:text-white/[.87] text-15 border-regular dark:border-white/10 rounded-6 [&>.ant-collapse-content]:border-none">
        How long does it take to download updates?
        </div>
      </div>
    ),
    children: text,
  },
  {
    key: '4',
    label: (
      <div>
        <div className="font-medium ant-card-custom-style text-dark dark:text-white/[.87] text-15 border-regular dark:border-white/10 rounded-6 [&>.ant-collapse-content]:border-none">
        How long does it take to download updates?
        </div>
      </div>
    ),
    children: text,
  },
  {
    key: '5',
    label: (
      <div>
        <div className="font-medium ant-card-custom-style text-dark dark:text-white/[.87] text-15 border-regular dark:border-white/10 rounded-6 [&>.ant-collapse-content]:border-none">
        How to use SCSS variables to build custom colors?
        </div>
      </div>
    ),
    children: text,
  },
  {
    key: '6',
    label: (
      <div>
        <div className="font-medium ant-card-custom-style text-dark dark:text-white/[.87] text-15 border-regular dark:border-white/10 rounded-6 [&>.ant-collapse-content]:border-none">
        How long does it take to download updates?
        </div>
      </div>
    ),
    children: text,
  },
  {
    key: '7',
    label: (
      <div>
        <div className="font-medium ant-card-custom-style text-dark dark:text-white/[.87] text-15 border-regular dark:border-white/10 rounded-6 [&>.ant-collapse-content]:border-none">
        How long does it take to download updates?
        </div>
      </div>
    ),
    children: text,
  },
];

function Applications() {
  return (
    <>
      <FaqLayout>
        <div className="bg-white dark:bg-white/10 p-[25px] text-xl rounded-[10px]">
          <Heading as="h5" className="mb-6 text-xl font-medium text-dark dark:text-white/[.87]">
            Using Applications
          </Heading>
          <Collapse className="bg-transparent border-none [&>.ant-collapse-item]:border-regular dark:[&>.ant-collapse-item]:border-white/10 [&>.ant-collapse-item]:border-1 [&>.ant-collapse-item]:mb-[10px] [&>.ant-collapse-item]:rounded-6 [&>.ant-collapse-item>.ant-collapse-header]:px-[20px] [&>.ant-collapse-item>.ant-collapse-header]:py-[18px]" expandIcon={({ isActive }) => (isActive ? <UilMinus className="w-4 h-4" /> : <UilPlus className="w-4 h-4" /> )} accordion items={items} />
        </div>
      </FaqLayout>
    </>
  );
}

export default Applications;
