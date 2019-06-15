import * as React from 'react';
import { Row, Col, Table } from 'antd';
import { speed } from '../../hook/common';
import './index.less';


const {
    useState,
    useEffect
} = React;

interface SpeedTableProps {
    statics: speed[]
}


const { Column, ColumnGroup } = Table;

export default function SpeedTable(props: SpeedTableProps) {
    const { statics } = props;
    return (
        <div>
            <Table dataSource={statics} rowKey='create_time'
                expandRowByClick={true}
                pagination={false}
                className="aegis-statics"
            >
                <Column
                    title="创建时间"
                    dataIndex="create_time"
                    key="create_time"
                    width={10}
                />
                <Column
                    title="url"
                    dataIndex="url"
                    key="url"
                    width={290}
                />
                <Column
                    title="平均耗时(ms)"
                    dataIndex="avg_time"
                    key="avg_time"
                    width={290}
                />
            </Table>
        </div>
    );
}
