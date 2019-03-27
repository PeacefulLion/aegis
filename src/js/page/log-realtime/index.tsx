import * as React from 'react';
import LogTable from '../../component/logTableRT';
import { realtimeLogs, SummitOptions } from '../../hook/index';
import './index.less';
import QueryForm from '../../component/queryFormRT';

export default function Log() {
    const [logs, listenLogs, stopLogs] = realtimeLogs([]);

    async function handlerSumbit(opts: SummitOptions,isListenning: boolean) {
        if (isListenning) {
            stopLogs();
        } else {
            listenLogs(opts: SummitOptions);
        }
    }

    return (
        <div>
            <QueryForm onSummit={handlerSumbit}></QueryForm>
            <LogTable logs={logs} />
        </div>
    )
}
