import {
    useState,
    useEffect
} from 'react';
import api from '../common/api';
import { async } from 'q';

export function useProjectMembers(role = 0, projectId = 0) {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [role, projectId]);

    async function getData() {
        if(projectId === -1) {
            return;
        }

        const data = await api.get('//badjs2.ivweb.io/user/controller/userAction/queryListByCondition.do', {
            params: {
                role,
                applyId: projectId
            }
        });

        setData(data as any);
    }

    async function deleteMember(recordId) {
        api.post('//badjs2.ivweb.io/controller/userApplyAction/remove.do', {
            id: recordId
        });

        const index = data.findIndex((item) => item.id === recordId);
        
        if(index >= 0) {
            data.splice(index, 1);
            setData(data.concat([]));
        }
    }

    return {
        data,
        getData,
        deleteMember
    };
}