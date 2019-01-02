import {
    UPDATE_NAVPATH,
    MenuItem,
    MenuAction,
    NavItem
} from '../action/menu';

import menuData from '../config/menu';
   
export type MenuState = {
    items: MenuItem[],
    navpath: NavItem[],
    currentIndex: number
}

const initialState: MenuState = {
    items: menuData,
    navpath: [],
    currentIndex: 0
}

export default function menu(state = initialState , action: MenuAction) {
    switch (action.type) {
        case UPDATE_NAVPATH:
            let navpath = [],
                tmpOb,
                tmpKey,
                child;
            if (Array.isArray(action.payload.data)) {
                action.payload.data.reverse().map((item) => {
                    if (item.indexOf('sub') != -1) {
                        tmpKey = item.replace('sub', '');
                        tmpOb = state.items.find((o) => {
                            return o.key == tmpKey;
                        });

                        child = tmpOb.child;
                        navpath.push({
                            key: tmpOb.key,
                            name: tmpOb.name
                        });
                    }
                    if (item.indexOf('menu') != -1) {
                        tmpKey = item.replace('menu', '');
                        if (child) {
                            tmpOb = child.find((o) => {
                                return o.key == tmpKey;
                            });
                            navpath.push({
                                key: tmpOb.key,
                                name: tmpOb.name
                            });
                        }
                    }
                });
            }
            return Object.assign({}, state, {
                currentIndex: action.payload.key * 1,
                navpath: navpath
            });
        default:
            return state;
    }
}