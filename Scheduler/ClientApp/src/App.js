import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import Schedule from './Schedule';
import login from './login';
import React, { Fragment } from 'react';
import NotFound from './NotFound';
import RouteWithSubRoutes from './RouteWithSubRoutes';
import HomeContent from './HomeContent';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact from='/' to='/login' />
                <Route path='/login' component={login} />
                <RouteWithSubRoutes path='/' component={Home} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;