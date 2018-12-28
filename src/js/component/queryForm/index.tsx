import * as React from 'react';
import moment from 'moment';
import { Checkbox, Form, Button, Icon, Select, Drawer } from 'antd';
import { DateInput } from '../rangeDateInput';
import TagList from '../tagList';
import logType from '../../common/const/logType';

import { useBusinessList } from '../../hook/businessList';
import { SummitOptions } from '../../hook/logs';

const {
    useState,
    useRef
} = React;

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

export interface Props {
    start?: object,
    end?: object,
    onSummit: Function
}
  
const LOGTYPE_OPTIONS = [
    'info',
    'error'
];

export default function QueryForm({ start = moment().add(-1, 'hour'), end = moment(), onSummit }:Props) {
    const [pageIndex, setPageIndex] = useState(0);
    const [drawerVisiblie, setDrawerVisiblie] = useState(true);
    const [projectId, setProjectId] = useState(null);
    const list = useBusinessList(0);
    const [level, setLevel] = useState([logType.Debug, logType.Info, logType.Error]);

    const includeRef = useRef(null);
    const excludeRef = useRef(null);
    const startTimeRef = useRef(null);
    const endTimeRef = useRef(null);
    const checkBoxRef = useRef(null);

    function handlerClose() {
        setDrawerVisiblie(false);
    }

    function handlerOpen() {
        setDrawerVisiblie(!drawerVisiblie); // 取反
    }

    function onChange(value: any[]) {
        const level = [1];
        
        value.forEach((value) => {
            if(value === 'error') {
                level.push(logType.Error);
            } else if(value === 'info') {
                level.push(logType.Info);
            }
        });

        setLevel(level);
    }

    function handlerSumbit() {
        const include = includeRef.current.getTags();
        const exclude = excludeRef.current.getTags();
        const startDate = startTimeRef.current.getTime().unix() * 1000;
        const endDate = endTimeRef.current.getTime().unix() * 1000;

        if (!projectId) {
            return;
        }

        onSummit({
            id: projectId,
            include,
            exclude,
            startDate,
            endDate,
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
            visible={drawerVisiblie}
        >
            <div className="ward-drawer-btn" onClick={handlerOpen}>
                { !drawerVisiblie ? <Icon type="caret-left" /> : <Icon type="caret-right" /> }
            </div>
            <Form>
                <Form.Item label="选择项目" {...formItemLayout}>
                    <Select
                        showSearch
                        value={projectId}
                        onSelect={setProjectId}
                        filterOption={(input, option) => option.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {
                            list.map((item) => {
                                return (
                                    <Select.Option key={item.id} value={item.id} title={item.name}>
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
                    <Checkbox.Group ref={checkBoxRef} options={LOGTYPE_OPTIONS} defaultValue={LOGTYPE_OPTIONS} onChange={onChange} />
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
    )
}