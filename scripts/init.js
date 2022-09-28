import Pawn from './pawn.js';
import constants from './constants.js';


let chessBoardElement = document.querySelector('#chess-board');
let chessBoardMatrix = [];

function drawChessBoard() {
  // Rows
  for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
    let row = document.createElement('div');
    row.setAttribute('class','row');
  
    chessBoardMatrix.push([]);

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

      chessBoardMatrix[rowIndex][boxIndex] = null;
    }
  
    chessBoardElement.appendChild(row);
  }
}

function drawFigures() {
  for (let i = 0; i < 8; i++) {
    let blackPawn = new Pawn(1,i,'♟',constants._black);
    document.getElementById(1 + '-' + i).firstChild.innerHTML = blackPawn.figureIcon;
    chessBoardMatrix[1][i] = blackPawn;

    let whitePawn = new Pawn(6,i,'♙',constants._white);
    document.getElementById(6 + '-' + i).firstChild.innerHTML = whitePawn.figureIcon;
    chessBoardMatrix[6][i] = whitePawn;

  }
}
console.log(chessBoardMatrix);
drawChessBoard();
drawFigures()