import * as React from 'react';
import LogTable from '../../component/offlineTable';
import {useOfflineLogs} from '../../hook/offlineLogs';
import QueryForm from '../../component/queryFormOffline';

import './index.less';

export default function Log() {
    const [logs, setLogs, getLogs] = useOfflineLogs([]);

    return (
        <div>
            <QueryForm onSummit={getLogs}></QueryForm>
            <LogTable logs={logs}/>
        </div>
    )
}
