const chestBoard = document.querySelector('#chess-board');

function drawChessBoard() {
  for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
    let row = document.createElement('div');
    row.setAttribute('class','row');
  
    for (let boxIndex = 0; boxIndex < 8; boxIndex++) {
      let box = document.createElement('div');
      box.setAttribute('id', rowIndex + ' ' + boxIndex);
    
      if((boxIndex+rowIndex) % 2 === 1) {
        box.style.backgroundColor = '#E97451';
      }
  
      box.setAttribute('class','box');
  
      row.appendChild(box);
    }
  
    chestBoard.appendChild(row);
  }
}

drawChessBoard();
