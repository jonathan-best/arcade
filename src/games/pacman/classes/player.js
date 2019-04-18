import Phaser from 'phaser';

const Player = new Phaser.Class({

  Extends: Phaser.Physics.Arcade.Sprite,

  initialize:

  function Player (scene, x, y, width, height, speed) {
    Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, 'player');
  },

  moveUp () {
    this.body.setVelocityY(-100);
  },

  moveDown () {
    this.body.setVelocityY(100);
  },

  moveLeft () {
    this.body.setVelocityX(-100);
  },

  moveRight () {
    this.body.setVelocityX(100);
  },
});

export default Player;
