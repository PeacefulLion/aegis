import { MenuRoute } from "./types";

const menu: MenuRoute[] = [
    {
        key: '5',
        name: '主页',
        icon: 'home',
        url: '/home'
    },
    {
        key: '1',
        name: '日志',
        icon: 'file',
        child: [{
            name: '历史日志',
            key: '102',
            url: '/historylog'
        }, {
            name: '实时日志',
            key: '103',
            url: '/realtimelog'
        }, {
            name: '离线日志',
            key: '104',
            url: '/offlinelog'
        }, {
            name: '统计',
            key: '105',
            url: '/statics'
        }]
    }, 
    {
        key: '2',
        name: '测速',
        icon: 'clock-circle',
        child: [{
            name: 'CGI测速',
            key: '201'
        }, {
            name: '图片测速',
            key: '202'
        }, {
            name: '页面测速',
            key: '203'
        }]
    }, 
    {
        key: '3',
        name: '项目管理',
        icon: 'project',
        child: [{
            name: '申请项目列表',
            key: '301'
        }, {
            name: '项目用户权限',
            key: '302'
        }, {
            name: '注册用户列表',
            key: '303'
        }, {
            name: '用户绑定审核', 
            key: '304',
            url: '/userbind-verify'
        }]
    }, 
    {
        key: '4',
        name: '关于',
        icon: 'solution',
        child: [{
            name: '使用帮助',
            key: '401'
        }, {
            name: '更新日志',
            key: '402'
        }]
    }
]

export default menu;
