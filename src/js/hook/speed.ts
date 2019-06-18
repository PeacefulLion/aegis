import * as React from 'react';
import api from '../common/api';
import { speed } from './common';

const {
    useState,
    useEffect
} = React;


export interface SummitOptions {
    id: number
    date: string,
    index: number,
    type: string,
    url: string
}


export function useSpeed(value: speed[]): [speed[], Function, (opts: SummitOptions) => Promise<speed[]>] {
    const [speed, setSpeed] = useState(value);
    async function getSpeed(opts: SummitOptions) {
        const {
            id,
            date,
            type,
            url
        } = opts;
        const data = await api({
            method: 'GET',
            url: `speed/${id}/${type}`,
            params: {
                startDate: date,
                url: encodeURIComponent(url)
            }
        }) as any
        setSpeed(data);
        return data;
    }

    return [speed, setSpeed, getSpeed];
}