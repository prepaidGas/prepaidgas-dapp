import Link from 'next/link';
import Image from 'next/image';
import { Upload, message } from 'antd';
import { UilCamera } from '@iconscout/react-unicons';

function CoverSection() {
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

  return (
    <div className="relative">
      <Image
        className="w-full min-h-[220px] object-cover rounded-t-10"
        src='/hexadash-nextjs/img/profile/cover-img.png'
        alt="banner"
        width="1500"
        height="220"
      />
      <Upload
        {...props}
        className="absolute border border-white rounded-md top-5 ltr:right-5 rtl:left-5 lg:top-1/2 lg:ltr:right-1/2 lg:rtl:left-1/2 lg:-translate-y-1/2 lg:ltr:translate-x-1/2 lg:rtl:-translate-x-1/2 border-opacity-30"
      >
        <Link href="#" className="flex items-center px-4 xs:px-3 py-2 text-white gap-[8px]">
          <UilCamera className="w-4 h-4" /> Change Cover
        </Link>
      </Upload>
    </div>
  );
}

export default CoverSection;
