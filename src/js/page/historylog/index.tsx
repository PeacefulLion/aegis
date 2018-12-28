import * as React from 'react';;
import LogTable from '../../component/logTable';
import { useLogs } from '../../hook/logs';

import './index.less';
import QueryForm from '../../component/queryForm';

export default function Log() {
    const [logs, setLogs, getLogs] = useLogs([]);

    async function handlerSumbit(opts) {
        await getLogs(opts);
    }

    return (
        <div>
            <QueryForm onSummit={handlerSumbit}></QueryForm>
            <LogTable logs={logs} />
        </div>
    )
}
