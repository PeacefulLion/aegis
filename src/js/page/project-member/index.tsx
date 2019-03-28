import * as React from 'react';
import { Card, Form, Select, Table, Button, PageHeader, Row, Typography, Divider, Input } from 'antd';
import { Link } from 'react-router-dom';
import APPLY_STATUS from "../../common/const/applyStatus";
import { useApplyProjectList, applyProjectItem } from '../../hook/projectList';
import { useProjectMembers } from '../../hook/projectMember';
import { NORMAL_USER, ADMIN } from '../../../js/common/const/role';

import './index.less';

const { Title, Paragraph, Text } = Typography;


const userType = [{
    name: '全部',
    value: -1
}, {
    name: '管理员',
    value: ADMIN
}, {
    name: '普通用户',
    value: NORMAL_USER
}]


const roleType = [{
    name: '管理员',
    value: ADMIN
}, {
    name: '普通用户',
    value: NORMAL_USER
}];

const {
    useState,
    useEffect,
    useRef
} = React;

const { Column, ColumnGroup } = Table;

const Option = Select.Option;

export default function ProjectMembers(props) {
    const {
        list,
        status
    } = useApplyProjectList(APPLY_STATUS.STATUS_PASS);

    const [role, setRole] = useState(-1);
    const [projectId, setProjectId] = useState(-1);

    const [project, setProject] = useState(null);
    const inputRef: any = useRef(null);

    const {
        data,
        deleteMember,
        setUserRoleChange,
        addUser
    } = useProjectMembers(role, projectId);

    function handelProjectChange(index) {
        const project = list[index];
        setProjectId(project.id);
        setProject(project);
    }

    function handleRoleChange(value) {
        setRole(value);
    }

    function handlerUserRoleChange(recordId, value) {
        setUserRoleChange(recordId, value);
    }

    function handlerAddUser() {
        addUser(inputRef.current.state.value);
    }

    return (
        <div>
            <Form  layout="inline">
                <Form.Item label="当前项目">
                    <Select
                        showSearch
                        defaultValue={"全部"}
                        style={{ width: 180 }}
                        onChange={handelProjectChange}
                        onSelect={handelProjectChange}
                        filterOption={(input, option: any) =>
                            option.props.value.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                            option.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        >
                        {
                            list.map((item, index) => {
                                return <Option title={item.name} key={item.id} value={index}>{item.id}.{item.name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="用户类型">
                    <Select defaultValue={"全部"} style={{ width: 180 }} onChange={handleRoleChange}>
                        {
                            userType.map((item, index) => {
                                return <Option key={item.value} value={item.value}>{item.name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
            </Form>
            <Divider></Divider>
            {
                project ? (
                    <div>
                        <Typography>
                            <Title>
                                {project.name}
                            </Title>
                        </Typography>
                        <Form  layout="inline">
                            <Form.Item>
                                <Input ref={inputRef} ></Input>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={handlerAddUser}>添加用户</Button>
                            </Form.Item>
                        </Form>
                        <Divider></Divider>
                    </div>
                ) : null
            }
            <Table dataSource={data} key={projectId}>
                <Column
                    title="成员"
                    key="chineseName"
                    dataIndex="chineseName"
                />
                <Column
                    title="角色"
                    key="role"
                    dataIndex="role"
                    render={(role, record: applyProjectItem) => {
                        return (
                            <Select defaultValue={role} style={{ width: 120 }} onChange={(value) => {
                                setUserRoleChange(record.id, value);
                            }}>
                                {
                                    roleType.map((item, index) => {
                                        return <Option key={item.value} value={item.value}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        )
                    }}
                />
                <Column
                    title="操作"
                    key="id"
                    dataIndex="id"
                    render={(id, record: applyProjectItem) => {
                        return (
                            <Button type="danger" onClick={() => {
                                deleteMember(id);
                            }}>删除</Button>
                        )
                    }}
                />
            </Table>
        </div>
    );
}
