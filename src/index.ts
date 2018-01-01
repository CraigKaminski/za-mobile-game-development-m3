// tslint:disable:ordered-imports
import 'p2';
import 'pixi';
import 'phaser';
// tslint:enable:ordered-imports

import { Boot } from './states/Boot';
import { Game } from './states/Game';
import { Home } from './states/Home';
import { Preload } from './states/Preload';

const game = new Phaser.Game(360, 640, Phaser.AUTO, '', null);
game.state.add('Boot', Boot);
game.state.add('Game', Game);
game.state.add('Home', Home);
game.state.add('Preload', Preload);
game.state.start('Boot');
