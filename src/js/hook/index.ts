import * as React from 'react';
import logType from '../common/const/logType';
import {formatLog, Log} from './common';

const {useState} = React;

export interface SummitOptions {
    id: number
    include: string[],
    exclude: string[],
    startDate: number,
    endDate: number
    index: number,
    level: logType[]
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

        const wsPro = location.protocol === 'http:' ? 'ws:' : 'wss:';

        websocket = new WebSocket(`${wsPro}//${host}/ws/realtimeLog`);

        currentIndex = 0;
        websocket.onmessage = function (evt: any) {

            let data = JSON.parse(evt.data).message;

            let formatLogArray = formatLog(data);

            let temp = logs;
            temp.push(formatLogArray);

            setLogs(temp);
        };

        websocket.onclose = function () {
            clearTimeout(keepAliveTimeoutId);
        };

        websocket.onopen = function () {

            websocket.send(JSON.stringify({
                type: "INIT",
                include,
                exclude,
                level,
                id
            }));

            keepAliveTimeoutId = setInterval(function () {
                websocket.send(JSON.stringify({
                    type: "KEEPALIVE"
                }));
            }, 5000);
        };
        console.log(`websocket start`)
    }

    function stopLogs() {
        websocket.close();
        console.log(`websocket close`)
    }

    return [logs, listenLogs, stopLogs];
}



