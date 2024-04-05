import React, { useState } from 'react';
import { DatePicker } from 'antd';
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Buttons } from '../buttons';

function DateRangePickerOne() {
  const [state, setState] = useState({
    datePickerInternational: null,
    dateRangePicker: {
      selection: {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection',
      },
    },
  });

  const handleRangeChange = (which:any) => {
    setState({
      ...state,
      dateRangePicker: {
        ...state.dateRangePicker,
        ...which,
      },
    });
  };

  const { dateRangePicker } = state;
  const start = dateRangePicker.selection.startDate.toString().split(' ');
  const end = dateRangePicker.selection.endDate.toString().split(' ');

  return (
    <>
      <DateRangePicker
        onChange={handleRangeChange}
        // showSelectionPreview
        moveRangeOnFirstSelection={false}
        className="PreviewArea [&+div]:mb-0 inline-flex md:max-h-[300px] md:overflow-x-hidden md:overflow-y-auto"
        months={2}
        ranges={[dateRangePicker.selection]}
        direction="horizontal"
      />

      <div className="border-t border-regular dark:border-white/10 p-[10px] flex items-center flex-wrap justify-end gap-[8px]">
        <p className="text-[13px] ltr:mr-[12px] rtl:ml-[12px] font-medium mb-0">{`${start[1]} ${start[2]} ${start[3]} - ${end[1]} ${end[2]} ${end[3]}`}</p>
        <Buttons size="small" type="primary" className="h-[32px] inline-flex items-center px-[13px] text-[12px]">
          Apply
        </Buttons>
        <Buttons
          size="small"
          type="white"
          className="bg-transparent dark:text-white/60 dark:border-white/10 h-[32px] inline-flex items-center px-[13px] text-[12px]"
          outlined
        >
          Cancel
        </Buttons>
      </div>
    </>
  );
}

class CustomDateRange extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
  };

  disabledStartDate = (startValue:any) => {
    const { endValue }:any = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = (endValue:any) => {
    const { startValue }:any = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field:any, value:any) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = (value:any) => {
    this.onChange('startValue', value);
  };

  onEndChange = (value:any) => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = (open:any) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = (open:any) => {
    this.setState({ endOpen: open });
  };

  render() {
    const { startValue, endValue, endOpen } = this.state;

    return (
      <div>
        <DatePicker
          disabledDate={this.disabledStartDate}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={startValue}
          placeholder="Start"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
          style={{ margin: '5px' }}
        />

        <DatePicker
          disabledDate={this.disabledEndDate}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={endValue}
          placeholder="End"
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
          style={{ margin: '5px' }}
        />
      </div>
    );
  }
}

export { DateRangePickerOne, CustomDateRange };
