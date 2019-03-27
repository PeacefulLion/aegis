import * as React from 'react';
import api from '../common/api';
import {LOG_ACTION} from '../common/const';

const {useState} = React;

export interface Uin {
    id: number
}

export interface Options {
    uin: number,
    id: number
}


export function useOfflineUin(): [Uin[], (opts: Options) => Promise<Uin[]>, (opts: Options) => Promise<Uin[]>, (opts: number) => Promise<Uin[]>] {
    const [uins, setUins] = useState([]);

    async function getUins(id) {
        if (id) {
            try {
                const data = await api.get(`${LOG_ACTION}/getOfflineLogConfig.do?id=${id}`) as any;
                const uins = Object.keys(data);
                setUins(uins);
            } catch (e) {
                console.log(e);
            }

            return uins;
        }
    }

    async function addUin({uin, id}) {
        if (uin && id) {
            try {
                const res = await api.get(`${LOG_ACTION}/addOfflineLogConfig.do?uin=${uin}&id=${id}`) as any;
                if (!res.hadAdd) {
                    uins.push(uin);
                    setUins(uins);
                }
            } catch (e) {
                console.log(e);
            }

            return uins;
        }
    }

    async function removeUin({uin, id}) {
        if (uin && id) {
            try {
                await api.get(`${LOG_ACTION}/deleteOfflineLogConfig.do?uin=${uin}&id=${id}`) as any;
                const index = uins.indexOf(uin);
                uins.splice(index, 1);
                setUins(uins);
            } catch (e) {
                console.log(e);
            }

            return uins;
        }
    }

    return [uins, addUin, removeUin, getUins];
}
