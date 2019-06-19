import * as React from 'react';
import {
    Form, Input, Select, Row, Col, Checkbox, Button, Switch
} from 'antd';

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
    if(/^(?=^.{3,255}$)[\*a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/ig.test(value)) {
        callback();
    } else if(/^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[\*a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*\/?$/ig.test(value)) {
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
        form,
        onSummit,
        btnText,
        ip = [],
        userAgent = [],
        userName,
        status = 0,
        name = '',
        appkey,
        url = '',
        codePath = '',
        blacklist,
        description = '',
        mail = '',
        online = 1,
        limitpv = 300
    } = props;

    const {
        getFieldDecorator,
        validateFields,
    } = form;

    function handlerSummit(e) {
        e.preventDefault();
        validateFields((err, values) => {
            if (err) {
                console.log('验证失败');
                console.log(err);
                return;
            }
            onSummit && onSummit(values);
        });
    }

    return (
        <Form onSubmit={handlerSummit}>
            <Form.Item
                label="项目名称"
                required
                {...formItemLayout}
            >
                {getFieldDecorator('name', {
                    initialValue: name,
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
                    initialValue: url,
                    rules: [{
                        required: true,
                        validator: checkUrl,
                    }],
                })(
                    <Input placeholder="业务url" id="validatingurl" />
                )}
            </Form.Item>

            <Form.Item
                label="代码仓库"
                {...formItemLayout}
                help="提供代码仓库能够帮助其他开发者更容易定位问题"
            >
                {getFieldDecorator('codePath', {
                    initialValue: codePath
                })(
                    <Input placeholder="请输入代码仓库地址，如：https://github.com/iv-web/badjs-ivweb" id="validatingcode" />
                )}
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                label="业务描述"
            >
                {getFieldDecorator('description', {
                    initialValue: description
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
                    initialValue: ip.join(','),
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
                    initialValue: userAgent.join(',')
                })(
                    <Input placeholder="拦截指定userAgent上报" />
                )}
            </Form.Item>


            <Form.Item
                {...formItemLayout}
                label="项目是否上线"
            >
                {getFieldDecorator('online', {
                    initialValue: online === 2,
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
                    initialValue: limitpv
                })(
                    <Input type="number" placeholder="300"  />
                )}
            </Form.Item>

            <Form.Item
                {...formItemLayout}
                label="负责人"
                help=""
            >
                {getFieldDecorator('userName', {
                    initialValue: userName
                })(
                    <Input placeholder="项目负责人" />
                )}
            </Form.Item>

            <Form.Item wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            }}>
            <Button type="primary" htmlType="submit">
                {btnText}
            </Button>
        </Form.Item>
        </Form>
    )
}

const ApplyForm = Form.create()(ApplyProject);

interface projectFormProps {
    onSummit?: Function
    btnText?: string
}

export default function wrap(props: projectFormProps) {
    return <ApplyForm {...props} />
}

