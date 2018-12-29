import * as React from 'react';

export type BindRTXProps = {
    /**
     * 用于接收用户输入的 loginName
     */
    onSubmit?: (userInput_loginName: string) => any, 

    /**
     * 验证状态 0: 未验证; 1: 审核中; 2: 已验证
     */
    verifyState: 0 | 1 | 2, 
}

export default function RecvCode(props: BindRTXProps) {
    const onClk = () => {
        // <input /> element
        const $input = document.getElementById('rtx-input') as HTMLInputElement; 

        const yes = window.confirm([
            '确定吗？该操作无法撤销。', 
            '',
            '提交后，由后台审核通过；在审核通过之后再次登陆即可登陆。',
            '相关负责人：xxx'
        ].join('\n')); 

        if (yes) { 
            props.onSubmit && props.onSubmit(($input.value || '').trim()); 
        }
    }

    if (props.verifyState === 0) {
        return (
            <div className="recv-container">
                <div className="recv-input-area" >
                    <h1>QQ账号绑定</h1>
                    <input id="rtx-input" placeholder="请输入您的 RTX" />
                    <div onClick={ onClk }>提 交</div>
                    <p>这一步用来将 openid 绑定到 RTX 上</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="recv-container">
                <div className="recv-input-area" >
                    <h1>账号审核中</h1>

                    <p>后台审核中，负责人: xxx</p>
                </div>
            </div>
        );
    }
}

