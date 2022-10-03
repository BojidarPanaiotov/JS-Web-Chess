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
                if(self.isValidCoordinates(x,y) 
                    && matrix[x][y] === null) {
                    moves.push({x: x, y: y});
                    // If there is a figure to get
                } else if(self.isValidCoordinates(x,y)  
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
}