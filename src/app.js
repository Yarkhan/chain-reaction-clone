import Ball from './Entities/Ball.js';
import Engine from './Engine/Engine.js'
import Mouse from './Engine/Mouse.js';
import PlayingState from './GameStates/PlayingState.js'
import Player from './Entities/Player.js';
import ConfigState from './GameStates/ConfigState.js'
document.write('<canvas id="c" style="width:100%;height:100%;"></canvas>');

let canvas = document.getElementById('c');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
let engine = new Engine(canvas);
engine.gameState = new ConfigState();
engine.start();
