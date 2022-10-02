import constants from './constants.js';
import King from '../figures/king.js';

function getClickedFigureAsObject(event, matrix) {
    let figure;
  
    if(event.target.parentNode.classList.contains(constants._boxClass)) {
      let id = event.target.parentNode.id.split(constants._splitSymbol);
      figure = matrix[id[0]][id[1]];
    }
  
    return figure;
}

function drawChessBoard(root,matrix,figures) {
  // Drawing the chess board
  for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
    let row = document.createElement('div');
    row.setAttribute('class','row');
  
    matrix.push([]);

    for (let boxIndex = 0; boxIndex < 8; boxIndex++) {
      let box = document.createElement('div');
      let iconPlaceholder = document.createElement('span');
  
      box.setAttribute('id', getCoordinatesAsString(rowIndex,boxIndex));
      iconPlaceholder.setAttribute('class','figure');
      box.appendChild(iconPlaceholder);

      if((boxIndex+rowIndex) % 2 === 1) {
        box.style.backgroundColor = constants._blackBoxColor;
      } else {
        box.style.backgroundColor = constants._whiteBoxColor;
      }
  
      box.setAttribute('class',constants._boxClass);
  
      row.appendChild(box);

      matrix[rowIndex][boxIndex] = null;
    }
  
    root.appendChild(row);
  }

  // Drawing the figures
  for (let i = 0; i < figures.length; i++) {
    let figure = figures[i];
    let selector = getCoordinatesAsString(figure.currentX, figure.currentY);

    document.getElementById(selector).firstChild.innerHTML = figure.figureIcon;
    matrix[figure.currentX][figure.currentY] = figure;
  }
}

function handleFigureAnimation(animationClass, e) {
  // Find idle figure animation
  let animation = document.querySelectorAll(constants._dot+animationClass);

  // If old figure has animation remove it
  if(animation) {
    animation.forEach(el => el.classList.remove(animationClass));
    normalizeChessBoard();
  }

  let isFigureClicked = e.target.parentNode.classList.contains(constants._boxClass);

  // Adding animation to the new figure
  if(isFigureClicked) {
    e.target.classList.add(animationClass);
  }
}

function changeBoxesColor(currentFigureColor, matrix,coordinates) {
  for (let i = 0; i < coordinates.length; i++) {
    let x = coordinates[i].x;
    let y = coordinates[i].y;
    let box = document.getElementById(x+constants._splitSymbol+y);

    if(matrix[x][y] === null) {
      box.style.backgroundColor = constants._canMoveBoxColor;
      box.classList.add(constants._canMoveClass);
    } else {
      if(matrix[x][y].color === currentFigureColor) {
        continue;
      }
      box.style.backgroundColor = constants._canGetBoxColor;
      box.firstChild.classList.add(constants._canGetClass);
    }
  }
}

function normalizeChessBoard() {
  for (let rowIndex = 0; rowIndex < 8; rowIndex++) {

    for (let boxIndex = 0; boxIndex < 8; boxIndex++) {
      let box = document.getElementById(getCoordinatesAsString(rowIndex, boxIndex));
      if((boxIndex+rowIndex) % 2 === 1) {
        box.style.backgroundColor = constants._blackBoxColor;
      } else {
        box.style.backgroundColor = constants._whiteBoxColor;
      }
      
      box.classList.remove(constants._canMoveClass);
    }
  }

  document.querySelectorAll(constants._dot + constants._canGetClass).forEach(box => {
    box.classList.remove(constants._canGetClass);
  });
}

function removeFigure(matrix, e, lastClickedFigure, timer) {
  // Getting figure as HTML element
  var htmlFigure = document.getElementById(e.target.parentNode.id);
  // Getting the figure as object
  var arrayIndex = e.target.parentNode.id.split(constants._splitSymbol);
  var figureObj = matrix[arrayIndex[0]][arrayIndex[1]];
  // Removing the figure from the matrix
  var endGame = figureObj.destroy(matrix);
  // Removing the figure from the DOM
  htmlFigure.firstChild.textContent = constants._emptyString;
  // Moving the other figure to this position in the matrix
  lastClickedFigure.handlePosition(matrix,{x: arrayIndex[0],y: arrayIndex[1]});
  // Moving it visually
  htmlFigure.firstChild.textContent = lastClickedFigure.figureIcon;
  // Removing the old position
  var a =document.getElementById(lastClickedFigure.currentX+constants._splitSymbol+lastClickedFigure.currentY);
  a.firstChild.textContent = constants._emptyString;
  a.firstChild.classList.remove(constants._idleAnimation);
  // Update figure coordinates
  lastClickedFigure.updateCoordinates(Number(arrayIndex[0]),Number(arrayIndex[1]));

  if(endGame === 'End Game') {
    stopGame(figureObj.color, timer);
  }
  normalizeChessBoard();
}

