import { useState, useEffect } from 'react';
import api from '../../js/common/api';
import { CGI_STATUS, useCGIStatus } from './cgiStatus';

export interface Project {
    "id"?: number
    "createTime"?: number
    "passTime"?: number
    "ip": string[]
    "userAgent": string[]
    "userName": string
    "status": number
    "name": string
    "appkey": string
    "url": string
    "blacklist": string
    "description": string
    "mail": string
    "online": number
    "limitpv": number
}

export interface Result{
    data: Project
    status: CGI_STATUS
}

export function useProject(applyId = 0): Result {
    const [status, setStatus] = useCGIStatus();
    const [projectId, setProjectId] = useState(applyId);

    useEffect(() => {
        (async () => {
            setStatus(CGI_STATUS.LOADING);
            const data = await api.get(`//${location.host}/controller/applyAction/queryByApplyId.do`, {
                params: {
                    applyId: projectId
                }
            }) as any;
            if(data) {
                data.ip = [];
                data.useAgent = [];

                try {
                    const blacklist = JSON.parse(data.blacklist);
                    data.ip = blacklist.ip;
                    data.userAgent = blacklist.ua;
                } catch(e) {
                    console.log(e);
                }
                setData(data);
                setStatus(CGI_STATUS.SUCCESS);
            } else {
                setStatus(CGI_STATUS.FAIL);
            }
        })();
    }, [projectId]);

    const [data, setData] = useState(null);

    return {
        data,
        status
    };
}
