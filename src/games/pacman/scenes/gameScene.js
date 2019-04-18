import Phaser from 'phaser';
import PlayerClass from '../classes/player';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'Game'});
  }

  preload () {
    this.load.image('tiles', 'assets/pacman/tilemap.png');
    this.load.tilemapCSV('map', 'assets/pacman/pacmap.csv');
    this.load.image('player', 'assets/pacman/player.png');
  }

  create () {
    this.map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });
    let tileset = this.map.addTilesetImage('tiles');
    let layer = this.map.createStaticLayer(0, tileset, 0, 0);

    this.map.setCollision([1]);

    this.player = this.add.existing(new PlayerClass(this, 24, 24));

    this.physics.add.existing(this.player);
    this.physics.add.collider(this.player, layer);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update (time) {
    this.player.body.setVelocity(0);

    if (this.cursors.down.isDown) {
      this.player.moveDown();
    } else if (this.cursors.up.isDown) {
      this.player.moveUp();
    } else if (this.cursors.left.isDown) {
      this.player.moveLeft();
    } else if (this.cursors.right.isDown) {
      this.player.moveRight();
    }
  }
};
