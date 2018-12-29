import { fromBadjs } from "../../common/api"; 

export type LoginBySuccess = {
    openid?: string
}

export type BindOpenidSuccess = {}

export function loginBy(code: string, redirect_uri: string) {
    return fromBadjs.post<LoginBySuccess>('/api/users/login-by-code', {
        code, redirect_uri
    });
}

export function bindOpenid(openid: string, loginName: string) {
    // 调接口 
    return fromBadjs.post<BindOpenidSuccess>('/api/users/bind-openid', {
        openid, loginName
    });
}
