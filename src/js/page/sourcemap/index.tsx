import * as React from 'react';
import './index.less';
import SourceMapShow from '../../component/sourceMapShow';

export default function SourceMap() {

    return (
        <div>
            <SourceMapShow
                codeLine={1}
                codeColumn={1028}
                mapUrl={`http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.map`}
                sourceUrl={`http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.js`}
            ></SourceMapShow>
        </div>
    )
}
