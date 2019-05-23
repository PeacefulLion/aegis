import * as React from 'react';
import api from '../common/api';
import { dailyStatic } from './common';
import {} from './'

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

export function useStatics(value: dailyStatic[]): [dailyStatic[], Function, (opts: SummitOptions) => Promise<dailyStatic[]>, any] {
    const [statics, setStatics] = useState(value);
    const [overview, setOverview] = useState({
        badjscount: 0,
        pv: 0,
        rate: '0'
    });
    async function getStatics(opts: SummitOptions) {
        const {
            id,
            date
        } = opts;
        const getDetail = api({
            method: 'GET',
            url: '/controller/statisticsAction/queryById.do',
            params: {
                projectId: id,
                startDate: date
            }
        }) as any;
        const getOverview = api({
            method: 'GET',
            url: '/controller/statisticsAction/getRate.do',
            params: {
                badjsid: id,
                date: date
            }
        }).catch(err => {
            console.log('err');
            console.log(err);
            return err;
        })
        const [detailRes, overviewRes] = await Promise.all([getDetail, getOverview]);
        console.log(overviewRes);
        const content = detailRes[0] && detailRes[0].content;
        setStatics(content);
        setOverview(overviewRes[0]);
        return content;
    }

    return [statics, setStatics, getStatics, overview];
}