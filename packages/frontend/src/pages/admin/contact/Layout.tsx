import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Row, Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Heading from '@/components/heading';
import { Buttons } from '@/components/buttons';
import { Modals } from '@/components/modals/antd-modals';
import { AutoCompleted } from '@/components/autoComplete';
import { contactDeleteData, contactSearchData, contactAddData } from '@/redux/contact/actionCreator';

const ContactLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { pathname } = router;
  const currentPath = pathname.split('/')[3];
  
  const dispatch = useDispatch();

  interface RootState {
    Contact: {
      data: any;
    }
  }

  const { users } = useSelector((state:RootState) => {
    return {
      users: state.Contact.data,
    };
  });
  const [form] = Form.useForm();

  const [state, setState] = useState({
    selectedRowKeys: 0,
    selectedRows: 0,
    visible: currentPath === 'addNew',
    editVisible: false,
    modalType: 'primary',
    url: null,
    update: {},
  });

  const { update }:any = state;

  const handleSearch = (searchText:string) => {
    //@ts-ignore
    dispatch(contactSearchData(searchText));
  };

  interface Item {
    id: number;
  }

  const onHandleDelete = (id:number) => {
    const value = users.filter((item:Item) => item.id !== id);
    //@ts-ignore
    dispatch(contactDeleteData(value));
  };

  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
  };

  const showEditModal = (data:any) => {
    setState({
      ...state,
      editVisible: true,
      update: data,
    });
  };

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
      editVisible: false,
    });
  };

  const handleOk = (values:any) => {
    onCancel();
    const arrayData:any = [];
    users.map((data:any) => {
      return arrayData.push(data.id);
    });
    const max = Math.max(...arrayData);
    dispatch(
      //@ts-ignore
      contactAddData([
        ...users,
        {
          ...values,
          id: max + 1,
          time: new Date().getTime(),
          img: '/hexadash-nextjs/img/users/6.png',
          live: false,
          stared: false,
        },
      ]),
    );
    form.resetFields();
  };

  interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    designation: string;
    company: string;
    time: string; // Assuming 'time' is a string; adjust the type accordingly
    img: string; // Assuming 'img' is a string; adjust the type accordingly
    stared: boolean; // Assuming 'stared' is a boolean; adjust the type accordingly
  }

  const handleEditOk = (values: {
    name: string;
    email: string;
    phone: string;
    designation: string;
    company: string;
  }, update: User) => {
    onCancel();
    const updateUsers = users;

    updateUsers.map((user:User) => {
      if (user.id === update.id) {
        const updateUser = user;
        updateUser.id = update.id;
        updateUser.name = values.name;
        updateUser.email = values.email;
        updateUser.phone = values.phone;
        updateUser.designation = values.designation;
        updateUser.company = values.company;
        updateUser.time = update.time;
        updateUser.img = update.img;
        updateUser.stared = update.stared;
      }
      return true;
    });
    //@ts-ignore
    dispatch(contactAddData(updateUsers));
    form.resetFields();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <div className="flex items-center justify-between pt-[42px] pb-[35px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] md:justify-center md:flex-col gap-[20px]">
        <div className="inline-flex flex-wrap items-center md:justify-center gap-[20px]">
          <Heading as="h4" className="text-dark dark:text-white/[.87] text-[22px] font-semibold mb-0">
            Contacts
          </Heading>
          <div className="ltr:ml-[5px] rtl:mr-[5px] [&>.ant-select>.ant-select-selector]:min-w-[350px] [&>.ant-select>.ant-select-selector]:bg-white dark:[&>.ant-select>.ant-select-selector]:bg-white/10 sm:[&>.ant-select>.ant-select-selector]:min-w-[100%] [&>.ant-select>.ant-select-selector>.ant-select-selection-search>.ant-input-affix-wrapper]:rounded-md [&>div>div>span>span]:border-none [&>div>.ant-select-selector>.ant-select-selection-placeholder]:h-[38px] [&>div>.ant-select-selector>.ant-select-selection-placeholder]:leading-[36px] [&>div>.ant-select-selector>.ant-select-selection-placeholder]:px-5">
            <AutoCompleted onSearch={handleSearch} placeholder="Search by Name" width="100%" patterns />
          </div>
        </div>
        <Buttons
          onClick={showModal}
          className="bg-primary hover:bg-primary-hbr h-10 px-[14px] text-sm font-semibold rounded-md"
          size="default"
          type="primary"
          key="1"
        >
          <Link href="#" className="hover:text-white">+ Add New</Link>
        </Buttons>
      </div>

      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-[30px] ssm:px-[15px]  pb-[20px]">
        <Row gutter={25}>
          { children }
        </Row>

        <Modals
          type={state.modalType}
          title="Contact Information"
          visible={state.visible}
          footer={null}
          onCancel={handleCancel}
        >
          <div className="px-1.5">
            <Form form={form} name="contact" onFinish={handleOk}>
              <Form.Item
                label="Name"
                name="name"
                className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:flex-auto [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>input]:p-3 [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white/60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
              >
                <Input placeholder="Input Name" className="dark:placeholder-white/60" />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="email"
                rules={[{ message: 'Please input your email!', type: 'email' }]}
                className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:flex-auto [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>input]:p-3 [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white/60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
              >
                <Input placeholder="name@example.com" className="dark:placeholder-white/60" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:flex-auto [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>input]:p-3 [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white/60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
              >
                <Input placeholder="+440 2546 5236" className="dark:placeholder-white/60" />
              </Form.Item>

              <Form.Item
                name="designation"
                label="Position"
                className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:flex-auto [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>input]:p-3 [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white/60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
              >
                <Input placeholder="Input Position" className="dark:placeholder-white/60" />
              </Form.Item>

              <Form.Item
                name="company"
                label="Company Name"
                className="mb-[26px] [&>.ant-form-item-row]:flex-col [&>.ant-form-item-row>div]:flex-auto [&>.ant-form-item-row>div]:text-start [&>.ant-form-item-row>div>label]:text-dark dark:[&>.ant-form-item-row>div]:text-start dark:[&>.ant-form-item-row>div>label]:text-white/[.87] [&>.ant-form-item-row>div>label]:font-semibold [&>.ant-form-item-row>div>div>div>input]:p-3 [&>.ant-form-item-row>div>div>div>input]:border-normal dark:[&>.ant-form-item-row>div>div>div>input]:text-white/60 dark:[&>.ant-form-item-row>div>div>div>input]:border-white/10 [&>.ant-form-item-row>div>div>div>input]:rounded-md"
              >
                <Input placeholder="Company Name" className="dark:placeholder-white/60" />
              </Form.Item>

              <Buttons
                htmlType="submit"
                size="default"
                type="primary"
                key="submit"
                className="bg-primary hover:bg-primary-hbr px-5 text-sm font-semibold h-11"
              >
                Add New Contact
              </Buttons>
            </Form>
          </div>
        </Modals>
      </main>
    </>
  );
}

export default ContactLayout;
