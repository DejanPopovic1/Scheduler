import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import Schedule from './Schedule';

function App() {
  return (
    <main>
      <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/Contact" component={Contact} />
          <Route path="/Schedule" component={Schedule} />
      </Switch>
    </main>
  );
}

export default App;
