import * as React from "react";
import { useState, useEffect } from "react"; 
import BindRTX, { VerifyStateValue } from "./BindRTX"; 
import { loginBy, bindOpenid } from "./login_cgi"; 


import "./login.less"; 

// Types: 
import { onSubmitCallback } from "./BindRTX"; 

export default function Login() {
    const client_id = 101539450; 
    const redirect_uri = `http://guardjs.badjs2.ivweb.io/qq-connect`; 
    const getCodeUrl = `https://graph.qq.com/oauth2.0/authorize?client_id=${ client_id }&response_type=code&state=test&redirect_uri=${ encodeURIComponent(redirect_uri) }`;

    // openid 
    const [openid, setOpenid] = useState(''); 

    // 定义类型
    const [verifyState, setVerifyState] = useState(
        0 as VerifyStateValue
    ); 

    const listen = (ev: MessageEvent) => {
        console.log('onMsg Data', ev.data);
    
        // 获取到 access_token 进而获取 OpenId
        if (ev.data && ev.data.code) {
            const { code } = ev.data; 
    
            console.log('!!! code', code); 
            loginBy(code, redirect_uri).then(data => {
                // 说明还未绑定
                if (data.openid) {
                    setOpenid(data.openid); 
                }

                if (data.loginName) {
                    console.log('登陆成功', data); 
                    // 这一步为了显示 BindRTX 
                    setOpenid('HIDDEN'); 
                    setVerifyState(data.verify_state); 
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
            setVerifyState(1); 
        }).catch(err => {
            alert([
                '请求出现错误', 
                JSON.stringify(err)
            ].join('\n')); 
        }); 
    }

    return (
        <div className="login-container">
            {
                openid ? (
                    <div className="align-center">
                        <BindRTX onSubmit={ onSubmit }
                            verifyState={ verifyState } />
                    </div>
                ) : (
                    <iframe className="align-center"
                        id="login"
                        width="850"
                        height="480"
                        src={ getCodeUrl }></iframe>
                )
            }
        </div>
    )
}
