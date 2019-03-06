import * as React from 'react';
import api from '../common/api';
import logType from '../common/const/logType';
import {formatLog, FormatLog, Log} from './common';

const {
    useState
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


export function useLogs(value: FormatLog[]): [FormatLog[], Function, (opts: SummitOptions) => Promise<FormatLog[]>] {
    const [logs, setLogs] = useState(value);

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

        return formatLogs;
    }

    return [logs, setLogs, getLogs];
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
