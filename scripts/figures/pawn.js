import Figure from './figure.js';

export default class Pawn extends Figure {
    constructor(initialX, initialY,figureIcon,color) {
        super(initialX, initialY,figureIcon,color);
        this.initialX = initialX;
        this.initialY = initialY;
    }

    getPossibleMoves(matrix) {
        let moves = [];

        let whiteMoves = [{x: -2,y: 0},{x: -1,y: 0},{x: -1,y: -1},{x: -1,y: +1}];
        let blackMoves = [{x: +2,y: 0},{x: +1,y: 0},{x: +1,y: +1},{x: +1,y: -1}];

        let figureAllMoves = this.color === 'white' ? whiteMoves : blackMoves;
        let indexChecker = this.color === 'white' ? -1 : +1;

        if(this.currentX + indexChecker === 8 || this.currentX + indexChecker === -1) {
            console.log('special move');
            // Return empty moves array
            return moves;
        }

        // Is first move
        if((this.currentX === this.initialX && this.currentY === this.initialY)
            // First box is empty
            && matrix[this.currentX+indexChecker][this.currentY] === null
            // Second box is empty
            && matrix[this.currentX+indexChecker+indexChecker][this.currentY] === null) {
            moves.push({x: this.currentX + figureAllMoves[0].x,y: this.currentY + figureAllMoves[0].y});
        }

        // IF there is a figure in front of the pawn
        if(matrix[this.currentX+indexChecker][this.currentY] === null) {
            moves.push({x: this.currentX + figureAllMoves[1].x,y: this.currentY + figureAllMoves[1].y});
        }
        // If there is a figure diagonally on left
        if(matrix[this.currentX + figureAllMoves[2].x][this.currentY + figureAllMoves[2].y]) {
            moves.push({x: this.currentX + figureAllMoves[2].x,y: this.currentY + figureAllMoves[2].y});
        }

        // If there is a figure diagonally on right
        if(matrix[this.currentX + figureAllMoves[3].x][this.currentY + figureAllMoves[3].y]) {
            moves.push({x: this.currentX + figureAllMoves[3].x,y: this.currentY + figureAllMoves[3].y});
        }

        return this.calculateCoordinatesFromOrigin(matrix,moves);
    }
}