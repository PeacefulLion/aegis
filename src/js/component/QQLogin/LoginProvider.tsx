import * as React from "react"; 
import { getUserInfo, UserInfo } from "./login_cgi"; 
import QQLogin from "./index";
import { Loading } from "./Loading"

export type LoginAction = {
    type: string, 
    data: any
}

export type UserInfoOrNot = UserInfo | undefined; 

export type LoginCtx = {
    userInfo: UserInfoOrNot
}

export type SetUserInfo = React.Dispatch<
    React.SetStateAction< UserInfoOrNot >
>;

export const loginCtx = React.createContext<LoginCtx>({
    userInfo: undefined
})

export type LoginProviderProps = {
    component: React.FunctionComponent
}

import "./login.less";

export default function LoginProvider(props: LoginProviderProps) {
    const [userInfo, setUserInfo] = React.useState<UserInfoOrNot>(undefined); 
    const [initLoading, setInitLoading] = React.useState(true);
      
    React.useEffect(() => {
        // 说明已经初始化完成
        if (!initLoading) return; 

        getUserInfo().then(userInfo => {
            console.log('LoginProvider Result:', userInfo); 
            setTimeout(() => {
                setUserInfo(userInfo); 
                setInitLoading(false); 
            }, 2000); 
        }).catch(didnotLogin => {
            console.log('Not Login', didnotLogin); 
            setInitLoading(false); 
        })
    });

    return (
        <loginCtx.Provider value={{
            userInfo,
        }}>
            {
                initLoading ? (
                    <Loading /> 
                ) : (
                    <loginCtx.Consumer>{
                        ({ userInfo }) => <QQLogin
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