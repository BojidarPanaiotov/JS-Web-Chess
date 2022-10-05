import constants from './utils/constants.js';
import figures from './utils/figureToDraw.js';
import Game from './utils/game.js';

let chessBoardElement = document.getElementById(constants._chessBoard);
let matrix = [];
let lastClickedFigure;
let whichColorTurnIs = constants._white;
let timer = Game.Timer.startTimer();
const removedFigures = {
  white: [],
  black: []
};

// Drawing chess field along with all figures
Game.Draw.drawChessBoard(chessBoardElement,matrix,figures.figuresToDraw);

// Listening for figure click
chessBoardElement.addEventListener('click', function(e) {
  let canMove = e.target.classList.contains(constants._canMoveClass);
  let canGet = e.target.classList.contains(constants._canGetClass);

  // Means that the player is moving his figure or getting enemy one
  if(canMove) {
    Game.Move.moveFigure(matrix, e, lastClickedFigure);
  } else if(canGet) {
    Game.Move.removeFigure(matrix, e, lastClickedFigure, timer, removedFigures);
    Game.Draw.handleRemovedFigures(removedFigures);
  }
  
  if(canMove || canGet) {
    whichColorTurnIs = whichColorTurnIs === constants._white ? constants._black : constants._white;
    Game.Turn.printPlayerTurn(whichColorTurnIs);
    return;
  }

  // Trying to get the clicked figure
  let figure = Game.Utils.getClickedFigureAsObject(e,matrix);

  // If the player clicked an actual figure and not something else
  if(figure) {
    lastClickedFigure = figure;
  }

  // Checking the turn
  let turn = Game.Turn.handleTurns(whichColorTurnIs, lastClickedFigure);

  if(turn) {
    return;
  }

  Game.Draw.animateFigure(constants._idleAnimation, e);

  if(figure) {
    Game.Draw.changeBoxesColor(figure.color, matrix, figure.getPossibleMoves(matrix));
  }
});
