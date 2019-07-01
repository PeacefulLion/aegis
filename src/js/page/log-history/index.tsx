import * as React from 'react';
import LogTable from '../../component/logTable';
import { useLogs, useLogsPool } from '../../hook/logs';

import './index.less';
import QueryForm from '../../component/queryForm';

export default function Log(props) {
    const [logs, setLogs, getLogs, logKey ] = useLogs([]);

    const {
        logsPool,
        isEnd,
        getMore
    } = useLogsPool(logs);

    function loadMore() {
        getMore(40);
    }
    
    return (
        <div>
            <QueryForm onSummit={getLogs}></QueryForm>
            <LogTable key={logKey} logs={logsPool} allLogs={logs} isEnd={false} loadMore={loadMore} />
        </div>
    )
}
