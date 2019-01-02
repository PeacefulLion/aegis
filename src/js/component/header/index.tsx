import * as React from 'react'
import { Layout, Row, Col, Icon, Badge, Menu, Dropdown, Avatar, Popover } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import './index.less'

const { Header } = Layout;

function handleLogOut() {

}

function commonHeader(props) {
    const { profile = {} } = props;
    let username = profile.user ? profile.user.name : '';
    const menu = (
      <Menu>
        <Menu.Item>
          修改密码
        </Menu.Item>
        <Menu.Item>
          设置
        </Menu.Item>
        <Menu.Item>
          <a onClick={handleLogOut}>注销</a>
        </Menu.Item>
      </Menu>
    );

    const content = (
      <div>
        <p>欢迎使用wardmonitor</p>
      </div>
    );

    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <Row type="flex" justify="end" align="middle">
            <Col span={3}>
                <Badge className="header-icon" count={5}>
                <Link to="/mailbox">
                    <Icon type="mail" />
                </Link>
                </Badge>
                <Popover content={content} title="消息盒子" trigger="click">
                <Badge className="header-icon" dot>
                    <a href="#">
                    <Icon type="notification" />
                    </a>
                </Badge>
                </Popover>
            </Col>
            <Col span={3}>
                <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                    <Avatar style={{ verticalAlign: 'middle'}}>{username}</Avatar> <Icon type="down" />
                </a>
                </Dropdown>
            </Col>
        </Row>
      </Header>
    )
}

export default withRouter(commonHeader);
