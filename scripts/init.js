import constants from './constants.js';
import figures from './utils/figureToDraw.js';
import Game from './utils/game.js';

let chessBoardElement = document.querySelector('#chess-board');
let chessBoardMatrix = [];

// Drawing chess field along with all figures
Game.drawChessBoard(chessBoardElement,chessBoardMatrix,figures.figuresToDraw);

// Listening for figure click
chessBoardElement.addEventListener('click', function(e) {
  let figure = Game.getClickedFigureAsObject(e,chessBoardMatrix);
  Game.handleFigureAnimation(constants._idleAnimation, e);
  
  if(figure) {
    Game.changeBoxesColor(figure.getPossibleMoves(chessBoardMatrix));
  }
});