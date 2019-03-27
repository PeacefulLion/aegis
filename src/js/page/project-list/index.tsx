import * as React from 'react';;
import { useApplyProjectList, applyProjectItem } from '../../hook/applyProjectList';
import APPLY_STATUS from "../../common/const/applyStatus";
import { Link } from 'react-router-dom';
import { Row, Col, Table, Tooltip, Switch, Form, Button, Select } from 'antd';

const {
    useState,
    useEffect
} = React;
const { Column, ColumnGroup } = Table;
const Option = Select.Option;

const optionName= ['审核中', '已通过', '已拒绝', '全部'];


export default function ApplyProjectList(props) {
    console.log('render');
    const {
        list,
        status,
        setStatus,
        setList,
        setProjectStatus
    } = useApplyProjectList();

    const handleChange = function(value) {
        setStatus(value);
    }

    return (
        <div>
            <div className="logtable-control">
                <Button.Group>
                    状态类型
                    <Select defaultValue={optionName[status]} style={{ width: 120 }} onChange={handleChange}>
                        {
                            optionName.map((name, index) => {
                                return <Option key={name} value={index}>{name}</Option>
                            })
                        }
                    </Select>
                </Button.Group>
            </div>
            <Table dataSource={list} key={status}>
                <Column
                    title="上报ID"
                    dataIndex="id"
                    key="id"
                />
                <Column
                    title="项目名"
                    key="name"
                    dataIndex="name"
                    render={(name, record: applyProjectItem) => {
                        return (
                            <Link key="link" to={`/projectedit/${record.id}`} >
                                {name}
                            </Link>
                        )
                    }}
                />
                <Column
                    title="申请人"
                    dataIndex="userName"
                    key="userName"
                />
                <Column
                    title="状态"
                    key="status"
                    dataIndex="status"
                    render={(status, record: applyProjectItem) => {
                        const changeProjectStatus = (value) => {
                            setProjectStatus(record.id, value);
                        };
                        return (
                            <Select key="select" defaultValue={optionName[status]} style={{ width: 120 }} onChange={changeProjectStatus}>
                            {
                                optionName.map((name, index) => {
                                    return <Option key={name} value={index}>{name}</Option>
                                })
                            }
                            </Select>
                        )
                    }}
                />
            </Table>
        </div>
    );
}
