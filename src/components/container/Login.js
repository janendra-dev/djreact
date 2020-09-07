import React from 'react';
import { Form, Input, Button ,Spin } from 'antd';
import {NavLink,useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import { LoadingOutlined, UserOutlined, LockOutlined} from '@ant-design/icons';

import * as actions from '../../store/action/auth';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Login = ({loading,error,onAuthin}) =>{
	// styling
			const layout = {
				labelCol: { span:4 },
				wrapperCol: { span: 10 },
			};
			const tailLayout = {
				wrapperCol: { offset: 4, span:16},
			};

			let history=useHistory();
			 const onFinish = values => {
				    console.log('Received values of form: ', values);
				    onAuthin(values.username,values.password);
				    history.push('/');
				  };
				// Error checking

				let errormessage=null;
				if (error) {
					errormessage=(
						<p>{error.message}</p>
						);
				}
	return(
	<>
		{errormessage}
		{
			loading?
			<Spin indicator={antIcon} />
			:	
		    <Form
		    {...layout}
		      initialValues={{ remember: true }}
		      onFinish={onFinish}

		    >
		     <Form.Item
			        name="username"
			        rules={[{ required: true, message: 'Please input your Username!' }]}
			      >
			        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
			  </Form.Item>

			  <Form.Item
			        name="password"
			        rules={[{ required: true, message: 'Please input your Password!' }]}
			      >
			        <Input.Password
			          prefix={<LockOutlined className="site-form-item-icon" />}
			          type="password"
			          placeholder="Password"
			        />
			  </Form.Item>

		      <Form.Item {...tailLayout}>
		        <Button type="primary" htmlType="submit" className="login-form-button">
		          Login
		        </Button>
		        Or <NavLink  to='/signup/'> 
		        Signup
		        </NavLink>
		      </Form.Item>
		    </Form>
		}
		
	</>
	);
}

const MapStateToProps = state =>{
		return{
			loading:state.loading,
			error:state.error
		}
	}

const MapDispatchToProps = dispatch =>{
	return{
		onAuthin:(username, password)=>dispatch(actions.authLogin(username,password))
	}
}

export default connect(
MapStateToProps,
MapDispatchToProps)
 (Login);