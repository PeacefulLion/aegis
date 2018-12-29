import api from "../../common/api"; 
import { AxiosPromise } from "axios";

export type LoginByResponse = {
    openid?: string
}

export function loginBy(code: string, redirect_uri: string): Promise<any> {
    return api.post('http://badjs2.ivweb.io/api/users/login-by-code', {
        code, redirect_uri
    });
}

export function bindOpenid(openid: string, loginName: string) {
    // 调接口 
    return api.post('http://badjs2.ivweb.io/api/users/bind-openid', {
        openid, loginName
    });
}

