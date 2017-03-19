
let index = 0;
let colors = ['blue','red','green','pink','yellow'];

export default class Player{
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
