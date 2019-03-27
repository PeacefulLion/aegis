import * as React from 'react';
import ProjectFrom from '../../component/projectForm';
import { withRouter } from 'react-router-dom'; 
import api from '../../common/api';
import { Modal, Empty, Spin } from 'antd';
import { useProject, Project } from '../../hook/project';
import { CGI_STATUS } from '../../hook/cgiStatus';

const RouterWrap = withRouter((props) => {
    const {
        history,
        match
    } = props;

    const {
        data,
        status
    } = useProject(match.params.projectId);

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
            id: data.id,
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
            url: '//badjs2.ivweb.io/user/controller/applyAction/addApply.do',
            params
        })
            .then((result) => {
                const modal = Modal.success({
                    title: '修改成功',
                    onOk: () => {
                        history.push('/projectlist'); // 跳去申请页面
                        modal.destroy();
                    }
                });
            })
            .catch((result) => {
                const modal = Modal.error({
                    title: '修改失败',
                    content: JSON.stringify(result, null, 2)
                });
            })
    }

    return status === CGI_STATUS.SUCCESS ? (
        <ProjectFrom btnText="编辑项目" onSummit={doApply} {...data}></ProjectFrom>
    ) : (
        <Empty>
            {  status === CGI_STATUS.FAIL ? '加载失败' : ''}
            {  status === CGI_STATUS.LOADING ? <Spin></Spin> : null}
        </Empty>
    );
});

export default function EditProject(props) {
    return <RouterWrap {...props} />
}