import Phaser from 'phaser';

const Ghost = new Phaser.Class({

  Extends: Phaser.Physics.Arcade.Sprite,

  initialize:

  function Ghost (scene, x, y, width, height, speed) {
    Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, 'ghost');
    //Phaser.Physics.Arcade.Sprite.call(this, scene, 10 * 16, 15 * 16, 'ghost');
    
    let {layer, physics} = this.scene;

    physics.add.collider(this, layer, () => {
      this.changeDirection();
    });
  },

  directions: {},
  currentDirection: '',

  start () {
    this.moveRight();
  },

  changeDirection () {
    let { layer } = this.scene;
    let surroundingDirections = {}

    this.directions.right = layer.getTileAtWorldXY(this.x + 16, this.y, true);
    this.directions.left = layer.getTileAtWorldXY(this.x - 16, this.y, true);
    this.directions.up = layer.getTileAtWorldXY(this.x, this.y - 16, true);
    this.directions.down = layer.getTileAtWorldXY(this.x, this.y + 16, true);

    for (var direction in this.directions) {
      if(this.directions[direction].index === 14){
        surroundingDirections[direction] = this.directions[direction];
      }
    };

    const nextDirection = this.randomDirection(surroundingDirections);

    switch(nextDirection) {
      case 'up' :
        this.moveUp();
        break; 
      case 'down' :
        this.moveDown();
        break;
      case 'left' :
        this.moveLeft();
        break;
      case 'right' :
        this.moveRight();
        break;
    }
  },

  randomDirection (surroundingDirections) {
    const objectKeys = Object.keys(surroundingDirections);
    const directionCount = objectKeys.length;
    const directionKey = Math.floor(Math.random() * directionCount);
    
    if(objectKeys[directionKey] === 'right' && this.currentDirection === 'left' || 
      objectKeys[directionKey] === 'left' && this.currentDirection === 'right' ||
      objectKeys[directionKey] === 'up' && this.currentDirection === 'down' ||
      objectKeys[directionKey] === 'down' && this.currentDirection === 'up') {
      return this.currentDirection;
    }
    
    return objectKeys[directionKey];
  },

  moveUp () {
    this.currentDirection = 'up';
    this.body.setVelocityY(-100);
  },

  moveDown () {
    this.currentDirection = 'down';
    this.body.setVelocityY(100);
  },

  moveLeft () {
    this.currentDirection = 'left';
    this.body.setVelocityX(-100);
  },

  moveRight () {
    this.currentDirection = 'right';
    this.body.setVelocityX(100);
  },
});

export default Ghost;
