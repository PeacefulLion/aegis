import logType from '../common/const/logType';
import {Up, getDevice} from '../common/device';
import dayjs from 'dayjs';

export interface Log {
    uin: number | string,
    userAgent: string,
    date: number,
    all: string,
    msg: string,
    ip: string,
    level: logType,
    from: string,
    version: number,
    rowNum?: number,
    colNum?: number,
    index: number,
    time: number
}

export interface speed {
    aegis_id: number,
    url: string,
    create_time: string,
    avg_time: number
}

export interface dailyStatic {
    title: string,
    total: number
}

export enum speedType {
    IMG = 'img',
    FETCH = 'fetch',
    SCRIPT = 'script'
}
export interface FormatLog extends Log {
    platform: Icon[],
    appIcon: Icon[],
    webview: string[],
    time: number,
    device: any,
    version: number,
    index: number,
    msg: string
}

export interface Icon {
    name: string,
    version: string | null | boolean
}

export function formatLog(log: Log): FormatLog {
    const device = getDevice(log.userAgent);
    const formatLog: FormatLog = Object.assign(log, {
        time: dayjs(log.time || log.date).format('YYYY-MM-DD HH:mm:ss'),
        uin: log.uin || '-',
        device,
        appIcon: [],
        platform: [],
        webview: [],
        version: log.version || 1,
        index: log.index
    });
    console.log(formatLog);
    ['android', 'iOS', 'windows'].forEach((name) => {
        if (device[name + 'Version']) {
            formatLog.platform.push({
                name,
                version: device[name + 'Version']
            });
        }
    });
    if (device.chromeVersion) {
        formatLog.webview.push('chrome:' + device.chromeVersion.toString());
    }
    ['qq', 'wechat', 'huayang', 'qzone',
        'pcQQBrowser', 'qqcomic', 'weibo', 'yyb', 'sougou', 'now', 'nowsdk',
        'maxthon', '360', 'edge', 'chrome', 'firefox', 'safari'].forEach((name) => {
        if (device['is' + Up(name)]) {
            formatLog.appIcon.push({
                name,
                version: device[name + 'Version']
            });
        }
    });

    ['UIWebview', 'WKWebview', 'X5'].forEach((name) => {
        if (device['is' + Up(name)]) {
            formatLog.webview.push(name);
        }
    });

    return formatLog;
}
