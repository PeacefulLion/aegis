// 计算表格需要使用的数据
import { useAnalysisLog, analysisItem } from '../../hook/analysisLog';

export function getAppEchartsConfig(appData: analysisItem) {
    const series = [{
        name: '数量',
        type: 'bar',
        data: []
    }];

    const xAxis = {
        data: []
    }
    Object.keys(appData).map((name) => {
        const item = appData[name];
        Object.keys(item.subItem).map((version) => {            
            const versionItem = item.subItem[version];

            xAxis.data.push(name + version);

            series[0].data.push(versionItem.count);
        });
    });

    return {
        title: {
            text: 'APP 分布情况'
        },
        tooltip: {},
        xAxis,
        yAxis: {},
        series,
    }
};

export function getPlatformEchartsConfig(platForm: analysisItem) {
    const series = [{
        name: '数量',
        type: 'bar',
        data: []
    }];

    const xAxis = {
        data: []
    }
    Object.keys(platForm).map((name) => {
        const item = platForm[name];
        Object.keys(item.subItem).map((version) => {            
            const versionItem = item.subItem[version];

            xAxis.data.push(name + version);

            series[0].data.push(versionItem.count);
        });
    });

    return {
        title: {
            text: 'Platform 分布情况'
        },
        tooltip: {},
        xAxis,
        yAxis: {},
        series,
    }
};

export function getWebviewEchartsConfig(webviewData: analysisItem) {
    const series = [{
        name: '数量',
        type: 'bar',
        data: []
    }];

    const xAxis = {
        data: []
    }
    Object.keys(webviewData).map((name) => {
        const item = webviewData[name];
        xAxis.data.push(name);
        series[0].data.push(item.count);
    });

    return {
        title: {
            text: 'Webview 分布情况'
        },
        tooltip: {},
        xAxis,
        yAxis: {},
        series,
    }
}

export function getISPEchartsConfig(ISPData: analysisItem) {
    const series = [{
        name:'ISP',
        type:'pie',
        radius : '55%',
        center: ['50%', '50%'],
        data:[],
        roseType: 'radius',
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
            return Math.random() * 200;
        }
    }];

    Object.keys(ISPData).map((name) => {
        const item = ISPData[name];

        if(item.count === 0) {
            return;
        }

        series[0].data.push({
            value: item.count,
            name
        });
    });

    return {
        series
    }
}

export function getMapEchatsConfig(MapData: analysisItem) {
    return {
        title : {
            text: '错误分布',
            // subtext: '',
            left: 'center'
        },
        tooltip : {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data:['错误分布']
        },
        visualMap: {
            min: 0,
            max: 2500,
            left: 'left',
            top: 'bottom',
            text:['高','低'],           // 文本，默认为数值文本
            calculable : true
        },
        toolbox: {
            show: true,
            orient : 'vertical',
            left: 'right',
            top: 'center',
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        series : [
            {
                name: '错误分布',
                type: 'map',
                mapType: 'china',
                roam: false,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:[
                    {name: '北京',value: Math.round(Math.random()*1000)},
                    {name: '天津',value: Math.round(Math.random()*1000)},
                    {name: '上海',value: Math.round(Math.random()*1000)},
                    {name: '重庆',value: Math.round(Math.random()*1000)},
                    {name: '河北',value: Math.round(Math.random()*1000)},
                    {name: '河南',value: Math.round(Math.random()*1000)},
                    {name: '云南',value: Math.round(Math.random()*1000)},
                    {name: '辽宁',value: Math.round(Math.random()*1000)},
                    {name: '黑龙江',value: Math.round(Math.random()*1000)},
                    {name: '湖南',value: Math.round(Math.random()*1000)},
                    {name: '安徽',value: Math.round(Math.random()*1000)},
                    {name: '山东',value: Math.round(Math.random()*1000)},
                    {name: '新疆',value: Math.round(Math.random()*1000)},
                    {name: '江苏',value: Math.round(Math.random()*1000)},
                    {name: '浙江',value: Math.round(Math.random()*1000)},
                    {name: '江西',value: Math.round(Math.random()*1000)},
                    {name: '湖北',value: Math.round(Math.random()*1000)},
                    {name: '广西',value: Math.round(Math.random()*1000)},
                    {name: '甘肃',value: Math.round(Math.random()*1000)},
                    {name: '山西',value: Math.round(Math.random()*1000)},
                    {name: '内蒙古',value: Math.round(Math.random()*1000)},
                    {name: '陕西',value: Math.round(Math.random()*1000)},
                    {name: '吉林',value: Math.round(Math.random()*1000)},
                    {name: '福建',value: Math.round(Math.random()*1000)},
                    {name: '贵州',value: Math.round(Math.random()*1000)},
                    {name: '广东',value: Math.round(Math.random()*1000)},
                    {name: '青海',value: Math.round(Math.random()*1000)},
                    {name: '西藏',value: Math.round(Math.random()*1000)},
                    {name: '四川',value: Math.round(Math.random()*1000)},
                    {name: '宁夏',value: Math.round(Math.random()*1000)},
                    {name: '海南',value: Math.round(Math.random()*1000)},
                    {name: '台湾',value: Math.round(Math.random()*1000)},
                    {name: '香港',value: Math.round(Math.random()*1000)},
                    {name: '澳门',value: Math.round(Math.random()*1000)}
                ]
            }
        ]
    }
}