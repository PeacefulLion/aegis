import React from 'react';
import { Menu, Layout } from 'antd';
import { Input } from 'antd';
import { AutoComplete } from 'antd';
import useBusinessList from '../../hook/businessList';

const {
    Sider
} = Layout;

const {
    Item
} = Menu;

export default function LeftMenu(props) {
    const list = useBusinessList();
    
    return (
        <Sider>
            <Menu>
                <Item>
                    <AutoComplete
                        dataSource={dataSource}
                        onSelect={onSelect}
                        onSearch={this.handleSearch}
                        placeholder={"搜索你要的项目"}
                    />
                </Item>
                {
                    list.map((item, index) => {
                        return (
                            <Item key={item.id + index}> { item.name }</Item>                      
                        )
                    })
                }
            </Menu>
        </Sider>
    )
}