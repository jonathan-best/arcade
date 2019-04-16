import Phaser from 'phaser';

let Bullet = new Phaser.Class({

  Extends: Phaser.Physics.Arcade.Sprite,

  initialize:

  function Bullet (scene) {
    Phaser.Physics.Arcade.Sprite.call(this, scene, 0, 0, 'enemyBullet');
    this.speed = 0;
    this.born = 0;
  },

  fire: function (player) {
    const {x, y} = player;

    this.setPosition(x, y);
    this.speed = Phaser.Math.GetSpeed(-300, 1);
    this.born = 0;
  },

  update: function (time, delta) {
    this.y -= this.speed * delta;
    this.born += delta;

    if (this.born > 4000) {
      this.setActive(false);
      this.setVisible(false);
    }
  },
});

export default Bullet;
