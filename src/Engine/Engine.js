import Mouse from './Mouse.js';
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
        this.mouse = new Mouse(this.canvas);
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

export default Engine;
