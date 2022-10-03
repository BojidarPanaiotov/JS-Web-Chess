import constants from './utils/constants.js';
import figures from './utils/figureToDraw.js';
import Game from './utils/game.js';

let chessBoardElement = document.getElementById(constants._chessBoard);
let matrix = [];
let lastClickedFigure;
let whichColorTurnIs = constants._white;
let timer = Game.startTimer();

// Drawing chess field along with all figures
Game.drawChessBoard(chessBoardElement,matrix,figures.figuresToDraw);

// Listening for figure click
chessBoardElement.addEventListener('click', function(e) {
  let canMove = e.target.classList.contains(constants._canMoveClass);
  let canGet = e.target.classList.contains(constants._canGetClass);

  let whiteKing = Game.getKing(matrix, constants._white);
  let blackKing = Game.getKing(matrix, constants._black);

  // Means that the player is moving his figure or getting enemy one
  if(canMove) {
    Game.moveFigure(matrix, e, lastClickedFigure);
  } else if(canGet) {
    Game.removeFigure(matrix, e, lastClickedFigure, timer);
  }
  
  if(canMove || canGet) {
    whichColorTurnIs = whichColorTurnIs === constants._white ? constants._black : constants._white;
    Game.printPlayerTurn(whichColorTurnIs);
    return;
  }

  // Means that player just clicked a figure
  let figure = Game.getClickedFigureAsObject(e,matrix);
  lastClickedFigure = figure;

  // Checking the turn
  let turn = Game.handleTurns(whichColorTurnIs, lastClickedFigure);

  if(turn) {
    return;
  }
  Game.handleFigureAnimation(constants._idleAnimation, e);
  
  if(figure) {
    Game.changeBoxesColor(figure.color, matrix, figure.getPossibleMoves(matrix));
  }

});
