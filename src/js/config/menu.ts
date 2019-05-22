import {  } from "module";

import Home from '../page/home';
import Historylog from '../page/log-history';
import Realtimelog from '../page/log-realtime';
import OfflineLog from '../page/log-offline';
import Charts from '../page/charts';
import ProjectEdit from '../page/project-edit';
import ProjectMember from '../page/project-member';
import ProjectList from '../page/project-list';
import ProjectApply from '../page/project-apply';
import UserbindVerify from "../component/UserbindVerify";
import DailyStatics from '../page/project-daily-statics';

import Sourcemap from '../page/sourcemap';

import { ReactComponentLike } from "prop-types";


export type MenuRoute = {
    key: string, 
    name: string, 
    icon?: string, 
    path?: string,
    showInMenu?: boolean,
    component?: ReactComponentLike,
    child?: MenuRoute[]
}

const menu: MenuRoute[] = [{
    key: '5',
    name: '主页',
    icon: 'home',
    path: '/home',
    component: Home
}, {
    key: '1',
    name: '日志',
    icon: 'file',
    path: '/log',
    child: [{
        name: '项目历史日志',
        key: '102',
        path: '/historylog',
        component: Historylog
    }, {
        name: '项目实时日志',
        key: '103',
        path: '/realtimelog',
        component: Realtimelog
    }, {
        name: '项目离线日志',
        key: '104',
        path: '/offlinelog',
        component: OfflineLog
    }, {
        name: '图表',
        key: '105',
        path: '/charts',
        component: Charts
    }, {
        name: 'SourceMap',
        key: '106',
        path: '/sourcemap',
        component: Sourcemap,
        showInMenu: false
    }]
}, {
    key: '2',
    name: '测速',
    icon: 'clock-circle',
    path: '/speed',
    child: [{
        name: 'CGI测速',
        key: '201',
        path: '/cgispeed'
    }, {
        name: '图片测速',
        key: '202',
        path: '/imgspeed'
    }, {
        name: '页面测速',
        key: '203',
        path: '/pagespeed'
    }]
}, {
    key: '3',
    name: '项目管理',
    icon: 'project',
    path: '/project',
    exactly: true,
    child: [{
        name: '申请项目',
        key: '301',
        path: '/projectapply',
        component: ProjectApply
    }, {
        name: '项目列表',
        key: '302',
        path: '/projectlist',
        component: ProjectList
    }, {
        name: '项目用户管理',
        key: '303',
        path: '/projectmember',
        component: ProjectMember
    }, {
        name: '用户绑定审核', 
        key: '305',
        path: '/userbind-verify',
        component: UserbindVerify
    }, {
        showInMenu: false,
        name: '项目编辑',
        key: '306',
        path: '/projectedit',
        component: ProjectEdit
    }, {
        name: '项目日志统计',
        key: '307',
        path: '/project-daily-statics',
        component: DailyStatics
    }]
}, {
    key: '4',
    name: '关于',
    icon: 'solution',
    path: '/about',
    child: [{
        name: '使用帮助',
        path: '/help',
        key: '401'
    }, {
        name: '更新日志',
        path: '/changelog',
        key: '402'
    }]
}]

export default menu;
