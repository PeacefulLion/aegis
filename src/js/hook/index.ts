import * as React from 'react';;
import { Dayjs, unix } from 'dayjs';
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

function formatLog(log: Log) {
    const device = getDevice(log.userAgent);
    const formatLog: FormatLog = Object.assign({
        time: unix(log.date).format('YYYY-MM-DD HH:mm:ss'),
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
    // console.log('formatLog')
    // console.log(formatLog)
    return formatLog;
}

let keepAliveTimeoutId: NodeJS.Timeout;
let currentIndex;
let websocket: WebSocket;
const maxShow = 100;

export function realtimeLogs(value: Log[]) {
    const [logs, setLogs] = useState(value);

    function listenLogs(opts: SummitOptions) {

        const {include, exclude, level, id} = opts;
        var host = location.host;
        if (host.indexOf(':') < 0) {
            host += ':8081';
        }

        websocket = new WebSocket(`ws://${host}/ws/realtimeLog`);

        currentIndex = 0;
        websocket.onmessage = function(evt: any) {

            let data = JSON.parse(evt.data).message;
            if(!Array.isArray(data)) {
                data = [data]
            }

            let temp = logs;
            temp.push(data.map((item: Log) => {
                return formatLog(item);
            }));

            setLogs(temp);
        };

        websocket.onclose = function() {
            clearTimeout(keepAliveTimeoutId);
        };

        websocket.onopen = function() {

            websocket.send(JSON.stringify({
                type: "INIT",
                include,
                exclude,
                level,
                id
            }));

            keepAliveTimeoutId = setInterval(function() {
                websocket.send(JSON.stringify({
                    type: "KEEPALIVE"
                }));
            }, 5000);
        };
        console.log(`websocket`)
        console.log(websocket)
    }

    function stopLogs () {
        websocket.close();
    }

    return [logs, listenLogs, stopLogs];
}



