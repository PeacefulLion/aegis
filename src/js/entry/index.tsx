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
    return <Root store={ store } />
}

function UseRecvCode() {
    console.log('in UseRecvCode:::::::::', location.search.includes('openid='))
    if (location.search.includes('openid=')) {
        return <RecvCode />
    } else {
        return <LoginProvider component={ Container } />
    }
}

ReactDom.render(
    <UseRecvCode />,
    document.getElementById('root')
);
