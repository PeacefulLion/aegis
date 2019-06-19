import * as React from 'react';
import {useApplyProjectList, applyProjectItem} from '../../hook/projectList';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import {Row, Col, Table, Tooltip, Switch, Form, Button, Select, Divider} from 'antd';
import {loginCtx} from '../../component/QQLogin';
import api from "../../common/api";

const {Column} = Table;
const Option = Select.Option;

const optionName = ['审核中', '已通过', '已拒绝', '全部'];
const operateOptions = ['待审核', '通过', '拒绝', '删除'];


export default function ApplyProjectList(props) {
    console.log('render');
    const {
        list,
        status,
        setStatus,
        setList,
        setProjectStatus
    } = useApplyProjectList();

    const handleChange = function (value) {
        setStatus(value);
    }

    return (
        <div>
            <Form layout="inline">
                <Form.Item label="状态类型">
                    <Select defaultValue={optionName[status]} style={{width: 120}} onChange={handleChange}>
                        {
                            optionName.map((name, index) => {
                                return <Option key={name} value={index}>{name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
            </Form>
            <Divider></Divider>
            <Table dataSource={list} key={status} pagination={{pageSize: 25}}>
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
                            <Link key="link" to={`/projectedit/${record.id}`}>
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
                    title="申请时间"
                    dataIndex="createTime"
                    key="createTime"
                    render={(createTime) => {
                        return (
                            <span>{dayjs(createTime).format('YYYY-MM-DD')}</span>
                        )
                    }}
                />
                <Column
                    title="上线"
                    dataIndex="online"
                    key="online"
                    render={(online) => {
                    return (
                        <span>{online === 2 ? '上线': '下线'}</span>
                    )
                }}
                />
                <Column
                    title="pv"
                    dataIndex="limitpv"
                    key="limitpv"
                />
                <Column
                    title="状态"
                    key="status"
                    dataIndex="status"
                    render={(status, record: applyProjectItem) => {
                        const changeProjectStatus = (value) => {
                            if (value === 3) {
                                if (confirm('确认删除该项目')) {
                                    setProjectStatus(record.id, value);
                                }
                            } else {
                                setProjectStatus(record.id, value);
                            }
                        };
                        return <loginCtx.Consumer>{({userInfo}) => (
                            userInfo.role === 0 ? <div>{optionName[status]}</div> :
                                <Select key={record.id} defaultValue={optionName[status]} style={{width: 120}}
                                        onChange={changeProjectStatus}>
                                    {
                                        operateOptions.map((name, index) => {
                                            return <Option key={name} value={index}>{name}</Option>
                                        })
                                    }
                                </Select>
                        )}</loginCtx.Consumer>
                    }}
                />
            </Table>
        </div>
    );
}
