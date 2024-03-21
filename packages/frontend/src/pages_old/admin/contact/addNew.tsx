import { useState } from 'react';
import { Col } from 'antd';
import { useSelector } from 'react-redux';
import ContactCard from './overview/ContactCard';

import ContactLayout from './Layout';

interface RootState {
  Contact: {
    data: any;
  }
}

function AddNew() {
  const { users } = useSelector((state:RootState) => {
    return {
      users: state.Contact.data,
    };
  });

  const [state, setState] = useState({
    selectedRowKeys: 0,
    selectedRows: 0,
    visible: true,
    editVisible: false,
    modalType: 'primary',
    url: null,
    update: {},
  });

  const showEditModal = (data:any) => {
    setState({
      ...state,
      editVisible: true,
      update: data,
    });
  };

  interface User {
    id: number;
  }

  return (
    <ContactLayout>
      {users.map((user:User) => {
        return (
          <Col key={user.id} xxl={6} xl={8} sm={12} xs={24} className="mb-[25px]">
            <ContactCard showEditModal={showEditModal} user={user} />
          </Col>
        );
      })}
    </ContactLayout>
  );
}

export default AddNew;
