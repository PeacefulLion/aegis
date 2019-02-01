import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout } from 'antd';

import NavPath from '../component/navPath';
import Header from '../component/header';
import Sidebar from '../component/sidebar';
import Footer from '../component/footer';

import Home from '../page/home';
import Historylog from '../page/historylog';
import Realtimelog from '../page/realtimelog';
import OfflineLog from '../page/offlinelog';
import Charts from '../page/charts';


import authHOC from '../common/util/auth'
import { fetchProfile, logout } from '../action/auth';
import UserbindVerify from '../component/UserbindVerify';

const { Content } = Layout;

export function Frame(props) {
    const { auth, navpath, actions } = props;

    return (
        <Layout className="ant-layout-has-sider">
            <Sidebar />
            <Layout>
            <Header profile={auth} logout={actions.logout} />
            <Content style={{ margin: '0 16px' }}>
                <NavPath data={navpath} />
                <div style={{ minHeight: document.documentElement.offsetHeight }}>
                    <Route path={'/Home'} component={Home} exactly={true} />
                    <Route path={'/historylog'} component={Historylog} exactly={true} />
                    <Route path={'/realtimelog'} component={Realtimelog} exactly={true} />
                    <Route path={'/offlinelog'} component={OfflineLog} exactly={true} />
                    <Route path={'/charts'} component={ Charts } exactly={true} />
                    <Route path="/userbind-verify" component={ UserbindVerify } exactly={true} />
                </div>
            </Content>
            <Footer />
            </Layout>
        </Layout>
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
