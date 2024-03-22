import { Row, Col } from 'antd';
import { PageHeaders } from '@/components/page-headers';
import BlogCard from '@/components/cards/BlogCard';

import cardData from '@/demoData/sampleCards.json';

const { BlogCardData } = cardData;

function BlogOne() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Blog One',
    },
  ];
  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Blog One"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-[30px] xl:px-[15px] pb-[25px]">
        <Row gutter={25} className="mt-sm-10">
          {BlogCardData.slice(0, 9).map((blog) => {
            return (
              <Col key={blog.id} xl={8} sm={12} xs={24} className="mb-[25px]">
                <BlogCard item={blog} />
              </Col>
            );
          })}
        </Row>
      </main>
    </>
  );
}

export default BlogOne;
