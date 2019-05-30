import * as React from 'react';
import {useEffect} from 'react';
import {Checkbox, Form, Button, Icon, Select, Drawer, Modal, Input, Radio} from 'antd';
import TagList from '../tagList';
import logType from '../../common/const/logType';
import {firstUpperCase} from '../../common/util';
import {useBusinessList} from '../../hook/businessList';
import {useOfflineList} from '../../hook/offlineList';
import {useOfflineUin} from '../../hook/offlineUin';
import {setLastSelect} from '../../common/utils';

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
    onSummit: Function,
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
    const [offlineId, setOfflineId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [level, setLevel] = useState([logType.Debug, logType.Info, logType.Error, logType.Offline]);
    const [uins, addUin, removeUin, getUins] = useOfflineUin();
    const [order, setOrder] = useState(-1);

    const includeRef: any = useRef(null);
    const excludeRef: any = useRef(null);
    const checkBoxRef: any = useRef(null);
    const offlineIdRef: any = useRef(null);
    const inputRef: any = useRef(null);

    const [list, projectId, setProjectId] = useBusinessList(0);

    let [offlineList, getOfflineList] = useOfflineList();

    useEffect(()=>{
        getOfflineList(projectId);
    }, [projectId]);

    function handlerClose() {
        setDrawerVisiblie(false);
    }

    function handlerOpen() {
        setDrawerVisiblie(!drawervisible); // 取反
    }

    function onChange(value: any[]) {
        const level = [1];

        value.forEach((value) => {
            level.push(logType[firstUpperCase(value)]);
        });
        setLevel(level);
    }

    async function showModal() {
        if (!projectId) {
            alert('请先选择项目')
            return;
        }
        await getUins(projectId);
        setModalVisible(true);
    }

    function hideModal() {
        setModalVisible(!modalVisible)
    }

    async function projectChanged(projectId) {
        setProjectId(projectId);
        setLastSelect(projectId);
        setOfflineId('')
    }

    function addWatchUin(e) {
        let uin = e.target.value || inputRef.current.state.value;
        uin = uin.trim();
        if (!/^\w{4,40}$/.test(uin)) {
            return alert('UIN 为长度 4-40 的字母和数字');
        }
        if (uins.indexOf(uin) > -1) {
            return alert('请检查输入的 UIN 是否已经存在');
        }
        addUin({uin, id: projectId});
        inputRef.current.state.value = '';
    }

    function removeWatchUin(uin) {
        removeUin({uin, id: projectId})
        // const index = uins.indexOf(uin);
        // uins.splice(index, 1);
    }

    function changeOrder(e) {
        setOrder(e.target.value);
    }

    function searchOfflineLog() {
        const include = includeRef.current.getTags();
        const exclude = excludeRef.current.getTags();
        const fileId = offlineId;

        if (!projectId || !fileId) {
            return;
        }
        onSummit({
            id: projectId,
            fileId,
            order,
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
            <div className="ward-left-btn" onClick={handlerOpen}>
                {!drawervisible ? <Icon type="caret-left"/> : <Icon type="caret-right"/>}
            </div>
            <Form>
                <Form.Item label="选择项目" {...formItemLayout}>
                    <Select
                        showSearch
                        value={projectId}
                        onSelect={projectChanged}
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
                <Form.Item>
                    <a className="ward-drawer-offline-config" onClick={showModal}>设置离线日志自动拉取</a>
                    <Modal
                        title="设置离线日志自动拉取"
                        cancelText="Close"
                        visible={modalVisible}
                        onCancel={hideModal}
                        footer={[
                            <Button key="back" onClick={hideModal}>Close</Button>
                        ]}
                    >
                        <Input placeholder="添加监听的 UIN"
                               ref={inputRef}
                               onPressEnter={addWatchUin}
                               prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               className="listen-input"/>
                        <Button onClick={addWatchUin}>确认</Button>
                        <table className="offline-form-modal-table">
                            <tbody>
                            {
                                uins.map(uin => {
                                    return (
                                        <tr key={`uin-${uin}`}>
                                            <td className="watch-uid">{uin}</td>
                                            <td>监听中</td>
                                            <td>
                                                <a onClick={removeWatchUin.bind(null, uin)} href="javascript:;">删除</a>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </Modal>
                </Form.Item>
                <Form.Item label="选择日志" {...formItemLayout}>
                    <Select
                        showSearch
                        ref={offlineIdRef}
                        disabled={!projectId}
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
                <Form.Item label="排序" {...formItemLayout}>
                    <Radio.Group onChange={changeOrder} value={order}>
                        <Radio value={-1}>DESC</Radio>
                        <Radio value={1}>ASC</Radio>
                    </Radio.Group>
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
