import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { Row, Col, DatePicker, DatePickerProps, TimeRangePickerProps } from 'antd'
import { PageHeaders } from '@/components/page-headers'
import { DateRangePickerOne, CustomDateRange } from '@/components/datePicker'

const { MonthPicker } = DatePicker
const dateFormat = 'YYYY/MM/DD'
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']

function DatePickers() {
    const PageRoutes = [
        {
            path: '/admin',
            breadcrumbName: 'Dashboard',
        },
        {
            path: '',
            breadcrumbName: 'Date Picker',
        },
    ]
    const [state, setState]: any = useState({
        date: null,
        dateString: null,
    })

    const { RangePicker } = DatePicker
    const onChangeBasic: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString)
    }

    const onChangePreset = (date: Dayjs) => {
        if (date) {
            console.log('Date: ', date)
        } else {
            console.log('Clear')
        }
    }
    const onRangeChange = (
        dates: null | (Dayjs | null)[],
        dateStrings: string[]
    ) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', dates[1])
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
        } else {
            console.log('Clear')
        }
    }

    const rangePresets: TimeRangePickerProps['presets'] = [
        { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
        { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
        { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
        { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
    ]

    return (
        <>
            <PageHeaders
                className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
                title="Date Picker"
                routes={PageRoutes}
            />
            <>
                <div className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
                    <Row gutter={25}>
                        <Col md={12} xs={24}>
                            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                        Basic
                                    </h1>
                                </div>
                                <div className="flex flex-wrap gap-y-[20px] flex-col w-full p-[25px]">
                                    <DatePicker onChange={onChangeBasic} />
                                    <DatePicker
                                        onChange={onChangeBasic}
                                        picker="week"
                                    />
                                    <DatePicker
                                        onChange={onChangeBasic}
                                        picker="month"
                                    />
                                </div>
                            </div>

                            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                        Date Format
                                    </h1>
                                </div>
                                <div className="flex flex-wrap gap-y-[20px] flex-col w-full p-[25px]">
                                    <DatePicker
                                        defaultValue={dayjs(
                                            '2015-06-06',
                                            dateFormat
                                        )}
                                        disabled
                                    />
                                    <DatePicker
                                        defaultValue={dayjs(
                                            '2015-06-06',
                                            dateFormatList
                                        )}
                                        disabled
                                    />
                                    <MonthPicker
                                        defaultValue={dayjs(
                                            '2015-06',
                                            'YYYY-MM'
                                        )}
                                        disabled
                                    />
                                    <RangePicker
                                        defaultValue={[
                                            dayjs('2019-09-03', dateFormat),
                                            dayjs('2019-11-22', dateFormat),
                                        ]}
                                        disabled={[false, true]}
                                    />
                                </div>
                            </div>

                            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                        Disabled
                                    </h1>
                                </div>
                                <div className="flex flex-wrap gap-y-[20px] flex-col w-full p-[25px]">
                                    <DatePicker
                                        defaultValue={dayjs(
                                            '2015-06-06',
                                            dateFormat
                                        )}
                                        disabled
                                    />
                                    <MonthPicker
                                        defaultValue={dayjs(
                                            '2015-06',
                                            'YYYY-MM'
                                        )}
                                        disabled
                                    />
                                    <RangePicker
                                        defaultValue={[
                                            dayjs('2019-09-03', dateFormat),
                                            dayjs('2019-11-22', dateFormat),
                                        ]}
                                        disabled={[false, true]}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col md={12} xs={24}>
                            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                        Preset Ranges
                                    </h1>
                                </div>
                                <div className="flex flex-wrap gap-y-[20px] flex-col w-full p-[25px]">
                                    <DatePicker
                                        presets={[
                                            {
                                                label: 'Yesterday',
                                                value: dayjs().add(-1, 'd'),
                                            },
                                            {
                                                label: 'Last Week',
                                                value: dayjs().add(-7, 'd'),
                                            },
                                            {
                                                label: 'Last Month',
                                                value: dayjs().add(-1, 'month'),
                                            },
                                        ]}
                                        onChange={(date) => {
                                            if (date) {
                                                onChangePreset(date);
                                            }
                                        }}
                                    />
                                    <RangePicker
                                        presets={rangePresets}
                                        onChange={onRangeChange}
                                    />
                                    <RangePicker
                                        presets={[
                                            {
                                                label: (
                                                    <span aria-label="Current Time to End of Day">
                                                        Now ~ EOD
                                                    </span>
                                                ),
                                                value: () => [
                                                    dayjs(),
                                                    dayjs().endOf('day'),
                                                ], // 5.8.0+ support function
                                            },
                                            ...rangePresets,
                                        ]}
                                        showTime
                                        format="YYYY/MM/DD HH:mm:ss"
                                        onChange={onRangeChange}
                                    />
                                </div>
                            </div>

                            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                                <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                    <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                        Extra Footer
                                    </h1>
                                </div>
                                <div className="flex flex-wrap gap-y-[20px] flex-col w-full p-[25px]">
                                    <DatePicker
                                        renderExtraFooter={() => 'extra footer'}
                                    />
                                    <DatePicker
                                        renderExtraFooter={() => 'extra footer'}
                                        showTime
                                    />
                                    <RangePicker
                                        renderExtraFooter={() => 'extra footer'}
                                    />
                                    <RangePicker
                                        renderExtraFooter={() => 'extra footer'}
                                        showTime
                                    />
                                    <DatePicker
                                        renderExtraFooter={() => 'extra footer'}
                                        picker="month"
                                    />
                                </div>
                            </div>
                        </Col>

                        <Col lg={12} md={24}>
                            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                                <div className="h-[60px] px-[25px]">
                                    <h1 className="mb-0 inline-block text-dark dark:text-white/[.87] font-medium text-[17px] pt-[16px] overflow-hidden whitespace-nowrap text-ellipsis">
                                        Date Range
                                    </h1>
                                    <p className="text-theme-gray dark:text-white/60">
                                        Custom Date Range
                                    </p>
                                </div>
                                <div className="p-[25px]">
                                    <CustomDateRange />
                                </div>
                            </div>
                        </Col>
                        <Col xxl={16} xs={24}>
                            <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                                <div className="h-[60px] px-[25px]">
                                    <h1 className="mb-0 inline-block text-dark dark:text-white/[.87] font-medium text-[17px] pt-[16px] overflow-hidden whitespace-nowrap text-ellipsis">
                                        Date Range
                                    </h1>
                                    <p className="text-theme-gray dark:text-white/60">
                                        The simplest use of Date picker
                                    </p>
                                </div>
                                <div className="p-[25px]">
                                    <DateRangePickerOne />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </>
        </>
    )
}

export default DatePickers
