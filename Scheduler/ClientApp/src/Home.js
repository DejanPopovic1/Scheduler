import React from 'react'
import { Switch, Redirect } from 'react-router-dom';
import './App.css';
import RouteWithSubRoutes from './RouteWithSubRoutes';
import { NavigationBar } from './components/NavigationBar';
import Schedule from './Schedule';
import Contact from './Contact';
import HomeContent from './HomeContent';
import SchedulerTool from './SchedulerTool';

function Home() {
    return (
        <>
            <NavigationBar />
            <Switch>
                <RouteWithSubRoutes path='/schedule' component={Schedule} />
                <RouteWithSubRoutes path='/contact' component={Contact} />
                <RouteWithSubRoutes path='/home/' component={HomeContent} />
                <RouteWithSubRoutes path='/schedulertool/' component={SchedulerTool} />
            </Switch>
        </>
    );
}

export default Home;
