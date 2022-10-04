import Figure from './figure.js';

export default class Queen extends Figure {
    constructor(initialX, initialY,figureIcon,color) {
        super(initialX, initialY,figureIcon,color);
    }

    getPossibleMoves(matrix) {
        let whiteMoves = [];
        let blackMoves = [];

        let moves = this.color === 'white' ? whiteMoves : blackMoves;

        const calculateMoves = function(self, matrix, x, y, moves, a, b, c, d) {
            let indexChecker = self.color === 'white' ? -1 : +1;

            // Moving diagonally
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
    
                let breakFlag = self.isValidMove(matrix, x, y, self, moves);

                if(breakFlag) {
                    break;
                }
            }

            // Moving horizontally
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
    
                let breakFlag = self.isValidMove(matrix, x, y, self, moves);

                if(breakFlag) {
                    break;
                }
            }
        };

        calculateMoves(this, matrix, this.currentX , this.currentY, moves, null, true, null, null);
        calculateMoves(this, matrix, this.currentX , this.currentY, moves, true, null, null, null);
        calculateMoves(this, matrix, this.currentX , this.currentY, moves, null, null, true, null);
        calculateMoves(this, matrix, this.currentX , this.currentY, moves, null, null, null, true);
        
        return this.calculateCoordinatesFromOrigin(matrix,moves);
    }
}