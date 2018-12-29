import axios, { AxiosResponse } from 'axios';
import { queryStringify, QueryObj } from './utils';

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

export function baseTransform(resp: AxiosResponse) {
    const { retcode, errCode, ec, ret, msg, code } = resp.data;

    if (retcode === 0 || errCode === 0 || ec === 0 || ret === 0 || code === 0) {
        return resp.data.result || resp.data.data || resp.data;
    } else {
        return Promise.reject(resp.data);
    }
}

export const fromBadjs = {
    get<T>(pathname: string, query: QueryObj): Promise< T > {
        const qstr = queryStringify(query); 

        return api.get(`http://badjs2.ivweb.io${pathname}?${qstr}`)
            .then(baseTransform)
    }, 

    post<T>(pathname: string, data: object): Promise< T > {
        return api.post(`http://badjs2.ivweb.io${pathname}`, data)
            .then(baseTransform)
    }
} 

export default api;

