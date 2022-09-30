import Figure from './figure.js';

export default class Rook extends Figure {
    constructor(initialX, initialY,figureIcon,color) {
        super(initialX, initialY,figureIcon,color);
    }

    getPossibleMoves(matrix) {
        let whiteMoves = [];
        let blackMoves = [];

        let moves = this.color === 'white' ? whiteMoves : blackMoves;

        const calculateMoves = function(self, matrix, x, y, moves, a, b, c, d) {
            let indexChecker = self.color === 'white' ? -1 : +1;

            for (let i = 1; i < 8; i++) {
                let helperIndex = indexChecker * i;
                if(a) {
                    x = self.currentX - helperIndex;
                } else if(b) {
                    x = self.currentX + helperIndex;
                } else if(c) {
                    y = self.currentY - helperIndex;
                } else if(d) {
                    y = self.currentY + helperIndex;
                }
    
                // Can move to this box
                if(!self.isValidCoordinates(x,y) 
                    && matrix[x][y] === null) {
                    moves.push({x: x, y: y});
                    // If there is a figure to get
                } else if(!self.isValidCoordinates(x,y)  
                    && matrix[x][y]
                    && matrix[x][y].color !== self.color){
                    moves.push({x: x, y: y});
                    break;
                    // Else break because the figure reached max range
                } else {
                    break;
                }
            }
        };

        // Moving forward
        calculateMoves(this, matrix, this.currentX , this.currentY, moves, null, true, null, null);
        // Moving backward
        calculateMoves(this, matrix, this.currentX , this.currentY, moves, true, null, null, null);
        // Moving right
        calculateMoves(this, matrix, this.currentX , this.currentY, moves, null, null, true, null);
        //Moving left
        calculateMoves(this, matrix, this.currentX , this.currentY, moves, null, null, null, true);
        
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