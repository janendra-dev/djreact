import React from 'react';
import {NavLink,useHistory} from 'react-router-dom';
import {Form,Input,Button,Spin} from 'antd';
import {LoadingOutlined,UserOutlined,MailOutlined,LockOutlined} from '@ant-design/icons';

import {connect} from 'react-redux';
import * as actions from '../../store/action/auth';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const Signup = ({loading,error,onAuthup})=>{
				const formItemLayout = {
				  labelCol: {
				    xs: { span: 24,},
				    sm: {span: 8, },
				  },
				  wrapperCol: {
				    xs: {span: 24, },
				    sm: {span: 16, },
				    md: {span: 10, },
				  },
				};

				const tailFormItemLayout = {
				  wrapperCol: {
				    xs: { span: 24, offset: 0, },
				    sm: {span: 16, offset:4,},
				    md: {span: 16, offset:4,},
				  },
				};
					// let history=useHistory();
				  const onFinish = values => {
				    console.log('Received values of form: ', values);
				    onAuthup(values.username,values.email,
				    	values.password,values.confirm);
				    // history.push('/');
				  };

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
		      {...formItemLayout}
		      onFinish={onFinish}
		    >
		     <Form.Item
		        name="username"
		        rules={[{ required: true, message: 'Please input your Username!' }]}
			  >
			  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
			  </Form.Item>

		      <Form.Item
		        name="email"
		        rules={[
		          {
		            type: 'email',
		            message: 'The input is not valid E-mail!',
		          },
		          {
		            required: true,
		            message: 'Please input your E-mail!',
		          },
		        ]}
		      >
		        <Input
			          prefix={<MailOutlined className="site-form-item-icon" />}
			          type="email"
			          placeholder="Email"
			        />
		      </Form.Item>

		      <Form.Item
		        name="password"
		        rules={[
		          {
		            required: true,
		            message: 'Please input your password!',
		          },
		        ]}
		        hasFeedback
		      >
		        <Input.Password
			          prefix={<LockOutlined className="site-form-item-icon" />}
			          type="password"
			          placeholder="Password"
			      />
		      </Form.Item>

		      <Form.Item
		        name="confirm"
		        dependencies={['password']}
		        hasFeedback
		        rules={[
		          {
		            required: true,
		            message: 'Please confirm your password!',
		          },
		          ({ getFieldValue }) => ({
		            validator(rule, value) {
		              if (!value || getFieldValue('password') === value) {
		                return Promise.resolve();
		              }

		              return Promise.reject('The two passwords that you entered do not match!');
		            },
		          }),
		        ]}
		      >
		         <Input.Password
			          prefix={<LockOutlined className="site-form-item-icon" />}
			          type="password"
			          placeholder="Confirm Password"
			        />
		      </Form.Item>

		      <Form.Item {...tailFormItemLayout}>
		        <Button type="primary" htmlType="submit">
		          Signup
		        </Button>
		        Or <NavLink to='/login/'>Login</NavLink>
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
		onAuthup:(username,email,password1,password2)=>dispatch(
			actions.authSignup(username,email,password1,password2))
	}
}

export default connect(
MapStateToProps,
MapDispatchToProps) (Signup);