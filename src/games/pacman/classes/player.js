import Phaser from 'phaser';

const Player = new Phaser.Class({

  Extends: Phaser.Physics.Arcade.Sprite,

  initialize:

  function Player (scene, x, y, width, height, speed) {
    Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, 'characters');

    let { layer, physics } = this.scene;
    physics.add.collider(this, layer);

    this.play('pacman-eat', true);
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

  die () {
    this.play('pacman-die', true);

    this.body.setVelocityX(0);
    this.body.setVelocityY(0);

    this.on('animationcomplete', () => {
      this.disableBody(true, true);
      this.scene.game.scene.start('GameOver');
    });
  },
});

export default Player;
