import React, { Component } from 'react';
import PacmanConfig from './config/config';
import Phaser from 'phaser';

class Game extends Component {
  constructor() {
    super();
    this.game = null;
  }

  componentDidMount () {
    this.game = new Phaser.Game(PacmanConfig);
    console.log(this.game)
  }

  componentWillUnmount () {
    this.game.destroy(true);
  }

  render() {
    return (
      <div className="phaserContainer" id="phaser-container" />
    ); 
  }
}

export default Game;
