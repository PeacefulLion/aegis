import * as React from 'react'
import { Breadcrumb } from 'antd'

import './index.less'

type NavPathProp = {
  data: any[]
}; 

const NavPath = (props: NavPathProp) => {
    const { data } = props;
    const bread = data.map((item)=>{
      return (
        <Breadcrumb.Item key={'bc-'+item.key}>{item.name}</Breadcrumb.Item>
      )
    })
    return (
      <Breadcrumb style={{ margin: '12px 0' }}>
        <Breadcrumb.Item key='bc-0'>首页</Breadcrumb.Item>
        {bread}
      </Breadcrumb>
    )
}

export default NavPath;
