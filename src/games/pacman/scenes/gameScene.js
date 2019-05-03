import Phaser from 'phaser';
import PlayerClass from '../classes/player';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'Game'});
  }

  preload () {
    this.load.image('tiles', 'assets/pacman/tilemap.png');
    this.load.image('player', 'assets/pacman/player.png');
    this.load.image('dot', 'assets/pacman/dot.png');
    this.load.tilemapTiledJSON('map', 'assets/pacman/pacmap.json');
  }

  create () {
    this.score = 0;

    this.map = this.make.tilemap({key: 'map'});
    let tileset = this.map.addTilesetImage('tiles');
    let dotTile = this.map.addTilesetImage('dot');

    this.layer = this.map.createDynamicLayer('Ground Layer', tileset, 0, 0);
    this.dotLayer = this.map.createDynamicLayer('Dot Layer', dotTile, 0, 0);

    this.layer.setCollisionBetween(1,1);
    this.dotLayer.setTileIndexCallback(3, this.hitCoin, this);
    this.player = this.add.existing(new PlayerClass(this, 24 + 12, 24 + 12));

    this.physics.add.existing(this.player);
    this.physics.add.collider(this.player, this.layer);
    this.physics.add.overlap(this.player, this.dotLayer);

    this.cursors = this.input.keyboard.createCursorKeys();

    // Start the player moving
    this.player.moveRight();
  }

  update (time) {
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

  hitCoin (sprite, tile) {
    this.dotLayer.removeTileAt(tile.x, tile.y);
    this.score += 1;

    return false;
  }
};
