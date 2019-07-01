import * as React from 'react';
import StaticTable from '../../component/staticTable';
import StaticTitle from '../../component/dailyStaticsTitle';
import { useStatics } from '../../hook/dailyStatics';

import './index.less';
import QueryFormStatics from '../../component/queryFormDailyStatics';

export default function Log(props) {
    let [statics, setStatics, getStatics, overview ] = useStatics([]);
    return (
        <div>
            <QueryFormStatics onSummit={getStatics} />
            <StaticTitle overview={overview} />
            <StaticTable statics={statics} />
        </div>
    );
}
