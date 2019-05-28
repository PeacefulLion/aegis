import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import './index.less';
import Axios from 'axios';
const { useState, useEffect } = React;

export default function ChangeLog() {
    let [changelog, setChangelog] = useState('');
    useEffect(() => {
        // 不直接写async函数，否则会出现warnning
        const fetchData = async () => {
          const result = await Axios.get('https://raw.githubusercontent.com/iv-web/aegis/master/CHANGELOG.md');
          setChangelog(result.data);
        };
        fetchData();
      }, []);
    return (
        <div>
            <Markdown>{changelog}</Markdown>
        </div>
    )
}
