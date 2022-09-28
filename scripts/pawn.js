import Figure from './figure.js';

export default class Pawn extends Figure {
    constructor(x,y,figureIcon) {
        super(x, y, figureIcon);
    }

    move() {
        console.log('moving');
    }

    destroy() {
        console.log('destroying');
    }
}