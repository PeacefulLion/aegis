import { useState, useEffect } from 'react';
import APPLY_STATUS from '../common/const/applyStatus';
import api from '../common/api';

export interface applyProjectItem {
    appkey: string | null
    blacklist: string | null
    createTime: number | null
    description: string
    id: number
    limitpv: number | null
    mail: string | null
    name: string
    online: number | null
    passTime: number | null
    status: APPLY_STATUS
    url: string
    userName: string
}

export function useApplyProjectList(_status = APPLY_STATUS.STATUS_CHECK) {
    const [list, setList] = useState([]);
    const [status, setStatus] = useState(_status);

    useEffect(() => {
        (async () => {
            const data = await api.get(`//badjs2.ivweb.io/user/controller/applyAction/queryListBySearch.do?statusType=${status}`) as any;

            setList(data.item);
        })();
    }, [status]);

    async function setProjectStatus(id, status, reply = '') {
        const item = list.find((item) => {
            return item.id === id;
        });

        item.status = status;
        const data = await api.get(`//badjs2.ivweb.io/user/controller/approveAction/doApprove.do?reply=${reply}&applyId=${id}&applyStatus=${status}`) as any;

        setList(list.concat([]));
    }

    return {
        list,
        status,
        setStatus,
        setList,
        setProjectStatus
    }
}

