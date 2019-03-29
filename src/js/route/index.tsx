import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Divider } from 'antd';

import NavPath from '../component/navPath';
import Header from '../component/header';
import Sidebar from '../component/sidebar';
import Footer from '../component/footer';

import Home from '../page/home';
import Historylog from '../page/log-history';
import Realtimelog from '../page/log-realtime';
import OfflineLog from '../page/log-offline';
import Charts from '../page/charts';
import ProjectEdit from '../page/project-edit';
import ProjectMember from '../page/project-member';
import ProjectList from '../page/project-list';
import ProjectApply from '../page/project-apply';
import Sourcemap from '../page/sourcemap';

import menuConfig from '../config/menu';

import { loginCtx } from '../component/QQLogin/LoginProvider';
import authHOC from '../common/util/auth';
import { fetchProfile, logout } from '../action/auth';
import UserbindVerify from '../component/UserbindVerify';

const { Content } = Layout;

export function renderRouteItem(list) {
    return list.map((item, index) => {
        const {
            path,
            component,
            exactly = false,
            strict = false,
            child
        } = item;
        return [
            component ? <Route key={index} path={path} component={component} exactly={exactly} strict={strict}></Route> : null,
            child ? renderRouteItem(child) : null
        ]
    });
}

export function Frame(props) {
    const { auth, navpath, actions } = props;
    return (
        <loginCtx.Consumer>
            {
                value => {
                    return (
                    <Layout className="ant-layout-has-sider">
                        <Sidebar />
                        <Layout style={{
                            marginLeft: 200
                        }}>
                        <Header profile={auth} logout={actions.logout} />
                        <Content style={{ margin: '0 16px' }}>
                            {
                                value.userInfo ? (
                                    <div>
                                        <NavPath />
                                        <Divider></Divider>
                                        
                                        <div style={{ minHeight: document.documentElement.offsetHeight }}>
                                            {
                                                renderRouteItem(menuConfig)
                                            }
                                        </div>
                                    </div>
                                ) : null
                            }
                        </Content>
                        <Footer />
                        </Layout>
                    </Layout>
                )
                }
            }
        </loginCtx.Consumer>
    )
}

const mapStateToProps = (state) => {
    const { auth, menu } = state;
    return {
        auth: auth ? auth : null,
        navpath: menu.navpath
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({fetchProfile, logout}, dispatch)};
}

const HocApp = connect(mapStateToProps, mapDispatchToProps)(Frame);

const routes = (
    <Switch>
        <Route path="/" component={HocApp} />
    </Switch>
);

export default routes
