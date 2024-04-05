import * as Unicons from '@iconscout/react-unicons';

function InfoCard( icon:string, text:string, counter:string, type:string ) {
  const IconTag = Unicons[icon];
  return (
    <div className="bg-white dark:bg-white/10 p-[15px] mb-[25px] text-center rounded-[10px]">
      <span
        className={`flex items-center justify-center w-[58px] h-[58px] bg-${type}-transparent text-${type} mx-auto mb-2.5 rounded-[14px]`}
      >
        <IconTag />
      </span>
      <p className="text-body dark:text-white/60 text-base mb-4">{text}</p>
      <h2 className="mb-1 text-3xl text-body dark:text-white/60 font-semibold">{counter}</h2>
    </div>
  );
}

InfoCard.defaultProps = {
  counter: '21k',
  text: 'Total Products',
  icon: 'briefcase',
  type: 'primary',
};

export default InfoCard;
