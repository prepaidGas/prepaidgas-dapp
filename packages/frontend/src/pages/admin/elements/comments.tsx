import { useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { Comment } from '@ant-design/compatible';
import { Row, Col, Tooltip, Avatar, List } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { PageHeaders } from '@/components/page-headers';
import CommentEditor from '@/components/comments/comments-editor';

function ExampleComment({ children }:any) {
  return (
    <Comment
      actions={[<span key="comment-nested-reply-to">Reply</span>]}
      author={<Link href="#">Han Solo</Link>}
      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
      content={
        <p className="text-light dark:text-white/60">
          We supply a series of design principles, practical patterns and high quality design resources (Sketch and
          Axure).
        </p>
      }
    >
      {children}
    </Comment>
  );
}

function Comments() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Comments',
    },
  ];
  
  const [state, setState] = useState({
    likes: 0,
    dislikes: 0,
    action: '',
  });

  const like = () => {
    setState({
      likes: 1,
      dislikes: 0,
      action: 'liked',
    });
  };

  const dislike = () => {
    setState({
      likes: 0,
      dislikes: 1,
      action: 'disliked',
    });
  };

  const { likes, dislikes, action } = state;

  const actions = [
    <span key="comment-basic-like">
      <Tooltip className="inline-flex items-center" title="Like">
        <LikeOutlined className={action === 'liked' ? 'Filled' : 'Outlined'} onClick={like} />
      </Tooltip>
      <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
    </span>,
    <span key=' key="comment-basic-dislike"'>
      <Tooltip className="inline-flex items-center" title="Dislike">
        <DislikeOutlined className={action === 'disliked' ? 'Filled' : 'Outlined'} onClick={dislike} />
      </Tooltip>
      <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
    </span>,
    <span key="comment-basic-reply-to">Reply</span>,
  ];

  const data = [
    {
      actions: [<span key="comment-list-reply-to-0">Reply</span>],
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: (
        <p className="text-light dark:text-white/60">
          We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(1, 'days').fromNow()}</span>
        </Tooltip>
      ),
    },
    {
      actions: [<span key="comment-list-reply-to-0">Reply</span>],
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: (
        <p className="text-light dark:text-white/60">
          We supply a series of design principles, practical patterns and high quality design resources (Sketch and
          Axure), to help people create their product prototypes beautifully and efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(2, 'days').fromNow()}</span>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Comments"
        routes={PageRoutes}
      />
      <>
        <div className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
          <>
            <Row gutter={25}>
              <Col xs={24}>
                <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                  <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                      Basic Comment
                    </h1>
                  </div>
                  <div className="p-[25px]">
                    <Comment
                      actions={actions}
                      author={<Link href="#">Han Solo</Link>}
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />
                      }
                      content={
                        <p className="text-light dark:text-white/60">
                          We supply a series of design principles, practical patterns and high quality design resources
                          (Sketch and Axure), to help people create their product prototypes beautifully and
                          efficiently.
                        </p>
                      }
                      datetime={
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                          <span>{moment().fromNow()}</span>
                        </Tooltip>
                      }
                    />
                  </div>
                </div>
              </Col>
              <Col xs={24}>
                <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                  <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                      Usage With List
                    </h1>
                  </div>
                  <div className="p-[25px]">
                    <List
                      className="comment-list"
                      header={`${data.length} replies`}
                      itemLayout="horizontal"
                      dataSource={data}
                      renderItem={(item) => (
                        <li>
                          <Comment
                            actions={actions}
                            author={item.author}
                            avatar={item.avatar}
                            content={item.content}
                            datetime={item.datetime}
                          />
                        </li>
                      )}
                    />
                  </div>
                </div>
              </Col>
              <Col xs={24}>
                <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                  <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                      Nested comment
                    </h1>
                  </div>
                  <div className="p-[25px]">
                    <h6 className="comment-title text-[12px] pb-[10px] mb-[22px] border-regular dark:border-white/10 border-b-1">
                      Reply to
                    </h6>
                    <ExampleComment>
                      <ExampleComment>
                        <ExampleComment />
                        <ExampleComment />
                      </ExampleComment>
                    </ExampleComment>
                  </div>
                </div>
              </Col>
              <Col xxl={12} xl={18} xs={24}>
                <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                  <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                      Reply editor
                    </h1>
                  </div>
                  <div className="p-[25px]">
                    <CommentEditor />
                  </div>
                </div>
              </Col>
            </Row>
          </>
        </div>
      </>
    </>
  );
}

export default Comments;
