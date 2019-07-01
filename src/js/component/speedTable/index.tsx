import * as React from 'react';
import { Row, Col, Table } from 'antd';
import { speed } from '../../hook/common';
import { getSpeedConfig } from './process-echars-config';
import './index.less';
import * as echarts from 'echarts';
import echartTheme from '../../common/data/echarts-theme';

const {
    useState,
    useEffect,
    useRef
} = React;

interface SpeedTableProps {
    statics: speed[],
    timeGranularity: string
}


const { Column, ColumnGroup } = Table;

export default function SpeedTable(props: SpeedTableProps) {
    const { statics, timeGranularity } = props;
    const $speedChartDom = useRef(null);
    if (statics.length === 0) {
        return null;
    }
    useEffect(() => {
        const config = getSpeedConfig(statics, timeGranularity);
        const charts = echarts.init($speedChartDom.current, 'westeros');
        charts.setOption(config);
        return () => {
            if($speedChartDom.current) {
                const inst = echarts.getInstanceByDom($speedChartDom.current); // 销毁
                inst && inst.dispose();
            }
        }
    });
    return (
        <div>
            <div className="chartwrapper appchart" ref={$speedChartDom}></div>
        </div>
        // <div>
        //     <Table dataSource={statics} rowKey='create_time'
        //         expandRowByClick={true}
        //         pagination={false}
        //         className="aegis-statics"
        //     >
        //         <Column
        //             title="创建时间"
        //             dataIndex="create_time"
        //             key="create_time"
        //             width={10}
        //         />
        //         <Column
        //             title="url"
        //             dataIndex="url"
        //             key="url"
        //             width={290}
        //         />
        //         <Column
        //             title="平均耗时(ms)"
        //             dataIndex="avg_time"
        //             key="avg_time"
        //             width={290}
        //         />
        //     </Table>
        // </div>
    );
}
