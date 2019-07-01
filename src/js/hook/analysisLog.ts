import { useState, useEffect } from 'react';
import { FormatLog } from './common';
import { platform } from 'os';
import provinceData from '../common/data/province';
// 计数器
function _counter(obj: object, type: string) {
    if(obj[type]) {
        obj[type].count += 1;
    } else {
        obj[type] = {
            subItem: {},
            count: 1,
            percentage: 0
        };
    }

    return obj[type];
}

// 计算百分比
function _percentage(obj, total) {
    Object.keys(obj).forEach((name) => {
        const item = obj[name];
        item.percentage = item.count / total;

        if(item.subItem) {
            _percentage(item.subItem, total);
        }
    });
}

export interface analysisItem {
    [key: string]: {
        subItem?: analysisItem,
        count: number,
        percentage: number
    }
}

export interface analysisLog {
    appData: analysisItem
    platformData: analysisItem
    webviewData: analysisItem
    ispData: analysisItem
    mapData: analysisItem
}

export function useAnalysisLog(sourceLog: FormatLog[]): analysisLog {
    const appData = {};
    const platformData = {};
    const webviewData = {};
    const ispData = {};
    const mapData = {};

    // const [log, setLog] = useState({
    //     appVersionCountMap,
    //     platformCountMap,
    //     webviewCountMap
    // });
    sourceLog.forEach((_sourcelog) => {
        const {
            webview,
            platform,
            appIcon
        } = _sourcelog;
        if (_sourcelog.region) {
            _counter(mapData, _sourcelog.region && _sourcelog.region.city);
            _counter(ispData, _sourcelog.region && _sourcelog.region.isp);
        }

        webview.forEach((webviewType) => {
            _counter(webviewData, webviewType);
        });

        appIcon.forEach(({name, version}) => {
            _counter(appData, name);
            _counter(appData[name].subItem, version as string);
        });

        platform.forEach(({name, version}) => {
            _counter(platformData, name);
            _counter(platformData[name].subItem, version.toString());
        });
    });

    _percentage(appData, sourceLog.length);
    _percentage(platformData, sourceLog.length);
    _percentage(webviewData, sourceLog.length);


    // setLog({
    //     appVersionCountMap,
    //     platformCountMap,
    //     webviewCountMap
    // });

    return {
        appData,
        platformData,
        webviewData,
        ispData,
        mapData
    }
}