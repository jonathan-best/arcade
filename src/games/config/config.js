import Phaser from 'phaser';
import BootScene from '../scenes/bootScene';
import GameScene from '../scenes/gameScene';
import PostScene from '../scenes/postScene';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-container',
  width: 460,
  height: 307,
  physics: {
    default: 'arcade',
  },
  scene: [BootScene, GameScene, PostScene],
  extend: {
    player: null,
    cursors: null,
    bullets: null,
    lastFired: 0,
    score: 0,
  }
};
