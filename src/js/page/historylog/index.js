import React, { useRef, useState, useEffect,  } from 'react';
import { Divider, Input, Layout, Checkbox, Form, Button, Icon, Table, Select, Drawer, Affix } from 'antd';
import moment from 'moment';

import { DateInput } from '../../component/rangeDateInput';
import TagList from '../../component/tagList';
import LogTable from '../../component/logTable';
import useBusinessList , { useFilterList } from '../../hook/businessList';
import { useLogs } from '../../hook/logs';

import './index.less';

const logType = [
    'error',
    'log'
]

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};

export default function Log(props) {

    const {
        start = moment().add(-1, 'hour'),
        end = moment()
    } = props;

    const [pageIndex, setPageIndex] = useState(0);
    const [drawerVisiblie, setDrawerVisiblie] = useState(true);
    const list = useBusinessList();
    const [logs, setLogs, getLogs] = useLogs([]);
    const [projectId, setProjectId] = useState(null);

    const includeRef = useRef(null);
    const excludeRef = useRef(null);
    const startTimeRef = useRef(null);
    const endTimeRef = useRef(null);
    const checkBoxRef = useRef(null);
    const selectRef = useRef(null);

    function handlerClose() {
        setDrawerVisiblie(false);
    }

    function handlerOpen() {
        setDrawerVisiblie(true);
    }

    function onChange(e) {
        // TODO change level
    }

    async function handlerSumbit() {
        const include = includeRef.current.getTags();
        const exclude = excludeRef.current.getTags();
        const startDate = startTimeRef.current.getTime().unix() * 1000;
        const endDate = endTimeRef.current.getTime().unix() * 1000;

        if (!projectId) {
            return;
        }

        await getLogs({
            id: projectId,
            include,
            exclude,
            startDate,
            endDate,
            index: pageIndex,
            level: [1,2,4]
        });

        setDrawerVisiblie(false);
    }

    console.log(projectId);

    return (
        <div>
            <Drawer
                title=""
                placement="right"
                width={500}
                closable={false}
                className="ward-logs-sumbitpanel"
                onClose={handlerClose}
                visible={drawerVisiblie}
            >
                <div className="ward-drawer-btn" onClick={handlerOpen}>
                    { !drawerVisiblie ? <Icon color="#fff" type="caret-left" /> : <Icon color="#fff" type="caret-right" /> }
                </div>
                <Form>
                    <Form.Item label="选择项目" {...formItemLayout}>
                        <Select
                            ref={selectRef}
                            showSearch
                            value={projectId}
                            onSelect={setProjectId}
                            filterOption={(input, option) => option.props.name.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                list.map((item) => {
                                    return (
                                        <Select.Option key={item.id} value={item.id} name={item.name}>
                                            {item.id}.{item.name}
                                        </Select.Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="起始时间" {...formItemLayout}>
                        <DateInput ref={startTimeRef} date={start}></DateInput>
                    </Form.Item>
                    <Form.Item label="起始时间" {...formItemLayout}>
                        <DateInput ref={endTimeRef} date={end}></DateInput>
                    </Form.Item>
                    <Form.Item label="日志类型" {...formItemLayout}>
                        <Checkbox.Group ref={checkBoxRef} options={logType} defaultValue={logType} onChange={onChange} />
                    </Form.Item>
                    <Form.Item label="关键词" {...formItemLayout}>
                        <TagList ref={includeRef} key="includeTags" color="green" text="添加关键词"></TagList>
                    </Form.Item>
                    <Form.Item label="屏蔽词" {...formItemLayout}>
                        <TagList ref={excludeRef} key="excludeTags" color="red" text="添加屏蔽词"></TagList>
                    </Form.Item>
                    <Form.Item wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 20, offset: 4 },
                        }}>
                        <Button onClick={handlerSumbit} type="primary">
                            <Icon type="search" />查询日志
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            <LogTable logs={logs} />
        </div>

    )
}
