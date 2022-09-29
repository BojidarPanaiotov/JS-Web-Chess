export default class Figure {
    constructor(initialX, initialY,figureIcon,color) {
      this.currentX = initialX;
      this.currentY = initialY;
      this.figureIcon = figureIcon;
      this.color = color;
    }

  move(matrix, clickedCoordinates) {
    var possibleMoves = this.getPossibleMoves(matrix);
    var canMove;
    let clickedX = clickedCoordinates.x;
    let clickedY = clickedCoordinates.y;

    for (let i = 0; i < possibleMoves.length; i++) {
        if(possibleMoves[i].x === clickedX && possibleMoves[i].y === clickedY) {
            canMove = true;
            this.handlePosition(matrix, clickedCoordinates)
        }
    }

    return canMove;
  }

  handlePosition(matrix, coordinates) {
    matrix[this.currentX][this.currentY] = null;
    matrix[coordinates.x][coordinates.y] = this;
  }

  destroy(matrix) {
    matrix[this.currentX][this.currentY] = null;
  }

  updateCoordinates(x,y) {
    this.currentX = x;
    this.currentY = y;
  }
}