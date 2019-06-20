import * as React from "react"; 
import { getUserInfo, UserInfo } from "./login_cgi"; 
import Login from "./Login";
import "./login.less";

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

export default function LoginProvider(props: LoginProviderProps) {
    const [userInfo, setUserInfo] = React.useState<UserInfoOrNot>(undefined); 
    const [initLoading, setInitLoading] = React.useState(true);
      
    React.useEffect(() => {
        // 说明已经初始化完成
        if (!initLoading) return; 
        
        console.log('To Get UserInfo')
        getUserInfo().then(userInfo => {
            console.log('LoginProvider Result:', userInfo); 
            setUserInfo(userInfo); 
            setInitLoading(false); 
        
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
                    null
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
