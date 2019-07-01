import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useAnalysisLog, analysisItem } from '../../hook/analysisLog';
import { FormatLog } from '../../hook/common';
import { Icon } from 'antd';
import * as echarts from 'echarts';
import { getAppEchartsConfig, getPlatformEchartsConfig, getWebviewEchartsConfig, getISPEchartsConfig, getMapEchatsConfig } from './process-echarts-config';
import echartTheme from '../../common/data/echarts-theme';
import chinaMap from '../../common/data/china';

import './index.less';

echarts.registerTheme('westeros', echartTheme);
echarts.registerMap('china', chinaMap);

interface LogTableProps {
    logs: FormatLog[],
    showApp: boolean,
    showPlatform: boolean,
    showWebviewCore: boolean,
    showISP: boolean,
    showMap: boolean
}


export function DataTreeList(map: analysisItem) {
    return Object.keys(map).map((key) => {
        const item = map[key];
        const {
            count,
            percentage,
            subItem
        } = item;

        return (
            <div key={key}>
                {key}数量：{count}，百分比{(percentage * 100).toFixed(2)}%
                {
                    subItem ? DataTreeList(subItem) : null
                }
            </div>
        )
    });
}

// 感觉这个组件不应该用 hook 来写， 
export default function AnalysisPanel(props: LogTableProps) {
    const {
        logs,
        showApp,
        showPlatform,
        showWebviewCore,
        showISP,
        showMap
    } = props;

    const analysisResult = useAnalysisLog(logs);

    const $appChartsDom = useRef(null);
    const $platfromChartsDom = useRef(null);
    const $webviewChartsDom = useRef(null);
    const $ispChartsDom = useRef(null);
    const $mapChartsDom = useRef(null);

    // 没想到更好的方法来写这个, 对 useState 理解不够深， 这里申明这个 useState， 纯粹是为了监听变化
    // 从实验来看， 通过 props 得到的 init 值得改变，也会引起 effect，
    useState(showApp); 
    useEffect(() => {
        if(showApp) {
            const config = getAppEchartsConfig(analysisResult.appData);
            const charts = echarts.init($appChartsDom.current, 'westeros');
            charts.setOption(config);
        }

        return () => {
            if($appChartsDom.current) {
                const inst = echarts.getInstanceByDom($appChartsDom.current); // 销毁
                inst && inst.dispose();
            }
        }
    }, [showApp]);

    useState(showPlatform); 
    useEffect(() => {
        if(showPlatform) {
            const config = getPlatformEchartsConfig(analysisResult.platformData);
            const charts = echarts.init($platfromChartsDom.current, 'westeros');
            charts.setOption(config);
        }

        return () => {
            if($platfromChartsDom.current) {
                const inst = echarts.getInstanceByDom($platfromChartsDom.current); // 销毁
                inst && inst.dispose();
            }
        }
    }, [showPlatform]);

    useState(showWebviewCore); 
    useEffect(() => {
        if(showWebviewCore) {
            const config = getWebviewEchartsConfig(analysisResult.webviewData);
            const charts = echarts.init($webviewChartsDom.current, 'westeros');
            charts.setOption(config);
        }

        return () => {
            if($appChartsDom.current) {
                const inst = echarts.getInstanceByDom($webviewChartsDom.current); // 销毁
                inst && inst.dispose();
            }
        }
    }, [showWebviewCore]);

    useState(showISP); 
    useEffect(() => {
        if(showISP) {
            const config = getISPEchartsConfig(analysisResult.ispData);
            const charts = echarts.init($ispChartsDom.current, 'westeros');
            charts.setOption(config);
        }

        return () => {
            if($ispChartsDom.current) {
                const inst = echarts.getInstanceByDom($ispChartsDom.current); // 销毁
                inst && inst.dispose();
            }
        }
    }, [showISP]);


    useState(showMap);
    useEffect(() => {
        if(showMap) {
            const config = getMapEchatsConfig(analysisResult.mapData);
            const charts = echarts.init($mapChartsDom.current);
            charts.setOption(config);
        }

        return () => {
            if($mapChartsDom.current) {
                const inst = echarts.getInstanceByDom($mapChartsDom.current); // 销毁
                inst && inst.dispose();
            }
        }
    })

    return (
        <div className="analysispanel">
            <div>
                {   
                    showApp ? (
                        <div className="chartwrapper appchart" ref={$appChartsDom}></div>
                    ) : null
                }
                {   
                    showPlatform ? (
                        <div className="chartwrapper appchart" ref={$platfromChartsDom}></div>
                    ) : null
                }
                {
                    showWebviewCore ? (
                        <div className="chartwrapper appchart" ref={$webviewChartsDom}></div>
                    ) : null
                }
                {   
                    showISP ? (
                        <div className="chartwrapper appchart" ref={$ispChartsDom}></div>
                    ) : null
                }
                {   
                    showMap ? (
                        <div className="chartwrapper appchart" ref={$mapChartsDom}></div>                        
                    ) : null
                }
            </div>
        </div>
    )
}