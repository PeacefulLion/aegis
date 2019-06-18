import * as React from 'react';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { Checkbox, Form, Button, Icon, Select, Drawer, DatePicker } from 'antd';
import TagList from '../tagList';
import moment from 'moment';
import logType from '../../common/const/logType';
import { setLastSelect } from '../../common/utils';
import { useBusinessList } from '../../hook/businessList';
import { useUrlList } from '../../hook/urlList';
import { speedType } from '../../hook/common';

import './index.less';

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
    start?: dayjs.Dayjs
    end?: dayjs.Dayjs
    onSummit: Function,
    type: speedType
}

const LOGTYPE_OPTIONS = [
    'info',
    'error'
];

export default function QueryForm({ start = dayjs().add(-1, 'hour'), end = dayjs(), onSummit, type }: Props) {
    const [pageIndex, setPageIndex] = useState(0);
    const [drawerVisiblie, setDrawerVisiblie] = useState(true);
    const [list, projectId, setProjectId] = useBusinessList(0);
    const [selectDate, setSelectDate] = useState(moment().add(-1, 'days').format("YYYY-MM-DD"));
    const [urlList, url, setUrl] = useUrlList(projectId, type, selectDate);
    function handlerClose() {
        setDrawerVisiblie(false);
    }

    function handlerOpen() {
        setDrawerVisiblie(!drawerVisiblie); // 取反
    }

    function setSelectProjectId(id) {
        setProjectId(id);
        setLastSelect(id);
    }
    function changeDate(date, dateString) {
        setSelectDate(dateString);
    }

    function handlerSumbit() {

        if (!projectId || !url) {
            return;
        }

        onSummit({
            id: projectId,
            date: selectDate,
            index: pageIndex,
            type: type,
            url: url
        });

        setDrawerVisiblie(false);
    }

    function isEarlyThanToday(date: any) {
        return date > dayjs();
    }

    function setSelectUrl(id) {
        setUrl(id);
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
            <div className="ward-left-btn" onClick={handlerOpen}>
                {!drawerVisiblie ? <Icon type="caret-left" /> : <Icon type="caret-right" />}
            </div>
            <Form>
                <Form.Item label="选择项目" {...formItemLayout}>
                    <Select
                        showSearch
                        value={projectId}
                        onSelect={setSelectProjectId}
                        filterOption={(input, option: any) =>
                            option.props.value.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
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
                <Form.Item label="搜索URL" {...formItemLayout}>
                    <Select
                        showSearch
                        value={url}
                        onSelect={setSelectUrl}
                        filterOption={(input, option: any) =>
                            option.props.value.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                            option.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            urlList.map((item) => {
                                return (
                                    <Select.Option key={item.toString()} value={item} title={item}>
                                        {item}
                                    </Select.Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="统计时间" {...formItemLayout}>
                    <DatePicker onChange={changeDate} disabledDate={isEarlyThanToday} defaultValue={moment().add(-1, 'days')}></DatePicker>
                </Form.Item>
                <Form.Item wrapperCol={{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 20, offset: 4 },
                }}>
                    <Button onClick={handlerSumbit} type="primary">
                        <Icon type="search" />查询
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    )
}
