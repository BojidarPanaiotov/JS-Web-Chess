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

            moves.push({x: x, y: y});

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

            moves.push({x: x, y: y});
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

    isCheck(matrix) {
        // Get all figures from the opposite color
        let figures = [];
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix.length; col++) {
                let currentFigure = matrix[row][col];

                if(currentFigure === null) {
                    continue;
                } else if(currentFigure.color !== this.color) {
                    figures.push(currentFigure);
                }
            }
        }

        // Check if one of those figure can get the King
        let canGetTheKing = false;
        for (let i = 0; i < figures.length; i++) {
            let figure = figures[i];
            let moves = figure.getPossibleMoves(matrix);

            for (let j = 0; j < moves.length; j++) {
                let move = moves[j];

                if(move.x === this.currentX && move.y === this.currentY) {
                    canGetTheKing = true;
                    break;
                }
                
            }
        }

        return canGetTheKing;
    }
}