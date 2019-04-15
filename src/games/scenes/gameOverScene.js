import Phaser from 'phaser';

export default class PostScene extends Phaser.Scene {
  constructor () {
    super('GameOver');
  }

  create () {
    const {clientWidth, clientHeight} = this.game.canvas;

    this.add.text((clientWidth / 2 - 40) , (clientHeight / 2 - 10), 'Game Over!');
    this.input.manager.enabled = true;
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update (time) {
    if (this.cursors.space.isDown && time > 4000) {
      this.scene.start('Game');
    }
  }
};
