import { message } from "antd"; 
import { fromBadjs } from "../../common/api";
import { Business } from "../../hook/businessList";

/**
 * 错误量计数
 */
export type InfoItem = {
    endDate: string,
    startDate: string,
    total: number, 
    projectId: number
}

/**
 * 请求数据
 * @param projectId 
 * @param timeScope 
 * @param list 
 */
export function loadList(projectId: number, timeScope: number, list: Business[]) {
    const finishLoading = message.loading('加载中 ...', 2.5);
    const mapper = {};

    list.forEach(e => {
        mapper[e.id] = true;
    });

    return fromBadjs.get<InfoItem[]>(`/controller/statisticsAction/queryByChart.do`, {
        projectId, timeScope
    }).then(itmes => {
        finishLoading();

        return itmes.filter(item => {
            item.startDate = item.startDate.replace('16:00:00.000', '23:59:59.999');
            item.endDate = item.endDate.replace('16:00:00.000', '23:59:59.999');
            
            return mapper[item.projectId];
        });
    }).catch(err => {
        message.error('加载失败: ' + JSON.stringify(err));
        return Promise.reject(err); 
    });
}

