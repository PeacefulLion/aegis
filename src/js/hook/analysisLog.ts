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

        webview.forEach((webviewType) => {
            _counter(webviewData, webviewType);
        });

        appIcon.forEach(({name, version}) => {
            _counter(appData, name);
            _counter(appData[name].subItem, version as string);
        });

        platform.forEach(({name, version}) => {
            _counter(platformData, name);
            _counter(platformData[name].subItem, version as string);
        });
    });

    _percentage(appData, sourceLog.length);
    _percentage(platformData, sourceLog.length);
    _percentage(webviewData, sourceLog.length);

    const totalLogCount = sourceLog.length;
    
    let ispMockData = [50863066, 63482811, 36441033, 31192838, 2102244, 361293, 152818, 35225, 8552, 2130, 595]; // 真实数据分布

    // 随机产生 10% 以内正负 的波动
    ispMockData = ispMockData.map((num) => {
        return Math.floor(num * ( 1 -  (Math.random() - 0.5) * 0.1));
    });

    const mockDataTotal = ispMockData.reduce((prev, next) => prev + next, 0);
    // 根据 countlength 修正

    ispMockData = ispMockData.map((num) => {
        return Math.floor(num / mockDataTotal * totalLogCount);
    });

    ['电信', '移动', '联通', '长城宽带', '铁通', '天威', '教育', '方正宽带', '歌华有限', '东方有线'].forEach((name, index) => {
        ispData[name] = {
            count: ispMockData[index],
            percentage: (ispMockData[index] / sourceLog.length)
        }
    });

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