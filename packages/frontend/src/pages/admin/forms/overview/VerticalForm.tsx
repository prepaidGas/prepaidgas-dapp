import { Form, Input, Button } from 'antd';

function VerticalForm() {
  return (
    <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative h-full">
      <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
        <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
          Vertical Form
        </h1>
      </div>
      <div className="p-[25px]">
        <Form name="hexadash-vertical-form" layout="vertical">
          <Form.Item name="name" initialValue="Duran Clayton" label="Name">
            <Input className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60" />
          </Form.Item>
          <Form.Item name="email" initialValue="username@email.com" label="Email Address">
            <Input placeholder="Enter Email" className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60" />
          </Form.Item>
          <Form.Item
            className="[&>div>div>div>div>span>span>svg]:w-[16px] [&>div>div>div>div>span>.ant-input-prefix]:mr-[10px] [&>div>div>div>div>span>span>svg]:h-[16px] [&>div>div>div>div>span>span>svg]:text-light-extra [&>div>div>div>div>span>span>span>svg]:text-light-extra"
            name="password"
            initialValue="1234567"
            label="Password"
          >
            <Input.Password className="h-12 p-3 rounded-6 border-normal dark:border-whiteDark hover:border-primary focus:border-primary dark:placeholder-white/60" />
          </Form.Item>
          <div className="flex flex-wrap gap-[15px]">
            <Button
              className="bg-theme-gray-transparent dark:bg-white/30 hover:bg-gray-hbr dark:hover:bg-white/10 border-none text-theme-gray dark:text-white/60 hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
              htmlType="submit"
              size="large"
            >
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
              type="primary"
              size="large"
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default VerticalForm;
