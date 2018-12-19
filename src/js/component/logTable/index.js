import React from 'react';
import { Row, Col, Table, Tooltip, Icon } from 'antd';

import './index.less';

const { Column, ColumnGroup } = Table;
const columns = [{
    title: '#',
    dataIndex: 'index',
    key: 'index',
    width: 10,
    render: (text, record, index) => {
        const className = (record.level & 2) ? 'log-type-default' : 'log-type-error'
        return (
            <div className={className}>{index}</div>
        )
    }
}, {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    width: 100
}, {
    title: 'Uin',
    dataIndex: 'uin',
    key: 'uin',
    width: 150
}, {
    title: 'App',
    dataIndex: 'device',
    key: 'deivce.app',
    width: 100,
    render: (device, record, index) => {
        if(device.isQQ) {
            return <Icon icon='qq'></Icon>
        } else if(device.isWechat) {
            return <Icon icon='wechat'></Icon>
        }
    }
}, {
    title: '平台',
    dataIndex: 'device',
    key: 'device.platform',
    width: 150,
    render: (device, record, index) => {
        if(device.isIOS) {
            return (
                <span>
                     <Icon icon='iphone' />
                </span>
            );
        } else if(device.isAndroid) {
            return (
                <span>
                    <Icon icon='android' />
                </span>
            );
        } else if(device.isWindow) {
            return (
                <span>
                    <Icon icon='windows' />
                </span>
            );
        }
    }
}, {
    title: 'ip',
    dataIndex: 'ip',
    key: 'address',
    width: 150
}, , {
    title: 'Message',
    dataIndex: 'msg',
    key: 'msg',
    render: (msg, record, index) => {
        <Tooltip title={record.from + record.userAgent}>
            {msg}
        </Tooltip>
    }
}, ];

export default function LogTable(props) {
    const {
        logs
    } = props;

    return (
        <Table dataSource={logs} columns={columns}>

        </Table>
    )
}