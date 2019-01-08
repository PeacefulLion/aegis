import * as React from "react"; 

import menuRouteDefine from "./menu-route-define"; 

import { MenuRouteCtx } from "./types"

import { menuReducer, initialState } from "./menu-reducer";
import { updateNavPath } from "./menu-actions";


/**
 * routeCtx 上下文，类型为：MenuRouteCtx 
 */
export const routeCtx = React.createContext<MenuRouteCtx>(
// @ts-ignore
    {
        state: initialState
    }
); 

// @ts-ignore
window.routeCtx = routeCtx; 

export function MenuRouteProvider(props: React.Props<{}>) {
    const [state, dispatch] = React.useReducer(menuReducer, initialState); 
    
    return (
        <routeCtx.Provider value={{
            state, 
            updateNavPath: (paths: string[]) => dispatch(updateNavPath(paths))
        }}>
            { props.children }
        </routeCtx.Provider>
    )
}
