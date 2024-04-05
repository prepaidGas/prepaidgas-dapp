import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  UilFile,
  UilHeart
} from '@iconscout/react-unicons';

interface BlogCardProps {
  item: {
    id: number;
    title: string;
    content: string;
    category: string;
    img: string;
    slug: string;
  }
  actions?: React.ReactNode;
}

function BlogCard(item:BlogCardProps, theme:string) {
  const { slug, content, title, img } = item.item;

  const path = '/admin/pages/blog';

  return (
    <figure className="group p-6 mb-0 bg-white dark:bg-white/10 rounded-10 shadow-regular dark:shadow-none">
      <div className="relative after:absolute after:h-0 after:w-full ltr:after:left-0 rtl:after:right-0 after:top-0 after:bg-[#0a0a0a15] after:rounded-10 after:transition-all after:duration-300 group-hover:after:h-full">
        <Image 
          className="w-full max-h-[217px] rounded-10" 
          src={`/hexadash-nextjs/img/blogs/${img}`} 
          alt="hexadash Blog" 
          width="455"
          height="217"
        />
      </div>
      <figcaption>
        {theme === 'style-1' ? (
          <div className="flex justify-between items-center mt-2.5">
            <span className="inline-block text-light dark:text-white/60 text-15">01 July 2020</span>
          </div>
        ) : theme === 'style-2' ? (
          <div className="flex justify-between items-center mt-2.5">
            <span className="inline-block text-light dark:text-white/60 text-15">Web Development</span>
            <span className="inline-block text-light dark:text-white/60 text-15">01 July 2020</span>
          </div>
        ) : theme === 'style-3' ? (
          <div className="flex justify-between items-center mt-2.5">
            <span className="inline-block m-1 text-light dark:text-white/60 text-15">01 July 2020</span>
            <span className="relative inline-block m-1 ltr:pl-2.5 rtl:pr-2.5 text-light dark:text-white/60 text-15 before:absolute before:h-1 before:w-1 ltr:before:left-0 rtl:before:right-0 before:top-1/2 before:-translate-y-1/2 before:bg-light before:rounded-full">
              Web Development
            </span>
            <span className="relative inline-block m-1 ltr:pl-2.5 rtl:pr-2.5 text-light dark:text-white/60 text-15 before:absolute before:h-1 before:w-1 ltr:before:left-0 rtl:before:right-0 before:top-1/2 before:-translate-y-1/2 before:bg-light dark:before:bg-white/10 before:rounded-full">
              6 mins read
            </span>
          </div>
        ) : (
          ''
        )}
        <h2 className="mt-4 mb-3 text-xl font-semibold">
          <Link href={`${path}/${slug}`} className="text-dark hover:text-primary dark:text-white/[.87] dark:hover:text-primary">
            {title}
          </Link>
        </h2>
        <p className="mb-4 text-base text-dark dark:text-white/[.87]">{content}</p>
        <div className="flex justify-between">
          <div className="flex items-center gap-x-4">
            <Image 
              className="rounded-full max-w-[32px]" 
              src='/hexadash-nextjs/img/chat-author/t1.jpg' 
              alt=""
              width="32"
              height="32"
            />
            <span className="text-light dark:text-white/60 text-15">Burns Marks</span>
          </div>
          <ul className="flex items-center -m-2">
            <li className="m-2">
              <span className="flex items-center leading-none gap-x-1 text-light dark:text-white/60 text-13">
                <UilHeart className="w-3 h-3 text-light dark:text-white/60" />
                <span className="flex items-center leading-none text-light dark:text-white/60 text-13">70</span>
              </span>
            </li>
            <li className="m-2">
              <span className="flex items-center leading-none gap-x-1 text-light dark:text-white/60 text-13">
                <UilFile className="w-3 h-3 text-light dark:text-white/60" />
                <span className="flex items-center leading-none text-light dark:text-white/60 text-13">120</span>
              </span>
            </li>
          </ul>
        </div>
      </figcaption>
    </figure>
  );
}

BlogCard.defaultProps = {
  item: {
    id: 1,
    title: 'Technology Change the World',
    content: 'Lorem Ipsum is simply dummy text of the printer took a galley of type and scrambled',
    category: 'Web Development',
    img: '1.png',
    author: 'Machel Bold',
    authorImg: '1.png',
    postDate: '15 March 2021',
    favouriteBy: '15k',
    viewedBy: '20k',
  },
  theme: 'style-1',
};

export default BlogCard;
