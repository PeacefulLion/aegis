import * as React from 'react'
import { withRouter, matchPath } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { getAllMenu, updateNavPath, MenuItem, selectMenu } from '../../action/menu'


import './index.less'
import { MenuMode } from 'antd/lib/menu';

const SubMenu = Menu.SubMenu
const { Sider } = Layout;

const {
    useState,
    useEffect
} = React;

const isActive = (path, history) => {
    return matchPath(path, {
        path: history.location.pathname,
        exact: true,
        strict: false
    })
}

class Sidebar extends React.Component {
    state = {
        collapsed: false,
        mode: 'inline'
    }

    props: any

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            mode: !this.state.collapsed ? 'vertical' : 'inline',
        });
    }

    handlerCollapse = () => {

    }

    componentDidMount () {
        // this.props.getAllMenu()
    }

    handlerMenuClick = (item) => {
        this.setState(item);
        
        this.props.updateNavPath(item.keyPath, item.key);
    }

    private _renderMenu(nodes = [], pkey?: string | number) {
        return nodes.map((item, i) => {
            const menu = this._renderMenu(item.child, item.key);

            if (menu.length > 0) {
                return (
                    <SubMenu
                        key={'sub'+item.key}
                        title={<span><Icon type={item.icon} /><span className="nav-text">{item.name}</span></span>}
                    >
                    {menu}
                    </SubMenu>
                );
            } else {
                return (
                    <Menu.Item key={'menu'+item.key}>
                    {
                        item.url ? <Link to={item.url}>{item.icon && <Icon type={item.icon} />}{item.name}</Link> : <span>{item.icon && <Icon type={item.icon} />}{item.name}</span>
                    }
                    </Menu.Item>
                );
            }
        });
    }

    render () {
        const { items, updateNavPath, history, openKey, activeKey } = this.props
        const { collapsed, mode } = this.state

        const menu = this._renderMenu(items);

        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                onCollapse={this.handlerCollapse}
            >
                <div className="ant-layout-logo"></div>
                <Menu
                    mode={mode as MenuMode} theme="dark"
                    selectedKeys={[activeKey]}
                    defaultOpenKeys={[openKey]}
                    onClick={this.handlerMenuClick}
                >
                    {menu}
                </Menu>
                <div className="sider-trigger">
                    <Icon
                        className="trigger"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />
                </div>
            </Sider>
        )
    }
    }


function mapStateToProps(state) {
    return {
        items: state.menu.items,
        openKey: state.menu.openKey,
        activeKey: state.menu.activeKey,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllMenu: bindActionCreators(getAllMenu, dispatch),
        selectMenu: bindActionCreators(selectMenu, dispatch),
        updateNavPath: bindActionCreators(updateNavPath, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
