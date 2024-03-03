import { useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
import { Row, Col, Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeaders } from '@/components/page-headers';

import { filterSinglePage } from '@/redux/product/actionCreator';

const DetailsRight = dynamic(() => import('./overview/DetailsRight'), {
  loading: () => (
    <>
      <Skeleton active />
    </>
  ),
});

interface RootState {
  product: {
    data: any;
  }
  products: {
    data: any;
  }
}

interface ValueState {
  id: number;
  img: string;
  category: string;
}

function ProductDetails() {
  const router = useRouter();
  const { asPath } = router;
  const productID = asPath.split('/')[4];

  const { products, product } = useSelector((state:RootState) => {
    return {
      product: state.product.data,
      products: state.products.data,
    };
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (filterSinglePage) {
      // @ts-ignore
      dispatch(filterSinglePage(parseInt(productID, 10), products));
    }
  }, [dispatch, productID]);

  const { img, category } = product[0];

  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Product Details',
    },
  ];

  return (
    <>
      <PageHeaders
        routes={PageRoutes}
        title="Product Details"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <div className="bg-white dark:bg-white/10 p-[25px] rounded-[10px]">
          <div className="p-[15px] md:px-0">
            <Row gutter={30}>
              <Col xs={24} lg={10} className="lg:mb-5">
                <figure className="mb-0">
                  <img className="w-full rounded-[10px]" src={`/hexadash-nextjs/${img}`} alt="" />
                </figure>
                <div className="mt-[15px] md:mb-[15px]">
                  <div className="gap-[15px] flex items-center flex-wrap">
                    {products.length
                      ? products
                          .filter((value:ValueState) => {
                            return value.category === category;
                          })
                          .map((value:ValueState, index:number) => {
                            return (
                              index <= 3 && (
                                <figure key={index} className="mb-0 flex-[0_0_15%]">
                                  <Link href={`/admin/ecommerce/products/${value.id}`}>
                                    <img
                                      className="w-full min-w-[90px] md:min-w-[60px] rounded-10 md:rounded-4"
                                      src={`/hexadash-nextjs/${value.img}`}
                                      alt=""
                                    />
                                  </Link>
                                </figure>
                              )
                            );
                          })
                      : null}
                  </div>
                </div>
              </Col>
              <Col xs={24} lg={14}>
                <DetailsRight product={product[0]} />
              </Col>
            </Row>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProductDetails;
