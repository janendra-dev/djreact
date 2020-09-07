import React,{useEffect} from 'react';
import './App.css';
import '../node_modules/antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom';
import CustomLayout from './components/container/Layout';
import Routes from './Routes';
import * as actions from './store/action/auth';
import {connect} from 'react-redux';

const App = ({isAuth,onTryAutoSignup}) => {

	useEffect(()=>{
		onTryAutoSignup();
	},[]);
	return (
		<div>
		<BrowserRouter>
		<CustomLayout isAuth={isAuth}>
		<Routes />
		</CustomLayout>
		</BrowserRouter>
		</div>
		);
	}

const MapStateToProps = state =>{
		return{
			isAuth:state.token!=null
		}
	}

const MapDispatchToProps = dispatch =>{
	return{
		onTryAutoSignup:()=>dispatch(actions.authCheckState())
	}
}	

	export default connect(MapStateToProps,MapDispatchToProps) (App);
