import * as React from 'react';

/**
 * 用于接收用户输入的 loginName
 */
export type onSubmitCallback = (userInput_loginName: string) => any;

/**
 * BindRTX Props
 */
export type BindRTXProps = {
    onSubmit: onSubmitCallback,
    loginName?: string
}

export default function BindRTX(props: BindRTXProps) {
    const onClk = () => {
        // <input /> element
        const $input = document.getElementById('rtx-input') as HTMLInputElement;

        const yes = window.confirm([
            '确定吗？该操作无法撤销。',
            '',
            '提交后，由后台审核通过；在审核通过之后再次登陆即可登陆。',
            '相关负责人：adamhe;tickli'
        ].join('\n'));

        if (yes) {
            props.onSubmit && props.onSubmit(($input.value || '').trim());
        }
    }

    return (
        <div className="recv-container">
            <div className="recv-input-area" >
                <h1>QQ账号绑定</h1>

                {
                    props.loginName ?
                        <input id="rtx-input" placeholder="请输入您的 RTX" disabled value={ props.loginName } /> :
                        <input id="rtx-input" placeholder="请输入您的 RTX" />
                }

                <div onClick={ onClk }>提 交</div>
                <p>这一步用来将 openid 绑定到 RTX 上</p>
            </div>
        </div>
    );
}

