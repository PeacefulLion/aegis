import * as React from 'react';
import {Checkbox, Form, Button, Icon, Select, Drawer} from 'antd';
import TagList from '../tagList';
import logType from '../../common/const/logType';
import {firstUpperCase} from '../../common/util';
import {useBusinessList} from '../../hook/businessList';
import {useOfflineList} from '../../hook/offlineList';

import './index.less';

const {
    useState,
    useRef
} = React;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 4},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 20},
    },
};

export interface Props {
    onSummit: Function
}

const LOGTYPE_OPTIONS = [
    'error',
    'info',
    'debug',
    'offline'
];

export default function QueryFormOffline({onSummit}: Props) {
    const [pageIndex, setPageIndex] = useState(0);
    const [drawervisible, setDrawerVisiblie] = useState(true);
    const [projectId, setProjectId] = useState(null);
    const [offlineId, setOfflineId] = useState(null);
    const list = useBusinessList(0);
    const offlineList = useOfflineList();
    const [level, setLevel] = useState([logType.Debug, logType.Info, logType.Error, logType.Offline]);

    const includeRef: any = useRef(null);
    const excludeRef: any = useRef(null);
    const checkBoxRef: any = useRef(null);

    function handlerClose() {
        setDrawerVisiblie(false);
    }

    function handlerOpen() {
        setDrawerVisiblie(!drawervisible); // 取反
    }

    function selectChanged() {

    }

    function onChange(value: any[]) {
        const level = [1];

        value.forEach((value) => {
            level.push(logType[firstUpperCase(value)]);
        });
        setLevel(level);
    }

    function searchOfflineLog() {
        const include = includeRef.current.getTags();
        const exclude = excludeRef.current.getTags();

        if (!projectId) {
            return;
        }

        onSummit({
            id: projectId,
            include,
            exclude,
            index: pageIndex,
            level: level
        });

        setDrawerVisiblie(false);
    }

    return (
        <Drawer
            title=""
            placement="right"
            width={500}
            closable={false}
            className="ward-logs-sumbitpanel"
            onClose={handlerClose}
            visible={drawervisible}
        >
            <div className="ward-drawer-btn" onClick={handlerOpen}>
                {!drawervisible ? <Icon type="caret-left"/> : <Icon type="caret-right"/>}
            </div>
            <Form>
                <Form.Item label="选择项目" {...formItemLayout}>
                    <Select
                        showSearch
                        value={projectId}
                        onSelect={setProjectId}
                        onChange={selectChanged}
                        filterOption={(input, option: any) =>
                            option.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
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
                <Form.Item>
                    <a className="ward-drawer-offline-config">设置离线日志自动拉取</a>
                </Form.Item>
                <Form.Item label="选择日志" {...formItemLayout}>
                    <Select
                        showSearch
                        value={offlineId}
                        onSelect={setOfflineId}
                        filterOption={(input, option: any) =>
                            option.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            offlineList.map((item) => {
                                return (
                                    <Select.Option key={item.id.toString()} value={item.id}>
                                        {item.name}
                                    </Select.Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="日志类型" {...formItemLayout}>
                    <Checkbox.Group ref={checkBoxRef} options={LOGTYPE_OPTIONS} defaultValue={LOGTYPE_OPTIONS}
                                    onChange={onChange}/>
                </Form.Item>
                <Form.Item label="关键词" {...formItemLayout}>
                    <TagList ref={includeRef} key="includeTags" color="green" text="添加关键词"></TagList>
                </Form.Item>
                <Form.Item label="屏蔽词" {...formItemLayout}>
                    <TagList ref={excludeRef} key="excludeTags" color="red" text="添加屏蔽词"></TagList>
                </Form.Item>
                <Form.Item wrapperCol={{
                    xs: {span: 24, offset: 0},
                    sm: {span: 20, offset: 4},
                }}>
                    <Button onClick={searchOfflineLog} type="primary">
                        <Icon type="search"/>查询日志
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    )
}
