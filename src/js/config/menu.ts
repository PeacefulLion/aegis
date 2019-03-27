export type MenuRoute = {
    key: string, 
    name: string, 
    icon?: string, 
    url?: string,
    child?: MenuRoute[]
}

const menu: MenuRoute[] = [{
    key: '5',
    name: '主页',
    icon: 'home',
    url: '/home'
}, {
    key: '1',
    name: '日志',
    icon: 'file',
    child: [{
        name: '项目历史日志',
        key: '102',
        url: '/historylog'
    }, {
        name: '项目实时日志',
        key: '103',
        url: '/realtimelog'
    }, {
        name: '项目离线日志',
        key: '104',
        url: '/offlinelog'
    }, {
        name: '图表',
        key: '105',
        url: '/charts'
    }]
}, {
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
}, {
    key: '3',
    name: '项目管理',
    icon: 'project',
    child: [{
        name: '申请项目',
        key: '301',
        url: '/projectapply'
    }, {
        name: '项目列表',
        key: '302',
        url: '/projectlist'
    }, {
        name: '项目用户权限',
        key: '303'
    }, {
        name: '注册用户列表',
        key: '304'
    }, {
        name: '用户绑定审核', 
        key: '305',
        url: '/userbind-verify'
    }]
}, {
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
}]

export default menu;
