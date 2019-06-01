import Phaser from 'phaser';
import BootScene from '../scenes/bootScene';
import GameScene from '../scenes/gameScene';
import GameOverScene from '../scenes/gameOverScene';
import WinningScene from '../scenes/winnerScene';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-container',
  width: 460,
  height: 307,
  physics: {
    default: 'arcade',
  },
  scene: [BootScene, GameScene, GameOverScene, WinningScene],
  extend: {
    player: null,
    cursors: null,
    score: 0,
  }
};
