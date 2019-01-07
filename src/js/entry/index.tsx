import 'antd/dist/antd.css'; // 需要先引用，自己写的样式，才能有更高优先级覆盖

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import routeInst from '../route';
import { HashRouter as Router } from 'react-router-dom';

import configureStore from '../store/configureStore';
import RecvCode from '../component/QQLogin/RecvCode';

import "./index.less"; 
import LoginProvider from '../component/QQLogin/LoginProvider';

const store = configureStore({});

const {
    useState
} = React;



function Root(props) {
    const [route, setRoute] = useState(routeInst);
    return (
        <Provider store={props.store}>
            <Router children={route}/>
        </Provider>
    )
}

function Container() {
    if (location.pathname === '/qq-connect') {
        return <RecvCode />
    } else {
        return (
            <Root store={ store } />
        )
    }
}

ReactDom.render(
    <LoginProvider component={ Container } />,
    document.getElementById('root')
);
