import * as React from 'react';
import { updateSession } from './login_cgi';
import { Icon } from 'antd';
import { SetUserInfo } from './LoginProvider';

export type PleaseWaitProps = {
    setUserInfo: SetUserInfo
}

export default function PleaseWait(props: PleaseWaitProps) {
    const [inited, setInited] = React.useState(false);
    const [onload, setLoad] = React.useState(false); 

    React.useEffect(() => {
        if (!inited) {
            setInited(true); 
            updateSession().then(userInfo => {            
                console.log('Update Session userInfo', userInfo); 
                if (userInfo.verify_state === 2) {
                    props.setUserInfo(userInfo); 
                }     
            })
        }
    }); 

    const toload = () => {
        setLoad(true); 
        updateSession().then(userInfo => {
            setTimeout(() => {
                setLoad(false); 
                if (userInfo.verify_state === 2) {
                    props.setUserInfo(userInfo); 
                }
            }, 1000); 
            console.log('Update Session userInfo', userInfo); 
        }).catch(err => {
            setLoad(false); 
        })
    }
    
    return (
        <div className="recv-container">
            <div className="recv-input-area" >
                <h1>账号审核中</h1>

                {
                    onload ? (
                        <Icon type="loading" />
                    ) : (
                        <Icon type="reload" onClick={ toload } />
                    )
                }
                
                <p>后台审核中，负责人: xxx</p>
            </div>
        </div>
    ); 
}

