import Phaser from 'phaser';
import BootScene from '../scenes/bootScene';
import GameScene from '../scenes/gameScene';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-container',
  width: 460,
  height: 307,
  physics: {
    default: 'arcade',
  },
  scene: [BootScene, GameScene],
  extend: {
    player: null,
    cursors: null,
    score: 0,
  }
};
