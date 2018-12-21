import React from 'react';
import {   Row, Col, Avatar, Layout } from 'antd';
import { Header } from 'antd/lib/layout';
import { Link } from 'react-router-dom';

import './index.less';

export default function WraperHeader(props) {
    const {
        id
    } = props;

    return (
        <Header className="header">
            <div className="logo">
                WARDMONITOR
            </div>
            <div className="navlink">
                <div className="item">
                    <Avatar size="small" ></Avatar>
                </div>
                <div className="item">
                    <Link to="/setting">设置</Link>
                </div>
                <div className="item">
                    <Link to="/logout">退出</Link>
                </div>
            </div>
        </Header>
    )
}
