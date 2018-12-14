import { useState, useEffect } from 'react';
import api from '../common/api';


function useBusinessList() {
    const [ list, setList ] = useState([]);

    useEffect(() => {
        api.get('//badjs2.ivweb.io/controller/userAction/getBusiness.do')
            .then((data) => {
                // console.log(data);
                setList(data.item);
            });
    }, [0])

    return list;
}


export default useBusinessList;
