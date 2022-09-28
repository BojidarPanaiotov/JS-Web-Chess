import Draw from './draw.js';

import constants from './constants.js';
import figures from './utils/figureToDraw.js';

let chessBoardElement = document.querySelector('#chess-board');
let chessBoardMatrix = [];

chessBoardElement.addEventListener('click', function(e) {
  handleFigureAnimation(constants._idleAnimation, e)
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
Draw.drawChessBoard(chessBoardElement,chessBoardMatrix,figures.figuresToDraw);