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

    this.load.spritesheet('characters',
    'assets/pacman/characters.png',
    { frameWidth: 16, frameHeight: 16 }
  );
    
    this.load.tilemapTiledJSON('map', 'assets/pacman/pacmap.json');
  }

  create () {
    this.score = 0;
    this.directions = {}
    this.safeTile = 14;
    this.tileSize = 16;

    // Add score
    this.scoreText = this.add.text(20 , 10, `Score: ${this.score}`);

    // Set up Animations
    this.anims.create({
      key: 'pacman-eat',
      frames: this.anims.generateFrameNumbers('characters', { start: 0, end: 2 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'pacman-die',
      frames: this.anims.generateFrameNumbers('characters', { start: 2, end: 13 }),
      frameRate: 8,
    });

    const ghostNames = ['blinky', 'pinky', 'inky', 'clyde'];
    const ghostDirections = ['right', 'left', 'up', 'down'];
    let spriteIndex = 56;

    ghostNames.forEach(ghost => {
      ghostDirections.forEach(direction => {
        this.anims.create({
          key: `${ghost}-${direction}`,
          frames: this.anims.generateFrameNumbers('characters', { start: spriteIndex, end: spriteIndex + 1 }),
          frameRate: 8,
          repeat: -1,
        });
        spriteIndex += 2;
      })
      spriteIndex += 6;
    });

    // Set up the maps / layers
    this.map = this.make.tilemap({key: 'map'});
    let tileset = this.map.addTilesetImage('tiles');
    let dotTile = this.map.addTilesetImage('dot');

    this.layer = this.map.createDynamicLayer('Ground Layer', tileset, 0, 30);
    this.dotLayer = this.map.createDynamicLayer('Dot Layer', dotTile, -5, 27);

    this.layer.setCollisionByExclusion([this.safeTile, 7], true, this.layer);
    this.dotLayer.setTileIndexCallback(7, this.eatDot, this);

    // Set up the score
    this.winningScore = this.dotLayer.layer.properties.dots * 10;

    // Add the player
    this.player = this.add.existing(new PlayerClass(this, 16 + 28, 16 + 38));
    this.physics.add.existing(this.player);

    // Add the ghosts
    let ghosts = this.physics.add.group({ classType: GhostClass, runChildUpdate: true });
    let blinky = ghosts.get(12 * 16, 15 * 16, 'blinky');
    let inky = ghosts.get(14 * 16, 15 * 16, 'inky');
    let pinky = ghosts.get(16 * 16, 15 * 16, 'pinky');
    let clyde = ghosts.get(16 * 16, 15 * 16, 'clyde');

    // Add the overlaps to interact with surroundings
    this.physics.add.overlap(this.player, this.dotLayer);

    this.physics.add.overlap(blinky, this.player, this.gameOver, null, this);
    this.physics.add.overlap(pinky, this.player, this.gameOver, null, this);
    this.physics.add.overlap(inky, this.player, this.gameOver, null, this);
    this.physics.add.overlap(clyde, this.player, this.gameOver, null, this);

    // Set up the keyboard events
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

    // Check for the win condition
    if(this.winningScore === this.score) {
      this.scene.start('Post');
    }
  }

  canTurn (direction) {
    return this.directions[direction].index === this.safeTile;
  }

  eatDot (sprite, tile) {
    this.dotLayer.removeTileAt(tile.x, tile.y);
    this.score += 10;
    this.scoreText.text = `Score: ${this.score}`;

    return false;
  }

  gameOver () {
    this.player.die();
  }
};
