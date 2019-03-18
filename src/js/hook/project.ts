import { useState, useEffect } from 'react';
import api from '../../js/common/api';
import { CGI_STATUS, useCGIStatus } from './cgiStatus';

export interface Project {
    "id"?: number
    "createTime"?: number
    "passTime"?: number
    "ip": string[]
    "userAgent": string[] 
    "userName": number
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

export function useProject(projectId = 0): Result {
    const [data, setData] = useState(null);
    const [status, setStatus] = useCGIStatus();

    useEffect(() => {
        (async () => {
            setStatus(CGI_STATUS.LOADING);
            const result = await api.get('//badjs2.ivweb.io/controller/applyAction/queryByApplyId.do', {
                params: {
                    projectId
                }
            }) as any;

            const {
                data
            } = result;

            if(data) {
                data.ip = [];
                data.useAgent = [];
    
                try {
                    const blacklist = JSON.parse(data.blacklist);
                    data.ip = blacklist.ip;
                    data.userAgent = blacklist.userAgent;
                } catch(e) {
                    console.log(e);
                }

                setStatus(CGI_STATUS.SUCCESS);
            } else {
                setStatus(CGI_STATUS.FAIL);
            }
            
            setData(data);
        })();
    }, [projectId]);

    return {
        data,
        status
    };
}