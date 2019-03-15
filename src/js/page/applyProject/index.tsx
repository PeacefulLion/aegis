import * as React from 'react';
import api from '../../../js/common/api';
import { withRouter } from "react-router-dom";
import { render } from 'react-dom';
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Modal, Switch
} from 'antd';
  
const { Option } = Select;

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

function checkUrl(rule, value, callback) {
    if(/^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/ig.test(value)) {
        callback();
    } else if(/^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/ig.test(value)) {
        callback();
    } else if(value === '*') {
        callback();
    } else {
        callback(false);
    }
}

function checkIP(rule, value, callback) {
    if(value.trim().length === 0) {
        callback();
        return;
    }
    const error = value.split(',').some((ip) => {
        return !(/^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/ig.test(ip));
    });

    if(error) {
        callback(false);
    } else {
        callback();
    }
}

export function ApplyProject(props) {
    const {
        match,
        location,
        history,
        form
    } = props;

    const {
        getFieldDecorator,
        validateFields,
    } = form;

    function onSummit(e) {
        e.preventDefault();
        validateFields((err, values) => {
            if (err) {
                console.log('验证失败');
                console.log(err);
                return;
            }
            console.log(values);
            const {
                name,
                url,
                description,
                ip,
                online,
                userAgent,
                limitpv,
                userName
            } = values;

            const params = {
                name,
                description,
                url,
                blacklist: {
                    ip: ip ? ip.split(',') : [],
                    ua: userAgent ? userAgent.split(',') : []
                },
                online: online ? 1 : 0,
                limitpv,
                userName
            };

            api({
                method: 'GET',
                url: '//badjs2.ivweb.io/user/controller/applyAction/addApply.do',
                params
            })
                .then((result) => {
                    const modal = Modal.success({
                        title: '申请成功',
                        onOk: () => {
                            history.push('/applyprojectlist'); // 跳去申请页面
                            modal.destroy();
                        }
                    });
                })
                .catch((result) => {
                    const modal = Modal.error({
                        title: '申请失败',
                        content: JSON.stringify(result, null, 2)
                    });
                })
        });
    }

    return (
        <Form onSubmit={onSummit}>
            <Form.Item
                label="项目名称"
                required
                {...formItemLayout}
            >   
                {getFieldDecorator('name', {
                    initialValue: '',
                    rules: [{
                        required: true,
                        min: 1
                    }],
                })(
                    <Input placeholder="业务名字" />
                )}
            </Form.Item>

            <Form.Item
                label="业务URL"
                required
                {...formItemLayout}
                help="上报请求的 referer 与该 url 不匹配将被拒绝
                eg: http://www.qq.com/(绝对匹配) 和 *.qq.com 格式
                如果不希望服务器做 referer 检查, 请填写 *"
            >   
                {getFieldDecorator('url', {
                    initialValue: '',
                    rules: [{
                        required: true,
                        validator: checkUrl,
                    }],
                })(
                    <Input placeholder="业务url" id="validatingurl" />
                )}
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                label="业务描述"
            >   
                {getFieldDecorator('description', {
                    initialValue: ''
                })(
                    <Input placeholder="业务描述" />
                )}
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                label="IP限制"
                help="格式如下： 127.0.0.5,132.5.3.*,132.4.*"
            >   
                {getFieldDecorator('ip', {
                    initialValue: '',
                    rules: [{
                        validator: checkIP,
                    }],
                })(
                    <Input placeholder="拦截指定IP上报" />
                )}
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                label="userAgent限制"
                help="格式如下： Baiduspider,Googlespider"
            >
                {getFieldDecorator('userAgent', {
                    initialValue: ''
                })(
                    <Input placeholder="拦截指定userAgent上报" />
                )}
            </Form.Item>


            <Form.Item
                {...formItemLayout}
                label="项目是否上线"
            >   
                {getFieldDecorator('online', {
                    initialValue: false,
                    valuePropName: 'checked'
                })(
                    <Switch></Switch>
                )}
            </Form.Item>


            <Form.Item
                {...formItemLayout}
                label="最低PV阈值"
                help="低于此值将认为没有上线，不统计分数"
            >
                {getFieldDecorator('limitpv', {
                    initialValue: 300
                })(
                    <Input type="number" placeholder="300"  />
                )}
            </Form.Item>
            
            <Form.Item
                {...formItemLayout}
                label="负责人"
                help="多个负责人请用','分割，例如 lewischeng,linkzhu"
            >   
                {getFieldDecorator('userName', {
                    initialValue: ''
                })(
                    <Input placeholder="项目负责人" />
                )}
            </Form.Item>

            <Form.Item wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            }}>
            <Button type="primary" htmlType="submit">
                提交申请
            </Button>
        </Form.Item>
        </Form>
    )
}


const ApplyForm = Form.create()(ApplyProject);

export default withRouter(ApplyForm as any);