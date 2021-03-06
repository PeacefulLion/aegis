import * as React from "react"; 
import { Business } from '../../hook/businessList';
import { InfoItem } from './cgi';

import * as Highcharts from "highcharts";
import { getChartsData } from "./calc";

export type HighchartsProps = {
    items: InfoItem[], 
    list: Business[],
    renderId: string
}

export default function HighchartsWarpper(props: HighchartsProps) {
    const [renderId, setRenderId] = React.useState(props.renderId);

    // Set New One 
    if (props.renderId !== renderId) {
        setRenderId(props.renderId); 
    }

    const { items, list } = props; 
    
    const $div = React.useRef(null);

    React.useEffect(() => {
        const config = getChartsData(items, list);

        config && Highcharts.chart($div.current, config);        
    }, [renderId])

    return (
        <div ref={ $div } ></div>
    )
}
