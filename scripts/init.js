import Draw from './draw.js';

import constants from './constants.js';
import figures from './utils/figureToDraw.js';

let chessBoardElement = document.querySelector('#chess-board');
let chessBoardMatrix = [];

chessBoardElement.addEventListener('click', function(e) {
  let oldColorsCoordinates;
  let figure = getClickedFigureAsObject(e);

  handleFigureAnimation(constants._idleAnimation, e, oldColorsCoordinates);
  oldColorsCoordinates = changeBoxesColor(figure.getPossibleMoves(chessBoardMatrix));
});

function handleFigureAnimation(animationClass, e, oldColorsCoordinates) {
  // Find idle figure animation
  let animation = document.querySelectorAll('.'+animationClass);

  // If exists remove it
  if(animation) {
    animation.forEach(el => el.classList.remove(animationClass));
  }

  let isFigureClicked = e.target.parentNode.classList.contains('box');

  // If figure is clicked add idle animation
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

//ONLY FOR TESTING
function changeBoxesColor(coordinates) {
  var oldColorsCoordinates = [];

  for (let i = 0; i < coordinates.length; i++) {
    var x = coordinates[i].x;
    var y = coordinates[i].y;
    var box = document.getElementById(x+'-'+y);
    oldColorsCoordinates.push({x:x,y:y,color: box.style.backgroundColor});
    box.style.backgroundColor= '#4CBB17';
  }

  return oldColorsCoordinates;
}
Draw.drawChessBoard(chessBoardElement,chessBoardMatrix,figures.figuresToDraw);
console.log(chessBoardMatrix);