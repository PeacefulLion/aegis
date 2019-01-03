export type MenuAction = {
    type: string
    payload: any
}

export type NavItem = {
    key: any,
    name: string
}

export type MenuItem = {
    key: string,
    name: string,
    icon?: string,
    url?: string,
    child?: MenuItem[]
}

export const GET_ALL_MENU = 'GET_ALL_MENU';
export const GET_ALL_MENU_SUCCESS = 'GET_ALL_MENU_SUCCESS';
export const UPDATE_NAVPATH = 'UPDATE_NAVPATH';
export const SELECT_MENU = 'SELECT_MENU';


export function updateNavPath(path: string[]) {
    return {
        type: UPDATE_NAVPATH,
        payload: {
            data: path
        }
    }
}

export function getAllMenu() {
    return {
        type: GET_ALL_MENU,
        payload: {

        }
    }
}