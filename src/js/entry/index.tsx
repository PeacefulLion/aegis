import 'antd/dist/antd.css'; // 需要先引用，自己写的样式，才能有更高优先级覆盖

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import routeInst from '../route';
import { HashRouter as Router } from 'react-router-dom';

import configureStore from '../store/configureStore';

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

ReactDom.render(
    <Root
        store={ store }
    />,
    document.getElementById('root')
);