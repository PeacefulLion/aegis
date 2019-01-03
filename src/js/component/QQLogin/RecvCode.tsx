import * as React from 'react';
import { useEffect } from 'react';
import { queryParse } from '../../common/utils';

export default function RecvCode() {
    const query = queryParse(window.location.search.substring(1)); 

    useEffect(() => {
        // 发送消息到 main 窗口
        window.parent.postMessage(query, location.origin); 
    }); 

    return (
        <div className="recv-container">
            加载中 ...
        </div>
    ) 
}
