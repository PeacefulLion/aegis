import axios from 'axios';

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

api.interceptors.response.use((response) => {
    const { retcode, errCode, ec, ret, msg } = response.data;

    if(retcode === 0 || errCode === 0 || ec === 0 || ret ===0) {
        return response;
    } else {
        return Promise.reject(response.data);
    }
});

api.interceptors.response.use((response) => {
    return response.data.result || response.data.data || response.data;
});

export default api;

