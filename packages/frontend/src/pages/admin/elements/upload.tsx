import { useState } from 'react';
import { Row, Col, Upload, message } from 'antd';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Buttons } from '@/components/buttons';
import { PageHeaders } from '@/components/page-headers';

const props:any = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info:any) {
    if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const getBase64 = (img:File, callback:any) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file:File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

function Uploads() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Upload',
    },
  ];
  const [state, setState]:any = useState({
    fileList: [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'http://www.baidu.com/xxx.png',
      },
    ],
    loading: false,
    defaultFilelist: [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/xxx.png',
      },
      {
        uid: '-2',
        name: 'yyy.png',
        status: 'done',
        url: 'http://www.baidu.com/yyy.png',
      },
      {
        uid: '-3',
        name: 'zzz.png',
        status: 'error',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/zzz.png',
      },
    ],
  });

  const onHandleChange = (info:any) => {
    if (info.file.status === 'uploading') {
      setState({ ...state, loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl:string) =>
        setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  const handleChange = (info:any) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-2);
    fileList = fileList.map((file) => {
      if (file.response) {
        // eslint-disable-next-line no-param-reassign
        file.url = file.response.url;
      }
      return file;
    });
    setState({ ...state, fileList });
  };

  const uploadButton = (
    <div>
      {state.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  interface defaultState {
    imageUrl: string;
    defaultFilelist: any[]; 
  }

  const { imageUrl, defaultFilelist }:defaultState = state;

  const defaultProps:any = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList }:any) {
      if (file.status !== 'uploading') {
        setState({ ...state, defaultFilelist: [...defaultFilelist, fileList] });
      }
    },
  };

  return (
    <>
      <PageHeaders
        className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Upload"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row gutter={15}>
          <Col sm={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Basic
                </h1>
              </div>
              <div className="p-[25px] [&>span>div>span>button]:text-[14px] [&>span>div>span>button]:flex [&>span>div>span>button]:items-center">
                <Upload {...props}>
                  <Buttons className="btn-outlined border-regular dark:border-white/10 dark:text-white/[.87] hover:border-primary hover:text-primary" size="large" type="light" outlined>
                    <UploadOutlined /> Click to Upload
                  </Buttons>
                </Upload>
              </div>
            </div>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Avatar
                </h1>
              </div>
              <div className="p-[25px]">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader [&>.ant-upload-select:hover]:border-primary"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={onHandleChange}
                >
                  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
              </div>
            </div>
          </Col>
          <Col sm={12} xs={24}>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Complete Control
                </h1>
              </div>
              <div className="p-[25px] [&>span>div>span>button]:text-[14px] [&>span>div>span>button]:flex [&>span>div>span>button]:items-center">
                <Upload
                  fileList={state.fileList}
                >
                  <Buttons className="btn-outlined border-regular dark:border-white/10 dark:text-white/[.87] hover:border-primary hover:text-primary" size="large" type="light" outlined>
                    <UploadOutlined /> Upload
                  </Buttons>
                </Upload>
              </div>
            </div>
            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
              <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                  Upload Default
                </h1>
              </div>
              <div className="p-[25px] [&>span>div>span>button]:text-[14px] [&>span>div>span>button]:flex [&>span>div>span>button]:items-center">
                <Upload fileList={defaultFilelist}>
                  <Buttons className="btn-outlined border-regular dark:border-white/10 dark:text-white/[.87] hover:border-primary hover:text-primary" size="large" type="light" outlined>
                    <UploadOutlined /> Upload
                  </Buttons>
                </Upload>
              </div>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default Uploads;
