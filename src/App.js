import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PlayerPage from './PlayerPage.js';
import Setup from './Setup.js';
import Drafter from './Drafter.js';
import Summary from './Summary.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 style={{margin: '0'}}>Welcome to the draft</h2>
        </div>
        <Setup />
        <Summary />
        <Drafter />
        <PlayerPage />
      </div>
    );
  }
}

export default App;