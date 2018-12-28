import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { Breadcrumb, Layout, Menu } from 'antd';

import LeftMenu from '../../component/leftMenu';
import RealTimeLog from '../../component/realTimeLog';
import Statistics from '../../component/statistics';

import './index.less';
import 'antd/dist/antd.css';


const {
    Content
} = Layout;

const {
    Item
} = Menu;

export function MainContent(props) {
    const {
        match,
        history
    } = props;

    const {
        url,
        params,
        path
    } = match;
    
    const {
        projectId
    } = params;

    return (
        <Content style={{
            background: '#fff', padding: 24, margin: 0, minHeight: 280,
        }}
        >
            <Route path={`${path}/log`} component={(props) => (
                <Log {...props} projectId={projectId}></Log>
            )}  />
            <Route path={`${path}/realtimelog`} component={RealTimeLog} projectId={projectId} />
            <Route path={`${path}/statistics`} component={Statistics} projectId={projectId} />
        </Content> 
    );
}

function Index(props) {
    const {
        match,
        history
    } = props;

    const [project, setProject] = useState(null);

    const {
        path,
        params
    } = match;

    function onSelect(e) {
        history.push(`/index/${e.key}/log`);
    }

    return (
        <Layout>
            <LeftMenu onSelect={onSelect} {...props.match}></LeftMenu>
            <Route path={`${path}/:projectId`} component={(props) => (
                <MainContent {...props}></MainContent>
            )} />
        </Layout>
    )
}

export default Index;