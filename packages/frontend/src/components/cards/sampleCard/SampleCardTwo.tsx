
import Link from 'next/link';

interface SampleCardProps {
  item: {
    id: number;
    content: string;
    title: string;
    img: string;
  }
}

function SampleCardTwo({ item }:SampleCardProps) {
  const { content, title, img } = item;
  return (
    <figure className="mb-0 bg-white dark:bg-white/10 rounded-10 p-[25px]">
      <img className="w-[60px] h-[60px] rounded-t-10" src={`/hexadash-nextjs/${img}`} alt="" />
      <figcaption>
        <h2 className="mb-[10px] mt-[18px] text-[18px] font-semibold text-dark dark:text-white/[.87]">{title}</h2>
        <p className="leading-[1.79] mb-[15px] text-theme-gray dark:text-white/60">{content}</p>
        <Link className="text-primary" href="#">
          Learn More
        </Link>
      </figcaption>
    </figure>
  );
}


export default SampleCardTwo;
