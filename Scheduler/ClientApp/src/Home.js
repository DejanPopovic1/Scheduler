import React from 'react'
import { Switch, Redirect } from 'react-router-dom';
import './App.css';
import RouteWithSubRoutes from './RouteWithSubRoutes';
import { NavigationBar } from './components/NavigationBar';

function Home({ routes }) {
    return (
        <>
            <NavigationBar/>
            <Switch>
                <Redirect exact from='/home' to='/home/homecontent' />
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>
        </>
    );
}

export default Home;
