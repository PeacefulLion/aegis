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

import authHOC from '../common/util/auth'
import { fetchProfile, logout } from '../action/auth';

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
                <div style={{ minHeight: 360 }}>
                    <Redirect to="/Home"/>
                    <Route path={'/Home'} component={Home} exactly={true} />
                    <Route path={'/historylog'} component={Historylog} exactly={true} />
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