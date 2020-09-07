import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import './Layout.css';
import { NavLink,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/action/auth';

const { Header, Content, Footer } = Layout;
const CustomLayout = (props,{logout}) => {
    return (
        <>
        <Layout className="layout">
        <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>

            {
                props.isAuth?
                <Menu.Item key="2" onClick={logout}>
                Logout
                </Menu.Item>
                :
                    <Menu.Item key="2" >
                     <NavLink to='/login/'>login</NavLink>
                    </Menu.Item>
             }

                <Menu.Item key="1">
                <NavLink to="/">posts</NavLink>
                </Menu.Item>
        </Menu>  
        </Header>
            <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item ><NavLink to="/">Home</NavLink></Breadcrumb.Item>
            <Breadcrumb.Item><NavLink to="/">List</NavLink></Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content">
            {props.children}
            </div>
            </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
        </>
        );
}

const MapDispatchToProps = dispatch =>{
    return{
        logout:()=>dispatch(actions.Logout())
    }
}

export default withRouter(connect(null, MapDispatchToProps) (CustomLayout));
