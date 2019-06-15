import * as React from 'react';
import SpeedTable from '../../component/speedTable';
import { useSpeed } from '../../hook/speed';

import './index.less';
import QueryFormSpeed from '../../component/queryFormSpeed';

export default function Log(props) {
    let [speed, setSpeed, getSpeed ] = useSpeed([]);
    return (
        <div>
            <QueryFormSpeed onSummit={getSpeed} type="img"/>
            <SpeedTable statics={speed} />
        </div>
    );
}
