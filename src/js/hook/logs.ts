import * as React from 'react';
import api from '../common/api';
import logType from '../common/const/logType';
import {formatLog, FormatLog, Log} from './common';

const {
    useState,
    useEffect
} = React;

export interface ApiResult {
    item: Log[]
}

export interface SummitOptions {
    id: number
    include: string[],
    exclude: string[],
    startDate: number,
    endDate: number
    index: number,
    level: logType[]
}

export interface getSMInfoOptions {
    name: string,
}

export function useLogs(value: FormatLog[]): [FormatLog[], Function, (opts: SummitOptions) => Promise<FormatLog[]>, number] {
    const [logs, setLogs] = useState(value);
    const [logKey, setLogKey] = useState(Date.now());

    async function getLogs(opts: SummitOptions) {
        const {
            id,
            startDate,
            endDate,
            include,
            exclude,
            index = 0,
            level = [1, 2, 4]
        } = opts;

        const data = await api({
            method: 'GET',
            url: '/controller/logAction/queryLogList.do',
            params: {
                id,
                startDate,
                endDate,
                _t: Date.now(),
                include,
                exclude,
                index,
                level
            }
        }) as any;

        const formatLogs = data.map((item) => {
            return formatLog(item);
        });

        setLogs(formatLogs);
        setLogKey(Date.now());
        return formatLogs;
    }

    return [logs, setLogs, getLogs, logKey];
}

export function useLogsPool(logs) {
    const [point, setPoint] = useState(30);
    const [pool, setPool] = useState(logs);

    useEffect(() => {
        setPool(logs);
    }, [logs]);

    const [isEnd, setIsEnd] = useState(false);


    function resetPool() {
        setPoint(0);
        setPool([]);
        setIsEnd(false);
    }

    function getMore(num) {
        if(point + num >= pool.length) {
            setIsEnd(true);
            setPoint(pool.length);
        } else {
            setPoint(point + num);
        }
    }

    return {
        logsPool: pool.slice(0, point),
        getMore,
        resetPool,
        isEnd
    }
}

export function useSMInfos(value: any): [any, Function, (opts: getSMInfoOptions) => Promise<any>]{
    const [SMInfos, setSMInfos] = useState(value);

    async function getSMInfos(opts: getSMInfoOptions) {
        const {
            name
        } = opts;

        const data = await api({
            method: 'GET',
            url: '/controller/sourcemapAction/query.do',
            params: {
                name
            }
        }) as any;
        setSMInfos(data);

        return data;
    }

    return [SMInfos, getSMInfos];
}
