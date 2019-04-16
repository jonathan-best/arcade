import Phaser from 'phaser';
import BootScene from '../scenes/bootScene';
import GameScene from '../scenes/gameScene';
import WinnerScene from '../scenes/winnerScene';
import GameOverScene from '../scenes/gameOverScene';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-container',
  width: 460,
  height: 307,
  physics: {
    default: 'arcade',
  },
  scene: [BootScene, GameScene, WinnerScene, GameOverScene],
  extend: {
    player: null,
    cursors: null,
    bullets: null,
    lastFired: 0,
    lastAlienFired: 0,
    score: 0,
  }
};
