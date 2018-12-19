import React, {useState, useEffect} from 'react';
import moment from 'moment';
import api from '../common/api';
import Device from '../common/device';

function formatLog(log) {
    log.time = moment(log.date).format('MM-DD HH:mm:ss');

    log.device = new Device(log.useAgent);

    return log;
}

export function useLogs() {
    const [logs, setLogs] = useState([]);

    async function getLogs(opts) {
        const {
            id,
            startDate,
            endDate,
            include,
            exclude,
            index = 0,
            level = [1, 2, 4]
        } = opts;

        const data = await api.get('//badjs2.ivweb.io/controller/logAction/queryLogList.do', {
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
        });
        setLogs(data.map((item) => {
            return formatLog(item);
        }));
    }

    return [logs, setLogs, getLogs];
}
