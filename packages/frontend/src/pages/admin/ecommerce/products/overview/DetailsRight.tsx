import React, { useState } from 'react';
import Link from 'next/link';
import { Rate } from 'antd';
import {
  UilHeart,
  UilShareAlt,
  UilShoppingBag
} from '@iconscout/react-unicons';
import { ReactSVG } from 'react-svg';
import { useDispatch } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import Heading from '@/components/heading';
import { Buttons } from '@/components/buttons';
import { updateWishList } from '@/redux/product/actionCreator';

interface Item {
  product: {
    id: string;
    name: string;
    rate: number;
    price: number;
    oldPrice: number;
    description: string;
    category: string;
    brand: string;
    popular: boolean;
  }
}

const DetailsRight = React.memo(({ product }:Item) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    quantity: 1,
  });

  const { name, rate, price, oldPrice, description, category, brand, popular, id } = product;
  const { quantity } = state;

  const incrementQuantity = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setState({
      ...state,
      quantity: quantity + 1,
    });
  };

  const decrementQuantity = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (quantity !== 1)
      setState({
        ...state,
        quantity: quantity - 1,
      });
  };

  return (
    <div>
      <Heading
        className="mb-[10px] text-dark dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl font-semibold"
        as="h1"
      >
        {name}
      </Heading>
      <Rate 
        className="relative -top-[2px] ltr:[&>li]:mr-0.5 rtl:[&>li]:ml-0.5 [&>.ant-rate-star>div>div>span>svg]:w-[14px] [&>.ant-rate-star>div>div>span>svg]:h-[14px] [&>.ant-rate-star-full>div>div>span>svg]:text-warning  [&>.ant-rate-star-half>div>.ant-rate-star-first>span>svg]:text-warning [&>.ant-rate-star-half>div>.ant-rate-star-second>span>svg]:text-[#c6d0dc] [&>.ant-rate-star-zero>div>div>span>svg]:text-[#c6d0dc]"
        allowHalf 
        defaultValue={rate} 
        disabled 
      />
      <span className="inline-block ltr:mr-1 ltr:ml-2 rtl:ml-1 rtl:mr-2 text-dark dark:text-white/[.87] text-[15px] font-semibold">
        {rate}
      </span>
      <span className="font-normal text-light dark:text-white/60"> 778 Reviews</span>
      <p>
        <span className="inline-block ltr:mr-1.5 rtl:ml-1.5 mb-2 text-light dark:text-white/60 text-[13px]">
          Brand :
        </span>
        <span className="text-dark dark:text-white/[.87] text-[13px] font-medium">{brand}</span>
      </p>
      <Heading className="text-dark dark:text-white/[.87] mt-[18px] mb-2 text-[22px] font-medium" as="h3">
        <span className="text-sm text-light dark:text-white/60">$</span>
        <span>{price}</span>
      </Heading>
      {oldPrice && (
        <Heading className="text-dark dark:text-white/[.87] mb-[22px] font-semibold inline-flex items-center" as="h6">
          <del className="text-base font-normal text-light dark:text-white/60">${oldPrice}</del>{' '}
          <span className="inline-block text-xs ltr:ml-2 rtl:mr-2 text-primary">30% Off</span>
        </Heading>
      )}
      <p className="max-w-[580px] mb-2 text-body dark:text-white/60 text-[15px]">{description}</p>
      <div className="mt-[25px]">
        <p className="mb-1 text-body dark:text-white/60">
          <span className="mr-[30px] text-dark dark:text-white/[.87] font-medium">Available:</span>
          <span className="font-medium text-success"> In Stock</span>
        </p>
        <p className="mb-1 text-body dark:text-white/60">
          <span className="mr-[30px] text-dark dark:text-white/[.87] font-medium"> Shipping: </span>
          <span className="font-medium text-body dark:text-white/60">Free</span>
        </p>
        <p className="my-[30px] text-body dark:text-white/60">
          <span className="mr-[30px] text-dark dark:text-white/[.87] font-medium">Quantity:</span>

          <Buttons
            className="w-[38px] h-[38px] bg-section dark:bg-white/10 mr-[15px] p-x-3 text-sm text-body dark:text-white/60 font-semibold border-none rounded-[10px] active:border-primary focus-visible:border-primary focus-visible:outline-0"
            onClick={decrementQuantity}
            type="default"
          >
            -
          </Buttons>
          {quantity}
          <Buttons
            className="w-[38px] h-[38px] bg-section dark:bg-white/10 ml-[15px] p-x-3 text-sm text-body dark:text-white/60 font-semibold border-none rounded-[10px] active:border-primary focus-visible:border-primary focus-visible:outline-0"
            onClick={incrementQuantity}
            type="default"
          >
            +
          </Buttons>
          <span className="ml-[15px] text-light dark:text-white/60 text-[13px]">540 pieces available</span>
        </p>
      </div>
      <div className="flex items-center flex-wrap mb-7 pb-[30px] border-b border-regular dark:border-white/10 gap-[10px]">
        <div className="flex flex-wrap items-center gap-[10px]">
          <Buttons
            size="small"
            type="primary"
            className="flex items-center h-[44px] px-[30px] bg-primary text-white dark:text-white/[.87] text-sm font-semibold border-primary rounded-[6px]"
          >
            Buy Now
          </Buttons>
          <Buttons
            size="small"
            type="white"
            className="flex items-center gap-[6px] h-[44px] px-[30px] bg-secondary text-white dark:text-white/[.87] text-sm font-semibold border-secondary rounded-[6px]"
            outlined
          >
            <UilShoppingBag className="w-[14px] h-[14px]" />
            Add To Cart
          </Buttons>

          <Buttons
            // @ts-ignore
            onClick={() => dispatch(updateWishList(parseInt(id, 10)))}
            className={` inline-flex items-center justify-center bg-white dark:bg-white/10 w-[40px] h-[40px] ltr:mr-[10px] rtl:ml-[10px] border-none rounded-full shadow-[0_5px_10px_rgba(160,160,260,0.13)] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] ${
              popular ? 'text-danger' : 'text-body dark:text-white/60'
            } `}
            size="default"
            raised
            type="white"
            shape="circle"
          >
            {popular ? (
              <ReactSVG src={`/hexadash-nextjs/img/icon/heart-fill.svg`} />
            ) : (
              <UilHeart className="w-[14px] h-[14px]" />
            )}
          </Buttons>
          <Buttons
            size="default"
            raised
            type="white"
            shape="circle"
            className="inline-flex items-center justify-center bg-white dark:bg-white/10 text-body dark:text-white/60 w-[40px] h-[40px] ltr:mr-[10px] rtl:ml-[10px] border-none rounded-full shadow-[0_5px_10px_rgba(160,160,260,0.13)] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)]"
          >
            <UilShareAlt className="w-[14px] h-[14px]" />
          </Buttons>
        </div>
        <div className="ltr:ml-[5px] rtl:mr-[5px]">
          <Link href="#" className="ltr:mr-3 rtl:ml-3 group">
            <FontAwesome
              className="text-sm text-[#666] dark:text-white/60 group-hover:text-[#8231d3]"
              name="facebook"
              size="2x"
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
          </Link>
          <Link href="#" className="ltr:mr-3 rtl:ml-3 group">
            <FontAwesome
              className="text-sm text-[#666] dark:text-white/60 group-hover:text-[#8231d3]"
              name="twitter"
              size="2x"
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
          </Link>
          <Link href="#" className="ltr:mr-3 rtl:ml-3 group">
            <FontAwesome
              className="text-sm text-[#666] dark:text-white/60 group-hover:text-[#8231d3]"
              name="pinterest-p"
              size="2x"
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
          </Link>
          <Link href="#" className="ltr:mr-3 rtl:ml-3 group">
            <FontAwesome
              className="text-sm text-[#666] dark:text-white/60 group-hover:text-[#8231d3]"
              name="linkedin"
              size="2x"
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
          </Link>
          <Link href="#" className="ltr:mr-3 rtl:ml-3 group">
            <FontAwesome
              className="text-sm text-[#666] dark:text-white/60 group-hover:text-[#8231d3]"
              name="send"
              size="2x"
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
          </Link>
        </div>
      </div>
      <ul className="mb-[10px]">
        <li>
          <span className="ltr:mr-[30px] rtl:ml-[30px] text-dark dark:text-white/[.87] font-medium min-w-[66px] inline-block">
            Category:
          </span>
          <span className="text-body dark:text-white/60">{category}</span>
        </li>
      </ul>
      <ul className="mb-0">
        <li>
          <span className="ltr:mr-[30px] rtl:ml-[30px] text-dark dark:text-white/[.87] font-medium min-w-[66px] inline-block">
            Tags:
          </span>
          <span className="text-body dark:text-white/60">Blue, Green, Light</span>
        </li>
      </ul>
    </div>
  );
});

export default DetailsRight;
