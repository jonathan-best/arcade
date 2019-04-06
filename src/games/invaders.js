import React, { Component } from 'react';
import Phaser from 'phaser';
import Config from './config/config';

class Invaders extends Component {
  constructor() {
    super();
    this.game = null;
  }

  componentDidMount () {
    this.game = new Phaser.Game(Config);
  }

  render() {
    return (
      <div className="phaserContainer" id="phaser-container" />
    );
  }
}

export default Invaders;
