import constants from './utils/constants.js';
import figures from './utils/figureToDraw.js';
import Game from './utils/game.js';

import King from './figures/king.js';

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

  let whiteKing;
  let blackKing;;
  
  // Get the two kings
  for (let row = 0; row < chessBoardMatrix.length; row++) {
    for (let col = 0; col < chessBoardMatrix.length; col++) {
      let currentFigure = chessBoardMatrix[row][col];
      
      if(currentFigure === null) {
        continue;
      } else if(currentFigure instanceof King && currentFigure.color === constants._black) {
        blackKing = currentFigure;
      } else if(currentFigure instanceof King && currentFigure.color === constants._white) {
        whiteKing = currentFigure;
      }
    }
  }
  console.log(whiteKing.isCheck(chessBoardMatrix));
  console.log(blackKing.isCheck(chessBoardMatrix));
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
