import Phaser from 'phaser';

const Player = new Phaser.Class({

  Extends: Phaser.Physics.Arcade.Sprite,

  initialize:

  function Player (scene, x, y, width, height, speed) {
    Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, 'ship');
    this.setPosition(200, 250);
  },

  moveLeft: function() {
    this.body.velocity.x = -200;
  },

  moveRight: function() {
    this.body.velocity.x = 200;
  },

  die: function(){
    this.anims.play('explode', true);
    this.on('animationcomplete', () => {
      this.disableBody(true, true);
      this.scene.game.scene.start('GameOver');
    }, this);
  },
});

export default Player;
