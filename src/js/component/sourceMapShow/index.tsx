import * as React from 'react';

import { List, Input } from 'antd';
import { DateInput } from '../rangeDateInput';
import TagList from '../tagList';
import logType from '../../common/const/logType';

import { useBusinessList, Business } from '../../hook/businessList';

import sourceMap from 'source-map';
import './index.less';

const {
    useState,
    useRef
} = React;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};

export interface Props {
    codeLine?: number
    codeColumn?: number
    mapUrl: string
    sourceUrl: string
}
  
const LOGTYPE_OPTIONS = [
    'info',
    'error',
    'debug'
];
const codeFileInfoInit = {
    originalFileName: '',
    line: '',
    column: ''
}

export default function SourceMapShow({ codeLine, codeColumn, mapUrl, sourceUrl}:Props) {
    // const [g_showResult, setShowResult] = useState(null);
    // const [g_sourcemap_flag, setSourcemapFlag] = useState(null);
    const [data, setData] = useState([]);
    const [codeFileInfo, setCodeFileInfo] = useState(codeFileInfoInit);
    const [initFlag, setInitFlag] = useState(false);

    let g_showResult = null;
    let g_sourcemap_flag = null;
    const SOURCEMAP_GETTED = 0;
    const SOURCEMAP_URL = 1;
    const SOURCEMAP_FILE = 2;

    init();

    async function init() {
        if (initFlag) {
            return;
        }
        sourceMap.SourceMapConsumer.initialize({
            "lib/mappings.wasm":"https://unpkg.com/source-map@0.7.3/lib/mappings.wasm"
        });
        let mapString = await getMapString(mapUrl);
        // let mapString = await getMapString();
        const info = await getCodeFileInfo(mapString, codeLine, codeColumn);
        console.log(`setCodeFileInfo info`)
        console.log(info)
        if (info) {
            setCodeFileInfo(info);
        } else {
            setCodeFileInfo(codeFileInfoInit);
        }

        setInitFlag(true);
    }

// make sure a string is always the same length
    function pad(str, len) {
        str = str + "";
        while(str.length < len) {
            str = str + " ";
        }
        return str;
    }

    function formatLineNumber(currentLine, line, padLength) {
        if (currentLine == line) {
            return (pad(currentLine, padLength - 1) + ">| ");
        } else {
            return pad(currentLine, padLength) + "| ";
        }
    }

    function showFileContent(codeFileInfo, content) {
        // Data is a buffer that we need to convert to a string
        // Improvement: loop over the buffer and stop when the line is reached
        let linesBefore = 10;
        let linesAfter = 10;
        let lines = content.split("\n");
        // console.log(lines)
        let line = codeFileInfo.line;
        if(line > lines.length){
            console.log("Line " + line + " outside of file bounds (" + lines.length + " lines total).");
        } else {
            let minLine = Math.max(0, line-(linesBefore + 1));
            let maxLine = Math.min(lines.length, line+linesAfter);
            let code = lines.slice(minLine, maxLine);
            // console.log("Code Section: ");
            let padLength = Math.max(("" + minLine).length, ("" + maxLine).length) + 1;


            let currentLine = minLine;
            let listArray = [];
            for(let i = 0 ; i < code.length ; i++) {
                const codeString = formatLineNumber(++currentLine, line, padLength) + code[i];
                listArray.push(codeString);
                // console.log(codeString);
                if (currentLine == line && codeFileInfo.column) {
                    const codeTrangle = pad('', padLength + 2 + codeFileInfo.column);
                    listArray.push(codeTrangle + '^');
                    // console.log( codeTrangle + '%c^', "color:red");
                }
            }
            // data = listArray;
            setData(listArray);
        }

        // console.log("");
        // console.log("");
    }

    function showCode(codeText) {
        if(g_sourcemap_flag === SOURCEMAP_FILE) {
            getCodeFileInfo(codeText, codeLine, codeColumn);
            g_sourcemap_flag = SOURCEMAP_GETTED;
            return;
        }
        if(g_sourcemap_flag === SOURCEMAP_GETTED && typeof g_showResult === 'function') {
            g_showResult(codeText);
        }
    }
    function changeHandler(event: any) {
        openFile(event);
    }
    async function openFile(event) {
        const input = event.target;
        let reader = new FileReader();
        reader.onload = function() {
            const text = reader.result;
            console.log(reader);
            showCode(text);
        };
        await reader.readAsText(input.files[0]);
    };

    function openFileInit(codeFileInfo) {
        return (content) => {
            showFileContent(codeFileInfo, content)
        }
    }

    async function getMapString(mapUrl) {
        if (mapUrl) {
            g_sourcemap_flag = SOURCEMAP_URL;
            const response = await fetch(mapUrl);
            let mapString = await response.text();
            // let mapStringTemp = JSON.parse(mapString);
            // mapStringTemp.sourceRoot = `./src`
            // mapString = JSON.stringify(mapStringTemp);

            // const res = await axios({
            //       method: 'post',
            //       url: mapUrl,
            //       responseType: 'arraybuffer'
            //   })
            // const mapString = new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '');

            // console.log(mapString);
            if(mapString) {
                g_sourcemap_flag = SOURCEMAP_GETTED;
            }
            return mapString
        } else {
            // document.querySelector('#tip').innerHTML = `请上传sourceMap文件`;
            g_sourcemap_flag = SOURCEMAP_FILE;
            return null;
        }
    }

    async function getCodeFileInfo(mapString, line, column) {
        if (!mapString || !line || !column) {
            return;
        }

        return await sourceMap.SourceMapConsumer.with(mapString, null, async consumer => {

            console.log(consumer.sources);

            const codeFileInfo = consumer.originalPositionFor({
                line,
                column
            })
            console.log(codeFileInfo);
            let originalFileName = codeFileInfo.source.replace("webpack:///", "").replace("/~/", "/node_modules/").replace(/\?[0-9a-zA-Z\*\=]+$/, "");
            // document.querySelector('#tip').innerHTML = `请上传源文件： ${originalFileName}`;
            codeFileInfo.originalFileName = originalFileName;
            g_showResult = openFileInit(codeFileInfo);

            if (sourceUrl) {
                const s_response = await fetch(sourceUrl);
                let codeText = await s_response.text();
                showCode(codeText);
            }

            return codeFileInfo;
        });

    }

    return (
        <div>
            {
                !mapUrl ?
                    <div>该项目没有sourcemap</div> :
                    <div>
                        <div>文件名：{codeFileInfo.originalFileName}</div>
                        <div>行数：{codeFileInfo.line}</div>
                        <div>列数：{codeFileInfo.column}</div>
                    </div>

            }
            {/*<List*/}
                {/*header={<div>代码如下（上下10行）</div>}*/}
                {/*footer={<div>代码结束</div>}*/}
                {/*bordered*/}
                {/*dataSource={data}*/}
                {/*renderItem={item => (<List.Item className={['item', item.indexOf('^') !== -1 || item.indexOf('>') !== -1 ? 'color-red' : ''].join(' ')}>{item}</List.Item>)}*/}
            {/*/>*/}
            {/*<div className={'changeline'}>{data.join('\n')}</div>*/}
        </div>
    )
}
