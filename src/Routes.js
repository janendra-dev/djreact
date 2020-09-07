import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ArticleListView from './components/container/ArticleListView';
import ArticleDetailView from './components/container/ArticleDetailView';
import Login from './components/container/Login';
import Signup from './components/container/Signup';
const Routes = () => {
    return (
        <>
            <Switch>
                <Route exact path='/' component={ArticleListView} />
                <Route exact path='/articles/:detailid' component={ArticleDetailView} />
                <Route exact path='/login/' component={Login} />
                <Route exact path='/signup/' component={Signup} />
            </Switch>
        </>
    );
}
export default Routes;