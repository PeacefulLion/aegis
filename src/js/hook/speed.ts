import * as React from 'react';
import api from '../common/api';
import { speed } from './common';

const {
    useState,
    useEffect
} = React;


export interface SummitOptions {
    id: number
    date: any,
    index: number,
    type: string,
    url: string,
    timeGranularity: string
}


export function useSpeed(value: speed[]): [speed[], Function, (opts: SummitOptions) => Promise<speed[]>, string] {
    const [speed, setSpeed] = useState(value);
    const [timeGranularity, setTimeGranularity] = useState('');
    async function getSpeed(opts: SummitOptions) {
        const {
            id,
            date,
            type,
            url,
            timeGranularity
        } = opts;
        setTimeGranularity(timeGranularity);
        const data = await api({
            method: 'GET',
            url: `speed/${id}/${type}`,
            params: {
                startDate: date.startDate,
                endDate: date.endDate,
                url: encodeURIComponent(url)
            }
        }) as any
        setSpeed(data);
        return data;
    }

    return [speed, setSpeed, getSpeed, timeGranularity];
}