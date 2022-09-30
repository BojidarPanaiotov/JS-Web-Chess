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

  calculateCoordinatesFromOrigin(matrix,coordinates) {
    let validCoordinates = [];

    for (let i = 0; i < coordinates.length; i++) {
      let x = this.currentX + coordinates[i].x;
      let y = this.currentY + coordinates[i].y;

      //  1. Checking if the move is beyond the boundaries of the board
      if(this.isValidCoordinates(x,y)) {
          continue;
        //  2. Checking if the current figure can take other figure
      } else if(matrix[x][y]){
        validCoordinates.push({x: x, y: y});
        continue;
        //  3. Else means that the box is empty
      } else {
          validCoordinates.push({x: x, y: y});
      }
    }

    return validCoordinates;
  }

  isValidCoordinates(x, y) {
    return x < 0 || x > 7 || y < 0 || x > 7;
  }
}