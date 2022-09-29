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
            this.renderPosition(matrix, clickedCoordinates)
        }
    }

    return canMove;
  }

  renderPosition(matrix, coordinates) {
    matrix[this.currentX][this.currentY] = null;
    matrix[coordinates.x][coordinates.y] = this;
  }

  destroy(matrix) {
    matrix[this.currentX][this.currentY] = null;
  }
}