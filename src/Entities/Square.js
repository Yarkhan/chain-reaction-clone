export default class Square{
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
