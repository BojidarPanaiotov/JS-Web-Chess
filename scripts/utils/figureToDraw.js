import Pawn from '../pawn.js';
import Rook from '../rook.js';

import constants from '../constants.js';

let figuresToDraw = [
    // Black Figures
    new Pawn(1,0,'♟',constants._black),
    new Pawn(1,1,'♟',constants._black),
    new Pawn(1,2,'♟',constants._black),
    new Pawn(1,3,'♟',constants._black),
    new Pawn(1,4,'♟',constants._black),
    new Pawn(1,5,'♟',constants._black),
    new Pawn(1,6,'♟',constants._black),
    new Pawn(1,7,'♟',constants._black),
    new Rook(0,0,'♜',constants._black),
    new Rook(0,7,'♜',constants._black),
    // White Figures
    new Pawn(6,0,'♙',constants._white),
    new Pawn(6,1,'♙',constants._white),
    new Pawn(6,2,'♙',constants._white),
    new Pawn(6,3,'♙',constants._white),
    new Pawn(6,4,'♙',constants._white),
    new Pawn(6,5,'♙',constants._white),
    new Pawn(6,6,'♙',constants._white),
    new Pawn(6,7,'♙',constants._white),
    new Rook(7,0,'♖',constants._white),
    new Rook(7,7,'♖',constants._white),
];

export default {
    figuresToDraw: figuresToDraw
}