import * as React from 'react';;
import StaticTable from '../../component/staticTable';
import { useStatics } from '../../hook/dailyStatics';

import './index.less';
import QueryFormStatics from '../../component/queryFormDailyStatics';
import { stat } from 'fs';

export default function Log(props) {
    let [statics, setStatics, getStatics ] = useStatics([]);
    return (
        <div>
            <QueryFormStatics onSummit={getStatics} />
            <StaticTable statics={statics} />
        </div>
    )
}
