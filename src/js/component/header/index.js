import React from 'react';
import { Header } from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Item from 'antd/lib/menu/MenuItem';

import './index.less';

export default function WraperHeader(props) {
    console.log('header');
    return (
        <Header className="header" > 
            <div className="logo"></div>
            <Menu mode="horizontal" theme="dark">
                <Item>
                    项目管理
                </Item>
                <Item>
                    用户管理
                </Item>
                <Item>
                    开发指引
                </Item>
                <Item>
                    使用帮助
                </Item>
            </Menu>            
        </Header>
    )
}
