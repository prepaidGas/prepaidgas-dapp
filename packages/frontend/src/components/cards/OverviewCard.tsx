import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ReactSVG } from 'react-svg';
import CountUp from 'react-countup';
import {
  UilArrowDown,
  UilArrowUp,
 } from '@iconscout/react-unicons';

function OverviewCard( data:any, contentFirst?:boolean, bottomStatus?:boolean, halfCircleIcon?:boolean, className?:string) {
  const [didViewCountUp, setDidViewCountUp] = useState(false);

  const router = useRouter();
  useEffect(() => {
    setDidViewCountUp(true);
  }, [router]);

  contentFirst = data.contentFirst;
  bottomStatus = data.bottomStatus;
  halfCircleIcon = data.halfCircleIcon;

  interface Data {
    type: string;
    icon: string;
    label: string;
    total: string;
    status: string;
    statusRate: string;
    dataPeriod: string;
    suffix: string;
    prefix: string;
    decimals: number;
    statusColor: string;
    separator: string;
  }

  const { type, icon, label, total, status, statusRate, dataPeriod, suffix, prefix, decimals, statusColor, separator }:Data = data.data;
  const totalNumber = Number(total);

  return (
    <div className={className}>
      <div
        className={
          halfCircleIcon
            ? 'p-[25px] bg-white dark:bg-white/10 rounded-10 relative text-[15px] text-theme-gray dark:text-white/60 leading-6'
            : 'p-[25px] bg-white dark:bg-white/10 rounded-10 relative text-[15px] text-theme-gray dark:text-white/60 leading-6'
        }
      >
        <div className="flex justify-between">
          <div
            className={
              contentFirst
                ? `flex items-center justify-center order-2 bg-${type}-transparent text-${type} w-[58px] h-[58px] rounded-2xl`
                : `flex items-center justify-center bg-${type}-transparent text-${type} w-[58px] h-[58px] rounded-2xl`
            }
          >
            <ReactSVG
              className={`fill-${type} w-[25px] h-[25px] svg-w-full [&>div>svg]:w-full [&>div>svg]:h-full flex items-center`}
              src={`/hexadash-nextjs/img/icon/${icon}`}
            />
          </div>
          <div className={contentFirst ? '' : 'text-end'}>
            {halfCircleIcon ? (
              <>
                <span className="text-sm font-normal text-body dark:text-white/60">{label}</span>
                <h4 className="mb-0 text-3xl lg:text-[26px] sm:text-2xl font-semibold leading-normal text-dark dark:text-white/[.87]">
                  <CountUp
                    start={0}
                    end={didViewCountUp ? totalNumber : 0}
                    suffix={suffix}
                    prefix={prefix}
                    delay={0.5}
                    decimals={decimals}
                    separator={separator}
                    duration={2}
                  />
                </h4>
              </>
            ) : (
              <>
                <h4 className="mb-0 text-3xl lg:text-[26px] sm:text-2xl font-semibold leading-normal text-dark dark:text-white/[.87]">
                  <CountUp
                    start={0}
                    end={didViewCountUp ? totalNumber : 0}
                    suffix={suffix}
                    prefix={prefix}
                    delay={0.5}
                    decimals={decimals}
                    separator={separator}
                    duration={2}
                  />
                </h4>
                <span className="font-normal text-body dark:text-white/60 text-15">{label}</span>
              </>
            )}
          </div>
        </div>
        
        {bottomStatus ? (
          <div className="mt-3">
            <span className="inline-flex items-center w-full h-11 bg-gray-50 dark:bg-white/[.06]  px-2.5 rounded-lg">
              <span className={`flex items-center text-sm font-medium text-${statusColor}`}>
                {status === 'growth' ? <UilArrowUp className="w-5 h-5" /> : <UilArrowDown className="w-5 h-5" />}
                {statusRate}%
              </span>
              <span className="ltr:ml-2.5 rtl:mr-2.5 text-light dark:text-white/60 text-sm">{dataPeriod}</span>
            </span>
          </div>
        ) : (
          ''
        )}
        
      </div>
    </div>
  );
}

export default OverviewCard;
