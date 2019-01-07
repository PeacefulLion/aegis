import * as React from "react"; 

import { getVerifyUsers } from "./bind-cgi";
import { loginCtx, UserInfo, UserInfoWithOpenid } from "../QQLogin";

function UB(props: { userInfo: UserInfo }) {
    const [userList, setUserList] = React.useState([] as UserInfoWithOpenid[])

    React.useEffect(() => {
        getVerifyUsers().then(newUserList => {
            console.log('getVerifyUsers', newUserList); 

            setUserList(newUserList); 
        })
    }, []); 

    const list = userList.map((user, idx) => {
        return (
            <div className="bind-user" key={ idx }>
                { idx + 1 }: 名字: { user.loginName }; 想绑定的 userId { user.openid }; 当前审核状态 { ['未提交审核', '审核中', '已绑定'][user.verify_state] }
            </div>
        )
    });

    return (
        <div>
            <h1>列表</h1>
            { list }
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
