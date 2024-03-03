/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import Image from 'next/image';
import {
  UilPen,
  UilTimes,
} from '@iconscout/react-unicons';
import FontAwesome from 'react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { changeMenuMode, changeDirectionMode, changeLayoutMode } from '@/redux/themeLayout/actionCreator';
import { Button } from 'antd';

const Customizer = (props:any) => {
  const { t } = useTranslation();
  const [state, setState] = useState({
    customizerAction: false,
  });

  const { customizerAction } = state;

  // open Customizer Function
  const showCustomizer = () => {
    setState({
      customizerAction: !customizerAction,
    });
  };

  interface RootState {
    ChangeLayoutMode: {
      rtlData: boolean,
      mode: string,
      topMenu: boolean,
      menuCollapse: boolean,
    }
  }

  const { rtl, layoutMode, topMenu } = useSelector((state:RootState) => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
      layoutMode: state.ChangeLayoutMode.mode,
      topMenu: state.ChangeLayoutMode.topMenu,
    };
  });

  const dispatch = useDispatch();

  const darkmodeActivated = () => {
    document.body.classList.add('dark');
    document.body.classList.add('dark');
  };

  const darkmodeDeactivated = () => {
    document.body.classList.remove('dark');
    document.body.classList.remove('dark');
  };

  const changeLayout = (mode:string) => {
    // @ts-ignore
    dispatch(changeLayoutMode(mode));
  };

  const changeNavbar = (topMode:boolean) => {
    const html:HTMLElement | null = document.querySelector('html');
    if (topMode) {
      if (html) {
        html.classList.add('hexadash-topmenu');
      }
    } else {
      if (html) {
        html.classList.remove('hexadash-topmenu');
      }
    }

    // @ts-ignore
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
      if (html) {
        html.setAttribute('dir', 'ltr');
      }
    }
    // @ts-ignore
    dispatch(changeDirectionMode(rtlMode));
  };

  // changeLayoutDirection(rtl);

  return (
    <>
      <Button
        className="inline-flex items-center bg-normalBG hover:bg-primary/10 hover:text-primary dark:bg-[#282b37] dark:text-white/60 min-h-[34px] sm:w-[34px] sm:justify-center px-4 sm:px-0 sm:mx-[10px] xl:mx-[12px] mx-[20px] rounded-2xl gap-[8px] dark:hover:bg-white/60 group dark:hover:text-dark border-transparent shadow-none outline-none transition duration-300"
        onClick={() => {
          showCustomizer();
        }}
      >
        <UilPen className="w-3.5 h-3.5 sm:mr-0 text-body group-hover:text-primary dark:text-white/60 dark:group-hover:text-currentColor" />
        <span className="text-sm font-medium text-body group-hover:text-primary dark:text-white/60 dark:group-hover:text-currentColor sm:hidden">
          {t('Customize')}...
        </span>
      </Button>
      <div
        className={`fixed top-0 ltr:right-0 rtl:left-0 bg-white dark:bg-[#323541] w-[350px] sm:w-[300px] h-full translate-x-0 shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] z-998 overflow-y-auto transition-all ${
          customizerAction
            ? 'ltr:translate-x-[0] rtl:translate-x-[-0]'
            : 'ltr:translate-x-[350px] rtl:translate-x-[-350px]'
        }`}
      >
        <div className="h-full">
          <div className="relative px-6 pb-4 pt-9">
            <h4 className="mb-0.5 text-dark dark:text-white/[.87] text-base capitalize font-semibold">{t('Customizer')}</h4>
            <span className="dark:text-white/60">
              {t('Customize')} {t('your')} {t('overview')} {t('page')} {t('layout')}
            </span>
            <Button
              className="absolute border-none shadow-none top-7 ltr:right-4 rtl:left-4"
              onClick={() => {
                showCustomizer();
              }}
            >
              <UilTimes className="text-danger" />
            </Button>
          </div>
          <div className="px-6 pb-6">
            <div className="mb-12">
              <h4 className="mb-8 text-base capitalize font-semibold text-dark dark:text-white/[.87]">
                {t('layouts')} {t('type')}
              </h4>
              <ul className="flex gap-[15px]">
                <li className="relative ">
                  <Button
                    onClick={() => {
                      showCustomizer();
                      changeLayoutDirection(false);
                    }}
                    className='p-0 border-none shadow-none'
                  >
                    <Image src='/hexadash-nextjs/img/ltr.png' alt="" width="141" height="87" />
                    <FontAwesome
                      className={!rtl ? 'block absolute top-4 end-4 text-success' : 'hidden'}
                      name="check-circle"
                    />
                  </Button>
                </li>
                <li className="relative">
                  <Button
                    onClick={() => {
                      showCustomizer();
                      changeLayoutDirection(true);
                    }}
                    className='p-0 border-none shadow-none'
                  >
                    <Image src='/hexadash-nextjs/img/rtl.png' alt="" width="141" height="87" />
                    <FontAwesome
                      className={rtl ? 'block absolute top-4 end-4 text-success' : 'hidden'}
                      name="check-circle"
                    />
                  </Button> 
                </li>
              </ul>
            </div>
            <div className="mb-12">
              <h4 className="mb-8 text-base capitalize font-semibold text-dark dark:text-white/[.87]">
                {t('sidebar')} {t('type')}
              </h4>
              <ul className="flex gap-[15px]">
                <li className="relative">
                  <Button
                    onClick={() => {
                      showCustomizer();
                      darkmodeDeactivated();
                      changeLayout('lightMode');
                    }}
                    className='p-0 border-none shadow-none'
                  >
                    <Image src='/hexadash-nextjs/img/light.png' alt="" width="141" height="87" />
                    <FontAwesome
                      className={layoutMode === 'lightMode' ? 'block absolute top-4 end-4 text-success' : 'hidden'}
                      name="check-circle"
                    />
                  </Button>
                </li>
                <li className="relative">
                  <Button
                    onClick={() => {
                      showCustomizer();
                      darkmodeActivated();
                      changeLayout('darkMode');
                    }}
                    className='p-0 border-none shadow-none'
                  >
                    <Image src='/hexadash-nextjs/img/dark.png' alt="" width="141" height="87" />
                    <FontAwesome
                      className={layoutMode === 'darkMode' ? 'block absolute top-4 end-4 text-success' : 'hidden'}
                      name="check-circle"
                    />
                  </Button>
                </li>
              </ul>
            </div>
            <div className="mb-12">
              <h4 className="mb-8 text-base capitalize font-semibold text-dark dark:text-white/[.87]">
                {t('navbar')} {t('type')}
              </h4>
              <ul className="flex gap-[15px]">
                <li className="relative">
                  <Button
                    onClick={() => {
                      showCustomizer();
                      changeNavbar(false);
                    }}
                    className='p-0 border-none shadow-none'
                  >
                    <Image src='/hexadash-nextjs/img/side.png' alt="" width="141" height="87" />
                    <FontAwesome
                      className={!topMenu ? 'block absolute top-4 end-4 text-success' : 'hidden'}
                      name="check-circle"
                    />
                  </Button>
                </li>
                <li className="relative">
                  <Button
                    onClick={() => {
                      showCustomizer();
                      changeNavbar(true);
                    }}
                    className='p-0 border-none shadow-none'
                  >
                    <Image src='/hexadash-nextjs/img/top.png' alt="" width="141" height="87" />
                    <FontAwesome
                      className={topMenu ? 'block absolute top-4 end-4 text-success' : 'hidden'}
                      name="check-circle"
                    />
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customizer;
