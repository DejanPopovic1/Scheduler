////import React from 'react';
////import ReactDOM from 'react-dom';
////import './index.css';
////import App from './App';
////import reportWebVitals from './reportWebVitals';

//////import { BrowserRouter, Route, Switch } from 'react-router-dom';

//////<script async
//////    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBmR1boQwfJds75LmvteHJ3SQ38rwc61IA&callback=initMap">
//////</script>

//////ReactDOM.render(
//////  <React.StrictMode>
//////    <BrowserRouter>
//////      <App />
//////    </BrowserRouter>
//////  </React.StrictMode>,
//////  document.getElementById('root')
//////);

////// If you want to start measuring performance in your app, pass a function
////// to log results (for example: reportWebVitals(console.log))
////// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
////reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Dummy from './Dummy';
import App from './App';
import Login from './login';
//import Routes from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
        <BrowserRouter>
            {/*<Routes>*/}
            {/*    <Route path="/" component={App} exact />*/}
            {/*    <Route path="/login" component={Login} />*/}
            {/*</Routes>*/}
            <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


//import React from 'react';
//import ReactDOM from 'react-dom';
//import Dummy from './Dummy'

//const Dummy2 = () => <div>Hello world!211228881999777</div>;

//ReactDOM.render(<Dummy />, document.getElementById("root"));