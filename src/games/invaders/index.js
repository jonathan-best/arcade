import React, { Component } from 'react';
import InvadersConfig from './config/config';
import Phaser from 'phaser';

class Game extends Component {
  constructor() {
    super();
    this.game = null;
  }

  componentDidMount () {
    this.game = new Phaser.Game(InvadersConfig);
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
