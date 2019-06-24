import React, { useState, useEffect, useContext } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Table, Form, Select, Divider } from 'antd';
import { useApplyProjectList, applyProjectItem } from '~/js/hook/projectList';
import { loginCtx } from '~/js/component/QQLogin';
import { APPLY_STATUS_MAP } from '~/js/common/const/applyStatus';

const { Column } = Table;
const Option = Select.Option;

const applyStatusCollection = Object.values(APPLY_STATUS_MAP);

const operateOptions = ['待审核', '通过', '拒绝', '删除'];

export default function ApplyProjectList() {
    const { list, status, setStatus, updateProjectStatus } = useApplyProjectList();
    const [currentProjectID, setCurrentProjectID] = useState('ALL');
    // localList shows in table
    const [localList, setLocalList] = useState(list);
    const loginCtxValue = useContext(loginCtx);

    // sync localList with list
    useEffect(() => {
        setLocalList(list);
    }, [list]);

    const isAdmin = loginCtxValue.userInfo.role === 1;

    const currentStatusEntity = applyStatusCollection.find(o => o.value === status);

    function handelProjectChange(id: string, option) {
        // clear project or select ALL, then update localList by selected and set selected option value
        if (!id || option.key === 'ALL') {
            setLocalList(list);
            setCurrentProjectID('ALL');
        }
        // select a project
        else {
            setLocalList(list.filter(item => item.id === +id));
            setCurrentProjectID(id);
        }
    }

    function handleStatusChange(value) {
        setStatus(value);
        // reset current selected project to ALL
        setCurrentProjectID('ALL');
    }

    // filter project id and name
    function handleSelectFilter(input, option): boolean {
        return option.key.includes(input) || option.props.title.includes(input);
    }

    return (
        <div>
            <Form layout="inline">
                <Form.Item label="状态类型">
                    <Select
                        defaultValue={currentStatusEntity.value}
                        style={{ width: 120 }}
                        onChange={handleStatusChange}
                    >
                        {applyStatusCollection.map(item => {
                            return (
                                <Option key={item.key} value={item.value}>
                                    {item.text}
                                </Option>
                            );
                        })}
                    </Select>
                </Form.Item>

                <Form.Item label="当前状态的项目">
                    <Select
                        showSearch
                        allowClear
                        defaultValue="ALL"
                        style={{ width: 200 }}
                        value={currentProjectID}
                        onChange={handelProjectChange}
                        filterOption={handleSelectFilter}
                    >
                        <Option key="ALL" title="全部">
                            全部
                        </Option>
                        {list.map(item => {
                            return (
                                <Option key={item.id} title={item.name}>
                                    {item.id}. {item.name}
                                </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            </Form>
            <Divider />
            <Table dataSource={localList} rowKey="id" pagination={{ pageSize: 50 }}>
                <Column title="上报ID" dataIndex="id" key="id" />
                <Column
                    title="项目名"
                    key="name"
                    dataIndex="name"
                    render={(name, record: applyProjectItem) => {
                        return (
                            <Link key="link" to={`/projectedit/${record.id}`}>
                                {name}
                            </Link>
                        );
                    }}
                />
                <Column title="申请人" dataIndex="userName" key="userName" />
                <Column
                    title="申请时间"
                    dataIndex="createTime"
                    key="createTime"
                    render={createTime => {
                        return <span>{dayjs(createTime).format('YYYY-MM-DD')}</span>;
                    }}
                />
                <Column
                    title="上线"
                    dataIndex="online"
                    key="online"
                    render={online => {
                        return <span>{online === 2 ? '上线' : '下线'}</span>;
                    }}
                />
                <Column title="pv" dataIndex="limitpv" key="limitpv" />
                <Column
                    title="状态"
                    key="status"
                    dataIndex="status"
                    render={(status, record: applyProjectItem) => {
                        const changeProjectStatus = value => {
                            if (value === 3) {
                                if (confirm('确认删除该项目')) {
                                    updateProjectStatus(record.id, value);
                                }
                            } else {
                                updateProjectStatus(record.id, value);
                            }
                        };
                        return isAdmin ? (
                            <Select
                                key={record.id}
                                defaultValue={currentStatusEntity.value}
                                style={{ width: 120 }}
                                onChange={changeProjectStatus}
                            >
                                {operateOptions.map((name, index) => {
                                    return (
                                        <Option key={name} value={index}>
                                            {name}
                                        </Option>
                                    );
                                })}
                            </Select>
                        ) : (
                            <div>{currentStatusEntity.text}</div>
                        );
                    }}
                />
            </Table>
        </div>
    );
}
