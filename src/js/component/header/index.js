import React from 'react';
import { Header } from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Item from 'antd/lib/menu/MenuItem';
import { Link } from 'react-router-dom';

import './index.less';

export default function WraperHeader(props) {
    const {
        id
    } = props;

    return (
        <Header className="header"> 
            <div className="logo"></div>
            {/* <Menu defaultSelectedKeys={['0']} style={{"lineHeight": "64px", "float": "right"}} mode="horizontal" theme="dark">
                <Item key="0">
                    <Link to={'/index'}>日志查询</Link>
                </Item>
                <Item key="">
                    <Link to={`/userManage`}>用户管理</Link>
                </Item>
                <Item key="2">
                    <Link to={`/help`}>使用帮助</Link>
                </Item>
                <Item key="3">
                    <Link to={`/about`}>关于</Link>
                </Item>
            </Menu>  */}
        </Header>
    )
}
