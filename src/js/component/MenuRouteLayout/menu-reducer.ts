import { UPDATE_NAVPATH, MenuAction } from './menu-actions';
import { MenuRouteState, MenuRoute } from "./types";
import menuData from './menu-route-define';

export const initialState: MenuRouteState = {
    menuRoutes: menuData,
    navPath: [],
    activeKey: '',
    openKeys: menuData.map(item => item.key), // 默认全部子菜单都展开
}

export function menuReducer(state = initialState , action: MenuAction): MenuRouteState {
    switch (action.type) {
        case UPDATE_NAVPATH:
            const navPath = [] as MenuRoute[];

            let { menuRoutes } = initialState;
            let activeKey = state.activeKey;

            action.data.every((key) => {
                const targetRoute = menuRoutes.find(o => o.key === key);

                if (targetRoute) {
                    navPath.push(targetRoute);
                    activeKey = key;

                    if (targetRoute.child) {
                        menuRoutes = targetRoute.child;
                        return true;
                    }
                    return false;
                }
                return false;
            });

            return Object.assign({}, state, {
                navPath: navPath,
                activeKey
            });
        default:
            return state;
    }
}
