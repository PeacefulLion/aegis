import { InfoItem } from "./cgi";
import { Business } from "../../hook/businessList";
import * as HightChart from "highcharts";


export function getChartsData(items: InfoItem[], list: Business[]) {
    const getPointStart = () => {
        const d = new Date(items[0].startDate);
        return d.getTime();
    }

    const getSeries = () => {
        const listMap: {
            [key: string]: Business
        } = list.reduce((a, b) => {
            a[b.id] = b;
            return a; 
        }, {}); 

        console.log('listMap', listMap); 

        const map = {}; 
        items.forEach(e => {
            if (map[e.projectId]) map[e.projectId].push(e); 
            else {
                map[e.projectId] = [e];
            }
        }); 
        
        return Object.keys(map).map(e => +e).map(projectId => {
            const data = map[projectId] as InfoItem[]; 

            return {
                data: data.map(e => e.total),
                name: listMap[projectId].name
            }
        });
    }

    if (items.length === 0) {
        return null; 
    } else {
        return {
            chart: {
                height: window.innerHeight - 200,
                zoomType: 'x'
            }, 

            title: {
                text: '图表统计'
            },

            xAxis: {
                type: 'datetime',
                labels: {
                    formatter() {
                        return HightChart.dateFormat('%a %d %b', 
                            this.value
                        );
                    }
                }, 
            },

            yAxis: {
                title: { text: '报错量' },
                min: 0,
            },

            tooltip: {
                shared: true,
                crosshairs: true
            },

            legend: {
                align: 'left',
                verticalAlign: 'top',
                // borderWidth: 0
            },

            plotOptions: {
                series: {
                    label: { connectorAllowed: false },
                    pointStart: getPointStart(),
                    pointInterval: 24 * 3600 * 1000, // one day
                },

                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },

            series: getSeries()
        }
    }
}