import { Buttons } from '@/components/buttons';

interface SampleCardProps {
  item: {
    id: number;
    content: string;
    title: string;
    img: string;
  }
}

function SampleCardOne({ item }:SampleCardProps) {
  const { content, title, img } = item;

  return (
    <figure className="mb-0 bg-white dark:bg-white/10 rounded-10">
      <img className="w-full rounded-t-10" src={`/hexadash-nextjs/${img}`} alt="" />
      <figcaption className="p-[25px]">
        <h2 className="mb-[10px] text-[18px] font-semibold text-dark dark:text-white/[.87]">{title}</h2>
        <p className="leading-[1.79] mb-[15px] text-theme-gray dark:text-white/60">{content}</p>
        <Buttons className="bg-primary-transparent hover:bg-primary-hbr border-none text-primary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]">
          View More
        </Buttons>
      </figcaption>
    </figure>
  );
}


export default SampleCardOne;
