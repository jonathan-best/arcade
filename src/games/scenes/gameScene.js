import Phaser from 'phaser';
import Bullet from '../bullet';
import Alien from '../alien';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'Game'});
  }

  preload () {
    this.load.image('sky', "/assets/starfield.png");
    this.load.image('ship', "/assets/player.png");
    this.load.image('bullet', '/assets/bullet.png');
    this.load.image('invader', '/assets/invader.png');
    this.load.spritesheet('explode',
        'assets/explode.png',
        { frameWidth: 128, frameHeight: 128 }
    );
  }

  create () {
    this.sky = this.add.tileSprite(200, 200, 512, 512, 'sky');

    // Set up animation effects
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explode', { start: 0, end: 15 }),
      frameRate: 60,
    });

    //  The score
    this.score = 0;
    this.scoreText = this.add.text(20 , 10, `Score: ${this.score}`);

    // Set up the player
    this.player = this.physics.add.sprite(200, 250, 'ship');
    this.player.setCollideWorldBounds(true);

    // Set up the bullets
    this.bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    this.bulletTime = 0;
    this.lastFired = 0;
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    // Set up the Controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // Set up Aliens
    this.aliens = this.physics.add.group({ allowGravity: true });

    this.alienCount = 0;

    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 10; x++) {
        this.aliens.add(new Alien(this, x * 48, y * 48, 100, 100, 0.005), true);
        this.alienCount += 1;
      }
    }

    // Add the hit detection
    this.physics.add.overlap(this.bullets, this.aliens, this.collisionHandler, null, this);
  }

  update (time) {
    this.player.body.velocity.setTo(0, 0);
    this.sky.tilePositionY += 1;

    // Move the player
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -200;
    }
    else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 200;
    }

    // Fire the laser
    if (this.cursors.space.isDown && time > this.lastFired) {
      let bullet = this.bullets.get();
      bullet.setActive(true);
      bullet.setVisible(true);

      if (bullet) {
        bullet.fire(this.player);
        this.lastFired = time + 200;
      }
    }

    if (this.alienCount === 0) {
      this.scene.start('Post');
    }
  }

  collisionHandler (bullet, alien) {
    alien.die();
    bullet.destroy(true, true);
    this.alienCount -= 1;
    this.score = this.score + 100;
    this.scoreText.text = `Score: ${this.score}`;
  }
};
