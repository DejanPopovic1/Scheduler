import React from 'react'
import ReactDOM from 'react-dom'

import logo from './logo.svg';
import './App.css';

function App() {
    const menu = [
        {
            path: '/home/page1', // the url
            name: 'Page1', // name that appear in Sidebar
        },
        {
            path: '/home/page2',
            name: 'Page2',
        },
    ];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React

          Here is a sentence to use in order to test FlexSearch
        </a>
      </header>
    </div>
  );
}

export default App;
