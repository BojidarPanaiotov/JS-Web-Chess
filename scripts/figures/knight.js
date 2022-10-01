import Figure from './figure.js';

export default class Knight extends Figure {
    constructor(initialX, initialY,figureIcon,color) {
        super(initialX, initialY,figureIcon,color);
    }

    getPossibleMoves(matrix) {
        let whiteMoves = [{x: -2,y: +1},{x: -2,y: +1},{x: -2,y: -1},{x: -2,y: +1}];
        let blackMoves = [{x: +2,y: 0},{x: +1,y: 0},{x: +1,y: +1},{x: +1,y: -1}];

        let moves = this.color === 'white' ? whiteMoves : blackMoves;
        let indexChecker = this.color === 'white' ? -1 : +1;
        
        for (let i = 1; i < 4; i++) {
            moves.push({x: this.currentX + moves[i].x,y: this.currentY + moves[i].y})
            
        }
        return this.calculateCoordinatesFromOrigin(matrix,moves);
    }
}