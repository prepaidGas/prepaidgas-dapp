import React, { useState } from 'react';
import moment from 'moment';
import { Avatar, Form, Input, List } from 'antd';
import { Comment } from '@ant-design/compatible';
import { Buttons } from '../buttons';

const { TextArea } = Input;

function CommentList({ comments }:any) {
  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={(props: any) => <Comment {...props} />}
    />
  );
}

function Editor({ onChange, onSubmit, submitting, value }:any) {
  return (
    <div>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Buttons
          className="text-[14px] bg-primary border-1 border-primary text-white dark:text-white/[.87] inline-flex items-center justify-center rounded-4 px-[20px] h-[44px] font-semibold shadow-dark"
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          size="default"
          raised
          type="primary"
        >
          Add Comment
        </Buttons>
      </Form.Item>
    </div>
  );
}

function CommentEditor() {
  const [state, setState]:any = useState({
    comments: [],
    submitting: false,
    value: '',
  });

  const handleSubmit = () => {
    if (!state.value) {
      return;
    }

    setState({
      ...state,
      submitting: true,
    });

    setTimeout(() => {
      setState({
        ...state,
        submitting: false,
        value: '',
        comments: [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...state.comments,
        ],
      });
    }, 1000);
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      value: e.target.value,
    });
  };

  const { comments, submitting, value } = state;

  return (
    <>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        className="tesssttt"
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
        content={<Editor onChange={handleChange} onSubmit={handleSubmit} submitting={submitting} value={value} />}
      />
    </>
  );
}
export default CommentEditor;
