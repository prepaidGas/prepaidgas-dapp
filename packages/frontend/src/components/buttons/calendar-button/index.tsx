import { DateRangePickerOne } from '@/components/datePicker';
import { UilCalender } from '@iconscout/react-unicons';
import { Buttons } from '@/components/buttons';
import PopOver from '@/components/popup';

function CalendarButtonPageHeader() {
  const content = <DateRangePickerOne />;

  return (
    <PopOver placement="bottomRight" title="Search by Calendar" content={content} action="hover">
      <Buttons
        className="text-[14px] font-medium border-none leading-[22px] dark:bg-white/10 text-theme-gray dark:text-white/60 dark:focus:text-dark dark:hover:text-dark inline-flex items-center justify-center rounded-[4px] px-[20px] h-[34px] gap-[8px]"
        size="small"
        type="white"
      >
        <UilCalender className="w-[14px] h-[14px] text-primary" />
        Calendar
      </Buttons>
    </PopOver>
  );
}

export { CalendarButtonPageHeader };
