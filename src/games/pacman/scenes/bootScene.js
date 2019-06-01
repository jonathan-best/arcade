import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }

  create () {
    const {clientHeight} = this.game.canvas;
    this.add.text(120 , (clientHeight / 2 - 10), 'Press Spacebar To Start');
    this.input.manager.enabled = true;
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update () {
    if (this.cursors.space.isDown) {
      this.scene.start('Game');
    }
  }
};
