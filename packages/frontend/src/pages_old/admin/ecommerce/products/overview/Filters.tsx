import React, { useState } from 'react';
import Link from 'next/link';
import { Rate } from 'antd';
import { useDispatch } from 'react-redux';
import { UilSlidersV } from '@iconscout/react-unicons';
import Heading from '@/components/heading';
import { Sliders } from '@/components/slider';
import { CheckboxGroup } from '@/components/checkbox';
import {
  filterByPriceRange,
  filterByRating,
  filterByBrand,
  filterByCategory,
} from '@/redux/product/actionCreator';

const Filters = React.memo(() => {
  const [state, setState] = useState({
    min: 0,
    max: 1500,
  });
  const dispatch = useDispatch();

  const { min, max } = state;
  const onChange = (value:any) => {
    setState({
      ...state,
      min: value[0],
      max: value[1],
    });
    // @ts-ignore
    dispatch(filterByPriceRange(value));
  };
  const onChangeRating = (checkValue:any) => {
    // @ts-ignore
    dispatch(filterByRating([checkValue]));
  };
  const onChangeBrand = (checkValue:any) => {
    // @ts-ignore
    dispatch(filterByBrand([checkValue]));
  };
  const options = [
    {
      label: (
        <div className="inline-flex items-center justify-between w-full text-body dark:text-white/60">
          <span className="flex items-center rating-left">
            <Rate 
             className="inline-flex me-2.5 [&>.ant-rate-star>div>div]:flex [&>.ant-rate-star>div>div>span>svg]:w-[13px] [&>.ant-rate-star>div>div>span>svg]:h-[13px] [&>.ant-rate-star-full>div>div>span>svg]:text-warning [&>.ant-rate-star-zero>div>div>span>svg]:text-[#c6d0dc] [&>li]:!me-[3px]"
              allowHalf 
              defaultValue={5} 
              disabled 
            />
          </span>
          <span className="justify-end text-xs text-light dark:text-white/60">25</span>
        </div>
      ),
      value: 5,
    },
    {
      label: (
        <>
          <span className="flex items-center rating-left">
            <Rate 
             className="inline-flex me-2.5 [&>.ant-rate-star>div>div]:flex [&>.ant-rate-star>div>div>span>svg]:w-[13px] [&>.ant-rate-star>div>div>span>svg]:h-[13px] [&>.ant-rate-star-full>div>div>span>svg]:text-warning [&>.ant-rate-star-zero>div>div>span>svg]:text-[#c6d0dc] [&>li]:!me-[3px]"
              allowHalf 
              defaultValue={4} 
              disabled 
            />
            and up
          </span>
          <span className="justify-end text-xs text-light dark:text-white/60">25</span>
        </>
      ),
      value: 4,
    },
    {
      label: (
        <>
          <span className="flex items-center rating-left">
            <Rate 
             className="inline-flex me-2.5 [&>.ant-rate-star>div>div]:flex [&>.ant-rate-star>div>div>span>svg]:w-[13px] [&>.ant-rate-star>div>div>span>svg]:h-[13px] [&>.ant-rate-star-full>div>div>span>svg]:text-warning [&>.ant-rate-star-zero>div>div>span>svg]:text-[#c6d0dc] [&>li]:!me-[3px]"
              allowHalf 
              defaultValue={3} 
              disabled 
            />
            and up
          </span>
          <span className="justify-end text-xs text-light dark:text-white/60">25</span>
        </>
      ),
      value: 3,
    },
    {
      label: (
        <>
          <span className="flex items-center rating-left">
            <Rate 
             className="inline-flex me-2.5 [&>.ant-rate-star>div>div]:flex [&>.ant-rate-star>div>div>span>svg]:w-[13px] [&>.ant-rate-star>div>div>span>svg]:h-[13px] [&>.ant-rate-star-full>div>div>span>svg]:text-warning [&>.ant-rate-star-zero>div>div>span>svg]:text-[#c6d0dc] [&>li]:!me-[3px]"
              allowHalf 
              defaultValue={2} 
              disabled 
            />
            and up
          </span>
          <span className="justify-end text-xs text-light dark:text-white/60">25</span>
        </>
      ),
      value: 2,
    },
    {
      label: (
        <>
          <span className="flex items-center rating-left">
            <Rate 
             className="inline-flex me-2.5 [&>.ant-rate-star>div>div]:flex [&>.ant-rate-star>div>div>span>svg]:w-[13px] [&>.ant-rate-star>div>div>span>svg]:h-[13px] [&>.ant-rate-star-full>div>div>span>svg]:text-warning [&>.ant-rate-star-zero>div>div>span>svg]:text-[#c6d0dc] [&>li]:!me-[3px]"
              allowHalf 
              defaultValue={1} 
              disabled 
            />
            and up
          </span>
          <span className="justify-end text-xs text-light dark:text-white/60">25</span>
        </>
      ),
      value: 1,
    },
  ];

  const optionsBrand = [
    {
      label: (
        <div className="inline-flex items-center justify-between w-full text-body dark:text-white/60">
          Cup <span className="text-xs text-light dark:text-white/60">25</span>
        </div>
      ),
      value: 'cup',
    },
    {
      label: (
        <div className="inline-flex items-center justify-between w-full text-body dark:text-white/60">
          Plate <span className="text-xs text-light dark:text-white/60">25</span>
        </div>
      ),
      value: 'plate',
    },
    {
      label: (
        <div className="inline-flex items-center justify-between w-full text-body dark:text-white/60">
          Chair <span className="text-xs text-light dark:text-white/60">25</span>
        </div>
      ),
      value: 'chair',
    },
    {
      label: (
        <div className="inline-flex items-center justify-between w-full text-body dark:text-white/60">
          Juice <span className="text-xs text-light dark:text-white/60">25</span>
        </div>
      ),
      value: 'juice',
    },
  ];

  const onChangeCategory = (value:any) => {
    // @ts-ignore
    dispatch(filterByCategory(value));
  };

  return (
    <>
      <div className="bg-white dark:bg-[#1b1e2b] m-0 p-0 mb-[25px] rounded-10 relative">
        <div className="py-[16px] px-[25px] border-regular dark:border-white/10 border-b">
          <Heading as="h4" className="flex items-center mb-0 text-base font-medium text-dark dark:text-white/[.87]">
            <UilSlidersV className="w-4 h-4 ltr:mr-3 rtl:ml-3 text-light" />
            Filters
          </Heading>
        </div>
        <div className="p-[25px]">
          <div className="mb-8">
            <Heading as="h5" className="text-dark dark:text-white/[.87] text-[15px] font-semibold mb-[15px]">
              Price Range
            </Heading>
            <Sliders max={1500} onChange={onChange} range defaultValues={[min, max]} />
            <p className="text-body dark:text-white/60 text-sm font-medium mb-0 mt-[15px]">
              ${min} - ${max}
            </p>
          </div>
          <div className="mb-8">
            <Heading as="h5" className="text-dark dark:text-white/[.87] text-[15px] font-semibold mb-[15px]">
              Category
            </Heading>
            <nav>
              <ul className="mb-0">
                <li className="mb-[10px]">
                  <Link
                    onClick={() => onChangeCategory('all')}
                    href="#"
                    className="inline-flex items-center justify-between w-full group text-body dark:text-white/60 hover:text-primary"
                  >
                    <span>All</span>
                    <span className="text-xs text-light dark:text-white/60 group-hover:text-primary">25</span>
                  </Link>
                </li>
                <li className="mb-[10px]">
                  <Link
                    onClick={() => onChangeCategory('accessories')}
                    href="#"
                    className="inline-flex items-center justify-between w-full group text-body dark:text-white/60 hover:text-primary"
                  >
                    <span>Accessories</span>
                    <span className="text-xs text-light dark:text-white/60 group-hover:text-primary">25</span>
                  </Link>
                </li>
                <li className="mb-[10px]">
                  <Link
                    onClick={() => onChangeCategory('appliance')}
                    href="#"
                    className="inline-flex items-center justify-between w-full group text-body dark:text-white/60 hover:text-primary"
                  >
                    <span>Appliances</span>
                    <span className="text-xs text-light dark:text-white/60 group-hover:text-primary">25</span>
                  </Link>
                </li>
                <li className="mb-[10px]">
                  <Link
                    onClick={() => onChangeCategory('bags')}
                    href="#"
                    className="inline-flex items-center justify-between w-full group text-body dark:text-white/60 hover:text-primary"
                  >
                    <span>Bags</span>
                    <span className="text-xs text-light dark:text-white/60 group-hover:text-primary">25</span>
                  </Link>
                </li>
                <li className="mb-[10px]">
                  <Link
                    onClick={() => onChangeCategory('electronic')}
                    href="#"
                    className="inline-flex items-center justify-between w-full group text-body dark:text-white/60 hover:text-primary"
                  >
                    <span>Electronic</span>
                    <span className="text-xs text-light dark:text-white/60 group-hover:text-primary">25</span>
                  </Link>
                </li>
                <li className="mb-[10px]">
                  <Link
                    onClick={() => onChangeCategory('entertainment')}
                    href="#"
                    className="inline-flex items-center justify-between w-full group text-body dark:text-white/60 hover:text-primary"
                  >
                    <span>Entertainment</span>
                    <span className="text-xs text-light dark:text-white/60 group-hover:text-primary">25</span>
                  </Link>
                </li>
                <li className="mb-[10px]">
                  <Link
                    onClick={() => onChangeCategory('induction')}
                    href="#"
                    className="inline-flex items-center justify-between w-full group text-body dark:text-white/60 hover:text-primary"
                  >
                    <span>Induction</span>
                    <span className="text-xs text-light dark:text-white/60 group-hover:text-primary">25</span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => onChangeCategory('mobile')}
                    href="#"
                    className="inline-flex items-center justify-between w-full group text-body dark:text-white/60 hover:text-primary"
                  >
                    <span>Mobile Phone</span>
                    <span className="text-xs text-light dark:text-white/60 group-hover:text-primary">25</span>
                  </Link>
                </li>
              </ul>
            </nav>
            <Link className="inline-block mt-2 text-primary text-[13px] font-medium" href="#">
              See more
            </Link>
          </div>
          <div className="mb-8">
            <Heading as="h5" className="text-dark dark:text-white/[.87] text-[15px] font-semibold mb-[15px]">
              Brands
            </Heading>
            <CheckboxGroup
              className="checkbox-label-w-full flex flex-col gap-y-[10px] [&>label>span]:flex [&>label>span]:items-center [&>label>span]:justify-between [&>label>span:not(:first-child)]:flex-1 [&>.ant-checkbox-wrapper:hover>.ant-checkbox>.ant-checkbox-inner]:border-primary [&>.ant-checkbox-wrapper-checked>.ant-checkbox>.ant-checkbox-inner]:bg-primary [&>.ant-checkbox-wrapper-checked>.ant-checkbox>.ant-checkbox-inner]:border-primary"
              options={optionsBrand}
              onChange={onChangeBrand}
            />
            <Link className="inline-block mt-2 text-primary text-[13px] font-medium" href="#">
              See more
            </Link>
          </div>
          <div>
            <Heading as="h5" className="text-dark dark:text-white/[.87] text-[15px] font-semibold mb-[15px]">
              Ratings
            </Heading>
            <CheckboxGroup
              className="custom-filter-rating checkbox-label-w-full flex flex-col gap-y-[10px] [&>label>span]:flex [&>label>span]:items-center [&>label>span]:justify-between [&>label>span:not(:first-child)]:flex-1 [&>.ant-checkbox-wrapper>.ant-checkbox]:self-auto [&>.ant-checkbox-wrapper:hover>.ant-checkbox>.ant-checkbox-inner]:border-primary [&>.ant-checkbox-wrapper-checked>.ant-checkbox>.ant-checkbox-inner]:bg-primary [&>.ant-checkbox-wrapper-checked>.ant-checkbox>.ant-checkbox-inner]:border-primary"
              options={options}
              onChange={onChangeRating}
            />
          </div>
        </div>
      </div>
    </>
  );
});

export default Filters;
