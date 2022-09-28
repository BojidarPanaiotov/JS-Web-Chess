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
        }
    
        box.setAttribute('class','box');
    
        row.appendChild(box);
  
        matrix[rowIndex][boxIndex] = null;
      }
    
      root.appendChild(row);
    }

    drawFigures(figures,matrix);
}

function drawFigures(figures, matrix) {
    for (let i = 0; i < figures.length; i++) {
      let figure = figures[i];
      let selector = figure.initialX + '-' + figure.initialY;

      document.getElementById(selector).firstChild.innerHTML = figure.figureIcon;
      matrix[figure.initialX][figure.initialY] = figure;
    }
}
export default {
    drawChessBoard: drawChessBoard
}