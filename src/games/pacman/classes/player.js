import Phaser from 'phaser';

const Player = new Phaser.Class({

  Extends: Phaser.Physics.Arcade.Sprite,

  initialize:

  function Player (scene, x, y, width, height, speed) {
    Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, 'pacman');

    let { layer, physics } = this.scene;
    physics.add.collider(this, layer);

    this.play('nomNom', true);
  },

  moveUp () {
    this.body.setVelocityY(-100);
    this.angle = 270;
  },

  moveDown () {
    this.body.setVelocityY(100);
    this.angle = 90;
  },

  moveLeft () {
    this.body.setVelocityX(-100);
    this.angle = 180;
  },

  moveRight () {
    this.body.setVelocityX(100);
    this.angle = 0;
  },
});

export default Player;
