import * as React from 'react';
import './index.less';
import SourceMapShow from '../../component/sourceMapShow';
const _MAP = `http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.map`
const _SOURCEMAP = `http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.map`
export default function SourceMap(props) {
    const {line, column, map, source} = props.location;

    return (
        <div>
            <SourceMapShow
                codeLine={line}
                codeColumn={column}
                mapUrl={map}
                sourceUrl={source}
            ></SourceMapShow>
        </div>
    )
}
