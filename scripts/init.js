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
    let clickedBoxCoordinates = e.target.id.split('-');
    let coordinatesObject = {x: Number(clickedBoxCoordinates[0]), y: Number(clickedBoxCoordinates[1])};
    lastClickedFigure.move(chessBoardMatrix,coordinatesObject);
    document.getElementById(lastClickedFigure.currentX + '-' + lastClickedFigure.currentY).textContent = '';
    lastClickedFigure.currentX = coordinatesObject.x;
    lastClickedFigure.currentY = coordinatesObject.y;
    document.getElementById(lastClickedFigure.currentX + '-' + lastClickedFigure.currentY).firstChild.textContent = lastClickedFigure.figureIcon;
    Game.returnBorderColors();
    return;
  } else if(canGet) {
    console.log('can get');
    return;
  }

  let figure = Game.getClickedFigureAsObject(e,chessBoardMatrix);
  lastClickedFigure = figure;

  Game.handleFigureAnimation(constants._idleAnimation, e);
  
  if(figure) {
    Game.changeBoxesColor(figure.color, chessBoardMatrix, figure.getPossibleMoves(chessBoardMatrix));
  }
});