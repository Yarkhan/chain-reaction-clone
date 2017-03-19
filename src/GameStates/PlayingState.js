import Grid from '../Entities/Grid.js';
import Player from '../Entities/Player.js';
import ConfigState from './ConfigState.js';
export default class PlayingState{
    constructor(opts){
        this.players = [];
        this.rows = opts.rows;
        this.cols = opts.cols;
        for(let i=0; i < opts.players; i++){
            let player = new Player;
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
        this.grid = new Grid(this.cols, this.rows, this.$game.canvas.width, this.$game.canvas.height);
    }
    gameOver(msg){
        this.$game.gameState = new ConfigState(msg);
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
