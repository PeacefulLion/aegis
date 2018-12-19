import { useState, useEffect } from 'react';
import api from '../common/api';

export function useBusinessList(value = 0) {
    const [ list, setList ] = useState([]);

    useEffect(() => {
        api.get('//badjs2.ivweb.io/controller/userAction/getBusiness.do')
            .then((data) => {
                // console.log(data);
                setList(data.item);
            });
    }, [value]);

    return list;
}

export function useFilterList(list, value) {
    const [filerList, setFilterList] = useState(list);

    useEffect(() => {
        setFilterList(!value ? list : list.filter((item) => {
            return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
        }));
    }, [list, value]);

    return filerList;
}

export default useBusinessList;
