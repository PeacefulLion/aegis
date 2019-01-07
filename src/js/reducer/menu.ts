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
    openKeys: string[],
    activeKey: string
}

const initialState: MenuState = {
    items: menuData,
    navpath: [],
    activeKey: '',
    openKeys: menuData.map((item) => item.key), // 默认全部子菜单都展开
}

export default function menu(state = initialState , action: MenuAction) {
    switch (action.type) {
        case UPDATE_NAVPATH:
            const navpath = [];

            let tempItem = initialState.items;
            let activeKey = state.activeKey;

            action.payload.data.every((key) => {
                const item = tempItem.find(o => o.key === key);

                if(item) {
                    navpath.push(item);

                    activeKey = key;

                    if(item.child) {
                        tempItem = item.child;
                        return true;
                    }
                    return false;
                }

                return false;
            });

            return Object.assign({}, state, {
                navpath: navpath,
                activeKey
            });
        default:
            return state;
    }
}