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

        if(this.currentX+indexChecker === 8) {
            console.log('special move');
            return;
        }

        // Is first move
        if((this.currentX === this.initialX && this.currentY === this.initialY)
            // First box is empty
            && matrix[this.currentX+indexChecker][this.currentY] === null
            // Second box is empty
            && matrix[this.currentX][indexChecker - indexChecker]) {
            moves.push({x: figureAllMoves[0].x,y: figureAllMoves[0].y});
        }

        // IF there is a figure in front of the pawn
        if(matrix[this.currentX+indexChecker][this.currentY] === null) {
            moves.push({x: figureAllMoves[1].x,y: figureAllMoves[1].y});
        }

        moves.push({x: figureAllMoves[2].x,y: figureAllMoves[2].y});
        moves.push({x: figureAllMoves[3].x,y: figureAllMoves[3].y});

        return this.calculateCoordinatesFromOrigin(matrix,moves);
    }

    calculateCoordinatesFromOrigin(matrix,coordinates) {
        let validCoordinates = [];

        for (let i = 0; i < coordinates.length; i++) {
            let x = this.currentX + coordinates[i].x;
            let y = this.currentY + coordinates[i].y;

            /*  
                1. Checking if the move is beyond the boundaries of the board
                2. Checking if the pawn can take other figure
                3. Else the move is valid
            */
            if(x < 0 || y < 0) {
                continue;
            } else if(this.currentY !== y){
                if(matrix[x][y]) {
                    validCoordinates.push({x: x, y: y});
                }
            } else {
                validCoordinates.push({x: x, y: y});
            }
        }

        return validCoordinates;
    }
}