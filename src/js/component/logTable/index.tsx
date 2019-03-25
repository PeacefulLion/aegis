import * as React from 'react';
import {Row, Col, Table, Tooltip, Switch, Form, Button} from 'antd';
import {Icon as IconProps, FormatLog as FormatLog} from '../../hook/common';
import Icon from '../icon';
import './index.less';
import AnalysisPanel from '../analysisPanel';

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
        top
    } = props;

    return (
        <div className="logdetail-panel">
            <Row className="logdetail-row">
                <Col span={4}>
                    <span className="label">
                        Time
                    </span>
                </Col>
                <Col span={20} className="logdetail-info">{time}</Col>
            </Row>
            <Row className="logdetail-row">
                <Col span={4}>
                    <span className="label">IP</span>
                </Col>
                <Col span={20} className="logdetail-info">{ip}</Col>
            </Row>
            <Row className="logdetail-row">
                <Col span={4}>
                    <span className="label">uin</span>
                </Col>
                <Col span={20} className="logdetail-info">{uin}</Col>
            </Row>
            <Row className="logdetail-row">
                <Col span={4}>
                    <span className="label">userAgent</span>
                </Col>
                <Col span={20} className="logdetail-info">{userAgent}</Col>
            </Row>
            <Row className="logdetail-row">
                <Col span={4}>
                    <span className="label">Form</span>
                </Col>
                <Col span={20} className="logdetail-info">
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
                <Col span={4}>
                    <span className="label">
                        App
                    </span>
                </Col>
                <Col span={20} className="logdetail-info">
                    {VersionIconList(appIcon)}
                </Col>
            </Row>
            <Row className="logdetail-row">
                <Col span={4}>
                    <span className="label">Paltform</span>
                </Col>
                <Col span={20} className="logdetail-info">
                    {VersionIconList(platform)}
                </Col>
            </Row>
            <Row className="logdetail-row">
                <Col span={4}>
                    <span className="label">ExtraInfo</span>
                </Col>
                <Col span={20} className="logdetail-info">
                    {
                        webview.length > 0 ? (
                            <span>浏览器内核为 {webview.join(';')}</span>
                        ) : null
                    }
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
    id?: number
}

export default function LogTable(props: LogTableProps) {
    const {
        logs
    } = props;

    const [showApp, setShowApp] = useState(false);
    const [showPlatform, setShowPlatform] = useState(false);
    const [showISP, setShowISP] = useState(false);
    const [showWebviewCore, setshowWebviewCore] = useState(false);
    const [showMap, setShowMap] = useState(false);

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


    return (
        <div className="logtable">
            <div className="logtable-control">
                <Button.Group>
                    <Button type="primary" onClick={handlerClickApp}>
                        终端分布
                    </Button>
                    <Button type="primary" onClick={handlerClickPlatform}>
                        客户端分布
                    </Button>
                    <Button type="primary" onClick={handlerClickISP}>
                        运营商分布
                    </Button>
                    <Button type="primary" onClick={handlerClickWebviewCore}>
                        webview内核分布
                    </Button>
                    <Button type="primary" onClick={handlerClickMap}>
                        地区分布
                    </Button>
                </Button.Group>
            </div>
            <AnalysisPanel logs={logs} showApp={showApp} showPlatform={showPlatform} showISP={showISP}
                           showWebviewCore={showWebviewCore} showMap={showMap}></AnalysisPanel>
            <Table dataSource={logs} rowKey="index"
                   expandedRowRender={LogPanelInline}
                   expandRowByClick={true}
            >
                <Column
                    title="#"
                    key="index"
                    width={10}
                    className="logtable-index"
                    render={ColumnIndex}
                />
                <Column
                    title="Uin"
                    dataIndex="uin"
                    key="uin"
                />
                <Column
                    title="Message"
                    dataIndex="msg"
                    key="msg"
                />
            </Table>
        </div>
    );
}
