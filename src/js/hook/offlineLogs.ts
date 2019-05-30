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
    order: number, // 1: 逆序; -1: 正序
    fileId: string,
    include: string[],
    exclude: string[]
}

export function useOfflineLogs(value: FormatLog[]): [FormatLog[], Function, (opts: SummitOptions) => Promise<FormatLog[]>] {
    const [logs, setLogs] = useState(value);

    async function getLogs(opts: SummitOptions) {
        const {
            id,
            fileId,
            include,
            exclude,
            order = -1 // 默认降序排列
        } = opts;
        window.scroll(0, 0);

        const startTime = new Date().getTime();
        let data = await api.get(`//${location.host}/controller/logAction/showOfflineLog.do`, {
            params: {
                id,
                fileId
            }
        }) as any;
        console.log('api请求结束：', new Date().getTime() - startTime);
        try {
            data = JSON.parse(data);
            console.log('JSON解析完毕：', new Date().getTime() - startTime);
        } catch (e) {
            setLogs([]);
            return []
        }

        function exist(content, keyword) {
            return content.indexOf(keyword) !== -1;
        }

        let {logs, userAgent} = data;
        if (include.length > 0) {
            logs = logs.filter(log => include.every(tag => exist(log.msg, tag)));
        }
        if (exclude.length > 0) {
            logs = logs.filter(log => !exclude.some(tag => exist(log.msg, tag)));
        }
        logs = logs.sort((p, n) => {
            return order * (p.time - n.time);
        });
        const formatLogs = logs.map((item, index) => {
            return formatLog(Object.assign(item, {userAgent, index}));
        });
        console.log('format结束', new Date().getTime() - startTime);
        setLogs(formatLogs);
        console.log('dom渲染完毕', new Date().getTime() - startTime);
        return formatLogs;
    }

    return [logs, setLogs, getLogs];
}
