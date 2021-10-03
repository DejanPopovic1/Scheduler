import React from 'react'
import { Switch, Redirect } from 'react-router-dom';
import './App.css';
import RouteWithSubRoutes from './RouteWithSubRoutes';
import { NavigationBar } from './components/NavigationBar';
import Schedule from './Schedule';
import Contact from './Contact';
import HomeContent from './HomeContent';

function Home({ routes }) {
    return (
        <>
            <NavigationBar/>
            <Switch>
{/*                <Redirect exact from='/home' to='/home/homecontent' />*/}
                {/*{routes.map((route, i) => (*/}
                {/*    <RouteWithSubRoutes key={i} {...route} />*/}
                {/*))}*/}

                <RouteWithSubRoutes key='0' path='/schedule' component={Schedule} />
                <RouteWithSubRoutes key='1' path='/contact' component={Contact}/>
                <RouteWithSubRoutes key='2' path='/home/' component={HomeContent}/>




            </Switch>
        </>
    );
}

export default Home;
