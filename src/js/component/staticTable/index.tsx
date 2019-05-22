import * as React from 'react';
import { Row, Col, Table } from 'antd';
import { dailyStatic } from '../../hook/common';
import './index.less';


const {
    useState,
    useEffect
} = React;

interface StaticTableProps {
    statics: dailyStatic[]
}


const { Column, ColumnGroup } = Table;

export default function StaticTable(props: StaticTableProps) {
    const { statics } = props;
    return (
        <div>
            <Table dataSource={statics} rowKey="index"
                expandRowByClick={true}
                pagination={false}
                className="aegis-logtalbe"
            >
                <Column
                    title="出现次数"
                    dataIndex="total"
                    key="total"
                    width={10}
                />
                <Column
                    title="错误内容"
                    dataIndex="title"
                    key="title"
                    width={118}
                />
            </Table>
        </div>
    );
}
