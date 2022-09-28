import Draw from './draw.js';

import constants from './constants.js';
import figures from './utils/figureToDraw.js';

let chessBoardElement = document.querySelector('#chess-board');
let chessBoardMatrix = [];

chessBoardElement.addEventListener('click', function(e) {
  handleFigureAnimation(constants._idleAnimation, e);
  getClickedFigureAsObject(e);
});

function handleFigureAnimation(animationClass, e) {
  var animation = document.querySelectorAll('.'+animationClass);

  if(animation) {
    animation.forEach(el => el.classList.remove(animationClass));
  }
  
  var isFigureClicked = e.target.parentNode.classList.contains('box');

  if(isFigureClicked) {
   e.target.classList.add(animationClass);
  }
}

function getClickedFigureAsObject(e) {
  let figure;

  if(e.target.parentNode.classList.contains('box')) {
    let id = e.target.parentNode.id.split('-');
    figure = chessBoardMatrix[id[0]][id[1]];
  }

  return figure;
}
Draw.drawChessBoard(chessBoardElement,chessBoardMatrix,figures.figuresToDraw);
console.log(chessBoardMatrix);