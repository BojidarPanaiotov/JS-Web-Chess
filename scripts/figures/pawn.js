import Figure from './figure.js';

export default class Pawn extends Figure {
    constructor(initialX, initialY,figureIcon,color) {
        super(initialX, initialY,figureIcon,color);
    }

    move() {
        
    }

    isFirstMove() {
        return this.initialX === this.currentX && this.initialY === this.currentY;
    }

    getPossibleMoves(matrix) {
        let moves = [];

        if(this.color === 'white') {
            if(this.isFirstMove()) {
                moves.push({x: -2,y: 0});
            }
            moves.push({x: -1,y: 0});
            moves.push({x: -1,y: -1});
            moves.push({x: -1,y: +1});
        } else {
            if(this.isFirstMove()) {
                moves.push({x: +2,y: 0});
            }
            moves.push({x: +1,y: 0});
            moves.push({x: +1,y: +1});
            moves.push({x: +1,y: -1});
        }
        let validCoordinates = this.calculateCoordinatesFromOrigin(matrix,moves);

        return validCoordinates;
    }

    calculateCoordinatesFromOrigin(matrix,coordinates) {
        var validCoordinates = [];

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