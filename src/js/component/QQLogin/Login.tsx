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
    const redirect_uri = `${ location.origin }`;
    const getCodeUrl = `https://graph.qq.com/oauth2.0/authorize?client_id=${ client_id }&response_type=code&state=test&redirect_uri=${ encodeURIComponent(redirect_uri) }`;

    const [openid, setOpenid] = useState('');

    const listen = (ev: MessageEvent) => {
        console.log('onMsg Data', ev.data);

        if (ev.data && ev.data.openid) {
            const { openid } = ev.data;
            setOpenid(openid);
        }
        if (ev.data && ev.data.result) {
            const { result } = ev.data;
            props.setUserInfo(JSON.parse(decodeURIComponent(result)));
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

    const getOpenid = (loginName?: string) => {
        if (openid) {
            return (
                <div className="login-container">
                    <div className="align-center">
                        <BindRTX loginName={ loginName } onSubmit= { onSubmit } />
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

    if (props.userInfo) {
        // 已登陆 ->
        if (props.userInfo.verify_state === 2) {
            // 登陆成功且审核成功，此时不显示东西
            return null;
        } else {
            if (props.userInfo.verify_state === 0) {
                console.log('openid,openid,openid,openid', openid)

                return getOpenid(props.userInfo.chineseName);
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
        }
    } else {
        // 未登陆
        return getOpenid();
    }

}
