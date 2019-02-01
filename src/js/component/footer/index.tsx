import * as React from 'react'
import { Layout } from 'antd'
import './index.less'
const { Footer } = Layout;

export default function commonFooter() {
    return (
      <Footer style={{ textAlign: 'center', zIndex: 1 }}>
        ivweb 版权所有 © 2019 ivweb.io
      </Footer>
    );
}