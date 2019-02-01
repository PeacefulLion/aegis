import * as React from 'react';;
import LogTable from '../../component/logTable';
import { useLogs } from '../../hook/logs';

import './index.less';
import QueryForm from '../../component/queryForm';

export default function Log(props) {
    const [logs, setLogs, getLogs] = useLogs([]);

    return (
        <div>
            <QueryForm onSummit={getLogs}></QueryForm>
            <LogTable logs={logs} />
        </div>
    )
}
