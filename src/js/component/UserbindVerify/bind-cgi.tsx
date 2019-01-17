import { fromBadjs } from "../../common/api"; 
import { UserInfoWithOpenid, VerifyStateValue } from "../QQLogin";
import { Modal } from "antd"; 

// export function isUserInfoResp(resp: LoginBySuccess): resp is UserInfo {
//     if ((resp as OpenidInfo).openid) {
//         return false; 
//     } else {
//         return true; 
//     }
// }
export type VerifyResult = {
    code: number, 
    message: string
}

export function getVerifyUsers() {
    // 更新 Session 
    return fromBadjs.get<UserInfoWithOpenid[]>('/api/verify/users');
}

export function trustAnUser(loginName: string) {
    return fromBadjs.post<VerifyResult>('/api/verify/trust_him', {
        loginName
    });
}

function confirmPromise(userName: string) {
    return new Promise((res, rej) => {
        Modal.confirm({
            title: '你确定吗？', 
            content: `给用户 ${ userName } 通过审核吗？`, 
            onOk: function() {
                res(); 
            }, 
            onCancel: () => rej(false)
        });
    });
}

export function verifyAnUser(user: UserInfoWithOpenid) {
    console.log(user); 

    return confirmPromise(user.loginName).then(ok => {
        return trustAnUser(user.loginName).then(res => {
            if (res.code === 0) {
                return Promise.resolve(); 
            } else {
                return Promise.reject(res); 
            }
        })
    })
}
