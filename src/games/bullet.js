import Phaser from 'phaser';

let Bullet = new Phaser.Class({

  Extends: Phaser.Physics.Arcade.Sprite,

  initialize:

  function Bullet (scene) {
    Phaser.Physics.Arcade.Sprite.call(this, scene, 0, 0, 'bullet');

    this.speed = 0;
    this.born = 0;
  },

  fire: function (player) {
    const {x, y, height} = player;

    this.setPosition(x, y - height);
    this.speed = Phaser.Math.GetSpeed(-1000, 1);
    this.born = 0;
  },

  update: function (time, delta) {
    this.y += this.speed * delta;
    this.born += delta;

    if (this.born > 1000) {
      this.setActive(false);
      this.setVisible(false);
    }
  },
});

export default Bullet;
