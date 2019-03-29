import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { MenuMode } from 'antd/lib/menu';
import menuConfig from '../../config/menu';

import './index.less'
import menu from '../../reducer/menu';
const SubMenu = Menu.SubMenu
const { Sider } = Layout;

const {
    useState,
    useEffect
} = React;

function SideBarMenu(nodes = []) {
    return nodes.map((item, i) => {
        const menu = SideBarMenu(item.child);

        const {
            showInMenu = true
        } = item;
        
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
                showInMenu ? (
                    <Menu.Item key={item.key}>
                        <Link to={item.path}>{item.icon && <Icon type={item.icon} />}{item.name}
                        </Link> 
                    </Menu.Item>
                ) : null
            );
        }
    });
}

export default function Sidebar(props) {
    const {
        items = menuConfig,
        openKeys = menuConfig.map((item) => item.key),
        activeKey = ''
    } = props;

    const [collapsed, setCollapsed] = useState(false);
    const [mode, setMode] = useState('inline');

    function handlerToggle() {
        setCollapsed(!collapsed);
        setMode(!collapsed ? 'vertical' : 'inline')
    }

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{
                overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
            }}
        >
            <div className="ant-layout-logo"></div>
            <Menu
                mode={mode as MenuMode} theme="dark"
                selectedKeys={[activeKey]}
                defaultOpenKeys={openKeys}
            >
                { 
                    SideBarMenu(items)
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