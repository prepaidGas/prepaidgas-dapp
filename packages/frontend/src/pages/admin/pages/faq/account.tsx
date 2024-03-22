import dynamic from 'next/dynamic';
import { Spin, Collapse } from 'antd';
import {
  UilPlus,
  UilMinus,
  UilSmile,
  UilFrown
} from '@iconscout/react-unicons';
import Heading from '@/components/heading';
import { Buttons } from '@/components/buttons';

const { Panel } = Collapse;

const FaqLayout = dynamic(() => import('./Layout'), {
  loading: () => (
    <div className="h-screen flex justify-center items-center">
      <Spin />
    </div>
  ),
});

function Accounts() {

  return (
    <>
      <FaqLayout>
      <div className="bg-white dark:bg-white/10 p-[25px] text-xl rounded-[10px]">
        <Heading as="h5" className="mb-6 text-xl font-medium text-dark dark:text-white/[.87]">
          Account & Billing
        </Heading>
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          className="bg-transparent border-none"
          expandIcon={({ isActive }) => (isActive ? <UilMinus className="w-4 h-4" /> : <UilPlus className="w-4 h-4" /> )}
        >
          <Panel
            header="How long does it take to download updates?"
            key="1"
            className="mb-1 font-medium ant-card-custom-style text-dark dark:text-white/[.87] text-15 border-regular dark:border-white/10 rounded-6 [&>.ant-collapse-content]:border-none"
          >
            <div className="-mx-4 -mb-4 px-6 pt-5 pb-[30px] border-t dark:border-white/10">
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
          </Panel>
          <Panel
            header="How to use SCSS variables to build custom color?"
            key="2"
            className="mb-1 font-medium ant-card-custom-style text-dark dark:text-white/[.87] text-15 border-regular dark:border-white/10 rounded-6 [&>.ant-collapse-content]:border-none"
          >
            <div className="-mx-4 -mb-4 px-6 pt-5 pb-[30px] border-t dark:border-white/10">
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
              <div className="mb-3.5">
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
          </Panel>
          <Panel
            header="How long does it take to download complete?"
            key="3"
            className="mb-1 font-medium ant-card-custom-style text-dark dark:text-white/[.87] text-15 border-regular dark:border-white/10 rounded-6 [&>.ant-collapse-content]:border-none"
          >
            <div className="-mx-4 -mb-4 px-6 pt-5 pb-[30px] border-t dark:border-white/10">
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
              <div className="mb-3.5">
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
          </Panel>
          <Panel
            header="What is the flex layout?"
            key="4"
            className="mb-1 font-medium ant-card-custom-style text-dark dark:text-white/[.87] text-15 border-regular dark:border-white/10 rounded-6 [&>.ant-collapse-content]:border-none"
          >
            <div className="-mx-4 -mb-4 px-6 pt-5 pb-[30px] border-t dark:border-white/10">
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
              <div className="mb-3.5">
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
          </Panel>
          <Panel
            header="How long does it take to download updates?"
            key="5"
            className="mb-1 font-medium ant-card-custom-style text-dark dark:text-white/[.87] text-15 border-regular dark:border-white/10 rounded-6 [&>.ant-collapse-content]:border-none"
          >
            <div className="-mx-4 -mb-4 px-6 pt-5 pb-[30px] border-t dark:border-white/10">
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
              <div className="mb-3.5">
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
          </Panel>
          <Panel
            header="Where to buy this UI dashboard?"
            key="6"
            className="mb-1 font-medium ant-card-custom-style text-dark dark:text-white/[.87] text-15 border-regular dark:border-white/10 rounded-6 [&>.ant-collapse-content]:border-none"
          >
            <div className="-mx-4 -mb-4 px-6 pt-5 pb-[30px] border-t dark:border-white/10">
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
              <div className="mb-3.5">
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
          </Panel>
          <Panel
            header="How long does it take to download updates?"
            key="7"
            className="mb-1 font-medium ant-faq-item-border-regular ant-card-custom-style text-dark dark:text-white/[.87] text-15 rounded-6"
          >
            <div className="-mx-4 -mb-4 px-6 pt-5 pb-[30px] border-t dark:border-white/10">
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
              <div className="mb-3.5">
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
          </Panel>
        </Collapse>
      </div>
      </FaqLayout>
    </>
  );
}

export default Accounts;
