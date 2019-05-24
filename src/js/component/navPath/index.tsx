import * as React from 'react';
import { Breadcrumb, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter, matchPath } from 'react-router-dom';
import menuConfig from '../../config/menu';

import './index.less'

const {
  useState,
  useEffect
} = React;

const NavPath = (props) => {
    const {
        location
    } = props;

    const {
        pathname
    } = location;

    const [_pathname, setPathName] = useState(pathname);
    const [data, setData] = useState([]);

    useEffect(() => {
        const data = [];

        function checkPathName(items) {
            return items.some((item, index) => {
                const {
                    exact = true,
                    strict = false,
                    path,
                    child
                } = item;

                if(matchPath(pathname, {
                    path: path,
                    exact,
                    strict
                })) {
                    data.unshift(item);
                    return true
                } else if(child) {
                    if(checkPathName(child)) {
                        data.unshift(item);
                        return true;
                    }
                } else {
                    return false;
                }
            })
        }
        checkPathName(menuConfig);
        setData(data);
        window.scrollTo(0, 0);
    }, [pathname])

    const bread = data.map((item) => {
        return (
        <Breadcrumb.Item key={'bc-' + item.key}>
            {item.icon && <Icon type={item.icon} />}{item.name}
        </Breadcrumb.Item>
        )
    })
    return (
        <Breadcrumb style={{ margin: '12px 0' }}>
        <Breadcrumb.Item key='bc-0'>
            <Icon type='home'></Icon>
        </Breadcrumb.Item>
            {bread}
        </Breadcrumb>
    )
}

export default withRouter(NavPath as any);
