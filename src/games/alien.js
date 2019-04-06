import Phaser from 'phaser';

const Alien = new Phaser.Class({

  Extends: Phaser.Physics.Arcade.Sprite,

  initialize:

  function Alien (scene, x, y, width, height, speed) {
    Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, 'invader');

    //  This is the path the sprite will follow
    this.path = new Phaser.Curves.Ellipse(x, y, width, height);
    this.pathIndex = 0;
    this.pathSpeed = speed;
    this.pathVector = new Phaser.Math.Vector2();

    this.path.getPoint(0, this.pathVector);

    this.setPosition(this.pathVector.x, this.pathVector.y);
  },

  die: function(player){
    this.anims.play('explode', true);
    this.on('animationcomplete', () => {
      this.disableBody(true, true);
    }, this);
  },

  preUpdate: function (time, delta) {
    this.anims.update(time, delta);
    this.path.getPoint(this.pathIndex, this.pathVector);
    this.setPosition(this.pathVector.x, this.pathVector.y);
    this.pathIndex = Phaser.Math.Wrap(this.pathIndex + this.pathSpeed, 0, 1);
  },
});

export default Alien;
