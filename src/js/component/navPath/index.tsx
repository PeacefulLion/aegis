import * as React from 'react'
import { Breadcrumb, Icon } from 'antd'
import { connect } from 'react-redux'
import { withRouter, matchPath } from 'react-router-dom'

import './index.less'

type NavPathProp = {
    data: any[]
}; 

const NavPath = (props: NavPathProp) => {
    const { data } = props;

    const bread = data.map((item)=>{
      return (
        <Breadcrumb.Item key={'bc-'+item.key}>
            {item.icon && <Icon type={item.icon} />}{item.name}
        </Breadcrumb.Item>
      )
    })
    return (
      <Breadcrumb style={{ margin: '12px 0' }}>
        <Breadcrumb.Item key='bc-0'>
            <Icon type='home'></Icon>
        </Breadcrumb.Item>
        {bread}
      </Breadcrumb>
    )
}

export default NavPath;