import * as React from "react"; 
import { getUserInfo, UserInfo, logoutReq } from "./login_cgi"; 
import Login from "./Login";
import { Loading } from "./Loading"

export type LoginAction = {
    type: string, 
    data: any
}

export type UserInfoOrNot = UserInfo | undefined; 

export type LoginCtx = {
    userInfo: UserInfoOrNot,
    logout: Function
}

export type SetUserInfo = React.Dispatch<
    React.SetStateAction< UserInfoOrNot >
>;

export const loginCtx = React.createContext<LoginCtx>({
    userInfo: undefined, 
    logout: () => {}
})

export type LoginProviderProps = {
    component: React.FunctionComponent
}

import "./login.less";

export default function LoginProvider(props: LoginProviderProps) {
    const [userInfo, setUserInfo] = React.useState<UserInfoOrNot>(undefined); 
    const [initLoading, setInitLoading] = React.useState(true);
      
    React.useEffect(() => {
        console.log('To Get UserInfo')
        getUserInfo().then(userInfo => {
            console.log('LoginProvider Result:', userInfo); 
            
            setUserInfo(userInfo); 
            setInitLoading(false); 
        
        }).catch(didnotLogin => {
            console.log('Not Login', didnotLogin); 
            setInitLoading(false); 
        })
    }, []);

    // logout: 请求接口并清除本地 Login State 
    const logout = () => {
        return logoutReq().then(ok => {
            setUserInfo(undefined); 
        }).catch(err => {
            console.log('loutou 报错', err); 
            console.log('可能是跨域造成的，但是即便是跨域，我们的session也被清除了，只是 response 被浏览器拦了'); 
            setUserInfo(undefined); 
        })
    }

    return (
        <loginCtx.Provider value={{
            userInfo,
            logout
        }}>
            {
                initLoading ? (
                    <Loading /> 
                ) : (
                    <loginCtx.Consumer>{
                        ({ userInfo }) => <Login
                            userInfo={ userInfo } 
                            setUserInfo={ setUserInfo } />
                    }
                    </loginCtx.Consumer>
                )
            }
            <props.component />
        </loginCtx.Provider>
    );
}
