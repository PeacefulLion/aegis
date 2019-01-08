import { MenuRoute } from "./types"; 

export const GET_ALL_MENU = 'GET_ALL_MENU';
// export const GET_ALL_MENU_SUCCESS = 'GET_ALL_MENU_SUCCESS';
export const UPDATE_NAVPATH = 'UPDATE_NAVPATH';
// export const SELECT_MENU = 'SELECT_MENU';

export type MenuAction = {
    type: 'UPDATE_NAVPATH'
    data: string[]
} | {
    type: 'GET_ALL_MENU'
}

export function updateNavPath(path: string[]): MenuAction {
    return {
        type: UPDATE_NAVPATH,
        data: path
    }
}

export function getAllMenu(): MenuAction {
    return {
        type: GET_ALL_MENU
    }
}
