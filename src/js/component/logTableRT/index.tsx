import * as React from 'react';
import { Row, Col, Table, Tooltip, Switch, Form } from 'antd';
import { FormatLog, Icon as IconProps } from '../../hook/common';
import Icon from '../icon';

import './index.less';
import SourceMapButton from "../sourceMapButton";

const {
    useState,
    useEffect
} = React;

const { Column, ColumnGroup } = Table;

function VersionIcon(props: IconProps) {
    return (
        <span className="logpanel-iconwrap">
            <Icon type={props.name} />>
            {props.version}
        </span>
    );
}

function VersionIconList(data: IconProps[]) {
    return data.map((item, index) => {
        return (
            <VersionIcon key={index} {...item} />
        );
    });
}

interface LogPanelProps extends FormatLog {
    left?: number,
    top?: number,
    target?: string
}

function LogPanelInline(props: LogPanelProps) {
    const {
        target,
        appIcon,
        platform,
        ip,
        time,
        from,
        rowNum = 0,
        colNum = 0,
        version
    } = props;

    return (
        <div className="logdetail-panel">
            <Row className="logdetail-row">
                <Col span={2}>
                    <span className="label">
                        Time
                    </span>
                </Col>
                <Col span={21}>{time}</Col>
            </Row>
            <Row className="logdetail-row">
                <Col span={2}>
                    <span className="label">IP</span>
                </Col>
                <Col span={21}>{ip}</Col>
            </Row>
            <Row className="logdetail-row">
                <Col span={2}>
                    <span className="label">Form</span>
                </Col>
                <Col span={21}>
                    {
                        <div>
                            <a target="_blank" href={`${from}`}>
                                {
                                    rowNum ? (
                                        <span>{rowNum}行</span>
                                    ) : null
                                }
                                {
                                    colNum ? (
                                        <span>{colNum}列</span>
                                    ) : null
                                }
                                <p>
                                    {from}
                                </p>
                            </a>

                            {
                                target ? <SourceMapButton target={target} rowNum={rowNum}
                                                          colNum={colNum}></SourceMapButton> : null
                            }
                        </div>
                    }
                </Col>
            </Row>
            <Row className="logdetail-row">
                <Col span={2}>
                    <span className="label">
                        App
                    </span>
                </Col>
                <Col span={21}>
                    {VersionIconList(appIcon)}
                </Col>
            </Row>
            <Row className="logdetail-row">
                <Col span={2}>
                    <span className="label">Paltform</span>
                </Col>
                <Col span={21}>
                    {VersionIconList(platform)}
                </Col>
            </Row>
            <Row className="logdetail-row">
                <Col span={2}>
                    <span className="label">version</span>
                </Col>
                <Col span={21} className="logdetail-info">
                    {version}
                </Col>
            </Row>
        </div>
    );
}


function ColumnIndex(text: string, record: FormatLog, index: number) {
    const className = (record.level & 2) ? 'log-type-default' : 'log-type-error';
    return (
        <div className={className}>{index}</div>
    );
}

function ColumnPaltform(appIcon: IconProps[], record: FormatLog, index: number) {
    return (
        <Tooltip title={record.userAgent}>
            {VersionIconList(appIcon)}
        </Tooltip>
    );
}

function ColumnFrom(appIcon: IconProps[], record: FormatLog, index: number) {
    return (
       <div>{record.from}</div>
    );
}

function ColumnVersion(appIcon: IconProps[], record: FormatLog, index: number) {
    return (
        <div>{record.version}</div>
    );
}

function ColumnApp(platform: IconProps[], record: FormatLog, index: number) {
    return (
        <Tooltip title={record.userAgent}>
            {VersionIconList(platform)}
        </Tooltip>
    );
}

interface LogTableProps {
    logs: FormatLog[],
    id?: number
}

export default function LogTable(props: LogTableProps) {
    const {
        logs
    } = props;
    logs.reverse();
    const [showTime, setShowTime] = useState(true);
    const [showIp, setShowIp] = useState(false);
    const [showUin, setShowUin] = useState(false);
    const [showApp, setShowApp] = useState(false);
    const [showPlatform, setShowPlatform] = useState(false);
    const [showFrom, setShowFrom] = useState(false);
    const [showVersion, setShowVersion] = useState(false);
    const [showNetType, setShowNetType] = useState(false);
    return (
        <div className="logtable">
            <div className="logtable-control">
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
                        <Switch checked={showFrom} onChange={setShowFrom} />
                    </Form.Item>
                    <Form.Item label="Version">
                        <Switch checked={showVersion} onChange={setShowVersion} />
                    </Form.Item>
                </Form>
            </div>

            <Table dataSource={logs} pagination={{pageSize: 50}}
                   rowKey={record => `${record.uin}${record.date}`}
                   expandedRowRender={(record:LogPanelProps,index: number, indent: number, expanded: boolean) => {
                       return LogPanelInline(record)
                   }}
                   expandRowByClick={true}
            >
                <Column
                    title="#"
                    key="index"
                    width={10}
                    className="logtable-index"
                    render={ColumnIndex}
                />
                {
                    showTime ? (
                        <Column
                            title="Time"
                            dataIndex="time"
                            key="time"
                            width={118}
                        />
                    ) : null
                }
                {
                    showUin ? (
                        <Column
                            title="Uin"
                            dataIndex="uin"
                            key="uin"
                            width={150}
                        />
                    ) : null
                }
                {
                    showIp ? (
                        <Column
                            title="Ip"
                            dataIndex="ip"
                            key="ip"
                            width={180}
                        />
                    ) : null
                }
                {
                    showNetType ? (
                        <Column
                            title="NetType"
                            dataIndex="device.netType"
                            key="nettype"
                            width={100}
                        />
                    ) : null
                }
                {
                    showApp ? (
                        <Column
                            title="App"
                            dataIndex="appIcon"
                            key="appIcon"
                            width={200}
                            render={ColumnApp}
                        />
                    ) : null
                }
                {
                    showPlatform ? (
                        <Column
                            title="Paltform"
                            dataIndex="platform"
                            key="platform"
                            width={100}
                            render={ColumnPaltform}
                        />
                    ) : null
                }
                {
                    showFrom ? (
                        <Column
                            title="From"
                            dataIndex="from"
                            key="from"
                            width={100}
                            render={ColumnFrom}
                        />
                    ) : null
                }
                {
                    showVersion ? (
                        <Column
                            title="Version"
                            dataIndex="version"
                            key="version"
                            width={100}
                            render={ColumnVersion}
                        />
                    ) : null
                }

                <Column
                    title="Message"
                    dataIndex="msg"
                    key="msg"
                />
            </Table>
        </div>
    );
}
