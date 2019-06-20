import * as React from 'react';
import api from '../common/api';
import { speed, speedType } from './common';

const {
    useState,
    useEffect
} = React;


export interface SummitOptions {
    id: number
    date: string,
    index: number,
    type: string
}


export function useUrlList(businessID: number, type: speedType, date: string ): [string[], string, Function] {
    const [urlList, setUrlList] = useState([]);
    const [url, setUrl] = useState('');
    useEffect(() => {
        (async () => {
            const data = await api({
                method: 'GET',
                url: `/api/speed/${businessID}/${type}/url`,
                params: {
                    date: date
                }
            }) as any
            setUrlList(data.map(item => item.url));
            setUrl(urlList && urlList[0]);
        })();
    }, [businessID]);

    return [urlList, url, setUrl];
}