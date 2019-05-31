import Phaser from 'phaser';
import PlayerClass from '../classes/player';
import GhostClass from '../classes/ghost';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'Game'});
  }

  preload () {
    this.load.image('tiles', 'assets/pacman/pacman-tiles.png');
    this.load.image('player', 'assets/pacman/player.png');
    this.load.image('ghost', 'assets/pacman/ghost.png');
    this.load.image('dot', 'assets/pacman/dot.png');

    this.load.spritesheet('pacman',
      'assets/pacman/pacman.png',
      { frameWidth: 16, frameHeight: 16 }
    );
    
    this.load.tilemapTiledJSON('map', 'assets/pacman/pacmap.json');
  }

  create () {
    this.score = 0;
    this.directions = {}
    this.safeTile = 14;
    this.tileSize = 16;

    // Set up Animations
    this.anims.create({
      key: 'nomNom',
      frames: this.anims.generateFrameNumbers('pacman', { start: 0, end: 2 }),
      frameRate: 8,
      repeat: -1,
    });

    // Set up the maps / layers
    this.map = this.make.tilemap({key: 'map'});
    let tileset = this.map.addTilesetImage('tiles');
    let dotTile = this.map.addTilesetImage('dot');

    this.layer = this.map.createDynamicLayer('Ground Layer', tileset, 0, 20);
    this.dotLayer = this.map.createDynamicLayer('Dot Layer', dotTile, -5, 17);

    this.layer.setCollisionByExclusion([this.safeTile, 7], true, this.layer);

    this.dotLayer.setTileIndexCallback(7, this.hitCoin, this);

    // Add the player
    this.player = this.add.existing(new PlayerClass(this, 16 + 28, 16 + 28));
    this.physics.add.existing(this.player);

    // Add the ghosts
    let ghosts = this.physics.add.group({ classType: GhostClass, runChildUpdate: true });
    let blinky = ghosts.get(12 * 16, 15 * 16);
    let inky = ghosts.get(14 * 16, 15 * 16);
    let pinky = ghosts.get(16 * 16, 15 * 16);
    let clyde = ghosts.get(16 * 16, 15 * 16);

    // Add the overlaps to interact with surroundings
    this.physics.add.overlap(this.player, this.dotLayer);
    this.physics.add.overlap(pinky, this.player, this.gameOver, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();

    // Start the player moving
    this.player.moveRight();

    // Start the ghosts moving
    blinky.start();
    pinky.start();
    inky.start();
    clyde.start();
  }

  update (time) {
    this.directions.right = this.layer.getTileAtWorldXY(this.player.x + 16, this.player.y, true);
    this.directions.left = this.layer.getTileAtWorldXY(this.player.x - 16, this.player.y, true);
    this.directions.up = this.layer.getTileAtWorldXY(this.player.x, this.player.y - 16, true);
    this.directions.down = this.layer.getTileAtWorldXY(this.player.x, this.player.y + 16, true);

    if (this.cursors.down.isDown && this.canTurn('down')) {
      this.player.moveDown();
    } else if (this.cursors.up.isDown && this.canTurn('up')) {
      this.player.moveUp();
    } else if (this.cursors.left.isDown && this.canTurn('left')) {
      this.player.moveLeft();
    } else if (this.cursors.right.isDown && this.canTurn('right')) {
      this.player.moveRight();
    }
  }

  canTurn (direction) {
    return this.directions[direction].index === this.safeTile;
  }

  hitCoin (sprite, tile) {
    this.dotLayer.removeTileAt(tile.x, tile.y);
    this.score += 1;

    return false;
  }

  gameOver () {
    console.log('Game Over')
  }
};
