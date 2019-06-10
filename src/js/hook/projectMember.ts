import {
    useState,
    useEffect
} from 'react';
import api from '../common/api';
import { async } from 'q';
import { NORMAL_USER } from '../common/const/role';

export function useProjectMembers(role = 0, projectId = 0) {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [role, projectId]);

    async function getData() {
        if(projectId === -1) {
            return;
        }

        const data = await api.get(`//${location.host}/user/controller/userAction/queryListByCondition.do`, {
            params: {
                role,
                applyId: projectId
            }
        });

        setData(data as any);
    }

    async function deleteMember(recordId) {
        api.post(`//${location.host}/controller/userApplyAction/remove.do`, {
            id: recordId
        });

        const index = data.findIndex((item) => item.id === recordId);

        if(index >= 0) {
            data.splice(index, 1);
            setData(data.concat([]));
        }
    }

    async function setUserRoleChange(recordId, role) {
        api.post(`//${location.host}/controller/userApplyAction/setRole.do`, {
            id: recordId,
            role: role
        });

        const newData = data.map((item) => {
            if(item.id === recordId) {
                item.role = role;
            }
            return item;
        });

        setData(newData);
    }

    async function addUser(userName) {
        try {
            await api.post(`//${location.host}/controller/userApplyAction/addUserApply.do`, {
                userName,
                applyId: projectId
            })
        } catch (e) {
            return alert(e.msg);
        }
        setData(data.concat({
            chineseName: userName,
            role: NORMAL_USER
        }));
    }

    return {
        data,
        getData,
        addUser,
        deleteMember,
        setUserRoleChange
    };
}
