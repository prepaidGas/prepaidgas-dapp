import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Col, Input, Row } from 'antd';
import UilSearch from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import { headerSearchAction } from '@/redux/headerSearch/actionCreator';

const PopOver = dynamic(() => import('../popup'), {
  ssr: false,
});

interface RootState {
  headerSearchData: any;
  ChangeLayoutMode: any;
}
interface Group {
  title: string;
  count: number;
  id: string;
}

function HeaderSearch() {
  const dispatch = useDispatch();
  const searchData = useSelector((state:RootState) => state.headerSearchData);
  const rtl = useSelector((state:RootState) => state.ChangeLayoutMode.rtlData);

  const search = (e:React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    dispatch(headerSearchAction(e.target.value));
  };

  const content = (
    <div>
      {searchData.length ? (
        searchData.map((group:Group) => {
          const { title, count, id } = group;
          return (
            <Link key={id} href="#">
              {title}
              <span className="certain-search-item-count">{count} people</span>
            </Link>
          );
        })
      ) : (
        <Link href="#">Data Not found....</Link>
      )}
    </div>
  );

  return (
    <>
      <div className="certain-category-search-wrapper" style={{ width: '100%' }}>
        <Row className="ant-row-middle">
          <Col md={2} xs={1} className="text-start">
            <span className="certain-category-icon">
              <UilSearch />
            </span>
          </Col>
          <Col md={22} xs={23}>
            <PopOver
              placement={!rtl ? 'bottomLeft' : 'bottomRight'}
              content={content}
              title="Search List"
              action="focus"
            >
              <Input placeholder="Search..." onInput={search} />
            </PopOver>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default HeaderSearch;
