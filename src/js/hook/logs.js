import React, {useState, useEffect } from 'react';
import moment from 'moment';
import api from '../common/api';
import Device, { Up } from '../common/device';
import Log from '../page/historylog';

function formatLog(log) {
    log.time = moment(log.date).format('YYYY-MM-DD HH:mm:ss');

    const device = new Device(log.userAgent);
    const data = log.all.split(';');

    log.uin = log.uin || isNaN(log.uin) ? '-' : log.uin;
    log.device = device;

    log.platform = [];
    
    ['android', 'ios', 'windows'].forEach((name) => {
        if(device['is' + Up(name)]) {
            log.platform.push({
                name,
                version: device[name + 'Version']
            });
        }
    });

    log.appIcon = [];

    ['qq', 'wechat', 'now', 'huayang', 'qzone', 
    'pcQQBrowser', 'qqcomic', 'weibo', 'yyb', 'sougou',
    'maxthon', '360', 'edge', 'chrome', 'firefox', 'safari'].forEach((name) => {
        if(device['is' + Up(name)]) {
            log.appIcon.push({
                name,
                version: device[name + 'Version']
            });
        }
    });

    return log;
}

export function useLogs() {
    const [logs, setLogs] = useState([]);

    function getLogs(opts) {
        const {
            id,
            startDate,
            endDate,
            include,
            exclude,
            index = 0,
            level = [1,2,4]    
        } = opts;
        
        api.get('//badjs2.ivweb.io/controller/logAction/queryLogList.do', {
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
        })
        .then((data) => {
            setLogs(data.map((item) => {
                return formatLog(item);
            }));
        })
    }

    return [logs, setLogs, getLogs];
}