import * as React from 'react';
import LogTable from '../../component/logTable';
import {useLogs} from '../../hook/logs';

import './index.less';
import QueryForm from '../../component/queryFormOffline';

export default function Log() {
    const [logs, setLogs, getLogs] = useLogs([]);

    return (
        <div>
            <QueryForm onSummit={getLogs}></QueryForm>
            <LogTable logs={logs}/>
        </div>
    )
}
