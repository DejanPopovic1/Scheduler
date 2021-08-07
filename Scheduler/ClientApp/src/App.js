import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import Schedule from './Schedule';
import React, {Fragment} from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from './components/NavigationBar';

function App() {

    return (
    <Fragment>
    <NavigationBar />
    <main>
      <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/Contact" component={Contact} />
          <Route path="/Schedule" component={Schedule} />
      </Switch>
    </main>
    </Fragment>
  );
}

export default App;
