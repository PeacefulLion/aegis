import * as React from 'react';
import { Icon } from 'antd';

import './index.less';

export default function WrapIcon(props) {
    switch(props.type) {
        case 'now':
        case 'yyb':
        case 'huayang':
        case 'qq':
        case 'qzone':
        case 'qqcomic':
        case 'huayang':
        case 'nowSDK':
            return <div className={`ward-icon ${props.type}`} />
        case 'iOS':
            return <Icon {...Object.assign({}, props, {type: 'apple'})} ></Icon>
        default:
            return (
                <Icon {...props} ></Icon>
            );
    }
}