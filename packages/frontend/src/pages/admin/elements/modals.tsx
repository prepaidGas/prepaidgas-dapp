import { useState } from 'react';
import { Row, Col } from 'antd';
import { PageHeaders } from '@/components/page-headers';
import { Buttons } from '@/components/buttons';
import { Modals, alertModal } from '@/components/modals/antd-modals';

const info = () => {
  alertModal.info({
    title: 'This is a notification message',
    content: (
      <div className="dark:text-white/60">
        <p className="text-light dark:text-white/[.87] mb-4">Some contents...</p>
        <p className="text-light dark:text-white/[.87] mb-4">Some contents...</p>
        <p className="text-light dark:text-white/[.87] mb-4">Some contents...</p>
      </div>
    ),
    onOk() {},
  });
};

const success = () => {
  alertModal.success({
    content: 'some messages...some messages...',
  });
};

const error = () => {
  alertModal.error({
    title: 'This is an error message',
    content: 'some messages...some messages...',
  });
};

const warning = () => {
  alertModal.warning({
    title: 'This is a warning message',
    content: 'some messages...some messages...',
  });
};

const selfDestroyed = () => {
  let secondsToGo = 5;
  const modal = alertModal.success({
    title: 'This is a notification message',
    content: `This modal will be destroyed after ${secondsToGo} second.`,
  });

  const timer = setInterval(() => {
    secondsToGo -= 1;
    modal.update({
      content: `This modal will be destroyed after ${secondsToGo} second.`,
    });
  }, 1000);

  setTimeout(() => {
    clearInterval(timer);
    modal.destroy();
  }, secondsToGo * 1000);
};

const showConfirm = () => {
  alertModal.confirm({
    title: 'Do you want to delete these items?',
    content: 'When clicked the OK button, this dialog will be closed after 1 second',
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => {});
    },
    onCancel() {},
  });
};

