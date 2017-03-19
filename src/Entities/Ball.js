export default class Ball{
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
