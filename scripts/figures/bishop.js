import Figure from './figure.js';

export default class Bishop extends Figure {
    constructor(initialX, initialY,figureIcon,color) {
        super(initialX, initialY,figureIcon,color);
    }

    getPossibleMoves(matrix) {
        let whiteMoves = [];
        let blackMoves = [];

        let moves = this.color === 'white' ? whiteMoves : blackMoves;

        // Creating for white figures first
        const calculateMoves = function(self, matrix, x, y, moves, a, b, c, d) {
            for (let i = 1; i < 8; i++) {
                if(a) {
                    x = self.currentX + i;
                    y = self.currentY + i;
                } else if(b) {
                    x = self.currentX - i;
                    y = self.currentY - i;
                } else if(c) {
                    x = self.currentX - i;
                    y = self.currentY + i;
                } else if(d) {
                    x = self.currentX + i;
                    y = self.currentY - i;
                }
    
                if(!self.isValidCoordinates(x,y) && matrix[x][y] === null) {
                    moves.push({x: x, y: y});
                } else if(!self.isValidCoordinates(x,y)  
                    && matrix[x][y]
                    && matrix[x][y].color !== self.color) {
                    moves.push({x: x, y: y});
                    break;
                } else {
                    break;
                }
            }
        };

        // Moving up left
        calculateMoves(this, matrix, this.currentX , this.currentY, moves, null, true, null, null);
        // Moving up right
        calculateMoves(this, matrix, this.currentX , this.currentY, moves, null, null, true, null);
        // Moving down right
        calculateMoves(this, matrix, this.currentX , this.currentY, moves, true, null, null, null);
        // Moving down left
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