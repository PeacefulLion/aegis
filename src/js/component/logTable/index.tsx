import * as React from 'react';
import {Row, Col, Table, Tooltip, Switch, Form, Button, Typography} from 'antd';
import {Icon as IconProps, FormatLog as FormatLog} from '../../hook/common';
import Icon from '../icon';
import './index.less';
import AnalysisPanel from '../analysisPanel';
import InfiniteScroll from 'react-infinite-scroller';

import SourceMapButton from '../sourceMapButton'

const {
    useState,
    useEffect
} = React;

const {Column, ColumnGroup} = Table;

function VersionIcon(props: IconProps) {
    return (
        <span className="logpanel-iconwrap">
            <Icon type={props.name} />
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
        webview,
        userAgent,
        uin,
        left,
        top,
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
                <Col span={21} className="logdetail-info">{time}</Col>
            </Row>
            <Row className="logdetail-row">
                <Col span={2}>
                    <span className="label">IP</span>
                </Col>
                <Col span={21} className="logdetail-info">{ip}</Col>
            </Row>
            <Row className="logdetail-row">
                <Col span={2}>
                    <span className="label">uin</span>
                </Col>
                <Col span={21} className="logdetail-info">{uin}</Col>
            </Row>
            <Row className="logdetail-row">
                <Col span={2}>
                    <span className="label">userAgent</span>
                </Col>
                <Col span={21} className="logdetail-info">{userAgent}</Col>
            </Row>
            <Row className="logdetail-row">
                <Col span={2}>
                    <span className="label">Form</span>
                </Col>
                <Col span={21} className="logdetail-info">
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
                <Col span={21} className="logdetail-info">
                    {VersionIconList(appIcon)}
                </Col>
            </Row>
            <Row className="logdetail-row">
                <Col span={2}>
                    <span className="label">Paltform</span>
                </Col>
                <Col span={21} className="logdetail-info">
                    {VersionIconList(platform)}
                </Col>
            </Row>
            <Row className="logdetail-row">
                <Col span={2}>
                    <span className="label">ExtraInfo</span>
                </Col>
                <Col span={21} className="logdetail-info">
                    {
                        webview.length > 0 ? (
                            <span>浏览器内核为 {webview.join(';')}</span>
                        ) : null
                    }
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

function ColumnApp(platform: IconProps[], record: FormatLog, index: number) {
    return (
        <Tooltip title={record.userAgent}>
            {VersionIconList(platform)}
        </Tooltip>
    );
}

interface LogTableProps {
    logs: FormatLog[],
    id?: number,
    isEnd: boolean,
    loadMore: Function
}

export default function LogTable(props: LogTableProps) {
    const {
        logs,
        isEnd,
        loadMore
    } = props;

    const [showStaticApp, setShowStaticApp] = useState(false);
    const [showStaticPlatform, setShowStaticPlatform] = useState(false);
    const [showISP, setShowISP] = useState(false);
    const [showWebviewCore, setshowWebviewCore] = useState(false);
    const [showMap, setShowMap] = useState(false);

    const [showTime, setShowTime] = useState(true);
    const [showIp, setShowIp] = useState(false);
    const [showUin, setShowUin] = useState(true);
    const [showApp, setShowApp] = useState(false);
    const [showPlatform, setShowPlatform] = useState(false);
    const [showFrom, setShowFrom] = useState(false);
    const [showVersion, setShowVersion] = useState(false);
    const [showMsg, setShowMsg] = useState(true);
    const [showNetType, setShowNetType] = useState(false);
    const [showLogPanel, setShowLogPanel] = useState(false);
    const [record, setRecord] = useState(null);

    const handlerClickApp = function () {
        setShowApp(!showApp);
    }

    const handlerClickPlatform = function () {
        setShowPlatform(!showPlatform);
    }

    const handlerClickISP = function () {
        setShowISP(!showISP);
    }

    const handlerClickWebviewCore = function () {
        setshowWebviewCore(!showWebviewCore);
    }

    const handlerClickMap = function () {
        setShowMap(!showMap);
    }

    const handlerLoadMore = function() {
        loadMore();
    }

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
                    <Form.Item label="统计操作系统分布分布">
                        <Switch checked={showStaticPlatform} onChange={setShowStaticPlatform} />
                    </Form.Item>
                    <Form.Item label="统计webview内核分布">
                        <Switch checked={showWebviewCore} onChange={setshowWebviewCore} />
                    </Form.Item>
                    <Form.Item label="统计客户端版本分布">
                        <Switch checked={showStaticApp} onChange={setShowStaticApp} />
                    </Form.Item>
                    <Form.Item label="统计运营商分布">
                        <Switch checked={showISP} onChange={setShowISP} />
                    </Form.Item>
                    <Form.Item label="统计地区分布">
                        <Switch checked={showMap} onChange={setShowMap} />
                    </Form.Item>
                </Form>
            </div>

            <AnalysisPanel
                logs={logs}
                showApp={showApp}
                showPlatform={showPlatform}
                showISP={showISP}
                showWebviewCore={showWebviewCore}
                showMap={showMap}
            />
            <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={handlerLoadMore}
                    hasMore={!isEnd}
                    useWindow={true}
                >
                    <Table dataSource={logs} rowKey="index"
                        expandedRowRender={LogPanelInline}
                        expandRowByClick={true}
                        pagination={false}
                        className="aegis-logtalbe"
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
                    <Column
                        title="Message"
                        dataIndex="msg"
                        key="msg"
                        render={(msg) => {
                            return (
                                <Typography>
                                    <Typography.Paragraph>{msg}</Typography.Paragraph>
                                </Typography>
                            )
                        }}
                    />
                    </Table>
                </InfiniteScroll>
        </div>
    );
}
