import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import { createBrowserHistory, History, LocationState } from 'history';
import Home from '../components/home/Home';
import Employee from '../components/employee/Employee';
import BackOffice from '../admin/home/BackOffice'; 
import '../../styles/reset.scss';
import '../../styles/styles.scss';

import 'semantic-ui-css/semantic.min.css'

const Main = () => {
	const history: History<LocationState> = createBrowserHistory({ basename: '/' });

    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact={true} component={Home}/>
                <Route path="/employees/:id" component={Employee}/>
                <Route path="/admin" exact={true} component={BackOffice}/>
                <Route path="/*" component={NotFound}/>
            </Switch>
        </Router>
    );
};

const NotFound = () => {
    return (
        <h1>Upss, not found</h1>
    )
}

export default Main;