import React, { useState } from 'react';
import { Row, Col, Table, Tooltip, Icon, Switch, Form, Popover } from 'antd';

import './index.less';

const { Column, ColumnGroup } = Table;

function VersionIcon(props) {
    return (
        <span className="logpanel-iconwrap">
            <Icon type={props.name}></Icon>
            {props.version}
        </span>
    )
}

function logPanel(props) {
    const {
        appIcon,
        platform,
        ip,
        time,
        from
    } = props;

    return (
        <div className="logdetail-panel">
            <Row className="logdetail-row">
                <Col span="4">
                    <span className="label">
                        Time
                    </span>
                </Col>
                <Col span="20">{time}</Col>
            </Row>
            <Row className="logdetail-row">
                <Col span="4">
                    <span className="label">IP</span>
                </Col>
                <Col span="20">{ip}</Col>
            </Row>
            <Row className="logdetail-row">
                <Col span="4">
                    <span className="label">Form</span>
                </Col>
                <Col span="20">
                    {from}
                </Col>
            </Row>
            <Row className="logdetail-row">
                <Col span="4">
                    <span className="label">
                        App
                    </span>
                </Col>
                <Col span="20">
                    {
                        appIcon.map((item, index) => {
                            return (
                                <VersionIcon key={index} {...item} />
                            )
                        })
                    }
                </Col>
            </Row>
            <Row className="logdetail-row">
                <Col span="4">
                    <span className="label">Paltform</span>
                </Col>
                <Col span="20">
                    {
                        platform.map((item, index) => {
                            return (
                                <VersionIcon key={index} {...item}></VersionIcon>
                            )
                        })
                    }
                </Col>
            </Row>
        </div>
    )
}

export default function LogTable(props) {
    const {
        logs
    } = props;

    const [showTime, setShowTime] = useState(false);
    const [showIp , setShowIp] = useState(false);
    const [showUin ,setShowUin] = useState(false);
    const [showApp, setShowApp] = useState(false);
    const [showPlatform, setShowPlatform] = useState(false);
    const [showMsg, setShowMsg] = useState(true);
    const [showNetType, setShowNetType] = useState(false);

    return (
        <div>
            <div className="ward-logstab-control">
                <Form layout="inline">
                    <Form.Item label="Time">
                        <Switch checked={showTime} onChange={setShowTime} />
                    </Form.Item>
                    <Form.Item label="Uin">
                        <Switch checked={showUin} onChange={setShowUin} />
                    </Form.Item>
                    <Form.Item label="IP">
                        <Switch checked={showIp} onChange={setShowIp} />
                    </Form.Item>
                    <Form.Item label="App">
                        <Switch checked={showApp} onChange={setShowApp} />
                    </Form.Item>
                    <Form.Item label="NetType">
                        <Switch checked={showNetType} onChange={setShowNetType} />
                    </Form.Item>
                    <Form.Item label="Platform">
                        <Switch checked={showPlatform} onChange={setShowPlatform} />
                    </Form.Item>
                    <Form.Item label="From">
                        <Switch checked={showPlatform} onChange={setShowPlatform} />
                    </Form.Item>
                </Form>
            </div>
          
            <Table dataSource={logs} rowKey='index'>
                <Column 
                    title="#"
                    key='index'
                    width={10}
                    className="logtable-index"
                    render={(text, record, index) => {
                        const className = (record.level & 2) ? 'log-type-default' : 'log-type-error'
                        return (
                            <div className={className}>{index}</div>
                        );
                    }}
                />
                { 
                    showTime ? (
                        <Column 
                            title='Time'
                            dataIndex='time'
                            key='time'
                            width={100}
                        />
                    ) : null
                }
                { 
                    showUin ? (
                        <Column 
                            title='Uin'
                            dataIndex='uin'
                            key='uin'
                            width={150}
                        />
                    ) : null
                }
                { 
                    showIp ? (
                        <Column 
                            title='Ip'
                            dataIndex='ip'
                            key='ip'
                            width={180}
                        />
                    ) : null
                }
                { 
                    showNetType ? (
                        <Column 
                            title='NetType'
                            dataIndex='device.netType'
                            key='nettype'
                            width={100}
                        />
                    ) : null
                }
                {
                    showApp ? (
                        <Column 
                            title='App'
                            dataIndex='appIcon'
                            key='appIcon'
                            width={200}
                            render={(appIcon, record, index) => {
                                return (
                                    <Tooltip title={record.userAgent}>
                                        {
                                            appIcon.map((item, index) => {
                                                return (
                                                    <VersionIcon key={index} {...item}></VersionIcon>
                                                )
                                            })
                                        }
                                    </Tooltip>
                                )
                            }}
                        />
                    ) : null
                }
                {
                    showPlatform ? (
                        <Column 
                            title='Paltform'
                            dataIndex='platform'
                            key='platform'
                            width={100}
                            render={(platform, record, index) => {
                                return (
                                    <Tooltip title={record.userAgent}>
                                        {
                                            platform.map((item, index) => {
                                                return (
                                                    <VersionIcon key={index} {...item}></VersionIcon>
                                                )
                                            })
                                        }
                                    </Tooltip>
                                )
                            }}
                        />
                    ) : null
                }
 
                <Column 
                    title='Message'
                    dataIndex='msg'
                    key='msg'
                    render={(msg, record, index) => {
                        return (
                            <Popover  content={logPanel(record)} trigger={'hover'}>
                                {msg}
                            </Popover>
                        );
                    }}
                />
            </Table>
        </div>
    )
}