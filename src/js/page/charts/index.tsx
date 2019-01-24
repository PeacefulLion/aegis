import { useBusinessList } from '../../hook/businessList';
import DrawerContainer, { drawerCtx } from '../../component/drawer-container';
import { Form, Select, Button, Icon } from "antd";
import { loadList } from "./cgi";
import * as React from 'react';
import HightChartWarpper from "./hight-chart-warpper";
import './index.less';

/**
 * 页面 Container 
 */
export default function Charts() {
    const list = useBusinessList(0);

    // CGI 参数, 用于请求 loadList
    // projectId, timeScope
    const [projectId, setProjectId] = React.useState(-1);
    const [timeScope, setTimeScope] = React.useState(1);
    const [renderId, setRenderId] = React.useState(Date.now())

    // CGI 返回结果: 错误次数统计情况
    const [items, setItems] = React.useState([]);
    
    // OnSubmit -> Fetch List -> Update List 
    const onSubmit = () => 
        loadList(projectId, timeScope, list)
            .then(setItems)
            .then(() => setRenderId(renderId + 1));
    
    return (
        <div>
            <DrawerContainer>
                <h1>📈 图表统计</h1>

                <Form>
                    {/* Form: projectId */}
                    <Form.Item label="统计项目">
                        <Select showSearch value={projectId} onSelect={setProjectId}
                            filterOption={(input, option: any) =>
                                option.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                            <Select.Option key="charts-quanbu-xiangmu" value={-1} title="全部">
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
                        
                    {/* Form: timeScope */}
                    <Form.Item label="时间范围">
                        <Select value={timeScope} onSelect={setTimeScope}>
                            <Select.Option key="charts-quanbu-xiangmu" value={1} title="最近七天">
                                最近七天
                            </Select.Option>
                            <Select.Option key="charts-quanbu-xiangmu" value={2} title="最近一个月">
                                最近一个月
                            </Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        {/* When Clicking Btn, Drawer Will Close */}
                        <drawerCtx.Consumer>{ctx => 
                            <Button type="primary" onClick={e => {
                                e.preventDefault(); 
                                onSubmit().then(ok => {
                                    ctx.toggleVisible()
                                })
                            }} >
                                <Icon type="search" />图表统计
                            </Button>
                        }</drawerCtx.Consumer>
                    </Form.Item>
                </Form>
            </DrawerContainer>
            
            {/* The Chart Container & Data */}
            <HightChartWarpper renderId={renderId.toString()} 
                items={ items } list={ list } />
        </div>
    );
}

