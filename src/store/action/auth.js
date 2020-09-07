import * as actionTypes from './ActionType';
import axios from 'axios';
export const authStart = () =>{
	return{
		type:actionTypes.AUTH_START
		}
}

export const authSuccess = token=>{
	return{
		type:actionTypes.AUTH_SUCCESS,
		token:token
		}
}


export const authFail = error =>{
	return{
		type:actionTypes.AUTH_FAIL,
		error:error
		}
}


export const Logout = () =>{
	localStorage.removeItem('user');
	localStorage.removeItem('expdate');
	return{
		type:actionTypes.AUTH_LOGOUT
		}
}


export const checkauthTimeout = exptime =>{
	return dispatch =>{
		setTimeout(() =>{
		dispatch(Logout());
	},exptime*1000)
	}
}

export const authLogin = (username,password) =>{
	return dispatch =>{
		dispatch(authStart()); // for start
		axios.post('http://127.0.0.1:8000/rest-auth/login/',
			{
			username:username,
			 password:password
			})
		.then(res =>{
			// console.log('generate token',res);
			const token = res.data.key;
			// console.log(token);
			const expdate = new Date(new Date().getTime()+3600*1000);
			localStorage.setItem('token',token);
			localStorage.setItem('expdate', expdate);
			dispatch(authSuccess(token));//for success
			dispatch(checkauthTimeout(3600));//in second,,for exptime check
		}).catch(err =>{
			dispatch(authFail(err));
		});
		
		}
}

export const authSignup = (username,email,password1,password2) =>{
	return dispatch =>{
		dispatch(authStart()); // ffor start
		axios.post('http://127.0.0.1:8000/rest-auth/registration/',
			{
			username:username,
			email:email,
			password1:password1,
			 password2:password2
			}).then(res =>{
			const token = res.data.key;
			const expdate = new Date(new Date().getTime()+1);
			localStorage.setItem('token',token);
			localStorage.setItem('expdate', expdate);
			dispatch(authSuccess(token));//for success
			dispatch(checkauthTimeout(3600));//in second,,for exptime check
		}).catch(err =>{
			dispatch(authFail(err));
		});
		
		}
}

export const authCheckState = () =>{
	return dispatch=>{
		const token=localStorage.getItem('token');
		if (token===undefined) {
			dispatch(Logout());
		}else{
			const expirdate=localStorage.getItem('expdate');
			if (expirdate<=new Date()) {
				dispatch(Logout());
			}else{
				dispatch(authSuccess(token));
				dispatch(checkauthTimeout((new Date(expirdate).getTime()-new Date().getTime())/1000));
			}
		}
	}
}