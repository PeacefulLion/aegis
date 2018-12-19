import React, { forwardRef, useRef, useState, useImperativeMethods } from 'react';
import { DatePicker, Divider, Input, Layout, InputNumber } from 'antd';
import moment from 'moment';

import './index.less';

const MAX_YEAR = new Date().getFullYear() + 1;
const MIN_YEAR = new Date().getFullYear() - 1;

function DateInput(props, ref) {
    const {
        date
    } = props;

    const wrapRef = useRef();

    const [year, setYear] = useState(date.get('year'));

    const [month, setMonth] = useState(date.get('month'));

    const [day, setDay] = useState(date.get('date'));

    const [hour, setHour] = useState(date.get('hour'));

    const [minute, setMinute] = useState(date.get('minute'));

    useImperativeMethods(ref, () => {
        return {
            getTime: () => {
                return moment({
                    year,
                    month,
                    day,
                    hour,
                    minute,
                }); 
            }
        }
    });

    return (
        <div ref={wrapRef}>
            <InputNumber className="ward-dateinput-year" max={MAX_YEAR} min={MIN_YEAR} onChange={setYear} value={year}></InputNumber>年
            <InputNumber className="ward-dateinput" max={12} min={1} onChange={setMonth} value={month + 1}></InputNumber>月
            <InputNumber className="ward-dateinput" max={31} min={1} onChange={setDay} value={day}></InputNumber>日
            <InputNumber className="ward-dateinput" max={23} min={0} onChange={setHour} value={hour}></InputNumber>时
            <InputNumber className="ward-dateinput" max={59} min={0} onChange={setMinute} value={minute}></InputNumber>分
        </div>
    )
}

const DateInput = forwardRef(DateInput);

function RangeDateInput(props, ref) {
    const {
        start = moment().add(-1, 'hour'),
        end = moment()
    } = props;

    const startDateRef = useRef();

    const endDateRef = useRef();
    
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
            日志开始时间<DateInput ref={startDateRef} date={start}/>
            日志结束时间<DateInput ref={endDateRef} date={end}/>
        </div>
    )
}

const RangeDateInput = forwardRef(RangeDateInput);

export {
    RangeDateInput,
    DateInput
};