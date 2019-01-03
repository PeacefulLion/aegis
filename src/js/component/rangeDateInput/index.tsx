import * as React from 'react';
import dayjs from 'dayjs';
import InputNumber from 'antd/lib/input-number';

import './index.less';

const {
    forwardRef, useRef, useState, useImperativeMethods
} = React;

const MAX_YEAR = new Date().getFullYear() + 1;
const MIN_YEAR = new Date().getFullYear() - 1;

interface DateInputProps {
    time: dayjs.Dayjs
}


function useNumberState(value: number): [number, (n: any) => void] {
    const [n, setN] = useState(value);

    function setNumberHook(n: any) {
        setN(+n); // 强制转化
    }

    return [n, setNumberHook];
}

export const DateInput = forwardRef(function (props: DateInputProps, ref) {
    const {
        time
    } = props;

    const wrapRef = useRef(null);

    const [year, setYear] = useNumberState(time.year());
    const [month, setMonth] = useNumberState(time.month());
    const [date, setDate] = useNumberState(time.date());
    const [hour, setHour] = useNumberState(time.hour());
    const [minute, setMinute] = useNumberState(time.minute());

    useImperativeMethods(ref, () => {
        return {
            getTime: () => {
                return dayjs(new Date(year, month, date, hour, minute)); 
            }
        }
    });

    return (
        <div ref={wrapRef}>
            <InputNumber className="ward-dateinput-year" max={MAX_YEAR} min={MIN_YEAR} onChange={setYear} value={year}></InputNumber>年
            <InputNumber className="ward-dateinput" max={12} min={1} onChange={setMonth} value={month + 1}></InputNumber>月
            <InputNumber className="ward-dateinput" max={31} min={1} onChange={setDate} value={date}></InputNumber>日
            <InputNumber className="ward-dateinput" max={23} min={0} onChange={setHour} value={hour}></InputNumber>时
            <InputNumber className="ward-dateinput" max={59} min={0} onChange={setMinute} value={minute}></InputNumber>分
        </div>
    )
});

interface RangeDateInputProps {
    start: dayjs.Dayjs,
    end: dayjs.Dayjs
}

export const RangeDateInput = forwardRef(function (props: RangeDateInputProps, ref) {
    const {
        start = dayjs().add(-1, 'hour'),
        end = dayjs()
    } = props;

    const startDateRef: any = useRef(null);
    const endDateRef: any = useRef(null);
    
    useImperativeMethods(ref, () => {
        return {
            getTime: () => {
                return {
                    startTime: startDateRef.current.getTime(),
                    endTime: endDateRef.current.getTime()
                }

            }
        }
    });

    return ( 
        <div>
            日志开始时间<DateInput ref={startDateRef} time={start}/>
            日志结束时间<DateInput ref={endDateRef} time={end}/>
        </div>
    )
});
