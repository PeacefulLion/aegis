import * as React from 'react';;
import api from '../common/api';

const {
    useState,
    useEffect
} = React;

export interface Business {
    chineseName: string,
    id: number
    loginName: string
    name: string
    role: number
}

export function useBusinessList(value = 0): Business[] {
    const [list, setList] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await api.get('//badjs2.ivweb.io/controller/userAction/getBusiness.do') as any;

            setList(data.item);
        })();
    }, [value]);

    return list;
}

export function useFilterList(list: Business[], value: string | null):Business[]  {
    const [filerList, setFilterList] = useState(list);

    useEffect(() => {
        setFilterList(!value ? list : list.filter((item) => {
            return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
        }));
    }, [list, value]);

    return filerList;
}

export default useBusinessList;
