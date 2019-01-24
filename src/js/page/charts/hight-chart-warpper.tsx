import * as React from "react"; 
import { useBusinessList, Business } from '../../hook/businessList';
import { InfoItem } from './cgi';
import ReactHighcharts from "react-highcharts";

import * as HightChart from "highcharts";
import { getChartsData } from "./calc";

export type HightChartProps = {
    items: InfoItem[], 
    list: Business[],
    renderId: string
}



export default function HightChartWarpper(props: HightChartProps) {
    const [renderId, setRenderId] = React.useState(props.renderId);

    // Set New One 
    if (props.renderId !== renderId) {
        setRenderId(props.renderId); 
    }

    const { items, list } = props; 
    
    const $div = React.useRef(null);

    React.useEffect(() => {
        const config = getChartsData(items, list);

        config && HightChart.chart($div.current, config);        
    }, [renderId])

    return (
        <div ref={ $div } ></div>
    )
}
