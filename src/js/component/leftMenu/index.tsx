import * as React from 'react';;
import { Menu, Layout, Icon } from 'antd';
import { Link } from 'react-router-dom';

import './index.less';

const {
    SubMenu,
    Item,
    ItemGroup
} = Menu;

export default function LeftMenu() {
    return (
        <div className="ward-sider">
            <Menu mode="inline" defaultOpenKeys={['log', 'speed', 'project', 'set', 'about']}>
                <SubMenu key="log" title="日志查询">
                    <Menu.Item key="historylog">
                        <Link to="/historylog">历史日志</Link>
                    </Menu.Item>
                    <Menu.Item key="realtimelog">
                        <Link to="/realtimelog">实时日志</Link>
                    </Menu.Item>
                    <Menu.Item key="offlinelog">
                        <Link to="/offlinelog">离线日志</Link>
                    </Menu.Item>
                    <Menu.Item key="statistics">统计</Menu.Item>
                </SubMenu>
                <SubMenu key="speed" title="页面测速">
                    <Menu.Item key="cgispeed">CGI测速</Menu.Item>
                    <Menu.Item key="imgspeed">图片测速</Menu.Item>
                    <Menu.Item key="pagespeed">页面测速</Menu.Item>
                </SubMenu>
                <SubMenu key='project' title="项目管理">
                    <Menu.Item key="apply">申请项目列表</Menu.Item>
                    <Menu.Item key="userrole">项目用户权限</Menu.Item>
                    <Menu.Item key="userlist">注册用户列表</Menu.Item>
                    <Menu.Item key="userbind-verify">
                        <Link to="/userbind-verify">用户绑定审核</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key='about' title="关于">
                    <Menu.Item key="help">使用帮助</Menu.Item>
                    <Menu.Item key="updatelog">更新日志</Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    )
}
