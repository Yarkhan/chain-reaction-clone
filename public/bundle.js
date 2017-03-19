/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Mouse{
    constructor(el){
        this.el = el;
        this.el.addEventListener('mouseup', e => this.mouseUp(e));
        this.el.addEventListener('mousedown', e => this.mouseDown(e));
        this.el.addEventListener('mousemove', e => this.mouseMove(e));
        this.el.addEventListener('touchstart', e => this.touchStart(e));
        this.el.addEventListener('touchend', e => this.touchEnd(e));
        this.isDown = false;
        this.position = {x:0,y:0};
    }
    mouseUp(e){
        this.isDown = false;
    }
    mouseDown(e){
        this.isDown = true;
    }
    touchStart(e){
        this.isDown = true;
        this.mouseMove(e.changedTouches[0]);
    }
    touchEnd(e){
        this.isDown = false;
    }
    mouseMove(e){
        this.position.x = e.clientX;
        this.position.y = e.clientY;
    }
}
/* harmony default export */ __webpack_exports__["a"] = Mouse;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

let index = 0;
let colors = ['blue','red','green','pink','yellow'];

class Player{
    constructor(){
        this.color = colors[index % colors.length];
        this.clicks = 0;
        this.squares = 0;
        this.playing = true;
        this.id = index;
        index++;
    }
    get lost(){
        return this.clicks && this.squares <= 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entities_Button_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PlayingState_js__ = __webpack_require__(3);


class ConfigState{
    constructor(message){
        this.message = message;
        this.numberPlayers = [
            2,3,4,5
        ];
        this.playerButtons = [];
        setTimeout(e => {
            for(let i=0; i<this.numberPlayers.length;i++){
                let opt = this.numberPlayers[i];
                let index = i;
                this.playerButtons.push(new __WEBPACK_IMPORTED_MODULE_0__Entities_Button_js__["a" /* default */]({
                    label: opt+'',
                    width: 64,
                    height: 64,
                    bgColor: 'blue',
                    textColor: 'white',
                    x: i * 80 + this.$context.canvas.width/8,
                    y:140,
                    size: 32,
                    onSelect: i => {
                        this.selectedPlayers = this.playerButtons[index];
                        console.log(this.selectedPlayers);
                        this.change();
                    }
                }));
            }
            this.selectedPlayers = this.playerButtons[0];
        },100);
    }
    handleClick(position){
        for(let b of this.playerButtons){
            let rangeX = position.x > b.x && position.x < b.x+b.width;
            let rangeY = position.y > b.y && position.y < b.y+b.height;
            if(rangeX && rangeY){
                b.onSelect();
            }
        }
    }
    change(){
        console.log(this.selectedPlayers.label);
        let playingState = new __WEBPACK_IMPORTED_MODULE_1__PlayingState_js__["a" /* default */]({
            players: this.selectedPlayers.label,
            rows: 4,
            cols: 4
        });
        this.$game.gameState = playingState
    }
    update(){
        if(this.$mouse.isDown) {
            this.$mouse.isDown = false;
            this.handleClick(this.$mouse.position)
        }
    }
    render(){
        let ctx = this.$context;
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
        ctx.font = '32px arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Jogadores: ',ctx.canvas.width/2-80,80);
        for(let b of this.playerButtons){
            b.render(this.$context);
        }
        ctx.fillText(this.message||'',ctx.canvas.width/2-100,ctx.canvas.height/2);
        if(this.selectedPlayers){
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = 'white';
            ctx.strokeRect(this.selectedPlayers.x,this.selectedPlayers.y,this.selectedPlayers.width,this.selectedPlayers.height);
            ctx.closePath();
            ctx.restore();
        }
        // for(let i=0; i<this.numberPlayers.length;i++){
        //     let opt = this.numberPlayers[i];
        //     ctx.fillText(opt, i*64+ctx.canvas.width/5, 160);
        // }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ConfigState;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entities_Grid_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entities_Player_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ConfigState_js__ = __webpack_require__(2);



class PlayingState{
    constructor(opts){
        this.players = [];
        this.rows = opts.rows;
        this.cols = opts.cols;
        for(let i=0; i < opts.players; i++){
            let player = new __WEBPACK_IMPORTED_MODULE_1__Entities_Player_js__["a" /* default */];
            player.id = i;
            this.players.push(player);
        }
        this.currentPlayerIndex = 0;
    }
    get currentPlayer(){
        return this.players[this.currentPlayerIndex];
    }
    get winner(){
        let inGame=[];
        for(let p of this.players){
            if(!p.lost) inGame.push(p);
        }
        return inGame.length == 1 ? inGame[0] : false;
    }
    nextPlayer(){
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        if(this.currentPlayer.lost) this.nextPlayer();
    }
    init(){
        this.grid = new __WEBPACK_IMPORTED_MODULE_0__Entities_Grid_js__["a" /* default */](this.cols, this.rows, this.$game.canvas.width, this.$game.canvas.height);
    }
    gameOver(msg){
        this.$game.gameState = new __WEBPACK_IMPORTED_MODULE_2__ConfigState_js__["a" /* default */](msg);
    }
    update(){
        if(this.$mouse.isDown) this.click();
    }
    render(){
        this.$context.save();
        this.$context.fillStyle = 'white';
        this.$context.fillRect(0,0,this.$context.canvas.width,this.$context.canvas.height);
        this.$context.restore();
        this.grid.render(this.$context,this.currentPlayer);
    }
    clickSquare(player, square, resolve, exploding){
        let neighbours = this.grid.neighbours(square);

        //increment player clicks, squares, etc
        if(!exploding) player.clicks++;
        square.clicks++;

        //transfer ownership
        if(square.owner && square.owner != player){
            square.owner.squares--;
            if(square.owner.lost){
                if(this.winner) return this.gameOver(this.winner.color);
            }
        }

        if(!square.owner || square.owner != player){
            square.owner = player;
            player.squares++;
        }

        //check for explosion and explode by recursion
        if(square.clicks == neighbours.length){
            player.squares--;
            square.owner = undefined;
            square.clicks = 0;
            let promises = [];
            for(let i=0; i < neighbours.length; i++){
                let sq = neighbours[i];
                promises.push(new Promise(resolve => {
                    setTimeout(() => this.clickSquare(player,sq,resolve,true),400*i);
                }));
            }
            Promise.all(promises).then(()=>resolve('ok'));
            return;
        }
        resolve('ok');
    }
    click(){
        let col = Math.floor(
            this.$mouse.position.x/(this.$context.canvas.width/this.grid.cols)
        );
        let row = Math.floor(
            this.$mouse.position.y/(this.$context.canvas.height/this.grid.rows)
        );
        let square = this.grid.squares[row][col];

        if(square.owner && (square.owner != this.currentPlayer)) return;

        new Promise(resolve => {
            this.$mouse.isDown = false;
            this.clickSquare(this.currentPlayer, square, resolve);
        }).then(()=> {
            if(this.winner) return this.gameOver(this.winner.color);
            this.nextPlayer();
        });

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlayingState;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Mouse_js__ = __webpack_require__(0);

class BaseGameState{
    update(){
        context.fillText('this is an empty context',20,20);
    }
}
class Engine{
    get gameState(){
        return this._gameState;
    }
    set gameState(gameState){
        if(this._gameState){
            this._gameState.$game = undefined;
            this._gameState.$context = undefined;
            this._gameState.$mouse = undefined;
        }
        gameState.$game = this;
        gameState.$context = this.context;
        gameState.$mouse = this.mouse;
        gameState.init && gameState.init();
        this._gameState = gameState;
    }
    constructor(canvas){
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.running = false;
        this.mouse = new __WEBPACK_IMPORTED_MODULE_0__Mouse_js__["a" /* default */](this.canvas);
        this._gameState = new BaseGameState;
    }
    loop(callback){
        if(!this.running) return;
        requestAnimationFrame(t => {
            this.gameState.update();
            this.gameState.render();
            this.loop();
        });
    }
    start(){
        this.running = true;
        this.loop()
    }
    stop(){
        this.running = false;
    }
}

/* harmony default export */ __webpack_exports__["a"] = Engine;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Ball{
    constructor(options){
        this.x = options.x;
        this.y = options.y;
    }
    render(context){
        context.save();
        context.fillStyle = 'black';
        context.beginPath();
        context.arc(this.x,this.y,20,0,Math.PI*2);
        context.fill();
        context.closePath();
        context.restore();
    }
}
/* unused harmony export default */



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Button{
    constructor(opts){
        this.label = opts.label;
        this.onSelect = opts.onSelect;
        this.width = opts.size/2 + opts.size*opts.label.length;
        this.height = opts.size*2;
        this.bgColor = opts.bgColor;
        this.textColor = opts.textColor;
        this.x = opts.x;
        this.y = opts.y;
        this.size = opts.size;
    }
    render(context){
        context.save();
        context.fillStyle = this.bgColor;
        context.fillRect(this.x,this.y,this.width,this.height);
        context.fillStyle = this.textColor;
        context.font = this.size+'px arial';
        context.fillText(this.label,this.x+this.size/2,this.y+this.size*1.2);
        context.restore();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Button;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Square_js__ = __webpack_require__(8);


class Grid{
    constructor(cols,rows,width,height){
        this.squares = [];
        this.rows = rows;
        this.cols = cols;
        this.width = width;
        this.height = height;
        for(var i=0; i < rows; i++){
            this.squares[i] = [];
            for(var j = 0; j < cols; j++){
                let w = this.width / cols;
                let h = this.height/rows;
                this.squares[i][j] = new __WEBPACK_IMPORTED_MODULE_0__Square_js__["a" /* default */](
                    this.width / cols * j,
                    this.height / rows * i,
                    w,h,
                    i,j
                );
            }
        }
    }
    neighbours(square){
        let neighbours = [
            this.squares[square.address.row-1] && this.squares[square.address.row-1][square.address.col],
            this.squares[square.address.row] && this.squares[square.address.row][square.address.col-1],
            this.squares[square.address.row] && this.squares[square.address.row][square.address.col+1],
            this.squares[square.address.row+1] && this.squares[square.address.row+1][square.address.col]
        ];

        let result = [];
        for(let neighbour of neighbours){
            if(neighbour) result.push(neighbour);
        }
        return result;
    }
    render(context, player){
        for(var cols of this.squares){
            for(var sq of cols) {
                sq.render(context, player.color);
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Grid;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Square{
    constructor(x,y,width,height,row,col){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = 'black';
        this.address = {row,col};
        this.clicks = 0;
        this.owner = undefined;
    }
    render(context,color){
        context.save();
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = 5;
        context.strokeRect(this.x,this.y,this.width,this.height);
        context.fillStyle = this.owner && this.owner.color || 'black';
        context.fillRect(this.x,this.y,this.width,this.height);
        context.closePath();
        context.fillStyle = 'white';
        context.font = '34px arial';
        context.fillText(this.clicks,this.x+this.width/2-10,this.y+this.height/2+10);
        context.restore();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Square;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entities_Ball_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Engine_Engine_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Engine_Mouse_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__GameStates_PlayingState_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Entities_Player_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__GameStates_ConfigState_js__ = __webpack_require__(2);






document.write('<canvas id="c" style="width:100%;height:100%;"></canvas>');

let canvas = document.getElementById('c');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
let engine = new __WEBPACK_IMPORTED_MODULE_1__Engine_Engine_js__["a" /* default */](canvas);
engine.gameState = new __WEBPACK_IMPORTED_MODULE_5__GameStates_ConfigState_js__["a" /* default */]();
engine.start();


/***/ })
/******/ ]);