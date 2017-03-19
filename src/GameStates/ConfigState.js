import Button from '../Entities/Button.js'
import PlayingState from './PlayingState.js';
export default class ConfigState{
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
                this.playerButtons.push(new Button({
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
        let playingState = new PlayingState({
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
