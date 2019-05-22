import * as React from 'react';
import api from '../common/api';
import { dailyStatic } from './common';

const {
    useState,
    useEffect
} = React;


export interface SummitOptions {
    id: number
    date: string,
    index: number
}

export interface getSMInfoOptions {
    name: string,
}

export function useStatics(value: dailyStatic[]): [dailyStatic[], Function, (opts: SummitOptions) => Promise<dailyStatic[]>] {
    const [statics, setStatics] = useState(value);

    async function getStatics(opts: SummitOptions) {
        const {
            id,
            date
        } = opts;
        const data = await api({
            method: 'GET',
            url: '/controller/statisticsAction/queryById.do',
            params: {
                projectId: id,
                startDate: date
            }
        }) as any;

        const content = data[0] && data[0].content;
        setStatics(content);
        return content;
    }

    return [statics, setStatics, getStatics];
}