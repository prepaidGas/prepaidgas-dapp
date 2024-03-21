import Link from 'next/link';
import { ArrowRightOutlined } from '@ant-design/icons';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Buttons } from '@/components/buttons';
import articles from '@/demoData/article.json';


function PopularArticle () {

  const path = '/admin/pages/knowledgeBase';

  return (
    <>
      <div className="pt-16 border-t border-normal dark:border-white/10">
        <h2 className="mb-[30px] text-dark dark:text-white/[.87] text-2xl font-semibold">Popular articles</h2>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 767: 2, 900: 3 }}>
          <Masonry className="" gutter="15px">
            {articles.map((article, i) => (
              <div
                className={`bg-${article.type} group mb-4 px-[34px] sm:px-[25px] pt-7 pb-[30px] rounded-10 theme-${article.type}`}
                key={i}
              >
                <h4 className="mb-4 font-normal text-white text-[15px] dark:text-white/[.87] opacity-60 group-hover:opacity-100">
                  {article.title}
                </h4>
                <p className="mb-6 font-semibold text-white dark:text-white/[.87] text-[22px] sm:text-lg opacity-90 group-hover:opacity-100">
                  {article.text}
                </p>
                <Link
                  className="inline-flex items-center font-medium text-white dark:text-white/[.87] text-[15px] opacity-90 group-hover:opacity-100"
                  href={`${path}/single`}
                >
                  Read more
                  <ArrowRightOutlined className="ltr:ml-[10px] rtl:mr-[10px]" />
                </Link>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      <div className="pt-4 text-center">
        <h2 className="mb-3 font-semibold text-dark dark:text-white/[.87] text-[22px]">
          Still no luck? We can help!
        </h2>
        <p className="mb-[30px] text-body dark:text-white/60 text-[15px] font-normal">
          Contact us and we’ll get back to you as soon as possible.
        </p>
        <Buttons className="bg-primary text-white mx-auto px-8 h-[50px] text-sm font-medium" type="primary" size="large">
          Submit a Request
        </Buttons>
      </div>
    </>
  );
}

export default PopularArticle;
