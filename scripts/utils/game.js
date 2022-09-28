function getClickedFigureAsObject(event, matrix) {
    let figure;
  
    if(event.target.parentNode.classList.contains('box')) {
      let id = event.target.parentNode.id.split('-');
      figure = matrix[id[0]][id[1]];
    }
  
    return figure;
}

function drawChessBoard(root,matrix,figures) {
  // Rows
  for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
    let row = document.createElement('div');
    row.setAttribute('class','row');
  
    matrix.push([]);

    // Columns
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

  drawFigures(figures,matrix);
}

// Function which is called when the board is drawn
function drawFigures(figures, matrix) {
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
  }

  let isFigureClicked = e.target.parentNode.classList.contains('box');

  // Adding animation to the new figure
  if(isFigureClicked) {
    e.target.classList.add(animationClass);
  }
}

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
export default {
    getClickedFigureAsObject: getClickedFigureAsObject,
    drawChessBoard: drawChessBoard,
    handleFigureAnimation: handleFigureAnimation,
    changeBoxesColor: changeBoxesColor
}