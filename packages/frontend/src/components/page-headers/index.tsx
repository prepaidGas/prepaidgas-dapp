import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from 'antd';
import { ReactSVG } from 'react-svg';
import { PageHeader } from '@ant-design/pro-layout';

interface PageHeadersProps {
  title?: string;
  subTitle?: React.ReactNode;
  routes?: any;
  buttons?: any;
  ghost?: boolean;
  bgColor?: string;
  className?: string;
}

interface RouteState {
  breadcrumbName: string;
  path: string;
}

function PageHeaders(props:PageHeadersProps) {
  const { title, subTitle, routes, buttons, ghost, bgColor, className } = props;
  const breadcrumbItems = routes
  ? routes.map((route:RouteState, index:number) => ({
      title: index + 1 === routes.length ? route.breadcrumbName : (
        <div className="inline-flex items-start group text-light dark:text-light-extra">
          <ReactSVG
            className="relative top-0.5 me-2 [&>div>svg]:text-current group-hover:text-primary dark:group-hover:text-white/[.87] duration-200"
            src="/hexadash-nextjs/img/icon/home.svg"
          />
          {' '}
          <Link
            href={route.path}
            className="text-light dark:text-light-extra group-hover:text-primary dark:group-hover:text-white/[.87] text-[14px] leading-[22px]  duration-200"
          >
            {route.breadcrumbName}
          </Link>
        </div>
      ),
    }))
  : [];

  const breadcrumb = (
    <Breadcrumb
      className="flex order-2 relative top-1.5 mb-2 [&>ol>li>.ant-breadcrumb-link]:flex md:justify-center md:[&>ol]:justify-center md:[&>ol]:gap-[10px]"
      separator={<span className="inline-flex bg-light-extra relative -top-0.5 w-1 h-1 rounded-full" />}
      items={breadcrumbItems}
    />
  );


  return (
    <>
      <PageHeader
        className={`${className}`}
        title={title}
        subTitle={subTitle}
        breadcrumb={breadcrumb}
        extra={buttons}
        ghost={ghost}
      />
    </>
  );
}


export { PageHeaders };
