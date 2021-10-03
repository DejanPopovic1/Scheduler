import React from 'react'
import { Switch, Redirect } from 'react-router-dom';
import './App.css';
import RouteWithSubRoutes from './RouteWithSubRoutes';
import { NavigationBar } from './components/NavigationBar';
import Schedule from './Schedule';
import Contact from './Contact';
import HomeContent from './HomeContent';

function Home() {
    return (
        <>
            <NavigationBar/>
            <Switch>
{/*                <Redirect exact from='/home' to='/home/homecontent' />*/}
                {/*{routes.map((route, i) => (*/}
                {/*    <RouteWithSubRoutes key={i} {...route} />*/}
                {/*))}*/}

                <RouteWithSubRoutes path='/schedule' component={Schedule} />
                <RouteWithSubRoutes path='/contact' component={Contact}/>
                <RouteWithSubRoutes path='/home/' component={HomeContent}/>




            </Switch>
        </>
    );
}

export default Home;
