import React, { Component } from 'react';
import Cabinet from './cabinet';
import Game from '../games';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      variant: "pacman"
    };
  }

  changeGame = (variant) => {
    this.setState({
      variant
    })
  }

  render() {
    return (
      <div className="App">
        <Cabinet changeGame={this.changeGame}>
          <Game variant={this.state.variant} />
        </Cabinet>
      </div>
    );
  }
}

export default App;
