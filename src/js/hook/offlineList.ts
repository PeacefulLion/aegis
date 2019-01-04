import * as React from 'react';
import api from '../common/api';
import moment from 'moment';

const {
    useState,
    useEffect
} = React;

export interface Offline {
    id: number,
    name: string
}

export function useOfflineList(value = 0): Offline[] {
    const [list, setList] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await api.get('//badjs2.ivweb.io/controller/logAction/showOfflineFiles.do?id=453') as any;
            setList(data.map(d => {
                const arr = d.id.split("_");
                let name = arr[0];
                if (arr[2]) {
                    var dateStr = moment(new Date(arr[2] - 0)).format('MM-DD hh:mm');
                    name += " (" + dateStr + ")";
                }
                return {id: d.id, name}
            }));
        })();
    }, [value]);

    return list;
}

export default useOfflineList;
