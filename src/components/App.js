import React, { Component } from 'react';
import Cabinet from './cabinet';
import Game from '../games';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Cabinet>
          <Game variant="invaders" />
        </Cabinet>
      </div>
    );
  }
}

export default App;
