import constants from './utils/constants.js';
import figures from './utils/figureToDraw.js';
import Game from './utils/game.js';

let chessBoardElement = document.getElementById(constants._chessBoard);
let chessBoardMatrix = [];
let lastClickedFigure;
let timer = Game.startTimer();

// Drawing chess field along with all figures
Game.drawChessBoard(chessBoardElement,chessBoardMatrix,figures.figuresToDraw);

// Listening for figure click
chessBoardElement.addEventListener('click', function(e) {
  
  let canMove = e.target.classList.contains(constants._canMoveClass);
  let canGet = e.target.classList.contains(constants._canGetClass);

  let whiteKing = Game.getKing(chessBoardMatrix, constants._white);
  let blackKing = Game.getKing(chessBoardMatrix, constants._black);
  
  console.log('Can you get the white king',whiteKing.isCheck(chessBoardMatrix));
  console.log('Can you get the black king',blackKing.isCheck(chessBoardMatrix));

  if(canMove) {
    Game.moveFigure(chessBoardMatrix, e, lastClickedFigure);
  } else if(canGet) {
    Game.removeFigure(chessBoardMatrix, e, lastClickedFigure, timer);
  }

  if(canMove || canGet) {
    return;
  }

  let figure = Game.getClickedFigureAsObject(e,chessBoardMatrix);
  lastClickedFigure = figure;

  Game.handleFigureAnimation(constants._idleAnimation, e);
  
  if(figure) {
    Game.changeBoxesColor(figure.color, chessBoardMatrix, figure.getPossibleMoves(chessBoardMatrix));
  }
});
