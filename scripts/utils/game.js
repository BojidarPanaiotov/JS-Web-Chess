function getClickedFigureAsObject(event, matrix) {
    let figure;
  
    if(event.target.parentNode.classList.contains('box')) {
      let id = event.target.parentNode.id.split('-');
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
  
      box.setAttribute('id', rowIndex + '-' + boxIndex);
      iconPlaceholder.setAttribute('class','figure');
      box.appendChild(iconPlaceholder);

      if((boxIndex+rowIndex) % 2 === 1) {
        box.style.backgroundColor = '#E97451';
      } else {
        box.style.backgroundColor = '#FFFFFF';
      }
  
      box.setAttribute('class','box');
  
      row.appendChild(box);

      matrix[rowIndex][boxIndex] = null;
    }
  
    root.appendChild(row);
  }

  // Drawing the figures
  for (let i = 0; i < figures.length; i++) {
    let figure = figures[i];
    let selector = figure.initialX + '-' + figure.initialY;

    document.getElementById(selector).firstChild.innerHTML = figure.figureIcon;
    matrix[figure.initialX][figure.initialY] = figure;
  }
}

function handleFigureAnimation(animationClass, e) {
  // Find idle figure animation
  let animation = document.querySelectorAll('.'+animationClass);

  // If old figure has animation remove it
  if(animation) {
    animation.forEach(el => el.classList.remove(animationClass));
    normalizeChessBoard();
  }

  let isFigureClicked = e.target.parentNode.classList.contains('box');

  // Adding animation to the new figure
  if(isFigureClicked) {
    e.target.classList.add(animationClass);
  }
}

function changeBoxesColor(currentFigureColor, matrix,coordinates) {
  for (let i = 0; i < coordinates.length; i++) {
    let x = coordinates[i].x;
    let y = coordinates[i].y;
    let box = document.getElementById(x+'-'+y);

    if(matrix[x][y] === null) {
      box.style.backgroundColor = '#4CBB17';
      box.classList.add('can-move');
    } else {
      if(matrix[x][y].color === currentFigureColor) {
        continue;
      }
      box.style.backgroundColor = 'red';
      box.firstChild.classList.add('can-get');
    }
  }
}

function normalizeChessBoard() {
  // Rows
  for (let rowIndex = 0; rowIndex < 8; rowIndex++) {

    // Columns
    for (let boxIndex = 0; boxIndex < 8; boxIndex++) {
      let box = document.getElementById(rowIndex + '-' + boxIndex);
      if((boxIndex+rowIndex) % 2 === 1) {
        box.style.backgroundColor = '#E97451';
      } else {
        box.style.backgroundColor = '#FFFFFF';
      }
      
      box.classList.remove('can-move');
    }
  }
}

function removeFigure(matrix, e, lastClickedFigure) {
  // Getting figure as HTML element
  var htmlFigure = document.getElementById(e.target.parentNode.id);
  // Getting the figure as object
  var arrayIndex = e.target.parentNode.id.split('-');
  var figureObj = matrix[arrayIndex[0]][arrayIndex[1]];
  // Removing the figure from the matrix
  figureObj.destroy(matrix);
  // Removing the figure from the DOM
  htmlFigure.firstChild.textContent = '';
  // Moving the other figure to this position in the matrix
  lastClickedFigure.renderPosition(matrix,{x: arrayIndex[0],y: arrayIndex[1]});
  // Moving it visually
  htmlFigure.firstChild.textContent = lastClickedFigure.figureIcon;
  // TODO: Removing the old position

  normalizeChessBoard();
}

function moveFigure(matrix, e, lastClickedFigure) {
  // Box that the user clicked
  let clickedBoxCoordinates = e.target.id.split('-');
  // Box coordinates as object
  let coordinatesObject = {x: Number(clickedBoxCoordinates[0]), y: Number(clickedBoxCoordinates[1])};
  // Move the figure in the matrix
  lastClickedFigure.renderPosition(matrix,coordinatesObject);
  // Deleting old position on the chess board visually
  document.getElementById(lastClickedFigure.currentX + '-' + lastClickedFigure.currentY).textContent = '';
  // Update figure coordinates
  lastClickedFigure.currentX = coordinatesObject.x;
  lastClickedFigure.currentY = coordinatesObject.y;
  // Display the figure visually on the new coordinates
  document.getElementById(lastClickedFigure.currentX + '-' + lastClickedFigure.currentY).firstChild.textContent = lastClickedFigure.figureIcon;

  normalizeChessBoard();
}

export default {
    getClickedFigureAsObject: getClickedFigureAsObject,
    drawChessBoard: drawChessBoard,
    handleFigureAnimation: handleFigureAnimation,
    changeBoxesColor: changeBoxesColor,
    normalizeChessBoard: normalizeChessBoard,
    removeFigure: removeFigure,
    moveFigure: moveFigure
}