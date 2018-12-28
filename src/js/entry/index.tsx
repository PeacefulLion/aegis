import * as React from 'react';
import ReactDom from 'react-dom';
import { Layout, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';

import 'antd/dist/antd.css'; // 需要先引用，自己写的样式，才能有更高优先级覆盖

import Footer from '../component/footer';
import Header from '../component/header';
import LeftMenu from '../component/leftMenu';
import HistoryLog from '../page/historylog/index';
import About from '../page/about/index';
import Help from '../page/help/index';

import './index.less';

const {
    Content
} = Layout;

function Home(props) {
    const { children, match } = props;
    const {
        routes, params,
    } = match;

    return (
        <div>
            <Header></Header>
            <div className="main-container">
                <Route breadcrumbName="首页" component={LeftMenu}></Route>
                <div className="main-content">
                    <Switch>
                        <Route breadcrumbName="历史日志" path="/historylog" component={HistoryLog} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}

function Container() {
    return (
        <Router>
            <Route path="/" component={Home}>
            </Route>
        </Router>
    )
}

ReactDom.render(
    <Container></Container>,
    document.querySelector('#container')
);
