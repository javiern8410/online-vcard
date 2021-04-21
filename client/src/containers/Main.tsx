import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import { createBrowserHistory, History, LocationState } from 'history';
import Home from '../components/home/Home';
import Item from '../components/item/Item';
import Items from '../components/items/Items';
import '../../styles/reset.scss';
import '../../styles/styles.scss';

const Main = () => {
	const history: History<LocationState> = createBrowserHistory({ basename: '/' });

    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact={true} component={Home}/>
                <Route path={["/items/:id", "/item/:id"]} component={Item}/>
                <Route path="/items" component={Items}/>
            </Switch>
        </Router>
    );
};

export default Main;