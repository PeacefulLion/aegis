import * as React from 'react';
import ProjectFrom from '../../component/projectForm';
import { withRouter } from 'react-router-dom';
import api from '../../common/api';
import { Modal } from 'antd';

const RouterWrap = withRouter((props) => {
    const {
        history
    } = props;

    function doApply(values) {
        const {
            name,
            url,
            description,
            ip,
            online,
            userAgent,
            limitpv,
            userName
        } = values;

        const params = {
            name,
            description,
            url,
            blacklist: {
                ip: ip ? ip.split(',') : [],
                ua: userAgent ? userAgent.split(',') : []
            },
            online: online ? 1 : 0,
            limitpv,
            userName
        };

        api({
            method: 'GET',
            url: `//${location.host}/user/controller/applyAction/addApply.do`,
            params
        })
            .then((result) => {
                const modal = Modal.success({
                    title: '申请成功',
                    onOk: () => {
                        history.push('/projectlist'); // 跳去申请页面
                        modal.destroy();
                    }
                });
            })
            .catch((result) => {
                const modal = Modal.error({
                    title: '申请失败',
                    content: JSON.stringify(result, null, 2)
                });
            })
    }

    return <ProjectFrom btnText="申请项目" onSummit={doApply}></ProjectFrom>;
});

export default function ApplyProject() {
    return <RouterWrap />
}
