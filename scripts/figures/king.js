import Figure from './figure.js';

export default class King extends Figure {
    constructor(initialX, initialY,figureIcon,color) {
        super(initialX, initialY,figureIcon,color);
    }

    getPossibleMoves(matrix) {
        let whiteMoves = [];
        let blackMoves = [];

        let moves = this.color === 'white' ? whiteMoves : blackMoves;

        const calculateMoves = function(self, matrix, x, y, moves, a, b, c, d) {
            let indexChecker = self.color === 'white' ? -1 : +1;
            let helperIndex = indexChecker * 1;

            // Moving diagonally
            if(a) {
                x = self.currentX - helperIndex;
            } else if(b) {
                x = self.currentX + helperIndex;
            } else if(c) {
                y = self.currentY - helperIndex;
            } else if(d) {
                y = self.currentY + helperIndex;
            }

            if(!self.isValidCoordinates(x,y) && matrix[x][y] === null) {
                moves.push({x: x, y: y});
            } else if(!self.isValidCoordinates(x,y)  
                && matrix[x][y]
                && matrix[x][y].color !== self.color){
                moves.push({x: x, y: y});
            }

            // Moving horizontally
            if(a) {
                x = self.currentX + helperIndex;
                y = self.currentY + helperIndex;
            } else if(b) {
                x = self.currentX - helperIndex;
                y = self.currentY - helperIndex;
            } else if(c) {
                x = self.currentX - helperIndex;
                y = self.currentY + helperIndex;
            } else if(d) {
                x = self.currentX + helperIndex;
                y = self.currentY - helperIndex;
            }

            if(!self.isValidCoordinates(x,y) && matrix[x][y] === null) {
                moves.push({x: x, y: y});
            } else if(!self.isValidCoordinates(x,y)  
                && matrix[x][y]
                && matrix[x][y].color !== self.color) {
                moves.push({x: x, y: y});
            }
        };

        calculateMoves(this, matrix, this.currentX , this.currentY, moves, null, true, null, null);
        calculateMoves(this, matrix, this.currentX , this.currentY, moves, true, null, null, null);
        calculateMoves(this, matrix, this.currentX , this.currentY, moves, null, null, true, null);
        calculateMoves(this, matrix, this.currentX , this.currentY, moves, null, null, null, true);
        
        return this.calculateCoordinatesFromOrigin(matrix,moves);
    }

    destroy(matrix) {
        matrix[this.currentX][this.currentY] = null;
        
        return 'End Game';
    }
}