import { MenuAction } from "./menu-actions";

export type MenuRoute = {
    key: string, 
    name: string, 
    icon?: string, 
    url?: string,
    child?: MenuRoute[]
}

export type MenuRouteState = {
    // items: menuData,
    menuRoutes: MenuRoute[], 
    navPath: string[],
    activeKey: string,
    openKeys: string[]
    // openKeys: menuData.map((item) => item.key), // 默认全部子菜单都展开
}

export type UpdateNavPathDispatch = React.Dispatch<MenuAction>

export type MenuRouteCtx = {
    state: MenuRouteState, 
    updateNavPath: UpdateNavPathDispatch
}

export * from "./menu-actions"; 
