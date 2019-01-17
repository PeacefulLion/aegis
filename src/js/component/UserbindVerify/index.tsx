import * as React from "react"; 
import { Table, Divider } from "antd"; 
import { getVerifyUsers, verifyAnUser } from "./bind-cgi";
import { loginCtx, UserInfo, UserInfoWithOpenid } from "../QQLogin";


function UB(props: { userInfo: UserInfo }) {
    const [userList, setUserList] = React.useState([] as UserInfoWithOpenid[]); 

    const initLoad = () => {
        getVerifyUsers().then(newUserList => {
            console.log('getVerifyUsers', newUserList); 

            setUserList(newUserList); 
        })
    }

    React.useEffect(initLoad, []); 

    const intro = (
        <div style={{ marginTop: '1.5em', paddingLeft: '16px' }}>
            共计 { userList.length } 个用户，有 { userList.filter(e => +e.verify_state === 1).length } 个待审核 <br />
            
            审核状态分三种 0 1 2，分别对应: <br />
            
            老用户未申请

            <Divider type="vertical" />
            申请审核中

            <Divider type="vertical" />
            审核通过
        </div>
    ); 

    return (
        <div>
            <h1 style={{ paddingLeft: '14px' }}>用户绑定审核</h1>
            <Table dataSource={ userList } pagination={ false }  columns={[{
                title: '用户 RTX', key: 'loginName',
                dataIndex: 'loginName'
            }, {
                title: '当前审核状态', key: 'verify_state',
                dataIndex: 'verify_state',
                render: verify_state => 
                    <span>{ ['老用户暂未登陆 ⌛️', '待审核 ⚖️', '已审核 ✅'][parseInt(verify_state, 10)] }</span>
            }, {
                title: '操作', 
                key: 'action', 
                render: (text, record) => {
                    if (+record.verify_state === 1) {
                    return <a href="javascript:;" onClick={
                        () => verifyAnUser(record).then(() => {
                            // 审核成功
                            initLoad(); 
                        }).catch(err => {
                            if (err) {
                                alert('错误，原因：' + JSON.stringify(err)); 
                            }
                        })
                    }>审核通过?</a>
                    } else if (+record.verify_state === 0) {
                        return <span>无操作</span>
                    } else {
                        return <span>已审核</span>
                    }

                    // <span>
                    //   <a href="javascript:;">{ record.verify_state }</a>
                    //   <Divider type="vertical" />
                    //   <a href="javascript:;">Delete</a>
                    // </span>
                }
            }]} />

            { intro }
        </div>
    )
}

export default function() {
    return (
        <loginCtx.Consumer>{
            ({ userInfo }) => {
                if (!userInfo) {
                    return <div>未登陆，请登录</div>
                } else {
                    return userInfo.role < 1 ? 
                        <div>权限不足，请联系管理员</div> : 
                        <UB userInfo={ userInfo } />
                }
            }
        }</loginCtx.Consumer>
    )
}
