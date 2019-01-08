import * as React from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

import { Layout } from 'antd';
import NavPath from '../navPath';
import Header from '../header';
import Sidebar from '../sidebar';
import Footer from '../footer';

import Home from '../../page/home';
import Historylog from '../../page/historylog';
import OfflineLog from '../../page/offlinelog';
import UserbindVerify from '../UserbindVerify';

const { Content } = Layout;

// Route 上下文
import { MenuRouteProvider, routeCtx } from './menu-route-layout-ctx';


export function MenuLayout() {
    return (
        // 接入 routeCtx 
        <routeCtx.Consumer>{ ctx => (

            <Layout className="ant-layout-has-sider">
                {/* 侧边栏 */}
                <Sidebar { ...ctx } />

                {/* 调试 */}
                {/* <pre>{ JSON.stringify(ctx.state, (k, v) => v, '  ') }</pre> */}
                
                <Layout>
                    <Header />

                    <Content style={{ margin: '0 16px' }}>
                        {/* 调试 */}
                        {/* <h1>{ JSON.stringify(ctx.state.navPath) }</h1> */}

                        <NavPath data={ ctx.state.navPath } />
                        <div style={{ minHeight: document.documentElement.offsetHeight }}>
                            <Route path={'/Home'} component={Home} exactly={true} />
                            <Route path={'/historylog'} component={Historylog} exactly={true} />
                            <Route path={'/offlinelog'} component={OfflineLog} exactly={true} />
                            <Route path="/userbind-verify" component={ UserbindVerify } exactly={true} />
                        </div>
                    </Content>

                    {/* footer */}
                    <Footer />
                </Layout>
            </Layout>

        )}</routeCtx.Consumer>
    )
}

/**
 * Main
 */
export function MenuRouteLayout() {
    return (
        <MenuRouteProvider>
            <Router>
                <Switch>
                    <Route path="/" component={ MenuLayout } />
                </Switch>
            </Router>
        </MenuRouteProvider>
    )
} 

