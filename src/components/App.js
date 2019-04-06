import React, { Component } from 'react';
import Cabinet from './cabinet';
import Invaders from '../games/invaders'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Cabinet>
          <Invaders />
        </Cabinet>
      </div>
    );
  }
}

export default App;
