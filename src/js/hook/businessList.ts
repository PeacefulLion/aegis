import {useState, useEffect} from 'react';
import api from '../common/api';
import {getLastSelect} from '../common/utils';

export interface Business {
    chineseName: string,
    id: number
    loginName: string
    name: string
    role: number
}

export function useBusinessList(value = 0): [Business[], number, Function] {
    const [list, setList] = useState([]);
    const [projectId, setProjectId] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await api.get('//badjs2.ivweb.io/controller/userAction/getBusiness.do') as any;

            const last = getLastSelect();
            const lastLog = data.item.find(l => {
                return l.id.toString() === last;
            }) || {id: 0};

            setList(data.item);
            setProjectId(lastLog.id);
        })();
    }, [value]);

    return [list, projectId, setProjectId];
}

export function useFilterList(list: Business[], value: string | null): Business[] {
    const [filerList, setFilterList] = useState(list);

    useEffect(() => {
        setFilterList(!value ? list : list.filter((item) => {
            return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
        }));
    }, [list, value]);

    return filerList;
}

export default useBusinessList;
