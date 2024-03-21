import { useState } from 'react';
import Link from 'next/link';
import {
  UilAngleUp,
  UilAngleDown,
} from '@iconscout/react-unicons';

function SideNav() {
  const [open, setOpen] = useState('menu1');
  const [subMenuItem, setSubMenuItem] = useState('one');

  return (
    <ul className="pt-[18px] px-5 pb-9">
      <li className="mb-4">
        <Link
          href="#"
          onClick={() => setOpen('menu1')}
          className="flex items-start text-base font-medium text-dark dark:text-white/[.87]"
        >
          {open === 'menu1' ? (
            <UilAngleDown className="min-w-[24px] min-h-[24px] ltr:mr-2 rtl:ml-2" />
          ) : (
            <UilAngleUp className="min-w-[24px] min-h-[24px] ltr:mr-2 rtl:ml-2" />
          )}
          <span>Introduction to Plugin</span>
        </Link>
        <ul
          className={`relative after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:bg-[#eaebef] dark:after:bg-white/10
          ${open === 'menu1' ? 'relative h-auto mt-2.5 ltr:ml-6 rtl:mr-6 visible' : 'h-0 m-0 hidden'}`}
        >
          <li className="mb-0">
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('one');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'one' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Switch between accounts
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('two');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'two' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Installing vendor marketplace lorem vendor marketplace
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('three');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'three' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Stop getting emails from lorem
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('four');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'four' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Threads to organize discussions
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('five');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'five' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Understand your actions in lorem
            </Link>
          </li>
        </ul>
      </li>
      <li className="mb-4">
        <Link
          href="#"
          onClick={() => setOpen('menu2')}
          className="flex items-start text-base font-medium text-dark dark:text-white/[.87]"
        >
          {open === 'menu2' ? (
            <UilAngleDown className="min-w-[24px] min-h-[24px] ltr:mr-2 rtl:ml-2" />
          ) : (
            <UilAngleUp className="min-w-[24px] min-h-[24px] ltr:mr-2 rtl:ml-2" />
          )}
          <span>Productivity tools for your Plugin admin & change password</span>
        </Link>
        <ul
          className={`relative after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:bg-[#eaebef] dark:after:bg-white/10
          ${open === 'menu2' ? 'relative h-auto mt-2.5 ltr:ml-6 rtl:mr-6 visible' : 'h-0 m-0 hidden'}`}
        >
          <li className="mb-0">
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('one');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'one' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Switch between accounts
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('two');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'two' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Installing vendor marketplace lorem vendor marketplace
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('three');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'three' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Stop getting emails from lorem
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('four');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'four' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Threads to organize discussions
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('five');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'five' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Understand your actions in lorem
            </Link>
          </li>
        </ul>
      </li>
      <li className="mb-4">
        <Link
          href="#"
          onClick={() => setOpen('menu3')}
          className="flex items-start text-base font-medium text-dark dark:text-white/[.87]"
        >
          {open === 'menu3' ? (
            <UilAngleDown className="min-w-[24px] min-h-[24px] ltr:mr-2 rtl:ml-2" />
          ) : (
            <UilAngleUp className="min-w-[24px] min-h-[24px] ltr:mr-2 rtl:ml-2" />
          )}
          <span className="menu-text">Download, install, and upgrade</span>
        </Link>
        <ul
          className={`relative after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:bg-[#eaebef] dark:after:bg-white/10
          ${open === 'menu3' ? 'relative h-auto mt-2.5 ltr:ml-6 rtl:mr-6 visible' : 'h-0 m-0 hidden'}`}
        >
          <li className="mb-0">
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('one');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'one' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Switch between accounts
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('two');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'two' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Installing vendor marketplace lorem vendor marketplace
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('three');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'three' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Stop getting emails from lorem
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('four');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'four' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Threads to organize discussions
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('five');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'five' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Understand your actions in lorem
            </Link>
          </li>
        </ul>
      </li>
      <li className="mb-4">
        <Link
          href="#"
          onClick={() => setOpen('menu4')}
          className="flex items-start text-base font-medium text-dark dark:text-white/[.87]"
        >
          {open === 'menu4' ? (
            <UilAngleDown className="min-w-[24px] min-h-[24px] ltr:mr-2 rtl:ml-2" />
          ) : (
            <UilAngleUp className="min-w-[24px] min-h-[24px] ltr:mr-2 rtl:ml-2" />
          )}
          <span className="menu-text">Explore plans & features</span>
        </Link>
        <ul
          className={`relative after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:bg-[#eaebef] dark:after:bg-white/10
          ${open === 'menu4' ? 'relative h-auto mt-2.5 ltr:ml-6 rtl:mr-6 visible' : 'h-0 m-0 hidden'}`}
        >
          <li className="mb-0">
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('one');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'one' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Switch between accounts
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('two');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'two' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Installing vendor marketplace lorem vendor marketplace
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('three');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'three' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Stop getting emails from lorem
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('four');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'four' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Threads to organize discussions
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('five');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'five' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Understand your actions in lorem
            </Link>
          </li>
        </ul>
      </li>
      <li className="mb-4">
        <Link
          href="#"
          onClick={() => setOpen('menu5')}
          className="flex items-start text-base font-medium text-dark dark:text-white/[.87]"
        >
          {open === 'menu5' ? (
            <UilAngleDown className="min-w-[24px] min-h-[24px] ltr:mr-2 rtl:ml-2" />
          ) : (
            <UilAngleUp className="min-w-[24px] min-h-[24px] ltr:mr-2 rtl:ml-2" />
          )}
          <span className="menu-text">Explore plans & features</span>
        </Link>
        <ul
          className={`relative after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:bg-[#eaebef] dark:after:bg-white/10
          ${open === 'menu5' ? 'relative h-auto mt-2.5 ltr:ml-6 rtl:mr-6 visible' : 'h-0 m-0 hidden'}`}
        >
          <li className="mb-0">
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('one');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'one' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Switch between accounts
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('two');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'two' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Installing vendor marketplace lorem vendor marketplace
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('three');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'three' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Stop getting emails from lorem
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('four');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'four' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Threads to organize discussions
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('five');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'five' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Understand your actions in lorem
            </Link>
          </li>
        </ul>
      </li>
      <li className="mb-4">
        <Link
          href="#"
          onClick={() => setOpen('menu6')}
          className="flex items-start text-base font-medium text-dark dark:text-white/[.87]"
        >
          {open === 'menu6' ? (
            <UilAngleDown className="min-w-[24px] min-h-[24px] ltr:mr-2 rtl:ml-2" />
          ) : (
            <UilAngleUp className="min-w-[24px] min-h-[24px] ltr:mr-2 rtl:ml-2" />
          )}
          <span className="menu-text">Profile Settings</span>
        </Link>
        <ul
          className={`relative after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:bg-[#eaebef] dark:after:bg-white/10
          ${open === 'menu6' ? 'relative h-auto mt-2.5 ltr:ml-6 rtl:mr-6 visible' : 'h-0 m-0 hidden'}`}
        >
          <li className="mb-0">
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('one');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'one' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Switch between accounts
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('two');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'two' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Installing vendor marketplace lorem vendor marketplace
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('three');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'three' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Stop getting emails from lorem
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('four');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'four' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Threads to organize discussions
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('five');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'five' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Understand your actions in lorem
            </Link>
          </li>
        </ul>
      </li>
      <li className="mb-4">
        <Link
          href="#"
          onClick={() => setOpen('menu7')}
          className="flex items-start text-base font-medium text-dark dark:text-white/[.87]"
        >
          {open === 'menu7' ? (
            <UilAngleDown className="min-w-[24px] min-h-[24px] ltr:mr-2 rtl:ml-2" />
          ) : (
            <UilAngleUp className="min-w-[24px] min-h-[24px] ltr:mr-2 rtl:ml-2" />
          )}
          <span className="menu-text">Listings Management</span>
        </Link>
        <ul
          className={`relative after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:bg-[#eaebef] dark:after:bg-white/10
          ${open === 'menu7' ? 'relative h-auto mt-2.5 ltr:ml-6 rtl:mr-6 visible' : 'h-0 m-0 hidden'}`}
        >
          <li className="mb-0">
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('one');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'one' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Switch between accounts
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('two');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'two' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Installing vendor marketplace lorem vendor marketplace
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('three');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'three' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Stop getting emails from lorem
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('four');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'four' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Threads to organize discussions
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('five');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'five' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Understand your actions in lorem
            </Link>
          </li>
        </ul>
      </li>
      <li>
        <Link
          href="#"
          onClick={() => setOpen('menu8')}
          className="flex items-start text-base font-medium text-dark dark:text-white/[.87]"
        >
          {open === 'menu8' ? (
            <UilAngleDown className="min-w-[24px] min-h-[24px] ltr:mr-2 rtl:ml-2" />
          ) : (
            <UilAngleUp className="min-w-[24px] min-h-[24px] ltr:mr-2 rtl:ml-2" />
          )}
          <span className="menu-text">Miscellaneous</span>
        </Link>
        <ul
          className={`relative after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:bg-[#eaebef] dark:after:bg-white/10
          ${open === 'menu8' ? 'relative h-auto mt-2.5 ltr:ml-6 rtl:mr-6 visible' : 'h-0 m-0 hidden'}`}
        >
          <li className="mb-0">
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('one');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'one' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Switch between accounts
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('two');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'two' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Installing vendor marketplace lorem vendor marketplace
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('three');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'three' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Stop getting emails from lorem
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('four');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'four' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Threads to organize discussions
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={() => {
                setSubMenuItem('five');
              }}
              className={`relative flex py-1.5 ltr:pl-[22px] rtl:pr-[22px] text-body dark:text-white/60 hover:text-primary text-15 font-normal after:absolute ltr:after:left-0 rtl:after:right-0 after:top-0 after:w-0.5 after:h-full after:z-10
              ${subMenuItem === 'five' ? 'after:bg-primary' : 'after:bg-transparent'}`}
            >
              Understand your actions in lorem
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default SideNav;
