import { useBusinessList, Business } from '../../hook/businessList';
import DrawerContainer from '../../component/drawer-container';
import { Form, Select, Button, Icon, message } from "antd";
import ReactHighcharts from "react-highcharts";
import { fromBadjs } from '../../common/api';
import * as HightChart from "highcharts";
import * as React from 'react';
import './index.less';

/**
 * 错误量计数
 */
export type InfoItem = {
    endDate: string,
    startDate: string,
    total: number, 
    projectId: number
}

/**
 * 请求数据
 * @param projectId 
 * @param timeScope 
 * @param list 
 */
export function loadList(projectId: number, timeScope: number, list: Business[]) {
    const finishLoading = message.loading('加载中 ...', 2.5);
    const mapper = {};

    list.forEach(e => {
        mapper[e.id] = true;
    });

    return fromBadjs.get<InfoItem[]>(`/controller/statisticsAction/queryByChart.do`, {
        projectId, timeScope
    }).then(itmes => {
        finishLoading();

        return itmes.filter(item => {
            item.startDate = item.startDate.replace('16:00:00.000', '23:59:59.999');
            item.endDate = item.endDate.replace('16:00:00.000', '23:59:59.999');
            
            return mapper[item.projectId];
        });
    }).catch(err => {
        message.error('加载失败: ' + JSON.stringify(err));
        return Promise.reject(err); 
    });
}

/**
 * 页面 Container 
 */
export default function Charts() {
    const list = useBusinessList(0);

    // CGI 参数, 用于请求 loadList
    // projectId, timeScope
    const [projectId, setProjectId] = React.useState(-1);
    const [timeScope, setTimeScope] = React.useState(1);

    // CGI 返回结果: 错误次数统计情况
    const [items, setItems] = React.useState([]);
    
    const onSubmit = e => {
        e.preventDefault();

        loadList(projectId, timeScope, list)
            .then(setItems);
    }

    return (
        <div>
            <DrawerContainer>
                <h1>📈</h1>
                <Form onSubmit={ onSubmit }>
                    <Form.Item label="统计项目">
                        <Select showSearch value={projectId} onSelect={setProjectId}
                            filterOption={(input, option: any) =>
                                option.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Select.Option key="charts-quanbu-xiangmu" value={-1} title={'全部'}>
                                -- 全部项目 --
                            </Select.Option>
                            {
                                list.map((item) => {
                                    return (
                                        <Select.Option key={item.id.toString()} value={item.id} title={item.name}>
                                            {item.id}.{item.name}
                                        </Select.Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item label="时间范围">
                        <Select value={timeScope} onSelect={setTimeScope}
                            filterOption={(input, option: any) =>
                                option.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                            <Select.Option key="charts-quanbu-xiangmu" value={1} title={'最近七天'}>
                                最近七天
                            </Select.Option>
                            <Select.Option key="charts-quanbu-xiangmu" value={2} title={'最近一个月'}>
                                最近一个月
                            </Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" >
                            <Icon type="search" />图表统计
                        </Button>
                    </Form.Item>
                </Form>
            </DrawerContainer>
            
            <HightChartWarpper items={ items } list={ list } />
        </div>
    )
}

export type HightChartProps = {
    items: InfoItem[], 
    list: Business[]
}

function HightChartWarpper(props: HightChartProps) {
    const { list, items } = props; 

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
        return (
            <div>无数据 ...</div>
        )
    } else {
        return (
            <div>
                <ReactHighcharts config={{
                    chart: {
                        height: window.innerHeight - 200
                    }, 

                    title: {
                        text: '图表统计'
                    },

                    xAxis: {
                        type: 'datetime',
                        labels: {
                            formatter() {
                                console.log('this.value', new Date(this.value));
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
                }} />
            </div>
        )
    }
}
