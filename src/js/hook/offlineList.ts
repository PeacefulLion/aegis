import * as React from 'react';
import api from '../common/api';
import dayjs from 'dayjs';

const {useState} = React;

export interface Offline {
    id: number,
    name: string
}

export interface SummitOptions {
    id: number,
    fileId: string
}


export function useOfflineList(value = 0): [Offline[], Function, (opts: SummitOptions) => Promise<Offline[]>] {
    const [offlineList, setOfflineList] = useState([]);

    async function getOfflineList() {
        if (value) {
            const {data} = await api.get(`//badjs2.ivweb.io/controller/logAction/showOfflineFiles.do?id=${value}`) as any;

            const offlineList = data.data.map(d => {
                const arr = d.id.split("_");
                let name = arr[0];
                if (arr[2]) {
                    const dateStr = dayjs(new Date(arr[2] - 0)).format('MM-DD hh:mm');
                    name += " (" + dateStr + ")";
                }
                return {id: d.id, name}
            })
            setOfflineList(offlineList);
            return offlineList;
        }
    }

    return [offlineList, setOfflineList, getOfflineList];
}

export default useOfflineList;
