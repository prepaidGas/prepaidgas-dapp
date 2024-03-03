import dynamic from 'next/dynamic'
import { Row, Col, Skeleton } from 'antd';
import { useSelector } from 'react-redux';

const RightAside = dynamic(() => import('./RightAside'), {
  loading: () => (
    <>
      <Skeleton active />
    </>
  ),
});
const CreatePost = dynamic(() => import('./CreatePost'), {
  loading: () => (
    <>
      <Skeleton active />
    </>
  ),
});
const AllPosts = dynamic(() => import('./Posts'), {
  loading: () => (
    <>
      <Skeleton active />
    </>
  ),
});

interface Post {
  id: string;
  time: number;
}

interface RootState {
  Profile: {
    posts: Post[];
  };
}

function TimelineContent() {
  const { posts } = useSelector((state:RootState) => {
    return {
      posts: state.Profile.posts,
    };
  });
  return (
    <Row gutter={25}>
      <Col xxl={16} xs={24}>
        <CreatePost />
        {posts
          .sort((a, b) => b.time - a.time)
          .map((post, index) => {
            return (
              <AllPosts key={index} {...post} />
            );
          })}
      </Col>
      <Col xxl={8} xs={24}>
        <RightAside />
      </Col>
    </Row>
  );
}

export default TimelineContent;
