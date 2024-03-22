import React, { useState } from 'react';
import Link from 'next/link';
import {
  UilTrashAlt,
  UilPaperclip,
  UilExclamationCircle
} from '@iconscout/react-unicons';
import { Upload, message } from 'antd';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { useSelector } from 'react-redux';
import { Buttons } from '@/components/buttons';
import { Editor } from "@tinymce/tinymce-react";

interface MailComposerProps {
  onChange?: (value: string) => void;
  onSend?: () => void;
  defaultTag?: string;
  replay?: boolean;
  text?: string;
}

interface MailComposerState {
  value: string | null;
  tags: string[];
}

interface MailComposerState {
  value: string | null;
  tags: string[];
}

interface RootState {
  ChangeLayoutMode: {
    mode: string;
  };
}

const MailComposer: React.FC<MailComposerProps> = ({
  onChange,
  onSend,
  defaultTag,
  replay,
  text,
}: MailComposerProps) => {
  const [state, setState] = useState<MailComposerState>({
    value: null,
    tags: defaultTag ? [defaultTag] : [],
  });

  const onChanges = (value:any) => {
    setState((prevState: MailComposerState) => ({
      ...prevState,
      value,
    }));
  
    if (onChange) {
      onChange(value.toString());
    }
  };
  
  const handleChange = (tags: string[]) => {
    setState((prevState: MailComposerState) => ({
      ...prevState,
      tags,
    }));
  };
  const onSubmit = () => {
    // onSend && onSend(state.value.toString('html'));
  };

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info:any) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };


  const { mainContent } = useSelector((state:RootState) => {
    return {
      mainContent: state.ChangeLayoutMode.mode,
    };
  });

  return (
    <div className="static bg-white dark:bg-[#1b1d2a] rounded-10 shadow-[0_10px_50px_rgba(146,153,184,.19)] dark:shadow-none z-10">
      {!text && (
        <div className="flex items-center justify-between relative px-[30px] ssm:px-[15px]">
          <div className="relative flex items-center gap-2.5 w-full border-b border-regular dark:border-white/10">
            {!replay ? null : <span className="text-light dark:text-white/[.87]">Replay To</span>}
            <TagsInput
              inputProps={{
                placeholder: replay ? null : 'To',
              }}
              value={state.tags}
              onChange={handleChange}
              className="py-2 text-light dark:text-white/[.87] [&>span>input]:placeholder:text-light dark:[&>span>input]:placeholder:text-white/60 [&>span]:flex [&>span>.react-tagsinput-tag]:flex [&>span>.react-tagsinput-tag]:bg-section dark:[&>span>.react-tagsinput-tag]:bg-white/10 [&>span>.react-tagsinput-tag]:gap-2 [&>span>.react-tagsinput-tag]:border-none [&>span>.react-tagsinput-tag]:py-[5px] [&>span>.react-tagsinput-tag]:px-4 [&>span>.react-tagsinput-tag]:text-body dark:[&>span>.react-tagsinput-tag]:text-white/[.87] [&>span>.react-tagsinput-tag]:rounded-[16px] [&>span>.react-tagsinput-tag>a]:text-light dark:[&>span>.react-tagsinput-tag>a]:text-white/60"
            />
          </div>
          <span className="absolute ltr:right-[30px] rtl:left-[30px] top-1/2 -translate-y-1/2 text-light dark:text-white/[.87]">
            Cc
          </span>
        </div>
      )}
      <div className="relative pb-[30px] ssm:b-[15px] px-[30px] ssm:px-[15px] [&>.tox-tinymce]:md:h-[200px] [&>.tox-tinymce]:border-none [&>.tox-tinymce]: rounded-none [&>.tox-tinymce>.tox-editor-container>.tox-editor-header]:shadow-none [&>.tox-tinymce>.tox-editor-container>.tox-editor-header]:border-b [&>.tox-tinymce>.tox-editor-container>.tox-editor-header]:border-solid [&>.tox-tinymce>.tox-editor-container>.tox-editor-header]:border-normal [&>.tox-tinymce>.tox-editor-container>.tox-editor-header]:dark:border-white/10 [&>.tox-tinymce>.tox-editor-container>.tox-statusbar]:hidden">
        <Editor
          initialValue=""
          init={{
            branding: false,
            height: 400,
            menubar: true,
            image_advtab: true,
            content_css: mainContent === 'darkMode' ? 'dark' : 'default'
          }}
          onChange={onChanges}
        />
      </div>
      {!text && (
        <div className="flex items-center justify-between mx-[30px] pt-[20px] pb-[30px] border-t border-regular dark:border-white/10">
          <div className="flex items-center">
            <Buttons
              size="default"
              type="primary"
              className="h-[44px] bg-primary hover:bg-primary-hbr ltr:mr-[10px] rtl:ml-[10px] px-[20px]"
              onClick={onSubmit}
              raised
            >
              Send
            </Buttons>
            <Link href="#">
              <Upload
                {...props}
                className="flex items-center [&>div.ant-upload-list]:absolute [&>div.ant-upload-list]:w-[95%] [&>div.ant-upload-list]:left-[25px] [&>div.ant-upload-list]:bottom-[15%] [&>div.ant-upload-list]:m-0 [&>div>div>.ant-upload-list-item]:bg-section dark:[&>div.ant-upload-list]:m-0 [&>div>div>.ant-upload-list-item]:bg-white/10 [&>div>div>.ant-upload-list-item]:px-2.5 [&>div>div>.ant-upload-list-item]:py-[15px] [&>div>div>.ant-upload-list-item]:rounded-[10px] [&>div>div>.ant-upload-list-item]:my-[2.5] [&>div>div>div>div>span>.ant-upload-text-icon]:flex [&>div>div>div>div>span>div>.anticon]:text-body [&>div>div>div>div>span>span>button]:m-0 [&>div>div>div>div>span>span>button>.anticon]:text-body dark:text-white/60"
              >
                <UilPaperclip className="w-[15px] h-[15px] ltr:ml-[10px] rtl:mr-[10px] text-light dark:text-white/60" />
              </Upload>
            </Link>
            <Link href="#">
              <UilExclamationCircle className="w-[15px] h-[15px] ltr:ml-[10px] rtl:mr-[10px] text-light dark:text-white/60" />
            </Link>
          </div>
          <div className="flex items-center">
            <Link href="#">
              <UilTrashAlt className="w-[18px] h-[18px]ltr:ml-[10px] rtl:mr-[10px] text-light dark:text-white/60" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default MailComposer;
