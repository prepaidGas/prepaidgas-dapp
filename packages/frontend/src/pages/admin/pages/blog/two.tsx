import { Row, Col } from 'antd';
import BlogCard from '@/components/cards/BlogCard';
import cardData from '@/demoData/sampleCards.json';
import { PageHeaders } from '@/components/page-headers';

const { BlogCardData } = cardData;

function BlogTwo() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Blog Two',
    },
  ];
  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Blog Two"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-[30px] xl:px-[15px] pb-[25px]">
        <Row gutter={25} className="mt-sm-10">
          {BlogCardData.slice(10, 22).map((blog) => {
            return (
              <Col key={blog.id} xxl={6} xl={8} sm={12} xs={24} className="mb-[25px]">
                <BlogCard item={blog} theme="style-2" />
              </Col>
            );
          })}
        </Row>
      </main>
    </>
  );
}

export default BlogTwo;
