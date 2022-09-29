import constants from './constants.js';
import figures from './utils/figureToDraw.js';
import Game from './utils/game.js';

let chessBoardElement = document.querySelector('#chess-board');
let chessBoardMatrix = [];
let lastClickedFigure;

// Drawing chess field along with all figures
Game.drawChessBoard(chessBoardElement,chessBoardMatrix,figures.figuresToDraw);

// Listening for figure click
chessBoardElement.addEventListener('click', function(e) {
  let canMove = e.target.classList.contains('can-move');
  let canGet = e.target.classList.contains('can-get');

  if(canMove) {
    Game.moveFigure(chessBoardMatrix, e, lastClickedFigure)
  } else if(canGet) {
    Game.removeFigure(chessBoardMatrix, e, lastClickedFigure);
  }

  if(canMove || canGet) {
      console.log('D:MATRIX',chessBoardMatrix);
    return;
  }

  let figure = Game.getClickedFigureAsObject(e,chessBoardMatrix);
  lastClickedFigure = figure;

  Game.handleFigureAnimation(constants._idleAnimation, e);
  
  if(figure) {
    Game.changeBoxesColor(figure.color, chessBoardMatrix, figure.getPossibleMoves(chessBoardMatrix));
  }

  // console.log('D:MATRIX',chessBoardMatrix);
});