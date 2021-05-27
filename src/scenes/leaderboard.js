import Phaser from 'phaser';
import assets from '../lib/assets';
import eventEmitter from '../lib/event-emitter';
import grid from '../lib/grid';
import mixin from '../lib/mixin';

const leaders = [
  { name: 'Francis', score: 800 },
  { name: 'Charles', score: 700 },
  { name: 'Chidimma', score: 600 },
  { name: 'Maureen', score: 500 },
  { name: 'Netochukwu', score: 400 },
  { name: 'Chi Chi', score: 300 },
];

const getBoard = (leaders) => `
  <div style="width: 330px;height:450px;padding:25px;display:flex;flex-flow:column nowrap;color:#fff;font-size:1.2rem;overflow:auto;font-family: 'Pattaya', sans-serif;">
    <div style="display:flex;padding:5px;font-weight:bold;border-bottom:1px dotted #fff;">
      <span style="flex:1;">Player</span>
      <span style="flex:0 0 40px;">Score</span>
    </div>
    <div>
  ${leaders.map((leader) => `
    <div style="display:flex;padding:5px;">
      <span style="flex:1;">${leader.name}</span>
      <span style="flex:0 0 40px;">${leader.score}</span>
    </div>
  `).join('')}
    </div>
  </div>
`;

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super({ key: LeaderboardScene.key });
    this.eventRelay = mixin({}, eventEmitter());
  }

  create = () => {
    this.add.image(400, 300, assets.scoreBg.key).setScale(2);
    this.add.image(grid.valueOf(12.5), grid.valueOf(9.7), assets.goldFrame.key);
    this.add.image(grid.valueOf(12.5), grid.valueOf(9.7), assets.prussianBg.key);
    this.add.dom(grid.valueOf(12.5), grid.valueOf(9.7)).createFromHTML(getBoard(leaders));
    this.add.image(grid.valueOf(23.5), grid.valueOf(1.5), assets.closeBtn.key)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.eventRelay.emit('exit');
      });
    // this.add.image(400, 300, assets.grid.key);
  }
}

LeaderboardScene.key = 'leaderboard';