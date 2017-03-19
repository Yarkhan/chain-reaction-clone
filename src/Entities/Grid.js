import Square from './Square.js';

export default class Grid{
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
                this.squares[i][j] = new Square(
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
