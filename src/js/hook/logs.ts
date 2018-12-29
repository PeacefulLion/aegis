import * as React from 'react';;
import dayjs from 'dayjs';
import api from '../common/api';
import { Up, getDevice } from '../common/device';
import Log from '../page/historylog';
import logType from '../common/const/logType';
import { platform } from 'os';

const {
    useState,
    useEffect
} = React;

export interface Log {
    uin: number | string,
    userAgent: string,
    date: number,
    all: string,
    msg: string,
    ip: string,
    level: logType,
    from: string,
    rowNum?: number,
    colNum?: number,
}

export interface FormatLog extends Log{
    platform: Icon[],
    appIcon: Icon[],
    time: string
    device: any
}

export interface Icon {
    name: string,
    version: string | null | boolean
}

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

function formatLog(log: Log): FormatLog {
    const device = getDevice(log.userAgent);

    const formatLog: FormatLog = Object.assign({
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        uin: (log.uin || isNaN(log.uin as number) ? '-' : log.uin),
        device,
        appIcon: [],
        platform: []
    }, log);

    ['android', 'ios', 'windows'].forEach((name) => {
        if(device[name + 'Version']) {
            formatLog.platform.push({
                name,
                version: device[name + 'Version']
            });
        }
    });

    ['qq', 'wechat', 'now', 'huayang', 'qzone', 
    'pcQQBrowser', 'qqcomic', 'weibo', 'yyb', 'sougou',
    'maxthon', '360', 'edge', 'chrome', 'firefox', 'safari'].forEach((name) => {
        if(device['is' + Up(name)]) {
            formatLog.appIcon.push({
                name,
                version: device[name + 'Version']
            });
        }
    });

    return formatLog;
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

        const data: Log[] = await api.get('//badjs2.ivweb.io/controller/logAction/queryLogList.do', {
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
