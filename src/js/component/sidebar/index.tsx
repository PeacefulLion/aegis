import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { getAllMenu, updateNavPath, MenuItem } from '../../action/menu'


import './index.less'
import { MenuMode } from 'antd/lib/menu';
import { routeCtx } from '../MenuRouteLayout/menu-route-layout-ctx';
import { MenuRouteState, UpdateNavPathDispatch, MenuRouteCtx } from '../MenuRouteLayout/types';

const SubMenu = Menu.SubMenu
const { Sider } = Layout;

const {
    useState,
    useEffect
} = React;

function SideBarMenu(nodes = [], pkey?: string | number) {
    return nodes.map((item, i) => {
        const menu = SideBarMenu(item.child, item.key);

        if (menu.length > 0) {
            return (
                <SubMenu
                    key={item.key}
                    title={<span><Icon type={item.icon} /><span className="nav-text">{item.name}</span></span>}
                >
                {menu}
                </SubMenu>
            );
        } else {
            return (
                <Menu.Item key={item.key}>
                {
                    item.url ? <Link to={item.url}>{item.icon && <Icon type={item.icon} />}{item.name}</Link> : <span>{item.icon && <Icon type={item.icon} />}{item.name}</span>
                }
                </Menu.Item>
            );
        }
    });
}

export default function Sidebar(props: MenuRouteCtx) {
    const { state, updateNavPath } = props; 
    const { menuRoutes, activeKey, openKeys } = state; 

    const [collapsed, setCollapsed] = useState(false);
    const [mode, setMode] = useState('inline');

    function handlerToggle() {
        setCollapsed(!collapsed);
        setMode(!collapsed ? 'vertical' : 'inline')
    }

    function handlerMenuClick(item) {
        console.log('menu click', item); 
        updateNavPath(item.keyPath.reverse());
    }
    
    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
        >
            <div className="ant-layout-logo"></div>
            <Menu
                mode={mode as MenuMode} theme="dark"
                selectedKeys={[activeKey]}
                defaultOpenKeys={openKeys}
                onClick={handlerMenuClick}
            >
                { 
                    SideBarMenu(menuRoutes)
                }
            </Menu>
            <div className="sider-trigger">
                <Icon
                    className="trigger"
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={handlerToggle}
                />
            </div>
        </Sider>
    )
}
