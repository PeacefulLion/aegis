import * as React from "react";
import { useState, useEffect } from "react"; 
import BindRTX from "./BindRTX"; 
import { loginBy, bindOpenid, UserInfo, isUserInfoResp } from "./login_cgi"; 
import { SetUserInfo } from "./LoginProvider"

// Types: 
import { onSubmitCallback } from "./BindRTX"; 
import PleaseWait from "./PleaseWait";

type LoginProps = {
    userInfo?: UserInfo, 
    setUserInfo: SetUserInfo
}

export default function Login(props: LoginProps) {
    const client_id = 101539450; 
    const redirect_uri = `http://guardjs.badjs2.ivweb.io/qq-connect`; 
    const getCodeUrl = `https://graph.qq.com/oauth2.0/authorize?client_id=${ client_id }&response_type=code&state=test&redirect_uri=${ encodeURIComponent(redirect_uri) }`;

    const [openid, setOpenid] = useState(''); 

    const listen = (ev: MessageEvent) => {
        console.log('onMsg Data', ev.data);
        window.removeEventListener('message', listen);

        // 获取到 access_token 进而获取 OpenId
        if (ev.data && ev.data.code) {
            const { code } = ev.data; 
    
            console.log('!!! code', code); 
            loginBy(code, redirect_uri).then(data => {
                if (isUserInfoResp(data)) {
                    console.log('登陆成功', data); 
                    props.setUserInfo(data); 
                } else {
                    // 新用户
                    console.log('useropenid', data.openid); 
                    setOpenid(data.openid); 
                }
            }); 
        }
    }
   
    // 绑定 
    useEffect(() => {
        window.addEventListener('message', listen); 
        return () => window.removeEventListener('message', listen); 
    }); 

    // 接收 BindRTX 里用户输入
    const onSubmit: onSubmitCallback = loginName => {
        bindOpenid(openid, loginName).then(res => {
            // 说明成功了 
            alert('绑定成功，等待审核结果'); 
            props.setUserInfo(res); 
        }).catch(err => {
            alert([
                '请求出现错误', 
                JSON.stringify(err)
            ].join('\n')); 
        }); 
    }

    if (props.userInfo) {
        // 已登陆 -> 
        if (props.userInfo.verify_state === 2) {
            // 登陆成功且审核成功，此时不显示东西
            return null;
        } else {
            // 显示审核中 Or 老用户绑定
            return (
                <div className="login-container">
                    <div className="align-center">
                        <PleaseWait setUserInfo={ props.setUserInfo } />
                    </div>
                </div>
            )            
        }
    } else {
        // 未登陆
        if (openid) {
            return (
                <div className="login-container">
                    <div className="align-center">
                        <BindRTX onSubmit= { onSubmit } />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="login-container">
                    <div className="align-center">
                        <iframe className="align-center"
                            id="login"
                            width="850"
                            height="480"
                            src={ getCodeUrl }></iframe>
                    </div>
                </div>
            ); 
        }
    }

}
