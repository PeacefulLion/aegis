import * as React from 'react';
import api from '../common/api';
import {formatLog, FormatLog, Log} from './common';

const {
    useState,
} = React;

export interface ApiResult {
    item: Log[]
}

export interface SummitOptions {
    id: number,
    fileId: string
}

export function useOfflineLogs(value: FormatLog[]): [FormatLog[], Function, (opts: SummitOptions) => Promise<FormatLog[]>] {
    const [logs, setLogs] = useState(value);

    async function getLogs(opts: SummitOptions) {
        const {
            id,
            fileId
        } = opts;

        let data = await api.get(`//${location.host}/controller/logAction/showOfflineLog.do`, {
            params: {
                id,
                fileId
            }
        }) as any;
        try {
            data = JSON.parse(data);
        } catch (e) {
            setLogs([]);
            return []
        }

        const {logs, userAgent} = data;
        const formatLogs = logs.map((item) => {
            return formatLog(Object.assign(item, {userAgent}));
        });

        setLogs(formatLogs);

        return formatLogs;
    }

    return [logs, setLogs, getLogs];
}
