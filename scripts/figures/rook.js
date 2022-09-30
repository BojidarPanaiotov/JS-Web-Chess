import Figure from './figure.js';

export default class Rook extends Figure {
    constructor(initialX, initialY,figureIcon,color) {
        super(initialX, initialY,figureIcon,color);
    }

    getPossibleMoves(matrix) {
        let whiteMoves = [];
        let blackMoves = [];

        let moves = this.color === 'white' ? whiteMoves : blackMoves;
        let indexChecker = this.color === 'white' ? -1 : +1;

        // Moving forward
        for (let i = 1; i < 8; i++) {
            let helperIndex = indexChecker * i;
            
            // Can move to this box
            if(!this.isValidCoordinates(this.currentX+helperIndex,this.currentY) 
                && matrix[this.currentX+helperIndex][this.currentY] === null) {
                moves.push({x: this.currentX+helperIndex, y: this.currentY});
                // If there is a figure to get
            } else if(!this.isValidCoordinates(this.currentX+helperIndex,this.currentY)  
                && matrix[this.currentX+helperIndex][this.currentY]
                && matrix[this.currentX+helperIndex][this.currentY].color !== this.color){
                moves.push({x: this.currentX+helperIndex, y: this.currentY});
                break;
                // Else break because the figure reached max range
            } else {
                break;
            }
        }

        return this.calculateCoordinatesFromOrigin(matrix,moves);
    }

    calculateCoordinatesFromOrigin(matrix,coordinates) {
        let validCoordinates = [];

        for (let i = 0; i < coordinates.length; i++) {
          let x = coordinates[i].x;
          let y = coordinates[i].y;

          //  1. Checking if the move is beyond the boundaries of the board
          if(this.isValidCoordinates(x,y)) {
              continue;
            //  2. Checking if the current figure can take other figure
          } else if(matrix[x][y]){
            validCoordinates.push({x: x, y: y});
            continue;
            //  3. Else means that the box is empty
          } else {
              validCoordinates.push({x: x, y: y});
          }
        }
    
        return validCoordinates;
      }
}