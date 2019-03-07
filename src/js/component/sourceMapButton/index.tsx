import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { useSMInfos } from '../../hook/logs'

import './index.less';
import {Button} from "antd";

function SourceMapButton(props) {
    const [SMInfos, getSMInfos] = useSMInfos({});
    const {
        history,
        target,
        rowNum = 0,
        colNum = 0,
    } = props;

    function getSMInfo() {
        if (target) {
            const file = target.match(/[^\/]+$/);
            const file_name = file[0].split('?')[0];
            return getSMInfos({name:file_name})
        }
    }

    function toSourcemap(line, column) {
        if (!target) {
            return
        }
        getSMInfo().then((result) => {
            const { path } = result;
            history.push({ pathname: "/sourcemap", map: path, line, column });
        }).catch((err) => {
            history.push({ pathname: "/sourcemap", line, column });
        })
    }

    return (
        <Button type="primary" icon="search" onClick={ (e) => { toSourcemap(rowNum, colNum)} } >SourceMap</Button>
    )
}

export default withRouter(SourceMapButton)
