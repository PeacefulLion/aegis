import * as React from "react"; 

import { Icon, Drawer } from 'antd';

import "./common-form.less";

export default function DrawerContainer(props: React.Props<{}>) {
    const [visible, setVisible] = React.useState(true);

    const toggleVisible = () => setVisible(!visible); 

    return (
        <Drawer
            title=""
            placement="right"
            width={ 500 }
            // closable={false}
            className="ward-logs-sumbitpanel"
            onClose={ toggleVisible }
            visible={ visible }
        >
            <div className="common-ward-drawer-btn" onClick={ toggleVisible }>
                { visible ?
                    <Icon type="caret-right"/> :
                    <Icon type="caret-left"/> }
            </div>
            
            {/* Inner */}
            { props.children }
        </Drawer>
    )
}
