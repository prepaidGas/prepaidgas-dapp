import { Rate } from 'antd';
import Link from 'next/link';
import {
  UilShoppingBag,
  UilHeart
} from '@iconscout/react-unicons';
import { ReactSVG } from 'react-svg';
import { useDispatch } from 'react-redux';
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
    popular: boolean;
    img: string;
  }
}

function ProductCards({ product }:Item) {
  const { id, name, rate, price, oldPrice, popular, img } = product;
  const dispatch = useDispatch();

  return (
    <div className="relative bg-white dark:bg-white/10 mb-[30px] rounded-[10px] shadow-[0_5px_20px_rgba(173,181,217,0,1)]">
      <figure className="mb-0 ">
        <img className="w-full rounded-t-[10px]" src={`/hexadash-nextjs/${img}`} alt={`img${id}`} />
      </figure>
      <figcaption className="pt-5 px-5 pb-[26px]">
        <Link
          // @ts-ignore
          onClick={() => dispatch(updateWishList(id))}
          className={` inline-flex items-center justify-center absolute ltr:right-5 rtl:left-5 top-[15px] bg-white dark:bg-[#1b1d2a] w-[34px] h-[34px] rounded-full shadow-[0_5px_10px_rgba(160,160,260,0.13)] ${
            popular ? 'text-danger' : 'text-body dark:text-white/[.87]'
          } `}
          href="#"
        >
          {popular ? (
            <ReactSVG src={`/hexadash-nextjs/img/icon/heart-fill.svg`} className="[&>div>svg]:w-[14px] [&>div>svg]:h-[14px]" />
          ) : (
            <UilHeart className="w-[14px] h-[14px]" />
          )}
        </Link>
        <Heading className="mb-1 text-lg font-semibold" as="h5">
          <Link
            href={`/admin/ecommerce/products/${id}`}
            className="text-dark hover:text-primary dark:text-white/[.87] hover:dark:text-primary"
          >
            {name}
          </Link>
        </Heading>
        <div className="flex items-center gap-[5px] mb-3 text-xs font-medium text-dark dark:text-white/[.87]">
          <Rate
            className="relative -top-[2px] flex items-center ltr:[&>li]:mr-0.5 rtl:[&>li]:ml-0.5 [&>.ant-rate-star>div>div>span>svg]:w-[14px] [&>.ant-rate-star>div>div>span>svg]:h-[14px] [&>.ant-rate-star-full>div>div>span>svg]:text-warning  [&>.ant-rate-star-half>div>.ant-rate-star-first>span>svg]:text-warning [&>.ant-rate-star-half>div>.ant-rate-star-second>span>svg]:text-[#c6d0dc] [&>.ant-rate-star-zero>div>div>span>svg]:text-[#c6d0dc]"
            allowHalf
            defaultValue={rate}
            disabled
          />{' '}
          4.9
          <span className="ltr:ml-1.5 rtl:mr-1.5 text-light dark:text-white/60 font-normal"> 778 Reviews</span>
        </div>
        <p className="flex items-center mb-[5px]">
          <span className="font-semibold text-primary">${price} </span>
          {oldPrice && (
            <>
              <del className="mx-[5px] text-light dark:text-white/60 text-sm"> ${oldPrice} </del>
              <span className="text-xs font-medium text-link"> 60% Off</span>
            </>
          )}
        </p>
        <div className="flex items-center flex-wrap mt-5 -mx-[5px] -mb-[5px]">
          <Buttons
            size="small"
            className="flex items-center h-[36px] m-[5px] px-5  text-body dark:text-white/60 hover:text-primary text-xs font-semibold border-normal hover:border-primary dark:border-white/10 hover:dark:border-primary dark:bg-transparent dark:hover:text-primary"
            outlined
          >
            <UilShoppingBag className="w-[14px] h-[14px] ltr:mr-1.5 rtl:ml-1.5" />
            Add To Cart
          </Buttons>
          <Buttons
            size="small"
            type="primary"
            className="flex items-center h-[36px] m-[5px] px-5 bg-primary text-white dark:text-white/[.87] text-xs font-semibold border-primary"
          >
            Buy Now
          </Buttons>
        </div>
      </figcaption>
    </div>
  );
}


export default ProductCards;
