import { speed } from '../../hook/common';
import * as echarts from 'echarts';

function getAvg(data: speed[], start: number, gap: number) {
    let totalTime = 0;
    if (!data[start + gap]) {
        return null;
    } 
    for (let i = 0; i < gap; i++) {
        totalTime += data[start + i].avg_time;
    }
    return totalTime / gap;
}
export function getSpeedConfig(data: speed[], timeGranularity: string) {
    let xAxisData = [];
    let formatData = [];
    switch (timeGranularity) {
        case '1分钟':
            data.forEach(item => {
                xAxisData.push(new Date(item.create_time).toLocaleString());
                formatData.push(item.avg_time);
            })
            break;
        case '5分钟':
            for (let i = 0; i < data.length; i = i + 5) {
                xAxisData.push(new Date(data[i].create_time).toLocaleString());
                formatData.push(getAvg(data, i, 5));
            }
            break;
        case '1小时':
            for (let i = 0; i < data.length; i = i + 60) {
                xAxisData.push(new Date(data[i].create_time).toLocaleString());
                formatData.push(getAvg(data, i, 60));
            }
            break;
        case '1天':
                for (let i = 0; i < data.length; i = i + (60 * 24)) {
                    xAxisData.push(new Date(data[i].create_time).toLocaleString());
                    formatData.push(getAvg(data, i, 60 * 24));
                }
            break;
        default:
            break;
    }
    return {
        backgroundColor: '#293042',
        grid: {
            left: 10,
            top: '10%',
            bottom: 20,
            right: 40,
            containLabel: true
        },
        tooltip: {
            show: true,
            backgroundColor: '#384157',
            borderColor: '#384157',
            borderWidth: 1,
            formatter: '{b}: {c}',
            extraCssText: 'box-shadow: 0 0 5px rgba(0, 0, 0, 1)'
        },
        legend: {
            right: 0,
            top: 0,
            data: ['时间'],
            textStyle: {
                color: '#5c6076'
            }
        },
        // title: {
        //     text: 'default',
        //     x: '4.5%',
        //     top: '1%',
        //     textStyle: {
        //         color: '#5c6076'
        //     }
        // },
        xAxis: {
            data: xAxisData,
            boundaryGap: false,
            axisLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#5c6076'
                }
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            ayisLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#5c6076'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#2e3547'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#384157'
                }
            }
        },

        series: [
            {
                type: 'line',
                name: 'linedemo',
                smooth: true,
                symbolSize: 10,
                animation: false,
                lineWidth: 1.2,
                hoverAnimation: false,
                data: formatData,
                symbol: 'circle',
                itemStyle: {
                    normal: {
                        color: '#1890FF',
                        shadowBlur: 40,
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#1890FF',
                            }
                        }
                    }
                },
                areaStyle: {
                    normal: {
                        color: '#1890FF',
                        opacity: 0.08
                    }
                }

            }
        ]
    };
}