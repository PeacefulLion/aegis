import * as React from 'react';
import api from '../common/api';
import * as dayjs from 'dayjs';
import {LOG_ACTION} from '../common/const';

const {useState} = React;

export interface Offline {
    id: number,
    name: string
}

export function useOfflineList(): [Offline[], (opts: number) => Promise<Offline[]>] {
    const [offlineList, setOfflineList] = useState([]);

    async function getOfflineList(value) {
        if (value) {
            const data = await api.get(`${LOG_ACTION}/showOfflineFiles.do?id=${value}`) as any;
            const offlineList = data.map(d => {
                const arr = d.id.split("_");
                let name = arr[0];
                if (arr[2]) {
                    const dateStr = dayjs.default(new Date(arr[2] - 0)).format('MM-DD hh:mm');
                    name += " (" + dateStr + ")";
                }
                return {id: d.id, name}
            });
            setOfflineList(offlineList);
            return offlineList;
        }
    }

    return [offlineList, getOfflineList];
}

export default useOfflineList;
