import 'antd/dist/antd.css'; // 需要先引用，自己写的样式，才能有更高优先级覆盖

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { MenuRouteLayout } from '../../js/component/MenuRouteLayout';

import RecvCode from '../component/QQLogin/RecvCode';

import "./index.less"; 

import LoginProvider from '../component/QQLogin/LoginProvider';

function UseRecvCode() {
    // 如果满足这些条件，说明当前页面是作为 iframe 插入、且是QQ登陆的时候的跳转页，URL 里带有 code 参数
    // 因此需要将 code 回传到父级组件中。
    if (location.pathname === '/qq-connect' || location.hash === '#/qq-connect' ||
        location.search.includes('code=')
    ) {
        return <RecvCode />
    } else {
        return <LoginProvider component={ MenuRouteLayout } />
    }
}

ReactDom.render(
    <UseRecvCode />,
    document.getElementById('root')
);
