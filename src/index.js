import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import {createStore,compose,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './store/reducer/auth';

const composeEnhances = compose||window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store=createStore(reducer, composeEnhances(
	applyMiddleware(thunk)
	));
const app = (
	<Provider store={store}>
	<App />
	</Provider>
)

ReactDOM.render(
app,
document.getElementById('root')
);

serviceWorker.unregister();
