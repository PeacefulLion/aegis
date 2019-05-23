import * as React from 'react'
import './index.less'

interface TitleProps {
    overview: {
        badjscount: number,
        pv: number
    }
}

export default function dailyStaticsTitle(props : TitleProps) {
    const { overview } = props;
    return (
        <div className="title">
            TOP 50 , 错误PV : {overview.badjscount}，访问PV：{ overview.pv }，质量评分：100，
        </div>
    )
}