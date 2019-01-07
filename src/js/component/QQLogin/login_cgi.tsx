import { fromBadjs } from "../../common/api"; 

export type OpenidInfo = {
    openid: string
}

export type LoginBySuccess = OpenidInfo | UserInfo; 

export type BindOpenidSuccess = UserInfo; 

export type VerifyStateValue = 0 | 1 | 2; 
export type UserInfo = {
    /**
     * RTX
     */
    loginName: string, 
    chineseName: string,

    /**
     * 权限
     */
    role: 0 | 1, 

    /**
     * email 
     */
    email: string | null, 

    /**
     * 验证状态 0: 未验证; 1: 审核中; 2: 已验证
     */
    verify_state: VerifyStateValue
}

export type UserInfoWithOpenid = UserInfo & {
    /**
     * openid 只在默写特殊场合中有用
     */
    openid: string
}

export function isUserInfoResp(resp: LoginBySuccess): resp is UserInfo {
    if ((resp as OpenidInfo).openid) {
        return false; 
    } else {
        return true; 
    }
}

export function loginBy(code: string, redirect_uri: string) {
    return fromBadjs.post<LoginBySuccess>('/api/users/login-by-code', {
        code, redirect_uri
    })
}

export function bindOpenid(openid: string, loginName: string) {
    // 调接口 
    return fromBadjs.post<BindOpenidSuccess>('/api/users/bind-openid', {
        openid, loginName
    });
}

export function getUserInfo() {
    return fromBadjs.get<UserInfo>('/api/users/me'); 
}

export function updateSession() {
    // 更新 Session 
    return fromBadjs.get<UserInfo>('/api/users/update_session'); 
}
