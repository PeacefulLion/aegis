import * as React from 'react'
import './index.less'

interface TitleProps {
    overview: {
        badjscount: number,
        pv: number
    }
}

/**
 注：badjs得分规则

 （1）当报错率 <= 0.5%： badjs得分=100

 （2）当 0.5%< 报错率 < 10%：badjs得分： 100 - 10 * 报错率

 （3）当报错率 >= 10%： badjs得分=0
 */
function handleScore(pv, e_pv) {
    const e_rate = e_pv / pv;
    let score;
    if (e_rate <= 0.005) {
        score = 100;
    } else if (e_rate < 0.1 && e_rate > 0.005) {
        score = 100 - 10 * 100 * e_rate;
    } else {
        score = 0;
    }
    return score.toFixed(2);
}

export default function dailyStaticsTitle(props: TitleProps) {
    const {overview} = props;
    return (
        <div className="title">
            TOP 50 , 错误PV : {overview.badjscount}，访问PV：{overview.pv}，质量评分：{handleScore(overview.pv, overview.badjscount)}，
        </div>
    )
}
