import { fromBadjs } from "../../common/api"; 
import { UserInfoWithOpenid, VerifyStateValue } from "../QQLogin";

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

export function verifyAnUser(user: UserInfoWithOpenid) {
    console.log(user); 

    const goNext = confirm(`给用户 ${ user.loginName } 通过审核吗？`); 

    if (goNext) {
        return trustAnUser(user.loginName).then(res => {
            if (res.code === 0) {
                return Promise.resolve(); 
            } else {
                return Promise.reject(res); 
            }
        })
    } else {
        return Promise.reject(false); 
    }
}
