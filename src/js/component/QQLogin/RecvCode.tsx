import * as React from 'react';
import { useEffect } from 'react';
import { queryParse } from '../../common/utils';

function getQuery(url: string) {
    let num = url.indexOf('?');
    let data = url.substr(num + 1);  // id=3080&sex=man
    let newArray = []

    let arr = data.split('&');    // ["id=3080", "sex=man"]

    for (let i = 0; i < arr.length; i++) {
        num = arr[i].indexOf('=');
        if (num > 0) {
            let key = arr[i].substring(0, num);
            let val = arr[i].substr(num + 1);

            newArray[key] = val;
        }
    }
    return newArray;
}

export default function RecvCode() {
    const query = getQuery(location.toString());
    console.log(query,location.toString());
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
