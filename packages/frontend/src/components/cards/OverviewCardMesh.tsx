import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ReactSVG } from 'react-svg';
import CountUp from 'react-countup';

function OverviewCardMesh( data:any, circleIcon:string ) {
  const [didViewCountUp, setDidViewCountUp] = useState(false);

  const router = useRouter();
  const { pathname } = router;
  
  useEffect(() => {
    setDidViewCountUp(true);
  }, [pathname]);

  const { type, icon, label, total, status, statusRate, suffix, prefix, decimel } = data;
  const totalNumber = Number(total);
  return (
    <div
      className={`relative p-[25px] 3xl:p-5 after:absolute after:top-1/2 after:-translate-y-1/2 ltr:after:-right-[60px] ltr:3xl:after:right-0 rtl:after:-left-[60px] rtl:3xl:after:left-0 ltr:sm:after:left-1/2 sm:after:-translate-x-1/2 sm:after:top-full after:w-[1px] sm:after:w-[70%] after:h-[70px] sm:after:h-[1px] after:bg-regular dark:after:bg-white/10 last:after:hidden ${
        circleIcon ? 'hexadash-icon-circle' : ''
      }`}
    >
      <div>
        <div className="flex items-center gap-[25px] 3xl:gap-[15px]">
          <div
            className={`flex items-center justify-center w-[70px] 3xl:w-[50px] h-[70px] 3xl:h-[50px] ${
              circleIcon ? `bg-${type} text-white rounded-full` : `bg-${type}-transparent text-${type} rounded-[14px]`
            }`}
          >
            <ReactSVG
              src={require(`/hexadash-nextjs/img/icon/${icon}`)}
              className="3xl:[&>div>svg]:w-5 3xl:[&>div>svg]:h-5[&>div>svg]:text-{type}"
            />
          </div>
          <div className="flex items-start gap-[25px] 3xl:gap-[15px]">
            <div>
              <h4 className="text-3xl 3xl:text-2xl font-semibold mb-0">
                <CountUp
                  start={0}
                  end={didViewCountUp ? totalNumber : 0}
                  suffix={suffix}
                  prefix={prefix}
                  delay={0.5}
                  decimals={decimel}
                  duration={2}
                />
              </h4>
              <span className="text-body dark:text-white/60 text-base">{label}</span>
            </div>
            <span
              className={`flex items-center mt-1.5 text-sm font-medium ${
                status === 'growth' ? 'text-success' : 'text-danger'
              }`}
            >
              {status === 'growth' ? 'UilUp' : 'UilDown'} {statusRate}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
OverviewCardMesh.propTypes = {
  data: {},
  circleIcon: false,
};

export default OverviewCardMesh;
