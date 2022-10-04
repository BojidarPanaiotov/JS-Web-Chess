import Pawn from '../figures/pawn.js';
import Rook from '../figures/rook.js';
import Bishop from '../figures/bishop.js';
import Knight from '../figures/knight.js';
import Queen from '../figures/queen.js';
import King from '../figures/king.js';

import constants from './constants.js';

let figuresToDraw = [
    // Black Figures
        // Pawns
    new Pawn(1,0,constants._blackPawn,constants._black),
    new Pawn(1,1,constants._blackPawn,constants._black),
    new Pawn(1,2,constants._blackPawn,constants._black),
    new Pawn(1,3,constants._blackPawn,constants._black),
    new Pawn(1,4,constants._blackPawn,constants._black),
    new Pawn(1,5,constants._blackPawn,constants._black),
    new Pawn(1,6,constants._blackPawn,constants._black),
    new Pawn(1,7,constants._blackPawn,constants._black),
        // Rooks
    new Rook(0,0,constants._blackRook,constants._black),
    new Rook(0,7,constants._blackRook,constants._black),
        // Bishops
    new Bishop(0,1,constants._blackBishop,constants._black),
    new Bishop(0,6,constants._blackBishop,constants._black),
        // Knights
    new Knight(0,2,constants._blackKnight,constants._black),
    new Knight(0,5,constants._blackKnight,constants._black),
        // Queen
    new Queen(0,3,constants._blackQueen,constants._black),
        // King
    new King(0,4, constants._blackKing,constants._black),

    // White Figures
        // Pawns
    new Pawn(6,0,constants._whitePawn,constants._white),
    new Pawn(6,1,constants._whitePawn,constants._white),
    new Pawn(6,2,constants._whitePawn,constants._white),
    new Pawn(6,3,constants._whitePawn,constants._white),
    new Pawn(6,4,constants._whitePawn,constants._white),
    new Pawn(6,5,constants._whitePawn,constants._white),
    new Pawn(6,6,constants._whitePawn,constants._white),
    new Pawn(6,7,constants._whitePawn,constants._white),
        // Rooks
    new Rook(7,0,constants._whiteRook,constants._white),
    new Rook(7,7,constants._whiteRook,constants._white),
        // Bishops
    new Bishop(7,1,constants._whiteBishop,constants._white),
    new Bishop(7,6,constants._whiteBishop,constants._white),
        // Knights
    new Knight(7,2,constants._whiteKnight,constants._white),
    new Knight(7,5,constants._whiteKnight,constants._white),
        // Queen
    new Queen(7,3,constants._whiteQueen,constants._white),
        // King
    new King(7,4, constants._whiteKing,constants._white)
];

export default {
    figuresToDraw
}