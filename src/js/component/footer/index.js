import React from 'react';
import { Footer } from 'antd/lib/layout';
import './index.less';

export default function WrapFooter(props) {
    console.log('footer');
    return (
        <Footer className="footer" theme="dark"> 
            code by ivweb
        </Footer>
    )
}