function moveFigure(matrix, e, lastClickedFigure) {
  // Box that the user clicked
  let clickedBoxCoordinates = e.target.id.split(constants._splitSymbol);
  // Box coordinates as object
  let coordinatesObject = {x: Number(clickedBoxCoordinates[0]), y: Number(clickedBoxCoordinates[1])};
  // Move the figure in the matrix
  lastClickedFigure.handlePosition(matrix,coordinatesObject);
  // Deleting old position on the chess board visually
  var oldBox = document.getElementById(getCoordinatesAsString(lastClickedFigure.currentX, lastClickedFigure.currentY)).firstChild;
  oldBox.textContent = constants._emptyString;
  oldBox.classList.remove(constants._idleAnimation);
  // Update figure coordinates
  lastClickedFigure.updateCoordinates(coordinatesObject.x, coordinatesObject.y);
  // Display the figure visually on the new coordinates
  document.getElementById(getCoordinatesAsString(lastClickedFigure.currentX, lastClickedFigure.currentY)).firstChild.textContent = lastClickedFigure.figureIcon;

  normalizeChessBoard();
}

function getCoordinatesAsString(x,y) {
  return x + constants._splitSymbol + y;
}

function startTimer() {
  return setInterval(function() {
    let timerElement = document.getElementById(constants._timer);
    let data = timerElement.textContent.split(constants._twoDots);
  
    let time = [
      // Hours
      Number(data[0]),
      // Minutes
      Number(data[1]),
      // Seconds
      Number(data[2])
    ];
  
    // Increasing seconds
    time[2] += 1;
  
    if(time[2] === 60) {
      // Resetting seconds
      time[2] = 0;
      // Adding one to the minute
      time[1] += 1;
    }
  
    if(time[1] === 60) {
      // Adding one to the hour
      time[0] += 1;
      // Resetting minutes
      time[1] = 0;
      // Resetting seconds
      time[2] = 0;
    }

    let timeAsString = [];

    time.map(el => {
      if(el.toString().length === 1) {
        timeAsString.push(constants._zero + el.toString());
      } else {
        timeAsString.push(el.toString());
      }
    });

    timerElement.textContent = timeAsString[0] + constants._twoDots + timeAsString[1] + constants._twoDots + timeAsString[2];
  }, 1000);
}

function stopGame(theFigureThatLostColor, timer) {
  let winner = ' White';
  let timePlayed = document.getElementById(constants._timer).textContent;
  if(theFigureThatLostColor === 'white') {
    winner = ' Black'
  }
  document.querySelector('.wrapper').classList.remove('d-none');
    // Get the modal
  var modal = document.getElementById("myModal");
  document.querySelector('.modal-message').textContent += winner + ' figures won!' + ' The game continued ' +timePlayed;
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  clearInterval(timer);
}

function getKing(matrix, color) {
  let king;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix.length; col++) {
      let currentFigure = matrix[row][col];
      
      if(currentFigure instanceof King && currentFigure.color === color) {
        king = currentFigure;
      }
    }
  }

  return king;
}

function handleTurns(colorTurn, lastClickedFigure) {
  return colorTurn !== lastClickedFigure.color;
}

function printWhichPlayerTurnIs(playerColor) {
  document.getElementById('move').textContent = playerColor + ' turn';
}

export default {
    getClickedFigureAsObject: getClickedFigureAsObject,
    drawChessBoard: drawChessBoard,
    handleFigureAnimation: handleFigureAnimation,
    changeBoxesColor: changeBoxesColor,
    normalizeChessBoard: normalizeChessBoard,
    removeFigure: removeFigure,
    moveFigure: moveFigure,
    getCoordinatesAsString: getCoordinatesAsString,
    startTimer: startTimer,
    stopGame: stopGame, 
    getKing: getKing,
    handleTurns: handleTurns,
    printWhichPlayerTurnIs: printWhichPlayerTurnIs
}