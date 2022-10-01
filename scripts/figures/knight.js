import Figure from './figure.js';

export default class Knight extends Figure {
    constructor(initialX, initialY,figureIcon,color) {
        super(initialX, initialY,figureIcon,color);
    }

    getPossibleMoves(matrix) {
        let moves = [
            {x: -2,y: +1},{x: -2,y: +1},{x: -2,y: -1},{x: -2,y: +1},
            {x: +2,y: -1},{x: +2,y: -1},{x: +2,y: +1},{x: +2,y: -1},
            {x: -1,y: +2},{x: -1,y: +2},{x: -1,y: -2},{x: -1,y: +2},
            {x: +1,y: -2},{x: +1,y: -2},{x: +1,y: +2},{x: +1,y: -2}
        ];
        
        let possibleMoves = [];

        for (let i = 1; i < moves.length; i++) {
            possibleMoves.push({x: this.currentX + moves[i].x,y: this.currentY + moves[i].y})
            
        }

        return this.calculateCoordinatesFromOrigin(matrix, possibleMoves);
    }
}