function ModalElement() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Modals',
    },
  ];

  interface MyComponentState {
    visible: boolean;
    modalType: string;
    colorModal: boolean;
  }

  const [state, setState] = useState<MyComponentState>({ 
    visible: false, 
    modalType: 'primary', 
    colorModal: false 
  });

  const showModal = (type: string) => {
    setState({
      ...state,
      visible: true,
      modalType: type,
    });
  };

  const showColorModal = (type: string) => {
    setState({
      ...state,
      colorModal: true,
      modalType: type,
    });
  };

  const handleOk = () => {
    setState((prevState) => ({
      ...prevState,
      visible: false,
      colorModal: false,
    }));
  };
  
  const handleCancel = () => {
    setState((prevState) => ({
      ...prevState,
      visible: false,
      colorModal: false,
    }));
  };

  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Modals"
        routes={PageRoutes}
      />
      <>
        <div className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
          <Row gutter={15}>
            <Col md={12}>
              <Modals
                type={state.modalType}
                title="Basic Modal"
                visible={state.visible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <div className="dark:text-white/60">
                  <p className="text-light dark:text-white/[.87] mb-4">Some contents...</p>
                  <p className="text-light dark:text-white/[.87] mb-4">Some contents...</p>
                  <p className="text-light dark:text-white/[.87] mb-4">Some contents...</p>
                </div>
              </Modals>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Default Modal
                  </h1>
                </div>
                <div className="p-[25px]">
                  <p className='mb-4'>
                    When requiring users to interact with the application, but without jumping to a new page and
                    interrupting the user&apos;s workflow, you can use Modal to create a new floating layer over the current page to get user feedback or display information. Additionally
                  </p>
                  <div className="flex flex-wrap items-center gap-[10px]">
                    <Buttons
                      onClick={() => showModal('primary')}
                      type="primary"
                      className="dark:hover:bg-primary dark:hover:border-primary dark:hover:text-white"
                    >
                      Primary
                    </Buttons>
                    <Buttons
                      onClick={() => showModal('success')}
                      type="success"
                      className="text-white bg-success border-success dark:hover:bg-success dark:hover:border-success dark:hover:text-white"
                    >
                      Success
                    </Buttons>
                    <Buttons
                      onClick={() => showModal('danger')}
                      type="danger"
                      className="text-white bg-danger border-danger dark:hover:bg-danger dark:hover:border-danger dark:hover:text-white"
                    >
                      Danger
                    </Buttons>
                    <Buttons
                      onClick={() => showModal('warning')}
                      type="warning"
                      className="text-white bg-warning border-warning dark:hover:bg-warning dark:hover:border-warning dark:hover:text-white"
                    >
                      Warning
                    </Buttons>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={12}>
              <Modals
                type={state.modalType}
                color = {state.colorModal}
                title="Basic Modal"
                visible={state.colorModal}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <div className="dark:text-white/60">
                  <p className="text-light dark:text-white/[.87] mb-4">Some contents...</p>
                  <p className="text-light dark:text-white/[.87] mb-4">Some contents...</p>
                  <p className="text-light dark:text-white/[.87] mb-4">Some contents...</p>
                </div>
              </Modals>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Color Modal
                  </h1>
                </div>
                <div className="p-[25px]">
                  <p className='mb-4'>
                    When requiring users to interact with the application, but without jumping to a new page and
                    interrupting the user&apos;s workflow, you can use Modal to create a new floating layer over the current page to get user feedback or display information. Additionally
                  </p>
                  <div className="flex flex-wrap items-center gap-[10px]">
                    <Buttons
                      onClick={() => showColorModal('primary')}
                      type="primary"
                      className="text-white bg-primary border-primary dark:hover:bg-primary dark:hover:border-primary dark:hover:text-white"
                    >
                      Primary
                    </Buttons>
                    <Buttons
                      onClick={() => showColorModal('success')}
                      type="success"
                      className="text-white bg-success border-success dark:hover:bg-success dark:hover:border-success dark:hover:text-white"
                    >
                      Success
                    </Buttons>
                    <Buttons
                      onClick={() => showColorModal('danger')}
                      type="danger"
                      className="text-white bg-danger border-danger dark:hover:bg-danger dark:hover:border-danger dark:hover:text-white"
                    >
                      Danger
                    </Buttons>
                    <Buttons
                      onClick={() => showColorModal('warning')}
                      type="warning"
                      className="text-white bg-warning border-warning dark:hover:bg-warning dark:hover:border-warning dark:hover:text-white"
                    >
                      Warning
                    </Buttons>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={12}>
              <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    Information Modal
                  </h1>
                </div>
                <div className="p-[25px]">
                  <p className='mb-4'>
                    When requiring users to interact with the application, but without jumping to a new page and
                    interrupting the user&apos;s workflow, you can use Modal to create a new floating layer over the current page to get user feedback or display information. Additionally
                  </p>
                  <div className="flex flex-wrap items-center gap-[10px]">
                    <Buttons
                      onClick={success}
                      type="success"
                      className="text-white bg-primary border-primary dark:hover:bg-success dark:hover:border-success dark:hover:text-white"
                    >
                      Success
                    </Buttons>
                    <Buttons
                      onClick={error}
                      type="error"
                      className="text-white bg-danger border-danger dark:hover:bg-danger dark:hover:border-danger dark:hover:text-white"
                    >
                      Error
                    </Buttons>
                    <Buttons
                      onClick={warning}
                      type="warning"
                      className="text-white bg-warning border-warning dark:hover:bg-warning dark:hover:border-warning dark:hover:text-white"
                    >
                      Warning
                    </Buttons>
                    <Buttons
                      onClick={info}
                      type="info"
                      className="text-white bg-info border-info dark:hover:bg-info dark:hover:border-info dark:hover:text-white"
                    >
                      Info
                    </Buttons>
                    <Buttons onClick={selfDestroyed} type="primary">
                      Modal Self Destroyed
                    </Buttons>
                    <Buttons onClick={showConfirm} type="primary">
                      Confirm
                    </Buttons>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </>
    </>
  );
}

export default ModalElement;
