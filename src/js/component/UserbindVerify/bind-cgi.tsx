import { fromBadjs } from "../../common/api"; 
import { UserInfoWithOpenid } from "../QQLogin";

// export function isUserInfoResp(resp: LoginBySuccess): resp is UserInfo {
//     if ((resp as OpenidInfo).openid) {
//         return false; 
//     } else {
//         return true; 
//     }
// }


export function getVerifyUsers() {
    // 更新 Session 
    return fromBadjs.get<UserInfoWithOpenid[]>('/api/verify/users');
}

