import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { Layout } from 'antd';
import Footer from '../component/footer';
import Header from '../component/header';
import LeftMenu from '../component/leftMenu';
import 'antd/dist/antd.css'

const {
    Content
} = Layout;

function Container() {
    console.log('render');
    return (
        <Layout>
            <Header>header</Header>
            <Layout>
                <LeftMenu></LeftMenu>
                <Content>main content</Content>
            </Layout>
            <Footer>footer</Footer>
        </Layout>
    )
}

ReactDom.render(
    <Container></Container>,
    document.querySelector('#container')
);