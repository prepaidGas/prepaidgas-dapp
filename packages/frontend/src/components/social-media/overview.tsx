import FontAwesome from 'react-fontawesome';

interface SocialMediaContentProps {
  icon: string;
  bgColor: string;
  title: string;
  subTitle: string;
}

function SocialMediaContent(props:SocialMediaContentProps) {
  const { icon, bgColor, title, subTitle } = props;
  return (
    <div className="flex flex-col justify-center align-items w-full mx-18px">
      <div
        className="social-icon w-[50px] h-[50px] text-white dark:text-dark flex items-center justify-center rounded-10"
      >
        <FontAwesome
          className="super-crazy-colors"
          name={icon}
          size="2x"
          style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
        />
      </div>
      <h1 className="text-[22px] font-semibold pt-[5px] m-0">{title}</h1>
      <p className="m-0 text-light dark:text-white/60">{subTitle}</p>
    </div>
  );
}

export { SocialMediaContent };
