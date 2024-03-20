import { Col, Row } from 'antd';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';
import PopOver from '@/components/popup';
import Heading from '@/components/heading';

const Settings = React.memo(() => {
  const content = (
    <>
      <div className="max-w-[700px] sm:max-w-full">
        <Row>
          <Col sm={12} xs={24}>
            <figure className="flex items-start px-4 py-5 mb-0 setting-dropdown__single hover:shadow-action">
              <Image
                className="h-fit ltr:mr-4 rtl:ml-4"
                src='/hexadash-nextjs/img/icon/014-document.png'
                alt=""
                width="20" 
                height="20"
              />
              <figcaption>
                <Heading className="mb-0.5 -mt-1 text-[15px] font-medium" as="h5">
                  All Features
                </Heading>
                <p className="mb-0">Introducing Increment subscriptions </p>
              </figcaption>
            </figure>
          </Col>
          <Col sm={12} xs={24}>
            <figure className="flex items-start px-4 py-5 mb-0 setting-dropdown__single hover:shadow-action">
              <Image
                className="h-fit ltr:mr-4 rtl:ml-4"
                src='/hexadash-nextjs/img/icon/015-color-palette.png'
                alt=""
                width="20" 
                height="20"
              />
              <figcaption>
                <Heading className="mb-0.5 -mt-1 text-[15px] font-medium" as="h5">
                  Themes
                </Heading>
                <p className="mb-0">Third party themes that are compatible </p>
              </figcaption>
            </figure>
          </Col>
          <Col sm={12} xs={24}>
            <figure className="flex items-start px-4 py-5 mb-0 setting-dropdown__single hover:shadow-action">
              <Image className="h-fit ltr:mr-4 rtl:ml-4" src='/hexadash-nextjs/img/icon/010-home.png' alt="" width="20" height="20" />
              <figcaption>
                <Heading className="mb-0.5 -mt-1 text-[15px] font-medium" as="h5">
                  Payments
                </Heading>
                <p className="mb-0">We handle billions of dollars </p>
              </figcaption>
            </figure>
          </Col>
          <Col sm={12} xs={24}>
            <figure className="flex items-start px-4 py-5 mb-0 setting-dropdown__single hover:shadow-action">
              <Image
                className="h-fit ltr:mr-4 rtl:ml-4"
                src='/hexadash-nextjs/img/icon/017-video-camera.png'
                alt=""
                width="20" 
                height="20"
              />
              <figcaption>
                <Heading className="mb-0.5 -mt-1 text-[15px] font-medium" as="h5">
                  Design Mockups
                </Heading>
                <p className="mb-0">Share planning visuals with clients </p>
              </figcaption>
            </figure>
          </Col>
          <Col sm={12} xs={24}>
            <figure className="flex items-start px-4 py-5 mb-0 setting-dropdown__single hover:shadow-action">
              <Image
                className="h-fit ltr:mr-4 rtl:ml-4"
                src='/hexadash-nextjs/img/icon/013-document-1.png'
                alt=""
                width="20" 
                height="20"
              />
              <figcaption>
                <Heading className="mb-0.5 -mt-1 text-[15px] font-medium" as="h5">
                  Content Planner
                </Heading>
                <p className="mb-0">Centralize content gathering and editing</p>
              </figcaption>
            </figure>
          </Col>
          <Col sm={12} xs={24}>
            <figure className="flex items-start px-4 py-5 mb-0 setting-dropdown__single hover:shadow-action">
              <Image
                className="h-fit ltr:mr-4 rtl:ml-4"
                src='/hexadash-nextjs/img/icon/007-microphone-1.png'
                alt=""
                width="20" 
                height="20"
              />
              <figcaption>
                <Heading className="mb-0.5 -mt-1 text-[15px] font-medium" as="h5">
                  Diagram Maker
                </Heading>
                <p className="mb-0">Plan user flows & test scenarios</p>
              </figcaption>
            </figure>
          </Col>
        </Row>
      </div>
    </>
  );

  return (
    <div className="flex hexadash-nav-actions__settings">
      <PopOver placement="bottomRight" content={content} action="click">
        <Link href="#" className="flex hexadash-nav-action-link">
          <ReactSVG
            className="text-[#a0a0a0] dark:text-white/60"
            src='/hexadash-nextjs/img/icon/setting.svg'
          />
        </Link>
      </PopOver>
    </div>
  );
});

export default Settings;
