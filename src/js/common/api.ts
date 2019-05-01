import axios, { AxiosResponse } from 'axios';
import { queryStringify, QueryObj } from './utils';
import { any } from 'prop-types';

const baseURL = '';

export const api = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        post: {
            // 本项目里面所有的 post 都是form-data
        }
    }
});

export function retcodeInterceptor(resp: AxiosResponse) {
    const config: any = resp.config;

    const {
        transformRetcode = true
    } = config;

    if(!transformRetcode) { // 如果不转换，直接退出
        return resp;
    }

    if(['retcode', 'errCode', 'ec', 'ret', 'code'].some((ret) => resp.data[ret] === 0)) {
        return resp.data.result || resp.data.data || resp.data;
    } else {
        return Promise.reject(resp.data);
    }
}

export function errorInterceptor(err) {
    const isTimeout = err.message.indexOf('timeout') > -1;
    const isNetworkErr = err.message === 'Network Error';

    if(isTimeout) {
        // alert('请求超时,请稍后重试');
    } else if(isNetworkErr) {
        // alert('网络错误，请检查网络后重试');
    } else {
        // alert('请求异常，请稍后重试');
    }
    return Promise.reject(err);
}

export const fromBadjs = {
    get<T>(pathname: string, query: QueryObj = {}): Promise< T > {
        const qstr = queryStringify(query);
        const qs = qstr ? `?${qstr}` : '';
        return api.get(`//${location.host}${pathname}${qs}`) as any;
    },

    post<T>(pathname: string, data: object): Promise< T > {
        return api.post(`//${location.host}${pathname}`, data) as any;
    }
}


api.interceptors.response.use(null, errorInterceptor);
api.interceptors.response.use(retcodeInterceptor);


export default api;

