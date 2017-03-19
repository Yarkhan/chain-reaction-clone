export default class Button{
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
