import 'antd/dist/antd.css'; // 需要先引用，自己写的样式，才能有更高优先级覆盖

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { MenuRouteLayout } from '../../js/component/MenuRouteLayout';

import RecvCode from '../component/QQLogin/RecvCode';

import "./index.less"; 

import LoginProvider from '../component/QQLogin/LoginProvider';

function UseRecvCode() {
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
