export default class Figure {
    constructor(initialX, initialY,figureIcon,color) {
      this.initialX = initialX;
      this.initialY = initialY;
      this.currentX = initialX;
      this.currentY = initialY;
      this.figureIcon = figureIcon;
      this.color = color;
    }
}