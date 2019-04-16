import Phaser from 'phaser';

const Alien = new Phaser.Class({

  Extends: Phaser.Physics.Arcade.Sprite,

  initialize:

  function Alien (scene, x, y, width, height, speed) {
    Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, 'invader');
    this.direction = -20;
  },

  die: function(){
    this.anims.play('explode', true);
    this.on('animationcomplete', () => {
      this.disableBody(true, true);
      this.scene.aliens.remove(this);
    }, this);
  },

  preUpdate: function (time, delta) {
    this.anims.update(time, delta);

    // Move the alien group
    if (this.direction === 50) {
      this.direction = -50; // Change the direction
      this.y += 10; // Lower the aliens
    }

    if (this.direction < 0) {
      this.direction += 1;
      this.x -= 2;
    } else if (this.direction >= 0) {
      this.direction += 1;
      this.x += 2;
    }
  },
});

export default Alien;
