import {useState, useEffect} from 'react';
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
            const data = await api.get(`//${location.host}/user/controller/applyAction/queryListBySearch.do?statusType=${status}`) as any;

            setList(data.item);
        })();
    }, [status]);

    async function setProjectStatus(id, status, reply = '') {
        const item = list.find((item) => {
            return item.id === id;
        });

        item.status = status;
        if (status === 3) {
            await api.get(`//${location.host}/user/controller/applyAction/remove.do?reply=${reply}&id=${id}`) as any;
            const index = list.findIndex(l => l.id === id);
            setList(list.splice(index, 1));
        } else {
            await api.get(`//${location.host}/user/controller/approveAction/doApprove.do?reply=${reply}&applyId=${id}&applyStatus=${status}`) as any;
        }

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

