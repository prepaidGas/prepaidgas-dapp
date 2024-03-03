import {
  UilEye,
  UilHeart 
} from '@iconscout/react-unicons';

interface SampleCardProps {
  item: {
    id: number;
    content: string;
    title: string;
    img: string;
  };
}

function SampleCardFour({ item }:SampleCardProps) {
  const { content, title, img } = item;

  return (
    <figure className="mb-0 bg-white dark:bg-white/10 rounded-10">
      <img className="w-full rounded-t-10" src={`/hexadash-nextjs/${img}`} alt="" />
      <figcaption className="p-[25px]">
        <h4 className="flex justify-between mt-0 mb-0 font-medium text-light dark:text-white/60 text-[12px]">
          <span>Web Development</span>
          <span>01 July 2020 </span>
        </h4>
        <h2 className=" mt-[6px] mb-[10px] text-[18px] font-semibold text-dark dark:text-white/[.87]">{title}</h2>
        <p className="leading-[1.79] text-theme-gray dark:text-white/60">{content}</p>
        <div className="flex items-center justify-between text-light">
          <div className="flex items-center text-theme-gray dark:text-white/60 gap-[10px]">
            <img className="w-[50px] rounded-full" src={'/hexadash-nextjs/img/chat-author/t1.jpg'} alt="" />
            <span className="text-[14px] font-medium">Burns Marks</span>
          </div>
          <div className="inline-flex items-center gap-[10px]">
            <span className="flex items-center text-[13px] text-light-extra dark:text-white/60 gap-[5px]">
              <UilEye className="w-[16px] h-[16px] text-light dark:text-white/60" />
              70
            </span>
            <span className="flex items-center text-[13px] text-light-extra dark:text-white/60 gap-[5px]">
              <UilHeart className="w-[16px] h-[16px] text-light dark:text-white/60" />
              120
            </span>
          </div>
        </div>
      </figcaption>
    </figure>
  );

};

export default SampleCardFour;
