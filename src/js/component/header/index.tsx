import * as React from 'react';;
import Layout from 'antd/lib/layout';
import Avatar from 'antd/lib/avatar';
import { Link } from 'react-router-dom';

import './index.less';

export default function WraperHeader(props) {
    const {
        id
    } = props;

    return (
        <Layout.Header className="header">
            <div className="logo">
                WARDMONITOR
            </div>
            <div className="navlink">
                <div className="item">
                    <Avatar></Avatar>
                </div>
                <div className="item">
                    <Link to="/setting">设置</Link>
                </div>
                <div className="item">
                    <Link to="/logout">退出</Link>
                </div>
            </div>
        </Layout.Header>
    )
}
